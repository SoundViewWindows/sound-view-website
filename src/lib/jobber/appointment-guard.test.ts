import assert from "node:assert/strict";
import test from "node:test";
import { pacificWallTimeToUtc } from "./booking-schedule.ts";
import type { JobberAppointmentPayload } from "./booking-types.ts";
import { titleMatchesVisit, visitRequestTitle } from "./appointment-identity.ts";
import { createMemoryLockStore } from "./appointment-lock.ts";
import { runGuardedAppointment, storedVisitTarget, type GuardLookup } from "./appointment-guard.ts";
import { lookupAppointmentRequest } from "./appointment-client-search.ts";
import type { VisitRecord } from "./appointment-lock.ts";
import { establishAppointmentProperty } from "./appointment-property.ts";
import type { JobberCaller } from "./appointment-reserve.ts";
import { MUTATION_DEADLINE_MS, QUARANTINE_MS, visitIdentity } from "./appointment-identity.ts";

const date = "2026-12-16";
const slot = "10:00 AM - 11:00 AM";

function appointment(email = "ada@example.com", unit = ""): JobberAppointmentPayload {
  return {
    location: "Lake City",
    contact: { firstName: "Ada", lastName: "Example", companyName: "", email, phone: "(206) 555-0100" },
    address: { street: "1 Main St", unit, city: "Seattle", state: "WA", zip: "98125" },
    serviceDetails: {
      scopeOfWork: "Measure two windows.",
      products: ["Windows"],
      installationNeeded: true,
      workingWithSoundView: false,
      workingWithName: "",
      images: [],
      referralSource: "",
    },
    schedule: { date, timeSlot: slot, duration: "1h", timeZone: "America/Los_Angeles" },
    consents: { marketingEmail: false, transactionalSms: true, marketingSms: false },
    submittedAt: "2026-12-01T00:00:00.000Z",
  } as JobberAppointmentPayload;
}

function matchingAssessment() {
  const start = pacificWallTimeToUtc(date, 10 * 60);
  return { startAt: new Date(start).toISOString(), endAt: new Date(start + 60 * 60 * 1000).toISOString() };
}

function harness(options?: {
  calendar?: () => Promise<"free" | "busy" | "failed">;
  lookup?: (visit: VisitRecord) => Promise<GuardLookup>;
  create?: (referenceId: string) => Promise<{ requestId: string; jobberWebUri: null; assessment: { startAt: string | null; endAt: string | null } | null } | null>;
}) {
  const store = createMemoryLockStore();
  const creates: string[] = [];
  let references = 0;
  const run = (person = appointment(), now = Date.parse("2026-12-01T00:00:00.000Z")) =>
    runGuardedAppointment({
      now,
      appointment: person,
      store,
      readCalendar: options?.calendar ?? (async () => "free"),
      lookup: options?.lookup ?? (async () => ({ status: "none" })),
      createRequest: async (visit) => {
        creates.push(visit.referenceId);
        if (options?.create) return options.create(visit.referenceId);
        return { requestId: "request-1", jobberWebUri: null, assessment: matchingAssessment() };
      },
      scheduleRequest: async () => matchingAssessment(),
      createReferenceId: () => `SV-TEST${++references}`,
    });
  return { run, creates, store };
}

test("the recovery title includes the reference and rejects the bare title", () => {
  assert.equal(visitRequestTitle("SV-K7M2PQ"), "Website Appointment Booking SV-K7M2PQ");
  assert.equal(titleMatchesVisit("Website Appointment Booking SV-K7M2PQ", "SV-K7M2PQ"), true);
  assert.equal(titleMatchesVisit("Website Appointment Booking", "SV-K7M2PQ"), false);
});

test("two submits for the same visit create one request", async () => {
  let release: (value: { requestId: string; jobberWebUri: null; assessment: ReturnType<typeof matchingAssessment> }) => void = () => {};
  const pending = new Promise<{ requestId: string; jobberWebUri: null; assessment: ReturnType<typeof matchingAssessment> }>((resolve) => {
    release = resolve;
  });
  const { run, creates } = harness({ create: () => pending });
  const first = run();
  await new Promise((resolve) => setTimeout(resolve, 10));
  const second = await run();
  assert.equal(second.code, "processing");
  release({ requestId: "request-1", jobberWebUri: null, assessment: matchingAssessment() });
  const done = await first;
  assert.equal(done.code, "confirmed");
  assert.equal(creates.length, 1);
});

test("a second customer cannot claim a slot while the first visit is in flight", async () => {
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const { run, creates } = harness({
    create: async (referenceId) => {
      await gate;
      return { requestId: "request-1", jobberWebUri: null, assessment: matchingAssessment() };
    },
  });
  const first = run();
  await new Promise((resolve) => setTimeout(resolve, 10));
  const other = await run(appointment("bea@example.com"));
  assert.equal(other.code, "time_not_reserved");
  release();
  assert.equal((await first).code, "confirmed");
  assert.equal(creates.length, 1);
});

test("after quarantine a failed calendar read refuses the next customer", async () => {
  const now = Date.parse("2026-12-01T00:00:00.000Z");
  let reads = 0;
  const { run, creates } = harness({
    create: async () => {
      throw new Error("timed out");
    },
    calendar: async () => {
      reads += 1;
      return reads < 3 ? "free" : "failed";
    },
    lookup: async () => ({ status: "none" }),
  });
  const first = await run(appointment(), now);
  assert.equal(first.code, "unconfirmed");
  const later = now + MUTATION_DEADLINE_MS + QUARANTINE_MS + 1000;
  const other = await run(appointment("bea@example.com"), later);
  assert.equal(other.code, "time_not_reserved");
  assert.equal(creates.length, 1);
});

test("after quarantine a busy hour or an unresolved original visit refuses the next customer", async () => {
  const now = Date.parse("2026-12-01T00:00:00.000Z");
  let busyReads = 0;
  const busy = harness({
    create: async () => {
      throw new Error("timed out");
    },
    calendar: async () => {
      busyReads += 1;
      return busyReads < 3 ? "free" : "busy";
    },
    lookup: async () => ({ status: "none" }),
  });
  await busy.run(appointment(), now);
  const later = now + MUTATION_DEADLINE_MS + QUARANTINE_MS + 1000;
  assert.equal((await busy.run(appointment("bea@example.com"), later)).code, "time_not_reserved");

  const unresolved = harness({
    create: async () => {
      throw new Error("timed out");
    },
    calendar: async () => "free",
    lookup: async () => ({ status: "failed" }),
  });
  await unresolved.run(appointment(), now);
  assert.equal((await unresolved.run(appointment("bea@example.com"), later)).code, "time_not_reserved");
  assert.equal(unresolved.creates.length, 1);
  const saved = await unresolved.store.get(visitIdentity(appointment()).visitKey);
  assert.equal(saved && saved.kind === "visit" ? saved.status : "", "lookup_required");
});

test("a paused requestCreate still blocks the slot after quarantine", async () => {
  const now = Date.parse("2026-12-01T00:00:00.000Z");
  let release: (value: { requestId: string; jobberWebUri: null; assessment: ReturnType<typeof matchingAssessment> }) => void = () => {};
  const pending = new Promise<{ requestId: string; jobberWebUri: null; assessment: ReturnType<typeof matchingAssessment> }>((resolve) => {
    release = resolve;
  });
  const { run, creates } = harness({
    create: () => pending,
    calendar: async () => "free",
    lookup: async () => ({ status: "none" }),
  });
  const first = run(appointment(), now);
  for (let attempt = 0; attempt < 50 && creates.length === 0; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.equal(creates.length, 1);
  const later = now + MUTATION_DEADLINE_MS + QUARANTINE_MS + 1000;
  const other = await run(appointment("bea@example.com"), later);
  assert.equal(other.code, "time_not_reserved");
  assert.equal(creates.length, 1);
  release({ requestId: "request-1", jobberWebUri: null, assessment: matchingAssessment() });
  const done = await first;
  assert.equal(done.code, "confirmed");
  assert.equal(creates.length, 1);
});

test("a timed-out assessment that later exists at Jobber does not release the slot", async () => {
  const now = Date.parse("2026-12-01T00:00:00.000Z");
  let visibleAtJobber = false;
  const { run, creates, store } = harness({
    create: async () => {
      visibleAtJobber = true;
      throw new Error("assessment timed out");
    },
    calendar: async () => "free",
    lookup: async () =>
      visibleAtJobber
        ? { status: "found", requestId: "request-1", jobberWebUri: null, assessment: matchingAssessment() }
        : { status: "none" },
  });
  const first = await run(appointment(), now);
  assert.equal(first.code, "unconfirmed");
  const later = now + MUTATION_DEADLINE_MS + QUARANTINE_MS + 1000;
  const other = await run(appointment("bea@example.com"), later);
  assert.equal(other.code, "time_not_reserved");
  assert.equal(creates.length, 1);
  const saved = await store.get(visitIdentity(appointment()).visitKey);
  assert.equal(saved && saved.kind === "visit" ? saved.status : "", "lookup_required");
  const slotRecord = await store.get(visitIdentity(appointment()).slotKey);
  assert.equal(slotRecord && slotRecord.kind === "slot" ? slotRecord.jobberCallStartedAt : null, now);
  const recovered = await run(appointment(), later);
  assert.equal(recovered.code, "confirmed");
  assert.equal(creates.length, 1);
});

test("a completed property create with no id and no matching property does not create a request or release the slot", async () => {
  const now = Date.parse("2026-12-01T00:00:00.000Z");
  const queries: string[] = [];
  const graphql: JobberCaller = async (query) => {
    queries.push(query);
    if (query.includes("propertyCreate")) {
      return { propertyCreate: { properties: [], userErrors: [] } };
    }
    if (query.includes("WebsiteClientProperties")) {
      return { client: { properties: { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } } } };
    }
    throw new Error("unexpected Jobber call");
  };
  const { run, store } = harness({
    create: async () => {
      await establishAppointmentProperty(graphql, "client-1", appointment());
      queries.push("requestCreate");
      return { requestId: "request-1", jobberWebUri: null, assessment: matchingAssessment() };
    },
    calendar: async () => "free",
    lookup: async () => ({ status: "none" }),
  });
  const first = await run(appointment(), now);
  assert.equal(first.code, "unconfirmed");
  assert.equal(queries.some((query) => query.includes("requestCreate")), false);
  const later = now + MUTATION_DEADLINE_MS + QUARANTINE_MS + 1000;
  const other = await run(appointment("bea@example.com"), later);
  assert.equal(other.code, "time_not_reserved");
  assert.equal(queries.some((query) => query.includes("requestCreate")), false);
  const saved = await store.get(visitIdentity(appointment()).visitKey);
  assert.equal(saved && saved.kind === "visit" ? saved.status : "", "lookup_required");
  const slotRecord = await store.get(visitIdentity(appointment()).slotKey);
  assert.equal(slotRecord && slotRecord.kind === "slot" ? slotRecord.jobberCallStartedAt : null, now);
});

test("an incomplete property lookup does not write not_found or release the slot", async () => {
  const now = Date.parse("2026-12-01T00:00:00.000Z");
  const { run, creates, store } = harness({
    create: async () => {
      throw new Error("Jobber property lookup did not finish.");
    },
    calendar: async () => "free",
    lookup: async () => ({ status: "none" }),
  });
  const first = await run(appointment(), now);
  assert.equal(first.code, "unconfirmed");
  const later = now + MUTATION_DEADLINE_MS + QUARANTINE_MS + 1000;
  const other = await run(appointment("bea@example.com"), later);
  assert.equal(other.code, "time_not_reserved");
  assert.equal(creates.length, 1);
  const saved = await store.get(visitIdentity(appointment()).visitKey);
  assert.equal(saved && saved.kind === "visit" ? saved.status : "", "lookup_required");
  const slotRecord = await store.get(visitIdentity(appointment()).slotKey);
  assert.equal(slotRecord && slotRecord.kind === "slot" ? slotRecord.jobberCallStartedAt : null, now);
});

test("overlapping recoveries confirm the visit and send one email", async () => {
  const now = Date.parse("2026-12-01T00:00:00.000Z");
  const waiting: Array<(value: GuardLookup) => void> = [];
  const { run, creates } = harness({
    create: async () => {
      throw new Error("timed out");
    },
    lookup: () => new Promise((resolve) => waiting.push(resolve)),
  });
  assert.equal((await run(appointment(), now)).code, "unconfirmed");
  const later = now + MUTATION_DEADLINE_MS + QUARANTINE_MS + 1000;
  const first = run(appointment(), later);
  const second = run(appointment(), later);
  for (let attempt = 0; attempt < 50 && waiting.length < 2; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.equal(waiting.length, 2);
  const found: GuardLookup = { status: "found", requestId: "request-1", jobberWebUri: null, assessment: matchingAssessment() };
  waiting.splice(0, 2).forEach((resolve) => resolve(found));
  const results = await Promise.all([first, second]);
  assert.equal(results.every((result) => result.code === "confirmed"), true);
  assert.equal(results.filter((result) => result.code === "confirmed" && result.notify).length, 1);
  assert.equal(creates.length, 1);
});

test("a request search without nodes does not write not_found or release the slot", async () => {
  const now = Date.parse("2026-12-01T00:00:00.000Z");
  const graphql: JobberCaller = async (query) => {
    if (query.includes("MatchWebsiteAppointmentClient")) {
      return { clients: { nodes: [{ id: "client-1", emails: [{ address: "ada@example.com" }] }], pageInfo: { hasNextPage: false, endCursor: null } } };
    }
    return { client: { email: "ada@example.com", requests: { pageInfo: { hasNextPage: false, endCursor: null } } } };
  };
  const { run, creates, store } = harness({
    create: async () => {
      throw new Error("timed out");
    },
    calendar: async () => "free",
    lookup: (visit) => lookupAppointmentRequest(storedVisitTarget(visit), visit.referenceId, graphql),
  });
  assert.equal((await run(appointment(), now)).code, "unconfirmed");
  const later = now + MUTATION_DEADLINE_MS + QUARANTINE_MS + 1000;
  assert.equal((await run(appointment("bea@example.com"), later)).code, "time_not_reserved");
  assert.equal(creates.length, 1);
  const saved = await store.get(visitIdentity(appointment()).visitKey);
  assert.equal(saved && saved.kind === "visit" ? saved.status : "", "lookup_required");
});

test("a saved request without a matching assessment is not confirmed and is not created again", async () => {
  const { run, creates } = harness({
    create: async (referenceId) => ({ requestId: "request-9", jobberWebUri: null, assessment: null }),
  });
  const first = await run();
  assert.equal(first.code, "time_not_reserved");
  if (first.code === "time_not_reserved") assert.match(first.message, /office can see it/);
  const second = await run();
  assert.notEqual(second.code, "confirmed");
  assert.equal(creates.length, 1);
});

test("a repeat of a confirmed visit returns the same reference without another request", async () => {
  const { run, creates } = harness();
  const first = await run();
  assert.equal(first.code, "confirmed");
  const second = await run();
  assert.equal(second.code, "confirmed");
  if (first.code === "confirmed" && second.code === "confirmed") {
    assert.equal(second.referenceId, first.referenceId);
    assert.equal(second.notify, false);
  }
  assert.equal(creates.length, 1);
});

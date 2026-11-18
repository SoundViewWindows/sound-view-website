import assert from "node:assert/strict";
import test from "node:test";
import { pacificWallTimeToUtc } from "./booking-schedule.ts";
import type { JobberAppointmentPayload } from "./booking-types.ts";
import {
  assessmentMatchesRequestedSlot,
  reserveScheduledAppointment,
  UncertainJobberMutation,
  type JobberCaller,
} from "./appointment-reserve.ts";

const date = "2026-12-16";
const slot = "10:00 AM - 11:00 AM";
const appointment = {
  location: "Lake City Showroom",
  contact: {
    firstName: "Ada",
    lastName: "Example",
    companyName: "",
    email: "ada@example.com",
    phone: "(206) 555-0100",
  },
  address: { street: "1 Main St", unit: "", city: "Seattle", state: "WA", zip: "98125" },
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

function iso(hour: number) {
  return new Date(pacificWallTimeToUtc(date, hour * 60)).toISOString();
}

function matchingAssessment() {
  return { id: "assessment-1", startAt: iso(10), endAt: iso(11) };
}

function graphql(script: Array<(query: string) => unknown>): JobberCaller {
  const calls: string[] = [];
  const caller = (async (query: string) => {
    calls.push(query);
    const step = script.shift();
    if (!step) throw new Error("unexpected Jobber call");
    return step(query);
  }) as JobberCaller;
  caller.calls = calls;
  return caller;
}

test("a request with a matching assessment is booked without another request", async () => {
  const client = graphql([
    () => ({
      requestCreate: {
        request: { id: "request-1", title: "Website Appointment Booking", jobberWebUri: null, assessment: matchingAssessment() },
        userErrors: [],
      },
    }),
  ]);
  const result = await reserveScheduledAppointment({
    graphql: client,
    clientId: "client-1",
    propertyId: null,
    appointment,
    referenceId: "SV-TEST",
    bookingUserId: "booking-user",
  });
  assert.equal(result.assessmentScheduled, true);
  assert.equal(result.requestId, "request-1");
  assert.equal(client.calls.filter((query) => query.includes("requestCreate")).length, 1);
  assert.equal(client.calls.filter((query) => query.includes("assessmentCreate")).length, 0);
});

test("a request id with a failed assessment is kept and not booked", async () => {
  const client = graphql([
    () => ({
      requestCreate: {
        request: { id: "request-1", title: null, jobberWebUri: null, assessment: null },
        userErrors: [{ message: "Schedule is unavailable", path: ["assessment"] }],
      },
    }),
    () => ({ assessmentCreate: { assessment: null, userErrors: [{ message: "unavailable", path: ["schedule"] }] } }),
    () => ({ assessmentCreate: { assessment: { id: "assessment-2", startAt: null, endAt: null }, userErrors: [] } }),
  ]);
  const result = await reserveScheduledAppointment({
    graphql: client,
    clientId: "client-1",
    propertyId: null,
    appointment,
    referenceId: "SV-TEST",
    bookingUserId: "booking-user",
  });
  assert.equal(result.requestId, "request-1");
  assert.equal(result.assessmentScheduled, false);
  assert.equal(client.calls.filter((query) => query.includes("requestCreate")).length, 1);
});

test("an assessment rejection without a request does not create an unscheduled request", async () => {
  const client = graphql([
    () => ({
      requestCreate: {
        request: null,
        userErrors: [{ message: "assessment schedule was rejected", path: ["input", "assessment"] }],
      },
    }),
  ]);
  await assert.rejects(
    () =>
      reserveScheduledAppointment({
        graphql: client,
        clientId: "client-1",
        propertyId: null,
        appointment,
        referenceId: "SV-TEST",
        bookingUserId: "booking-user",
      }),
    /Jobber did not create the request/,
  );
  assert.equal(client.calls.filter((query) => query.includes("requestCreate")).length, 1);
});

test("both assessment attempts can fail after the request exists", async () => {
  const client = graphql([
    () => ({
      requestCreate: {
        request: { id: "request-9", title: null, jobberWebUri: null, assessment: { id: "a", startAt: iso(8), endAt: iso(9) } },
        userErrors: [],
      },
    }),
    () => ({ assessmentCreate: { assessment: null, userErrors: [{ message: "unavailable", path: ["schedule"] }] } }),
    () => ({ assessmentCreate: { assessment: null, userErrors: [{ message: "no", path: [] }] } }),
  ]);
  const result = await reserveScheduledAppointment({
    graphql: client,
    clientId: "client-1",
    propertyId: null,
    appointment,
    referenceId: "SV-TEST",
    bookingUserId: "booking-user",
  });
  assert.equal(result.assessmentMatchesSlot, false);
  assert.equal(result.requestId, "request-9");
  assert.equal(client.calls.filter((query) => query.includes("assessmentCreate")).length, 2);
});

test("a timed-out requestCreate stays uncertain", async () => {
  const client = graphql([() => {
    throw new Error("timed out");
  }]);
  await assert.rejects(
    () =>
      reserveScheduledAppointment({
        graphql: client,
        clientId: "client-1",
        propertyId: null,
        appointment,
        referenceId: "SV-TEST",
        bookingUserId: "booking-user",
      }),
    UncertainJobberMutation,
  );
  assert.equal(client.calls.filter((query) => query.includes("assessmentCreate")).length, 0);
});

test("a timed-out first assessment attempt does not continue", async () => {
  const client = graphql([
    () => ({
      requestCreate: {
        request: { id: "request-1", title: null, jobberWebUri: null, assessment: null },
        userErrors: [],
      },
    }),
    () => {
      throw new Error("timed out");
    },
    () => ({ assessmentCreate: { assessment: matchingAssessment(), userErrors: [] } }),
  ]);
  await assert.rejects(
    () =>
      reserveScheduledAppointment({
        graphql: client,
        clientId: "client-1",
        propertyId: null,
        appointment,
        referenceId: "SV-TEST",
        bookingUserId: "booking-user",
      }),
    UncertainJobberMutation,
  );
  assert.equal(client.calls.filter((query) => query.includes("assessmentCreate")).length, 1);
});

test("a timed-out second assessment attempt stays uncertain", async () => {
  const client = graphql([
    () => ({
      requestCreate: {
        request: { id: "request-1", title: null, jobberWebUri: null, assessment: { id: "a", startAt: iso(8), endAt: iso(9) } },
        userErrors: [],
      },
    }),
    () => ({ assessmentCreate: { assessment: null, userErrors: [{ message: "unavailable", path: ["schedule"] }] } }),
    () => {
      throw new Error("timed out");
    },
  ]);
  await assert.rejects(
    () =>
      reserveScheduledAppointment({
        graphql: client,
        clientId: "client-1",
        propertyId: null,
        appointment,
        referenceId: "SV-TEST",
        bookingUserId: "booking-user",
      }),
    UncertainJobberMutation,
  );
  assert.equal(client.calls.filter((query) => query.includes("assessmentCreate")).length, 2);
});

test("missing or mismatched assessment times are not a reserved slot", () => {
  assert.equal(assessmentMatchesRequestedSlot({ id: "a", startAt: iso(10), endAt: null }, appointment), false);
  assert.equal(assessmentMatchesRequestedSlot({ id: "a", startAt: iso(10), endAt: iso(12) }, appointment), false);
  assert.equal(assessmentMatchesRequestedSlot(matchingAssessment(), appointment), true);
});

test("a failed request creation does not retry with a second request", async () => {
  const client = graphql([() => {
    throw new Error("Jobber unavailable");
  }]);
  await assert.rejects(
    () =>
      reserveScheduledAppointment({
        graphql: client,
        clientId: "client-1",
        propertyId: null,
        appointment,
        referenceId: "SV-TEST",
        bookingUserId: "booking-user",
      }),
    /Jobber did not create the request/,
  );
  assert.equal(client.calls.length, 1);
});

test("a retry uses the existing unscheduled request and does not create another", async () => {
  const client = graphql([
    () => ({ assessmentCreate: { assessment: null, userErrors: [{ message: "unavailable", path: ["schedule"] }] } }),
    () => ({ assessmentCreate: { assessment: null, userErrors: [{ message: "unavailable", path: ["schedule"] }] } }),
    () => ({ assessmentCreate: { assessment: matchingAssessment(), userErrors: [] } }),
  ]);
  const first = await reserveScheduledAppointment({
    graphql: client,
    clientId: "client-1",
    propertyId: null,
    appointment,
    referenceId: "SV-TEST",
    bookingUserId: "booking-user",
    pendingRequestId: "request-1",
  });
  assert.equal(first.assessmentScheduled, false);
  const second = await reserveScheduledAppointment({
    graphql: client,
    clientId: "client-1",
    propertyId: null,
    appointment,
    referenceId: "SV-TEST",
    bookingUserId: "booking-user",
    pendingRequestId: first.requestId,
  });
  assert.equal(second.assessmentScheduled, true);
  assert.equal(second.requestId, "request-1");
  assert.equal(client.calls.filter((query) => query.includes("requestCreate")).length, 0);
});

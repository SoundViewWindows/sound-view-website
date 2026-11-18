import { MUTATION_DEADLINE_MS, newToken, protectionEnds, retentionSeconds, visitIdentity } from "./appointment-identity";
import { assessmentMatchesRequestedSlot } from "./appointment-reserve";
import type { LockStore, SlotRecord, VisitRecord } from "./appointment-lock";
import type { JobberAppointmentPayload } from "./booking-types";
import {
  appointmentProcessingMessage,
  appointmentSaveError,
  appointmentSavedTimeMessage,
  appointmentTimeError,
  appointmentUnconfirmedMessage,
} from "./appointment-confirmation";

export type GuardLookup =
  | { status: "failed" }
  | { status: "none" }
  | { status: "ambiguous" }
  | { status: "found"; requestId: string; jobberWebUri: string | null; assessment: { startAt: string | null; endAt: string | null } | null };

export type GuardOutcome =
  | { code: "confirmed"; referenceId: string; requestId: string; jobberWebUri: string | null; notify: boolean }
  | { code: "processing"; message: string }
  | { code: "time_not_reserved"; message: string }
  | { code: "unconfirmed"; message: string }
  | { code: "unavailable"; message: string }
  | { code: "save_error"; message: string };

type CreatedRequest = {
  requestId: string;
  jobberWebUri: string | null;
  assessment: { startAt: string | null; endAt: string | null } | null;
};

export async function runGuardedAppointment(input: {
  now: number;
  appointment: JobberAppointmentPayload;
  store: LockStore;
  readCalendar: () => Promise<"free" | "busy" | "failed">;
  lookup: (visit: VisitRecord) => Promise<GuardLookup>;
  createRequest: (visit: VisitRecord) => Promise<CreatedRequest | null>;
  scheduleRequest: (visit: VisitRecord) => Promise<CreatedRequest["assessment"]>;
  createReferenceId: () => string;
}): Promise<GuardOutcome> {
  const identity = visitIdentity(input.appointment);
  if (!identity) return { code: "save_error", message: appointmentSaveError };
  const ttl = retentionSeconds(identity.date, identity.hour, input.now);
  let visit = asVisit(await input.store.get(identity.visitKey));
  if (visit?.status === "scheduled" && visit.requestId) {
    return confirmed(visit, false);
  }
  if (!visit) {
    const calendar = await input.readCalendar();
    if (calendar === "failed") {
      return { code: "unavailable", message: "We could not confirm that this time is still open. Please select another available time." };
    }
    if (calendar !== "free") {
      return { code: "unavailable", message: "That time slot was just booked. Please select another available time." };
    }
    const created = newVisit(identity, input.createReferenceId(), input.now);
    if (!(await input.store.claim(identity.visitKey, created, ttl))) {
      visit = asVisit(await input.store.get(identity.visitKey));
    } else {
      visit = created;
    }
  }
  if (!visit) return { code: "processing", message: appointmentProcessingMessage };
  if (withinProtection(visit, input.now) && visit.status !== "scheduled") {
    return { code: "processing", message: appointmentProcessingMessage };
  }
  if (visit.requestId) return resumeSaved(input, visit, identity.slotKey, ttl);
  if (visit.jobberCallStartedAt) return recoverWithoutId(input, visit, identity.slotKey, ttl);
  const slot = await acquireSlot(input, visit, identity.slotKey, ttl);
  if (!slot) return { code: "time_not_reserved", message: appointmentTimeError };
  return sendCreate(input, visit, slot, identity.slotKey, ttl);
}

function asVisit(record: Awaited<ReturnType<LockStore["get"]>>) {
  return record?.kind === "visit" ? record : null;
}

function newVisit(identity: NonNullable<ReturnType<typeof visitIdentity>>, referenceId: string, now: number): VisitRecord {
  return {
    kind: "visit",
    status: "claiming",
    token: newToken(),
    visitHash: identity.visitHash,
    referenceId,
    email: identity.email,
    street: identity.address.street,
    unit: identity.address.unit,
    city: identity.address.city,
    state: identity.address.state,
    zip: identity.address.zip,
    date: identity.date,
    hour: identity.hour,
    requestId: null,
    jobberWebUri: null,
    jobberCallStartedAt: null,
    updatedAt: now,
  };
}

function withinProtection(visit: VisitRecord, now: number) {
  return visit.jobberCallStartedAt !== null && now < protectionEnds(visit);
}

function confirmed(visit: VisitRecord, notify: boolean): GuardOutcome {
  return {
    code: "confirmed",
    referenceId: visit.referenceId,
    requestId: visit.requestId || "",
    jobberWebUri: visit.jobberWebUri,
    notify,
  };
}

async function acquireSlot(
  input: Parameters<typeof runGuardedAppointment>[0],
  visit: VisitRecord,
  slotKey: string,
  ttl: number,
) {
  const existing = await input.store.get(slotKey);
  const next = reservingSlot(visit, input.now);
  if (!existing) {
    return (await input.store.claim(slotKey, next, ttl)) ? next : null;
  }
  if (existing.kind !== "slot") return null;
  if (existing.visitHash === visit.visitHash) return existing;
  if (existing.jobberCallStartedAt || existing.status === "scheduled" || input.now < protectionEnds(existing)) return null;
  const original = asVisit(await input.store.get(`appointment:visit:${existing.visitHash}`));
  if (!original) return null;
  const resolved = await resolveOriginal(input, original, slotKey, ttl);
  if (!resolved) return null;
  const claimed = await input.store.claimSlotIfClear({
    slotKey,
    originalVisitKey: `appointment:visit:${original.visitHash}`,
    now: input.now,
    protectionEnds: protectionEnds(existing),
    next,
    ttlSeconds: ttl,
  });
  return claimed ? next : null;
}

async function resolveOriginal(
  input: Parameters<typeof runGuardedAppointment>[0],
  original: VisitRecord,
  slotKey: string,
  ttl: number,
) {
  if (original.status === "scheduled") return false;
  const calendar = await input.readCalendar();
  if (calendar !== "free") return false;
  const found = await input.lookup(original);
  if (found.status === "failed" || found.status === "ambiguous") return false;
  if (found.status === "found") {
    const matches = assessmentMatchesRequestedSlot(
      found.assessment ? { id: found.requestId, ...found.assessment } : null,
      targetFromVisit(original),
    );
    const next: VisitRecord = {
      ...original,
      status: matches ? "scheduled" : "request_saved",
      requestId: found.requestId,
      jobberWebUri: found.jobberWebUri,
      updatedAt: input.now,
    };
    await input.store.compare(originalKey(original), original.token, [original.status], next, ttl);
    if (matches) {
      const slot = await input.store.get(slotKey);
      if (slot?.kind === "slot") {
        await input.store.compare(slotKey, slot.token, [slot.status], { ...slot, status: "scheduled", updatedAt: input.now }, ttl);
      }
    }
    return !matches;
  }
  const absent: VisitRecord = { ...original, status: "not_found", updatedAt: input.now };
  const saved = await input.store.compare(originalKey(original), original.token, [original.status], absent, ttl);
  return saved;
}

async function sendCreate(
  input: Parameters<typeof runGuardedAppointment>[0],
  visit: VisitRecord,
  slot: SlotRecord,
  slotKey: string,
  ttl: number,
): Promise<GuardOutcome> {
  const started = input.now;
  const mutating = markMutating(visit, slot, started);
  const locked = await input.store.comparePair(
    originalKey(visit),
    visit.token,
    ["claiming"],
    mutating.visit,
    slotKey,
    slot.token,
    ["reserving"],
    mutating.slot,
    ttl,
  );
  if (!locked) return { code: "processing" as const, message: appointmentProcessingMessage };
  if (input.now > started + MUTATION_DEADLINE_MS) return { code: "processing" as const, message: appointmentProcessingMessage };
  let created: CreatedRequest | null = null;
  try {
    created = await input.createRequest({ ...mutating.visit, referenceId: visit.referenceId });
  } catch (error) {
    console.error("[appointment] Jobber requestCreate error:", error instanceof Error ? error.message : "Jobber did not create the request.");
  }
  if (!created?.requestId) {
    await input.store.compare(originalKey(visit), mutating.visit.token, ["mutating"], { ...mutating.visit, status: "lookup_required", updatedAt: input.now }, ttl);
    return { code: "unconfirmed", message: appointmentUnconfirmedMessage };
  }
  return finishRequest(input, { ...mutating.visit, requestId: created.requestId, jobberWebUri: created.jobberWebUri }, mutating.slot, slotKey, ttl, created.assessment, true);
}

async function resumeSaved(
  input: Parameters<typeof runGuardedAppointment>[0],
  visit: VisitRecord,
  slotKey: string,
  ttl: number,
): Promise<GuardOutcome> {
  const slot = await acquireSlot(input, visit, slotKey, ttl);
  if (!slot || !visit.requestId) return { code: "time_not_reserved" as const, message: appointmentSavedTimeMessage };
  const started = input.now;
  const mutating = markMutating(visit, slot, started);
  const locked = await input.store.comparePair(
    originalKey(visit),
    visit.token,
    ["request_saved", "claiming", "lookup_required"],
    mutating.visit,
    slotKey,
    slot.token,
    ["reserving"],
    mutating.slot,
    ttl,
  );
  if (!locked) return { code: "processing" as const, message: appointmentProcessingMessage };
  if (input.now > started + MUTATION_DEADLINE_MS) return { code: "processing" as const, message: appointmentProcessingMessage };
  try {
    const assessment = await input.scheduleRequest(mutating.visit);
    return finishRequest(input, mutating.visit, mutating.slot, slotKey, ttl, assessment, false);
  } catch (error) {
    console.error("[appointment] Jobber assessmentCreate error:", error instanceof Error ? error.message : "Jobber did not schedule the assessment.");
    await input.store.compare(originalKey(visit), mutating.visit.token, ["mutating"], { ...mutating.visit, status: "lookup_required", updatedAt: input.now }, ttl);
    return { code: "unconfirmed", message: appointmentUnconfirmedMessage };
  }
}

async function recoverWithoutId(
  input: Parameters<typeof runGuardedAppointment>[0],
  visit: VisitRecord,
  slotKey: string,
  ttl: number,
): Promise<GuardOutcome> {
  const found = await input.lookup(visit);
  if (found.status === "failed" || found.status === "ambiguous") {
    return { code: "unconfirmed" as const, message: appointmentUnconfirmedMessage };
  }
  if (found.status === "none") {
    return { code: "unconfirmed" as const, message: appointmentUnconfirmedMessage };
  }
  const matches = assessmentMatchesRequestedSlot(
    found.assessment ? { id: found.requestId, ...found.assessment } : null,
    targetFromVisit(visit),
  );
  const next: VisitRecord = {
    ...visit,
    status: matches ? "scheduled" : "request_saved",
    requestId: found.requestId,
    jobberWebUri: found.jobberWebUri,
    updatedAt: input.now,
  };
  await input.store.compare(originalKey(visit), visit.token, [visit.status], next, ttl);
  if (matches) {
    const slot = await input.store.get(slotKey);
    if (slot?.kind === "slot" && slot.visitHash === visit.visitHash) {
      await input.store.compare(slotKey, slot.token, [slot.status], { ...slot, status: "scheduled", updatedAt: input.now }, ttl);
    }
    const notify = await input.store.claimNotification(originalKey(visit), ttl);
    return confirmed(next, notify);
  }
  return resumeSaved(input, next, slotKey, ttl);
}

async function finishRequest(
  input: Parameters<typeof runGuardedAppointment>[0],
  visit: VisitRecord,
  slot: SlotRecord,
  slotKey: string,
  ttl: number,
  assessment: CreatedRequest["assessment"],
  notify: boolean,
): Promise<GuardOutcome> {
  const currentSlot = await input.store.get(slotKey);
  const stillOwnsSlot = currentSlot?.kind === "slot" && currentSlot.visitHash === visit.visitHash;
  const matches = stillOwnsSlot && assessmentMatchesRequestedSlot(assessment ? { id: visit.requestId || "assessment", ...assessment } : null, input.appointment);
  const next: VisitRecord = {
    ...visit,
    status: matches ? "scheduled" : "request_saved",
    updatedAt: input.now,
  };
  const saved = await input.store.compare(originalKey(visit), visit.token, ["mutating", "request_saved", "claiming"], next, ttl);
  if (!saved) return { code: "processing" as const, message: appointmentProcessingMessage };
  if (matches && currentSlot?.kind === "slot") {
    await input.store.compare(slotKey, currentSlot.token, [currentSlot.status], { ...currentSlot, status: "scheduled", visitHash: visit.visitHash, updatedAt: input.now }, ttl);
    const claimed = notify ? await input.store.claimNotification(originalKey(visit), ttl) : false;
    return confirmed(next, claimed);
  }
  if (currentSlot?.kind === "slot" && currentSlot.visitHash === visit.visitHash && currentSlot.status !== "scheduled") {
    await input.store.compare(slotKey, currentSlot.token, ["reserving"], { ...slot, status: "reserving", jobberCallStartedAt: null, updatedAt: input.now - MUTATION_DEADLINE_MS - 1 }, ttl);
  }
  return { code: "time_not_reserved" as const, message: appointmentSavedTimeMessage };
}

function markMutating(visit: VisitRecord, slot: SlotRecord, now: number) {
  const token = newToken();
  const slotToken = newToken();
  return {
    visit: { ...visit, status: "mutating" as const, token, jobberCallStartedAt: now, updatedAt: now },
    slot: { ...slot, status: "reserving" as const, token: slotToken, visitHash: visit.visitHash, jobberCallStartedAt: now, updatedAt: now },
  };
}

function reservingSlot(visit: VisitRecord, now: number): SlotRecord {
  return {
    kind: "slot",
    status: "reserving",
    token: newToken(),
    visitHash: visit.visitHash,
    jobberCallStartedAt: null,
    updatedAt: now,
  };
}

function originalKey(visit: VisitRecord) {
  return `appointment:visit:${visit.visitHash}`;
}

function targetFromVisit(visit: VisitRecord): Pick<JobberAppointmentPayload, "schedule"> {
  const slot = ["8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM"][visit.hour - 8];
  return { schedule: { date: visit.date, timeSlot: slot as JobberAppointmentPayload["schedule"]["timeSlot"], duration: "1h", timeZone: "America/Los_Angeles" } };
}

export function storedVisitTarget(visit: VisitRecord): Pick<JobberAppointmentPayload, "contact" | "address"> {
  return {
    contact: {
      email: visit.email,
      firstName: "",
      lastName: "",
      companyName: "",
      phone: "",
    },
    address: { street: visit.street, unit: visit.unit, city: visit.city, state: visit.state, zip: visit.zip },
  };
}

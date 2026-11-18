import { createHash, randomBytes } from "node:crypto";
import { pacificWallTimeToUtc } from "./booking-schedule";
import { APPOINTMENT_TIME_SLOTS, type JobberAppointmentPayload } from "./booking-types";

export const MUTATION_DEADLINE_MS = 20_000;
export const QUARANTINE_MS = 5 * 60_000;
export const SLOT_HOLD_MS = 48 * 60 * 60 * 1000;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizePart(value: string) {
  return value.trim().toLowerCase().replace(/[.,#]/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizeZip(zip: string) {
  return zip.replace(/\D/g, "");
}

export function normalizeState(state: string) {
  return state.trim().toUpperCase();
}

export type NormalizedAddress = {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
};

export function normalizeAddress(address: JobberAppointmentPayload["address"]): NormalizedAddress {
  return {
    street: normalizePart(address.street),
    unit: normalizePart(address.unit),
    city: normalizePart(address.city),
    state: normalizeState(address.state),
    zip: normalizeZip(address.zip),
  };
}

export function sameAddress(left: NormalizedAddress, right: NormalizedAddress) {
  return (
    left.street === right.street &&
    left.unit === right.unit &&
    left.city === right.city &&
    left.state === right.state &&
    left.zip === right.zip
  );
}

export function jobberAddressMatches(
  appointment: Pick<JobberAppointmentPayload, "address">,
  property: {
    street1?: string | null;
    street2?: string | null;
    city?: string | null;
    province?: string | null;
    postalCode?: string | null;
  },
) {
  return sameAddress(normalizeAddress(appointment.address), {
    street: normalizePart(property.street1 ?? ""),
    unit: normalizePart(property.street2 ?? ""),
    city: normalizePart(property.city ?? ""),
    state: normalizeState(property.province ?? ""),
    zip: normalizeZip(property.postalCode ?? ""),
  });
}

export function visitRequestTitle(referenceId: string) {
  return `Website Appointment Booking ${referenceId}`;
}

export function titleMatchesVisit(title: string | null | undefined, referenceId: string) {
  return title === visitRequestTitle(referenceId);
}

export function slotHour(timeSlot: string) {
  return APPOINTMENT_TIME_SLOTS.find((item) => item.label === timeSlot)?.startHour ?? null;
}

export function visitIdentity(appointment: JobberAppointmentPayload) {
  const hour = slotHour(appointment.schedule.timeSlot);
  if (hour === null) return null;
  const address = normalizeAddress(appointment.address);
  const email = normalizeEmail(appointment.contact.email);
  const date = appointment.schedule.date;
  const material = [email, address.street, address.unit, address.city, address.state, address.zip, date, String(hour)].join("|");
  const visitHash = createHash("sha256").update(material).digest("hex");
  return { email, address, date, hour, visitHash, slotKey: `appointment:slot:${date}:${hour}`, visitKey: `appointment:visit:${visitHash}` };
}

export function retentionSeconds(date: string, hour: number, now: number) {
  const end = pacificWallTimeToUtc(date, (hour + 1) * 60) + SLOT_HOLD_MS;
  return Math.max(60, Math.ceil((end - now) / 1000));
}

export function newToken() {
  return randomBytes(16).toString("hex");
}

export function protectionEnds(record: { jobberCallStartedAt: number | null; updatedAt: number }) {
  if (record.jobberCallStartedAt) return record.jobberCallStartedAt + MUTATION_DEADLINE_MS + QUARANTINE_MS;
  return record.updatedAt + MUTATION_DEADLINE_MS;
}

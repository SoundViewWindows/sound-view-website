import { openSlotLabels } from "./booking-schedule";
import { appointmentLocationByName, type AppointmentLocationName } from "./schedule-config";

export const APPOINTMENT_PRODUCTS = [
  "Windows",
  "Exterior Doors",
  "Interior Doors",
  "Shower door/Shower Enclosure",
  "Replacement Glass",
  "Commercial Glass",
  "Other",
] as const;

export const APPOINTMENT_TIME_SLOTS = [
  { label: "8:00 AM - 9:00 AM", startHour: 8 },
  { label: "9:00 AM - 10:00 AM", startHour: 9 },
  { label: "10:00 AM - 11:00 AM", startHour: 10 },
  { label: "11:00 AM - 12:00 PM", startHour: 11 },
  { label: "12:00 PM - 1:00 PM", startHour: 12 },
  { label: "1:00 PM - 2:00 PM", startHour: 13 },
  { label: "2:00 PM - 3:00 PM", startHour: 14 },
  { label: "3:00 PM - 4:00 PM", startHour: 15 },
] as const;

export const REFERRAL_SOURCES = [
  "Google Search",
  "Referral / Friend or Family",
  "Previous Customer",
  "Showroom Visit",
  "Social Media",
  "Other",
] as const;

export const US_STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["DC", "District of Columbia"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
] as const;

export const APPOINTMENT_TIME_ZONE = "America/Los_Angeles" as const;
export const APPOINTMENT_DURATION = "1h" as const;

export type AppointmentProduct = (typeof APPOINTMENT_PRODUCTS)[number];
export type AppointmentTimeSlot = (typeof APPOINTMENT_TIME_SLOTS)[number]["label"];
export type ReferralSource = (typeof REFERRAL_SOURCES)[number];

export type JobberAppointmentImage = {
  name: string;
  type: string;
  size: number;
};

export type JobberAppointmentPayload = {
  location: AppointmentLocationName;
  contact: {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    unit: string;
    city: string;
    state: string;
    zip: string;
  };
  serviceDetails: {
    scopeOfWork: string;
    products: AppointmentProduct[];
    installationNeeded: boolean;
    workingWithSoundView: boolean;
    workingWithName: string;
    images: JobberAppointmentImage[];
    referralSource: ReferralSource | "";
  };
  schedule: {
    date: string;
    timeSlot: AppointmentTimeSlot;
    duration: typeof APPOINTMENT_DURATION;
    timeZone: typeof APPOINTMENT_TIME_ZONE;
  };
  consents: {
    marketingEmail: boolean;
    transactionalSms: true;
    marketingSms: boolean;
  };
  submittedAt: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_PATTERN = /^\d{5}(-\d{4})?$/;
const STATE_CODES = new Set<string>(US_STATES.map(([code]) => code));
const PRODUCT_SET = new Set<string>(APPOINTMENT_PRODUCTS);
const REFERRAL_SET = new Set<string>(REFERRAL_SOURCES);

export function pacificTodayIso(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: APPOINTMENT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function pacificHour(now = new Date()) {
  const value = new Intl.DateTimeFormat("en-US", {
    timeZone: APPOINTMENT_TIME_ZONE,
    hour: "2-digit",
    hourCycle: "h23",
  }).format(now);
  return Number(value);
}

export function pacificTodayParts(now = new Date()) {
  const iso = pacificTodayIso(now);
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month: month - 1, day };
}

export function isWeekendDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return true;
  const day = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))).getUTCDay();
  return day === 0 || day === 6;
}

export function isBookableDate(iso: string, now = new Date()) {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso) && !isWeekendDate(iso) && iso >= pacificTodayIso(now);
}

export function isBookableSlot(iso: string, startHour: number, now = new Date()) {
  if (!isBookableDate(iso, now)) return false;
  if (iso !== pacificTodayIso(now)) return true;
  return startHour > pacificHour(now);
}

export function formatPhoneInput(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function parseJobberAppointmentPayload(
  input: unknown,
  now = new Date(),
): { ok: true; value: JobberAppointmentPayload } | { ok: false; message: string } {
  const body = asRecord(input);
  if (!body) return { ok: false, message: "Appointment details are missing." };

  const location = appointmentLocationByName(text(body.location, 40));
  if (!location) return { ok: false, message: "Select a Sound View location." };

  const contact = asRecord(body.contact);
  const address = asRecord(body.address);
  const serviceDetails = asRecord(body.serviceDetails);
  const schedule = asRecord(body.schedule);
  const consents = asRecord(body.consents);
  if (!contact || !address || !serviceDetails || !schedule || !consents) {
    return { ok: false, message: "Appointment details are incomplete." };
  }

  const firstName = text(contact.firstName, 80);
  const lastName = text(contact.lastName, 80);
  const companyName = text(contact.companyName, 120);
  const email = text(contact.email, 160);
  const phone = formatPhoneInput(text(contact.phone, 24));
  if (!firstName || !lastName) return { ok: false, message: "First and last name are required." };
  if (!EMAIL_PATTERN.test(email)) return { ok: false, message: "Enter a valid email address." };
  if (phone.replace(/\D/g, "").length !== 10) return { ok: false, message: "Enter a 10-digit phone number." };

  const street = text(address.street, 160);
  const unit = text(address.unit, 40);
  const city = text(address.city, 80);
  const state = text(address.state, 2).toUpperCase();
  const zip = text(address.zip, 10);
  if (!street || !city) return { ok: false, message: "Street address and city are required." };
  if (!STATE_CODES.has(state)) return { ok: false, message: "Choose a valid state." };
  if (!ZIP_PATTERN.test(zip)) return { ok: false, message: "Enter a valid ZIP code." };

  const scopeOfWork = text(serviceDetails.scopeOfWork, 4000);
  if (!scopeOfWork) return { ok: false, message: "Describe the project before continuing." };
  if (!Array.isArray(serviceDetails.products) || serviceDetails.products.length === 0) {
    return { ok: false, message: "Select at least one product." };
  }
  const products: AppointmentProduct[] = [];
  for (const product of serviceDetails.products) {
    if (typeof product !== "string" || !PRODUCT_SET.has(product) || products.includes(product as AppointmentProduct)) {
      return { ok: false, message: "Select at least one product." };
    }
    products.push(product as AppointmentProduct);
  }
  if (typeof serviceDetails.installationNeeded !== "boolean") {
    return { ok: false, message: "Tell us whether installation is needed." };
  }
  if (typeof serviceDetails.workingWithSoundView !== "boolean") {
    return { ok: false, message: "Appointment details are incomplete." };
  }
  const workingWithName = serviceDetails.workingWithSoundView ? text(serviceDetails.workingWithName, 120) : "";
  const images = parseImages(serviceDetails.images);
  if (!images) return { ok: false, message: "Attach up to 10 image files." };
  const referralSource = text(serviceDetails.referralSource, 80);
  if (referralSource && !REFERRAL_SET.has(referralSource)) {
    return { ok: false, message: "Choose a valid referral source." };
  }

  const date = text(schedule.date, 10);
  const timeSlot = text(schedule.timeSlot, 40);
  const slot = APPOINTMENT_TIME_SLOTS.find((item) => item.label === timeSlot);
  if (!slot || !openSlotLabels(date, [], now).includes(slot.label)) {
    return { ok: false, message: "Choose an available weekday and time." };
  }
  if (schedule.duration !== APPOINTMENT_DURATION || schedule.timeZone !== APPOINTMENT_TIME_ZONE) {
    return { ok: false, message: "Choose an available weekday and time." };
  }

  if (typeof consents.marketingEmail !== "boolean" || typeof consents.marketingSms !== "boolean") {
    return { ok: false, message: "Appointment details are incomplete." };
  }
  if (consents.transactionalSms !== true) {
    return { ok: false, message: "A phone number agrees to visit reminder texts." };
  }

  return {
    ok: true,
    value: {
      location: location.name,
      contact: { firstName, lastName, companyName, email, phone },
      address: { street, unit, city, state, zip },
      serviceDetails: {
        scopeOfWork,
        products,
        installationNeeded: serviceDetails.installationNeeded,
        workingWithSoundView: serviceDetails.workingWithSoundView,
        workingWithName,
        images,
        referralSource: referralSource as ReferralSource | "",
      },
      schedule: {
        date,
        timeSlot: slot.label,
        duration: APPOINTMENT_DURATION,
        timeZone: APPOINTMENT_TIME_ZONE,
      },
      consents: {
        marketingEmail: consents.marketingEmail,
        transactionalSms: true,
        marketingSms: consents.marketingSms,
      },
      submittedAt: now.toISOString(),
    },
  };
}

function parseImages(value: unknown): JobberAppointmentImage[] | null {
  if (!Array.isArray(value) || value.length > 10) return null;
  const images: JobberAppointmentImage[] = [];
  for (const item of value) {
    const record = asRecord(item);
    if (!record) return null;
    const name = text(record.name, 180);
    const type = text(record.type, 80);
    const size = record.size;
    if (!name || !type.startsWith("image/")) return null;
    if (typeof size !== "number" || !Number.isFinite(size) || size < 0 || size > 15_000_000) return null;
    images.push({ name, type, size: Math.round(size) });
  }
  return images;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

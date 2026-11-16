export const BOOKING_SCHEDULE_CONFIG = {
  timeZone: "America/Los_Angeles",
  slotDurationMinutes: 60,
  minAdvanceNoticeHours: 24,
  maxDaysInAdvance: 60,
  estimatorsPerSlot: 1,
  weeklyHours: {
    monday: { start: "08:00", end: "16:00" },
    tuesday: { start: "08:00", end: "16:00" },
    wednesday: { start: "08:00", end: "16:00" },
    thursday: { start: "08:00", end: "16:00" },
    friday: { start: "08:00", end: "16:00" },
    saturday: null,
    sunday: null,
  },
} as const;

export type BookingWeekday = keyof typeof BOOKING_SCHEDULE_CONFIG.weeklyHours;

const WEEKDAYS: BookingWeekday[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export type BusyInterval = { start: number; end: number };

export function pacificYearMonth(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_SCHEDULE_CONFIG.timeZone,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value ?? "1970";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  return `${year}-${month}`;
}

export function datesInMonth(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);
  const count = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  return Array.from({ length: count }, (_, index) => `${month}-${String(index + 1).padStart(2, "0")}`);
}

export function monthQueryWindow(month: string, now = new Date()) {
  const dates = datesInMonth(month);
  const monthStart = pacificWallTimeToUtc(dates[0] ?? `${month}-01`, 0);
  const [year, monthNumber] = month.split("-").map(Number);
  const nextMonth = monthNumber === 12 ? `${year + 1}-01-01` : `${year}-${String(monthNumber + 1).padStart(2, "0")}-01`;
  const monthEnd = pacificWallTimeToUtc(nextMonth, 0);
  const earliest = now.getTime() + BOOKING_SCHEDULE_CONFIG.minAdvanceNoticeHours * 60 * 60 * 1000;
  const latest = now.getTime() + BOOKING_SCHEDULE_CONFIG.maxDaysInAdvance * 24 * 60 * 60 * 1000;
  return { start: Math.max(monthStart, earliest), end: Math.min(monthEnd, latest) };
}

export function buildMonthAvailability(month: string, busy: BusyInterval[], now = new Date()) {
  const availability: Record<string, string[]> = {};
  for (const date of datesInMonth(month)) {
    const open = openSlotLabels(date, busy, now);
    if (open.length > 0) availability[date] = open;
  }
  return availability;
}

export function openSlotLabels(date: string, busy: BusyInterval[], now = new Date()) {
  return candidateSlots(date, now)
    .filter((slot) => overlappingCount(slot, busy) < BOOKING_SCHEDULE_CONFIG.estimatorsPerSlot)
    .map((slot) => slot.label);
}

export function isOpenSlot(date: string, label: string, busy: BusyInterval[], now = new Date()) {
  return openSlotLabels(date, busy, now).includes(label);
}

function candidateSlots(date: string, now: Date) {
  const hours = BOOKING_SCHEDULE_CONFIG.weeklyHours[weekdayKey(date)];
  if (!hours) return [];
  const startMinutes = clockToMinutes(hours.start);
  const endMinutes = clockToMinutes(hours.end);
  const duration = BOOKING_SCHEDULE_CONFIG.slotDurationMinutes;
  const earliest = now.getTime() + BOOKING_SCHEDULE_CONFIG.minAdvanceNoticeHours * 60 * 60 * 1000;
  const latest = now.getTime() + BOOKING_SCHEDULE_CONFIG.maxDaysInAdvance * 24 * 60 * 60 * 1000;
  const slots: { label: string; start: number; end: number }[] = [];
  for (let cursor = startMinutes; cursor + duration <= endMinutes; cursor += duration) {
    const start = pacificWallTimeToUtc(date, cursor);
    const end = start + duration * 60 * 1000;
    if (start <= now.getTime() || start < earliest || start >= latest) continue;
    slots.push({ label: `${clockLabel(cursor)} - ${clockLabel(cursor + duration)}`, start, end });
  }
  return slots;
}

function overlappingCount(slot: { start: number; end: number }, busy: BusyInterval[]) {
  return busy.filter((interval) => interval.start < slot.end && interval.end > slot.start).length;
}

export function pacificWallTimeToUtc(isoDate: string, minutesFromMidnight: number) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const hour = Math.floor(minutesFromMidnight / 60);
  const minute = minutesFromMidnight % 60;
  const wall = Date.UTC(year, month - 1, day, hour, minute, 0);
  let utc = wall;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const zoned = zonedPartsAsUtc(new Date(utc));
    const next = wall - (zoned - utc);
    if (next === utc) break;
    utc = next;
  }
  return utc;
}

function zonedPartsAsUtc(instant: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_SCHEDULE_CONFIG.timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);
  const read = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);
  return Date.UTC(read("year"), read("month") - 1, read("day"), read("hour"), read("minute"), read("second"));
}

function weekdayKey(isoDate: string): BookingWeekday {
  const [year, month, day] = isoDate.split("-").map(Number);
  return WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()] ?? "sunday";
}

function clockToMinutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function clockLabel(minutesFromMidnight: number) {
  const hours24 = Math.floor(minutesFromMidnight / 60);
  const minutes = minutesFromMidnight % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

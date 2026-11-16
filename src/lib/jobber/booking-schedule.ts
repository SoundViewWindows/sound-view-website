const MIN_ADVANCE_HOURS = 24;

export const BOOKING_SCHEDULE_CONFIG = {
  timeZone: "America/Los_Angeles",
  slotDurationMinutes: 60,
  minAdvanceHours: MIN_ADVANCE_HOURS,
  minAdvanceNoticeHours: MIN_ADVANCE_HOURS,
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

const ADVANCE_NOTICE_MS = BOOKING_SCHEDULE_CONFIG.minAdvanceHours * 60 * 60 * 1000;

export function isSlotAtLeastAdvanceNotice(slotStartUtcMs: number, nowMs = Date.now()) {
  return slotStartUtcMs >= nowMs + ADVANCE_NOTICE_MS;
}

// Add company closure days as "YYYY-MM-DD" strings, for example "2026-12-26".
export const EXTRA_BLACKOUT_DATES: string[] = [];

export function getClosedHolidayName(dateStr: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (isNewYearsClosure(year, month, day)) return "New Year's Day";
  if (month === 5 && day === nthWeekdayOfMonth(year, 4, 1, -1)) return "Memorial Day";
  if (isObservedFixedHoliday(year, 6, 4, month, day)) return "Independence Day";
  if (month === 9 && day === nthWeekdayOfMonth(year, 8, 1, 1)) return "Labor Day";
  if (month === 11 && day === nthWeekdayOfMonth(year, 10, 4, 4)) return "Thanksgiving Day";
  if (isObservedFixedHoliday(year, 11, 25, month, day)) return "Christmas Day";
  return null;
}

export function isCompanyClosedDate(dateStr: string) {
  return Boolean(getClosedHolidayName(dateStr)) || EXTRA_BLACKOUT_DATES.includes(dateStr);
}

export function slotLabelStartUtcMs(dateStr: string, label: string) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(label.trim());
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hour += 12;
  return pacificWallTimeToUtc(dateStr, hour * 60 + Number(match[2]));
}

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
  const earliest = now.getTime() + ADVANCE_NOTICE_MS;
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
  if (isCompanyClosedDate(date)) return [];
  return candidateSlots(date, now)
    .filter((slot) => overlappingCount(slot, busy) < BOOKING_SCHEDULE_CONFIG.estimatorsPerSlot)
    .filter((slot) => isSlotAtLeastAdvanceNotice(slot.start, now.getTime()))
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
  const latest = now.getTime() + BOOKING_SCHEDULE_CONFIG.maxDaysInAdvance * 24 * 60 * 60 * 1000;
  const slots: { label: string; start: number; end: number }[] = [];
  for (let cursor = startMinutes; cursor + duration <= endMinutes; cursor += duration) {
    const start = pacificWallTimeToUtc(date, cursor);
    const end = start + duration * 60 * 1000;
    if (!isSlotAtLeastAdvanceNotice(start, now.getTime()) || start >= latest) continue;
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

function isNewYearsClosure(year: number, month: number, day: number) {
  if (month === 1 && (day === 1 || (day === 2 && weekdayOf(year, 0, 1) === 0))) return true;
  const nextNewYear = weekdayOf(year + 1, 0, 1);
  return month === 12 && day === 31 && nextNewYear === 6;
}

function isObservedFixedHoliday(year: number, holidayMonthIndex: number, holidayDay: number, month: number, day: number) {
  if (month === holidayMonthIndex + 1 && day === holidayDay) return true;
  const weekday = weekdayOf(year, holidayMonthIndex, holidayDay);
  if (weekday === 6 && month === holidayMonthIndex + 1 && day === holidayDay - 1) return true;
  if (weekday === 0 && month === holidayMonthIndex + 1 && day === holidayDay + 1) return true;
  return false;
}

function nthWeekdayOfMonth(year: number, monthIndex: number, weekday: number, nth: number) {
  const count = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  if (nth < 0) {
    for (let day = count; day >= 1; day -= 1) {
      if (weekdayOf(year, monthIndex, day) === weekday) return day;
    }
    return 0;
  }
  let seen = 0;
  for (let day = 1; day <= count; day += 1) {
    if (weekdayOf(year, monthIndex, day) !== weekday) continue;
    seen += 1;
    if (seen === nth) return day;
  }
  return 0;
}

function weekdayOf(year: number, monthIndex: number, day: number) {
  return new Date(Date.UTC(year, monthIndex, day)).getUTCDay();
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

const AVAILABILITY_CACHE_MS = 10_000;

type CachedMonthAvailability<T> = { expiresAt: number; body: T };

const monthAvailabilityCache = new Map<string, CachedMonthAvailability<unknown>>();

export function getCachedMonthAvailability<T>(month: string): T | null {
  const cached = monthAvailabilityCache.get(month);
  if (!cached || cached.expiresAt <= Date.now()) return null;
  return cached.body as T;
}

export function setCachedMonthAvailability<T>(month: string, body: T) {
  monthAvailabilityCache.set(month, { expiresAt: Date.now() + AVAILABILITY_CACHE_MS, body });
}

export function clearAvailabilityCache() {
  monthAvailabilityCache.clear();
}

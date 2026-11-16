import { NextResponse } from "next/server";
import { getLiveAvailability } from "@/lib/jobber/live-availability";
import {
  datesInMonth,
  getCachedMonthAvailability,
  isCompanyClosedDate,
  isSlotAtLeastAdvanceNotice,
  pacificYearMonth,
  setCachedMonthAvailability,
  slotLabelStartUtcMs,
} from "@/lib/jobber/booking-schedule";

type MonthAvailabilityBody = {
  ok: true;
  month: string;
  timeZone: string;
  syncedWithJobber: boolean;
  busyCount: number;
  busySample: { title: string; startAt: string; endAt: string }[];
  permissionWarning: string | null;
  availabilityError: string | null;
  availability: Record<string, string[]>;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const month = url.searchParams.get("month")?.trim() || pacificYearMonth();
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    return NextResponse.json({ ok: false, message: "Choose a valid month." }, { status: 400 });
  }

  const cached = getCachedMonthAvailability<MonthAvailabilityBody>(month);
  if (cached) {
    return NextResponse.json(cached, { headers: { "Cache-Control": "no-store" } });
  }

  const live = await getLiveAvailability(month);
  const nowMs = Date.now();
  const availability: Record<string, string[]> = {};
  for (const date of datesInMonth(month)) {
    if (isCompanyClosedDate(date)) {
      availability[date] = [];
      continue;
    }
    availability[date] = (live.availability[date] ?? []).filter((label) => {
      const start = slotLabelStartUtcMs(date, label);
      return start !== null && isSlotAtLeastAdvanceNotice(start, nowMs);
    });
  }
  const body: MonthAvailabilityBody = {
    ok: true,
    month: live.month,
    timeZone: live.timeZone,
    syncedWithJobber: live.syncedWithJobber,
    busyCount: live.busyCount,
    busySample: live.busySample,
    permissionWarning: live.permissionWarning,
    availabilityError: live.availabilityError,
    availability,
  };
  setCachedMonthAvailability(month, body);
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}

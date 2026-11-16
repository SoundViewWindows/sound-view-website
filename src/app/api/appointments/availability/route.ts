import { NextResponse } from "next/server";
import { getLiveAvailability } from "@/lib/jobber/live-availability";
import {
  datesInMonth,
  isCompanyClosedDate,
  isSlotAtLeastAdvanceNotice,
  pacificYearMonth,
  slotLabelStartUtcMs,
} from "@/lib/jobber/booking-schedule";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const month = url.searchParams.get("month")?.trim() || pacificYearMonth();
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    return NextResponse.json({ ok: false, message: "Choose a valid month." }, { status: 400 });
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
  return NextResponse.json(
    {
      ok: true,
      month: live.month,
      timeZone: live.timeZone,
      syncedWithJobber: live.syncedWithJobber,
      busyCount: live.busyCount,
      busySample: live.busySample,
      availabilityError: live.availabilityError,
      availability,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

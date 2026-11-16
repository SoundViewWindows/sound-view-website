import { NextResponse } from "next/server";
import { getLiveAvailability } from "@/lib/jobber/live-availability";
import {
  datesInMonth,
  isCompanyClosedDate,
  isSlotAtLeastAdvanceNotice,
  pacificYearMonth,
  slotLabelStartUtcMs,
} from "@/lib/jobber/booking-schedule";

const CACHE_MS = 10_000;

type CachedMonth = {
  expiresAt: number;
  body: {
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
};

const monthCache = new Map<string, CachedMonth>();

export function clearAvailabilityCache() {
  monthCache.clear();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const month = url.searchParams.get("month")?.trim() || pacificYearMonth();
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    return NextResponse.json({ ok: false, message: "Choose a valid month." }, { status: 400 });
  }

  const cached = monthCache.get(month);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.body, { headers: { "Cache-Control": "no-store" } });
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
  const body: CachedMonth["body"] = {
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
  monthCache.set(month, { expiresAt: Date.now() + CACHE_MS, body });
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}

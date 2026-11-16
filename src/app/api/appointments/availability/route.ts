import { NextResponse } from "next/server";
import { getLiveAvailability } from "@/lib/jobber/live-availability";
import { pacificYearMonth } from "@/lib/jobber/booking-schedule";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const month = url.searchParams.get("month")?.trim() || pacificYearMonth();
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    return NextResponse.json({ ok: false, message: "Choose a valid month." }, { status: 400 });
  }

  const live = await getLiveAvailability(month);
  return NextResponse.json(
    {
      ok: true,
      month: live.month,
      timeZone: live.timeZone,
      syncedWithJobber: live.syncedWithJobber,
      availability: live.availability,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

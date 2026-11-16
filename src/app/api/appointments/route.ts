import { NextResponse } from "next/server";
import { parseJobberAppointmentPayload } from "@/lib/jobber/booking-types";
import { clearAvailabilityCache, isCompanyClosedDate, isSlotAtLeastAdvanceNotice, slotLabelStartUtcMs } from "@/lib/jobber/booking-schedule";
import { jobberConfig } from "@/lib/jobber/config";
import { appointmentSummary, createWebsiteAppointment } from "@/lib/jobber/create-appointment-request";
import { getLiveAvailability } from "@/lib/jobber/live-availability";
import { logQuoteNotificationFailure, sendAppointmentNotification } from "@/lib/jobber/notify";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseJobberAppointmentPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, message: parsed.message }, { status: 400 });
  }

  const requestedDate = parsed.value.schedule.date;
  if (isCompanyClosedDate(requestedDate)) {
    return NextResponse.json(
      {
        ok: false,
        code: "HOLIDAY_CLOSED",
        message: "We are closed for the holiday on that date. Please choose another available business day.",
      },
      { status: 400 },
    );
  }
  const slotStartUtcMs = slotLabelStartUtcMs(requestedDate, parsed.value.schedule.timeSlot);
  if (slotStartUtcMs === null || !isSlotAtLeastAdvanceNotice(slotStartUtcMs, Date.now())) {
    return NextResponse.json(
      {
        ok: false,
        code: "TOO_SOON",
        message: "Appointments must be scheduled at least 24 hours in advance. Please select a later date or time.",
      },
      { status: 400 },
    );
  }

  const referenceId = createReferenceId();
  const summary = appointmentSummary(parsed.value, referenceId);
  let jobberSynced = false;
  let jobberRequestId: string | null = null;
  let jobberWebUri: string | null = null;

  clearAvailabilityCache();
  const month = parsed.value.schedule.date.slice(0, 7);
  const live = await getLiveAvailability(month);
  const openSlots = live.availability[parsed.value.schedule.date] ?? [];
  if (!live.syncedWithJobber || !openSlots.includes(parsed.value.schedule.timeSlot)) {
    return NextResponse.json(
      {
        ok: false,
        code: "SLOT_UNAVAILABLE",
        message: live.syncedWithJobber
          ? "That time slot was just booked. Please select another available time."
          : "We could not confirm that this time is still open. Please select another available time.",
      },
      { status: 409 },
    );
  }

  if (jobberConfig().writesEnabled) {
    try {
      const synced = await createWebsiteAppointment(parsed.value, referenceId);
      jobberSynced = synced.jobberSynced;
      jobberRequestId = synced.jobberRequestId;
      jobberWebUri = synced.jobberWebUri;
    } catch (error) {
      console.error(
        "appointment Jobber sync failed",
        error instanceof Error ? error.message : "Jobber did not accept the appointment.",
      );
    }
  } else {
    console.info("appointment Jobber sync skipped because writes are disabled", { referenceId });
  }

  try {
    await sendAppointmentNotification({
      referenceId,
      requestTitle: summary.title,
      name: `${parsed.value.contact.firstName} ${parsed.value.contact.lastName}`,
      companyName: parsed.value.contact.companyName,
      phone: parsed.value.contact.phone,
      email: parsed.value.contact.email,
      address: summary.address,
      location: summary.location,
      requestedWhen: summary.requestedWhen,
      products: summary.products,
      installationNeeded: summary.installationNeeded,
      workingWith: summary.workingWith,
      referralSource: summary.referralSource,
      scopeOfWork: summary.scopeOfWork,
      marketingEmail: parsed.value.consents.marketingEmail ? "Yes" : "No",
      marketingSms: parsed.value.consents.marketingSms ? "Yes" : "No",
      imageNames: summary.imageNames,
      jobberRequestId,
      jobberWebUri,
    });
  } catch (error) {
    logQuoteNotificationFailure(
      jobberRequestId || referenceId,
      error instanceof Error ? error.message : "The notification email did not send.",
    );
  }

  clearAvailabilityCache();
  return NextResponse.json({
    ok: true,
    referenceId,
    jobberSynced,
    jobberRequestId,
  });
}

function createReferenceId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  return `SV-${code}`;
}

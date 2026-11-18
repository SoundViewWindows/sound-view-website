import { NextResponse } from "next/server";
import { appointmentSaveError } from "@/lib/jobber/appointment-confirmation";
import { storedVisitTarget, runGuardedAppointment } from "@/lib/jobber/appointment-guard";
import { appointmentLockStore } from "@/lib/jobber/appointment-lock";
import { parseJobberAppointmentPayload } from "@/lib/jobber/booking-types";
import { clearAvailabilityCache, isCompanyClosedDate, isSlotAtLeastAdvanceNotice, slotLabelStartUtcMs } from "@/lib/jobber/booking-schedule";
import { jobberConfig } from "@/lib/jobber/config";
import { appointmentSummary, createWebsiteAppointment, lookupAppointmentRequest } from "@/lib/jobber/create-appointment-request";
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

  if (!jobberConfig().writesEnabled) {
    return NextResponse.json({ ok: false, message: appointmentSaveError }, { status: 503 });
  }
  const store = appointmentLockStore();
  if (!store) {
    return NextResponse.json({ ok: false, message: appointmentSaveError }, { status: 503 });
  }

  const outcome = await runGuardedAppointment({
    now: Date.now(),
    appointment: parsed.value,
    store,
    readCalendar: () => readRequestedHour(parsed.value.schedule.date, parsed.value.schedule.timeSlot),
    lookup: (visit) => lookupAppointmentRequest(storedVisitTarget(visit), visit.referenceId),
    createRequest: async (visit) => {
      const synced = await createWebsiteAppointment(parsed.value, visit.referenceId, null);
      if (!synced.jobberRequestId) return null;
      return { requestId: synced.jobberRequestId, jobberWebUri: synced.jobberWebUri, assessment: synced.assessment };
    },
    scheduleRequest: async (visit) => {
      const synced = await createWebsiteAppointment(parsed.value, visit.referenceId, visit.requestId);
      return synced.assessment;
    },
    createReferenceId,
  });

  if (outcome.code === "processing") {
    return NextResponse.json({ ok: false, code: "PROCESSING", message: outcome.message }, { status: 409 });
  }
  if (outcome.code === "time_not_reserved") {
    return NextResponse.json({ ok: false, code: "TIME_NOT_RESERVED", message: outcome.message }, { status: 409 });
  }
  if (outcome.code === "unconfirmed") {
    return NextResponse.json({ ok: false, code: "UNCONFIRMED", message: outcome.message }, { status: 409 });
  }
  if (outcome.code === "unavailable") {
    return NextResponse.json({ ok: false, code: "SLOT_UNAVAILABLE", message: outcome.message }, { status: 409 });
  }
  if (outcome.code !== "confirmed") {
    return NextResponse.json({ ok: false, message: appointmentSaveError }, { status: 502 });
  }

  const referenceId = outcome.referenceId;
  const summary = appointmentSummary(parsed.value, referenceId);
  if (outcome.notify) {
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
        jobberRequestId: outcome.requestId,
        jobberWebUri: outcome.jobberWebUri,
      });
    } catch (error) {
      logQuoteNotificationFailure(
        outcome.requestId,
        error instanceof Error ? error.message : "The notification email did not send.",
      );
    }
  }

  clearAvailabilityCache();
  return NextResponse.json({
    ok: true,
    jobberSynced: true,
    assessmentScheduled: true,
    jobberRequestId: outcome.requestId,
    referenceId,
  });
}

async function readRequestedHour(date: string, timeSlot: string) {
  clearAvailabilityCache();
  const live = await getLiveAvailability(date.slice(0, 7));
  if (!live.syncedWithJobber) return "failed" as const;
  return live.availability[date]?.includes(timeSlot) ? ("free" as const) : ("busy" as const);
}

function createReferenceId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  return `SV-${code}`;
}

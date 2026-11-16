import { NextResponse } from "next/server";
import { parseJobberAppointmentPayload } from "@/lib/jobber/booking-types";
import { jobberConfig } from "@/lib/jobber/config";
import { appointmentSummary, createWebsiteAppointment } from "@/lib/jobber/create-appointment-request";
import { logQuoteNotificationFailure, sendAppointmentNotification } from "@/lib/jobber/notify";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseJobberAppointmentPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, message: parsed.message }, { status: 400 });
  }

  const referenceId = createReferenceId();
  const summary = appointmentSummary(parsed.value, referenceId);
  let jobberSynced = false;
  let jobberRequestId: string | null = null;
  let jobberWebUri: string | null = null;

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

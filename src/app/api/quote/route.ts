import { NextResponse } from "next/server";
import { jobberConfig, missingQuoteNotifySettings } from "@/lib/jobber/config";
import { createWebsiteQuoteRequest } from "@/lib/jobber/create-quote-request";
import { sendQuoteNotification } from "@/lib/jobber/notify";

type QuoteBody = {
  name?: unknown;
  phone?: unknown;
  zip?: unknown;
  email?: unknown;
  projectType?: unknown;
  details?: unknown;
  photoNames?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as QuoteBody | null;
  const quote = normalize(body);
  if (!quote.ok) {
    return NextResponse.json({ ok: false, message: quote.message }, { status: 400 });
  }

  if (!jobberConfig().writesEnabled) {
    return NextResponse.json(
      {
        ok: false,
        message: "This quote form is not sending to Jobber yet. Your details are still here.",
      },
      { status: 403 },
    );
  }

  const missingNotify = missingQuoteNotifySettings();
  if (missingNotify.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Quote notifications are not configured yet, so nothing was sent to Jobber. Your details are still here.",
      },
      { status: 400 },
    );
  }

  try {
    const created = await createWebsiteQuoteRequest(quote.value);
    try {
      await sendQuoteNotification({
        name: quote.value.name,
        phone: quote.value.phone,
        email: quote.value.email,
        zip: quote.value.zip,
        serviceTitle: created.serviceTitle,
        details: quote.value.details,
        photoNames: quote.value.photoNames,
        requestTitle: created.title,
        jobberWebUri: created.jobberWebUri,
        requestId: created.requestId,
      });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Jobber created the request, but the notification email did not send. Your details are still here.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Jobber did not accept the quote request.";
    return NextResponse.json(
      { ok: false, message: `${message} Your details are still here.` },
      { status: 502 },
    );
  }
}

function normalize(body: QuoteBody | null):
  | { ok: true; value: { name: string; phone: string; zip: string; email: string; projectType: string; details: string; photoNames: string[] } }
  | { ok: false; message: string } {
  const name = stringValue(body?.name);
  const phone = stringValue(body?.phone);
  const zip = stringValue(body?.zip);
  const email = stringValue(body?.email);
  const projectType = stringValue(body?.projectType);
  const details = stringValue(body?.details);
  const photoNames = Array.isArray(body?.photoNames)
    ? body.photoNames.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, 5)
    : [];

  if (name.trim().length < 2) return { ok: false, message: "Enter your name. Your details are still here." };
  if (phone.replace(/\D/g, "").length < 10) {
    return { ok: false, message: "Enter a phone number with an area code. Your details are still here." };
  }
  if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
    return { ok: false, message: "Enter a 5 digit ZIP code. Your details are still here." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { ok: false, message: "Enter a valid email address. Your details are still here." };
  }
  if (!projectType) return { ok: false, message: "Choose a project type. Your details are still here." };
  if (details.trim().length > 500) {
    return { ok: false, message: "Keep project details under 500 characters. Your details are still here." };
  }

  return {
    ok: true,
    value: { name: name.trim(), phone: phone.trim(), zip: zip.trim(), email: email.trim(), projectType, details, photoNames },
  };
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

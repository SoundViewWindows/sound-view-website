import { NextResponse } from "next/server";
import { jobberConfig } from "@/lib/jobber/config";
import { createWebsiteQuoteRequest } from "@/lib/jobber/create-quote-request";
import { normalizeQuoteBody } from "@/lib/quote-payloads";

type QuoteBody = {
  name?: unknown;
  phone?: unknown;
  zip?: unknown;
  email?: unknown;
  projectType?: unknown;
  details?: unknown;
  photoNames?: unknown;
  answers?: unknown;
  form?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as QuoteBody | null;
  const quote = normalizeQuoteBody(body);
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

  try {
    await createWebsiteQuoteRequest(quote.value);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Jobber did not accept the quote request.";
    return NextResponse.json(
      { ok: false, message: `${message} Your details are still here.` },
      { status: 502 },
    );
  }
}


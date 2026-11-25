"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { QuoteThankYou } from "@/components/QuoteThankYou";
import { blindsQuoteSubmission } from "@/lib/quote-payloads";
import { submitWebsiteQuote } from "@/lib/quote-submit";

export function ShadeQuoteButton() {
  function scrollToRequest(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("blinds-quote-form")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    document.getElementById("blinds-name")?.focus({ preventScroll: true });
  }

  return (
    <a
      href="#blinds-quote-form"
      onClick={scrollToRequest}
      className="inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-bold text-[#0F1D2E] shadow-lg transition hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
    >
      Get My Free Blinds &amp; Shades Quote
    </a>
  );
}

export function BlindsQuoteRequest() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Enter a 10-digit phone number.";
    if (!/^\d{5}$/.test(zip.trim())) next.zip = "Enter a 5-digit zip code.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const field = next.name
        ? "blinds-name"
        : next.phone
          ? "blinds-phone"
          : next.zip
            ? "blinds-zip"
            : "blinds-email";
      document.getElementById(field)?.focus();
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    const result = await submitWebsiteQuote(
      blindsQuoteSubmission({
        name,
        phone,
        zip,
        email,
        notes,
      }),
    );
    setIsSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <QuoteThankYou
        id="blinds-quote"
        service="window"
        onReset={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <aside
      id="blinds-quote"
      className="relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7"
    >
      <form noValidate className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">
            Let&apos;s Find Your Perfect Window Treatments
          </h2>
          <p className="mt-1 text-xs text-home-mist">
            Tell us about your windows and preferred style. We&apos;ll help you narrow down the right blinds or shades for your home.
          </p>
        </div>
        <div>
          <label className={labelClass} htmlFor="blinds-name">
            Name
          </label>
          <input
            id="blinds-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={inputClass(Boolean(errors.name))}
          />
          {errors.name ? <FieldError message={errors.name} /> : null}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="blinds-phone">
              Phone
            </label>
            <input
              id="blinds-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="(206) 555-0123"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              className={inputClass(Boolean(errors.phone))}
            />
            {errors.phone ? <FieldError message={errors.phone} /> : null}
          </div>
          <div>
            <label className={labelClass} htmlFor="blinds-zip">
              Zip Code
            </label>
            <input
              id="blinds-zip"
              name="zip"
              type="text"
              required
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={5}
              placeholder="e.g. 98103"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              aria-invalid={Boolean(errors.zip)}
              className={inputClass(Boolean(errors.zip))}
            />
            {errors.zip ? <FieldError message={errors.zip} /> : null}
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="blinds-email">
            Email
          </label>
          <input
            id="blinds-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={inputClass(Boolean(errors.email))}
          />
          {errors.email ? <FieldError message={errors.email} /> : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="blinds-notes">
            Project Notes
            <span className="font-normal text-home-mist"> Optional</span>
          </label>
          <textarea
            id="blinds-notes"
            name="notes"
            rows={2}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Room, window count, or motorized shades..."
            className={inputClass(false)}
          />
        </div>
        {submitError ? (
          <p role="alert" className="text-sm font-medium text-red-200">
            {submitError}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-full rounded-lg bg-[#38BDF8] py-3.5 text-sm font-extrabold tracking-wide text-[#0F1D2E] shadow-lg transition hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting" : "GET MY FREE BLINDS & SHADES QUOTE →"}
        </button>
        <p className="text-center text-xs font-medium text-sky-200/90">
          Custom-fit window treatments &nbsp;•&nbsp; Manual and motorized options &nbsp;•&nbsp; Free, no-obligation estimate
        </p>
      </form>
    </aside>
  );
}

type FieldErrors = {
  name?: string;
  phone?: string;
  zip?: string;
  email?: string;
};

function FieldError({ message }: { message: string }) {
  return (
    <span role="alert" className="mt-1 block text-xs font-normal text-red-300">
      {message}
    </span>
  );
}

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white";

const fieldClass =
  "w-full rounded-[4px] border border-slate-600 bg-white px-3 py-2 text-sm text-[#0B192C] placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400";

function inputClass(invalid: boolean) {
  return invalid ? `${fieldClass} border-[#8C3A32]` : fieldClass;
}

"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { QuoteThankYou } from "@/components/QuoteThankYou";
import { railingQuoteSubmission } from "@/lib/quote-payloads";
import { submitWebsiteQuote } from "@/lib/quote-submit";

export function RequestInstallationButton() {
  function scrollToRequest(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("railing-quote-form")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    document.getElementById("railing-name")?.focus({ preventScroll: true });
  }

  return (
    <a
      href="#railing-quote-form"
      onClick={scrollToRequest}
      className="flex items-center gap-2 rounded-[4px] bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
    >
      Request a Free Installation Estimate
    </a>
  );
}

export function GlassRailingRequest() {
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
        ? "railing-name"
        : next.phone
          ? "railing-phone"
          : next.zip
            ? "railing-zip"
            : "railing-email";
      document.getElementById(field)?.focus();
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    const result = await submitWebsiteQuote(
      railingQuoteSubmission({
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
        id="railing-install"
        service="glass"
        onReset={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <aside
      id="railing-install"
      className="relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7"
    >
        <form noValidate className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">Let&apos;s Plan Your Glass Railing Project</h2>
            <p className="mt-1 text-xs text-home-mist">
              Tell us where you want glass railings installed and what you&apos;re envisioning. We&apos;ll help you take the next step toward a custom solution.
            </p>
          </div>
          <div>
            <label className={labelClass} htmlFor="railing-name">
              Name
            </label>
            <input
              id="railing-name"
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
              <label className={labelClass} htmlFor="railing-phone">
                Phone
              </label>
              <input
                id="railing-phone"
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
              <label className={labelClass} htmlFor="railing-zip">
                Zip Code
              </label>
              <input
                id="railing-zip"
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
            <label className={labelClass} htmlFor="railing-email">
              Email
            </label>
            <input
              id="railing-email"
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
            <label className={labelClass} htmlFor="railing-notes">
              Project Notes
              <span className="font-normal text-home-mist"> Optional</span>
            </label>
            <textarea
              id="railing-notes"
              name="notes"
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Deck, balcony, staircase, or approximate length..."
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
            {isSubmitting ? "Submitting" : "GET MY FREE RAILING ESTIMATE →"}
          </button>
          <p className="text-center text-xs font-medium text-sky-200/90">
            Custom glass railing solutions &nbsp;•&nbsp; Professional installation &nbsp;•&nbsp; Free, no-obligation estimate
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

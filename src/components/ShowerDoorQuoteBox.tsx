"use client";

import { useState, type FormEvent } from "react";
import { QuoteThankYou } from "@/components/QuoteThankYou";
import { showerQuoteSubmission } from "@/lib/quote-payloads";
import { submitWebsiteQuote } from "@/lib/quote-submit";
import { showerStyles } from "@/lib/shower-funnel";

const enclosureLayouts = ["Single Door", "Door & Panel", "Custom Enclosure"] as const;

type ShowerDoorQuoteBoxProps = {
  style?: string;
  onStyleChange?: (value: string) => void;
  className?: string;
};

export function ShowerDoorQuoteBox({
  style = "",
  onStyleChange,
  className = "relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7",
}: ShowerDoorQuoteBoxProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [layout, setLayout] = useState("");
  const [notes, setNotes] = useState("");
  const [internalStyle, setInternalStyle] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const styleValue = onStyleChange ? style : internalStyle;

  function updateStyle(value: string) {
    if (onStyleChange) onStyleChange(value);
    else setInternalStyle(value);
  }

  function validate() {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Enter a 10-digit phone number.";
    if (!/^\d{5}$/.test(zip.trim())) next.zip = "Enter a 5-digit zip code.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (!layout) next.layout = "Choose an enclosure layout.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const field = next.name
        ? "shower-quote-name"
        : next.phone
          ? "shower-quote-phone"
          : next.zip
            ? "shower-quote-zip"
            : next.email
              ? "shower-quote-email"
              : "shower-layout-1";
      document.getElementById(field)?.focus();
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    const result = await submitWebsiteQuote(
      showerQuoteSubmission({
        name,
        phone,
        zip,
        email,
        notes,
        layout,
        style: styleValue,
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
        id="shower-quote"
        service="shower"
        tone="home"
        onReset={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <aside
      id="shower-quote"
      className={className}
    >
        <form noValidate className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white">Get a Quick Shower Door Estimate</h2>
            <p className="mt-0.5 text-xs font-medium text-home-mist">
              No pressure, upfront guidance from local Pacific Northwest specialists.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="shower-quote-name">
              Name
            </label>
            <input
              id="shower-quote-name"
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
              <label className={labelClass} htmlFor="shower-quote-phone">
                Phone
              </label>
              <input
                id="shower-quote-phone"
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
              <label className={labelClass} htmlFor="shower-quote-zip">
                Zip Code
              </label>
              <input
                id="shower-quote-zip"
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
            <label className={labelClass} htmlFor="shower-quote-email">
              Email
            </label>
            <input
              id="shower-quote-email"
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

          <fieldset>
            <legend className={labelClass}>Enclosure Layout / Openings</legend>
            <div className="grid grid-cols-3 gap-2">
              {enclosureLayouts.map((item) => {
                const selected = layout === item;
                return (
                  <button
                    key={item}
                    id={item === "Single Door" ? "shower-layout-1" : undefined}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setLayout(item)}
                    className={`w-full rounded-[4px] border px-2 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                      selected
                        ? "border-transparent bg-white font-semibold text-[#0B192C]"
                        : "border-white/25 bg-white/10 font-medium text-white hover:bg-white/20"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            {errors.layout ? <FieldError message={errors.layout} /> : null}
          </fieldset>

          <div>
            <label className={labelClass} htmlFor="shower-quote-notes">
              Project Notes
              <span className="font-normal text-home-mist"> Optional</span>
            </label>
            <textarea
              id="shower-quote-notes"
              name="notes"
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Approximate opening width, ceiling height, or tile notes..."
              className={inputClass(false)}
            />
          </div>

          <label className="block" htmlFor="shower-quote-style">
            <span className={labelClass}>
              Preferred Shower Door Style
              <span className="font-normal text-home-mist"> Optional</span>
            </span>
            <select
              id="shower-quote-style"
              name="style"
              value={styleValue}
              onChange={(event) => updateStyle(event.target.value)}
              className={fieldClass}
            >
              <option value="">No preference yet / Open to advice</option>
              {showerStyles.map((item) => (
                <option key={item.slug} value={item.option}>
                  {item.option}
                </option>
              ))}
            </select>
          </label>

          {submitError ? (
            <p role="alert" className="text-sm font-medium text-red-200">
              {submitError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="mt-2 flex w-full items-center justify-center rounded-[4px] bg-[#4EC6FF] px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#062033] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
          >
            {isSubmitting ? "Submitting" : "Request Upfront Pricing"}
          </button>
          <p className="text-center text-[11px] text-home-mist">
            We never share your information. Typical response time under 2 business hours.
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
  layout?: string;
};

function FieldError({ message }: { message: string }) {
  return (
    <span role="alert" className="mt-1 block text-xs font-normal text-red-300">
      {message}
    </span>
  );
}

const labelClass = "mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-white";

const fieldClass =
  "w-full rounded-[4px] border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#0F172A] shadow-sm scheme-light transition-all placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20";

function inputClass(invalid: boolean) {
  return invalid ? `${fieldClass} border-[#8C3A32]` : fieldClass;
}

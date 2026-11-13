"use client";

import { useState, type FormEvent } from "react";
import { QuoteThankYou } from "@/components/QuoteThankYou";
import { glassTypes } from "@/lib/glass-funnel";

const paneCounts = ["1 Pane", "2 to 4 Panes", "5+ Panes"] as const;

type GlassQuoteBoxProps = {
  glassType?: string;
  onGlassTypeChange?: (value: string) => void;
  className?: string;
};

export function GlassQuoteBox({
  glassType = "",
  onGlassTypeChange,
  className = "relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7",
}: GlassQuoteBoxProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [paneCount, setPaneCount] = useState("");
  const [notes, setNotes] = useState("");
  const [internalType, setInternalType] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const typeValue = onGlassTypeChange ? glassType : internalType;

  function updateType(value: string) {
    if (onGlassTypeChange) onGlassTypeChange(value);
    else setInternalType(value);
  }

  function validate() {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Enter a 10-digit phone number.";
    if (!/^\d{5}$/.test(zip.trim())) next.zip = "Enter a 5-digit zip code.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (!paneCount) next.count = "Choose an estimated pane count.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const field = next.name
        ? "glass-quote-name"
        : next.phone
          ? "glass-quote-phone"
          : next.zip
            ? "glass-quote-zip"
            : next.email
              ? "glass-quote-email"
              : "glass-count-1";
      document.getElementById(field)?.focus();
      return;
    }
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <QuoteThankYou id="glass-quote" service="glass" tone="home" onReset={() => setIsSubmitted(false)} />
    );
  }

  return (
    <aside
      id="glass-quote"
      className={className}
    >
        <form noValidate className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white">Get a Quick Glass Estimate</h2>
            <p className="mt-0.5 text-xs font-medium text-home-mist">
              Restore clarity and insulation without replacing your entire window frame.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="glass-quote-name">
              Name
            </label>
            <input
              id="glass-quote-name"
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
              <label className={labelClass} htmlFor="glass-quote-phone">
                Phone
              </label>
              <input
                id="glass-quote-phone"
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
              <label className={labelClass} htmlFor="glass-quote-zip">
                Zip Code
              </label>
              <input
                id="glass-quote-zip"
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
            <label className={labelClass} htmlFor="glass-quote-email">
              Email
            </label>
            <input
              id="glass-quote-email"
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
            <legend className={labelClass}>Estimated Pane Count</legend>
            <div className="grid grid-cols-3 gap-2">
              {paneCounts.map((count) => {
                const selected = paneCount === count;
                return (
                  <button
                    key={count}
                    id={count === "1 Pane" ? "glass-count-1" : undefined}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPaneCount(count)}
                    className={`w-full rounded-[4px] border px-2 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                      selected
                        ? "border-transparent bg-white font-semibold text-[#0B192C]"
                        : "border-white/25 bg-white/10 font-medium text-white hover:bg-white/20"
                    }`}
                  >
                    {count}
                  </button>
                );
              })}
            </div>
            {errors.count ? <FieldError message={errors.count} /> : null}
          </fieldset>

          <div>
            <label className={labelClass} htmlFor="glass-quote-notes">
              Project Notes
              <span className="font-normal text-home-mist"> Optional</span>
            </label>
            <textarea
              id="glass-quote-notes"
              name="notes"
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Describe fogging, cracks, dimensions, or frame type..."
              className={inputClass(false)}
            />
          </div>

          <label className="block" htmlFor="glass-quote-type">
            <span className={labelClass}>
              Preferred Glass Type
              <span className="font-normal text-home-mist"> Optional</span>
            </span>
            <select
              id="glass-quote-type"
              name="glassType"
              value={typeValue}
              onChange={(event) => updateType(event.target.value)}
              className={fieldClass}
            >
              <option value="">No preference yet / Open to advice</option>
              {glassTypes.map((item) => (
                <option key={item.slug} value={item.option}>
                  {item.option}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-[4px] bg-[#4EC6FF] px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#062033] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] sm:text-sm"
          >
            Request Upfront Pricing
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
  count?: string;
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

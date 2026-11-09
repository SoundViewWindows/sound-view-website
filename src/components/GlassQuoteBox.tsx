"use client";

import { useState, type FormEvent } from "react";
import { glassTypes } from "@/lib/glass-funnel";

const paneCounts = ["1 Pane", "2 to 4 Panes", "5+ Panes"] as const;

type GlassQuoteBoxProps = {
  glassType?: string;
  onGlassTypeChange?: (value: string) => void;
};

export function GlassQuoteBox({ glassType = "", onGlassTypeChange }: GlassQuoteBoxProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [paneCount, setPaneCount] = useState("");
  const [notes, setNotes] = useState("");
  const [internalType, setInternalType] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

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
    setSubmittedName(name.trim().split(/\s+/)[0]);
  }

  return (
    <aside
      id="glass-quote"
      className="relative w-full scroll-mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-7"
    >
      {submittedName ? (
        <div>
          <h2 className="font-serif text-2xl tracking-tight text-[#1B2A4A]">
            Thank you, {submittedName}.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#1B2A4A]/80">
            Your glass details are ready for a specialist. Call a showroom if
            you would like to talk sooner.
          </p>
          <button
            type="button"
            onClick={() => setSubmittedName(null)}
            className="mt-5 text-sm font-medium text-[#1B2A4A] underline decoration-[#1B2A4A]/30 underline-offset-4"
          >
            Revise details
          </button>
        </div>
      ) : (
        <form noValidate className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-xl font-bold text-[#1B2A4A]">Get a Quick Glass Estimate</h2>
            <p className="mt-1 text-xs text-slate-600">
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
                    className={`w-full rounded-full px-2 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A] ${
                      selected
                        ? "bg-[#1B2A4A] text-white"
                        : "bg-[#F4EFEA] text-[#1B2A4A] hover:bg-[#F3EFEA]"
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
              <span className="font-normal text-slate-500"> Optional</span>
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
              <span className="font-normal text-slate-500"> Optional</span>
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
            className="w-full rounded-lg bg-[#1B2A4A] py-3 text-sm font-medium text-white transition-colors hover:bg-[#15223C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
          >
            Request Upfront Pricing
          </button>
          <p className="text-center text-[11px] text-slate-500">
            We never share your information. Typical response time under 2 business hours.
          </p>
        </form>
      )}
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
    <span role="alert" className="mt-1 block text-xs font-normal text-[#8C3A32]">
      {message}
    </span>
  );
}

const labelClass = "mb-1 block text-xs font-semibold text-slate-700";

const fieldClass =
  "w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]";

function inputClass(invalid: boolean) {
  return invalid ? `${fieldClass} border-[#8C3A32]` : fieldClass;
}

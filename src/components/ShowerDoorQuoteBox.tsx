"use client";

import { useState, type FormEvent } from "react";
import { QuoteThankYou } from "@/components/QuoteThankYou";
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
  className = "relative w-full scroll-mt-6 rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-xl sm:p-7",
}: ShowerDoorQuoteBoxProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [layout, setLayout] = useState("");
  const [notes, setNotes] = useState("");
  const [internalStyle, setInternalStyle] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <QuoteThankYou
        id="shower-quote"
        service="shower"
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
            <h2 className="text-xl font-bold text-white">Get a Quick Shower Door Estimate</h2>
            <p className="mt-1 text-xs text-slate-300">
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
                    className={`w-full rounded-full px-2 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                      selected
                        ? "bg-[#38BDF8] text-[#0B192C]"
                        : "border border-slate-600 bg-[#0B192C] text-white hover:border-sky-400"
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
              <span className="font-normal text-slate-400"> Optional</span>
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
              <span className="font-normal text-slate-400"> Optional</span>
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

          <button
            type="submit"
            className="w-full rounded-xl bg-[#38BDF8] py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0B192C] shadow-md shadow-sky-500/20 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            Request Upfront Pricing
          </button>
          <p className="text-center text-[11px] text-slate-400">
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

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white";

const fieldClass =
  "w-full rounded-lg border border-slate-600 bg-white px-3 py-2 text-sm text-[#0B192C] placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400";

function inputClass(invalid: boolean) {
  return invalid ? `${fieldClass} border-[#8C3A32]` : fieldClass;
}

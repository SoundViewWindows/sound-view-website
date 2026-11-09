"use client";

import { useState, type FormEvent } from "react";
import { QuoteThankYou } from "@/components/QuoteThankYou";
import { doorMaterials, doorStyles } from "@/lib/door-funnel";

const doorCounts = ["1 Door", "2 to 3 Doors", "4+ Doors"] as const;

type DoorQuoteBoxProps = {
  material?: string;
  style?: string;
  onMaterialChange?: (value: string) => void;
  onStyleChange?: (value: string) => void;
  className?: string;
};

export function DoorQuoteBox({
  material = "",
  style = "",
  onMaterialChange,
  onStyleChange,
  className = "relative w-full scroll-mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-7",
}: DoorQuoteBoxProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [doorCount, setDoorCount] = useState("");
  const [notes, setNotes] = useState("");
  const [internalMaterial, setInternalMaterial] = useState("");
  const [internalStyle, setInternalStyle] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const materialValue = onMaterialChange ? material : internalMaterial;
  const styleValue = onStyleChange ? style : internalStyle;

  function updateMaterial(value: string) {
    if (onMaterialChange) onMaterialChange(value);
    else setInternalMaterial(value);
  }

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
    if (!doorCount) next.count = "Choose an approximate door count.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const field = next.name
        ? "door-quote-name"
        : next.phone
          ? "door-quote-phone"
          : next.zip
            ? "door-quote-zip"
            : next.email
              ? "door-quote-email"
              : "door-count-1";
      document.getElementById(field)?.focus();
      return;
    }
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <QuoteThankYou id="door-quote" service="door" onReset={() => setIsSubmitted(false)} />
    );
  }

  return (
    <aside
      id="door-quote"
      className={className}
    >
        <form noValidate className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-xl font-bold text-[#1D2C43]">Get a Quick Door Estimate</h2>
            <p className="mt-1 text-xs text-slate-600">
              No pressure, upfront guidance from local Pacific Northwest specialists.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="door-quote-name">
              Name
            </label>
            <input
              id="door-quote-name"
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
              <label className={labelClass} htmlFor="door-quote-phone">
                Phone
              </label>
              <input
                id="door-quote-phone"
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
              <label className={labelClass} htmlFor="door-quote-zip">
                Zip Code
              </label>
              <input
                id="door-quote-zip"
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
            <label className={labelClass} htmlFor="door-quote-email">
              Email
            </label>
            <input
              id="door-quote-email"
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
            <legend className={labelClass}>Approximate Door Count</legend>
            <div className="grid grid-cols-3 gap-2">
              {doorCounts.map((count) => {
                const selected = doorCount === count;
                return (
                  <button
                    key={count}
                    id={count === "1 Door" ? "door-count-1" : undefined}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDoorCount(count)}
                    className={`w-full rounded-full px-2 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43] ${
                      selected
                        ? "bg-[#1D2C43] text-white"
                        : "bg-[#EFEBE4] text-[#1D2C43] hover:bg-[#EFEBE4]"
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
            <label className={labelClass} htmlFor="door-quote-notes">
              Project Notes
              <span className="font-normal text-slate-500"> Optional</span>
            </label>
            <textarea
              id="door-quote-notes"
              name="notes"
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Entryway, patio, sliding, or sizing details..."
              className={inputClass(false)}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block" htmlFor="door-quote-material">
              <span className={labelClass}>
                Preferred Door Material
                <span className="font-normal text-slate-500"> Optional</span>
              </span>
              <select
                id="door-quote-material"
                name="material"
                value={materialValue}
                onChange={(event) => updateMaterial(event.target.value)}
                className={fieldClass}
              >
                <option value="">No preference yet / Open to advice</option>
                {doorMaterials.map((item) => (
                  <option key={item.slug} value={item.option}>
                    {item.option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block" htmlFor="door-quote-style">
              <span className={labelClass}>
                Preferred Door Style
                <span className="font-normal text-slate-500"> Optional</span>
              </span>
              <select
                id="door-quote-style"
                name="style"
                value={styleValue}
                onChange={(event) => updateStyle(event.target.value)}
                className={fieldClass}
              >
                <option value="">No preference yet / Open to advice</option>
                {doorStyles.map((item) => (
                  <option key={item.slug} value={item.option}>
                    {item.option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#1D2C43] py-3 text-sm font-medium text-white transition-colors hover:bg-[#162433] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]"
          >
            Request Upfront Pricing
          </button>
          <p className="text-center text-[11px] text-slate-500">
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
    <span role="alert" className="mt-1 block text-xs font-normal text-[#8C3A32]">
      {message}
    </span>
  );
}

const labelClass = "mb-1 block text-xs font-semibold text-slate-700";

const fieldClass =
  "w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D2C43]";

function inputClass(invalid: boolean) {
  return invalid ? `${fieldClass} border-[#8C3A32]` : fieldClass;
}

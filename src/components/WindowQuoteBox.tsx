"use client";

import { useState, type FormEvent } from "react";
import { QuoteThankYou } from "@/components/QuoteThankYou";
import { windowMaterials, windowStyles } from "@/lib/window-funnel";

const windowCounts = ["1 to 5", "6 to 12", "13+"] as const;

export const windowPreferences = {
  materials: windowMaterials.map((item) => item.option),
  styles: windowStyles.map((item) => item.option),
};

type WindowQuoteBoxProps = {
  material?: string;
  style?: string;
  onMaterialChange?: (value: string) => void;
  onStyleChange?: (value: string) => void;
};

export function WindowQuoteBox({
  material = "",
  style = "",
  onMaterialChange,
  onStyleChange,
}: WindowQuoteBoxProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [windowCount, setWindowCount] = useState("");
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
    if (!windowCount) next.count = "Choose an approximate window count.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const field = next.name
        ? "window-quote-name"
        : next.phone
          ? "window-quote-phone"
          : next.zip
            ? "window-quote-zip"
            : next.email
              ? "window-quote-email"
              : "window-count-1";
      document.getElementById(field)?.focus();
      return;
    }
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <QuoteThankYou
        id="window-quote"
        service="window"
        onReset={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <aside
      id="window-quote"
      className="relative w-full scroll-mt-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl sm:p-5"
    >
        <form noValidate className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-lg font-bold text-[#1D2C43]">
              Get a Quick Window Estimate
            </h2>
            <p className="mt-0.5 text-xs text-slate-600">
              No pressure, upfront guidance from local Pacific Northwest specialists.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="window-quote-name">
              Name
            </label>
            <input
              id="window-quote-name"
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
              <label className={labelClass} htmlFor="window-quote-phone">
                Phone
              </label>
              <input
                id="window-quote-phone"
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
              <label className={labelClass} htmlFor="window-quote-zip">
                Zip Code
              </label>
              <input
                id="window-quote-zip"
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
            <label className={labelClass} htmlFor="window-quote-email">
              Email
            </label>
            <input
              id="window-quote-email"
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
            <legend className={labelClass}>Approximate Window Count</legend>
            <div className="grid grid-cols-3 gap-2">
              {windowCounts.map((count) => {
                const selected = windowCount === count;
                return (
                  <button
                    key={count}
                    id={count === "1 to 5" ? "window-count-1" : undefined}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setWindowCount(count)}
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
            <label className={labelClass} htmlFor="window-quote-notes">
              Project Notes
              <span className="font-normal text-slate-500"> Optional</span>
            </label>
            <textarea
              id="window-quote-notes"
              name="notes"
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Rooms, sizes, or anything you want us to know."
              className={inputClass(false)}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block" htmlFor="window-quote-material">
              <span className={labelClass}>
                Preferred Material
                <span className="font-normal text-slate-500"> Optional</span>
              </span>
              <select
                id="window-quote-material"
                name="material"
                value={materialValue}
                onChange={(event) => updateMaterial(event.target.value)}
                className={selectClass}
              >
                <option value="">No preference yet / Open to advice</option>
                {windowPreferences.materials.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block" htmlFor="window-quote-style">
              <span className="mb-1 block text-xs font-semibold text-slate-700">
                Preferred Window Style
                <span className="font-normal text-slate-500"> Optional</span>
              </span>
              <select
                id="window-quote-style"
                name="style"
                value={styleValue}
                onChange={(event) => updateStyle(event.target.value)}
                className={selectClass}
              >
                <option value="">No preference yet / Open to advice</option>
                {windowPreferences.styles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#1D2C43] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#162433] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]"
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

const selectClass = fieldClass;

function inputClass(invalid: boolean) {
  return invalid ? `${fieldClass} border-[#8C3A32]` : fieldClass;
}

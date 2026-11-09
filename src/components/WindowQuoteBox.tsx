"use client";

import { useState, type FormEvent } from "react";

const windowCounts = ["1 to 5", "6 to 12", "13+"] as const;

export const windowPreferences = {
  materials: [
    "Fiberglass (e.g. Milgard Ultra)",
    "Premium Vinyl",
    "Wood & Wood-Clad (e.g. Andersen)",
    "Thermally Broken Aluminum",
  ],
  styles: [
    "Casement Windows",
    "Double-Hung Windows",
    "Single-Hung Windows",
    "Awning Windows",
    "Sliding Windows",
    "Picture Windows",
    "Bay Windows",
    "Bow Windows",
    "Custom Windows",
  ],
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
  const [contact, setContact] = useState("");
  const [windowCount, setWindowCount] = useState("");
  const [internalMaterial, setInternalMaterial] = useState("");
  const [internalStyle, setInternalStyle] = useState("");
  const [errors, setErrors] = useState<{ name?: string; contact?: string; count?: string }>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

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
    const next: { name?: string; contact?: string; count?: string } = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    const digits = contact.replace(/\D/g, "");
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
    if (!email && digits.length < 10) {
      next.contact = "Enter a phone number or email address.";
    }
    if (!windowCount) next.count = "Choose an approximate window count.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const field = next.name ? "window-quote-name" : next.contact ? "window-quote-contact" : "window-count-1";
      document.getElementById(field)?.focus();
      return;
    }
    setSubmittedName(name.trim().split(/\s+/)[0]);
  }

  return (
    <aside
      id="window-quote"
      className="relative w-full scroll-mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-7"
    >
      {submittedName ? (
        <div>
          <h2 className="font-serif text-2xl tracking-tight text-[#1B2A4A]">
            Thank you, {submittedName}.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#1B2A4A]/80">
            Your window details are ready for a specialist. Call a showroom if
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
        <form noValidate className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="mb-1 text-xl font-bold text-[#1B2A4A]">
            Get a Quick Window Estimate
          </h2>
          <p className="mb-5 text-xs text-slate-600">
            No pressure, upfront guidance from local Pacific Northwest specialists.
          </p>

          <label className="mb-3 block text-xs font-medium text-[#1B2A4A]" htmlFor="window-quote-name">
            Name
            <input
              id="window-quote-name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              className={`${inputClass(Boolean(errors.name))} mt-1.5`}
            />
            {errors.name ? <FieldError message={errors.name} /> : null}
          </label>

          <label className="mb-3 block text-xs font-medium text-[#1B2A4A]" htmlFor="window-quote-contact">
            Phone or Email
            <input
              id="window-quote-contact"
              name="contact"
              autoComplete="email"
              placeholder="Phone or email"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              aria-invalid={Boolean(errors.contact)}
              className={`${inputClass(Boolean(errors.contact))} mt-1.5`}
            />
            {errors.contact ? <FieldError message={errors.contact} /> : null}
          </label>

          <fieldset className="mb-3">
            <legend className="text-xs font-medium text-[#1B2A4A]">Window Count</legend>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {windowCounts.map((count) => {
                const selected = windowCount === count;
                return (
                  <button
                    key={count}
                    id={count === "1 to 5" ? "window-count-1" : undefined}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setWindowCount(count)}
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

          <div className="grid grid-cols-1 gap-3">
            <label className="block" htmlFor="window-quote-material">
              <span className="mb-1 block text-xs font-semibold text-slate-700">
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
            className="mt-4 w-full rounded-lg bg-[#1B2A4A] py-3 text-sm font-medium text-white transition-colors hover:bg-[#15223C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
          >
            Request Upfront Pricing
          </button>
          <p className="mt-3 text-center text-[11px] text-slate-500">
            We never share your information. Typical response time under 2 business hours.
          </p>
        </form>
      )}
    </aside>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <span role="alert" className="text-xs font-normal text-[#8C3A32]">
      {message}
    </span>
  );
}

const selectClass = [
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800",
  "focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]",
].join(" ");

function inputClass(invalid: boolean) {
  return [
    "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A]",
    "focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]",
    invalid ? "border-[#8C3A32]" : "",
  ].join(" ");
}

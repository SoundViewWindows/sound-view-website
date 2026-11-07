"use client";

import { useState, type FormEvent } from "react";

const windowCounts = ["1 to 5", "6 to 12", "13+"] as const;

export const windowPreferences = {
  materials: [
    "Fiberglass",
    "Premium Vinyl",
    "Wood & Wood-Clad",
    "Thermally Broken Aluminum",
  ],
  styles: [
    "Casement",
    "Double-Hung & Single-Hung",
    "Horizontal Sliding",
    "Picture & Architectural Direct-Set",
    "Bay & Bow",
    "Awning",
  ],
};

type WindowQuoteBoxProps = {
  preference?: string;
  onPreferenceChange?: (value: string) => void;
};

export function WindowQuoteBox({
  preference = "",
  onPreferenceChange,
}: WindowQuoteBoxProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [windowCount, setWindowCount] = useState("");
  const [internalPreference, setInternalPreference] = useState("");
  const [errors, setErrors] = useState<{ name?: string; contact?: string; count?: string }>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const preferenceValue = onPreferenceChange ? preference : internalPreference;

  function updatePreference(value: string) {
    if (onPreferenceChange) onPreferenceChange(value);
    else setInternalPreference(value);
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
      className="scroll-mt-6 rounded-2xl border border-[#1B2A4A]/15 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
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
        <form noValidate className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
          <div>
            <h2 className="font-serif text-xl tracking-tight text-[#1B2A4A]">
              Get a Quick Window Estimate
            </h2>
            <p className="mt-1 text-sm leading-5 text-[#1B2A4A]/75">
              No pressure, upfront guidance from local Pacific Northwest specialists.
            </p>
          </div>

          <label className="flex flex-col gap-1 text-xs font-medium text-[#1B2A4A]" htmlFor="window-quote-name">
            Name
            <input
              id="window-quote-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              className={inputClass(Boolean(errors.name))}
            />
            {errors.name ? <FieldError message={errors.name} /> : null}
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-[#1B2A4A]" htmlFor="window-quote-contact">
            Phone or Email
            <input
              id="window-quote-contact"
              name="contact"
              autoComplete="email"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              aria-invalid={Boolean(errors.contact)}
              className={inputClass(Boolean(errors.contact))}
            />
            {errors.contact ? <FieldError message={errors.contact} /> : null}
          </label>

          <fieldset>
            <legend className="text-xs font-medium text-[#1B2A4A]">Approximate Window Count</legend>
            <div className="mt-1 flex flex-wrap gap-2">
              {windowCounts.map((count) => {
                const selected = windowCount === count;
                return (
                  <button
                    key={count}
                    id={count === "1 to 5" ? "window-count-1" : undefined}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setWindowCount(count)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A] ${
                      selected
                        ? "bg-[#1B2A4A] text-[#FAF8F5]"
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

          <label className="flex flex-col gap-1 text-xs font-medium text-[#1B2A4A]" htmlFor="window-quote-preference">
            Preferred Material or Style
            <span className="font-normal text-[#1B2A4A]/60">Optional</span>
            <select
              id="window-quote-preference"
              name="preference"
              value={preferenceValue}
              onChange={(event) => updatePreference(event.target.value)}
              className={inputClass(false)}
            >
              <option value="">No preference yet</option>
              <optgroup label="Materials">
                {windowPreferences.materials.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Styles">
                {windowPreferences.styles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>

          <button
            type="submit"
            className="rounded-full bg-[#1B2A4A] px-4 py-3 text-sm font-medium text-[#FAF8F5] transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
          >
            Request Upfront Pricing
          </button>
          <p className="text-xs leading-5 text-[#1B2A4A]/70">
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

function inputClass(invalid: boolean) {
  return [
    "w-full rounded-lg border bg-white px-3 py-2 text-sm font-normal text-[#0F172A] outline-none transition",
    "focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/20",
    invalid ? "border-[#8C3A32]" : "border-[#1B2A4A]/15",
  ].join(" ");
}

"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { QuoteThankYou } from "@/components/QuoteThankYou";

export function RequestInstallationButton() {
  function scrollToRequest(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    document.getElementById("railing-install")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <a
      href="#railing-install"
      onClick={scrollToRequest}
      className="flex items-center gap-2 rounded-lg border border-[#1D2C43] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#132238] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
    >
      Request Professional Installation
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Enter a 10-digit phone number.";
    if (!/^\d{5}$/.test(zip.trim())) next.zip = "Enter a 5-digit zip code.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      className="relative w-full scroll-mt-6 rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-xl sm:p-7"
    >
        <form noValidate className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-xl font-bold text-white">Request Professional Installation</h2>
            <p className="mt-1 text-xs text-slate-300">
              No pressure, upfront guidance from local Pacific Northwest specialists.
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
              <span className="font-normal text-slate-400"> Optional</span>
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
          <button
            type="submit"
            className="w-full rounded-lg bg-[#1D2C43] py-3 text-sm font-medium text-white transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            Request Professional Installation
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
};

function FieldError({ message }: { message: string }) {
  return (
    <span role="alert" className="mt-1 block text-xs font-normal text-[#8C3A32]">
      {message}
    </span>
  );
}

const labelClass = "mb-1 block text-xs font-semibold text-slate-300";

const fieldClass =
  "w-full px-3 py-2 text-sm bg-[#132238] border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400";

function inputClass(invalid: boolean) {
  return invalid ? `${fieldClass} border-[#8C3A32]` : fieldClass;
}

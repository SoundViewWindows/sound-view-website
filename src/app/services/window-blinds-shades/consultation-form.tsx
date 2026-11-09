"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type FieldErrors = Partial<
  Record<"name" | "phone" | "zip" | "email" | "notes", string>
>;

export function ConsultationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  function validate() {
    const nextErrors: FieldErrors = {};
    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");

    if (trimmedName.length < 2) {
      nextErrors.name = "Enter your name.";
    }
    if (digits.length < 10) {
      nextErrors.phone = "Enter a phone number with an area code.";
    }
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
      nextErrors.zip = "Enter a 5 digit ZIP code.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (notes.trim().length > 500) {
      nextErrors.notes = "Keep treatment notes under 500 characters.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`blinds-${firstInvalid}`)?.focus();
      return;
    }
    setSubmittedName(name.trim().split(/\s+/)[0]);
  }

  if (submittedName) {
    return (
      <div className="rounded-xl bg-[#F4EFEA] px-5 py-6">
        <h3 className="font-serif text-2xl text-[#1B2A4A]">
          Thank you, {submittedName}.
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#1B2A4A]/80">
          Your consultation request is ready. We will follow up to schedule
          in-home measuring, fabric matching, and installation.
        </p>
      </div>
    );
  }

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" id="blinds-name" error={errors.name}>
          <input
            id="blinds-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass(Boolean(errors.name))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "blinds-name-error" : undefined}
          />
        </Field>
        <Field label="Phone" id="blinds-phone" error={errors.phone}>
          <input
            id="blinds-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "blinds-phone-error" : undefined}
          />
        </Field>
        <Field label="Zip Code" id="blinds-zip" error={errors.zip}>
          <input
            id="blinds-zip"
            name="zip"
            autoComplete="postal-code"
            inputMode="numeric"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            className={inputClass(Boolean(errors.zip))}
            aria-invalid={Boolean(errors.zip)}
            aria-describedby={errors.zip ? "blinds-zip-error" : undefined}
          />
        </Field>
        <Field label="Email" id="blinds-email" error={errors.email}>
          <input
            id="blinds-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "blinds-email-error" : undefined}
          />
        </Field>
      </div>
      <Field label="Treatment Notes" id="blinds-notes" error={errors.notes}>
        <textarea
          id="blinds-notes"
          name="notes"
          rows={4}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className={`${inputClass(Boolean(errors.notes))} resize-y`}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "blinds-notes-error" : undefined}
        />
      </Field>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-[#1B2A4A] px-6 py-3 text-sm font-medium text-[#FAF8F5] transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A] sm:w-auto"
      >
        Request Consultation
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5 text-sm font-medium text-[#1B2A4A]">
      {label}
      {children}
      {error ? (
        <span id={`${id}-error`} role="alert" className="text-xs font-normal text-[#8C3A32]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function inputClass(invalid: boolean) {
  return [
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm font-normal text-[#0F172A] outline-none transition",
    "focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/20",
    invalid ? "border-[#8C3A32]" : "border-slate-200",
  ].join(" ");
}

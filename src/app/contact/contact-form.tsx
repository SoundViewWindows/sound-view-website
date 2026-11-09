"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const projectTypes = [
  "Window Replacement",
  "Door Replacement",
  "Shower Door Replacement",
  "Glass Replacement",
  "Glass Railing Installation",
  "Window Blinds & Shades",
  "Showroom Appointment Request",
  "General Inquiry",
] as const;

type FieldName = "name" | "phone" | "zip" | "email" | "projectType" | "details";
type FieldErrors = Partial<Record<FieldName, string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  function validate() {
    const nextErrors: FieldErrors = {};
    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");

    if (trimmedName.length < 2) {
      nextErrors.name = "Enter your full name.";
    }
    if (digits.length < 10) {
      nextErrors.phone = "Enter a phone number with an area code.";
    }
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
      nextErrors.zip = "Enter a 5 digit ZIP code so we can confirm service area.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (details.trim().length > 2000) {
      nextErrors.details = "Keep project details under 2,000 characters.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    setSubmittedName(name.trim().split(/\s+/)[0]);
  }

  if (submittedName) {
    return (
      <div className="rounded-xl bg-[#132238] px-5 py-8">
        <h3 className="text-2xl font-bold text-white">
          Thank you, {submittedName}.
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Your message is in. A local specialist will follow up during operating
          hours, typically within 2 business hours. No high-pressure sales calls.
        </p>
      </div>
    );
  }

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Field label="Full Name" id="contact-name" error={errors.name} required>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass(Boolean(errors.name))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Phone" id="contact-phone" error={errors.phone} required>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            placeholder="(206) 555-0123"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
        </Field>
        <Field label="Zip Code" id="contact-zip" error={errors.zip} required>
          <input
            id="contact-zip"
            name="zip"
            type="text"
            autoComplete="postal-code"
            inputMode="numeric"
            required
            placeholder="e.g. 98103"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            className={inputClass(Boolean(errors.zip))}
            aria-invalid={Boolean(errors.zip)}
            aria-describedby={errors.zip ? "contact-zip-error" : undefined}
          />
        </Field>
      </div>

      <Field label="Email" id="contact-email" error={errors.email} required>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass(Boolean(errors.email))}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
      </Field>

      <Field label="Project Type" id="contact-projectType" error={errors.projectType}>
        <select
          id="contact-projectType"
          name="projectType"
          value={projectType}
          onChange={(event) => setProjectType(event.target.value)}
          className={inputClass(Boolean(errors.projectType))}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? "contact-projectType-error" : undefined}
        >
          <option value="">Select a service...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Project Details" id="contact-details" error={errors.details}>
        <textarea
          id="contact-details"
          name="details"
          rows={3}
          placeholder="Tell us about your project, home style, or questions..."
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          className={`${inputClass(Boolean(errors.details))} resize-y`}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? "contact-details-error" : undefined}
        />
      </Field>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#38BDF8] py-3.5 font-extrabold uppercase tracking-wide text-[#0B192C] shadow-md shadow-sky-500/20 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
      >
        Submit Message
      </button>
      <p className="text-center text-sm text-slate-400">
        We respect your privacy and never sell your information.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5 text-sm font-medium text-white">
      <span>
        {label}
        {required ? <span className="text-white"> *</span> : null}
      </span>
      {children}
      {error ? (
        <span id={`${id}-error`} role="alert" className="text-xs font-normal text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function inputClass(invalid: boolean) {
  return [
    "w-full rounded-lg border bg-[#132238] px-3 py-2.5 text-sm font-normal text-slate-100 outline-none transition",
    "placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400",
    invalid ? "border-[#8C3A32]" : "border-slate-700",
  ].join(" ");
}

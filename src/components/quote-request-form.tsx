"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { services } from "@/lib/services";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 25 * 1024 * 1024;

type QuoteRequestFormProps = {
  projectType: string;
  onProjectTypeChange: (value: string) => void;
};

type FieldErrors = Partial<
  Record<"name" | "phone" | "zip" | "email" | "projectType" | "details" | "media", string>
>;

export function QuoteRequestForm({
  projectType,
  onProjectTypeChange,
}: QuoteRequestFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  function validate(nextFiles: File[]) {
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
    if (!projectType) {
      nextErrors.projectType = "Choose a project type.";
    }
    if (details.trim().length > 500) {
      nextErrors.details = "Keep project details under 500 characters.";
    }
    if (nextFiles.length > MAX_FILES) {
      nextErrors.media = "Upload up to 5 photos or videos.";
    } else if (nextFiles.some((file) => file.size > MAX_FILE_BYTES)) {
      nextErrors.media = "Each file needs to be 25 MB or smaller.";
    } else if (
      nextFiles.some(
        (file) => !file.type.startsWith("image/") && !file.type.startsWith("video/"),
      )
    ) {
      nextErrors.media = "Upload photos or videos only.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(files);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`quote-${firstInvalid}`)?.focus();
      return;
    }
    setSubmittedName(name.trim().split(/\s+/)[0]);
  }

  if (submittedName) {
    return (
      <div className="flex h-full flex-col justify-center px-4 py-6">
        <h2 className="font-serif text-2xl tracking-tight text-[#0F172A]">
          Thank you, {submittedName}.
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#1B2A4A]/85">
          Your project details are ready for a consultation. Call us and we
          will pick up the conversation from here.
        </p>
        <button
          type="button"
          className="mt-6 text-left text-sm font-medium text-[#1B2A4A] underline decoration-[#1B2A4A]/30 underline-offset-4"
          onClick={() => setSubmittedName(null)}
        >
          Revise details
        </button>
      </div>
    );
  }

  return (
    <form noValidate className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
      <div>
        <h2 className="font-serif text-2xl tracking-tight text-[#0F172A]">
          Request a Free Quote
        </h2>
        <p className="mt-1 text-sm leading-5 text-[#1B2A4A]/75">
          Get in touch with our installation experts today.
        </p>
      </div>

      <Field label="Name" id="quote-name" error={errors.name}>
        <input
          id="quote-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass(Boolean(errors.name))}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-2">
        <Field label="Phone" id="quote-phone" error={errors.phone}>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>
        <Field label="Zip Code" id="quote-zip" error={errors.zip}>
          <input
            id="quote-zip"
            name="zip"
            autoComplete="postal-code"
            inputMode="numeric"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            className={inputClass(Boolean(errors.zip))}
            aria-invalid={Boolean(errors.zip)}
          />
        </Field>
      </div>

      <Field label="Email" id="quote-email" error={errors.email}>
        <input
          id="quote-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass(Boolean(errors.email))}
          aria-invalid={Boolean(errors.email)}
        />
      </Field>

      <Field label="Project Type" id="quote-projectType" error={errors.projectType}>
        <select
          id="quote-projectType"
          name="projectType"
          value={projectType}
          onChange={(event) => onProjectTypeChange(event.target.value)}
          className={inputClass(Boolean(errors.projectType))}
          aria-invalid={Boolean(errors.projectType)}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Project Details" id="quote-details" error={errors.details}>
        <textarea
          id="quote-details"
          name="details"
          rows={3}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          className={`${inputClass(Boolean(errors.details))} resize-none lg:min-h-14`}
          aria-invalid={Boolean(errors.details)}
        />
      </Field>

      <Field label="Photos or videos" id="quote-media" error={errors.media}>
        <input
          id="quote-media"
          name="media"
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          className="block w-full text-xs text-[#1B2A4A] file:mr-3 file:rounded-full file:border-0 file:bg-[#F4EFEA] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#1B2A4A] focus:outline-none"
          aria-invalid={Boolean(errors.media)}
        />
        {files.length > 0 ? (
          <p className="text-xs text-[#1B2A4A]/70">
            {files.length} file{files.length === 1 ? "" : "s"} selected
          </p>
        ) : null}
      </Field>

      <button
        type="submit"
        className="mt-1 rounded-full bg-[#1B2A4A] px-4 py-2.5 text-sm font-medium text-[#FAF8F5] transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
      >
        Submit Quote Request
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
    <label htmlFor={id} className="flex flex-col gap-1 text-xs font-medium text-[#1B2A4A]">
      {label}
      {children}
      {error ? (
        <span id={`${id}-error`} role="alert" className="font-normal text-[#8C3A32]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function inputClass(invalid: boolean) {
  return [
    "w-full rounded-lg border bg-white px-3 py-1.5 text-sm font-normal text-[#0F172A] outline-none transition",
    "focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/20",
    invalid ? "border-[#8C3A32]" : "border-[#1B2A4A]/15",
  ].join(" ");
}

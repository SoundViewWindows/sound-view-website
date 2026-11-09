"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { QuoteThankYou, quoteServiceFromProject } from "@/components/QuoteThankYou";
import { services } from "@/lib/services";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 25 * 1024 * 1024;

type QuoteRequestFormProps = {
  projectType: string;
  onProjectTypeChange: (value: string) => void;
  onSubmittedChange?: (submitted: boolean) => void;
};

type FieldErrors = Partial<
  Record<"name" | "phone" | "zip" | "email" | "projectType" | "details" | "media", string>
>;

export function QuoteRequestForm({
  projectType,
  onProjectTypeChange,
  onSubmittedChange,
}: QuoteRequestFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(true);
    onSubmittedChange?.(true);
  }

  if (isSubmitted) {
    return (
      <QuoteThankYou
        framed={false}
        service={quoteServiceFromProject(projectType)}
        onReset={() => {
          setIsSubmitted(false);
          onSubmittedChange?.(false);
        }}
      />
    );
  }

  return (
    <form noValidate className="flex flex-col space-y-2.5" onSubmit={handleSubmit}>
      <div>
        <h2 className="mb-0.5 font-serif text-xl font-bold text-[#1D2C43]">
          Request a Free Quote
        </h2>
        <p className="mb-3 text-xs text-slate-500">
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
          rows={2}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          className={`${inputClass(Boolean(errors.details), false)} resize-none`}
          aria-invalid={Boolean(errors.details)}
        />
      </Field>

      <Field label="Photos or videos" id="quote-media" error={errors.media}>
        <div
          className={`relative flex h-9 items-center gap-2 overflow-hidden rounded-lg border bg-white px-1.5 focus-within:border-[#1D2C43] focus-within:ring-2 focus-within:ring-[#1D2C43]/20 ${
            errors.media ? "border-[#8C3A32]" : "border-slate-200"
          }`}
        >
          <span className="shrink-0 rounded-md bg-[#1D2C43] px-2.5 py-1 text-[11px] font-semibold text-white">
            Choose file
          </span>
          <span className="min-w-0 flex-1 truncate text-xs font-normal text-[#5D6875]">
            {files.length === 0
              ? "Attach photos or videos"
              : files.map((file) => file.name).join(", ")}
          </span>
          <input
            id="quote-media"
            name="media"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,video/mp4,video/quicktime,video/webm,video/*"
            multiple
            onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-invalid={Boolean(errors.media)}
          />
        </div>
        {files.length > 0 ? (
          <p className="text-xs font-normal text-[#5D6875]">
            {files.length} file{files.length === 1 ? "" : "s"} selected
          </p>
        ) : null}
      </Field>

      <button
        type="submit"
        className="rounded-lg bg-[#1D2C43] py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] transition-colors hover:bg-[#162433] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]"
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
    <label htmlFor={id} className="flex flex-col gap-1 text-xs font-medium text-[#1D2C43]">
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

function inputClass(invalid: boolean, fixedHeight = true) {
  return [
    fixedHeight ? "h-9" : "h-auto",
    "w-full rounded-lg border bg-white px-3 py-1.5 text-xs font-normal text-[#28323D] outline-none transition",
    "focus:border-[#1D2C43] focus:ring-2 focus:ring-[#1D2C43]/20",
    invalid ? "border-[#8C3A32]" : "border-slate-200",
  ].join(" ");
}

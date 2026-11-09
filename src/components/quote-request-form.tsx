"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;
    setIsSubmitting(true);
    const nextErrors = validate(files);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitting(false);
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
          setIsSubmitting(false);
          onSubmittedChange?.(false);
        }}
      />
    );
  }

  return (
    <form noValidate className="flex flex-col space-y-2.5" onSubmit={handleSubmit}>
      <div>
        <h2 className="mb-1.5 text-2xl font-bold text-white sm:text-3xl">
          Request a Free Quote
        </h2>
        <p className="mb-3 text-sm font-normal text-slate-200">
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
          className={`relative flex h-9 items-center gap-2 overflow-hidden rounded-lg border bg-[#0B192C] px-1.5 focus-within:border-white focus-within:ring-2 focus-within:ring-white/30 ${
            errors.media ? "border-[#8C3A32]" : "border-white/25"
          }`}
        >
          <span className="shrink-0 rounded-md bg-[#132238] px-2.5 py-1 text-[11px] font-semibold text-[#0B192C]">
            Choose file
          </span>
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-200">
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
          <p className="text-xs font-medium text-slate-200">
            {files.length} file{files.length === 1 ? "" : "s"} selected
          </p>
        ) : null}
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#38BDF8] py-2.5 text-sm font-bold uppercase tracking-wider text-[#0B192C] shadow-md shadow-sky-500/20 transition-all duration-150 hover:bg-sky-300 hover:shadow-sky-400/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
      >
        {isSubmitting ? "Submitting" : "Submit Quote Request"}
        {isSubmitting ? null : (
          <ArrowRight className="ml-1.5 inline-block h-4 w-4 stroke-[2.5]" aria-hidden="true" />
        )}
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
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white">
        {label}
      </span>
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
    "w-full rounded-lg border bg-[#132238] px-3 py-1.5 text-xs font-normal text-slate-100 outline-none transition",
    "focus:border-sky-400 focus:ring-2 focus:ring-sky-400",
    invalid ? "border-[#8C3A32]" : "border-slate-700",
  ].join(" ");
}

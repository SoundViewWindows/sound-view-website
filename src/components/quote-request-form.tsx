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
  variant?: "sidebar" | "horizontal";
};

type FieldErrors = Partial<
  Record<"name" | "phone" | "zip" | "email" | "projectType" | "details" | "media", string>
>;

export function QuoteRequestForm({
  projectType,
  onProjectTypeChange,
  onSubmittedChange,
  variant = "sidebar",
}: QuoteRequestFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    if (variant !== "sidebar") {
      setIsSubmitted(true);
      onSubmittedChange?.(true);
      return;
    }

    setSubmitError("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          zip,
          email,
          projectType,
          details,
          photoNames: files.map((file) => file.name),
        }),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !payload?.ok) {
        setSubmitError(payload?.message || "We could not send your quote request. Your details are still here.");
        return;
      }
      setIsSubmitted(true);
      onSubmittedChange?.(true);
    } catch {
      setSubmitError("We could not send your quote request. Your details are still here.");
    } finally {
      setIsSubmitting(false);
    }
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

  if (variant === "horizontal") {
    return (
      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-3.5 flex flex-col gap-1 border-b border-white/15 pb-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold leading-tight text-white">Request a Free Quote</h2>
            <p className="text-xs text-home-mist">Get in touch with our installation experts today.</p>
          </div>
          <p className="rounded-md bg-white/10 px-2.5 py-1 text-right text-[11px] font-bold text-white">
            SPECIAL OFFER: Save 10% on Labor
          </p>
        </div>

        <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <CompactField label="Name" id="quote-name" error={errors.name}>
            <input
              id="quote-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your Name"
              className={compactInputClass(Boolean(errors.name))}
              aria-invalid={Boolean(errors.name)}
            />
          </CompactField>
          <CompactField label="Phone" id="quote-phone" error={errors.phone}>
            <input
              id="quote-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Phone Number"
              className={compactInputClass(Boolean(errors.phone))}
              aria-invalid={Boolean(errors.phone)}
            />
          </CompactField>
          <CompactField label="Zip Code" id="quote-zip" error={errors.zip}>
            <input
              id="quote-zip"
              name="zip"
              autoComplete="postal-code"
              inputMode="numeric"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              className={compactInputClass(Boolean(errors.zip))}
              aria-invalid={Boolean(errors.zip)}
            />
          </CompactField>
        </div>

        <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <CompactField label="Email" id="quote-email" error={errors.email}>
            <input
              id="quote-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address"
              className={compactInputClass(Boolean(errors.email))}
              aria-invalid={Boolean(errors.email)}
            />
          </CompactField>
          <CompactField label="Project Type" id="quote-projectType" error={errors.projectType}>
            <select
              id="quote-projectType"
              name="projectType"
              value={projectType}
              onChange={(event) => onProjectTypeChange(event.target.value)}
              className={compactInputClass(Boolean(errors.projectType))}
              aria-invalid={Boolean(errors.projectType)}
            >
              <option value="" className="bg-[#FFFFFF] text-[#0F172A]">
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id} className="bg-[#FFFFFF] text-[#0F172A]">
                  {service.title}
                </option>
              ))}
            </select>
          </CompactField>
        </div>

        <div className="mb-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <CompactField label="Project Details" id="quote-details" error={errors.details}>
            <textarea
              id="quote-details"
              name="details"
              rows={1}
              placeholder="Briefly describe your installation needs..."
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              className={`${compactInputClass(Boolean(errors.details))} resize-none py-2`}
              aria-invalid={Boolean(errors.details)}
            />
          </CompactField>
          <CompactField label="Photos or videos" id="quote-media" error={errors.media}>
            <div
              className={`relative flex h-9 w-full cursor-pointer items-center gap-2 overflow-hidden rounded-[4px] bg-white px-3 ${
                errors.media ? "ring-2 ring-red-500" : ""
              }`}
            >
              <span className="shrink-0 text-[11px] font-bold text-slate-700">Choose file</span>
              <span className={`truncate text-xs ${files.length === 0 ? "text-slate-400" : "text-slate-900"}`}>
                {files.length === 0 ? "Attach photos or videos" : files.map((file) => file.name).join(", ")}
              </span>
              <input
                id="quote-media"
                name="media"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,video/mp4,video/quicktime,video/webm,video/*"
                multiple
                onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-invalid={Boolean(errors.media)}
              />
            </div>
          </CompactField>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="flex h-10 w-full items-center justify-center rounded-[4px] bg-[#4EC6FF] text-xs font-bold uppercase tracking-wider text-[#062033] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting" : "Submit Quote Request"}
        </button>
      </form>
    );
  }

  return (
    <form noValidate className="flex flex-col space-y-3" onSubmit={handleSubmit}>
      <div>
        <h2 className="mb-1 text-2xl font-black tracking-tight text-white">
          Request a Free Quote
        </h2>
        <p className="mb-5 text-xs text-home-mist sm:text-sm">
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
          placeholder="Your Name"
          className={inputClass(Boolean(errors.name))}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Phone" id="quote-phone" error={errors.phone}>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone Number"
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
          placeholder="Email Address"
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
          <option value="" className="bg-[#FFFFFF] text-[#0F172A]">
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id} className="bg-[#FFFFFF] text-[#0F172A]">
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
          placeholder="Briefly describe your installation needs..."
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          className={`${inputClass(Boolean(errors.details), false)} resize-none`}
          aria-invalid={Boolean(errors.details)}
        />
      </Field>

      <Field label="Photos or videos" id="quote-media" error={errors.media}>
        <div
          className={`relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-[4px] border bg-[#FFFFFF] p-1.5 focus-within:border-[#38BDF8] focus-within:ring-2 focus-within:ring-[#38BDF8]/20 ${
            errors.media ? "border-red-600" : "border-[#E2E8F0]"
          }`}
        >
          <span className="shrink-0 rounded-[4px] border border-[#E2E8F0] bg-[#F1F5F9] px-3 py-1.5 text-xs font-bold text-[#334155]">
            Choose file
          </span>
          <span
            className={`truncate text-xs sm:text-sm ${
              files.length === 0 ? "text-[#94A3B8]" : "text-[#334155]"
            }`}
          >
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
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-invalid={Boolean(errors.media)}
          />
        </div>
      </Field>

      {submitError ? (
        <p role="alert" className="text-sm font-medium text-red-200">
          {submitError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-[4px] bg-home-accent px-4 py-3.5 text-xs font-black uppercase tracking-wider text-[#062033] shadow-lg shadow-[#4EC6FF]/25 transition-all hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
      >
        {isSubmitting ? "Submitting" : "Submit Quote Request"}
        {isSubmitting ? null : (
          <span className="text-base font-bold" aria-hidden="true">
            →
          </span>
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
      <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-white">
        {label}
      </span>
      {children}
      {error ? (
        <span id={`${id}-error`} role="alert" className="font-normal text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function CompactField({
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
    <label htmlFor={id} className="block min-w-0">
      <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-white">
        {label}
      </span>
      {children}
      {error ? (
        <span id={`${id}-error`} role="alert" className="mt-0.5 block text-[10px] font-normal leading-tight text-red-200">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function compactInputClass(invalid: boolean) {
  return [
    "h-9 w-full rounded-[4px] bg-white px-3 text-xs text-slate-900 scheme-light",
    "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/40",
    invalid ? "ring-2 ring-red-500" : "",
  ].join(" ");
}

function inputClass(invalid: boolean, fixedHeight = true) {
  return [
    fixedHeight ? "" : "resize-none",
    "w-full rounded-[4px] border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#0F172A] shadow-sm scheme-light transition-all placeholder:text-[#94A3B8]",
    "focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20",
    invalid ? "border-red-600" : "",
  ].join(" ");
}

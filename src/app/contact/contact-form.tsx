"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { contactInquirySubmission } from "@/lib/quote-payloads";
import { submitWebsiteQuote } from "@/lib/quote-submit";

const topics = [
  "General Question",
  "Showroom Visit & Hours",
  "Existing Project or Installation",
  "Warranty or Service Inquiry",
  "Quote or Consultation Question",
  "Other",
] as const;

type FieldName = "name" | "email" | "phone" | "topic" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate() {
    const nextErrors: FieldErrors = {};
    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");

    if (trimmedName.length < 2) {
      nextErrors.name = "Enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (digits.length > 0 && digits.length < 10) {
      nextErrors.phone = "Enter a phone number with an area code.";
    }
    if (!message.trim()) {
      nextErrors.message = "Write your message.";
    } else if (message.trim().length > 2000) {
      nextErrors.message = "Keep your message under 2,000 characters.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const result = await submitWebsiteQuote(
      contactInquirySubmission({
        name: name.trim(),
        phone: phone.trim(),
        zip: "",
        email: email.trim(),
        topic,
        message: message.trim(),
      }),
    );
    setSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }
    setSubmittedName(name.trim().split(/\s+/)[0]);
  }

  if (submittedName) {
    return (
      <div className="rounded-[4px] border border-sky-100 bg-[#F4FAFD] px-5 py-8">
        <h3 className="text-2xl font-black text-[#0B192C]">
          Thank you, {submittedName}.
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">
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
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass(Boolean(errors.name))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <Field label="Phone" id="contact-phone" error={errors.phone}>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(206) 555-0123"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
        </Field>
      </div>

      <Field label="Topic" id="contact-topic" error={errors.topic}>
        <select
          id="contact-topic"
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className={inputClass(Boolean(errors.topic))}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={errors.topic ? "contact-topic-error" : undefined}
        >
          <option value="" className="bg-white text-slate-900">
            How can we help?
          </option>
          {topics.map((item) => (
            <option key={item} value={item} className="bg-white text-slate-900">
              {item}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" id="contact-message" error={errors.message} required>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="Write your message or question here..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${inputClass(Boolean(errors.message))} resize-y`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
      </Field>

      {submitError ? (
        <p role="alert" className="text-sm text-red-600">
          {submitError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="bg-[#38BDF8] hover:bg-[#0284C7] text-[#0B192C] hover:text-white font-bold uppercase tracking-wide transition-colors rounded-[4px] disabled:opacity-70 w-full py-4 px-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B192C]"
      >
        {submitting ? "Sending" : "Send Message"}
      </button>
      <p className="text-center text-sm text-slate-500">
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
    <label htmlFor={id} className="block">
      <span className="text-slate-800 font-extrabold text-xs uppercase tracking-wider block mb-1.5">
        {label}
        {required ? <span> *</span> : null}
      </span>
      {children}
      {error ? (
        <span id={`${id}-error`} role="alert" className="mt-1 block text-xs font-normal text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function inputClass(invalid: boolean) {
  return [
    "w-full bg-white border border-slate-200 rounded-[4px] px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none placeholder:text-slate-400",
    invalid ? "border-red-600" : "",
  ].join(" ");
}

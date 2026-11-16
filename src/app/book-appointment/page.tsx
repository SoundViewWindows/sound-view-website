"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type DragEvent, type ReactNode } from "react";
import { Header } from "@/components/Header";
import {
  APPOINTMENT_DURATION,
  APPOINTMENT_PRODUCTS,
  APPOINTMENT_TIME_SLOTS,
  APPOINTMENT_TIME_ZONE,
  REFERRAL_SOURCES,
  US_STATES,
  formatPhoneInput,
  isBookableDate,
  isBookableSlot,
  pacificTodayParts,
  type AppointmentProduct,
  type JobberAppointmentPayload,
  type ReferralSource,
} from "@/lib/jobber/booking-types";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const steps = ["Contact & Address", "Service Details", "Date & Time", "Review"] as const;

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type UploadedImage = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  marketingEmail: boolean;
  phone: string;
  marketingSms: boolean;
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  scope: string;
  products: AppointmentProduct[];
  installation: "" | "yes" | "no";
  workingWith: boolean;
  workingWithName: string;
  images: UploadedImage[];
  referral: ReferralSource | "";
  date: string;
  timeSlot: string;
};

type FieldErrors = Record<string, string>;

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  marketingEmail: true,
  phone: "",
  marketingSms: false,
  street: "",
  unit: "",
  city: "",
  state: "WA",
  zip: "",
  scope: "",
  products: [],
  installation: "",
  workingWith: false,
  workingWithName: "",
  images: [],
  referral: "",
  date: "",
  timeSlot: "",
};

export default function BookAppointmentPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [imageNote, setImageNote] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState<{ referenceId: string } | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = pacificTodayParts();
    return { year: today.year, month: today.month };
  });
  const imagesRef = useRef<UploadedImage[]>([]);
  const skipScroll = useRef(true);
  const uploadId = useId();

  useEffect(() => {
    imagesRef.current = form.images;
  }, [form.images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, []);

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    document.getElementById("booking-funnel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, confirmation]);

  function patch<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function goNext() {
    const nextErrors = validateStep(step, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep((current) => Math.min(current + 1, 3));
  }

  function goBack() {
    setSubmitError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  function jumpTo(index: number) {
    setSubmitError("");
    setStep(index);
  }

  function toggleProduct(product: AppointmentProduct) {
    setForm((current) => {
      const products = current.products.includes(product)
        ? current.products.filter((item) => item !== product)
        : [...current.products, product];
      return { ...current, products };
    });
    setErrors((current) => {
      if (!current.products) return current;
      const next = { ...current };
      delete next.products;
      return next;
    });
  }

  function addImages(files: FileList | File[]) {
    const room = Math.max(10 - form.images.length, 0);
    const accepted: UploadedImage[] = [];
    let rejected = false;
    for (const file of Array.from(files)) {
      const type = file.type || imageTypeFromName(file.name);
      if (!type.startsWith("image/") || file.size > 10_000_000) {
        rejected = true;
        continue;
      }
      accepted.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        type,
        size: file.size,
        url: URL.createObjectURL(file),
      });
    }
    const kept = accepted.slice(0, room);
    accepted.slice(room).forEach((image) => URL.revokeObjectURL(image.url));
    setImageNote(rejected || accepted.length > room ? "You can attach up to 10 image files, 10 MB each." : "");
    if (kept.length === 0) return;
    setForm((current) => ({ ...current, images: [...current.images, ...kept] }));
  }

  function removeImage(id: string) {
    setForm((current) => {
      const image = current.images.find((item) => item.id === id);
      if (image) URL.revokeObjectURL(image.url);
      return { ...current, images: current.images.filter((item) => item.id !== id) };
    });
    setImageNote("");
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files.length) addImages(event.dataTransfer.files);
  }

  function selectDate(iso: string) {
    const slot = APPOINTMENT_TIME_SLOTS.find((item) => item.label === form.timeSlot);
    const keepTime = Boolean(slot && isBookableSlot(iso, slot.startHour));
    setForm((current) => ({ ...current, date: iso, timeSlot: keepTime ? current.timeSlot : "" }));
    setErrors((current) => {
      const next = { ...current };
      delete next.date;
      if (!keepTime) delete next.time;
      return next;
    });
  }

  async function confirmAppointment() {
    const nextErrors = validateStep(3, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError(nextErrors.time || nextErrors.date || "Choose an available weekday and time.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(form)),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; referenceId?: string; message?: string } | null;
      if (!response.ok || !result?.ok || !result.referenceId) {
        setSubmitError(result?.message || "We could not send your request. Please try again.");
        return;
      }
      setConfirmation({ referenceId: result.referenceId });
    } catch {
      setSubmitError("We could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-[#F4F6F9] text-[#0B192C]">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0B192C] text-white">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <img src="/images/hero-bg.jpg" alt="" className="h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/85 to-[#0B192C]/70" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-10 md:py-10">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className={`rounded-[4px] hover:text-white ${focusRing}`}>
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <span aria-current="page">Book Appointment</span>
                </li>
              </ol>
            </nav>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              In-Home Consultations & Showroom Visits
            </p>
            <h1 className="mb-3 max-w-4xl text-4xl font-bold leading-tight text-white lg:text-5xl">
              Schedule Your Appointment
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Choose a date and time for a relaxed, zero-pressure consultation with a local Sound View specialist.
            </p>
          </div>
        </section>

        <section className="bg-[#F4F6F9] py-8 md:py-12" style={{ backgroundColor: "#F4F6F9" }}>
          <div id="booking-funnel" className="mx-auto max-w-3xl scroll-mt-20 px-4 sm:px-6">
            {confirmation ? (
              <Confirmation
                referenceId={confirmation.referenceId}
                dateLabel={formatLongDate(form.date)}
                timeSlot={form.timeSlot}
              />
            ) : (
              <>
                <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Booking progress">
                  {steps.map((label, index) => {
                    const active = index <= step;
                    return (
                      <li key={label}>
                        <div className={`h-1.5 rounded-[4px] ${active ? "bg-[#38BDF8]" : "bg-slate-300"}`} />
                        <p
                          className={`mt-2 text-center text-[11px] font-semibold leading-tight sm:text-xs ${
                            active ? "text-[#0B192C]" : "text-slate-500"
                          }`}
                        >
                          {index + 1}. {label}
                        </p>
                      </li>
                    );
                  })}
                </ol>

                <div className="rounded-[4px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                  {step === 0 ? (
                    <ContactStep form={form} errors={errors} onChange={patch} />
                  ) : null}
                  {step === 1 ? (
                    <ServiceStep
                      form={form}
                      errors={errors}
                      imageNote={imageNote}
                      dragOver={dragOver}
                      uploadId={uploadId}
                      onChange={patch}
                      onToggleProduct={toggleProduct}
                      onAddImages={addImages}
                      onRemoveImage={removeImage}
                      onDragState={setDragOver}
                      onDrop={onDrop}
                    />
                  ) : null}
                  {step === 2 ? (
                    <ScheduleStep
                      form={form}
                      errors={errors}
                      visibleMonth={visibleMonth}
                      onVisibleMonth={setVisibleMonth}
                      onSelectDate={selectDate}
                      onSelectTime={(timeSlot) => patch("timeSlot", timeSlot)}
                    />
                  ) : null}
                  {step === 3 ? <ReviewStep form={form} onEdit={jumpTo} /> : null}
                </div>

                {submitError ? (
                  <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <div className="mt-6 flex items-center justify-end gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className={`rounded-[4px] border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0B192C] transition-colors hover:bg-slate-50 ${focusRing}`}
                    >
                      Back
                    </button>
                  ) : null}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className={`rounded-[4px] bg-[#38BDF8] px-5 py-2.5 text-sm font-bold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white ${focusRing}`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={confirmAppointment}
                      disabled={submitting}
                      className={`rounded-[4px] bg-[#38BDF8] px-5 py-2.5 text-sm font-bold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
                    >
                      {submitting ? "Sending..." : "Confirm"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function ContactStep({
  form,
  errors,
  onChange,
}: {
  form: FormState;
  errors: FieldErrors;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-bold text-[#0B192C]">Contact details</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="First name"
            required
            value={form.firstName}
            error={errors.firstName}
            autoComplete="given-name"
            onChange={(value) => onChange("firstName", value)}
          />
          <TextField
            label="Last name"
            required
            value={form.lastName}
            error={errors.lastName}
            autoComplete="family-name"
            onChange={(value) => onChange("lastName", value)}
          />
        </div>
        <div className="mt-4">
          <TextField
            label="Company name"
            value={form.companyName}
            autoComplete="organization"
            onChange={(value) => onChange("companyName", value)}
          />
        </div>
        <div className="mt-4">
          <TextField
            label="Email"
            required
            type="email"
            value={form.email}
            error={errors.email}
            autoComplete="email"
            onChange={(value) => onChange("email", value)}
          />
        </div>
        <CheckRow
          className="mt-4"
          checked={form.marketingEmail}
          onChange={(checked) => onChange("marketingEmail", checked)}
          label="I'd like to receive marketing emails from Sound View Window & Door, Inc. Unsubscribe at any time."
        />
        <div className="mt-4">
          <TextField
            label="Phone"
            required
            type="tel"
            inputMode="tel"
            value={form.phone}
            error={errors.phone}
            autoComplete="tel"
            placeholder="(___) ___-____"
            onChange={(value) => onChange("phone", formatPhoneInput(value))}
          />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          By providing your phone number, you agree to receive Visit Reminders and other transactional text messages (SMS) from Sound View Window & Door, Inc. You can unsubscribe at any time by replying STOP. Message and data rates may apply. Message frequency varies. Reply HELP for help or STOP to cancel.
        </p>
        <CheckRow
          className="mt-3"
          checked={form.marketingSms}
          onChange={(checked) => onChange("marketingSms", checked)}
          label="I also agree to receive marketing SMS from Sound View Window & Door, Inc. Reply STOP MKT to opt out of marketing SMS."
        />
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#0B192C]">Address</h2>
        <div className="mt-4">
          <TextField
            label="Street address"
            badge="Required"
            value={form.street}
            error={errors.street}
            autoComplete="address-line1"
            onChange={(value) => onChange("street", value)}
          />
        </div>
        <div className="mt-4">
          <TextField
            label="Unit, apartment, suite, etc. (optional)"
            value={form.unit}
            autoComplete="address-line2"
            onChange={(value) => onChange("unit", value)}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField
            label="City"
            required
            value={form.city}
            error={errors.city}
            autoComplete="address-level2"
            onChange={(value) => onChange("city", value)}
          />
          <label className="block">
            <FieldLabel required>State</FieldLabel>
            <select
              value={form.state}
              autoComplete="address-level1"
              aria-invalid={errors.state ? true : undefined}
              onChange={(event) => onChange("state", event.target.value)}
              className={controlClass(Boolean(errors.state))}
            >
              {US_STATES.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <FieldError message={errors.state} />
          </label>
          <TextField
            label="ZIP Code"
            required
            inputMode="numeric"
            value={form.zip}
            error={errors.zip}
            autoComplete="postal-code"
            onChange={(value) => onChange("zip", value)}
          />
        </div>
      </section>
    </div>
  );
}

function ServiceStep({
  form,
  errors,
  imageNote,
  dragOver,
  uploadId,
  onChange,
  onToggleProduct,
  onAddImages,
  onRemoveImage,
  onDragState,
  onDrop,
}: {
  form: FormState;
  errors: FieldErrors;
  imageNote: string;
  dragOver: boolean;
  uploadId: string;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onToggleProduct: (product: AppointmentProduct) => void;
  onAddImages: (files: FileList | File[]) => void;
  onRemoveImage: (id: string) => void;
  onDragState: (active: boolean) => void;
  onDrop: (event: DragEvent<HTMLLabelElement>) => void;
}) {
  return (
    <div className="space-y-6">
      <label className="block">
        <FieldLabel badge="Required">Please describe your project and/or scope of work</FieldLabel>
        <textarea
          rows={4}
          value={form.scope}
          aria-invalid={errors.scope ? true : undefined}
          onChange={(event) => onChange("scope", event.target.value)}
          className={controlClass(Boolean(errors.scope))}
        />
        <FieldError message={errors.scope} />
      </label>

      <fieldset>
        <legend className="mb-2">
          <FieldLabel badge="Required">What products are you looking for?</FieldLabel>
        </legend>
        <div className="space-y-2">
          {APPOINTMENT_PRODUCTS.map((product) => (
            <CheckRow
              key={product}
              checked={form.products.includes(product)}
              onChange={() => onToggleProduct(product)}
              label={product}
            />
          ))}
        </div>
        <FieldError message={errors.products} />
      </fieldset>

      <fieldset>
        <legend className="mb-2">
          <FieldLabel badge="Required">Do you need installation of these products as well?</FieldLabel>
        </legend>
        <div className="space-y-2">
          {(["yes", "no"] as const).map((value) => (
            <CheckRow
              key={value}
              role="radio"
              checked={form.installation === value}
              onChange={() => onChange("installation", value)}
              label={value === "yes" ? "Yes" : "No"}
            />
          ))}
        </div>
        <FieldError message={errors.installation} />
      </fieldset>

      <div>
        <p className="text-sm font-semibold text-[#0B192C]">
          Have you been working with someone at Sound View currently or in the past?
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className={form.workingWith ? "text-sm text-slate-400" : "text-sm font-semibold text-[#0B192C]"}>No</span>
          <button
            type="button"
            role="switch"
            aria-checked={form.workingWith}
            aria-label="Working with someone at Sound View"
            onClick={() => onChange("workingWith", !form.workingWith)}
            className={`relative h-7 w-14 rounded-[4px] transition-colors ${form.workingWith ? "bg-[#0284C7]" : "bg-slate-300"} ${focusRing}`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-[4px] bg-white transition-transform ${
                form.workingWith ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
          <span className={form.workingWith ? "text-sm font-semibold text-[#0B192C]" : "text-sm text-slate-400"}>Yes</span>
        </div>
        <div
          inert={form.workingWith ? undefined : true}
          className={`grid transition-all duration-300 ${
            form.workingWith ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <TextField
              label="Who have you been working with? (optional)"
              value={form.workingWithName}
              onChange={(value) => onChange("workingWithName", value)}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#0B192C]">Upload images</h2>
          <span className="rounded-[4px] bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            {form.images.length}/10
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">Share images of the work to be done</p>
        <label
          htmlFor={uploadId}
          onDragOver={(event) => {
            event.preventDefault();
            onDragState(true);
          }}
          onDragLeave={() => onDragState(false)}
          onDrop={onDrop}
          className={`mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[4px] border-2 border-dashed px-4 py-8 text-center transition-colors ${
            dragOver ? "border-[#38BDF8] bg-sky-50" : "border-slate-300 hover:border-[#38BDF8]"
          } ${focusRing}`}
        >
          <span className="text-sm font-semibold text-[#0B192C]">Drag images here or click to upload</span>
          <span className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP, or other images. Up to 10 files.</span>
          <input
            id={uploadId}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => {
              if (event.target.files) addAndReset(event.target, onAddImages);
            }}
          />
        </label>
        {imageNote ? <p className="mt-2 text-xs font-medium text-red-600">{imageNote}</p> : null}
        {form.images.length > 0 ? (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {form.images.map((image) => (
              <li key={image.id} className="relative">
                <img src={image.url} alt="" className="h-20 w-full rounded-[4px] object-cover" />
                <button
                  type="button"
                  aria-label={`Remove ${image.name}`}
                  onClick={() => onRemoveImage(image.id)}
                  className={`absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#0B192C]/80 text-xs font-bold text-white ${focusRing}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <label className="block">
        <FieldLabel>How did you hear about us?</FieldLabel>
        <select
          value={form.referral}
          onChange={(event) => onChange("referral", event.target.value as ReferralSource | "")}
          className={controlClass(false)}
        >
          <option value="">Select an option...</option>
          {REFERRAL_SOURCES.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function ScheduleStep({
  form,
  errors,
  visibleMonth,
  onVisibleMonth,
  onSelectDate,
  onSelectTime,
}: {
  form: FormState;
  errors: FieldErrors;
  visibleMonth: { year: number; month: number };
  onVisibleMonth: (value: { year: number; month: number }) => void;
  onSelectDate: (iso: string) => void;
  onSelectTime: (slot: string) => void;
}) {
  const today = pacificTodayParts();
  const monthLabel = new Date(visibleMonth.year, visibleMonth.month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const monthOffset = (visibleMonth.year - today.year) * 12 + (visibleMonth.month - today.month);
  const cells = calendarCells(visibleMonth.year, visibleMonth.month);

  return (
    <div>
      <h2 className="text-lg font-bold text-[#0B192C]">Schedule an appointment</h2>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <p className="text-sm text-slate-600">Choose a date and time</p>
        <RequiredBadge />
      </div>
      <FieldError message={errors.date} />
      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#0B192C]">Select a date</h3>
              <p className="mt-1 text-sm font-semibold text-[#0B192C]">{monthLabel}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous month"
                disabled={monthOffset <= 0}
                onClick={() => onVisibleMonth(shiftMonth(visibleMonth.year, visibleMonth.month, -1))}
                className={`flex h-8 w-8 items-center justify-center rounded-[4px] border border-slate-300 text-sm font-bold text-[#0B192C] disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`}
              >
                &lt;
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={monthOffset >= 12}
                onClick={() => onVisibleMonth(shiftMonth(visibleMonth.year, visibleMonth.month, 1))}
                className={`flex h-8 w-8 items-center justify-center rounded-[4px] border border-slate-300 text-sm font-bold text-[#0B192C] disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekdays.map((day) => (
              <div key={day} className="py-1 text-[11px] font-semibold tracking-wide text-slate-500">
                {day}
              </div>
            ))}
            {cells.map((cell, index) => {
              if (!cell) return <div key={`empty-${index}`} className="h-9" />;
              const iso = isoDate(visibleMonth.year, visibleMonth.month, cell.day);
              const weekend = cell.weekday === 0 || cell.weekday === 6;
              const past = iso < isoDate(today.year, today.month, today.day);
              const disabled = weekend || past;
              const selected = form.date === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() => onSelectDate(iso)}
                  className={`h-9 rounded-[4px] text-sm ${
                    selected
                      ? "bg-[#0284C7] font-bold text-white"
                      : disabled
                        ? "cursor-not-allowed text-slate-300"
                        : "bg-slate-100 text-[#0B192C] hover:bg-sky-100"
                  } ${focusRing}`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
          <div className="mt-5">
            <p className="mb-2 text-sm font-bold text-[#0B192C]">Time Zone</p>
            <div className="rounded-[4px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-[#0B192C]">
              America/Los_Angeles (Pacific Time)
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#0B192C]">Select a time</h3>
          <p className="mt-2 text-sm font-semibold text-[#0B192C]">
            {form.date ? formatLongDate(form.date) : "Select a weekday to view times"}
          </p>
          <p className="mt-1 text-sm text-slate-500">Estimated duration: 1h</p>
          <div className="mt-3 max-h-[360px] space-y-2 overflow-y-auto pr-1">
            {APPOINTMENT_TIME_SLOTS.map((slot) => {
              const available = Boolean(form.date) && isBookableSlot(form.date, slot.startHour);
              const selected = form.timeSlot === slot.label;
              return (
                <button
                  key={slot.label}
                  type="button"
                  disabled={!available}
                  aria-pressed={selected}
                  onClick={() => onSelectTime(slot.label)}
                  className={`w-full rounded-[4px] border px-3 py-3 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-300 ${
                    selected
                      ? "border-[#0284C7] bg-sky-50 font-semibold text-[#0B192C]"
                      : "border-slate-200 bg-white text-[#0B192C] hover:border-[#38BDF8]"
                  } ${focusRing}`}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
          <FieldError message={errors.time} />
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ form, onEdit }: { form: FormState; onEdit: (step: number) => void }) {
  const streetLine = [form.street.trim(), form.unit.trim()].filter(Boolean).join(", ");
  const cityLine = `${form.city.trim()}, ${form.state} ${form.zip.trim()}`;
  const specialist = form.workingWith
    ? form.workingWithName.trim()
      ? `Yes, ${form.workingWithName.trim()}`
      : "Yes"
    : "No";

  return (
    <div>
      <h2 className="text-lg font-bold text-[#0B192C]">Review</h2>
      <div className="mt-5 space-y-6">
        <ReviewSection title="Contact information" onEdit={() => onEdit(0)}>
          <ReviewRow label="Full name" value={`${form.firstName.trim()} ${form.lastName.trim()}`} />
          <ReviewRow label="Company name" value={form.companyName.trim() || "-"} />
          <ReviewRow label="Email" value={form.email.trim()} />
          <ReviewRow label="Phone" value={form.phone} />
          <ReviewRow label="Street address" value={`${streetLine}, ${cityLine}`} />
          <ReviewRow
            label="Marketing preferences"
            value={`Emails: ${form.marketingEmail ? "Yes" : "No"}. SMS: ${form.marketingSms ? "Yes" : "No"}.`}
          />
        </ReviewSection>
        <ReviewSection title="Service details" onEdit={() => onEdit(1)}>
          <ReviewRow label="Scope of work" value={form.scope.trim()} />
          <ReviewRow label="Selected products" value={form.products.join(", ")} />
          <ReviewRow label="Installation needed" value={form.installation === "yes" ? "Yes" : "No"} />
          <ReviewRow label="Working with someone at Sound View" value={specialist} />
          <ReviewRow label="Uploaded images" value={`${form.images.length} of 10 attached`} />
          <ReviewRow label="How did you hear about us?" value={form.referral || "-"} />
        </ReviewSection>
        <ReviewSection title="Appointment details" onEdit={() => onEdit(2)}>
          <ReviewRow label="Selected date" value={formatLongDate(form.date)} />
          <ReviewRow label="Selected time slot" value={form.timeSlot} />
          <ReviewRow label="Estimated duration" value="1h" />
          <ReviewRow label="Time zone" value="America/Los_Angeles" />
        </ReviewSection>
      </div>
    </div>
  );
}

function Confirmation({
  referenceId,
  dateLabel,
  timeSlot,
}: {
  referenceId: string;
  dateLabel: string;
  timeSlot: string;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-[4px] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
      <svg viewBox="0 0 48 48" className="mx-auto h-14 w-14 text-[#0284C7]" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 25.5 21 32l13-15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h2 className="mt-4 text-3xl font-bold text-[#0B192C]">Thank You</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        We have received your request and will get back to you shortly to confirm your appointment.
      </p>
      <div className="mt-6 rounded-[4px] bg-[#F4F6F9] px-4 py-4 text-left text-sm text-[#0B192C]">
        <p>
          <span className="font-semibold">Date:</span> {dateLabel}
        </p>
        <p className="mt-1">
          <span className="font-semibold">Time:</span> {timeSlot}
        </p>
        <p className="mt-1">
          <span className="font-semibold">Reference:</span> {referenceId}
        </p>
      </div>
      <Link
        href="/"
        className={`mt-6 inline-flex rounded-[4px] bg-[#38BDF8] px-5 py-2.5 text-sm font-bold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white ${focusRing}`}
      >
        Return to Home
      </Link>
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-[#0B192C]">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className={`text-sm font-semibold text-[#0284C7] ${focusRing}`}
        >
          Edit
        </button>
      </div>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 whitespace-pre-wrap text-sm text-[#0B192C]">{value}</p>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  badge,
  error,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  badge?: string;
  error?: string;
  type?: string;
  inputMode?: "tel" | "numeric" | "email" | "text";
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <FieldLabel required={required} badge={badge}>
        {label}
      </FieldLabel>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={controlClass(Boolean(error))}
      />
      <FieldError message={error} />
    </label>
  );
}

function FieldLabel({
  children,
  required,
  badge,
}: {
  children: ReactNode;
  required?: boolean;
  badge?: string;
}) {
  return (
    <span className="mb-1.5 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#0B192C]">
      <span>
        {children}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      {badge ? <RequiredBadge label={badge} /> : null}
    </span>
  );
}

function RequiredBadge({ label = "Required" }: { label?: string }) {
  return (
    <span className="rounded-[4px] bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
      {label}
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

function CheckRow({
  checked,
  onChange,
  label,
  className = "",
  role = "checkbox",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
  role?: "checkbox" | "radio";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start gap-3 rounded-[4px] text-left text-sm leading-5 text-[#0B192C] ${focusRing} ${className}`}
    >
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
          checked ? "border-[#0284C7] bg-[#0284C7] text-white" : "border-slate-400 bg-white"
        }`}
        aria-hidden="true"
      >
        {checked ? (
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M3.5 8.2 6.4 11l6.1-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span>{label}</span>
    </button>
  );
}

function controlClass(invalid: boolean) {
  return `w-full rounded-[4px] border bg-white px-3 py-2.5 text-sm text-[#0B192C] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0284C7] ${
    invalid ? "border-red-500" : "border-slate-300"
  } ${focusRing}`;
}

function validateStep(step: number, form: FormState): FieldErrors {
  if (step === 0) return validateContact(form);
  if (step === 1) return validateService(form);
  if (step === 2 || step === 3) return validateSchedule(form);
  return {};
}

function validateContact(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.firstName.trim()) errors.firstName = "! Invalid input";
  if (!form.lastName.trim()) errors.lastName = "! Invalid input";
  if (!form.email.trim()) errors.email = "! Invalid input";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  const digits = form.phone.replace(/\D/g, "");
  if (!digits) errors.phone = "! Invalid input";
  else if (digits.length !== 10) errors.phone = "Enter a 10-digit phone number.";
  if (!form.street.trim()) errors.street = "! Invalid input";
  if (!form.city.trim()) errors.city = "! Invalid input";
  if (!form.state) errors.state = "! Invalid input";
  if (!form.zip.trim()) errors.zip = "! Invalid input";
  else if (!/^\d{5}(-\d{4})?$/.test(form.zip.trim())) errors.zip = "Enter a valid ZIP code.";
  return errors;
}

function validateService(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.scope.trim()) errors.scope = "! Invalid input";
  if (form.products.length === 0) errors.products = "Select at least one product.";
  if (form.installation !== "yes" && form.installation !== "no") errors.installation = "! Invalid input";
  return errors;
}

function validateSchedule(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!isBookableDate(form.date)) {
    errors.date = "Choose a weekday.";
    return errors;
  }
  const slot = APPOINTMENT_TIME_SLOTS.find((item) => item.label === form.timeSlot);
  if (!slot || !isBookableSlot(form.date, slot.startHour)) errors.time = "Choose a time slot.";
  return errors;
}

function toPayload(form: FormState): JobberAppointmentPayload {
  return {
    contact: {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      companyName: form.companyName.trim(),
      email: form.email.trim(),
      phone: form.phone,
    },
    address: {
      street: form.street.trim(),
      unit: form.unit.trim(),
      city: form.city.trim(),
      state: form.state,
      zip: form.zip.trim(),
    },
    serviceDetails: {
      scopeOfWork: form.scope.trim(),
      products: form.products,
      installationNeeded: form.installation === "yes",
      workingWithSoundView: form.workingWith,
      workingWithName: form.workingWith ? form.workingWithName.trim() : "",
      images: form.images.map((image) => ({ name: image.name, type: image.type, size: image.size })),
      referralSource: form.referral,
    },
    schedule: {
      date: form.date,
      timeSlot: form.timeSlot as JobberAppointmentPayload["schedule"]["timeSlot"],
      duration: APPOINTMENT_DURATION,
      timeZone: APPOINTMENT_TIME_ZONE,
    },
    consents: {
      marketingEmail: form.marketingEmail,
      transactionalSms: true,
      marketingSms: form.marketingSms,
    },
    submittedAt: new Date().toISOString(),
  };
}

function addAndReset(input: HTMLInputElement, onAddImages: (files: FileList | File[]) => void) {
  if (input.files) onAddImages(input.files);
  input.value = "";
}

function imageTypeFromName(name: string) {
  const extension = name.split(".").pop()?.toLowerCase();
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  if (extension === "gif") return "image/gif";
  if (extension === "heic") return "image/heic";
  return "";
}

function calendarCells(year: number, month: number) {
  const count = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const lead = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const cells: Array<{ day: number; weekday: number } | null> = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) {
    cells.push({ day, weekday: new Date(Date.UTC(year, month, day)).getUTCDay() });
  }
  return cells;
}

function shiftMonth(year: number, month: number, delta: number) {
  const date = new Date(year, month + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatLongDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

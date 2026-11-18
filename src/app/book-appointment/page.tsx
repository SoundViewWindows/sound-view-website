"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useId, useRef, useState, type DragEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import {
  APPOINTMENT_DURATION,
  APPOINTMENT_PRODUCTS,
  APPOINTMENT_TIME_ZONE,
  REFERRAL_SOURCES,
  US_STATES,
  formatPhoneInput,
  pacificTodayParts,
  type AppointmentProduct,
  type JobberAppointmentPayload,
  type ReferralSource,
} from "@/lib/jobber/booking-types";
import {
  APPOINTMENT_LOCATIONS,
  appointmentLocationById,
  appointmentLocationFromQuery,
  type AppointmentLocationId,
} from "@/lib/jobber/schedule-config";
import { BOOKING_SCHEDULE_CONFIG, pacificYearMonth } from "@/lib/jobber/booking-schedule";

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
  locationId: AppointmentLocationId | "";
};

type FieldErrors = Record<string, string>;

const STEP_1_FIELD_ORDER = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "streetAddress",
  "city",
  "state",
  "zipCode",
  "location",
] as const;

const STEP_2_FIELD_ORDER = ["scopeOfWork", "products", "installationNeeded"] as const;

const STEP_3_FIELD_ORDER = ["schedule"] as const;

const FIELD_ERROR_KEYS: Record<string, string[]> = {
  location: ["location"],
  firstName: ["firstName"],
  lastName: ["lastName"],
  email: ["email"],
  phone: ["phone"],
  streetAddress: ["street"],
  city: ["city"],
  state: ["state"],
  zipCode: ["zip"],
  scopeOfWork: ["scope"],
  products: ["products"],
  installationNeeded: ["installation"],
  schedule: ["date", "time"],
};

function firstInvalidField(step: number, nextErrors: FieldErrors) {
  const order =
    step === 0 ? STEP_1_FIELD_ORDER : step === 1 ? STEP_2_FIELD_ORDER : step === 2 ? STEP_3_FIELD_ORDER : [];
  return order.find((key) => (FIELD_ERROR_KEYS[key] ?? []).some((errorKey) => nextErrors[errorKey]));
}

function scrollToField(fieldKey: string) {
  requestAnimationFrame(() => {
    const target = document.getElementById(`field-${fieldKey}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    const focusable = target?.querySelector("input, textarea, select");
    if (
      focusable instanceof HTMLInputElement ||
      focusable instanceof HTMLTextAreaElement ||
      focusable instanceof HTMLSelectElement
    ) {
      focusable.focus({ preventScroll: true });
    }
  });
}

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
  locationId: "",
};

export default function BookAppointmentPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [imageNote, setImageNote] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [confirmation, setConfirmation] = useState<{ referenceId: string } | null>(null);
  const [visibleMonth, setVisibleMonth] = useState<{ year: number; month: number } | null>(null);
  const [availabilityByMonth, setAvailabilityByMonth] = useState<
    Record<string, { syncedWithJobber: boolean; availability: Record<string, string[]> }>
  >({});
  const [loadingMonth, setLoadingMonth] = useState<string | null>(null);
  const imagesRef = useRef<UploadedImage[]>([]);
  const skipScroll = useRef(true);
  const uploadId = useId();

  useEffect(() => {
    imagesRef.current = form.images;
  }, [form.images]);

  useEffect(() => {
    setVisibleMonth((current) => current ?? currentPacificMonth());
  }, []);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, []);

  const pickLocation = useCallback((id: AppointmentLocationId) => {
    setForm((current) => (current.locationId === id ? current : { ...current, locationId: id }));
    setErrors((current) => {
      if (!current.location) return current;
      const next = { ...current };
      delete next.location;
      return next;
    });
  }, []);

  const visibleMonthKey = visibleMonth
    ? `${visibleMonth.year}-${String(visibleMonth.month + 1).padStart(2, "0")}`
    : "";

  useEffect(() => {
    if (step !== 2 || !visibleMonthKey || availabilityByMonth[visibleMonthKey]) return;
    const controller = new AbortController();
    setLoadingMonth(visibleMonthKey);
    fetch(`/api/appointments/availability?month=${visibleMonthKey}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((result: { ok?: boolean; syncedWithJobber?: boolean; availability?: Record<string, string[]> }) => {
        if (!result?.ok || !result.availability || typeof result.availability !== "object") return;
        setAvailabilityByMonth((current) => ({
          ...current,
          [visibleMonthKey]: {
            syncedWithJobber: Boolean(result.syncedWithJobber),
            availability: result.availability ?? {},
          },
        }));
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoadingMonth((current) => (current === visibleMonthKey ? null : current));
        }
      });
    return () => controller.abort();
  }, [availabilityByMonth, step, visibleMonthKey]);

  useEffect(() => {
    if (step !== 2) return;
    const monthData = availabilityByMonth[visibleMonthKey];
    if (!monthData) return;
    const openDates = Object.keys(monthData.availability)
      .filter((date) => (monthData.availability[date]?.length ?? 0) > 0)
      .sort();
    setForm((current) => {
      const selectedStillOpen = Boolean(
        current.date.startsWith(`${visibleMonthKey}-`) && (monthData.availability[current.date]?.length ?? 0) > 0,
      );
      const date = selectedStillOpen ? current.date : (openDates[0] ?? "");
      const slots = date ? (monthData.availability[date] ?? []) : [];
      const timeSlot = slots.includes(current.timeSlot) ? current.timeSlot : "";
      if (date === current.date && timeSlot === current.timeSlot) return current;
      return { ...current, date, timeSlot };
    });
  }, [availabilityByMonth, step, visibleMonthKey]);

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    const targetId = confirmation ? "booking-funnel" : "booking-funnel-top";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    const nextErrors = validateStep(step, form, availabilityByMonth);
    setErrors(nextErrors);
    const firstInvalidKey = firstInvalidField(step, nextErrors);
    if (firstInvalidKey) {
      scrollToField(firstInvalidKey);
      return;
    }
    setVisibleMonth((current) => current ?? currentPacificMonth());
    setStep((current) => Math.min(current + 1, 3));
  }

  function goBack() {
    setSubmitError("");
    setStep((current) => Math.max(current - 1, 0));
  }

  function jumpTo(index: number) {
    setSubmitError("");
    setVisibleMonth((current) => current ?? currentPacificMonth());
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

  function clearMonthAvailability(month: string) {
    if (!month) return;
    setAvailabilityByMonth((current) => {
      if (!current[month]) return current;
      const next = { ...current };
      delete next[month];
      return next;
    });
  }

  function selectDate(iso: string) {
    const slots = availabilityByMonth[visibleMonthKey]?.availability[iso] ?? [];
    const keepTime = slots.includes(form.timeSlot);
    setForm((current) => ({
      ...current,
      date: iso,
      timeSlot: keepTime ? current.timeSlot : "",
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next.date;
      if (!keepTime) delete next.time;
      return next;
    });
  }

  async function confirmAppointment() {
    const nextErrors = validateStep(3, form, availabilityByMonth);
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
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
        jobberSynced?: boolean;
        assessmentScheduled?: boolean;
        jobberRequestId?: string;
        referenceId?: string;
        message?: string;
      } | null;
      if (result?.code === "SLOT_UNAVAILABLE" || result?.code === "TOO_SOON" || result?.code === "HOLIDAY_CLOSED") {
        clearMonthAvailability(form.date.slice(0, 7));
        setForm((current) => ({ ...current, timeSlot: "" }));
        setStep(2);
        setSlotError(result?.message || scheduleRejectionMessage(result?.code));
        setSubmitError("");
        requestAnimationFrame(() => {
          document.getElementById("field-schedule")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
      if (
        !response.ok ||
        result?.ok !== true ||
        result.jobberSynced !== true ||
        result.assessmentScheduled !== true ||
        !result.jobberRequestId
      ) {
        setSubmitError(
          result?.message || "We could not save your appointment. Your details are still here. Please try again.",
        );
        return;
      }
      clearMonthAvailability(form.date.slice(0, 7));
      setSlotError("");
      setConfirmation({ referenceId: result.referenceId || result.jobberRequestId });
    } catch {
      setSubmitError("We could not save your appointment. Your details are still here. Please try again.");
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
            <Suspense fallback={null}>
              <LocationFromQuery onPick={pickLocation} />
            </Suspense>
            {confirmation ? (
              <Confirmation
                referenceId={confirmation.referenceId}
                dateLabel={formatLongDate(form.date)}
                timeSlot={form.timeSlot}
                locationId={form.locationId}
              />
            ) : (
              <>
                <ol id="booking-funnel-top" className="mb-6 grid scroll-mt-24 grid-cols-4 gap-2" aria-label="Booking progress">
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
                  {step === 2 && visibleMonth ? (
                    <ScheduleStep
                      form={form}
                      errors={errors}
                      visibleMonth={visibleMonth}
                      availability={availabilityByMonth[visibleMonthKey]?.availability}
                      loading={loadingMonth === visibleMonthKey && !availabilityByMonth[visibleMonthKey]}
                      slotError={slotError}
                      onVisibleMonth={setVisibleMonth}
                      onSelectDate={selectDate}
                      onSelectTime={(timeSlot) => {
                        setSlotError("");
                        patch("timeSlot", timeSlot);
                      }}
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
  const selectedId = form.locationId;
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-bold text-[#0B192C]">Contact details</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="field-firstName"
            label="First name"
            required
            value={form.firstName}
            error={errors.firstName}
            autoComplete="given-name"
            onChange={(value) => onChange("firstName", value)}
          />
          <TextField
            id="field-lastName"
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
            id="field-email"
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
            id="field-phone"
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
            id="field-streetAddress"
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
            id="field-city"
            label="City"
            required
            value={form.city}
            error={errors.city}
            autoComplete="address-level2"
            onChange={(value) => onChange("city", value)}
          />
          <label id="field-state" className="block scroll-mt-28">
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
            id="field-zipCode"
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

      <section id="field-location" className="scroll-mt-28 border-t border-slate-200 pt-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold text-[#0B192C]">Select ShowRoom Appointment Location</h2>
          <RequiredBadge />
        </div>
        <div
          role="radiogroup"
          aria-label="Select ShowRoom Appointment Location"
          aria-invalid={errors.location ? true : undefined}
          className={`grid grid-cols-1 gap-3 sm:grid-cols-3 ${
            errors.location ? "rounded-[4px] outline outline-1 outline-red-500" : ""
          }`}
        >
          {APPOINTMENT_LOCATIONS.map((location) => {
            const selected = selectedId === location.id;
            return (
              <button
                key={location.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange("locationId", location.id)}
                className={`relative rounded-[4px] p-3.5 text-left text-[#0B192C] transition-colors ${
                  selected
                    ? "border-2 border-[#0284C7] bg-sky-50/70"
                    : "border border-slate-300 bg-white hover:border-[#38BDF8]"
                } ${focusRing}`}
              >
                {selected ? (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#0284C7] text-white">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                      <path d="M3.5 8.2 6.4 11l6.1-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : null}
                <span className="block pr-6 text-sm font-semibold">{location.name}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-600">{location.address}</span>
                <span className="mt-1 block text-xs text-slate-500">
                  {location.phone}
                  {location.note ? ` · ${location.note}` : ""}
                </span>
              </button>
            );
          })}
        </div>
        <FieldError message={errors.location} />
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
      <label id="field-scopeOfWork" className="block scroll-mt-28">
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

      <fieldset id="field-products" className="scroll-mt-28">
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

      <fieldset id="field-installationNeeded" className="scroll-mt-28">
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
  availability,
  loading,
  slotError,
  onVisibleMonth,
  onSelectDate,
  onSelectTime,
}: {
  form: FormState;
  errors: FieldErrors;
  visibleMonth: { year: number; month: number };
  availability?: Record<string, string[]>;
  loading: boolean;
  slotError: string;
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
  const latestMonth = pacificYearMonth(
    new Date(Date.now() + BOOKING_SCHEDULE_CONFIG.maxDaysInAdvance * 24 * 60 * 60 * 1000),
  );
  const [latestYear, latestMonthNumber] = latestMonth.split("-").map(Number);
  const maxMonthOffset = (latestYear - today.year) * 12 + (latestMonthNumber - 1 - today.month);
  const cells = calendarCells(visibleMonth.year, visibleMonth.month);

  return (
    <div id="field-schedule" className="scroll-mt-28">
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
                disabled={monthOffset >= maxMonthOffset}
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
              const disabled = loading || (availability?.[iso]?.length ?? 0) === 0;
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
          {slotError ? (
            <p className="mt-2 text-sm font-medium text-red-600" role="alert">
              {slotError}
            </p>
          ) : null}
          <p className="mt-2 text-sm font-semibold text-[#0B192C]">
            {form.date ? formatLongDate(form.date) : "Select a weekday to view times"}
          </p>
          <p className="mt-1 text-sm text-slate-500">Estimated duration: 1h</p>
          <div className="mt-3 max-h-[360px] space-y-2 overflow-y-auto pr-1">
            {loading ? <p className="text-sm text-slate-500">Checking live availability...</p> : null}
            {!loading && form.date && (availability?.[form.date]?.length ?? 0) === 0 ? (
              <p className="text-sm text-slate-500">No open times on this date. Please choose another highlighted day.</p>
            ) : null}
            {!loading
              ? (availability?.[form.date] ?? []).map((label) => {
                  const selected = form.timeSlot === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onSelectTime(label)}
                      className={`w-full rounded-[4px] border px-3 py-3 text-left text-sm transition-colors ${
                        selected
                          ? "border-[#0284C7] bg-sky-50 font-semibold text-[#0B192C]"
                          : "border-slate-200 bg-white text-[#0B192C] hover:border-[#38BDF8]"
                      } ${focusRing}`}
                    >
                      {label}
                    </button>
                  );
                })
              : null}
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
  const chosenLocation = appointmentLocationById(form.locationId);

  return (
    <div>
      <h2 className="text-lg font-bold text-[#0B192C]">Review</h2>
      <div className="mt-5 space-y-6">
        <ReviewSection title="Location" onEdit={() => onEdit(0)}>
          <ReviewRow
            label="Location"
            value={
              chosenLocation ? `${chosenLocation.name}\n${chosenLocation.address}` : "-"
            }
          />
        </ReviewSection>
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
  locationId,
}: {
  referenceId: string;
  dateLabel: string;
  timeSlot: string;
  locationId: AppointmentLocationId | "";
}) {
  const chosenLocation = appointmentLocationById(locationId);
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
        {chosenLocation ? (
          <p>
            <span className="font-semibold">Location:</span> {chosenLocation.name}
            <span className="mt-1 block text-slate-600">{chosenLocation.address}</span>
          </p>
        ) : null}
        <p className={chosenLocation ? "mt-2" : ""}>
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
  id,
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
  id?: string;
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
    <label id={id} className={id ? "block scroll-mt-28" : "block"}>
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

function scheduleRejectionMessage(code: string | undefined) {
  if (code === "HOLIDAY_CLOSED") {
    return "We are closed for the holiday on that date. Please choose another available business day.";
  }
  if (code === "TOO_SOON") {
    return "Appointments must be scheduled at least 24 hours in advance. Please select a later date or time.";
  }
  return "That time slot was just booked. Please select another available time.";
}

function validateStep(
  step: number,
  form: FormState,
  availabilityByMonth: Record<string, { availability: Record<string, string[]> }>,
): FieldErrors {
  if (step === 0) return validateContact(form);
  if (step === 1) return validateService(form);
  if (step === 2 || step === 3) return validateSchedule(form, availabilityByMonth);
  return {};
}

function validateContact(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.locationId) errors.location = "! Please select a location";
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

function validateSchedule(
  form: FormState,
  availabilityByMonth: Record<string, { availability: Record<string, string[]> }>,
): FieldErrors {
  const errors: FieldErrors = {};
  const open = availabilityByMonth[form.date.slice(0, 7)]?.availability[form.date] ?? [];
  if (!form.date || open.length === 0) {
    errors.date = "Choose a weekday.";
    return errors;
  }
  if (!open.includes(form.timeSlot)) errors.time = "Choose a time slot.";
  return errors;
}

function toPayload(form: FormState): JobberAppointmentPayload {
  const location = appointmentLocationById(form.locationId);
  if (!location) throw new Error("Select a Sound View location.");
  return {
    location: location.name,
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

function LocationFromQuery({ onPick }: { onPick: (id: AppointmentLocationId) => void }) {
  const params = useSearchParams();
  const value = params.get("location");
  useEffect(() => {
    const location = appointmentLocationFromQuery(value);
    if (location) onPick(location.id);
  }, [onPick, value]);
  return null;
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

function currentPacificMonth() {
  const today = pacificTodayParts();
  return { year: today.year, month: today.month };
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

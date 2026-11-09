"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/CountUp";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BOOKING_URL } from "@/config/links";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { services } from "@/lib/services";

type ShowroomPhone = {
  name: string;
  display: string;
  href: string;
  appointmentOnly?: boolean;
};

const showroomPhones: ShowroomPhone[] = [
  { name: "Lake City", display: "(206) 572-3411", href: "tel:2065723411" },
  { name: "West Queen Anne", display: "(206) 402-4229", href: "tel:2064024229" },
  {
    name: "Bellevue",
    display: "(425) 417-3005",
    href: "tel:4254173005",
    appointmentOnly: true,
  },
];

export default function Home() {
  const [projectType, setProjectType] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const phoneMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!phoneMenuRef.current?.contains(event.target as Node)) {
        setPhoneOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPhoneOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function focusQuote() {
    document.getElementById("quote-name")?.focus();
    document.getElementById("quote")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  function chooseService(id: string) {
    setProjectType(id);
    if (window.innerWidth < 1024) {
      document.getElementById("quote")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className="bg-[#0B192C] text-[#E2E8F0]">
    <div className="flex min-h-screen flex-col">
      <Header onServiceSelect={chooseService} />

      <main className="mx-auto grid w-full max-w-[1440px] flex-1 gap-4 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:px-5 lg:py-3 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="relative z-20 flex min-h-0 flex-col">
          <div className="relative z-30 mx-auto flex w-full shrink-0 flex-col items-center text-center">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:text-sm">
              Seattle, Bellevue & Greater Puget Sound
            </p>
            <h1 className="mb-1.5 text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
              Sound View Window & Door
            </h1>
            <p className="mb-4 max-w-2xl text-sm text-slate-300">
              Relaxed consultations, honest answers, and zero pressure to buy
            </p>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#38BDF8] px-4 py-2 text-sm font-medium text-[#0A192F] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                Book Appointment
              </a>
              <div
                ref={phoneMenuRef}
                className="relative"
                onMouseEnter={() => setPhoneOpen(true)}
                onMouseLeave={() => setPhoneOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={phoneOpen}
                  aria-controls="showroom-phones"
                  onClick={() => setPhoneOpen((open) => !open)}
                  className="flex items-center justify-center gap-2 rounded-full border border-white bg-white px-4 py-2 text-sm font-medium text-[#0B192C] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <PhoneIcon />
                  Give Us a Call
                  <Chevron open={phoneOpen} />
                </button>
                {phoneOpen ? (
                  <ul
                    id="showroom-phones"
                    className="absolute left-1/2 top-full z-50 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 pt-2"
                  >
                    <li className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md">
                      <ul>
                        {showroomPhones.map((location) => (
                          <li
                            key={location.href}
                            className="border-b border-slate-700 last:border-b-0"
                          >
                            <a
                              href={location.href}
                              className="flex items-center justify-between gap-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#38BDF8]"
                            >
                              <span className="flex min-w-0 items-center">
                                <span className="text-sm font-semibold text-white transition-colors hover:text-sky-400">
                                  {location.name}
                                </span>
                                {location.appointmentOnly ? (
                                  <span className="ml-2 inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-sky-800 bg-sky-950/80 px-2 py-0.5 text-[11px] text-sky-200">
                                    By Appointment Only
                                  </span>
                                ) : null}
                              </span>
                              <span className="shrink-0 text-sm font-bold tracking-wide text-sky-400">
                                {location.display}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <section
            aria-label="Services"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <Link
                key={service.id}
                href={
                  service.id === "window-replacement"
                    ? "/services/window-replacement/materials"
                    : service.id === "door-replacement"
                      ? "/services/door-replacement/types"
                      : service.id === "shower-door-replacement"
                        ? "/services/shower-door-replacement/types"
                        : service.id === "glass-replacement"
                          ? "/services/glass-replacement/types"
                          : service.id === "glass-railing-installation"
                            ? "/services/glass-railing-installation"
                            : service.id === "window-blinds-shades"
                              ? "/services/window-blinds-shades"
                              : `/services/${service.id}`
                }
                className="group relative h-48 cursor-pointer overflow-hidden rounded-xl border border-slate-700/50 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] sm:h-52 md:h-56"
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                  className="absolute inset-0 z-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B192C]/95 via-[#0B192C]/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-4 sm:p-5">
                  <h3 className="mb-1 text-base font-bold text-white drop-shadow-md sm:text-lg">
                    {service.title}
                  </h3>
                  <p className="mb-1.5 line-clamp-2 text-[11px] leading-snug text-slate-100 drop-shadow-sm sm:text-xs">
                    {service.summary}
                  </p>
                  <p className="mb-2 truncate text-[10px] font-medium text-[#BAE6FD] sm:text-[11px]">
                    {service.keywords}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white transition-colors group-hover:text-[#BAE6FD]">
                    Explore Options
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </section>
          <ScrollReveal>
            <section
              aria-label="Company credentials"
              className="mt-3 grid grid-cols-1 divide-y divide-slate-700/60 rounded-xl border border-slate-700/60 bg-[#132238] px-6 py-3 text-center shadow-lg sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:text-left"
            >
              <div className="py-3 sm:px-4 sm:py-0 sm:pl-0">
                <p className="text-sm font-bold tracking-wide text-white">3 Puget Sound Showrooms</p>
                <p className="mt-0.5 text-xs text-slate-300">
                  Lake City <span className="text-sky-400">•</span> Queen Anne{" "}
                  <span className="text-sky-400">•</span> Bellevue
                </p>
              </div>
              <div className="py-3 sm:px-4 sm:py-0">
                <p className="text-sm font-bold tracking-wide text-white">Authorized Factory Dealer</p>
                <p className="mt-0.5 text-xs text-slate-300">
                  Andersen <span className="text-sky-400">•</span> Milgard{" "}
                  <span className="text-sky-400">•</span> Ply Gem
                </p>
              </div>
              <div className="py-3 sm:px-4 sm:py-0 sm:pr-0">
                <p className="text-sm font-bold tracking-wide text-white">Local Craftsmanship</p>
                <p className="mt-0.5 text-xs text-slate-300">WA Licensed, Bonded & Insured</p>
              </div>
            </section>
          </ScrollReveal>
        </div>

        <aside
          id="quote"
          className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xl sm:p-5"
        >
          {quoteSubmitted ? null : (
            <div className="mb-3 rounded-xl border border-sky-100 bg-sky-50/70 p-3 sm:p-3.5">
              <p className="mb-0.5 block text-[11px] font-extrabold uppercase tracking-widest text-sky-700 sm:text-xs">
                Special Offer
              </p>
              <p className="text-xl font-extrabold leading-tight text-[#0B192C] sm:text-2xl">
                Save 10% on Labor
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-600">
                Book your project by November 30th.
              </p>
            </div>
          )}
          <div
            className={
              quoteSubmitted
                ? "flex min-h-0 flex-1 flex-col items-center justify-start overflow-y-auto text-center"
                : "min-h-0 flex-1"
            }
          >
            <QuoteRequestForm
              projectType={projectType}
              onProjectTypeChange={setProjectType}
              onSubmittedChange={setQuoteSubmitted}
            />
          </div>
        </aside>
      </main>
    </div>

      <SoundViewDifference />
      <HowItWorks />
      <HomeownerReviews />
      <FaqAndCta
        openIndex={openFaq}
        onToggle={(index) => setOpenFaq((current) => (current === index ? null : index))}
        onQuote={focusQuote}
      />
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 3.75h2.1c.4 0 .75.28.83.67l.7 3.15a.86.86 0 0 1-.24.8L9.2 9.9a12.4 12.4 0 0 0 4.9 4.9l1.53-1.69a.86.86 0 0 1 .8-.24l3.15.7c.39.08.67.43.67.83v2.1c0 .48-.39.87-.87.84A16.5 16.5 0 0 1 3.66 4.62c-.03-.48.36-.87.84-.87Z"
      />
    </svg>
  );
}

const differencePoints = [
  "17+ Years of Greater Seattle Experience",
  "Low-Pressure Showroom & In-Home Consultations",
  "Certified Installation & Full Manufacturer Warranties",
  "Certified, Licensed & Insured",
];

const steps = [
  {
    title: "Quote Or Showroom Visit",
    body: "Fill out our online quote form or book an appointment at one of our showrooms. Whether you have exact specs or need help exploring styles and materials, we will guide you toward the right products for your home and budget.",
  },
  {
    title: "Precision Measurement",
    body: "Our team visits your home to measure all critical dimensions down to the fraction of an inch. Getting exact measurements ensures your custom replacement windows and doors fit seamlessly with zero draft or alignment issues.",
  },
  {
    title: "Custom Order & Installation",
    body: "We order your custom units directly from top manufacturers like Milgard and Andersen, coordinate a start date that fits your schedule, and complete the installation with certified local craftsmanship and full cleanup.",
  },
];

const homeownerReviews = [
  {
    name: "David M. · Queen Anne, Seattle",
    quote:
      "Sound View replaced 12 original windows with zero pressure. Installers arrived right on schedule, and the draft reduction this winter has been incredible.",
  },
  {
    name: "Jennifer K. · Bellevue Homeowner",
    quote:
      "We needed a custom sliding patio door and a frameless glass shower door. The measurement was precise down to the millimeter, and the finished look is stunning.",
  },
  {
    name: "Marcus & Elena R. · Lake City, Seattle",
    quote:
      "Easily our best contractor experience in Seattle. Clear communication from the showroom visit to installation day, flawless finish trim, and complete cleanup.",
  },
];

const faqs = [
  {
    question: "How Does The Process Work?",
    answer:
      "It is three steps. We start with a consultation, either in a showroom or through the quote form. Then we measure every opening at your home. A certified crew installs the units on a day that fits your schedule. You get clear options at each step, and there is no pressure to decide on the spot.",
  },
  {
    question: "What Is The Project Timeline?",
    answer:
      "Custom windows and doors are built to your measurements, so manufacturing usually takes a few weeks after the order is placed. We tell you the expected lead time before you commit. Installation for a typical home is often finished in one to a few days, depending on how many openings we are replacing.",
  },
  {
    question: "How Much Do Replacements Cost?",
    answer:
      "Price depends on how many openings you are replacing, the frame material, the glass package, and the size of each unit. After we understand the project, we prepare an upfront estimate so you can see the full scope before you decide.",
  },
  {
    question: "What Happens If A Product Has An Issue Or Damage While Under Warranty?",
    answer:
      "We work directly with manufacturers such as Milgard and Andersen. If a product has a covered defect, we help you through the manufacturer warranty. Our installation work is covered as well, and we stay with you until the issue is resolved.",
  },
];

function SoundViewDifference() {
  return (
    <section className="border-t border-[#1E3A5F] bg-[#0B192C]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-16 sm:px-5 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#94A3B8]">
            The Sound View Difference
          </p>
          <h2 className="mt-4 text-4xl tracking-tight text-white sm:text-5xl">
            A Seamless Experience From Start To Finish
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#94A3B8]">
            Replacing your windows and doors should not feel stressful. We guide
            you through selecting the right high-efficiency products, verify
            exact measurements, and complete your installation with precision
            and care: zero high-pressure sales tactics, just honest advice and
            quality craftsmanship.
          </p>
          <ul className="mt-8 space-y-3">
            {differencePoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-white">
                <CheckIcon />
                <span className="leading-6">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#11223A] shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <Image
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80"
            alt="Bright living room with large windows and a door opening onto trees"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

const numberClass =
  "text-4xl font-extrabold tracking-tight text-white sm:text-5xl";
const statLabelClass =
  "mt-1 text-xs font-medium uppercase tracking-wider text-slate-300 sm:text-sm";

function HowItWorks() {
  return (
    <section className="border-t border-[#1E3A5F] bg-[#0B192C]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-5 lg:py-24">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#94A3B8]">
            How It Works
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl tracking-tight text-white sm:text-5xl">
            Our Straightforward Process
          </h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 150} className="h-full">
              <article className="h-full rounded-2xl bg-[#132238] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#38BDF8] text-lg text-[#0A192F]">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-2xl tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{step.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <dl className="mx-auto my-6 grid max-w-5xl grid-cols-1 divide-y divide-slate-700/80 border-y border-slate-700/80 py-8 text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-4 py-6 sm:py-2">
            <dt>
              <CountUp end={850} suffix="+" duration={1300} className={numberClass} />
            </dt>
            <dd className={statLabelClass}>Completed Installations</dd>
          </div>
          <div className="px-4 py-6 sm:py-2">
            <dt>
              <CountUp
                end={4.9}
                decimals={1}
                suffix="/5"
                duration={1300}
                className={numberClass}
              />
            </dt>
            <dd className={statLabelClass}>Average Customer Rating</dd>
          </div>
          <div className="px-4 py-6 sm:py-2">
            <dt>
              <CountUp end={17} suffix="+" duration={1300} className={numberClass} />
            </dt>
            <dd className={statLabelClass}>Years Serving Greater Seattle</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function HomeownerReviews() {
  return (
    <section className="bg-[#11223A] py-8 sm:py-10" aria-label="Homeowner testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Trusted by Homeowners Across Greater Seattle
            </h2>
            <p className="flex items-center gap-1 text-xs font-medium text-[#BAE6FD]">
              4.9 ★★★★★ (Verified Local Installations)
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {homeownerReviews.map((review, index) => (
            <ScrollReveal key={review.name} delay={index * 100} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.09] sm:p-5">
                <div>
                  <div className="mb-2 flex gap-0.5 text-xs text-[#BAE6FD]" aria-label="5 stars">
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                  </div>
                  <blockquote className="mb-3 line-clamp-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    {review.quote}
                  </blockquote>
                </div>
                <figcaption className="text-[11px] font-semibold text-[#BAE6FD]">{review.name}</figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqAndCta({
  openIndex,
  onToggle,
  onQuote,
}: {
  openIndex: number | null;
  onToggle: (index: number) => void;
  onQuote: () => void;
}) {
  return (
    <section className="bg-[#0B192C]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
        <ScrollReveal>
          <h2 className="text-4xl tracking-tight text-white sm:text-5xl">
            You Ask, We Answer
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-[#94A3B8]">
            Have questions about updating your home? Here are clear, upfront
            answers about our products, precision measurement process, and
            certified installation.
          </p>
        </ScrollReveal>
        <div className="divide-y divide-[#1E3A5F] border-y border-[#1E3A5F]">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => onToggle(index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  {item.question}
                  <PlusMinus open={open} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden" aria-hidden={!open}>
                    <p className="pb-5 pr-8 text-sm leading-6 text-[#94A3B8]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-[#1E3A5F] bg-[#11223A]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-5 lg:py-20">
          <ScrollReveal>
            <h2 className="text-4xl tracking-tight text-white sm:text-5xl">
              Ready To Upgrade Your Home? Get A Quote Now!
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#94A3B8]">
              Connect with our Seattle specialists to discuss your project,
              explore top-tier products from brands like Milgard and Andersen, or
              schedule a personalized consultation at one of our local showrooms.
            </p>
          </ScrollReveal>
          <button
            type="button"
            onClick={onQuote}
            className="mt-8 rounded-full bg-[#38BDF8] px-6 py-3 text-base font-medium text-[#0A192F] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            Get A Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m6.5 10.2 2.3 2.3 4.7-5" />
    </svg>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" d="M4 10h12" />
      <path
        strokeLinecap="round"
        d="M10 4v12"
        className={`origin-center transition-transform duration-300 ${open ? "scale-y-0" : ""}`}
      />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 7.5 5 5 5-5" />
    </svg>
  );
}


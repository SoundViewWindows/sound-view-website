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

const serviceCardCopy: Record<string, string> = {
  "window-replacement":
    "Energy-efficient replacement windows professionally installed to boost comfort and curb appeal.",
  "door-replacement":
    "Custom entry, sliding patio, and French doors installed for smooth operation and a draft-free fit.",
  "shower-door-replacement":
    "Frameless and framed glass shower enclosures custom-measured and installed for your bathroom.",
  "glass-replacement":
    "Fast glass pane replacement for cracked, broken, or foggy windows without replacing the frame.",
  "glass-railing-installation":
    "Framed and frameless architectural glass railings for decks, stairs, and balconies.",
  "window-blinds-shades":
    "Custom motorized, blackout, and light-filtering shades tailored for privacy and light control.",
};

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
    <div className="bg-home-canvas text-[#E7EEF3]">
    <div className="flex min-h-screen flex-col">
      <Header onServiceSelect={chooseService} />

      <main className="mx-auto grid w-full max-w-[1440px] flex-1 gap-4 px-4 pb-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_calc(18rem+70px)] lg:items-start lg:pb-3 lg:pl-5 lg:pr-0">
        <div className="relative z-20 flex min-h-0 flex-col">
          <div className="relative z-30 mb-4 flex w-full flex-col items-center justify-center gap-5 pb-4 pt-5 md:flex-row xl:pb-5 xl:pt-6">
            <Image
              src="/images/sv-crest-white.png"
              alt="Sound View crest"
              width={168}
              height={168}
              style={{ width: "168px", height: "168px", maxWidth: "168px", minWidth: "168px" }}
              className="h-[120px] w-[120px] shrink-0 object-contain mix-blend-screen sm:h-[168px] sm:w-[168px]"
            />
            <div className="flex min-w-0 flex-col items-center text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-400 sm:text-sm">
                Seattle, Bellevue & Greater Puget Sound
              </p>
              <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white sm:text-5xl lg:whitespace-nowrap lg:text-6xl">
                Sound View Window & Door
              </h1>
              <p className="mb-3 mt-3 max-w-3xl text-lg text-slate-200 sm:text-xl">
                Relaxed consultations, honest answers, and zero pressure to buy
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-none bg-home-accent px-4 py-2 text-sm font-medium text-[#062033] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
              >
                Book Appointment
              </a>
              <div
                ref={phoneMenuRef}
                className="static sm:relative"
                onMouseEnter={() => setPhoneOpen(true)}
                onMouseLeave={() => setPhoneOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={phoneOpen}
                  aria-controls="showroom-phones"
                  onClick={() => setPhoneOpen((open) => !open)}
                  className="flex items-center justify-center gap-2 rounded-none border border-white bg-white px-4 py-2 text-sm font-medium text-[#0B192C] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <PhoneIcon />
                  Give Us a Call
                  <Chevron open={phoneOpen} />
                </button>
                {phoneOpen ? (
                  <ul
                    id="showroom-phones"
                    className="absolute right-0 top-full z-50 w-[calc(100vw-2rem)] max-w-sm pt-2 shadow-2xl sm:right-auto sm:left-1/2 sm:w-[min(24rem,calc(100vw-2rem))] sm:max-w-none sm:-translate-x-1/2"
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
                              className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#38BDF8] sm:gap-4 sm:px-0 sm:py-3"
                            >
                              <span className="flex min-w-0 items-center">
                                <span className="shrink min-w-0 truncate text-xs font-bold text-white transition-colors hover:text-sky-400 sm:text-sm sm:font-semibold">
                                  {location.name}
                                </span>
                                {location.appointmentOnly ? (
                                  <span className="ml-2 inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-sky-800 bg-sky-950/80 px-2 py-0.5 text-[10px] text-sky-200 sm:text-[11px]">
                                    By Appointment Only
                                  </span>
                                ) : null}
                              </span>
                              <span className="shrink-0 whitespace-nowrap text-xs font-extrabold text-sky-400 hover:text-sky-300 sm:text-sm sm:font-bold sm:tracking-wide">
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
          </div>

          <section
            aria-label="Services"
            className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3"
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
                className="flex h-full cursor-pointer flex-col rounded-xl border border-white/15 bg-[#2B3E50]/85 p-2.5 transition-all hover:border-white/30 hover:bg-[#31465A]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
              >
                <div
                  className="mb-2 h-[132px] w-full shrink-0 overflow-hidden rounded-md bg-slate-800"
                  style={{ height: "132px" }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="block h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mb-1 text-sm font-bold leading-tight text-white xl:text-[15px]">
                  {service.title}
                </h3>
                <p className="text-[11px] leading-snug text-slate-300 xl:text-xs">
                  {serviceCardCopy[service.id] ?? service.summary}
                </p>
              </Link>
            ))}
          </section>
          <ScrollReveal>
            <section
              aria-label="Company credentials"
              className="mt-3 grid grid-cols-1 divide-y divide-home-line rounded-xl border border-[#8AA0B2]/30 bg-home-panel/80 px-6 py-3 text-center shadow-lg sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:text-left"
            >
              <div className="py-3 sm:px-4 sm:py-0 sm:pl-0">
                <p className="text-sm font-bold tracking-wide text-white">3 Puget Sound Showrooms</p>
                <p className="mt-0.5 text-xs text-slate-300">
                  Lake City <span className="text-home-accent">•</span> Queen Anne{" "}
                  <span className="text-home-accent">•</span> Bellevue
                </p>
              </div>
              <div className="py-3 sm:px-4 sm:py-0">
                <p className="text-sm font-bold tracking-wide text-white">Authorized Factory Dealer</p>
                <p className="mt-0.5 text-xs text-slate-300">
                  Andersen <span className="text-home-accent">•</span> Milgard{" "}
                  <span className="text-home-accent">•</span> Ply Gem
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
          className="home-quote-panel relative z-10 flex flex-col p-6 text-white sm:p-7 lg:!w-[calc(18rem+70px)] lg:!max-w-[calc(18rem+70px)]"
        >
          {quoteSubmitted ? null : (
            <div className="mb-6 text-center">
              <p className="mb-1 text-[11px] font-black uppercase tracking-wider text-home-accent">
                Special Offer
              </p>
              <p className="mb-1 text-2xl font-black leading-snug tracking-tight text-white">
                Save 10% on Labor
              </p>
              <p className="text-xs font-medium text-home-mist">
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
      <FaqAndCta
        openIndex={openFaq}
        onToggle={(index) => setOpenFaq((current) => (current === index ? null : index))}
        onQuote={focusQuote}
      />
      <HomeownerReviews />
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
    name: "David M.",
    place: "Queen Anne, Seattle",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote:
      "Sound View replaced 12 original windows in our home with zero high-pressure sales tactics. The team walked us through our options, the installers arrived right on schedule, and the draft reduction this winter has been incredible.",
  },
  {
    name: "Jennifer K.",
    place: "Bellevue Homeowner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    quote:
      "We needed a custom sliding patio door and a frameless glass shower door. The measurement team was precise down to the millimeter, and the finished installation looks like something out of an architectural magazine.",
  },
  {
    name: "Marcus & Elena R.",
    place: "Lake City, Seattle",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80",
    quote:
      "Easily the best contractor experience we've had in the Seattle area. Clear communication from the showroom visit to installation day, flawless finish trim work, and complete cleanup when they were done.",
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
      "Because every window and door is custom built to the exact architectural specifications of your home, timelines vary from project to project. Lead times and installation scheduling depend on material availability, manufacturer production queues, and total project scope. Your project specialist will communicate clear, personalized timeline expectations directly with you during your initial consultation and provide ongoing updates as your order progresses.",
  },
  {
    question: "How Much Do Replacements Cost?",
    answer:
      "Costs depend on window size, framing material, glass efficiency packages, and structural opening requirements. We provide transparent, itemized quotes with no hidden fees or surprise upcharges.",
  },
  {
    question: "What Happens If A Product Has An Issue Or Damage While Under Warranty?",
    answer:
      "All products are backed by their respective manufacturer warranties, which cover material defects and component performance according to each brand's specific terms. Should a warranty issue arise, our team can help provide the necessary product documentation and connect you with the manufacturer's warranty claim process.",
  },
];

function SoundViewDifference() {
  return (
    <section className="w-full border-y border-slate-100 bg-white py-16 text-slate-900 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 sm:px-5 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 block text-xs font-bold uppercase tracking-widest text-sky-600 sm:text-sm">
            The Sound View Difference
          </p>
          <h2 className="mb-6 text-3xl font-black leading-tight tracking-tight text-[#0B192C] sm:text-4xl lg:text-5xl">
            A Seamless Experience From Start To Finish
          </h2>
          <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Replacing your windows and doors should not feel stressful. We guide
            you through selecting the right high-efficiency products, verify
            exact measurements, and complete your installation with precision
            and care: zero high-pressure sales tactics, just honest advice and
            quality craftsmanship.
          </p>
          <div className="my-6 w-full max-w-md border-t border-slate-200/80" />
          <ul className="space-y-3">
            {differencePoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-sm font-semibold text-slate-800 sm:text-base"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-slate-900" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-100 shadow-xl lg:aspect-[5/4]">
          <Image
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80"
            alt="Bright living room with large windows and a door opening onto trees"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

const accentStatClass =
  "mb-2 block text-4xl font-black tracking-tight text-[#0090c8] sm:text-5xl lg:text-6xl";
const navyStatClass =
  "mb-2 block text-4xl font-black tracking-tight text-[#0c1f38] sm:text-5xl lg:text-6xl";
const statLabelClass = "text-sm font-medium text-[#1e293b] sm:text-base";

function HowItWorks() {
  return (
    <section className="bg-[#f4fafd]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <p className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#608b9e] sm:text-sm">
            How It Works
          </p>
          <h2 className="mb-12 text-left text-3xl font-black tracking-tight text-[#0c1f38] sm:text-4xl lg:text-5xl">
            Our Straightforward Process
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 150} className="h-full">
              <article>
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border-b-4 border-[#0090c8] bg-white text-xl font-bold text-[#0c1f38] shadow-md sm:h-16 sm:w-16 sm:text-2xl">
                  {index + 1}
                </span>
                <h3 className="mb-3 text-xl font-bold leading-snug text-[#0c1f38] sm:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-[#556980] sm:text-base">
                  {step.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="mt-12 w-full border-t border-slate-100 bg-white px-4 py-12 sm:px-6">
        <dl className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-slate-200 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-4 py-6 md:py-2">
            <dt>
              <CountUp
                end={10000}
                suffix="+"
                grouped
                duration={1300}
                className={`${accentStatClass} whitespace-nowrap`}
              />
            </dt>
            <dd className={statLabelClass}>Completed Installations</dd>
          </div>
          <div className="px-4 py-6 md:py-2">
            <dt>
              <CountUp
                end={4.9}
                decimals={1}
                suffix="/5"
                duration={1300}
                className={accentStatClass}
              />
            </dt>
            <dd className={statLabelClass}>Average Customer Rating</dd>
          </div>
          <div className="px-4 py-6 md:py-2">
            <dt>
              <CountUp end={17} suffix="+" duration={1300} className={navyStatClass} />
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
    <section
      className="bg-[#0072CE] px-4 py-4 text-center sm:px-6 md:py-5 lg:px-8"
      style={{ paddingTop: "18px", paddingBottom: "18px" }}
      aria-label="Homeowner testimonials"
    >
      <ScrollReveal>
        <p className="mb-0.5 block text-[11px] font-bold uppercase tracking-widest text-white/80">
          Our Happy Customers
        </p>
        <h2 className="mx-auto mb-3 text-lg font-extrabold tracking-tight text-white sm:text-xl lg:whitespace-nowrap lg:text-2xl">
          Trusted By Homeowners Across Greater Seattle
        </h2>
      </ScrollReveal>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-3 text-left md:grid-cols-3 lg:gap-4">
        {homeownerReviews.map((review, index) => (
          <ScrollReveal key={review.name} delay={index * 100} className="h-full">
            <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-white px-3.5 py-2.5 shadow-xl">
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold leading-tight text-slate-900">
                        {review.name}
                      </span>
                      <span className="block text-[11px] font-medium leading-tight text-slate-500">
                        {review.place}
                      </span>
                    </span>
                  </span>
                  <div
                    className="flex shrink-0 origin-right scale-90 items-center gap-0.5 text-xs text-[#0F172A]"
                    aria-label="5 stars"
                  >
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                  </div>
                </div>
                <blockquote className="mb-0 text-[11px] italic leading-snug text-slate-600 sm:text-xs">
                  “{review.quote}”
                </blockquote>
              </div>
            </figure>
          </ScrollReveal>
        ))}
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
    <>
    <section className="w-full border-t border-home-line bg-home-panel px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <ScrollReveal className="lg:col-span-5">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            You Ask, We Answer
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            Have questions about updating your home? Here are clear, upfront
            answers about our products, precision measurement process, and
            certified installation.
          </p>
        </ScrollReveal>
        <div className="divide-y divide-white/15 border-b border-t border-white/15 lg:col-span-7">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => onToggle(index)}
                  className="group flex w-full cursor-pointer items-center justify-between py-5 text-left text-base font-bold text-white transition-colors hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] sm:py-6 sm:text-lg"
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
                    <p className="pb-6 pr-6 text-sm leading-relaxed text-slate-300 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-5 lg:py-20">
          <ScrollReveal>
            <h2 className="text-4xl tracking-tight text-[#0B192C] sm:text-5xl">
              Ready To Upgrade Your Home? Get A Quote Now!
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Connect with our Seattle specialists to discuss your project,
              explore top-tier products from brands like Milgard and Andersen, or
              schedule a personalized consultation at one of our local showrooms.
            </p>
          </ScrollReveal>
          <button
            type="button"
            onClick={onQuote}
            className="mt-8 rounded-full bg-home-accent px-6 py-3 text-base font-medium text-[#062033] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
          >
            Get A Free Quote
          </button>
        </div>
    </section>
    </>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:text-sky-400"
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


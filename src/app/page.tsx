"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
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

  function bookAppointment() {
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
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
    <div className="flex min-h-screen flex-col lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <Header onServiceSelect={chooseService} />

      <main className="mx-auto grid w-full max-w-[1440px] flex-1 gap-4 px-4 py-4 sm:px-5 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_21rem] lg:px-5 lg:pb-3 lg:pt-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="relative z-20 flex min-h-0 flex-col gap-6 lg:h-full">
          <div className="relative z-30 mx-auto flex w-full shrink-0 flex-col items-center text-center">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-[#1B2A4A] lg:text-5xl">
              Sound View Window & Door
            </h1>
            <p className="mt-2 max-w-2xl text-lg leading-snug text-[#1B2A4A]/80 lg:text-xl">
              Relaxed consultations, honest answers, and zero pressure to buy
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={bookAppointment}
                className="rounded-full bg-[#1B2A4A] px-6 py-3 text-base font-medium text-[#FAF8F5] transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                Book an Appointment
              </button>
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
                  className="flex items-center justify-center gap-2 rounded-full border border-[#1B2A4A]/20 bg-[#FAF8F5] px-6 py-3 text-base font-medium text-[#1B2A4A] transition-colors hover:bg-[#F4EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  <PhoneIcon />
                  Give Us a Call
                  <Chevron open={phoneOpen} />
                </button>
                {phoneOpen ? (
                  <ul
                    id="showroom-phones"
                    className="absolute left-1/2 top-full z-50 w-96 min-w-[360px] -translate-x-1/2 pt-2"
                  >
                    <li className="overflow-hidden rounded-xl border border-[#1B2A4A]/10 bg-[#FAF8F5] shadow-lg">
                      <ul>
                        {showroomPhones.map((location) => (
                          <li
                            key={location.href}
                            className="border-b border-[#1B2A4A]/10 last:border-b-0"
                          >
                            <a
                              href={location.href}
                              className="flex items-center justify-between gap-4 p-3 text-sm text-[#1B2A4A] hover:bg-[#F4EFEA] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1B2A4A]"
                            >
                              <span className="flex min-w-0 items-center">
                                <span className="font-medium text-slate-900">{location.name}</span>
                                {location.appointmentOnly ? (
                                  <span className="ml-2 inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#1B2A4A]/20 bg-[#1B2A4A]/10 px-2 py-0.5 text-[11px] font-semibold text-[#1B2A4A]">
                                    By Appointment Only
                                  </span>
                                ) : null}
                              </span>
                              <span className="shrink-0 font-bold">{location.display}</span>
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
            className="grid content-start gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <Link
                key={service.id}
                href={
                  service.id === "window-replacement"
                    ? "/services/window-replacement/types"
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
                className="group flex min-h-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-[#1B2A4A]/10 bg-white text-left shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                <span className="relative m-2.5 mb-0 block aspect-[16/10] overflow-hidden rounded-lg bg-[#F4EFEA] lg:aspect-auto lg:h-[120px]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="flex shrink-0 flex-col p-2.5">
                  <span className="font-serif text-sm font-medium leading-tight tracking-tight text-[#0F172A] transition-colors duration-200 group-hover:text-[#1B2A4A]">
                    {service.title}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs leading-tight text-[#1B2A4A]/80">
                    {service.summary}
                  </span>
                </span>
              </Link>
            ))}
          </section>
        </div>

        <aside
          id="quote"
          className={
            quoteSubmitted
              ? "flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-center shadow-xl"
              : "flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#1B2A4A]/10 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
          }
        >
          {quoteSubmitted ? null : (
            <div className="bg-[#1B2A4A] px-4 py-3 text-[#FAF8F5]">
              <p className="text-sm font-medium">Special Offer: Save 10% on Labor</p>
              <p className="mt-0.5 text-xs text-[#FAF8F5]/75">
                Book your project by November 30th.
              </p>
            </div>
          )}
          <div
            className={
              quoteSubmitted
                ? "flex min-h-0 flex-1 flex-col items-center justify-start overflow-y-auto bg-white p-6 sm:p-8"
                : "min-h-0 flex-1 overflow-y-auto px-4 py-3"
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
      <Testimonials />
      <FaqAndCta
        openIndex={openFaq}
        onToggle={(index) => setOpenFaq((current) => (current === index ? null : index))}
        onQuote={bookAppointment}
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

const stats = [
  { value: "850+", label: "Completed Installations" },
  { value: "4.9/5", label: "Average Customer Rating" },
  { value: "17+", label: "Years Serving Greater Seattle" },
];

const testimonials: {
  name: string;
  place: string;
  quote: string;
  image?: string;
  initials?: string;
}[] = [
  {
    name: "David M.",
    place: "Queen Anne, Seattle",
    quote:
      "Sound View replaced 12 original windows in our home with zero high-pressure sales tactics. The team walked us through our options, the installers arrived right on schedule, and the draft reduction this winter has been incredible.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Jennifer K.",
    place: "Bellevue Homeowner",
    quote:
      "We needed a custom sliding patio door and a frameless glass shower door. The measurement team was precise down to the millimeter, and the finished installation looks like something out of an architectural magazine.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Marcus & Elena R.",
    place: "Lake City, Seattle",
    quote:
      "Easily the best contractor experience we have had in the Seattle area. Clear communication from the showroom visit to installation day, flawless finish trim work, and complete cleanup when they were done.",
    initials: "ME",
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
    <section className="border-t border-[#1B2A4A]/10 bg-[#FAF8F5]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-16 sm:px-5 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1B2A4A]/70">
            The Sound View Difference
          </p>
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-[#1B2A4A] sm:text-5xl">
            A Seamless Experience From Start To Finish
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#1B2A4A]/85">
            Replacing your windows and doors should not feel stressful. We guide
            you through selecting the right high-efficiency products, verify
            exact measurements, and complete your installation with precision
            and care: zero high-pressure sales tactics, just honest advice and
            quality craftsmanship.
          </p>
          <ul className="mt-8 space-y-3">
            {differencePoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[#1B2A4A]">
                <CheckIcon />
                <span className="leading-6">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#F4EFEA] shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
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

function HowItWorks() {
  return (
    <section className="border-t border-[#1B2A4A]/10 bg-[#F4EFEA]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-5 lg:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1B2A4A]/70">
          How It Works
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl tracking-tight text-[#1B2A4A] sm:text-5xl">
          Our Straightforward Process
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1B2A4A] font-serif text-lg text-[#FAF8F5]">
                {index + 1}
              </span>
              <h3 className="mt-5 font-serif text-2xl tracking-tight text-[#1B2A4A]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#1B2A4A]/80">{step.body}</p>
            </article>
          ))}
        </div>
        <dl className="mt-8 grid overflow-hidden rounded-2xl border border-[#1B2A4A]/10 bg-white sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-[#1B2A4A]/10 px-6 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <dt className="font-serif text-4xl tracking-tight text-[#1B2A4A]">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-[#1B2A4A]/75">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#1B2A4A] text-[#FAF8F5]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-5 lg:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#FAF8F5]/70">
          Our Happy Customers
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">
          Trusted By Homeowners Across Greater Seattle
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl bg-white p-6 text-[#1B2A4A] shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-6 text-[#1B2A4A]/85">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#F4EFEA] text-sm font-medium text-[#1B2A4A]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    item.initials
                  )}
                </span>
                <span>
                  <span className="block font-medium">{item.name}</span>
                  <span className="block text-sm text-[#1B2A4A]/70">{item.place}</span>
                </span>
              </figcaption>
            </figure>
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
    <section className="bg-[#FAF8F5]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
        <div>
          <h2 className="font-serif text-4xl tracking-tight text-[#1B2A4A] sm:text-5xl">
            You Ask, We Answer
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-[#1B2A4A]/85">
            Have questions about updating your home? Here are clear, upfront
            answers about our products, precision measurement process, and
            certified installation.
          </p>
        </div>
        <div className="divide-y divide-[#1B2A4A]/10 border-y border-[#1B2A4A]/10">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => onToggle(index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-[#1B2A4A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
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
                    <p className="pb-5 pr-8 text-sm leading-6 text-[#1B2A4A]/80">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-[#1B2A4A]/10 bg-[#F4EFEA]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-5 lg:py-20">
          <h2 className="font-serif text-4xl tracking-tight text-[#1B2A4A] sm:text-5xl">
            Ready To Upgrade Your Home? Get A Quote Now!
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#1B2A4A]/85">
            Connect with our Seattle specialists to discuss your project,
            explore top-tier products from brands like Milgard and Andersen, or
            schedule a personalized consultation at one of our local showrooms.
          </p>
          <button
            type="button"
            onClick={onQuote}
            className="mt-8 rounded-full bg-[#1B2A4A] px-6 py-3 text-base font-medium text-[#FAF8F5] transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
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
      className="mt-0.5 h-5 w-5 shrink-0 text-[#1B2A4A]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m6.5 10.2 2.3 2.3 4.7-5" />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-[#C4A35A]" aria-label="5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="m10 1.8 2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 12.6 5.8 14.8l.8-4.7L3.2 6.8l4.7-.7L10 1.8Z" />
        </svg>
      ))}
    </div>
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


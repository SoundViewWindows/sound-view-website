"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { services } from "@/lib/services";

const showroomPhones = [
  { name: "Lake City", display: "(206) 572-3411", href: "tel:2065723411" },
  { name: "West Queen Anne", display: "(206) 402-4229", href: "tel:2064024229" },
  { name: "Bellevue", display: "(425) 417-3005", href: "tel:4254173005" },
];

export default function Home() {
  const [projectType, setProjectType] = useState("");
  const [phoneOpen, setPhoneOpen] = useState(false);
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
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#1B2A4A] lg:h-dvh lg:overflow-hidden">
      <Header
        onServiceSelect={chooseService}
        onRequestConsultation={bookAppointment}
      />

      <main className="mx-auto grid w-full max-w-[1440px] flex-1 gap-4 px-4 py-4 sm:px-5 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_21rem] lg:py-3 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="relative z-20 flex min-h-0 flex-col gap-3 lg:h-full">
          <div className="relative z-30 shrink-0">
            <h1 className="font-serif text-3xl tracking-tight text-[#1B2A4A] sm:text-4xl">
              Sound View Window & Door
            </h1>
            <p className="mt-1 max-w-xl text-sm leading-6 text-[#1B2A4A]/80 sm:text-base">
              Relaxed consultations, honest answers, and zero pressure to buy
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={bookAppointment}
                className="rounded-full bg-[#1B2A4A] px-4 py-2.5 text-sm font-medium text-[#FAF8F5] transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
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
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1B2A4A]/20 bg-[#FAF8F5] px-4 py-2.5 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-[#F4EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A] sm:w-auto"
                >
                  <PhoneIcon />
                  Give Us a Call
                  <Chevron open={phoneOpen} />
                </button>
                {phoneOpen ? (
                  <ul
                    id="showroom-phones"
                    className="absolute left-0 top-full z-50 w-64 pt-2"
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
                              className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-[#1B2A4A] hover:bg-[#F4EFEA] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1B2A4A]"
                            >
                              <span>{location.name}</span>
                              <span className="font-medium">{location.display}</span>
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
            className="grid gap-2.5 sm:grid-cols-2 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:grid-rows-2"
          >
            {services.map((service) => {
              const selected = projectType === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => chooseService(service.id)}
                  aria-pressed={selected}
                  className={`flex min-h-0 flex-col overflow-hidden rounded-xl border bg-white text-left shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A] ${
                    selected
                      ? "border-[#1B2A4A] ring-2 ring-[#1B2A4A]"
                      : "border-[#1B2A4A]/10 hover:border-[#1B2A4A]/30"
                  }`}
                >
                  <span className="relative m-1.5 block h-24 overflow-hidden rounded-lg bg-[#F4EFEA] sm:h-20 lg:m-1 lg:h-auto lg:min-h-10 lg:flex-1">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="flex shrink-0 flex-col px-2.5 pb-2 lg:px-2 lg:pb-1.5">
                    <span className="font-serif text-sm leading-tight tracking-tight text-[#0F172A]">
                      {service.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-xs leading-4 text-[#1B2A4A]/80">
                      {service.summary}
                    </span>
                  </span>
                </button>
              );
            })}
          </section>
        </div>

        <aside
          id="quote"
          className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#1B2A4A]/10 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
        >
          <div className="bg-[#1B2A4A] px-4 py-3 text-[#FAF8F5]">
            <p className="text-sm font-medium">Special Offer: Save 10% on Labor</p>
            <p className="mt-0.5 text-xs text-[#FAF8F5]/75">
              Book your project by November 30th.
            </p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            <QuoteRequestForm
              projectType={projectType}
              onProjectTypeChange={setProjectType}
            />
          </div>
        </aside>
      </main>
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


"use client";

import Image from "next/image";
import { useState } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { consultationPhone, services } from "@/lib/services";

export default function Home() {
  const [projectType, setProjectType] = useState("");

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
      <header className="shrink-0 border-b border-[#1B2A4A]/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:gap-5 lg:py-2.5">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={1024}
              height={1024}
              preload
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div className="min-w-0">
              <p className="font-serif text-lg leading-tight tracking-tight text-[#0F172A] sm:text-xl">
                Sound View Window & Door
              </p>
              <p className="mt-0.5 text-xs leading-5 text-[#1B2A4A]/75 lg:hidden">
                Relaxed consultations, honest answers, and zero pressure to buy.
              </p>
            </div>
          </div>
          <p className="hidden flex-1 text-center text-[13px] leading-5 text-[#1B2A4A]/80 lg:block">
            Relaxed consultations, honest answers, and zero pressure to buy.
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={bookAppointment}
              className="flex-1 rounded-full bg-[#1B2A4A] px-4 py-2.5 text-sm font-medium text-[#FAF8F5] transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A] sm:flex-none"
            >
              Book Appointment
            </button>
            <a
              href={consultationPhone.href}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#1B2A4A]/20 px-4 py-2.5 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-[#F4EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A] sm:flex-none"
            >
              <PhoneIcon />
              Give Us a Call
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1440px] flex-1 gap-4 px-4 py-4 sm:px-5 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_21rem] lg:py-3 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <section
          aria-label="Services"
          className="grid gap-3 sm:grid-cols-2 lg:h-full lg:min-h-0 lg:grid-cols-3 lg:grid-rows-2"
        >
          {services.map((service) => {
            const selected = projectType === service.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => chooseService(service.id)}
                aria-pressed={selected}
                className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-white text-left shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A] ${
                  selected
                    ? "border-[#1B2A4A] ring-2 ring-[#1B2A4A]"
                    : "border-[#1B2A4A]/10 hover:border-[#1B2A4A]/30"
                }`}
              >
                <span className="relative m-2 block h-36 overflow-hidden rounded-xl bg-[#F4EFEA] sm:h-32 lg:m-1.5 lg:h-auto lg:min-h-14 lg:flex-1">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </span>
                <span className="flex shrink-0 flex-col px-3 pb-3 lg:px-2.5 lg:pb-2.5">
                  <span className="font-serif text-base leading-tight tracking-tight text-[#0F172A] lg:text-[15px]">
                    {service.title}
                  </span>
                  <span className="mt-1 line-clamp-3 text-[13px] leading-5 text-[#1B2A4A]/80">
                    {service.summary}
                  </span>
                </span>
              </button>
            );
          })}
        </section>

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

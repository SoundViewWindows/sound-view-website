"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING_URL } from "@/config/links";

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

export function HeroActionButtons({ appearance = "home" }: { appearance?: "home" | "quote" }) {
  const [phoneOpen, setPhoneOpen] = useState(false);
  const phoneMenuRef = useRef<HTMLDivElement>(null);
  const quote = appearance === "quote";

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

  const book = (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        quote
          ? "inline-flex items-center justify-center rounded-[4px] bg-[#38BDF8] px-4 py-2 text-sm font-semibold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          : "max-md:hidden rounded-none bg-home-accent px-4 py-2 text-sm font-medium text-[#062033] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
      }
    >
      Book Appointment
    </a>
  );

  const call = (
    <div
      ref={phoneMenuRef}
      className={quote ? "relative" : "static sm:relative"}
      onMouseEnter={() => setPhoneOpen(true)}
      onMouseLeave={() => setPhoneOpen(false)}
    >
      <button
        type="button"
        aria-expanded={phoneOpen}
        aria-controls="showroom-phones"
        onClick={() => setPhoneOpen((open) => !open)}
        className={
          quote
            ? "flex items-center justify-center gap-2 rounded-[4px] bg-white px-4 py-2 text-sm font-semibold text-[#0B192C] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            : "flex items-center justify-center gap-2 rounded-none border border-white bg-white px-4 py-2 text-sm font-medium text-[#0B192C] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
        }
      >
        <PhoneIcon />
        Give Us a Call
        <Chevron open={phoneOpen} />
      </button>
      {phoneOpen ? (
        <ul
          id="showroom-phones"
          className={
            quote
              ? "absolute left-0 top-full z-50 w-[min(24rem,calc(100vw-2rem))] pt-2 shadow-2xl"
              : "absolute right-0 top-full z-50 w-[calc(100vw-2rem)] max-w-sm pt-2 shadow-2xl sm:right-auto sm:left-1/2 sm:w-[min(24rem,calc(100vw-2rem))] sm:max-w-none sm:-translate-x-1/2"
          }
        >
          <li
            className={`overflow-hidden border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md ${
              quote ? "rounded-[4px]" : "rounded-xl"
            }`}
          >
            <ul>
              {showroomPhones.map((location) => (
                <li key={location.href} className="border-b border-slate-700 last:border-b-0">
                  <a
                    href={location.href}
                    className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#38BDF8] sm:gap-4 sm:px-0 sm:py-3"
                  >
                    <span className="flex min-w-0 items-center">
                      <span className="shrink min-w-0 truncate text-xs font-bold text-white transition-colors hover:text-sky-400 sm:text-sm sm:font-semibold">
                        {location.name}
                      </span>
                      {location.appointmentOnly ? (
                        <span
                          className={`ml-2 inline-flex shrink-0 items-center whitespace-nowrap border border-sky-800 bg-sky-950/80 px-2 py-0.5 text-[10px] text-sky-200 sm:text-[11px] ${
                            quote ? "rounded-[4px]" : "rounded-full"
                          }`}
                        >
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
  );

  if (quote) {
    return (
      <div className="relative z-20 mt-7 flex flex-wrap items-center gap-3.5">
        {book}
        {call}
      </div>
    );
  }

  return (
    <>
      {book}
      {call}
    </>
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

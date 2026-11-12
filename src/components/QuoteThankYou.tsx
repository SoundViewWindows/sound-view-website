"use client";

import { useEffect, useRef } from "react";

export type QuoteService = "door" | "shower" | "window" | "glass";

const offers: Record<
  QuoteService,
  { title: string; body: string; button: string; href: string }
> = {
  door: {
    title: "Browse Matching Door Hardware Online",
    body: "Explore our collection of premium exterior handlesets, smart locks, and hinge finishes ready to complement your new doors.",
    button: "Shop Matching Door Hardware",
    href: "https://sound-view-window-door.myshopify.com/collections/door-hardware",
  },
  shower: {
    title: "Explore Shower Glass Hardware & Accessories",
    body: "Browse architectural pulls, frameless clamps, headers, and maintenance supplies for your bathroom enclosure.",
    button: "Shop Shower Glass Hardware",
    href: "https://sound-view-window-door.myshopify.com/collections/shower-glass-hardware",
  },
  window: {
    title: "Explore Custom Window Treatments",
    body: "Browse motorized shades, cellular honeycomb blinds, and drapery solutions designed to fit your new window openings.",
    button: "Shop Matching Window Treatments",
    href: "https://sound-view-window-door.myshopify.com/collections/window-treatments",
  },
  glass: {
    title: "Explore the Sound View Hardware Storefront",
    body: "Find contractor-grade glass hardware, weatherstripping, and specialized fittings directly through our online store.",
    button: "Visit Sound View Hardware Storefront",
    href: "https://sound-view-window-door.myshopify.com/",
  },
};

export function quoteServiceFromProject(projectType: string): QuoteService {
  if (projectType === "door-replacement") return "door";
  if (projectType === "shower-door-replacement") return "shower";
  if (projectType === "window-replacement" || projectType === "window-blinds-shades") {
    return "window";
  }
  return "glass";
}

type QuoteThankYouProps = {
  service: QuoteService;
  onReset: () => void;
  id?: string;
  framed?: boolean;
  tone?: "default" | "home";
};

export function QuoteThankYou({
  service,
  onReset,
  id,
  framed = true,
  tone = "default",
}: QuoteThankYouProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const offer = offers[service];
  const Tag = id ? "aside" : "div";
  const home = tone === "home";

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <Tag
      id={id}
      role="status"
      aria-live="polite"
      className={
        framed
          ? home
            ? "relative flex w-full scroll-mt-6 flex-col items-center justify-center rounded-[28px] border border-[#1A6496] bg-home-deep p-6 text-center text-white shadow-2xl shadow-slate-950/30 sm:p-7"
            : "relative flex w-full scroll-mt-6 flex-col items-center justify-center rounded-2xl border border-slate-700/80 bg-[#132238] p-6 text-center shadow-xl sm:p-8"
          : "flex w-full flex-col items-center justify-center text-center"
      }
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.2 4.2L19 7.5" />
        </svg>
      </span>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className={`mb-2 text-2xl outline-none ${home ? "font-extrabold tracking-tight text-white" : "font-bold text-white"}`}
      >
        Thank You, Your Quote Request Is Received!
      </h2>
      <p className={`mb-6 max-w-sm text-sm leading-relaxed ${home || !framed ? "text-home-mist" : "text-slate-300"}`}>
        Our local Pacific Northwest specialists are reviewing your project
        specifications. A team member will follow up with your upfront estimate
        in under 2 business hours.
      </p>
      <div
        className={`mb-6 w-full rounded-xl border p-5 text-left ${
          home || !framed ? "border-white/15 bg-white/10" : "border-slate-700/80 bg-[#132238]"
        }`}
      >
        <p className={`mb-1 text-[11px] font-bold uppercase tracking-wider ${home || !framed ? "text-home-accent" : "text-slate-400"}`}>
          While You Wait
        </p>
        <h3 className={`mb-1 font-semibold ${framed ? "text-white" : "text-white"}`}>{offer.title}</h3>
        <p className={`mb-4 text-sm leading-relaxed ${home || !framed ? "text-home-mist" : "text-slate-300"}`}>{offer.body}</p>
        <a
          href={offer.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            home
              ? "flex w-full items-center justify-center gap-2 rounded-xl bg-home-accent px-4 py-3.5 text-xs font-black uppercase tracking-wider text-[#062033] shadow-lg shadow-[#4EC6FF]/25 transition-all hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent sm:text-sm"
              : "flex w-full items-center justify-center gap-2 rounded-lg bg-[#38BDF8] px-4 py-3 font-semibold text-[#0B192C] shadow-sm transition-colors hover:bg-sky-300"
          }
        >
          {offer.button}
          <ExternalLinkIcon />
        </a>
      </div>
      <button
        type="button"
        onClick={onReset}
        className={`text-sm font-medium underline underline-offset-4 transition-colors ${
          home || !framed
            ? "text-home-mist decoration-home-accent/40 hover:text-white"
            : "text-slate-300 decoration-sky-400/40 hover:text-white"
        }`}
      >
        Submit another project request
      </button>
    </Tag>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 5H5.5A1.5 1.5 0 0 0 4 6.5v8A1.5 1.5 0 0 0 5.5 16h8a1.5 1.5 0 0 0 1.5-1.5V12"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 10 16 4m0 0h-4.5M16 4v4.5" />
    </svg>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WindowQuoteBox } from "@/components/WindowQuoteBox";

const types = [
  {
    title: "Casement Windows",
    detail: "Maximum Ventilation",
    image: "/types/casement.jpg",
    alt: "Open casement windows looking onto a sunny courtyard",
    body: "Hinged on the side and cranks outward. Compression seals create an airtight barrier against Pacific Northwest rain and wind.",
  },
  {
    title: "Double-Hung Window",
    quoteValue: "Double-Hung Windows",
    detail: "Classic Versatility",
    image: "/types/double-hung.jpg",
    alt: "Double-hung window with sashes that tilt in for cleaning",
    body: "Both upper and lower sashes slide vertically and tilt inward for effortless interior glass cleaning.",
  },
  {
    title: "Single-Hung Windows",
    detail: "Timeless Simplicity",
    image: "/types/single-hung.jpg",
    alt: "Single-hung window above a kitchen counter",
    body: "A fixed top sash with an operable bottom sash. Clean lines, dependable performance, and cost-effective efficiency.",
  },
  {
    title: "Awning Windows",
    detail: "Rain-Ready Airflow",
    image: "/types/awning.jpg",
    alt: "Awning window opened outward above a garden and pool",
    body: "Hinged at the top to swing outward from the bottom. Allows fresh ventilation even during light Seattle showers.",
  },
  {
    title: "Sliding Windows",
    detail: "Effortless Glide",
    image: "/types/sliding.jpg",
    alt: "Wood-framed sliding window opened to a patio",
    body: "Sashes glide smoothly horizontally along precision tracks. Ideal for wide openings, patios, and outdoor walkways.",
  },
  {
    title: "Picture Windows",
    detail: "Unobstructed Panoramas",
    image: "/types/picture.jpg",
    alt: "A row of picture windows looking out to the water",
    body: "Non-operable direct-set glass that maximizes natural light, thermal performance, and beautiful Puget Sound views.",
  },
  {
    title: "Bay Windows",
    detail: "Dimensional Space",
    image: "/types/bay.jpg",
    alt: "Exterior bay window with a metal roof and stone base",
    body: "Three-panel architectural projection that adds floor space, comfortable seating nooks, and multi-angle outdoor views.",
  },
  {
    title: "Bow Windows",
    detail: "Elegant Curves",
    image: "/types/bow.jpg",
    alt: "Curved bow window with a built-in window seat",
    body: "Four to six gently angled window panes forming a soft curve that floods living rooms and dining areas with panoramic light.",
  },
  {
    title: "Custom Windows",
    detail: "Architectural Specialty",
    image: "/types/custom.jpg",
    alt: "Custom arched window with divided lites in a brick wall",
    body: "Radius arches, geometric trapezoids, and bespoke direct-set frames crafted specifically to match unique home architecture.",
  },
];

export default function WindowTypesPage() {
  const [style, setStyle] = useState("");

  function requestStyle(value: string) {
    setStyle(value);
    document.getElementById("window-quote")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.setTimeout(() => {
      document.getElementById("window-quote-style")?.focus();
    }, 250);
  }

  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex min-w-0 flex-col items-start lg:col-span-7">
              <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="rounded-sm hover:text-[#1B2A4A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">&gt;</span>
                    <span>Services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">&gt;</span>
                    <Link
                      href="/services/window-replacement"
                      className="rounded-sm hover:text-[#1B2A4A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                    >
                      Window Replacement
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">&gt;</span>
                    <span aria-current="page">Window Types</span>
                  </li>
                </ol>
              </nav>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Window Operating Styles
              </p>
              <h1 className="mb-4 max-w-full font-serif text-3xl font-bold leading-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
                Window Styles & Operating Types
              </h1>
              <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                Explore operating styles and configurations tailored for Pacific
                Northwest weather, natural light, and easy room ventilation.
              </p>
              <Link
                href="/services/window-replacement/materials"
                className="inline-flex items-center gap-2 rounded-full border border-[#1B2A4A] px-6 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                View Window Materials
              </Link>
            </div>
            <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
              <div className="w-full max-w-md">
                <WindowQuoteBox style={style} onStyleChange={setStyle} />
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {types.map((type) => (
              <article
                key={type.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={type.image}
                    alt={type.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-grow flex-col justify-between p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {type.detail}
                    </p>
                    <h2 className="mb-2 mt-2 font-serif text-xl font-bold text-[#1B2A4A]">
                      {type.title}
                    </h2>
                    <p className="text-sm leading-6 text-[#1B2A4A]/80">{type.body}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => requestStyle("quoteValue" in type ? type.quoteValue : type.title)}
                    className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                  >
                    Request Quote for this Style
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

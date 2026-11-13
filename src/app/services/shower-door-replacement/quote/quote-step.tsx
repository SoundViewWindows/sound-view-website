"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { HeroActionButtons } from "@/components/HeroActionButtons";
import { CostComparison } from "@/components/CostComparison";
import { ShowerDoorQuoteBox } from "@/components/ShowerDoorQuoteBox";
import { ShowerStepNav } from "@/components/ShowerStepNav";
import { showerSelectionBadge, showerStyleFromSlug } from "@/lib/shower-funnel";

export function ShowerQuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const styleParam = searchParams.get("style");
  const [style, setStyle] = useState(showerStyleFromSlug(typeParam)?.option ?? "");

  useEffect(() => {
    setStyle(showerStyleFromSlug(typeParam)?.option ?? "");
  }, [typeParam]);

  const styleName = showerSelectionBadge(style, { type: typeParam, style: styleParam });

  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden py-12 lg:py-16">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-quotes/shower-door-quote-hero.jpg"
              alt="Custom frameless sliding glass shower enclosure in Seattle bathroom"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-home-canvas/95 via-home-canvas/85 to-home-deep/45" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="relative z-20 lg:col-span-6">
                <ShowerStepNav
                  current="Your Estimate"
                  backHref="/services/shower-door-replacement/types"
                  backLabel="Styles"
                />
                <div className="space-y-4">
                <h1 className="text-3xl font-extrabold leading-none tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                  Your Custom Shower Door Estimate
                </h1>
                <p className="max-w-lg text-sm leading-relaxed text-slate-200 drop-shadow-sm sm:text-base">
                  Review your chosen configuration, then share a few details so our
                  Seattle glass specialists can prepare upfront pricing.
                </p>
                <p className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-[#182B3E]/75 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                  <span>{styleName}</span>
                  <Link
                    href="/services/shower-door-replacement/types"
                    className="ml-1 font-semibold text-[#38BDF8] underline decoration-[#38BDF8]/40 underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    Edit
                  </Link>
                </p>
                </div>
                <HeroActionButtons appearance="quote" />
              </div>
              <div className="lg:col-span-6">
                <ShowerDoorQuoteBox
                  className="relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7"
                  style={style}
                  onStyleChange={setStyle}
                />
              </div>
            </div>
          </div>
        </section>
        <CostComparison service="shower-doors" theme="about" />
      </main>
    </div>
  );
}

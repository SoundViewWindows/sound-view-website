"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { QuoteContactBar } from "@/components/HeroActionButtons";
import { CostComparison } from "@/components/CostComparison";
import { PugetSoundProofCard, QuoteSelectionCard, WhatHappensNextCard } from "@/components/QuoteReassurance";
import { ShowerDoorQuoteBox } from "@/components/ShowerDoorQuoteBox";
import { ShowerStepNav } from "@/components/ShowerStepNav";
import { isConsultationSlug, showerStyleFromSlug, showerStyles } from "@/lib/shower-funnel";

export function ShowerQuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const styleParam = searchParams.get("style");
  const [style, setStyle] = useState(showerStyleFromSlug(typeParam)?.option ?? "");

  useEffect(() => {
    setStyle(showerStyleFromSlug(typeParam)?.option ?? "");
  }, [typeParam]);

  const styleChoice = showerStyles.find((item) => item.option === style) ?? null;
  const styleName = styleChoice
    ? styleChoice.name
    : isConsultationSlug(styleParam) || isConsultationSlug(typeParam)
      ? "Specialist Recommendation"
      : "Open to advice";

  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden pb-10 pt-5 md:pb-12 md:pt-7">
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
                  backHref="/frameless-shower-doors-and-enclosures/"
                  backLabel="Styles"
                />
                <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8]">
                  Custom Shower Glass
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] leading-[1.08]">
                  Get a Free Custom Shower Door Estimate in Greater Seattle
                </h1>
                <p className="max-w-2xl text-sm leading-snug text-slate-200 drop-shadow-sm md:text-[15px]">
                  Every shower opening is different. We help homeowners select glass styles, hardware, and configurations that complement their bathrooms, with careful measurements and straightforward project pricing.
                </p>
                </div>
                <QuoteSelectionCard
                  selections={[
                    {
                      label: "Style",
                      name: styleName,
                      href: "/frameless-shower-doors-and-enclosures/",
                      image: styleChoice?.image,
                      imageAlt: styleChoice?.alt,
                    },
                  ]}
                />
                <WhatHappensNextCard />
                <PugetSoundProofCard />
              </div>
              <div className="lg:col-span-6">
                <ShowerDoorQuoteBox
                  className="relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7"
                  style={style}
                  onStyleChange={setStyle}
                />
                <QuoteContactBar
                  bookLabel="Book a Free Measurement Consultation"
                  callLabel="Call Your Local Showroom"
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

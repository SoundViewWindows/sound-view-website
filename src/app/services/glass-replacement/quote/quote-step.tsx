"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GlassQuoteBox } from "@/components/GlassQuoteBox";
import { CostComparison } from "@/components/CostComparison";
import { GlassStepNav } from "@/components/GlassStepNav";
import { Header } from "@/components/Header";
import { QuoteContactBar } from "@/components/HeroActionButtons";
import { PugetSoundProofCard, QuoteSelectionCard, WhatHappensNextCard } from "@/components/QuoteReassurance";
import { glassTypes, glassTypeFromSlug, isConsultationSlug } from "@/lib/glass-funnel";

export function GlassQuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const styleParam = searchParams.get("style");
  const [glassType, setGlassType] = useState(glassTypeFromSlug(typeParam)?.option ?? "");

  useEffect(() => {
    setGlassType(glassTypeFromSlug(typeParam)?.option ?? "");
  }, [typeParam]);

  const typeChoice = glassTypes.find((item) => item.option === glassType) ?? null;
  const typeName = typeChoice
    ? typeChoice.name
    : isConsultationSlug(typeParam) || isConsultationSlug(styleParam)
      ? "In-Home Assessment"
      : "Open to advice";

  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden pb-10 pt-5 md:pb-12 md:pt-7">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-quotes/glass-replacement-quote-hero.jpg"
              alt="Professional glass installation technicians replacing double-pane window sash"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-home-canvas/95 via-home-canvas/85 to-home-deep/45" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="relative z-20 lg:col-span-6">
                <GlassStepNav
                  current="Your Estimate"
                  backHref="/glass-replacement/"
                  backLabel="Glass Types"
                />
                <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8]">
                  Residential Glass Replacement
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] leading-[1.08]">
                  Get a Free Residential Glass Replacement Estimate in Greater Seattle
                </h1>
                <p className="max-w-2xl text-sm leading-snug text-slate-200 drop-shadow-sm md:text-[15px]">
                  Not every glass issue requires the same solution. Our team helps you understand your replacement options, glass specifications, and installation considerations before you commit to a project.
                </p>
                </div>
                <QuoteSelectionCard
                  selections={[
                    {
                      label: "Glass Type",
                      name: typeName,
                      href: "/glass-replacement/",
                      image: typeChoice?.image,
                      imageAlt: typeChoice?.alt,
                    },
                  ]}
                />
                <WhatHappensNextCard />
                <PugetSoundProofCard />
              </div>
              <div className="lg:col-span-6">
                <GlassQuoteBox
                  className="relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7"
                  glassType={glassType}
                  onGlassTypeChange={setGlassType}
                />
                <QuoteContactBar
                  bookLabel="Schedule a Glass Consultation"
                  callLabel="Call Your Local Showroom"
                />
              </div>
            </div>
          </div>
        </section>
        <CostComparison service="glass-replacement" theme="about" />
      </main>
    </div>
  );
}

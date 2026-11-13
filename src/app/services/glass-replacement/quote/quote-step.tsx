"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GlassQuoteBox } from "@/components/GlassQuoteBox";
import { CostComparison } from "@/components/CostComparison";
import { GlassStepNav } from "@/components/GlassStepNav";
import { Header } from "@/components/Header";
import { HeroActionButtons } from "@/components/HeroActionButtons";
import { glassSelectionBadge, glassTypeFromSlug } from "@/lib/glass-funnel";

export function GlassQuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const styleParam = searchParams.get("style");
  const [glassType, setGlassType] = useState(glassTypeFromSlug(typeParam)?.option ?? "");

  useEffect(() => {
    setGlassType(glassTypeFromSlug(typeParam)?.option ?? "");
  }, [typeParam]);

  const typeName = glassSelectionBadge(glassType, { type: typeParam, style: styleParam });

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
                  backHref="/services/glass-replacement/types"
                  backLabel="Glass Types"
                />
                <div className="space-y-1.5">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-[34px]">
                  Your Custom Glass Estimate
                </h1>
                <p className="max-w-2xl text-sm leading-snug text-slate-200 drop-shadow-sm md:text-[15px]">
                  Review your chosen glass type, then share a few details so our
                  Seattle specialists can prepare upfront pricing.
                </p>
                <p className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-[#182B3E]/75 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                  <span>{typeName}</span>
                  <Link
                    href="/services/glass-replacement/types"
                    className="ml-1 font-semibold text-[#38BDF8] underline decoration-[#38BDF8]/40 underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    Edit
                  </Link>
                </p>
                </div>
                <HeroActionButtons appearance="quote" />
              </div>
              <div className="lg:col-span-6">
                <GlassQuoteBox
                  className="relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7"
                  glassType={glassType}
                  onGlassTypeChange={setGlassType}
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

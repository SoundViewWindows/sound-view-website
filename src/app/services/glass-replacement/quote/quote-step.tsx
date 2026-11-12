"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GlassQuoteBox } from "@/components/GlassQuoteBox";
import { CostComparison } from "@/components/CostComparison";
import { GlassStepNav } from "@/components/GlassStepNav";
import { Header } from "@/components/Header";
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
    <div className="bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main>
        <section className="relative overflow-hidden py-12 lg:py-16">
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
          <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-5">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <GlassStepNav
                  current="Your Estimate"
                  backHref="/services/glass-replacement/types"
                  backLabel="Glass Types"
                />
                <div className="space-y-4">
                <h1 className="text-3xl font-extrabold leading-none tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                  Your Custom Glass Estimate
                </h1>
                <p className="max-w-lg text-sm leading-relaxed text-slate-200 drop-shadow-sm sm:text-base">
                  Review your chosen glass type, then share a few details so our
                  Seattle specialists can prepare upfront pricing.
                </p>
                <p className="inline-flex items-center gap-2 rounded-xl border border-[#8AA0B2]/35 bg-home-panel/80 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                  <span>{typeName}</span>
                  <Link
                    href="/services/glass-replacement/types"
                    className="ml-1 font-semibold text-home-accent underline decoration-home-accent/40 underline-offset-2 hover:text-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
                  >
                    Edit
                  </Link>
                </p>
                </div>
              </div>
              <div className="lg:col-span-6">
                <GlassQuoteBox
                  className="relative w-full scroll-mt-6 rounded-[28px] border border-[#1A6496] bg-home-deep p-6 text-white shadow-2xl shadow-slate-950/30 sm:p-7"
                  glassType={glassType}
                  onGlassTypeChange={setGlassType}
                />
              </div>
            </div>
          </div>
        </section>
        <CostComparison service="glass-replacement" theme="home" />
      </main>
    </div>
  );
}

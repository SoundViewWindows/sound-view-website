"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GlassQuoteBox } from "@/components/GlassQuoteBox";
import { CostComparison } from "@/components/CostComparison";
import { GlassStepNav } from "@/components/GlassStepNav";
import { Header } from "@/components/Header";
import { glassChoiceLabel, glassTypeFromSlug, glassTypes } from "@/lib/glass-funnel";

export function GlassQuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const [glassType, setGlassType] = useState(glassTypeFromSlug(typeParam)?.option ?? "");

  useEffect(() => {
    setGlassType(glassTypeFromSlug(typeParam)?.option ?? "");
  }, [typeParam]);

  const typeName = glassChoiceLabel(glassTypes.find((item) => item.option === glassType) ?? null);

  return (
    <div className="bg-[#0B192C] text-slate-100">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D2C43]/95 via-[#1D2C43]/80 to-[#1D2C43]/60" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-4 lg:col-span-6">
                <GlassStepNav
                  current="Your Estimate"
                  progress="Step 2 of 2: Get Your Free Upfront Estimate"
                  onDark
                />
                <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                  Your Custom Glass Estimate
                </h1>
                <p className="max-w-lg text-sm leading-relaxed text-slate-200 drop-shadow-sm sm:text-base">
                  Review your chosen glass type, then share a few details so our
                  Seattle specialists can prepare upfront pricing.
                </p>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md">
                  <span>Type: {typeName}</span>
                  <Link
                    href="/services/glass-replacement/types"
                    className="ml-1 font-semibold text-amber-300 underline underline-offset-2 hover:text-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Edit
                  </Link>
                </p>
              </div>
              <div className="lg:col-span-6">
                <GlassQuoteBox
                  className="relative w-full scroll-mt-6 rounded-2xl border border-slate-100 bg-[#132238] p-6 shadow-2xl sm:p-8"
                  glassType={glassType}
                  onGlassTypeChange={setGlassType}
                />
              </div>
            </div>
          </div>
        </section>
        <CostComparison service="glass-replacement" />
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GlassQuoteBox } from "@/components/GlassQuoteBox";
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
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 pb-8 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-7">
            <GlassStepNav
              current="Your Estimate"
              progress="Step 2 of 2: Get Your Free Upfront Estimate"
            />
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-[#1B2A4A] lg:text-5xl">
              Your Custom Glass Estimate
            </h1>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Review your chosen glass type, then share a few details so our
              Seattle specialists can prepare upfront pricing.
            </p>
            <p className="inline-flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm">
              <span>Type: {typeName}</span>
              <Link
                href="/services/glass-replacement/types"
                className="shrink-0 text-xs font-medium underline decoration-[#1B2A4A]/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                Edit
              </Link>
            </p>
          </div>
          <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
            <div className="w-full max-w-md">
              <GlassQuoteBox glassType={glassType} onGlassTypeChange={setGlassType} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

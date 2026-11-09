"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { CostComparison } from "@/components/CostComparison";
import { ShowerDoorQuoteBox } from "@/components/ShowerDoorQuoteBox";
import { ShowerStepNav } from "@/components/ShowerStepNav";
import { showerChoiceLabel, showerStyleFromSlug, showerStyles } from "@/lib/shower-funnel";

export function ShowerQuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const [style, setStyle] = useState(showerStyleFromSlug(typeParam)?.option ?? "");

  useEffect(() => {
    setStyle(showerStyleFromSlug(typeParam)?.option ?? "");
  }, [typeParam]);

  const styleName = showerChoiceLabel(showerStyles.find((item) => item.option === style) ?? null);

  return (
    <div className="bg-[#F7F5F0] text-[#28323D]">
      <Header />
      <main>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 pb-4 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-7">
            <ShowerStepNav
              current="Your Estimate"
              progress="Step 2 of 2: Get Your Free Upfront Estimate"
            />
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-[#1D2C43] lg:text-5xl">
              Your Custom Shower Door Estimate
            </h1>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Review your chosen configuration, then share a few details so our
              Seattle glass specialists can prepare upfront pricing.
            </p>
            <p className="inline-flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm">
              <span>Style: {styleName}</span>
              <Link
                href="/services/shower-door-replacement/types"
                className="text-xs font-medium underline decoration-[#1D2C43]/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]"
              >
                Edit
              </Link>
            </p>
          </div>
          <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
            <div className="w-full max-w-md">
              <ShowerDoorQuoteBox style={style} onStyleChange={setStyle} />
            </div>
          </div>
        </div>
        <CostComparison service="shower-doors" />
      </main>
    </div>
  );
}

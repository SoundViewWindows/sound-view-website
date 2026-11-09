"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { WindowQuoteBox } from "@/components/WindowQuoteBox";
import { WindowStepNav } from "@/components/WindowStepNav";
import {
  choiceLabel,
  materialFromSlug,
  styleFromSlug,
  styleSlugFromOption,
  windowMaterials,
  windowStyles,
} from "@/lib/window-funnel";

export function QuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const materialParam = searchParams.get("material");
  const [style, setStyle] = useState(styleFromSlug(typeParam)?.option ?? "");
  const [material, setMaterial] = useState(materialFromSlug(materialParam)?.option ?? "");

  useEffect(() => {
    setStyle(styleFromSlug(typeParam)?.option ?? "");
    setMaterial(materialFromSlug(materialParam)?.option ?? "");
  }, [typeParam, materialParam]);

  const styleName = choiceLabel(windowStyles.find((item) => item.option === style) ?? null);
  const materialName = choiceLabel(windowMaterials.find((item) => item.option === material) ?? null);
  const typeSlug = styleSlugFromOption(style);

  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-7">
            <WindowStepNav
              current="Your Estimate"
              progress="Step 3 of 3: Get Your Free Upfront Estimate"
            />
            <h1 className="mb-4 font-serif text-3xl font-bold leading-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
              Your Custom Window Estimate
            </h1>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Review the style and material you chose, then share a few details
              so a local specialist can prepare upfront pricing.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <p className="inline-flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm">
                <span>Style: {styleName}</span>
                <Link
                  href="/services/window-replacement/types"
                  className="text-xs font-medium underline decoration-[#1B2A4A]/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Edit
                </Link>
              </p>
              <p className="inline-flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm">
                <span>Material: {materialName}</span>
                <Link
                  href={`/services/window-replacement/materials?type=${typeSlug}`}
                  className="text-xs font-medium underline decoration-[#1B2A4A]/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Edit
                </Link>
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
            <div className="w-full max-w-md">
              <WindowQuoteBox
                material={material}
                style={style}
                onMaterialChange={setMaterial}
                onStyleChange={setStyle}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

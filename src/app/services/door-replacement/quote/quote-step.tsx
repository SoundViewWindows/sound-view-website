"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DoorQuoteBox } from "@/components/DoorQuoteBox";
import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import {
  doorChoiceLabel,
  doorMaterialFromSlug,
  doorMaterials,
  doorStyleFromSlug,
  doorStyleSlugFromOption,
  doorStyles,
} from "@/lib/door-funnel";

export function DoorQuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const materialParam = searchParams.get("material");
  const [style, setStyle] = useState(doorStyleFromSlug(typeParam)?.option ?? "");
  const [material, setMaterial] = useState(doorMaterialFromSlug(materialParam)?.option ?? "");

  useEffect(() => {
    setStyle(doorStyleFromSlug(typeParam)?.option ?? "");
    setMaterial(doorMaterialFromSlug(materialParam)?.option ?? "");
  }, [typeParam, materialParam]);

  const styleName = doorChoiceLabel(doorStyles.find((item) => item.option === style) ?? null);
  const materialName = doorChoiceLabel(
    doorMaterials.find((item) => item.option === material) ?? null,
  );
  const typeSlug = doorStyleSlugFromOption(style);

  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 pb-8 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-7">
            <DoorStepNav
              current="Your Estimate"
              progress="Step 3 of 3: Get Your Free Upfront Estimate"
            />
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-[#1B2A4A] lg:text-5xl">
              Your Custom Door Estimate
            </h1>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Review your chosen door style and material, then share your project
              details so our Seattle specialists can prepare an upfront quote.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <p className="inline-flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm">
                <span>Style: {styleName}</span>
                <Link
                  href="/services/door-replacement/types"
                  className="text-xs font-medium underline decoration-[#1B2A4A]/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Edit
                </Link>
              </p>
              <p className="inline-flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm">
                <span>Material: {materialName}</span>
                <Link
                  href={`/services/door-replacement/materials?type=${typeSlug}`}
                  className="text-xs font-medium underline decoration-[#1B2A4A]/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Edit
                </Link>
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
            <div className="w-full max-w-md">
              <DoorQuoteBox
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

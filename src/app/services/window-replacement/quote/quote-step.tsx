"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { CostComparison } from "@/components/CostComparison";
import { WindowQuoteBox } from "@/components/WindowQuoteBox";
import { WindowStepNav } from "@/components/WindowStepNav";
import {
  choiceLabel,
  manufacturerFromSlug,
  manufacturerSlugFromOption,
  materialFromSlug,
  materialSlugFromOption,
  styleFromSlug,
  styleSlugFromOption,
  windowManufacturers,
  windowMaterials,
  windowStepHref,
  windowStyles,
} from "@/lib/window-funnel";

export function QuoteStep() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const materialParam = searchParams.get("material");
  const manufacturerParam = searchParams.get("manufacturer");
  const [style, setStyle] = useState(styleFromSlug(typeParam)?.option ?? "");
  const [material, setMaterial] = useState(materialFromSlug(materialParam)?.option ?? "");
  const [manufacturer, setManufacturer] = useState(
    manufacturerFromSlug(manufacturerParam)?.option ?? "",
  );

  useEffect(() => {
    setStyle(styleFromSlug(typeParam)?.option ?? "");
    setMaterial(materialFromSlug(materialParam)?.option ?? "");
    setManufacturer(manufacturerFromSlug(manufacturerParam)?.option ?? "");
  }, [typeParam, materialParam, manufacturerParam]);

  const styleName = choiceLabel(windowStyles.find((item) => item.option === style) ?? null);
  const materialName = choiceLabel(windowMaterials.find((item) => item.option === material) ?? null);
  const manufacturerName = choiceLabel(
    windowManufacturers.find((item) => item.option === manufacturer) ?? null,
  );
  const materialSlug = materialSlugFromOption(material);
  const typeSlug = styleSlugFromOption(style);
  const manufacturerSlug = manufacturerSlugFromOption(manufacturer);

  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <section className="relative overflow-hidden py-12 lg:py-16">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-quotes/window-quote-hero.jpg"
              alt="Modern casement window open to green Puget Sound landscape"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C]/95 via-[#0B192C]/85 to-[#0B192C]/45" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-4 lg:col-span-6">
                <WindowStepNav
                  step={4}
                  material={materialSlug}
                  type={typeSlug}
                  manufacturer={manufacturerSlug}
                  onDark
                />
                <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                  Your Free Window Quote
                </h1>
                <p className="max-w-lg text-sm leading-relaxed text-slate-200 drop-shadow-sm sm:text-base">
                  Review the material, type, and manufacturer you chose, then share
                  a few details so a local specialist can prepare upfront pricing.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <SummaryBadge
                    label={`Material: ${materialName}`}
                    href={windowStepHref("materials")}
                  />
                  <SummaryBadge
                    label={`Type: ${styleName}`}
                    href={windowStepHref("types", { material: materialSlug })}
                  />
                  <SummaryBadge
                    label={`Manufacturer: ${manufacturerName}`}
                    href={windowStepHref("manufacturers", {
                      material: materialSlug,
                      type: typeSlug,
                    })}
                  />
                </div>
              </div>
              <div className="lg:col-span-6">
                <WindowQuoteBox
                  className="relative w-full scroll-mt-6 rounded-2xl border border-slate-700/70 bg-[#11223A] p-6 shadow-2xl sm:p-8"
                  material={material}
                  style={style}
                  manufacturer={manufacturer}
                  onMaterialChange={setMaterial}
                  onStyleChange={setStyle}
                  onManufacturerChange={setManufacturer}
                />
              </div>
            </div>
          </div>
        </section>
        <CostComparison service="windows" />
      </main>
    </div>
  );
}

function SummaryBadge({ label, href }: { label: string; href: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md">
      <span>{label}</span>
      <Link
        href={href}
        className="ml-1 font-semibold text-[#38BDF8] underline underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
      >
        Edit
      </Link>
    </p>
  );
}

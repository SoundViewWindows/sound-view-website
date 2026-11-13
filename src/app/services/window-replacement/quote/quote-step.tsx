"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { HeroActionButtons } from "@/components/HeroActionButtons";
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
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden pb-10 pt-5 md:pb-12 md:pt-7">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-quotes/window-quote-hero.jpg"
              alt="Modern casement window open to green Puget Sound landscape"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-home-canvas/95 via-home-canvas/85 to-home-deep/45" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="relative z-20 lg:col-span-6">
                <WindowStepNav
                  step={4}
                  material={materialSlug}
                  type={typeSlug}
                  manufacturer={manufacturerSlug}
                  onDark
                />
                <div className="space-y-1.5">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-[34px]">
                  Your Free Window Quote
                </h1>
                <p className="max-w-2xl text-sm leading-snug text-slate-200 drop-shadow-sm md:text-[15px]">
                  Review the material, type, and manufacturer you chose, then share
                  a few details so a local specialist can prepare upfront pricing.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
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
                <HeroActionButtons appearance="quote" />
              </div>
              <div className="lg:col-span-6">
                <WindowQuoteBox
                  className="relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7"
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
        <CostComparison service="windows" theme="about" />
      </main>
    </div>
  );
}

function SummaryBadge({ label, href }: { label: string; href: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-[#182B3E]/75 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
      <span>{label}</span>
      <Link
        href={href}
        className="ml-1 font-semibold text-[#38BDF8] underline decoration-[#38BDF8]/40 underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
      >
        Edit
      </Link>
    </p>
  );
}

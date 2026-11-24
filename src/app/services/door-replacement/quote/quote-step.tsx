"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DoorQuoteBox } from "@/components/DoorQuoteBox";
import { CostComparison } from "@/components/CostComparison";
import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import { QuoteContactBar } from "@/components/HeroActionButtons";
import { PugetSoundProofCard, QuoteSelectionCard, WhatHappensNextCard } from "@/components/QuoteReassurance";
import {
  DOOR_MATERIAL_STORAGE_KEY,
  doorChoiceLabel,
  doorManufacturerFromSlug,
  doorManufacturerAllowed,
  doorManufacturers,
  doorMaterialAllowed,
  doorMaterialFromSlug,
  doorMaterials,
  doorStepHref,
  doorStyleFromSlug,
  doorStyleSlugFromOption,
  doorStyles,
} from "@/lib/door-funnel";

export function DoorQuoteStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const materialParam = searchParams.get("material");
  const manufacturerParam = searchParams.get("manufacturer");
  const initialStyle = doorStyleFromSlug(typeParam);
  const initialMaterial = doorMaterialFromSlug(materialParam);
  const initialManufacturer = doorManufacturerFromSlug(manufacturerParam);
  const initialMaterialAllowed =
    !initialMaterial || doorMaterialAllowed(initialStyle?.slug ?? null, initialMaterial.slug);
  const [style, setStyle] = useState(initialStyle?.option ?? "");
  const [material, setMaterial] = useState(
    initialMaterialAllowed ? initialMaterial?.option ?? "" : "",
  );
  const [manufacturer, setManufacturer] = useState(initialManufacturer?.option ?? "");

  useEffect(() => {
    const nextStyle = doorStyleFromSlug(typeParam);
    const nextMaterial = doorMaterialFromSlug(materialParam);
    const allowed =
      !nextMaterial || doorMaterialAllowed(nextStyle?.slug ?? null, nextMaterial.slug);
    const nextManufacturer = doorManufacturerFromSlug(manufacturerParam);
    const materialOption = allowed && nextMaterial ? nextMaterial.option : "";
    const manufacturerOk =
      !nextManufacturer || doorManufacturerAllowed(materialOption, nextManufacturer.option);
    setStyle(nextStyle?.option ?? "");
    setMaterial(allowed && nextMaterial ? nextMaterial.option : "");
    setManufacturer(manufacturerOk && nextManufacturer ? nextManufacturer.option : "");
    if (allowed && nextMaterial) {
      sessionStorage.setItem(DOOR_MATERIAL_STORAGE_KEY, nextMaterial.slug);
    } else {
      sessionStorage.removeItem(DOOR_MATERIAL_STORAGE_KEY);
    }
    if (materialParam && materialParam !== "undecided" && !allowed) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("material");
      const query = params.toString();
      router.replace(
        query ? `/services/door-replacement/quote?${query}` : "/services/door-replacement/quote",
        { scroll: false },
      );
    } else if (manufacturerParam && manufacturerParam !== "undecided" && !manufacturerOk) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("manufacturer");
      const query = params.toString();
      router.replace(
        query ? `/services/door-replacement/quote?${query}` : "/services/door-replacement/quote",
        { scroll: false },
      );
    }
  }, [manufacturerParam, materialParam, router, searchParams, typeParam]);

  const styleChoice = doorStyles.find((item) => item.option === style) ?? null;
  const materialChoice = doorMaterials.find((item) => item.option === material) ?? null;
  const manufacturerChoice = doorManufacturers.find((item) => item.option === manufacturer) ?? null;
  const styleName = doorChoiceLabel(styleChoice);
  const materialName = doorChoiceLabel(materialChoice);
  const manufacturerName = doorChoiceLabel(manufacturerChoice);
  const typeSlug = doorStyleSlugFromOption(style);
  const materialSlug =
    doorMaterials.find((item) => item.option === material)?.slug ?? materialParam ?? "undecided";
  const manufacturerSlug =
    doorManufacturers.find((item) => item.option === manufacturer)?.slug ??
    manufacturerParam ??
    "undecided";

  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden pb-10 pt-5 md:pb-12 md:pt-7">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-quotes/door-quote-hero.jpg"
              alt="Modern black entry door with full glass sidelights and transom"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#243544]/95 via-[#1A2B38]/85 to-[#1A2B38]/45" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="relative z-20 lg:col-span-6">
                <DoorStepNav
                  step={4}
                  type={typeSlug}
                  material={materialSlug}
                  manufacturer={manufacturerSlug}
                />
                <div className="space-y-1.5">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-[34px]">
                  Your Free Door Quote
                </h1>
                <p className="max-w-2xl text-sm leading-snug text-slate-200 drop-shadow-sm md:text-[15px]">
                  Review your door type, material, and manufacturer, then share your
                  project details so our Seattle specialists can prepare an upfront quote.
                </p>
                </div>
                <QuoteSelectionCard
                  selections={[
                    {
                      label: "Door Type",
                      name: styleName,
                      href: doorStepHref("types"),
                      image: styleChoice?.image,
                      imageAlt: styleChoice?.alt,
                    },
                    {
                      label: "Material",
                      name: materialName,
                      href: doorStepHref("materials", {
                        type: typeSlug,
                        material: materialSlug,
                        manufacturer: manufacturerSlug,
                      }),
                      image: materialChoice?.image,
                      imageAlt: materialChoice?.alt,
                    },
                    {
                      label: "Manufacturer",
                      name: manufacturerName,
                      href: doorStepHref("manufacturers", {
                        type: typeSlug,
                        material: materialSlug,
                        manufacturer: manufacturerSlug,
                      }),
                      image: manufacturerChoice?.image,
                      imageAlt: manufacturerChoice?.alt,
                    },
                  ]}
                />
                <WhatHappensNextCard />
                <PugetSoundProofCard />
              </div>
              <div className="lg:col-span-6">
                <DoorQuoteBox
                  className="relative w-full scroll-mt-6 rounded-[4px] border border-white/15 bg-[#003d6b] p-6 text-white shadow-2xl sm:p-7"
                  material={material}
                  style={style}
                  manufacturer={manufacturer}
                  onMaterialChange={setMaterial}
                  onStyleChange={setStyle}
                  onManufacturerChange={setManufacturer}
                />
                <QuoteContactBar />
              </div>
            </div>
          </div>
        </section>
        <CostComparison service="doors" theme="about" />
      </main>
    </div>
  );
}

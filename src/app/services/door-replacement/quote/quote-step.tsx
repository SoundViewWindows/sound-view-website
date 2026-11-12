"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DoorQuoteBox } from "@/components/DoorQuoteBox";
import { CostComparison } from "@/components/CostComparison";
import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import {
  DOOR_MATERIAL_STORAGE_KEY,
  doorChoiceLabel,
  doorManufacturerFromSlug,
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
    setStyle(nextStyle?.option ?? "");
    setMaterial(allowed && nextMaterial ? nextMaterial.option : "");
    setManufacturer(nextManufacturer?.option ?? "");
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
    }
  }, [manufacturerParam, materialParam, router, searchParams, typeParam]);

  const styleName = doorChoiceLabel(doorStyles.find((item) => item.option === style) ?? null);
  const materialName = doorChoiceLabel(
    doorMaterials.find((item) => item.option === material) ?? null,
  );
  const manufacturerName = doorChoiceLabel(
    doorManufacturers.find((item) => item.option === manufacturer) ?? null,
  );
  const typeSlug = doorStyleSlugFromOption(style);
  const materialSlug =
    doorMaterials.find((item) => item.option === material)?.slug ?? materialParam ?? "undecided";
  const manufacturerSlug =
    doorManufacturers.find((item) => item.option === manufacturer)?.slug ??
    manufacturerParam ??
    "undecided";

  return (
    <div className="bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main>
        <section className="relative overflow-hidden py-12 lg:py-16">
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
              <div className="lg:col-span-6">
                <DoorStepNav
                  step={4}
                  type={typeSlug}
                  material={materialSlug}
                  manufacturer={manufacturerSlug}
                />
                <div className="space-y-4">
                <h1 className="text-3xl font-extrabold leading-none tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                  Your Free Door Quote
                </h1>
                <p className="max-w-lg text-sm leading-relaxed text-slate-200 drop-shadow-sm sm:text-lg">
                  Review your door type, material, and manufacturer, then share your
                  project details so our Seattle specialists can prepare an upfront quote.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <SummaryBadge
                    label={`Door Type: ${styleName}`}
                    href={doorStepHref("types")}
                  />
                  <SummaryBadge
                    label={`Material: ${materialName}`}
                    href={doorStepHref("materials", {
                      type: typeSlug,
                      material: materialSlug,
                      manufacturer: manufacturerSlug,
                    })}
                  />
                  <SummaryBadge
                    label={`Manufacturer: ${manufacturerName}`}
                    href={doorStepHref("manufacturers", {
                      type: typeSlug,
                      material: materialSlug,
                      manufacturer: manufacturerSlug,
                    })}
                  />
                </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <DoorQuoteBox
                  className="relative w-full scroll-mt-6 rounded-[28px] border border-[#1A6496] bg-home-deep p-6 text-white shadow-2xl shadow-slate-950/30 sm:p-7"
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
        <CostComparison service="doors" theme="home" />
      </main>
    </div>
  );
}

function SummaryBadge({ label, href }: { label: string; href: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-xl border border-[#8AA0B2]/35 bg-home-panel/80 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
      <span>{label}</span>
      <Link
        href={href}
        className="ml-1 font-semibold text-home-accent underline underline-offset-2 hover:text-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
      >
        Edit
      </Link>
    </p>
  );
}

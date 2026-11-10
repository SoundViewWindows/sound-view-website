"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { SkipAhead } from "@/components/SkipAhead";
import {
  DOOR_MATERIAL_STORAGE_KEY,
  doorChoiceLabel,
  doorMaterialAllowed,
  doorMaterialFromSlug,
  doorMaterialsForStyle,
  doorStepHref,
  doorStyleFromSlug,
} from "@/lib/door-funnel";

export function DoorMaterialsStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const style = doorStyleFromSlug(searchParams.get("type"));
  const typeSlug = style?.slug ?? searchParams.get("type") ?? "undecided";
  const manufacturerSlug = searchParams.get("manufacturer") ?? undefined;
  const materials = doorMaterialsForStyle(style?.slug);
  const materialParam = searchParams.get("material");
  const urlMaterial = doorMaterialFromSlug(materialParam);
  const urlMaterialAllowed = Boolean(
    urlMaterial && doorMaterialAllowed(style?.slug ?? null, urlMaterial.slug),
  );
  const [storedSlug, setStoredSlug] = useState<string | null>(null);
  const selectedSlug = urlMaterialAllowed ? urlMaterial?.slug ?? null : storedSlug;

  useEffect(() => {
    if (materialParam && materialParam !== "undecided" && !urlMaterialAllowed) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("material");
      const query = params.toString();
      router.replace(
        query
          ? `/services/door-replacement/materials?${query}`
          : "/services/door-replacement/materials",
        { scroll: false },
      );
    }
  }, [materialParam, router, searchParams, urlMaterialAllowed]);

  useEffect(() => {
    const stored = sessionStorage.getItem(DOOR_MATERIAL_STORAGE_KEY);
    const storedMaterial = doorMaterialFromSlug(stored);
    const storedAllowed = Boolean(
      storedMaterial && doorMaterialAllowed(style?.slug ?? null, storedMaterial.slug),
    );
    if (stored && !storedAllowed) {
      sessionStorage.removeItem(DOOR_MATERIAL_STORAGE_KEY);
      setStoredSlug(null);
      return;
    }
    setStoredSlug(storedAllowed ? storedMaterial?.slug ?? null : null);
  }, [style?.slug]);

  function clearStoredMaterial() {
    sessionStorage.removeItem(DOOR_MATERIAL_STORAGE_KEY);
  }

  const skipHref = doorStepHref("manufacturers", {
    type: typeSlug,
    material: "undecided",
    manufacturer: manufacturerSlug,
  });

  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <DoorStepNav
            step={2}
            type={typeSlug}
            material={selectedSlug ?? "undecided"}
            manufacturer={manufacturerSlug}
          />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 inline-flex flex-wrap items-center gap-3 rounded-full border border-[#38BDF8]/40 bg-white/10 px-4 py-2 text-sm text-white">
                <span>
                  Showing available materials for: {style ? doorChoiceLabel(style) : "all door types"}
                </span>
                <Link
                  href="/services/door-replacement/types"
                  className="font-medium text-[#0284C7] underline decoration-[#38BDF8] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  {style ? "Change" : "Choose a door type"}
                </Link>
              </p>
              <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">
                Select Your Door Material
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Choose a durable, high-performance material suited for damp maritime
                air, insulation, and home security.
              </p>
            </div>
            <SkipAhead href={skipHref} onClick={clearStoredMaterial}>
              Not sure yet? Continue to Manufacturers
            </SkipAhead>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {materials.map((material) => {
              const selected = selectedSlug === material.slug;
              return (
                <SelectionCard
                  key={material.slug}
                  href={doorStepHref("manufacturers", {
                    type: typeSlug,
                    material: material.slug,
                    manufacturer: manufacturerSlug,
                  })}
                  onClick={() => sessionStorage.setItem(DOOR_MATERIAL_STORAGE_KEY, material.slug)}
                  selected={selected}
                  image={material.image}
                  alt={material.alt}
                  title={material.name}
                  description={material.body}
                  detail={material.detail}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              );
            })}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <SkipAhead href={skipHref} onClick={clearStoredMaterial}>
              Not sure yet? Continue to Manufacturers
            </SkipAhead>
          </div>
        </section>
      </main>
    </div>
  );
}

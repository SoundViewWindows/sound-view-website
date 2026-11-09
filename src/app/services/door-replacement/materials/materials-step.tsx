"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import {
  DOOR_MATERIAL_STORAGE_KEY,
  doorChoiceLabel,
  doorMaterialAllowed,
  doorMaterialFromSlug,
  doorMaterialsForStyle,
  doorStyleFromSlug,
} from "@/lib/door-funnel";

export function DoorMaterialsStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const style = doorStyleFromSlug(searchParams.get("type"));
  const typeSlug = style?.slug ?? "undecided";
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

  return (
    <div className="bg-[#F7F5F0] text-[#28323D]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <DoorStepNav
            current="Choose Material"
            progress="Step 2 of 3: Choose Your Door Material"
          />
          <p className="mb-4 inline-flex flex-wrap items-center gap-3 rounded-full border border-[#38BDF8]/40 bg-white px-4 py-2 text-sm text-[#0B192C]">
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
          <h1 className="mb-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-[#1B2A4A] lg:text-5xl">
            Select Your Door Material
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Choose a durable, high-performance material suited for damp maritime
            air, insulation, and home security.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {materials.map((material) => {
              const selected = selectedSlug === material.slug;
              return (
                <Link
                  key={material.slug}
                  href={`/services/door-replacement/quote?type=${typeSlug}&material=${material.slug}`}
                  aria-current={selected ? "true" : undefined}
                  className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                    selected
                      ? "border-[#38BDF8] ring-2 ring-[#38BDF8]"
                      : "border-slate-200/80 hover:border-[#38BDF8]"
                  }`}
                >
                  <div className="relative h-52 w-full">
                    <Image
                      src={material.image}
                      alt={material.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {selected ? (
                      <span className="absolute right-3 top-3 rounded-full bg-[#38BDF8] px-2.5 py-1 text-xs font-semibold text-[#0B192C]">
                        Selected
                      </span>
                    ) : null}
                  </div>
                  <span className="flex flex-grow flex-col justify-between p-6">
                    <span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                        {material.detail}
                      </span>
                      <span className="mb-2 mt-2 block font-serif text-xl font-bold text-[#1B2A4A]">
                        {material.name}
                      </span>
                      <span className="block text-sm leading-6 text-[#5D6875]">{material.body}</span>
                    </span>
                    <span className="mt-5 block w-full rounded-lg bg-[#0B192C] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors group-hover:bg-[#1B2A4A]">
                      Select This Material
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href={`/services/door-replacement/quote?type=${typeSlug}&material=undecided`}
              onClick={clearStoredMaterial}
              className="inline-flex rounded-full border border-[#0B192C] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Not sure yet? Proceed to Quote
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

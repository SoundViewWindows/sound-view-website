"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { WindowStepNav } from "@/components/WindowStepNav";
import {
  choiceLabel,
  materialFromSlug,
  styleFromSlug,
  windowManufacturers,
  windowStepHref,
} from "@/lib/window-funnel";

const cardClass =
  "group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-[#15263F] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#38BDF8] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function ManufacturersStep() {
  const searchParams = useSearchParams();
  const materialSlug = searchParams.get("material") ?? "undecided";
  const typeSlug = searchParams.get("type") ?? "undecided";
  const material = materialFromSlug(materialSlug);
  const style = styleFromSlug(typeSlug);

  return (
    <div className="bg-[#0B192C] text-[#0B192C]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <WindowStepNav step={3} material={materialSlug} type={typeSlug} />
          <div className="mb-4 flex flex-wrap gap-3">
            <ChoiceBadge
              label={`Material: ${choiceLabel(material)}`}
              href={windowStepHref("materials")}
            />
            <ChoiceBadge
              label={`Style: ${choiceLabel(style)}`}
              href={windowStepHref("types", { material: materialSlug })}
            />
          </div>
          <h1 className="mb-4 max-w-3xl font-serif text-3xl font-bold leading-tight text-[#0B192C] sm:text-4xl lg:text-5xl">
            Choose a Window Manufacturer
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Pick an authorized brand, or let a specialist recommend one. Your
            choice is added to the free window quote.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {windowManufacturers.map((brand) => (
              <Link
                key={brand.slug}
                href={windowStepHref("quote", {
                  material: materialSlug,
                  type: typeSlug,
                  manufacturer: brand.slug,
                })}
                className={
                  brand.slug === "recommend" ? `${cardClass} border-[#38BDF8]` : cardClass
                }
              >
                <span className="flex h-28 items-end bg-[#0B192C] px-6 pb-5">
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                      {brand.detail}
                    </span>
                    <span className="mt-1 block font-serif text-2xl text-white">{brand.name}</span>
                  </span>
                </span>
                <span className="flex flex-grow flex-col justify-between p-6">
                  <span className="block text-sm leading-6 text-[#94A3B8]">{brand.body}</span>
                  <span className="mt-5 block w-full rounded-lg bg-[#0B192C] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors group-hover:bg-[#132C46]">
                    {brand.slug === "recommend" ? "Let an Expert Recommend" : "Select This Manufacturer"}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ChoiceBadge({ label, href }: { label: string; href: string }) {
  return (
    <p className="inline-flex items-center gap-3 rounded-full border border-[#38BDF8]/40 bg-[#15263F] px-4 py-2 text-sm text-[#0B192C]">
      <span>{label}</span>
      <Link
        href={href}
        className="font-medium text-[#0284C7] underline decoration-[#38BDF8] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
      >
        Change
      </Link>
    </p>
  );
}

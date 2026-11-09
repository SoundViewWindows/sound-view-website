"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ManufacturerCard } from "@/components/ManufacturerCard";
import { WindowStepNav } from "@/components/WindowStepNav";
import {
  choiceLabel,
  materialFromSlug,
  styleFromSlug,
  windowManufacturers,
  windowStepHref,
} from "@/lib/window-funnel";

export function ManufacturersStep() {
  const searchParams = useSearchParams();
  const materialSlug = searchParams.get("material") ?? "undecided";
  const typeSlug = searchParams.get("type") ?? "undecided";
  const material = materialFromSlug(materialSlug);
  const style = styleFromSlug(typeSlug);

  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <WindowStepNav step={3} material={materialSlug} type={typeSlug} onDark />
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
          <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Choose a Window Manufacturer
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Pick an authorized brand, or let a specialist recommend one. Your
            choice is added to the free window quote.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {windowManufacturers.map((brand) => (
              <ManufacturerCard
                key={brand.slug}
                href={windowStepHref("quote", {
                  material: materialSlug,
                  type: typeSlug,
                  manufacturer: brand.slug,
                })}
                name={brand.name}
                description={brand.body}
                image={brand.image}
                alt={brand.alt}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ChoiceBadge({ label, href }: { label: string; href: string }) {
  return (
    <p className="inline-flex items-center gap-3 rounded-full border border-[#38BDF8]/40 bg-white/10 px-4 py-2 text-sm text-white">
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

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ManufacturerCard } from "@/components/ManufacturerCard";
import { SkipAhead } from "@/components/SkipAhead";
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
  const quoteHref = windowStepHref("quote", {
    material: materialSlug,
    type: typeSlug,
    manufacturer: "consultation",
  });

  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-[#0B192C]">
        <div className="pointer-events-none select-none absolute inset-0 z-0">
          <img
            src="/images/window-manufacturers-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/75" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-10 pt-5 sm:px-6 md:pb-12 md:pt-7 lg:px-8">
        <div>
          <WindowStepNav step={3} material={materialSlug} type={typeSlug} onDark />
          <div className="mb-5 flex flex-col gap-4 md:mb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2.5 flex flex-wrap gap-2">
                <ChoiceBadge
                  label={`Material: ${choiceLabel(material)}`}
                  href={windowStepHref("materials")}
                />
                <ChoiceBadge
                  label={`Style: ${choiceLabel(style)}`}
                  href={windowStepHref("types", { material: materialSlug })}
                />
              </div>
              <h1 className="mb-1.5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-[34px]">
                Select Your Preferred Manufacturer
              </h1>
              <p className="max-w-2xl text-sm leading-snug text-slate-200 md:text-[15px]">
                Pick an authorized brand, or let a specialist recommend one. Your
                choice is added to the free window quote.
              </p>
            </div>
            <SkipAhead theme="home" href={quoteHref}>Not sure yet? Continue to Free Quote</SkipAhead>
          </div>
        </div>

        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                theme="home"
                surface="veil"
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <SkipAhead theme="home" href={quoteHref}>Not sure yet? Continue to Free Quote</SkipAhead>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}

function ChoiceBadge({ label, href }: { label: string; href: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-[4px] border border-[#8AA0B2]/35 bg-home-panel/80 px-2.5 py-1 text-xs text-white shadow-sm">
      <span>{label}</span>
      <Link
        href={href}
        className="font-medium text-home-accent underline decoration-home-accent/40 underline-offset-4 hover:text-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
      >
        Change
      </Link>
    </p>
  );
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import { ManufacturerCard } from "@/components/ManufacturerCard";
import { SkipAhead } from "@/components/SkipAhead";
import {
  doorChoiceLabel,
  doorManufacturerFromSlug,
  doorManufacturers,
  doorMaterialFromSlug,
  doorStepHref,
  doorStyleFromSlug,
} from "@/lib/door-funnel";

export function DoorManufacturersStep() {
  const searchParams = useSearchParams();
  const typeSlug = searchParams.get("type") ?? "undecided";
  const materialSlug = searchParams.get("material") ?? "undecided";
  const manufacturerSlug = searchParams.get("manufacturer") ?? "";
  const style = doorStyleFromSlug(typeSlug);
  const material = doorMaterialFromSlug(materialSlug);
  const selected = doorManufacturerFromSlug(manufacturerSlug);
  const continueSlug = selected?.slug ?? "recommend";
  const quoteHref = doorStepHref("quote", {
    type: typeSlug,
    material: materialSlug,
    manufacturer: "consultation",
  });

  return (
    <div className="bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-5">
          <DoorStepNav
            step={3}
            type={typeSlug}
            material={materialSlug}
            manufacturer={continueSlug}
          />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap gap-3">
                <ChoiceBadge
                  label={`Door Type: ${doorChoiceLabel(style)}`}
                  href={doorStepHref("types")}
                />
                <ChoiceBadge
                  label={`Material: ${doorChoiceLabel(material)}`}
                  href={doorStepHref("materials", {
                    type: typeSlug,
                    material: materialSlug,
                    manufacturer: continueSlug,
                  })}
                />
              </div>
              <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Select Your Preferred Manufacturer
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Choose from our trusted door manufacturing partners or let our specialists
                recommend the best fit for your home.
              </p>
            </div>
            <SkipAhead theme="home" href={quoteHref}>Not sure yet? Continue to Free Quote</SkipAhead>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
            {doorManufacturers.map((brand) => {
              const active = selected?.slug === brand.slug;
              return (
                <ManufacturerCard
                  key={brand.slug}
                  href={doorStepHref("quote", {
                    type: typeSlug,
                    material: materialSlug,
                    manufacturer: brand.slug,
                  })}
                  name={brand.name}
                  description={brand.body}
                  image={brand.image}
                  alt={brand.alt}
                  selected={active}
                  theme="home"
                />
              );
            })}
          </div>
          <div className="mx-auto mb-8 mt-10 flex max-w-[1440px] justify-center px-4 sm:px-5">
            <SkipAhead theme="home" href={quoteHref}>Not sure yet? Continue to Free Quote</SkipAhead>
          </div>
        </section>
      </main>
    </div>
  );
}

function ChoiceBadge({ label, href }: { label: string; href: string }) {
  return (
    <p className="inline-flex items-center gap-3 rounded-xl border border-[#8AA0B2]/35 bg-home-panel/80 px-4 py-2 text-sm text-white shadow-sm">
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

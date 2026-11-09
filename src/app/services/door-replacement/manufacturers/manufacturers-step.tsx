"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
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

  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <DoorStepNav
            step={3}
            type={typeSlug}
            material={materialSlug}
            manufacturer={continueSlug}
          />
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
          <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">
            Select Your Preferred Manufacturer
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Choose from our trusted door manufacturing partners or let our specialists
            recommend the best fit for your home.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {doorManufacturers.map((brand) => {
              const active = selected?.slug === brand.slug;
              return (
                <Link
                  key={brand.slug}
                  href={doorStepHref("quote", {
                    type: typeSlug,
                    material: materialSlug,
                    manufacturer: brand.slug,
                  })}
                  aria-current={active ? "true" : undefined}
                  className={`group flex flex-col overflow-hidden rounded-2xl border bg-[#132238] shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                    active
                      ? "border-transparent ring-2 ring-sky-400"
                      : "border-slate-700/80 hover:border-[#38BDF8]"
                  }`}
                >
                  <span className="flex h-28 items-end bg-[#0B192C] px-6 pb-5">
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                        {brand.detail}
                      </span>
                      <span className="mt-1 block text-2xl font-bold text-white">{brand.name}</span>
                    </span>
                  </span>
                  <span className="flex flex-grow flex-col justify-between p-6">
                    <span className="block text-sm leading-6 text-slate-300">{brand.body}</span>
                    <span className="mt-5 block w-full rounded-xl bg-[#38BDF8] px-4 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-[#0B192C] transition-all group-hover:bg-sky-300 group-hover:shadow-lg group-hover:shadow-sky-500/25">
                      {brand.slug === "recommend" ? "Let an Expert Recommend" : "Select This Manufacturer"}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href={doorStepHref("quote", {
                type: typeSlug,
                material: materialSlug,
                manufacturer: continueSlug,
              })}
              className="inline-flex rounded-full border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#38BDF8] hover:text-[#0B192C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Continue
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function ChoiceBadge({ label, href }: { label: string; href: string }) {
  return (
    <p className="inline-flex items-center gap-3 rounded-full border border-[#38BDF8]/40 bg-[#132238] px-4 py-2 text-sm text-white">
      <span>{label}</span>
      <Link
        href={href}
        className="font-medium text-sky-300 underline decoration-sky-400/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
      >
        Change
      </Link>
    </p>
  );
}

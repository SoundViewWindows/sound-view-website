"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { WindowStepNav } from "@/components/WindowStepNav";
import { styleFromSlug, windowMaterials } from "@/lib/window-funnel";

export function MaterialsStep() {
  const searchParams = useSearchParams();
  const style = styleFromSlug(searchParams.get("type"));
  const typeSlug = style?.slug ?? "undecided";

  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <WindowStepNav
            current="Choose Material"
            progress="Step 2 of 3: Choose Your Frame Material"
          />
          {style ? (
            <p className="mb-4 inline-flex flex-wrap items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-[#1B2A4A]">
              <span>Selected Style: {style.name}</span>
              <Link
                href="/services/window-replacement/types"
                className="font-medium underline decoration-[#1B2A4A]/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                Change
              </Link>
            </p>
          ) : null}
          <h1 className="mb-4 max-w-3xl font-serif text-3xl font-bold leading-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
            Select Your Preferred Frame Material
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Select a durable material engineered for Greater Seattle weather to
            finalize your custom quote.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {windowMaterials.map((material) => (
              <Link
                key={material.slug}
                href={`/services/window-replacement/quote?type=${typeSlug}&material=${material.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={material.image}
                    alt={material.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="flex flex-grow flex-col justify-between p-6">
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {material.detail}
                    </span>
                    <span className="mb-2 mt-2 block font-serif text-xl font-bold text-[#1B2A4A]">
                      {material.name}
                    </span>
                    <span className="block text-sm leading-6 text-[#1B2A4A]/80">{material.body}</span>
                  </span>
                  <span className="mt-5 block w-full rounded-lg bg-[#1B2A4A] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors group-hover:bg-[#15223C]">
                    Select This Material
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href={`/services/window-replacement/quote?type=${typeSlug}&material=undecided`}
              className="inline-flex rounded-full border border-[#1B2A4A] px-6 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
            >
              Not sure yet? Proceed to Quote
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

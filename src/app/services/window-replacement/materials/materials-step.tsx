"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { WindowStepNav } from "@/components/WindowStepNav";
import { windowMaterials, windowStepHref } from "@/lib/window-funnel";

export function MaterialsStep() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <WindowStepNav step={1} />
          <h1 className="mb-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Select Your Window Material
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Choose a frame built for Greater Seattle weather. Your selection
            continues to window types, then a manufacturer, then your free quote.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {windowMaterials.map((material) => (
              <SelectionCard
                key={material.slug}
                href={windowStepHref("types", { material: material.slug })}
                image={material.image}
                alt={material.alt}
                fit={material.slug === "composite" ? "contain" : "cover"}
                title={material.name}
                description={material.body}
                detail={material.detail}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ))}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href={windowStepHref("types", { material: "undecided" })}
              className="inline-flex rounded-full border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#38BDF8] hover:text-[#0B192C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Not sure yet? Continue to Types
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

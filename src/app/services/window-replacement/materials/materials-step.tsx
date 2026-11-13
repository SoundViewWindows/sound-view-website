"use client";

import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { SkipAhead } from "@/components/SkipAhead";
import { WindowStepNav } from "@/components/WindowStepNav";
import { windowMaterials, windowStepHref } from "@/lib/window-funnel";

export function MaterialsStep() {
  return (
    <div className="bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-5">
          <WindowStepNav step={1} />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mb-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Select Your Window Material
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Choose a frame built for Greater Seattle weather. Your selection
                continues to window types, then a manufacturer, then your free quote.
              </p>
            </div>
            <SkipAhead theme="home" href={windowStepHref("types", { material: "undecided" })}>
              Not sure yet? Continue to Window Types
            </SkipAhead>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
            {windowMaterials.map((material) => (
              <SelectionCard
                key={material.slug}
                href={windowStepHref("types", { material: material.slug })}
                image={material.image}
                alt={material.alt}
                title={material.name}
                description={material.body}
                detail={material.detail}
                cta={`Explore ${material.name} Windows`}
                sizes="(min-width: 768px) 50vw, 100vw"
                theme="home"
                layout="material"
                tallImage
              />
            ))}
          </div>
          <div className="mx-auto max-w-[1440px] px-4 py-10 text-center sm:px-5">
            <SkipAhead theme="home" href={windowStepHref("types", { material: "undecided" })}>
              Not sure yet? Continue to Window Types
            </SkipAhead>
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { SkipAhead } from "@/components/SkipAhead";
import { WindowStepNav } from "@/components/WindowStepNav";
import { windowMaterials, windowStepHref } from "@/lib/window-funnel";

export function MaterialsStep() {
  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-[#0B192C]">
        <div className="pointer-events-none select-none absolute inset-0 z-0">
          <img
            src="/images/window-materials-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/75" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div>
          <WindowStepNav step={1} />
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                surface="veil"
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <SkipAhead theme="home" href={windowStepHref("types", { material: "undecided" })}>
              Not sure yet? Continue to Window Types
            </SkipAhead>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}

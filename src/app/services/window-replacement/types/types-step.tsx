"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { SkipAhead } from "@/components/SkipAhead";
import { WindowStepNav } from "@/components/WindowStepNav";
import {
  choiceLabel,
  materialFromSlug,
  windowStepHref,
  windowStyles,
} from "@/lib/window-funnel";

export function TypesStep() {
  const searchParams = useSearchParams();
  const materialSlug = searchParams.get("material") ?? "undecided";
  const material = materialFromSlug(materialSlug);

  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-[#0B192C]">
        <div className="pointer-events-none select-none absolute inset-0 z-0">
          <img
            src="/images/window-types-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/75" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div>
          <WindowStepNav step={2} material={materialSlug} onDark />
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 inline-flex flex-wrap items-center gap-3 rounded-xl border border-[#8AA0B2]/35 bg-home-panel/80 px-4 py-2 text-sm text-white shadow-sm">
                <span>Material: {choiceLabel(material)}</span>
                <Link
                  href={windowStepHref("materials")}
                  className="font-medium text-home-accent underline decoration-home-accent/40 underline-offset-4 hover:text-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
                >
                  Change
                </Link>
              </p>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Select the Window Type That Fits Your Home
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Casement, hung, slider, awning, picture, bay, and bow windows. Your
                style choice continues to manufacturer options.
              </p>
            </div>
            <SkipAhead
              theme="home"
              href={windowStepHref("manufacturers", {
                material: materialSlug,
                type: "undecided",
              })}
            >
              Not sure yet? Continue to Manufacturers
            </SkipAhead>
          </div>
        </div>

        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {windowStyles.map((style) => (
              <SelectionCard
                key={style.slug}
                href={windowStepHref("manufacturers", {
                  material: materialSlug,
                  type: style.slug,
                })}
                image={style.image}
                alt={style.alt}
                title={style.name}
                description={style.body}
                descriptionClassName="mb-2.5 text-[11px] leading-snug text-slate-300"
                detail={style.detail}
                cta={`Explore ${style.name}`}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                theme="home"
                layout="type"
                tallImage
                imageClassName={style.slug === "bow" ? "scale-[1.45]" : undefined}
                surface="veil"
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <SkipAhead
              theme="home"
              href={windowStepHref("manufacturers", {
                material: materialSlug,
                type: "undecided",
              })}
            >
              Not sure yet? Continue to Manufacturers
            </SkipAhead>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}

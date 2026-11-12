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
    <div className="bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-5">
          <WindowStepNav step={2} material={materialSlug} onDark />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
              <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
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
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-4 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
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
                detail={style.detail}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                theme="home"
                layout="type"
                tallImage
              />
            ))}
          </div>
          <div className="mx-auto max-w-[1440px] px-4 py-10 text-center sm:px-5">
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
      </main>
    </div>
  );
}

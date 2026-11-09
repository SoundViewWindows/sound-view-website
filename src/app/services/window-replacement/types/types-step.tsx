"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { WindowStepNav } from "@/components/WindowStepNav";
import {
  choiceLabel,
  materialFromSlug,
  windowStepHref,
  windowStyles,
} from "@/lib/window-funnel";

const cardClass =
  "group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-[#15263F] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#38BDF8] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function TypesStep() {
  const searchParams = useSearchParams();
  const materialSlug = searchParams.get("material") ?? "undecided";
  const material = materialFromSlug(materialSlug);

  return (
    <div className="bg-[#0B192C] text-[#0B192C]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <WindowStepNav current="Choose Style" progress="Step 2 of 4: Styles" />
          <p className="mb-4 inline-flex flex-wrap items-center gap-3 rounded-full border border-[#38BDF8]/40 bg-[#15263F] px-4 py-2 text-sm text-[#0B192C]">
            <span>Material: {choiceLabel(material)}</span>
            <Link
              href={windowStepHref("materials")}
              className="font-medium text-[#0284C7] underline decoration-[#38BDF8] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Change
            </Link>
          </p>
          <h1 className="mb-4 max-w-3xl font-serif text-3xl font-bold leading-tight text-[#0B192C] sm:text-4xl lg:text-5xl">
            Select the Window Style That Fits Your Home
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Casement, hung, slider, awning, picture, bay, and bow windows. Your
            style choice continues to manufacturer options.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {windowStyles.map((style) => (
              <Link
                key={style.slug}
                href={windowStepHref("manufacturers", {
                  material: materialSlug,
                  type: style.slug,
                })}
                className={cardClass}
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={style.image}
                    alt={style.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="flex flex-grow flex-col justify-between p-6">
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                      {style.detail}
                    </span>
                    <span className="mb-2 mt-2 block font-serif text-xl font-bold text-[#0B192C]">
                      {style.name}
                    </span>
                    <span className="block text-sm leading-6 text-[#94A3B8]">{style.body}</span>
                  </span>
                  <span className="mt-5 block w-full rounded-lg bg-[#0B192C] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors group-hover:bg-[#132C46]">
                    Select This Style
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href={windowStepHref("manufacturers", {
                material: materialSlug,
                type: "undecided",
              })}
              className="inline-flex rounded-full border border-[#0B192C] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-[#38BDF8] hover:text-[#0A192F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Not sure yet? Continue to Manufacturers
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

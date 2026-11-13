"use client";

import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { SkipAhead } from "@/components/SkipAhead";
import { ShowerStepNav } from "@/components/ShowerStepNav";
import { showerStyles } from "@/lib/shower-funnel";

export function ShowerTypesStep() {
  const searchParams = useSearchParams();
  const quoteParams = new URLSearchParams(searchParams.toString());
  quoteParams.set("style", "consultation");
  const quoteHref = `/services/shower-door-replacement/quote?${quoteParams.toString()}`;

  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-[#0B192C]">
        <div className="pointer-events-none select-none absolute inset-0 z-0">
          <img
            src="/images/shower-door-styles-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/75" />
        </div>
        <div className="relative z-10 flex flex-1 flex-col py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5">
          <ShowerStepNav current="Choose Style" />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Select the Shower Door Style for Your Bathroom
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Explore custom glass enclosures engineered for watertight performance
                and modern bathroom aesthetics across Greater Seattle.
              </p>
            </div>
            <SkipAhead theme="home" href={quoteHref}>
              Not sure yet? Skip to Quote
            </SkipAhead>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
            {showerStyles.map((style) => (
              <SelectionCard
                key={style.slug}
                href={`/services/shower-door-replacement/quote?type=${style.slug}`}
                image={style.image}
                alt={style.alt}
                title={style.name}
                description={style.body}
                detail={style.detail}
                layout="type"
                theme="home"
                surface="veil"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                imageClassName={style.slug === "frameless" ? "scale-[1.40]" : undefined}
                imageStyle={
                  style.slug === "frameless"
                    ? { transform: "scale(1.40)", transformOrigin: "center center" }
                    : undefined
                }
              />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-[1440px] px-4 text-center sm:px-5">
            <SkipAhead theme="home" href={quoteHref}>
              Not sure yet? Skip to Quote
            </SkipAhead>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}

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
    <div className="bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-5">
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
          <div className="mx-auto max-w-[1440px] px-4 py-10 text-center sm:px-5">
            <SkipAhead theme="home" href={quoteHref}>
              Not sure yet? Skip to Quote
            </SkipAhead>
          </div>
        </section>
      </main>
    </div>
  );
}

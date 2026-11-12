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
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <ShowerStepNav current="Choose Style" />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">
                Select the Shower Door Style for Your Bathroom
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Explore custom glass enclosures engineered for watertight performance
                and modern bathroom aesthetics across Greater Seattle.
              </p>
            </div>
            <div className="w-fit self-start md:self-auto">
              <SkipAhead href={quoteHref}>Not sure yet? Skip to Quote</SkipAhead>
            </div>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {showerStyles.map((style) => (
              <SelectionCard
                key={style.slug}
                href={`/services/shower-door-replacement/quote?type=${style.slug}`}
                image={style.image}
                alt={style.alt}
                title={style.name}
                description={style.body}
                detail={style.detail}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
          <div className="mx-auto mb-8 mt-10 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
            <SkipAhead href={quoteHref}>Not sure yet? Skip to Quote</SkipAhead>
          </div>
        </section>
      </main>
    </div>
  );
}

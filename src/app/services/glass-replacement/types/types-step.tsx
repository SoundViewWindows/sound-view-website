"use client";

import { useSearchParams } from "next/navigation";
import { GlassStepNav } from "@/components/GlassStepNav";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { SkipAhead } from "@/components/SkipAhead";
import { glassTypes } from "@/lib/glass-funnel";

export function GlassTypesStep() {
  const searchParams = useSearchParams();
  const quoteParams = new URLSearchParams(searchParams.toString());
  quoteParams.set("type", "consultation");
  const quoteHref = `/services/glass-replacement/quote?${quoteParams.toString()}`;

  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <GlassStepNav current="Choose Glass Type" />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">
                Select the Glass Type Needed for Your Home
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Replace foggy, cracked, or inefficient glass panels while keeping
                your existing frames intact. Select an option below to proceed.
              </p>
            </div>
            <div className="w-fit self-start md:self-auto">
              <SkipAhead href={quoteHref}>Not sure yet? Skip to Quote</SkipAhead>
            </div>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-4">
            {glassTypes.map((type) => (
              <SelectionCard
                key={type.slug}
                href={`/services/glass-replacement/quote?type=${type.slug}`}
                image={type.image}
                alt={type.alt}
                title={type.name}
                description={type.body}
                detail={type.detail}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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

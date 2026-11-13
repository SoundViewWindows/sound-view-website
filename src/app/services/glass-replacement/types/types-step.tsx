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
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-[#0B192C]">
        <div className="pointer-events-none select-none absolute inset-0 z-0">
          <img
            src="/images/glass-types-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/75" />
        </div>
        <div className="relative z-10 flex flex-1 flex-col py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5">
          <GlassStepNav current="Choose Glass Type" />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Select the Glass Type Needed for Your Home
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Replace foggy, cracked, or inefficient glass panels while keeping
                your existing frames intact. Select an option below to proceed.
              </p>
            </div>
            <SkipAhead theme="home" href={quoteHref}>
              Not sure yet? Skip to Quote
            </SkipAhead>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
            {glassTypes.map((type) => (
              <SelectionCard
                key={type.slug}
                href={`/services/glass-replacement/quote?type=${type.slug}`}
                image={type.image}
                alt={type.alt}
                title={type.name}
                description={type.body}
                detail={type.detail}
                layout="type"
                theme="home"
                surface="veil"
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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

import Image from "next/image";
import Link from "next/link";
import { GlassStepNav } from "@/components/GlassStepNav";
import { Header } from "@/components/Header";
import { glassTypes } from "@/lib/glass-funnel";

export default function GlassTypesPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <GlassStepNav
            current="Choose Glass Type"
            progress="Step 1 of 2: Choose Your Glass Replacement Type"
          />
          <h1 className="mb-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-[#1B2A4A] lg:text-5xl">
            Select the Glass Type Needed for Your Home
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Replace foggy, cracked, or inefficient glass panels while keeping
            your existing frames intact. Select an option below to proceed.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-4 lg:px-8">
            {glassTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/services/glass-replacement/quote?type=${type.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                <div className="relative h-48 w-full bg-[#F4EFEA]">
                  <Image
                    src={type.image}
                    alt={type.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="flex flex-grow flex-col justify-between p-6">
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {type.detail}
                    </span>
                    <span className="mb-2 mt-2 block font-serif text-xl font-bold text-[#1B2A4A]">
                      {type.name}
                    </span>
                    <span className="block text-sm leading-6 text-[#1B2A4A]/80">{type.body}</span>
                  </span>
                  <span className="mt-5 block w-full rounded-lg bg-[#1B2A4A] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors group-hover:bg-[#15223C]">
                    Select This Type
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href="/services/glass-replacement/quote?type=undecided"
              className="inline-flex rounded-full border border-[#1B2A4A] px-6 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
            >
              Not sure what glass you have? Skip to Quote
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

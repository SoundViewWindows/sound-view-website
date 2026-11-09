import Link from "next/link";
import { GlassStepNav } from "@/components/GlassStepNav";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { glassTypes } from "@/lib/glass-funnel";

export default function GlassTypesPage() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <GlassStepNav
            current="Choose Glass Type"
            progress="Step 1 of 2: Choose Your Glass Replacement Type"
          />
          <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">
            Select the Glass Type Needed for Your Home
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Replace foggy, cracked, or inefficient glass panels while keeping
            your existing frames intact. Select an option below to proceed.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-4 lg:px-8">
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
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href="/services/glass-replacement/quote?type=undecided"
              className="inline-flex rounded-full border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#38BDF8] hover:text-[#0B192C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Not sure what glass you have? Skip to Quote
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

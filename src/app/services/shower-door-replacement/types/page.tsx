import Link from "next/link";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { ShowerStepNav } from "@/components/ShowerStepNav";
import { showerStyles } from "@/lib/shower-funnel";

export default function ShowerTypesPage() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <ShowerStepNav
            current="Choose Style"
            progress="Step 1 of 2: Choose Your Shower Door Style"
          />
          <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight text-white lg:text-5xl">
            Select the Shower Door Style for Your Bathroom
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Explore custom glass enclosures engineered for watertight performance
            and modern bathroom aesthetics across Greater Seattle.
          </p>
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
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href="/services/shower-door-replacement/quote?type=undecided"
              className="inline-flex rounded-full border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#38BDF8] hover:text-[#0B192C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Not sure yet? Skip to Quote
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

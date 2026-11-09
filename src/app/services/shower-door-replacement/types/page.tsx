import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
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
              <Link
                key={style.slug}
                href={`/services/shower-door-replacement/quote?type=${style.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-[#132238] shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-sky-400/80 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={style.image}
                    alt={style.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="flex flex-grow flex-col justify-between p-6">
                  <span>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      {style.detail}
                    </span>
                    <span className="mb-2 mt-2 block text-xl font-bold text-white">
                      {style.name}
                    </span>
                    <span className="block text-sm leading-6 text-slate-300">{style.body}</span>
                  </span>
                  <span className="mt-5 block w-full rounded-xl bg-[#38BDF8] px-4 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-[#0B192C] transition-all group-hover:bg-sky-300 group-hover:shadow-lg group-hover:shadow-sky-500/25">
                    Select This Style
                  </span>
                </span>
              </Link>
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

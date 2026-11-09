import Image from "next/image";
import Link from "next/link";
import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import { doorStyles } from "@/lib/door-funnel";

export default function DoorTypesPage() {
  return (
    <div className="bg-[#F7F5F0] text-[#28323D]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <DoorStepNav current="Choose Style" progress="Step 1 of 3: Choose Your Door Style" />
          <h1 className="mb-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-[#1D2C43] lg:text-5xl">
            Select the Door Style for Your Home
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Select an entryway or patio configuration to explore available materials.
            Not sure what fits? You can select &apos;Open to advice&apos; to continue.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {doorStyles.map((style) => (
              <Link
                key={style.slug}
                href={`/services/door-replacement/materials?type=${style.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]"
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
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {style.detail}
                    </span>
                    <span className="mb-2 mt-2 block font-serif text-xl font-bold text-[#1D2C43]">
                      {style.name}
                    </span>
                    <span className="block text-sm leading-6 text-[#5D6875]">{style.body}</span>
                  </span>
                  <span className="mt-5 block w-full rounded-lg bg-[#1D2C43] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors group-hover:bg-[#162433]">
                    Select This Style
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href="/services/door-replacement/materials?type=undecided"
              className="inline-flex rounded-full border border-[#1D2C43] px-6 py-3 text-sm font-medium text-[#1D2C43] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]"
            >
              Not sure yet? Skip to Materials
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

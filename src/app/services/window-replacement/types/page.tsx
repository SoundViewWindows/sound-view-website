import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WindowStepNav } from "@/components/WindowStepNav";
import { windowStyles } from "@/lib/window-funnel";

export default function WindowTypesPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <WindowStepNav current="Choose Style" progress="Step 1 of 3: Choose Your Window Style" />
          <h1 className="mb-4 max-w-3xl font-serif text-3xl font-bold leading-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
            Select the Window Style That Fits Your Home
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Click any style below to explore frame materials. Not sure what fits?
            You can select &apos;Open to advice&apos; to explore all options.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {windowStyles.map((style) => (
              <Link
                key={style.slug}
                href={`/services/window-replacement/materials?type=${style.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={style.image}
                    alt={style.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="flex flex-grow flex-col justify-between p-6">
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {style.detail}
                    </span>
                    <span className="mb-2 mt-2 block font-serif text-xl font-bold text-[#1B2A4A]">
                      {style.name}
                    </span>
                    <span className="block text-sm leading-6 text-[#1B2A4A]/80">{style.body}</span>
                  </span>
                  <span className="mt-5 block w-full rounded-lg bg-[#1B2A4A] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors group-hover:bg-[#15223C]">
                    Select This Style
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href="/services/window-replacement/materials?type=undecided"
              className="inline-flex rounded-full border border-[#1B2A4A] px-6 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
            >
              Not sure yet? Skip to Materials
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

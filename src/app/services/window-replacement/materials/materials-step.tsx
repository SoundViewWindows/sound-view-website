"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WindowStepNav } from "@/components/WindowStepNav";
import { windowMaterials, windowStepHref } from "@/lib/window-funnel";

export function MaterialsStep() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <WindowStepNav step={1} />
          <h1 className="mb-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Select Your Window Material
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Choose a frame built for Greater Seattle weather. Your selection
            continues to window types, then a manufacturer, then your free quote.
          </p>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {windowMaterials.map((material) => (
              <Link
                key={material.slug}
                href={windowStepHref("types", { material: material.slug })}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-[#132238] shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-sky-400/80 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                {material.image ? (
                  <div className="relative h-52 w-full">
                    <Image
                      src={material.image}
                      alt={material.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-52 w-full items-end bg-[#0B192C] p-6">
                    <span className="text-3xl text-[#38BDF8]">{material.name}</span>
                  </div>
                )}
                <span className="flex flex-grow flex-col justify-between p-6">
                  <span>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      {material.detail}
                    </span>
                    <span className="mb-2 mt-2 block text-xl font-bold text-white">
                      {material.name}
                    </span>
                    <span className="block text-sm leading-6 text-slate-300">{material.body}</span>
                  </span>
                  <span className="mt-5 block w-full rounded-xl bg-[#38BDF8] px-4 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-[#0B192C] transition-all group-hover:bg-sky-300 group-hover:shadow-lg group-hover:shadow-sky-500/25">
                    Select This Material
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <Link
              href={windowStepHref("types", { material: "undecided" })}
              className="inline-flex rounded-full border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#38BDF8] hover:text-[#0B192C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Not sure yet? Continue to Types
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

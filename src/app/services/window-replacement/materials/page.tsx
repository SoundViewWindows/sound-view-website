"use client";

import { useState } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { WindowQuoteBox } from "@/components/WindowQuoteBox";

const materials = [
  {
    title: "Fiberglass",
    detail: "Milgard Ultra Series",
    image: "/materials/fiberglass.jpg",
    alt: "Milgard Ultra Series Fiberglass Windows",
    body: "Superior structural strength and minimal thermal expansion. Fiberglass stands up to heavy rain and marine air without swelling or warping.",
  },
  {
    title: "Premium Vinyl",
    detail: "Low Maintenance",
    image: "/materials/vinyl.jpg",
    alt: "Premium Vinyl Bay Window Installation",
    body: "A cost-effective frame with strong energy efficiency. Premium vinyl does not need painting, and it holds its color in wet Pacific Northwest weather.",
  },
  {
    title: "Wood & Wood-Clad",
    detail: "Andersen",
    image: "/materials/wood-clad.jpg",
    alt: "Andersen Wood and Wood-Clad Windows",
    body: "Classic Pacific Northwest interior warmth, with exterior cladding that takes the weather so the wood inside stays protected.",
  },
  {
    title: "Thermally Broken Aluminum",
    detail: "Architectural Lines",
    image: "/materials/aluminum.jpg",
    alt: "Thermally Broken Architectural Aluminum Windows",
    body: "Crisp sightlines and high structural rigidity for modern homes. A thermal break keeps the metal frame from carrying cold inside.",
  },
];

export default function WindowMaterialsPage() {
  const [preference, setPreference] = useState("");

  function requestMaterial(title: string) {
    setPreference(title);
    document.getElementById("window-quote")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.setTimeout(() => {
      document.getElementById("window-quote-preference")?.focus();
    }, 250);
  }

  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <div className="flex min-h-screen flex-col lg:h-dvh lg:min-h-0 lg:overflow-hidden">
        <Header />
        <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 py-4 sm:px-5 lg:min-h-0 lg:px-5 lg:py-5">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
              { label: "Window Replacement", href: "/services/window-replacement" },
              { label: "Materials" },
            ]}
          />
          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-6 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1B2A4A]/70">
                Window Replacement
              </p>
              <h1 className="mt-3 max-w-3xl font-serif text-4xl font-medium tracking-tight text-[#1B2A4A] lg:text-5xl">
                Window Materials Guide
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#1B2A4A]/85">
                Compare durability, upkeep, and thermal performance before you
                choose a frame. We walk through what each material does in rain,
                marine air, and the temperature swings of a Greater Seattle home.
              </p>
            </div>
            <div className="w-full shrink-0 lg:max-h-full lg:w-96 lg:overflow-y-auto">
              <WindowQuoteBox preference={preference} onPreferenceChange={setPreference} />
            </div>
          </div>
        </main>
      </div>

      <section className="border-t border-[#1B2A4A]/10">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-16 sm:px-5 md:grid-cols-2 lg:py-20">
          {materials.map((material) => (
            <article
              key={material.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="relative h-48 w-full sm:h-52">
                <Image
                  src={material.image}
                  alt={material.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-grow flex-col justify-between p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {material.detail}
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-[#1B2A4A]">
                    {material.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#1B2A4A]/80">{material.body}</p>
                </div>
                <button
                  type="button"
                  onClick={() => requestMaterial(material.title)}
                  className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Request Quote for this Material
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

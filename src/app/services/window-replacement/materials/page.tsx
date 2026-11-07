"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { WindowQuoteBox } from "@/components/WindowQuoteBox";

const materials = [
  {
    title: "Fiberglass",
    detail: "Milgard Ultra series",
    body: "Superior structural strength and minimal thermal expansion. Fiberglass stands up to heavy rain and marine air without swelling or warping.",
  },
  {
    title: "Premium Vinyl",
    detail: "Low maintenance",
    body: "A cost-effective frame with strong energy efficiency. Premium vinyl does not need painting, and it holds its color in wet Pacific Northwest weather.",
  },
  {
    title: "Wood & Wood-Clad",
    detail: "Andersen",
    body: "Classic Pacific Northwest interior warmth, with exterior cladding that takes the weather so the wood inside stays protected.",
  },
  {
    title: "Thermally Broken Aluminum",
    detail: "Architectural lines",
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
            <article key={material.title} className="flex flex-col rounded-2xl border border-[#1B2A4A]/10 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1B2A4A]/60">
                {material.detail}
              </p>
              <h2 className="mt-2 font-serif text-3xl tracking-tight text-[#1B2A4A]">
                {material.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#1B2A4A]/80">{material.body}</p>
              <button
                type="button"
                onClick={() => requestMaterial(material.title)}
                className="mt-6 w-fit rounded-full border border-[#1B2A4A]/20 px-4 py-2.5 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-[#F4EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              >
                Request Quote for this Material
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

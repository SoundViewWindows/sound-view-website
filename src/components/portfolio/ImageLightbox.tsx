"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { PortfolioImage } from "@/lib/portfolio-categories";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function ImageLightbox({ images, categoryName }: { images: PortfolioImage[]; categoryName: string }) {
  const titleId = useId();
  const [active, setActive] = useState<PortfolioImage | null>(null);

  useEffect(() => {
    if (!active) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <article
            key={image.src}
            className="group overflow-hidden rounded-2xl bg-[#0F1D2E] shadow-md"
            style={{ backgroundColor: "#0F1D2E" }}
          >
            <button
              type="button"
              onClick={() => setActive(image)}
              className={`block w-full text-left ${focusRing}`}
            >
              <span className="relative block aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="block bg-[#0F1D2E] px-5 py-4" style={{ backgroundColor: "#0F1D2E", color: "#FFFFFF" }}>
                <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">{categoryName}</span>
                <span className="mt-1 block text-lg font-bold leading-snug text-white">{image.title}</span>
                <span className="mt-1 block text-sm text-slate-300">{image.area}</span>
              </span>
            </button>
          </article>
        ))}
      </div>
      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1D2E]/80 p-4"
          role="presentation"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-xl bg-white p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-4 px-2 pt-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">{active.area}</p>
                <h2 id={titleId} className="text-xl font-bold text-[#0B192C]">
                  {active.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className={`rounded-md bg-[#0F1D2E] px-3 py-2 text-sm font-semibold text-white ${focusRing}`}
              >
                Close
              </button>
            </div>
            <img src={active.src} alt={active.alt} className="max-h-[70vh] w-full rounded-lg object-contain" />
            <p className="px-2 py-3 text-sm leading-6 text-[#556980]">{active.highlights}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

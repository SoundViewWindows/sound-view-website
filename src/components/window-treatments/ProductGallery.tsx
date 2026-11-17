"use client";

import { useState } from "react";
import type { TreatmentImage } from "@/lib/window-treatments";

export function ProductGallery({ images }: { images: TreatmentImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div>
      <div className="overflow-hidden rounded-[4px] border border-slate-200/80 bg-[#F4F6F9]">
        <img
          src={active.src}
          alt={active.alt}
          className="aspect-[4/3] w-full object-contain"
        />
      </div>
      {images.length > 1 ? (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const selected = index === activeIndex;
            return (
              <li key={image.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show image ${index + 1}: ${image.alt}`}
                  aria-pressed={selected}
                  className={`block h-16 w-16 overflow-hidden rounded-[4px] border bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] sm:h-20 sm:w-20 ${
                    selected
                      ? "border-[#0284C7]"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <img
                    src={image.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

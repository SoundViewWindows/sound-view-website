"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type ServiceFunnelCarouselProps = {
  children: ReactNode;
  className?: string;
};

const arrowClassName =
  "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-500/80 bg-[#0F1D2E]/95 text-white shadow-xl backdrop-blur-xs transition-all hover:border-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#0F1D2E] sm:h-12 sm:w-12";

export function ServiceFunnelCarousel({ children, className }: ServiceFunnelCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    setCanScrollLeft(container.scrollLeft > 4);
    setCanScrollRight(maxScroll - container.scrollLeft > 4);
  }, []);

  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState, children]);

  function scrollByCards(direction: -1 | 1) {
    const container = scrollerRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction * Math.max(container.clientWidth * 0.52, 300),
      behavior: "smooth",
    });
  }

  return (
    <div className={`group relative ${className ?? ""}`.trim()}>
      <div
        ref={scrollerRef}
        className="flex flex-nowrap items-stretch gap-5 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] sm:gap-6 [&::-webkit-scrollbar]:hidden [&>*]:h-[490px] [&>*]:w-[280px] [&>*]:shrink-0 [&>*]:snap-start [&>*]:flex [&>*]:flex-col sm:[&>*]:h-[510px] sm:[&>*]:w-[300px] lg:[&>*]:w-[calc((100%-72px)/4)]"
      >
        {children}
      </div>
      {canScrollLeft ? (
        <button
          type="button"
          className={`${arrowClassName} left-2 sm:-left-5`}
          aria-label="Scroll left to see previous options"
          onClick={() => scrollByCards(-1)}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
      {canScrollRight ? (
        <button
          type="button"
          className={`${arrowClassName} right-2 sm:-right-5`}
          aria-label="Scroll right to see more options"
          onClick={() => scrollByCards(1)}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

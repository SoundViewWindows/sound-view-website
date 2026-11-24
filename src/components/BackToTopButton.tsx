"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const [homeQuoteOpen, setHomeQuoteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.body;
    const sync = () => setHomeQuoteOpen(root.dataset.quoteOpen === "true");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-quote-open"] });
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 bottom-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-700/80 bg-[#0F1D2E] text-white shadow-lg transition-all duration-200 hover:border-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#0F1D2E] hover:shadow-xl sm:right-7 sm:bottom-8 sm:h-12 sm:w-12 ${
        homeQuoteOpen ? "lg:right-[376px] xl:right-[406px]" : ""
      } ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ChevronUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}

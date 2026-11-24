"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FlushQuoteSidebar } from "@/components/FlushQuoteSidebar";

export const OPEN_QUOTE_DRAWER_EVENT = "open-quote-drawer";

export function openQuoteDrawer() {
  window.dispatchEvent(new Event(OPEN_QUOTE_DRAWER_EVENT));
}

export function QuoteDrawerButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={openQuoteDrawer}>
      {children}
    </button>
  );
}

export function QuoteSlideIn({
  formName,
  id = "quote-drawer",
}: {
  formName: string;
  id?: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [forcedOpen, setForcedOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    function syncDesktop() {
      setDesktop(media.matches);
    }
    function onScroll() {
      setPastHero(window.scrollY > 650);
    }
    function onOpen() {
      setDismissed(false);
      setForcedOpen(true);
      window.setTimeout(() => {
        document.getElementById("quote-name")?.focus();
      }, 60);
    }

    syncDesktop();
    onScroll();
    media.addEventListener("change", syncDesktop);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(OPEN_QUOTE_DRAWER_EVENT, onOpen);
    window.addEventListener("about-open-quote", onOpen);
    return () => {
      media.removeEventListener("change", syncDesktop);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(OPEN_QUOTE_DRAWER_EVENT, onOpen);
      window.removeEventListener("about-open-quote", onOpen);
    };
  }, []);

  const visible = forcedOpen || (desktop && pastHero && !dismissed);

  function closePanel() {
    setForcedOpen(false);
    setDismissed(true);
  }

  function openPanel() {
    setDismissed(false);
    setForcedOpen(true);
    window.setTimeout(() => {
      document.getElementById("quote-name")?.focus();
    }, 60);
  }

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-lg bg-[#38BDF8] px-2 py-4 text-xs font-bold uppercase tracking-wider text-[#0F1D2E] shadow-lg transition-opacity duration-300 [writing-mode:vertical-rl] ${
          visible ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        tabIndex={visible ? -1 : 0}
        aria-hidden={visible}
      >
        Free Quote
      </button>
      <div
        className={`fixed bottom-0 right-0 top-[72px] z-40 w-[min(100vw,360px)] overflow-y-auto bg-[#003d6b] shadow-2xl transition-all duration-500 ease-out xl:w-[390px] ${
          visible
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }`}
        aria-hidden={!visible}
        inert={!visible}
      >
        <button
          type="button"
          onClick={closePanel}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg font-bold text-white hover:bg-white/25"
          aria-label="Close quote form"
        >
          X
        </button>
        <FlushQuoteSidebar
          id={id}
          formName={formName}
          className="!w-full bg-[#003d6b] lg:!w-full xl:!w-full"
        />
      </div>
    </>
  );
}

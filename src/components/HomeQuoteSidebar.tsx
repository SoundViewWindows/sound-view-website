"use client";

import { useEffect, useState } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { OPEN_QUOTE_DRAWER_EVENT } from "@/components/QuoteSlideIn";

export function HomeQuoteSidebar({
  projectType,
  onProjectTypeChange,
  quoteSubmitted,
  onSubmittedChange,
  onDockedChange,
}: {
  projectType: string;
  onProjectTypeChange: (value: string) => void;
  quoteSubmitted: boolean;
  onSubmittedChange: (submitted: boolean) => void;
  onDockedChange: (docked: boolean) => void;
}) {
  const [minimized, setMinimized] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktop, setDesktop] = useState(true);
  const [hasLeftHero, setHasLeftHero] = useState(false);
  const [navBottom, setNavBottom] = useState(54);
  const lockedOpen = desktop && !hasLeftHero;
  const panelOpen = lockedOpen || (desktop ? !minimized : mobileOpen);
  const showTab = hasLeftHero && !panelOpen;

  function expand() {
    setMinimized(false);
    setMobileOpen(true);
    window.setTimeout(() => {
      document.getElementById("quote-name")?.focus();
    }, 60);
  }

  function minimize() {
    if (window.matchMedia("(min-width: 1024px)").matches && !hasLeftHero) return;
    setMinimized(true);
    setMobileOpen(false);
  }

  useEffect(() => {
    onDockedChange(!hasLeftHero);
  }, [hasLeftHero, onDockedChange]);

  useEffect(() => {
    if (panelOpen && desktop) document.body.dataset.quoteOpen = "true";
    else delete document.body.dataset.quoteOpen;
    return () => {
      delete document.body.dataset.quoteOpen;
    };
  }, [panelOpen, desktop]);

  useEffect(() => {
    function syncNav() {
      const visibleHeader = Array.from(document.querySelectorAll("header")).find(
        (el) => el.getBoundingClientRect().height > 0,
      );
      const topOffset = visibleHeader
        ? Math.max(0, Math.round(visibleHeader.getBoundingClientRect().bottom))
        : 0;
      setNavBottom((current) => (current === topOffset ? current : topOffset));
    }
    syncNav();
    window.addEventListener("scroll", syncNav, { passive: true });
    window.addEventListener("resize", syncNav);
    return () => {
      window.removeEventListener("scroll", syncNav);
      window.removeEventListener("resize", syncNav);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const hero = document.getElementById("hero");
    function syncDesktop() {
      setDesktop(media.matches);
    }
    syncDesktop();
    media.addEventListener("change", syncDesktop);

    const observer = hero
      ? new IntersectionObserver(([entry]) => {
          setHasLeftHero(!entry.isIntersecting);
        })
      : null;
    if (hero && observer) observer.observe(hero);

    if (window.location.hash === "#homepage-quote-box") expand();
    function onOpen() {
      expand();
    }
    window.addEventListener(OPEN_QUOTE_DRAWER_EVENT, onOpen);
    return () => {
      media.removeEventListener("change", syncDesktop);
      observer?.disconnect();
      window.removeEventListener(OPEN_QUOTE_DRAWER_EVENT, onOpen);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={expand}
        className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-lg bg-[#38BDF8] px-2 py-4 text-xs font-bold uppercase tracking-wider text-[#0F1D2E] shadow-lg transition-opacity duration-300 [writing-mode:vertical-rl] ${
          showTab ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        tabIndex={showTab ? 0 : -1}
        aria-hidden={!showTab}
      >
        FREE QUOTE
      </button>
      <aside
        id="homepage-quote-box"
        className={`home-quote-follow fixed bottom-0 right-0 z-40 flex w-[360px] max-w-full flex-col overflow-y-auto bg-[#003d6b] shadow-2xl transition-transform duration-300 ease-out xl:w-[390px] ${
          mobileOpen ? "block" : "hidden lg:block"
        } ${panelOpen ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full"}`}
        style={{ top: `${navBottom}px` }}
        aria-hidden={!panelOpen}
        inert={!panelOpen}
      >
        <div className="flex min-h-full flex-1 flex-col bg-[#003d6b] text-white">
        <button
          type="button"
          onClick={minimize}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg font-bold text-white transition-opacity duration-200 hover:bg-white/25 ${
            lockedOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
          }`}
          tabIndex={lockedOpen ? -1 : 0}
          aria-hidden={lockedOpen}
          aria-label="Minimize quote form"
        >
          X
        </button>
        {quoteSubmitted ? null : (
          <div className="px-6 pb-2 pt-6 pr-12 text-center sm:px-8 sm:pt-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8] sm:text-sm">
              Special Offer
            </p>
            <p className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[28px] lg:text-[30px]">
              Save 10% on Labor
            </p>
            <p className="mt-1.5 text-sm italic text-sky-100/95 sm:text-[15px]">
              Book your project by November 30th.
            </p>
          </div>
        )}
        <div
          className={
            quoteSubmitted
              ? "flex min-h-0 flex-1 flex-col items-center justify-start overflow-y-auto px-6 pb-6 text-center sm:px-7"
              : "mt-5 min-h-0 flex-1 px-6 pb-6 sm:px-7"
          }
        >
          <QuoteRequestForm
            projectType={projectType}
            onProjectTypeChange={onProjectTypeChange}
            onSubmittedChange={onSubmittedChange}
          />
        </div>
        </div>
      </aside>
    </>
  );
}

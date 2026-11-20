"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "soundview_cookie_consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (!stored) {
      setIsMounted(true);
      setIsVisible(true);
    }
  }, []);

  function choose(choice: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // The banner still closes when storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: choice }));
    setIsVisible(false);
    window.setTimeout(() => setIsMounted(false), 200);
  }

  if (!isMounted) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-[330px] transition-all duration-200 sm:bottom-6 sm:left-6 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <div className="rounded-2xl border border-slate-700/80 bg-[#0F1D2E]/95 p-4 shadow-2xl backdrop-blur-md">
        <p className="text-xs leading-relaxed text-slate-300">
          We use cookies to improve your browsing experience and analyze site traffic. Read our{" "}
          <Link
            href="/privacy-policy"
            className="text-[#38BDF8] underline underline-offset-2 hover:text-sky-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="flex-1 cursor-pointer rounded-lg bg-[#38BDF8] px-3 py-2 text-xs font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose("declined")}
            className="flex-1 cursor-pointer rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

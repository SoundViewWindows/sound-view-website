"use client";

import { useState, type ReactNode } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";

export function HeroQuoteLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-stretch justify-between bg-[#0B192C] text-white lg:flex-row">
      <div
        className="min-w-0 flex-1 px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
        style={{ paddingTop: "56px", paddingBottom: "56px" }}
      >
        {children}
      </div>
      <HeroQuoteSidebar />
    </section>
  );
}

export function HeroQuoteSidebar() {
  const [projectType, setProjectType] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  return (
    <div className="flex w-full shrink-0 px-4 pb-12 sm:px-6 lg:w-[330px] lg:px-0 lg:pb-0 xl:w-[360px]">
      <aside className="mx-auto flex w-full max-w-xl flex-col bg-[#003d6b] p-6 text-white sm:p-7 lg:mx-0 lg:h-full lg:max-w-none">
        {quoteSubmitted ? null : (
          <div className="mb-6 text-center">
            <p className="mb-1 text-[11px] font-black uppercase tracking-wider text-home-accent">
              Special Offer
            </p>
            <p className="mb-1 text-2xl font-black leading-snug tracking-tight text-white">
              Save 10% on Labor
            </p>
            <p className="text-xs font-medium text-home-mist">
              Book your project by November 30th.
            </p>
          </div>
        )}
        <div
          className={
            quoteSubmitted
              ? "flex min-h-0 flex-1 flex-col items-center justify-start overflow-y-auto text-center"
              : "min-h-0 flex-1"
          }
        >
          <QuoteRequestForm
            projectType={projectType}
            onProjectTypeChange={setProjectType}
            onSubmittedChange={setQuoteSubmitted}
          />
        </div>
      </aside>
    </div>
  );
}

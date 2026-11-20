"use client";

import { useState } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";

export function FinancingQuoteSidebar() {
  const [projectType, setProjectType] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  return (
    <aside className="flex w-full shrink-0 flex-col self-stretch bg-[#003d6b] pt-0 text-white lg:w-[380px] xl:w-[420px]">
      <div className="px-6 py-8 sm:px-8 lg:sticky lg:top-20">
        {quoteSubmitted ? null : (
          <div className="text-center">
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
        <div className={quoteSubmitted ? "min-h-0" : "mt-5 min-h-0"}>
          <QuoteRequestForm
            projectType={projectType}
            onProjectTypeChange={setProjectType}
            onSubmittedChange={setQuoteSubmitted}
          />
        </div>
      </div>
    </aside>
  );
}

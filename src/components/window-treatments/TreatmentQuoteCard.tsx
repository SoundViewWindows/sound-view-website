"use client";

import { useState } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";

export function TreatmentQuoteCard({ productTitle }: { productTitle: string }) {
  const [projectType, setProjectType] = useState("window-blinds-shades");
  const [submitted, setSubmitted] = useState(false);

  return (
    <aside className="rounded-[4px] bg-[#003d6b] p-6 text-white sm:p-7">
      {submitted ? null : (
        <div className="-mx-6 -mt-6 px-6 py-6 text-center sm:-mx-7 sm:-mt-7 sm:px-8 sm:py-7">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8] sm:text-sm">
            Special Offer
          </p>
          <p className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[28px]">
            Save 10% on Labor
          </p>
          <p className="mt-1.5 text-sm italic text-sky-100/95">
            Book your project by November 30th.
          </p>
        </div>
      )}
      <div className={submitted ? "" : "mt-5"}>
        <QuoteRequestForm
          projectType={projectType}
          onProjectTypeChange={setProjectType}
          onSubmittedChange={setSubmitted}
          heading={`Get a Free Quote for ${productTitle}`}
          subtitle={`Tell us about your ${productTitle} and our team will follow up with options and pricing.`}
          detailsPlaceholder={`Notes about your ${productTitle}`}
          extraAnswers={[{ label: "Window treatment", value: productTitle }]}
          formName="Window treatment quote"
        />
      </div>
    </aside>
  );
}

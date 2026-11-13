"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";

export function HeroQuoteLayout({
  children,
  sectionClassName = "",
  sectionStyle,
  contentStyle,
}: {
  children: ReactNode;
  sectionClassName?: string;
  sectionStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}) {
  return (
    <section className={`bg-[#0B192C] text-white ${sectionClassName}`} style={sectionStyle}>
      <div
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
        style={{ paddingTop: "52px", paddingBottom: "52px", ...contentStyle }}
      >
        <div className="min-w-0 lg:col-span-6">{children}</div>
        <div className="w-full lg:col-span-6">
          <HeroQuoteCard />
        </div>
      </div>
    </section>
  );
}

function HeroQuoteCard() {
  const [projectType, setProjectType] = useState("");

  return (
    <aside className="w-full rounded-2xl border border-white/15 bg-[#04528A] p-5 text-white shadow-2xl sm:p-6">
      <QuoteRequestForm
        variant="horizontal"
        projectType={projectType}
        onProjectTypeChange={setProjectType}
      />
    </aside>
  );
}

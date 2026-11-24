"use client";

import type { ReactNode } from "react";
import { openQuoteDrawer, QuoteSlideIn } from "@/components/QuoteSlideIn";

export function AboutQuoteOpenButton({
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

export function AboutQuoteSlideIn() {
  return <QuoteSlideIn id="about-quote" formName="about-quote" />;
}

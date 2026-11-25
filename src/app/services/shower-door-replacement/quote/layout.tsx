import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/shower-door-replacement/quote"),
  },
  title: "Get a Free Custom Shower Door Estimate in Greater Seattle | Sound View Window & Door",
  description:
    "Request a free custom shower door estimate in Greater Seattle. Compare glass, hardware, and layouts with careful measurement and professional installation.",
};

export default function ShowerQuoteLayout({ children }: { children: ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/glass-replacement/quote"),
  },
  title: "Get a Free Residential Glass Replacement Estimate in Greater Seattle | Sound View Window & Door",
  description:
    "Request a free residential glass replacement estimate in Greater Seattle, including insulated glass, clear pricing, and professional installation.",
};

export default function GlassQuoteLayout({ children }: { children: ReactNode }) {
  return children;
}

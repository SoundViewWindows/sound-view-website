import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/window-replacement/quote"),
  },
  title: "Get a Free Window Replacement Quote in Greater Seattle | Sound View Window & Door",
  description:
    "Request a free window replacement estimate in Greater Seattle, with upfront itemized pricing, professional installation, and zero sales pressure.",
};

export default function WindowQuoteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/door-replacement/quote"),
  },
  title: "Get a Free Door Replacement Quote in Greater Seattle | Sound View Window & Door",
  description:
    "Request a free entry and patio door replacement estimate in Greater Seattle, with clear pricing, professional installation, and no-pressure guidance.",
};

export default function DoorQuoteLayout({ children }: { children: ReactNode }) {
  return children;
}

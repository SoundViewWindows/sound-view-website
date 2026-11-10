import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/door-replacement/quote"),
  },
  title: "Door Estimate | Sound View Window & Door",
  description:
    "Request upfront pricing for replacement doors across the Greater Seattle Area.",
};

export default function DoorQuoteLayout({ children }: { children: ReactNode }) {
  return children;
}

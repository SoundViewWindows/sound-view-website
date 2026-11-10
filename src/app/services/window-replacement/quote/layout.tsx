import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/window-replacement/quote"),
  },
  title: "Window Estimate | Sound View Window & Door",
  description:
    "Request upfront pricing for replacement windows across the Greater Seattle Area.",
};

export default function WindowQuoteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

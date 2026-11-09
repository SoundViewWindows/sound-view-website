import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shower Door Estimate | Sound View Window & Door",
  description:
    "Request upfront pricing for custom shower doors across the Greater Seattle Area.",
};

export default function ShowerQuoteLayout({ children }: { children: ReactNode }) {
  return children;
}

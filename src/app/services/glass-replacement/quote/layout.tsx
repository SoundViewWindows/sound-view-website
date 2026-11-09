import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Glass Estimate | Sound View Window & Door",
  description:
    "Request upfront pricing for glass replacement across the Greater Seattle Area.",
};

export default function GlassQuoteLayout({ children }: { children: ReactNode }) {
  return children;
}

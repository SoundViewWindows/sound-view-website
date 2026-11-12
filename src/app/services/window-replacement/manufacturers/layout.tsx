import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/window-replacement/manufacturers"),
  },
  title: "Window Manufacturers | Sound View Window & Door",
  description:
    "Compare Milgard, Andersen, Ply Gem, STILE, and Jeld-Wen windows, or let a specialist recommend a brand.",
};

export default function WindowManufacturersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

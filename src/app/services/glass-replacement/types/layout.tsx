import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/glass-replacement/types"),
  },
  title: "Glass Replacement Types | Sound View Window & Door",
  description:
    "Insulated, tempered, laminated, and Low-E glass replacement for Greater Seattle homes.",
};

export default function GlassTypesLayout({ children }: { children: ReactNode }) {
  return children;
}

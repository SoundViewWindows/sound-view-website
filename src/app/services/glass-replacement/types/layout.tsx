import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.glass),
  },
  title: "Glass Replacement Types | Sound View Window & Door",
  description:
    "Insulated, tempered, laminated, and Low-E glass replacement for Greater Seattle homes.",
};

export default function GlassTypesLayout({ children }: { children: ReactNode }) {
  return children;
}

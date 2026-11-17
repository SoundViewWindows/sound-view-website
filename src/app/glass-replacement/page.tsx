import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl(publicPaths.glass) },
  title: "Glass Replacement Types | Sound View Window & Door",
  description: "Insulated, tempered, laminated, and Low-E glass replacement for Greater Seattle homes.",
  openGraph: {
    title: "Glass Replacement Types | Sound View Window & Door",
    description: "Insulated, tempered, laminated, and Low-E glass replacement for Greater Seattle homes.",
    url: canonicalUrl(publicPaths.glass),
    type: "website",
  },
};

export { default } from "../services/glass-replacement/types/page";

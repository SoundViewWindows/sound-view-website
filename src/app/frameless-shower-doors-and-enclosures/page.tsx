import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl(publicPaths.shower) },
  title: "Shower Door Styles | Sound View Window & Door",
  description: "Framed, semi-frameless, frameless, and barn-door shower enclosures for Greater Seattle bathrooms.",
  openGraph: {
    title: "Shower Door Styles | Sound View Window & Door",
    description: "Framed, semi-frameless, frameless, and barn-door shower enclosures for Greater Seattle bathrooms.",
    url: canonicalUrl(publicPaths.shower),
    type: "website",
  },
};

export { default } from "../services/shower-door-replacement/types/page";

import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl(publicPaths.doors) },
  title: "Door Styles | Sound View Window & Door",
  description: "Entry, patio, French, and swinging replacement doors for Greater Seattle homes.",
  openGraph: {
    title: "Door Styles | Sound View Window & Door",
    description: "Entry, patio, French, and swinging replacement doors for Greater Seattle homes.",
    url: canonicalUrl(publicPaths.doors),
    type: "website",
  },
};

export { default } from "../services/door-replacement/types/page";

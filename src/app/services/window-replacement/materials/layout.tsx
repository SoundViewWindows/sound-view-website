import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.windows),
  },
  title: "Window Materials Guide | Sound View Window & Door",
  description:
    "Compare vinyl, wood, fiberglass, aluminum, and composite windows for Greater Seattle weather.",
};

export default function WindowMaterialsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

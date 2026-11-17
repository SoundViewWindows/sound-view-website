import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.windows),
  },
  title: "Window Replacement | Sound View Window & Door",
  description:
    "Replacement windows engineered for Pacific Northwest weather and installed with care across the Greater Seattle Area.",
};

export default function WindowReplacementPage() {
  redirect(publicPaths.windows);
}

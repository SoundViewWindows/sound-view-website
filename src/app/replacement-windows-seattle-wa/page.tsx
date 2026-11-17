import { Suspense } from "react";
import type { Metadata } from "next";
import { MaterialsStep } from "../services/window-replacement/materials/materials-step";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl(publicPaths.windows) },
  title: "Window Materials Guide | Sound View Window & Door",
  description: "Compare vinyl, wood, fiberglass, aluminum, and composite windows for Greater Seattle weather.",
  openGraph: {
    title: "Window Materials Guide | Sound View Window & Door",
    description: "Compare vinyl, wood, fiberglass, aluminum, and composite windows for Greater Seattle weather.",
    url: canonicalUrl(publicPaths.windows),
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<p className="bg-home-canvas px-4 py-16 text-center text-[#E7EEF3]">Loading frame materials.</p>}>
      <MaterialsStep />
    </Suspense>
  );
}

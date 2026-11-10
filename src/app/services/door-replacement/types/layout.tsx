import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/door-replacement/types"),
  },
  title: "Door Styles | Sound View Window & Door",
  description:
    "Entry, patio, French, and swinging replacement doors for Greater Seattle homes.",
};

export default function DoorTypesLayout({ children }: { children: ReactNode }) {
  return children;
}

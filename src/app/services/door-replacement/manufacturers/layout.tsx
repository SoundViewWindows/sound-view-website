import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/door-replacement/manufacturers"),
  },
  title: "Door Manufacturers | Sound View Window & Door",
  description:
    "Compare Therma-Tru, Simpson, Codel, Rogue Valley, Larson, Andersen, Milgard, STILE, and Jeld-Wen doors, or let a specialist recommend a brand.",
};

export default function DoorManufacturersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

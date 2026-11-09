import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shower Door Styles | Sound View Window & Door",
  description:
    "Framed, semi-frameless, frameless, and barn-door shower enclosures for Greater Seattle bathrooms.",
};

export default function ShowerTypesLayout({ children }: { children: ReactNode }) {
  return children;
}

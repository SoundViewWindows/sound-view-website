import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Door Styles | Sound View Window & Door",
  description:
    "Entry, patio, French, and swinging replacement doors for Greater Seattle homes.",
};

export default function DoorTypesLayout({ children }: { children: ReactNode }) {
  return children;
}

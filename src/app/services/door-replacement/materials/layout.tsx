import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Door Materials | Sound View Window & Door",
  description:
    "Wood, steel, and glass replacement doors suited to Greater Seattle weather.",
};

export default function DoorMaterialsLayout({ children }: { children: ReactNode }) {
  return children;
}

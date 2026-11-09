import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
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

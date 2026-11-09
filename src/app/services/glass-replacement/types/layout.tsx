import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Glass Replacement Types | Sound View Window & Door",
  description:
    "Insulated, tempered, laminated, and Low-E glass replacement for Greater Seattle homes.",
};

export default function GlassTypesLayout({ children }: { children: ReactNode }) {
  return children;
}

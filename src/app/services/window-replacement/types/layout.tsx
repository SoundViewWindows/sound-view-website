import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Window Styles & Operating Types | Sound View Window & Door",
  description:
    "Casement, hung, sliding, picture, bay, bow, and custom windows for Greater Seattle homes.",
};

export default function WindowTypesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

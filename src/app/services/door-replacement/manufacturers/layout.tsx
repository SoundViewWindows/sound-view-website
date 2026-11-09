import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Door Manufacturers | Sound View Window & Door",
  description:
    "Compare Therma-Tru, Simpson, Codel, Andersen, Milgard, and Western Window Systems doors, or let a specialist recommend a brand.",
};

export default function DoorManufacturersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

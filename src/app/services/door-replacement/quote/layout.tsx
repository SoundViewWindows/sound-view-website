import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Door Estimate | Sound View Window & Door",
  description:
    "Request upfront pricing for replacement doors across the Greater Seattle Area.",
};

export default function DoorQuoteLayout({ children }: { children: ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { canonicalUrl } from "@/config/site";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/book-appointment"),
  },
  title: "Book Appointment | Sound View Window & Door",
  description:
    "Choose a date and time for a relaxed, zero-pressure consultation with a local Sound View specialist.",
};

export default function BookAppointmentLayout({ children }: { children: ReactNode }) {
  return children;
}

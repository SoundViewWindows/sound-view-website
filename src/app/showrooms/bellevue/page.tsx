import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { ShowroomLocation } from "@/components/showrooms/ShowroomLocation";
import { getShowroom } from "@/data/showrooms";

const room = getShowroom("bellevue");

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(room.href),
  },
  title: "Bellevue Showroom | Sound View Window & Door",
  description: room.metaDescription,
};

export default function BellevueShowroomPage() {
  return <ShowroomLocation slug="bellevue" />;
}
import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { ShowroomLocation } from "@/components/showrooms/ShowroomLocation";
import { getShowroom } from "@/data/showrooms";

const room = getShowroom("west-queen-anne");

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(room.href),
  },
  title: "West Queen Anne Showroom | Sound View Window & Door",
  description: room.metaDescription,
};

export default function WestQueenAnneShowroomPage() {
  return <ShowroomLocation slug="west-queen-anne" />;
}

import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { ShowroomLocation } from "@/components/showrooms/ShowroomLocation";
import { getShowroom } from "@/data/showrooms";

const room = getShowroom("lake-city");

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(room.href),
  },
  title: "Lake City Showroom | Sound View Window & Door",
  description: room.metaDescription,
};

export default function LakeCityShowroomPage() {
  return <ShowroomLocation slug="lake-city" />;
}

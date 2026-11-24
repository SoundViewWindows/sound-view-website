import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { QuoteSlideIn } from "@/components/QuoteSlideIn";
import { ShowroomsIndexHero } from "@/components/showrooms/ShowroomsIndexHero";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/showrooms"),
  },
  title: "Showrooms | Sound View Window & Door",
  description:
    "Visit Sound View Window & Door showrooms in Lake City, West Queen Anne, and Bellevue. See full-scale windows, doors, and custom glass with non-commissioned product specialists.",
};

export default function ShowroomsPage() {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <QuoteSlideIn id="showrooms-quote" formName="showrooms-quote" />
      <main>
        <ShowroomsIndexHero />
        <CtaBanner quoteDrawer />
      </main>
    </div>
  );
}

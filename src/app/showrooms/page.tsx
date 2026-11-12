import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { ShowroomCards, ShowroomHero } from "@/components/showrooms/ShowroomSections";

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
      <main>
        <ShowroomHero
          eyebrow="Visit Our Pacific Northwest Showrooms"
          title="Experience Windows & Doors in Person"
          subtitle="Touch full-scale display units, test hardware operation, and discuss project specifications with non-commissioned product specialists."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Showrooms" }]}
        />
        <section className="bg-[#F4FAFD] py-16 sm:py-20">
          <ShowroomCards />
        </section>
        <CtaBanner />
      </main>
    </div>
  );
}

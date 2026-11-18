import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { showrooms } from "@/data/showrooms";
import { SoundViewPageHero } from "@/components/SoundViewPageHero";
import { ShowroomCards } from "@/components/showrooms/ShowroomSections";

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
        <SoundViewPageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Showrooms" }]}
          eyebrow="GREATER SEATTLE SHOWROOMS"
          title="Our Greater Seattle Showrooms"
          subtitle="Test full-size window, entry door, shower glass, and window treatment displays in person at Lake City, West Queen Anne, or Bellevue."
          primaryAction={{ label: "Book Showroom Appointment", href: "/book-appointment" }}
          secondaryAction={{ label: "Call (206) 331-4296", href: "tel:+12063314296" }}
          cards={showrooms.map((room) => ({
            title: `${room.name} Showroom`,
            body: `${room.address}. ${room.hours[0]?.day}: ${room.hours[0]?.time}. ${room.phone}.`,
          }))}
        />
        <section className="bg-[#F4FAFD] py-16 sm:py-20">
          <ShowroomCards />
        </section>
        <CtaBanner />
      </main>
    </div>
  );
}

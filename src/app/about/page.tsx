import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Link from "next/link";
import { Compass, Ruler, Wrench } from "lucide-react";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { HeroQuoteLayout } from "@/components/HeroQuoteSidebar";
import { WhyChooseSoundView } from "@/components/WhyChooseSoundView";
import { BOOKING_URL } from "@/config/links";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/about"),
  },
  title: "About Us | Sound View Window & Door",
  description:
    "Sound View Window & Door helps Greater Seattle homeowners and builders choose windows, doors, and custom glass with honest guidance and no high-pressure sales.",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const workSystem = [
  {
    title: "Thoughtful Product Guidance",
    body: "Every home and project is different. We help customers compare available products, styles, materials, and performance features.",
    icon: Compass,
  },
  {
    title: "Attention to the Details",
    body: "From product selection to measurements and installation planning, the details matter.",
    icon: Ruler,
  },
  {
    title: "Professional Installation",
    body: "Careful preparation, quality workmanship, and respect for the customer's home.",
    icon: Wrench,
  },
];

const showrooms = [
  {
    name: "Lake City Showroom",
    href: "/showrooms/lake-city",
    address: "12301 Lake City Way NE, Seattle, WA 98125",
    phone: "(206) 572-3411",
    phoneHref: "tel:2065723411",
    note: "Monday through Friday, 8:00 AM to 4:30 PM. Closed Saturday and Sunday.",
  },
  {
    name: "West Queen Anne Showroom",
    href: "/showrooms/west-queen-anne",
    address: "921 Elliott Ave W, Seattle, WA 98119",
    phone: "(206) 402-4229",
    phoneHref: "tel:2064024229",
    note: "Monday through Friday, 8:00 AM to 4:30 PM. Closed Saturday and Sunday.",
  },
  {
    name: "Bellevue Showroom",
    href: "/showrooms/bellevue",
    address: "13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005",
    phone: "(425) 417-3005",
    phoneHref: "tel:4254173005",
    note: "Open Monday through Friday by appointment only. Closed weekends.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        <HeroQuoteLayout
          sectionClassName="pb-14"
          sectionStyle={{ paddingBottom: "56px" }}
          contentStyle={{ paddingBottom: "0px" }}
        >
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">About Us</span>
              </li>
            </ol>
          </nav>

          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            Local Pacific Northwest Craftsmanship
          </p>
          <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight text-white lg:text-5xl">
            A Consultative Approach to Windows, Doors, and Glass
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Sound View Window & Door was founded on a simple premise: homeowners
            deserve honest guidance, technical expertise, and zero high-pressure
            sales tactics. We help Puget Sound homeowners and builders navigate
            Pacific Northwest weather with products engineered to perform for
            decades.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#showrooms"
              className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-sky-300 ${focusRing}`}
            >
              Explore Our Showrooms
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-sky-300 ${focusRing}`}
            >
              Book Appointment
            </a>
          </div>
        </HeroQuoteLayout>

        <section
          className="bg-[#F4F6F9] py-14 text-[#0B192C] md:py-16"
          style={{ backgroundColor: "#F4F6F9", paddingTop: "56px", paddingBottom: "56px" }}
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <WhyChooseSoundView layout="hero" />
          </div>
        </section>

        <section
          className="bg-[#E6ECF2] py-16 text-[#0B192C] md:py-20"
          style={{ backgroundColor: "#E6ECF2", paddingTop: "64px", paddingBottom: "64px" }}
          aria-labelledby="work-system-title"
        >
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0284C7] sm:text-sm">
              Our Work System
            </p>
            <h2
              id="work-system-title"
              className="mb-3 text-3xl font-bold text-[#0B192C] sm:text-4xl lg:text-5xl"
            >
              The Sound View Approach
            </h2>
            <div className="mx-auto mb-12 h-1 w-12 rounded-full bg-[#0284C7] sm:mb-16" aria-hidden="true" />
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            {workSystem.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="flex h-full flex-col justify-start rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
                >
                  <Icon className="mb-6 h-8 w-8 text-[#0284C7]" strokeWidth={2.2} aria-hidden="true" />
                  <h3 className="mb-4 text-xl font-bold text-[#0B192C]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="showrooms"
          className="scroll-mt-8 bg-white text-[#0B192C]"
          style={{ backgroundColor: "#FFFFFF", paddingTop: "64px", paddingBottom: "64px" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0090c8]">
              Visit in person
            </p>
            <h2 className="mb-4 max-w-3xl text-3xl font-black text-[#0B192C] sm:text-4xl">
              Showrooms across Greater Seattle
            </h2>
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#556980] sm:text-lg">
              See operable windows, doors, and custom glass before you decide.
              Bring plans, photos, or a rough idea. We will help you sort the
              options.
            </p>
            <div className="grid gap-6 lg:grid-cols-3">
              {showrooms.map((room) => (
                <article
                  key={room.href}
                  className="flex flex-col rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-6 shadow-sm"
                >
                  <h3 className="text-2xl font-black text-[#0B192C]">{room.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#556980]">{room.address}</p>
                  <a
                    href={room.phoneHref}
                    className={`mt-2 w-fit text-lg font-extrabold text-sky-600 underline-offset-4 hover:text-sky-700 hover:underline ${focusRing}`}
                  >
                    {room.phone}
                  </a>
                  <p className="mt-3 text-sm leading-6 text-[#556980]">{room.note}</p>
                  <Link
                    href={room.href}
                    className={`mt-6 inline-flex w-fit items-center justify-center rounded-lg bg-[#0090c8] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#007fb1] ${focusRing}`}
                  >
                    View showroom
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner
          className="py-16 text-white md:py-20 [&_h2]:text-white [&_p]:text-slate-300"
          style={{
            backgroundColor: "#182B3E",
            paddingTop: "64px",
            paddingBottom: "64px",
            borderTop: "none",
          }}
        />
      </main>
    </div>
  );
}

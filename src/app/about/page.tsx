import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BOOKING_URL } from "@/config/links";

export const metadata: Metadata = {
  title: "About Us | Sound View Window & Door",
  description:
    "Sound View Window & Door helps Greater Seattle homeowners and builders choose windows, doors, and custom glass with honest guidance and no high-pressure sales.",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]";

const standards = [
  {
    title: "Zero High-Pressure Sales",
    body: "You get a clear recommendation and time to decide. We do not use urgency scripts, surprise add-ons, or a pitch that only works if you sign today.",
  },
  {
    title: "Honest Technical Guidance",
    body: "We walk through frame materials, glass packages, and hardware in plain language, including how each option handles Pacific Northwest rain, wind, and temperature swings.",
  },
  {
    title: "Local Craftsmanship",
    body: "Measurement, installation, and finish work stay with people who know Greater Seattle homes. Seventeen-plus years in the Pacific Northwest is how we plan the details that keep a job quiet and clean.",
  },
  {
    title: "Products Built for Decades",
    body: "We specify windows, doors, and custom glass meant to perform for the long term, then stand behind the installation with manufacturer warranties and a crew you can call back.",
  },
];

const showrooms = [
  {
    name: "Lake City Showroom",
    href: "/showrooms/lake-city",
    address: "12301 Lake City Way NE, Seattle, WA 98125",
    phone: "(206) 572-3411",
    phoneHref: "tel:2065723411",
    note: "Monday through Friday, 8:00 AM to 5:00 PM. Saturday by appointment.",
  },
  {
    name: "West Queen Anne Showroom",
    href: "/showrooms/west-queen-anne",
    address: "921 Elliott Ave W, Seattle, WA 98119",
    phone: "(206) 402-4229",
    phoneHref: "tel:2064024229",
    note: "Monday through Friday, 8:00 AM to 5:00 PM. Saturday by appointment.",
  },
  {
    name: "Bellevue Showroom",
    href: "/showrooms/bellevue",
    address: "13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005",
    phone: "(425) 417-3005",
    phoneHref: "tel:4254173005",
    note: "Visits are scheduled by appointment only.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-[#1B2A4A] ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">About Us</span>
              </li>
            </ol>
          </nav>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Local Pacific Northwest Craftsmanship
          </p>
          <h1 className="mb-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-[#1B2A4A] lg:text-5xl">
            A Consultative Approach to Windows, Doors, and Glass
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Sound View Window & Door was founded on a simple premise: homeowners
            deserve honest guidance, technical expertise, and zero high-pressure
            sales tactics. We help Puget Sound homeowners and builders navigate
            Pacific Northwest weather with products engineered to perform for
            decades.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#showrooms"
              className={`inline-flex items-center justify-center rounded-lg bg-[#1B2A4A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0F172A] ${focusRing}`}
            >
              Explore Our Showrooms
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-lg bg-[#1B2A4A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0F172A] ${focusRing}`}
            >
              Book Appointment
            </a>
          </div>
        </section>

        <section className="border-t border-[#1B2A4A]/10 bg-[#F3EFEA]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
              How we work
            </p>
            <h2 className="mb-4 max-w-3xl font-serif text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
              The Sound View Standard
            </h2>
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Every consultation, measurement, and installation follows the same
              standard: clear advice, careful work, and products chosen for this
              climate.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {standards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-serif text-xl font-bold leading-snug text-[#1B2A4A]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="showrooms" className="scroll-mt-8 border-t border-[#1B2A4A]/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
              Visit in person
            </p>
            <h2 className="mb-4 max-w-3xl font-serif text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
              Showrooms across Greater Seattle
            </h2>
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              See operable windows, doors, and custom glass before you decide.
              Bring plans, photos, or a rough idea. We will help you sort the
              options.
            </p>
            <div className="grid gap-6 lg:grid-cols-3">
              {showrooms.map((room) => (
                <article
                  key={room.href}
                  className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-serif text-2xl font-bold text-[#1B2A4A]">{room.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{room.address}</p>
                  <a
                    href={room.phoneHref}
                    className={`mt-2 w-fit text-sm font-medium text-[#1B2A4A] underline-offset-4 hover:underline ${focusRing}`}
                  >
                    {room.phone}
                  </a>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{room.note}</p>
                  <Link
                    href={room.href}
                    className={`mt-6 inline-flex w-fit items-center justify-center rounded-lg bg-[#1B2A4A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0F172A] ${focusRing}`}
                  >
                    View showroom
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1B2A4A]">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Ready for a showroom visit?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
              Book a time with a specialist and we will walk through windows,
              doors, and glass with you.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-[#F3EFEA] ${focusRing}`}
            >
              Book Appointment
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

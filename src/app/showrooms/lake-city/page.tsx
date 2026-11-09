import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Lake City Showroom | Sound View Window & Door",
  description:
    "Visit the Sound View Window & Door flagship showroom in Lake City. See operable windows, entry and patio doors, custom glass, and hardware in person.",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]";

const hours = [
  { day: "Monday through Friday", time: "8:00 AM to 5:00 PM" },
  { day: "Saturday", time: "By Appointment" },
  { day: "Sunday", time: "Closed" },
];

const features = [
  {
    title: "Operable Window Wall",
    body: "Operate full-scale fiberglass, vinyl, wood-clad, and aluminum window styles including casement, sliding, awning, and double-hung units.",
  },
  {
    title: "Full-Lite Entry & Patio Doors",
    body: "Test multi-slide patio systems, smooth French doors, and high-security architectural entry doors in real-world wall dimensions.",
  },
  {
    title: "Custom Glass & Hardware Samples",
    body: "Compare shower door glass thicknesses, handle finishes, obscure privacy patterns, and modern railing standoff hardware.",
  },
];

const directionsHref =
  "https://www.google.com/maps/dir/?api=1&destination=12301+Lake+City+Way+NE,+Seattle,+WA+98125";

export default function LakeCityShowroomPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-[#1B2A4A] ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span>Showrooms</span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Lake City</span>
              </li>
            </ol>
          </nav>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            North Seattle Flagship Showroom
          </p>
          <h1 className="mb-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-[#1B2A4A] lg:text-5xl">
            Visit Our Lake City Showroom
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Explore full-scale operable window displays, exterior doors, frameless
            shower enclosures, and hardware in person. Touch the materials, test
            the smooth glide of precision sashes, and consult with local Northwest
            specialists.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className={`rounded-lg bg-[#1B2A4A] px-6 py-3 font-medium text-white transition-colors hover:bg-[#15223C] ${focusRing}`}
            >
              Book a Showroom Visit
            </Link>
            <a
              href="tel:2065723411"
              className={`flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 transition-colors hover:bg-slate-50 ${focusRing}`}
            >
              <PhoneIcon />
              Call (206) 572-3411
            </a>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-[#1B2A4A] transition-colors hover:bg-white ${focusRing}`}
            >
              <MapPinIcon />
              Get Directions
            </a>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative h-80 overflow-hidden rounded-2xl border border-slate-200/80 shadow-md sm:h-96">
            <Image
              src="/showrooms/lake-city.jpg"
              alt="Sound View Window and Door storefront on Lake City Way NE"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>

          <article className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Showroom Address
              </h2>
              <p className="text-lg font-bold text-[#1B2A4A]">
                12301 Lake City Way NE, Seattle, WA 98125
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Convenient storefront parking directly in front of the showroom.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Hours of Operation
              </h2>
              <dl className="space-y-2 text-sm text-slate-700 sm:text-base">
                {hours.map((row) => (
                  <div key={row.day} className="flex items-baseline justify-between gap-4">
                    <dt>{row.day}</dt>
                    <dd className="text-right font-medium text-[#1B2A4A]">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8">
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Direct Line
              </h2>
              <a
                href="tel:2065723411"
                className={`text-lg font-bold text-[#1B2A4A] underline-offset-4 hover:underline ${focusRing}`}
              >
                (206) 572-3411
              </a>
            </div>
          </article>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <iframe
            src="https://maps.google.com/maps?q=12301+Lake+City+Way+NE,+Seattle,+WA+98125&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Map of the Lake City showroom at 12301 Lake City Way NE, Seattle, WA 98125"
            className="h-80 w-full rounded-2xl border border-slate-200 shadow-sm"
            loading="lazy"
            allowFullScreen
          />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-serif text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
            What You Can Explore In Person
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="mb-3 font-serif text-2xl font-bold text-[#1B2A4A]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
            <h2 className="font-serif text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
              Schedule One-on-One Showroom Time
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Walk-ins are always welcome during business hours, but booking
              ahead pairs you with a dedicated window and door specialist
              prepared for your specific project plans.
            </p>
            <Link
              href="/contact"
              className={`mt-6 inline-flex items-center justify-center rounded-lg bg-[#1B2A4A] px-6 py-3 font-medium text-white transition-colors hover:bg-[#15223C] ${focusRing}`}
            >
              Book an Appointment
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.2 3.5h2.1l1 2.6-1.3 1.1a11 11 0 0 0 4.8 4.8l1.1-1.3 2.6 1v2.1c0 .6-.5 1.2-1.1 1.2A12.4 12.4 0 0 1 4.9 4.6c0-.6.6-1.1 1.3-1.1Z"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 17.5s5-4.4 5-8.2A5 5 0 0 0 5 9.3c0 3.8 5 8.2 5 8.2Z" />
      <circle cx="10" cy="9.2" r="1.6" />
    </svg>
  );
}

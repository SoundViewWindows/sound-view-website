import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BOOKING_URL } from "@/config/links";

export const metadata: Metadata = {
  title: "West Queen Anne Showroom | Sound View Window & Door",
  description:
    "Visit the Sound View Window & Door showroom at 921 Elliott Ave W in West Queen Anne. See windows, doors, and custom glass in person, Monday through Friday.",
};

const directionsHref =
  "https://www.google.com/maps/dir/?api=1&destination=921+Elliott+Ave+W,+Seattle,+WA+98119";

const hours = [
  { day: "Monday through Friday", time: "8:00 AM to 5:00 PM" },
  { day: "Saturday", time: "By Appointment" },
  { day: "Sunday", time: "Closed" },
];

const features = [
  {
    title: "Architectural Window Displays",
    body: "Hands-on displays of wood-clad, fiberglass, thermally broken aluminum, and premium vinyl frames from Andersen, Milgard, and top Northwest fabricators.",
  },
  {
    title: "Patio & Entry Door Systems",
    body: "Walk through full-size multi-slide doors, French patio doors, and secure residential entry assemblies built to withstand coastal weather.",
  },
  {
    title: "Custom Glass & Finish Options",
    body: "Inspect heavy frameless shower glass, tint and Low-E thermal coatings, obscurity options, and hardware finishes in natural daylight.",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]";

export default function WestQueenAnneShowroomPage() {
  return (
    <div className="bg-[#F7F5F0] text-[#28323D]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-[#1D2C43] ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span>Showrooms</span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">West Queen Anne</span>
              </li>
            </ol>
          </nav>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Central Seattle Showroom
          </p>
          <h1 className="mb-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-[#1D2C43] lg:text-5xl">
            Visit Our West Queen Anne Showroom
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Experience premier window styles, custom door systems, and architectural
            glass hardware in the heart of Seattle. Test operability firsthand and
            consult with our seasoned window and door specialists.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-lg bg-[#1D2C43] px-6 py-3 font-medium text-white transition-colors hover:bg-[#162433] ${focusRing}`}
            >
              Book a Showroom Visit
            </a>
            <a
              href="tel:2064024229"
              className={`inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 transition-colors hover:bg-slate-50 ${focusRing}`}
            >
              <PhoneIcon />
              Call (206) 402-4229
            </a>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-[#1D2C43] transition-colors hover:bg-white ${focusRing}`}
            >
              <MapPinIcon />
              Get Directions
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <Image
              src="/showrooms/west-queen-anne.jpg"
              alt="Sound View Window & Door storefront at 921 Elliott Ave W in West Queen Anne"
              width={1200}
              height={800}
              className="h-80 w-full rounded-2xl border border-slate-200/80 object-cover shadow-md sm:h-96"
            />
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <div>
                <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Showroom Address
                </h2>
                <p className="text-lg font-bold text-[#1D2C43]">
                  921 Elliott Ave W, Seattle, WA 98119
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Conveniently located along the Elliott Avenue corridor with dedicated
                  customer parking.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Hours of Operation
                </h2>
                <dl className="mt-2 space-y-2 text-sm text-[#1D2C43]">
                  {hours.map((row) => (
                    <div key={row.day} className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                      <dt>{row.day}</dt>
                      <dd className="font-medium">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8">
                <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Direct Line
                </h2>
                <a
                  href="tel:2064024229"
                  className={`text-lg font-bold text-[#1D2C43] underline-offset-4 hover:underline ${focusRing}`}
                >
                  (206) 402-4229
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <iframe
              src="https://maps.google.com/maps?q=921+Elliott+Ave+W,+Seattle,+WA+98119&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="Map of the West Queen Anne showroom at 921 Elliott Ave W, Seattle"
              className="h-80 w-full rounded-2xl border border-slate-200 shadow-sm"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-serif text-3xl font-bold text-[#1D2C43] sm:text-4xl">
            What You Can Explore In Person
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="mb-3 font-serif text-xl font-bold text-[#1D2C43]">
                  {feature.title}
                </h3>
                <p className="text-base leading-7 text-slate-700">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="font-serif text-3xl font-bold text-[#1D2C43] sm:text-4xl">
              Plan Your Visit with an Expert
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
              Whether you are a homeowner planning a retrofit or a builder reviewing
              blueprint takeoffs, our Queen Anne specialists provide relaxed,
              pressure-free guidance.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex items-center justify-center rounded-lg bg-[#1D2C43] px-6 py-3 font-medium text-white transition-colors hover:bg-[#162433] ${focusRing}`}
            >
              Book an Appointment
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.2 3.5h2.1l1 2.6-1.3 1.1a11 11 0 0 0 4.8 4.8l1.1-1.3 2.6 1v2.1a1.4 1.4 0 0 1-1.5 1.4A13.4 13.4 0 0 1 4.8 5a1.4 1.4 0 0 1 1.4-1.5Z"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 17.5s5-4.2 5-8.1A5 5 0 0 0 5 9.4c0 3.9 5 8.1 5 8.1Z"
      />
      <circle cx="10" cy="9.2" r="1.6" />
    </svg>
  );
}

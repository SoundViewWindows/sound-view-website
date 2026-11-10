import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BOOKING_URL } from "@/config/links";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/showrooms/bellevue"),
  },
  title: "Bellevue Showroom | Sound View Window & Door",
  description:
    "Visit the Sound View Window & Door Eastside showroom at 13555 NE Bel Red Rd Ste 207 in Bellevue. Showroom visits are scheduled by appointment.",
};

const directionsHref =
  "https://www.google.com/maps/dir/?api=1&destination=13555+NE+Bel+Red+Rd+Ste+207,+Bellevue,+WA+98005";

const mapEmbedSrc =
  "https://maps.google.com/maps?q=13555+NE+Bel+Red+Rd+Ste+207,+Bellevue,+WA+98005&t=&z=15&ie=UTF8&iwloc=&output=embed";

const features = [
  {
    title: "Architectural Window Systems",
    body: "Inspect full-scale wood-clad, thermally broken aluminum, and fiberglass frames engineered for contemporary Northwest architecture.",
  },
  {
    title: "Modern Patio & Scenic Doors",
    body: "Test multi-slide and French patio door operation with precision weatherstripping and advanced security locksets.",
  },
  {
    title: "Custom Glass & Finish Options",
    body: "Review specialty glass tints, high-performance Low-E coatings, obscure privacy patterns, and modern handle hardware in person.",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export default function BellevueShowroomPage() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span>Showrooms</span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Bellevue</span>
              </li>
            </ol>
          </nav>

          <p className="mb-3 inline-flex items-center rounded-full border border-[#94734D]/50 bg-[#132238] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Eastside Showroom (By Appointment Only)
          </p>
          <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight text-white lg:text-5xl">
            Visit Our Bellevue Showroom
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Experience premier window styles, moving glass walls, and custom door
            displays on the Eastside. To give every homeowner and contractor
            dedicated one-on-one attention, visits to our Bellevue showroom are
            scheduled by appointment.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 font-medium text-[#0B192C] transition-colors hover:bg-sky-300 ${focusRing}`}
            >
              Book a Showroom Visit
            </a>
            <a
              href="tel:4254173005"
              className={`inline-flex items-center gap-2 rounded-lg border border-sky-400/70 bg-[#132238] px-6 py-3 font-semibold text-sky-300 transition-colors hover:bg-sky-400/10 ${focusRing}`}
            >
              <PhoneIcon />
              Call (425) 417-3005
            </a>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors hover:bg-[#132238] ${focusRing}`}
            >
              <MapPinIcon />
              Get Directions
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <Image
              src="/showrooms/bellevue.jpg"
              alt="Sound View Window and Door storefront at 13555 NE Bel Red Rd in Bellevue"
              width={1200}
              height={800}
              className="h-80 w-full rounded-2xl border border-slate-700/80 object-cover shadow-md sm:h-96"
              priority
            />
            <div className="flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-sm sm:p-8">
              <div>
                <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Showroom Address
                </h2>
                <p className="text-lg font-bold text-white">
                  13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Located in Suite 207 with easy parking directly outside the
                  entrance.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Hours of Operation
                </h2>
                <dl className="mt-2 space-y-2 text-sm text-white">
                  <div className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                    <dt>Monday through Friday</dt>
                    <dd className="font-medium">By appointment only</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                    <dt>Saturday &amp; Sunday</dt>
                    <dd className="font-medium">Closed</dd>
                  </div>
                </dl>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Open Monday through Friday by appointment only. Closed weekends.
                </p>
                <p className="mt-2 text-xs font-medium text-slate-400">
                  Showrooms and phone lines are closed on weekends and major holidays.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Direct Line
                </h2>
                <a
                  href="tel:4254173005"
                  className={`text-lg font-bold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline ${focusRing}`}
                >
                  (425) 417-3005
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <iframe
              src={mapEmbedSrc}
              title="Map of the Bellevue showroom at 13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005"
              className="h-80 w-full rounded-2xl border border-slate-700 shadow-sm"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
            What You Can Explore In Person
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-sm sm:p-8"
              >
                <h3 className="mb-3 text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-base leading-7 text-slate-300">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-sm sm:p-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Reserve Your Private Showroom Consultation
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Booking in advance guarantees uninterrupted time with a dedicated
              product specialist who can review your architectural plans,
              elevations, or window retrofit requirements.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 font-medium text-[#0B192C] transition-colors hover:bg-sky-300 ${focusRing}`}
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

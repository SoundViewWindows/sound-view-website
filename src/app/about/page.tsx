import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AboutQuoteOpenButton, AboutQuoteSlideIn } from "@/components/AboutQuoteSlideIn";
import { Header } from "@/components/Header";
import { canonicalUrl } from "@/config/site";
import { showrooms } from "@/data/showrooms";
import { publicPaths } from "@/lib/public-paths";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.about),
  },
  title: "About Us | Sound View Window & Door",
  description:
    "Meet the Greater Seattle window, door, and glass team behind 17+ years of relaxed, zero-pressure consultations and local Pacific Northwest installation.",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const trustItems = [
  {
    title: "17+ Years in Puget Sound",
    body: "Local Greater Seattle expertise",
  },
  {
    title: "10,000+ Installations",
    body: "Completed residential and commercial projects",
  },
  {
    title: "4.9/5 Homeowner Rating",
    body: "Verified Pacific Northwest customer reviews",
  },
  {
    title: "WA Licensed, Bonded & Insured",
    body: "Full contractor protection and accountability",
  },
];

const values = [
  {
    title: "Respect for Every Homeowner",
    body: "Straightforward answers, transparent pricing, and zero high-pressure sales tactics.",
  },
  {
    title: "Precision & Accountability",
    body: "Exact field measurements, weather-tight sill flashing, and clean interior trim work.",
  },
  {
    title: "Dedicated Customer Care",
    body: "Clear communication from showroom visit through final installation sign-off.",
  },
  {
    title: "Teamwork & Craftsmanship",
    body: "Experienced local installation crews who treat every home with care.",
  },
  {
    title: "Continual Improvement",
    body: "Staying current with energy-efficient glazing, acoustic ratings, and modern hardware.",
  },
];

const specialties = [
  {
    title: "Window Replacement",
    href: publicPaths.windows,
    body: "Casement, sliding, hung, and architectural windows specified for Pacific Northwest rain, wind, and temperature swings.",
  },
  {
    title: "Door Replacement",
    href: publicPaths.doors,
    body: "Entry doors, French doors, and multi-slide patio systems measured and installed for a tight, quiet fit.",
  },
  {
    title: "Shower Enclosures & Custom Glass",
    href: publicPaths.shower,
    body: "Frameless shower enclosures and custom glass sized to the opening, with hardware you can compare in person.",
  },
  {
    title: "Window Blinds & Shades",
    href: "/services/window-blinds-shades",
    body: "Honeycomb shades, roller and solar fabrics, and motorized treatments fitted to the new openings.",
  },
];

const installVideo = {
  src: "https://www.youtube.com/embed/_330VSt1DKs",
  title: "Complete Window Tear-Out and Weatherproof Install",
  description:
    "Removal of the old unit, sill prep, and airtight sealing for wet maritime winters.",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-[#0F1D2E]">
      <Header />
      <AboutQuoteSlideIn />
      <main>
        <section className="relative overflow-hidden bg-[#0B1623] text-white">
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-35 motion-reduce:hidden"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
          >
            <source src="/videos/about-hero.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#0B1623]/60 via-[#0F1D2E]/45 to-[#0B1623]/85" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl">
                  <Image
                    src="/images/sound-view-lake-city-storefront.jpg"
                    alt="Sound View Window & Door Lake City showroom exterior"
                    fill
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="lg:col-span-7">
                <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
                  <ol className="flex flex-wrap items-center gap-2">
                    <li>
                      <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                        Home
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">&gt;</span>
                      <span aria-current="page">About</span>
                    </li>
                  </ol>
                </nav>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                  About Sound View Window & Door
                </p>
                <h1 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[42px]">
                  A Name Greater Seattle Homeowners Trust
                </h1>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-300">
                  <p>
                    Sound View Window & Door grew up in Greater Seattle by staying
                    with the same homes for the long term. Homeowners come back
                    because the recommendation still makes sense years later, not
                    because someone rushed a signature on the first visit.
                  </p>
                  <p>
                    We compare{" "}
                    <Link href={publicPaths.windows} className={`font-semibold text-[#38BDF8] underline-offset-4 hover:text-sky-300 hover:underline ${focusRing}`}>
                      replacement windows
                    </Link>
                    ,{" "}
                    <Link href={publicPaths.doors} className={`font-semibold text-[#38BDF8] underline-offset-4 hover:text-sky-300 hover:underline ${focusRing}`}>
                      doors
                    </Link>
                    , and{" "}
                    <Link href={publicPaths.glass} className={`font-semibold text-[#38BDF8] underline-offset-4 hover:text-sky-300 hover:underline ${focusRing}`}>
                      custom glass
                    </Link>{" "}
                    in plain language. You see the tradeoffs in frame material,
                    glass package, and hardware before anyone talks about a start
                    date.
                  </p>
                  <p>
                    The same team stays accountable from the first conversation in
                    one of our{" "}
                    <Link href={publicPaths.showrooms} className={`font-semibold text-[#38BDF8] underline-offset-4 hover:text-sky-300 hover:underline ${focusRing}`}>
                      showrooms
                    </Link>{" "}
                    through measurement, installation, and the final walkthrough.
                    If something needs attention, you know who to call.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-appointment"
                    className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
                  >
                    Book Appointment
                  </Link>
                  <AboutQuoteOpenButton
                    className={`inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`}
                  >
                    Get a Free Quote
                  </AboutQuoteOpenButton>
                </div>
              </div>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-4 border-t border-slate-700/70 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-slate-700/80 bg-[#152538]/90 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-300">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                Our Mission & Values
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#0F1D2E] sm:text-4xl">
                Our Mission & Values
              </h2>
              <p className="mt-5 text-lg font-semibold leading-relaxed text-[#0F1D2E]">
                &quot;To be Greater Seattle&apos;s most trusted window, door, and
                architectural glass partner by combining honest, zero-pressure
                guidance with precision Pacific Northwest craftsmanship.&quot;
              </p>
              <ul className="mt-6 space-y-3.5 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                {values.map((value) => (
                  <li key={value.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                    <p className="text-sm leading-6 text-slate-700 sm:text-base">
                      <span className="font-semibold text-[#0F1D2E]">{value.title}: </span>
                      {value.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                <Image
                  src="/images/services/window-replacement.png"
                  alt="Technician setting a replacement window sash into an existing opening"
                  width={960}
                  height={720}
                  className="aspect-[4/5] w-full object-cover object-center sm:aspect-[4/3] lg:aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-bold text-[#0F1D2E] sm:text-4xl">
                We Prioritize Customer Satisfaction
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">
                <p>
                  A project is not finished when the new unit is in the opening.
                  You get a written proposal that spells out the product, the
                  scope, and the price, then a crew that protects floors,
                  furniture, and landscaping while they work.
                </p>
                <p>
                  After installation we walk the openings with you, check
                  operation, and leave the site clean. That end-to-end care is
                  why homeowners rate the work 4.9/5 across 10,000+ local
                  projects.
                </p>
              </div>
              <blockquote className="mt-6 rounded-r-xl border-l-4 border-[#38BDF8] bg-slate-50 p-5 text-slate-700 italic">
                <p>
                  &quot;Sound View replaced 12 original windows in our home with
                  zero high-pressure sales tactics. The team walked us through
                  our options, the installers arrived right on schedule, and the
                  draft reduction this winter has been incredible.&quot;
                </p>
                <footer className="mt-3 text-sm font-semibold not-italic text-[#0F1D2E]">
                  David M., Queen Anne, Seattle
                </footer>
              </blockquote>
              <Link
                href={publicPaths.portfolio}
                className={`mt-6 inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-sky-300 ${focusRing}`}
              >
                Explore Completed Projects
              </Link>
            </div>
            <div className="lg:col-span-6">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="relative w-full bg-black pb-[56.25%]">
                  <iframe
                    src={installVideo.src}
                    title={installVideo.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-[#0F1D2E]">{installVideo.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{installVideo.description}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                  <Image
                    src="/images/sound-view-queen-anne-showroom.jpg"
                    alt="Sound View Window & Door West Queen Anne showroom exterior"
                    width={1200}
                    height={800}
                    quality={95}
                    className="aspect-[16/9] h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                  Authorized factory dealer
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#0F1D2E] sm:text-4xl">
                  We Only Offer The Best Products
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Sound View is an <strong>Authorized Factory Dealer</strong> for{" "}
                    <strong>Milgard</strong>, <strong>Andersen</strong>,{" "}
                    <strong>Ply Gem</strong>, and <strong>STILE Windows & Doors</strong>.
                    We keep the lineup selective so the products on the floor are
                    the ones we are willing to install in this climate.
                  </p>
                  <p>
                    In the showroom you can operate full-size windows and doors,
                    compare glass packages, and see hardware finishes in daylight
                    before a unit is ordered for your home.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {specialties.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs"
                >
                  <h3 className="text-xl font-bold text-[#0F1D2E]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.body}</p>
                  <Link
                    href={item.href}
                    className={`mt-4 inline-flex text-sm font-semibold text-sky-700 underline-offset-4 hover:underline ${focusRing}`}
                  >
                    View {item.title}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="showrooms" className="scroll-mt-8 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-3xl font-bold text-[#0F1D2E] sm:text-4xl">
              Showrooms Across Greater Seattle
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              See operable windows, doors, and custom glass before you decide.
              Bring plans, photos, or a rough idea and we will help you sort the
              options.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {showrooms.map((room) => (
                <article
                  key={room.href}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70"
                >
                  <iframe
                    src={room.mapSrc}
                    title={room.mapTitle}
                    className="h-48 w-full border-0 bg-white"
                    loading="lazy"
                    allowFullScreen
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-bold text-[#0F1D2E]">{room.name} Showroom</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{room.address}</p>
                    <a
                      href={room.phoneHref}
                      className={`mt-2 w-fit text-sm font-semibold text-sky-700 underline-offset-4 hover:underline ${focusRing}`}
                    >
                      {room.phone}
                    </a>
                    <dl className="mt-4 space-y-1 text-sm text-slate-700">
                      {room.hours.map((row) => (
                        <div key={row.day} className="flex justify-between gap-4">
                          <dt>{row.day}</dt>
                          <dd className="text-right font-medium text-[#0F1D2E]">{row.time}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={room.directionsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`}
                      >
                        Open in Maps
                      </a>
                      <Link
                        href={room.href}
                        className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-sky-300 ${focusRing}`}
                      >
                        View Showroom
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0F1D2E] text-white">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready To Upgrade Your Home? Get A Quote Now!
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              Connect with our Seattle specialists to discuss your project,
              explore top-tier products from brands like Milgard and Andersen, or
              schedule a personalized consultation at one of our local showrooms.
            </p>
            <AboutQuoteOpenButton
              className={`mt-8 inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-sky-300 ${focusRing}`}
            >
              Get A Free Quote
            </AboutQuoteOpenButton>
          </div>
        </section>
      </main>
    </div>
  );
}

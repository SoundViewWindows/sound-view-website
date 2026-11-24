import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ShowroomCards } from "@/components/showrooms/ShowroomSections";
import { getShowroom, type Showroom, type ShowroomSlug } from "@/data/showrooms";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const skyButton = `inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-2.5 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`;
const ctaButton = `inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`;
const whiteButton = `inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`;

function storefrontSrc(room: Showroom) {
  if (room.slug === "lake-city") return "/images/sound-view-lake-city-storefront.jpg";
  return room.image;
}

function bookingShowroom(slug: ShowroomSlug) {
  if (slug === "west-queen-anne") return "queen-anne";
  return slug;
}

export function ShowroomLocation({
  slug,
  excludeShowroom,
  otherShowroomsHeading,
}: {
  slug: ShowroomSlug;
  excludeShowroom?: ShowroomSlug;
  otherShowroomsHeading?: string;
}) {
  const room = getShowroom(slug);
  const tour = room.virtualTour;

  return (
    <div className="bg-white text-[#0F1D2E]">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0F1D2E] pb-16 pt-10 text-white sm:pb-20 sm:pt-12">
          <div className="pointer-events-none absolute inset-0 z-0 select-none">
            <img
              src="/images/hero-bg.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/65 via-[#0F1D2E]/45 to-[#0F1D2E]/65" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">&gt;</span>
                    <Link href="/showrooms" className={`rounded-sm hover:text-white ${focusRing}`}>
                      Showrooms
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">&gt;</span>
                    <span aria-current="page">{room.name} Showroom</span>
                  </li>
                </ol>
              </nav>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#38BDF8] sm:text-sm">
                Sound View Showroom Location
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {room.name} Showroom
                </h1>
                {room.appointmentOnly ? (
                  <span className="inline-flex items-center rounded-full border border-[#38BDF8]/50 bg-[#38BDF8]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
                    By Appointment Only
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
              <div className="relative h-full min-h-[300px] min-w-0 overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                <Image
                  src={storefrontSrc(room)}
                  alt={room.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={room.slug === "west-queen-anne" || room.slug === "bellevue" ? 95 : 75}
                  className={`h-full w-full object-cover ${
                    room.slug === "west-queen-anne" || room.slug === "bellevue" ? "object-center" : "object-top"
                  }`}
                  priority
                />
              </div>
              <article className="flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-[#0F1D2E]/90 p-6 shadow-2xl backdrop-blur-md">
                <div>
                  <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                  <h2 className="mb-4 text-xl font-bold text-white">Showroom Address</h2>
                  <p className="text-lg font-bold text-white">{room.address}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">{room.addressNote}</p>
                  <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                    Hours of Operation
                  </h3>
                  <dl className="space-y-2 text-sm text-slate-200">
                    {room.hours.map((row) => (
                      <div key={row.day} className="flex items-baseline justify-between gap-4">
                        <dt>{row.day}</dt>
                        <dd className="text-right font-medium text-white">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-xs font-medium text-slate-300">{room.hoursNote}</p>
                  <h3 className="mb-1 mt-6 text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                    Direct Line
                  </h3>
                  <a
                    href={room.phoneHref}
                    className={`text-lg font-bold text-[#38BDF8] hover:text-sky-300 ${focusRing}`}
                  >
                    {room.phone}
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link href={`/book-appointment?showroom=${bookingShowroom(room.slug)}`} className={skyButton}>
                    Book Showroom Visit
                  </Link>
                  <a href={room.directionsHref} target="_blank" rel="noopener noreferrer" className={whiteButton}>
                    Get Directions
                  </a>
                </div>
              </article>
            </div>

            <div className={tour ? "mb-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2" : "mb-8 w-full"}>
              {tour ? (
                <DarkPanel title={tour.heading}>
                  <iframe
                    src={tour.embedSrc}
                    title={tour.iframeTitle}
                    className="h-[320px] w-full overflow-hidden rounded-xl border border-white/15"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href={tour.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 inline-flex text-sm font-semibold text-[#38BDF8] hover:text-sky-300 ${focusRing}`}
                  >
                    View on Google Maps
                  </a>
                </DarkPanel>
              ) : null}
              <DarkPanel title="Map and Directions">
                <iframe
                  src={room.mapSrc}
                  title={room.mapTitle}
                  className="h-[320px] w-full overflow-hidden rounded-xl border border-white/15"
                  loading="lazy"
                  allowFullScreen
                />
              </DarkPanel>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <ShowroomCards
            currentSlug={room.slug}
            excludeShowroom={excludeShowroom}
            heading={otherShowroomsHeading}
            eyebrow={excludeShowroom ? "Other Greater Seattle Locations" : undefined}
          />
        </section>

        <section className="bg-[#0F1D2E] px-4 py-16 text-center text-white sm:py-20">
          <h2 className="text-3xl font-black sm:text-5xl">Ready To Upgrade Your Home? Get A Quote Now!</h2>
          <p className="mx-auto mb-8 mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            Connect with our Seattle specialists to discuss your project, explore
            top-tier products from brands like Milgard and Andersen, or schedule a
            personalized consultation at one of our local showrooms.
          </p>
          <Link href="/#homepage-quote-box" className={ctaButton}>
            Get A Free Quote
          </Link>
        </section>
      </main>
    </div>
  );
}

function DarkPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/20 bg-[#0F1D2E]/90 p-6 shadow-2xl backdrop-blur-md">
      <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
      <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>
      {children}
    </article>
  );
}

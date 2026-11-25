import Image from "next/image";
import Link from "next/link";
import { heroPrimaryClass, heroSecondaryClass } from "@/components/PhotographicHero";
import { QuoteDrawerButton } from "@/components/QuoteSlideIn";
import { showrooms, type Showroom, type ShowroomSlug } from "@/data/showrooms";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

function bookingLocation(slug: ShowroomSlug) {
  if (slug === "west-queen-anne") return "queen-anne";
  return slug;
}

function storefrontSrc(room: Showroom) {
  if (room.slug === "lake-city") return "/images/sound-view-lake-city-storefront.jpg";
  return room.image;
}

export function ShowroomsIndexHero() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0F1D2E] text-white">
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/95 via-[#0F1D2E]/85 to-[#0F1D2E]/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Showrooms</span>
              </li>
            </ol>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8]">
            Greater Seattle Showrooms
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] leading-[1.08]">
            Visit a Greater Seattle Window & Door Showroom
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Test full-size window, entry door, shower glass, and window treatment
            displays in person at Lake City, West Queen Anne, or Bellevue.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/book-appointment" className={heroPrimaryClass}>
              BOOK MY FREE SHOWROOM WALKTHROUGH →
            </Link>
            <QuoteDrawerButton className={heroSecondaryClass}>GET MY FREE QUOTE →</QuoteDrawerButton>
          </div>
        </div>
      </section>

      <section className="bg-white" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#608b9e]">Three locations</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl">
            Choose a showroom
          </h2>
          <div className="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showrooms.map((room) => (
              <ShowroomDirectoryCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-[#f4fafd]" style={{ backgroundColor: "#F4FAFD", color: "#0F1D2E" }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#608b9e]">In the showroom</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#0c1f38] sm:text-4xl">
            What you can compare in person
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {showrooms.map((room) => (
              <article key={room.slug}>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">{room.eyebrow}</p>
                <h3 className="mt-2 text-xl font-bold text-[#0F1D2E]">{room.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#556980] sm:text-base">{room.subtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ShowroomDirectoryCard({ room }: { room: Showroom }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={storefrontSrc(room)}
          alt={room.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={room.slug === "west-queen-anne" ? 95 : 75}
          className={`object-cover ${room.slug === "west-queen-anne" ? "object-center" : "object-top"}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-bold text-[#0F1D2E]">
            <Link href={room.href} className={`rounded-sm hover:text-[#0284C7] ${focusRing}`}>
              {room.name}
            </Link>
          </h3>
          {room.appointmentOnly ? (
            <span className="rounded-full bg-[#E0F2FE] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0369A1]">
              By appointment
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[#556980]">{room.summary}</p>
        <p className="mt-4 text-sm font-semibold leading-6 text-[#0F1D2E]">{room.address}</p>
        <p className="mt-1 text-sm leading-6 text-[#556980]">{room.addressNote}</p>
        <dl className="mt-4 space-y-1 text-sm">
          {room.hours.map((row) => (
            <div key={row.day} className="flex justify-between gap-4">
              <dt className="text-[#556980]">{row.day}</dt>
              <dd className="text-right font-semibold text-[#0F1D2E]">{row.time}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-[#556980]">{room.hoursNote}</p>
        <a href={room.phoneHref} className={`mt-4 w-fit text-base font-bold text-[#0284C7] hover:text-[#0F1D2E] ${focusRing}`}>
          {room.phone}
        </a>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link
            href={`/book-appointment?showroom=${bookingLocation(room.slug)}`}
            className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-3 py-2.5 text-xs font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
          >
            Book a Visit
          </Link>
          <a
            href={room.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-lg bg-slate-100 px-3 py-2.5 text-xs font-semibold text-[#0F1D2E] transition-colors hover:bg-slate-200 ${focusRing}`}
          >
            Get Directions
          </a>
          <Link href={room.href} className={`inline-flex items-center px-2 text-xs font-semibold text-[#0284C7] hover:text-[#0F1D2E] ${focusRing}`}>
            View Showroom
          </Link>
        </div>
      </div>
    </article>
  );
}

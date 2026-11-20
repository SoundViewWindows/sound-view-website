"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { showrooms, type Showroom, type ShowroomSlug } from "@/data/showrooms";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

function bookingLocation(slug: ShowroomSlug) {
  if (slug === "west-queen-anne") return "queen-anne";
  return slug;
}

export function ShowroomsIndexHero() {
  const [projectType, setProjectType] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#0F1D2E] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/65 via-[#0F1D2E]/45 to-[#0F1D2E]/65" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-stretch">
        <div className="min-w-0 flex-1 py-8 pl-4 pr-6 sm:pl-6 lg:py-10 lg:pl-10 lg:pr-10 xl:pl-16">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-xl">
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
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#38BDF8] sm:text-sm">
                Greater Seattle Showrooms
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Our Greater Seattle Showrooms
              </h1>
              <p className="mt-2 text-base text-slate-200">
                Test full-size window, entry door, shower glass, and window treatment
                displays in person at Lake City, West Queen Anne, or Bellevue.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/book-appointment"
                className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
              >
                Book Showroom Appointment
              </Link>
              <a
                href="tel:+12063314296"
                className={`inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`}
              >
                Call (206) 331-4296
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
            {showrooms.map((room) => (
              <ShowroomHeroCard key={room.slug} room={room} />
            ))}
          </div>
        </div>

        <aside className="flex w-full shrink-0 flex-col self-stretch bg-[#003d6b] px-6 py-8 text-white sm:px-8 lg:w-[380px] xl:w-[420px]">
          {quoteSubmitted ? null : (
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8] sm:text-sm">
                Special Offer
              </p>
              <p className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[28px] lg:text-[30px]">
                Save 10% on Labor
              </p>
              <p className="mt-1.5 text-sm italic text-sky-100/95 sm:text-[15px]">
                Book your project by November 30th.
              </p>
            </div>
          )}
          <div className={quoteSubmitted ? "flex min-h-0 flex-1 flex-col" : "mt-5 min-h-0 flex-1"}>
            <QuoteRequestForm
              projectType={projectType}
              onProjectTypeChange={setProjectType}
              onSubmittedChange={setQuoteSubmitted}
              formName="showrooms-quote"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

function ShowroomHeroCard({ room }: { room: Showroom }) {
  const hours = room.hours[0];

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-700/80 bg-[#152538]/90">
      <div>
        <div
          className={`relative w-full overflow-hidden ${
            room.slug === "west-queen-anne" ? "aspect-[16/9]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={room.slug === "lake-city" ? "/images/sound-view-lake-city-storefront.jpg" : room.image}
            alt={room.imageAlt}
            fill
            sizes={room.slug === "west-queen-anne" ? "(max-width: 1024px) 100vw, 50vw" : "(min-width: 768px) 28vw, 100vw"}
            quality={room.slug === "west-queen-anne" ? 95 : 75}
            className={`h-full w-full object-cover ${room.slug === "west-queen-anne" ? "object-center" : "object-top"}`}
          />
        </div>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-white">
              <Link href={room.href} className={`rounded-sm hover:text-[#38BDF8] ${focusRing}`}>
                {room.name}
              </Link>
            </h2>
            {room.appointmentOnly ? (
              <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#38BDF8]">
                By Appointment Only
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{room.summary}</p>
          <p className="mt-3 text-sm font-medium text-white">{room.address}</p>
          <p className="mt-1 text-sm text-slate-300">
            {hours.day}: {hours.time}
          </p>
          <a
            href={room.phoneHref}
            className={`mt-2 inline-flex text-sm font-semibold text-[#38BDF8] underline-offset-4 hover:underline ${focusRing}`}
          >
            {room.phone}
          </a>
        </div>
      </div>
      <div className="mx-4 mb-4 mt-4 flex flex-wrap gap-2 border-t border-slate-700/70 pt-4">
        <Link
          href={`/book-appointment?location=${bookingLocation(room.slug)}`}
          className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-3 py-2 text-xs font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
        >
          Book Showroom Visit
        </Link>
        <a
          href={room.directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`}
        >
          Get Directions
        </a>
      </div>
    </article>
  );
}

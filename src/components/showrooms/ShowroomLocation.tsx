import Image from "next/image";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { SoundViewPageHero } from "@/components/SoundViewPageHero";
import { ShowroomCards } from "@/components/showrooms/ShowroomSections";
import { getShowroom, type Showroom, type ShowroomSlug } from "@/data/showrooms";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

function showroomHeroCards(room: Showroom) {
  const weekday = room.hours[0];
  const hours =
    weekday?.time === "8:00 AM to 4:30 PM"
      ? "Monday through Friday: 8:00 AM to 4:30 PM (Closed weekends and major holidays)."
      : "Monday through Friday: By appointment only (Closed weekends and major holidays).";
  return [
    {
      title: "Showroom Address",
      body: `${room.address}. ${room.addressNote}`,
    },
    {
      title: "Hours of Operation",
      body: hours,
    },
    {
      title: "What You Can See",
      body: "Operating window models, exterior doors, heavy-glass shower displays, and custom shades.",
    },
  ];
}

export function ShowroomLocation({ slug }: { slug: ShowroomSlug }) {
  const room = getShowroom(slug);

  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <main>
        <SoundViewPageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Showrooms", href: "/showrooms" },
            { label: `${room.name} Showroom` },
          ]}
          eyebrow="SOUND VIEW SHOWROOM LOCATION"
          title={`${room.name} Showroom`}
          subtitle={`Test full-size window, entry door, shower glass, and window treatment displays in person with our ${room.name} team.`}
          primaryAction={{
            label: "Book Showroom Appointment",
            href: `/book-appointment?location=${room.slug === "west-queen-anne" ? "queen-anne" : room.slug}`,
          }}
          secondaryAction={{ label: `Call ${room.phone}`, href: room.phoneHref }}
          cards={showroomHeroCards(room)}
        />

        <section className="bg-[#F4FAFD] py-16 sm:py-20">
          {room.virtualTour ? (
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
              <div className="flex w-full min-w-0 flex-col gap-8">
                <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-[420px]">
                  <Image
                    src={room.image}
                    alt={room.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    className="h-full w-full max-w-full object-cover object-top"
                    priority
                  />
                </div>
                <iframe
                  src={room.mapSrc}
                  title={room.mapTitle}
                  className="h-[320px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="flex w-full min-w-0 flex-col gap-8">
                <div className="flex h-[380px] w-full min-w-0 flex-col sm:h-[420px]">
                  <h2 className="mb-3 shrink-0 text-2xl font-extrabold tracking-tight text-[#0B192C] sm:text-3xl">
                    {room.virtualTour.heading}
                  </h2>
                  <iframe
                    src={room.virtualTour.embedSrc}
                    title={room.virtualTour.iframeTitle}
                    className="min-h-0 w-full min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href={room.virtualTour.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 inline-flex shrink-0 text-sm font-medium text-[#0090c8] underline-offset-4 hover:underline ${focusRing}`}
                  >
                    View on Google Maps
                  </a>
                </div>
                <ShowroomInfo room={room} />
              </div>
            </div>
          ) : (
            <>
              <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                <div className="relative h-80 overflow-hidden rounded-2xl border border-slate-200 shadow-md sm:h-96">
                  <Image
                    src={room.image}
                    alt={room.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <ShowroomInfo room={room} />
              </div>
              <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                <iframe
                  src={room.mapSrc}
                  title={room.mapTitle}
                  className="h-80 w-full rounded-2xl border border-slate-200 bg-white shadow-md"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </>
          )}

          <h2 className="mx-auto mb-8 mt-16 max-w-7xl px-4 text-3xl font-extrabold tracking-tight text-[#0B192C] sm:px-6 sm:text-4xl lg:px-8">
            Our Pacific Northwest Showrooms
          </h2>
          <ShowroomCards currentSlug={slug} />
        </section>
        <CtaBanner />
      </main>
    </div>
  );
}

function ShowroomInfo({ room }: { room: Showroom }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
      <div>
        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Showroom Address
        </h2>
        <p className="text-lg font-bold text-[#0B192C]">{room.address}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#556980]">{room.addressNote}</p>
      </div>
      <div className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Hours of Operation
        </h2>
        <dl className="space-y-2 text-sm text-[#556980] sm:text-base">
          {room.hours.map((row) => (
            <div key={row.day} className="flex items-baseline justify-between gap-4">
              <dt>{row.day}</dt>
              <dd className="text-right font-medium text-[#0B192C]">{row.time}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-xs font-medium text-slate-400">{room.hoursNote}</p>
      </div>
      <div className="mt-8">
        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Direct Line
        </h2>
        <a
          href={room.phoneHref}
          className={`text-lg font-extrabold text-[#0090c8] underline-offset-4 hover:underline ${focusRing}`}
        >
          {room.phone}
        </a>
      </div>
    </article>
  );
}

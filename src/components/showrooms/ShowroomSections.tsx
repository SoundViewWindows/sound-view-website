import Link from "next/link";
import { BOOKING_URL } from "@/config/links";
import { showrooms, type Showroom, type ShowroomSlug } from "@/data/showrooms";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const bookButton = `inline-flex items-center justify-center bg-[#0090c8] hover:bg-[#007fb1] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all ${focusRing}`;

const directionsButton = `inline-flex items-center justify-center border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all ${focusRing}`;

export function ShowroomHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumb: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-[#0B192C] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumb.map((item, index) => (
              <li key={item.label} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
                {item.href ? (
                  <Link href={item.href} className={`rounded-sm hover:text-white ${focusRing}`}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="text-sky-400 font-bold text-xs uppercase tracking-widest mb-2">{eyebrow}</p>
        <h1 className="text-white font-extrabold text-3xl sm:text-5xl tracking-tight mb-4 max-w-4xl">
          {title}
        </h1>
        <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">{subtitle}</p>
      </div>
    </section>
  );
}

export function ShowroomCards({ currentSlug }: { currentSlug?: ShowroomSlug }) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
      {showrooms.map((room) => (
        <ShowroomCard key={room.slug} room={room} current={room.slug === currentSlug} />
      ))}
    </div>
  );
}

function ShowroomCard({ room, current }: { room: Showroom; current: boolean }) {
  return (
    <article
      aria-current={current ? "page" : undefined}
      className="flex h-full flex-col bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md hover:shadow-lg transition-all"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0B192C]">
          <Link href={room.href} className={`rounded-sm hover:text-[#0090c8] ${focusRing}`}>
            {room.name}
          </Link>
        </h2>
        {room.appointmentOnly ? (
          <span className="bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
            By Appointment Only
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-[#556980] sm:text-base">{room.summary}</p>
      <p className="mt-4 text-sm font-medium leading-6 text-[#0B192C]">{room.address}</p>
      <p className="mt-2 text-sm leading-6 text-[#556980]">
        {room.hours[0].day}: {room.hours[0].time}
      </p>
      <a
        href={room.phoneHref}
        className={`mt-3 w-fit text-lg font-extrabold text-[#0B192C] underline-offset-4 hover:text-[#0090c8] hover:underline ${focusRing}`}
      >
        {room.phone}
      </a>
      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={bookButton}>
          Book Showroom Visit
        </a>
        <a href={room.directionsHref} target="_blank" rel="noopener noreferrer" className={directionsButton}>
          Get Directions
        </a>
      </div>
    </article>
  );
}

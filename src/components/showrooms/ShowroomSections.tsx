import Link from "next/link";
import { showrooms, type Showroom, type ShowroomSlug } from "@/data/showrooms";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const bookButton = `inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`;

const directionsButton = `inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`;

export function ShowroomCards({
  currentSlug,
  excludeShowroom,
  heading = "Our Pacific Northwest Showrooms",
  eyebrow,
}: {
  currentSlug?: ShowroomSlug;
  excludeShowroom?: "lake-city" | "west-queen-anne" | "bellevue";
  heading?: string;
  eyebrow?: string;
}) {
  const rooms = showrooms.filter((room) => room.slug !== excludeShowroom);
  const gridClass =
    rooms.length === 2
      ? "mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:gap-8 lg:px-8"
      : "mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8";

  return (
    <>
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#38BDF8] sm:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F1D2E] sm:text-4xl">{heading}</h2>
      </div>
      <div className={gridClass}>
        {rooms.map((room) => (
          <ShowroomCard key={room.slug} room={room} current={room.slug === currentSlug} />
        ))}
      </div>
    </>
  );
}

function bookingLocationForShowroom(slug: ShowroomSlug) {
  if (slug === "west-queen-anne") return "queen-anne";
  return slug;
}

function ShowroomCard({ room, current }: { room: Showroom; current: boolean }) {
  return (
    <article
      aria-current={current ? "page" : undefined}
      className="flex h-full flex-col rounded-2xl border border-white/20 bg-[#0F1D2E]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-white">
          <Link href={room.href} className={`rounded-sm hover:text-[#38BDF8] ${focusRing}`}>
            {room.name}
          </Link>
        </h2>
        {room.appointmentOnly ? (
          <span className="rounded-full border border-[#38BDF8]/50 bg-[#38BDF8]/15 px-2.5 py-1 text-xs font-bold uppercase text-[#38BDF8]">
            By Appointment Only
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-slate-200 sm:text-base">{room.summary}</p>
      <p className="mt-4 text-sm font-medium leading-6 text-slate-200">{room.address}</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">
        {room.hours[0].day}: {room.hours[0].time}
      </p>
      <a
        href={room.phoneHref}
        className={`mt-3 w-fit text-lg font-bold text-[#38BDF8] underline-offset-4 hover:text-sky-300 hover:underline ${focusRing}`}
      >
        {room.phone}
      </a>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <Link href={`/book-appointment?showroom=${bookingLocationForShowroom(room.slug)}`} className={bookButton}>
          Book Showroom Visit
        </Link>
        <a href={room.directionsHref} target="_blank" rel="noopener noreferrer" className={directionsButton}>
          Get Directions
        </a>
        <Link href={room.href} className={`text-sm font-semibold text-[#38BDF8] underline-offset-4 hover:underline ${focusRing}`}>
          View Showroom
        </Link>
      </div>
    </article>
  );
}

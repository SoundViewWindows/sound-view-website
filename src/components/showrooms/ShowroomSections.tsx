import Link from "next/link";
import { showrooms, type Showroom, type ShowroomSlug } from "@/data/showrooms";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const bookButton = `inline-flex items-center justify-center bg-[#0090c8] hover:bg-[#007fb1] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all ${focusRing}`;

const directionsButton = `inline-flex items-center justify-center border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all ${focusRing}`;

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
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <Link href={`/book-appointment?location=${bookingLocationForShowroom(room.slug)}`} className={bookButton}>
          Book Showroom Visit
        </Link>
        <a href={room.directionsHref} target="_blank" rel="noopener noreferrer" className={directionsButton}>
          Get Directions
        </a>
        <Link href={room.href} className={`text-sm font-semibold text-[#0090c8] underline-offset-4 hover:underline ${focusRing}`}>
          View Showroom
        </Link>
      </div>
    </article>
  );
}

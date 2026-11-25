import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { QuoteSlideIn } from "@/components/QuoteSlideIn";
import { getShowroom, showrooms, type Showroom, type ShowroomSlug } from "@/data/showrooms";

const paper = "#FFFFFF";
const mist = "#F4FAFD";
const ink = "#0F1D2E";
const bodyInk = "#556980";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const skyButton = `inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`;

const textLink = `text-sm font-semibold text-[#0284C7] hover:text-[#0F1D2E] ${focusRing}`;

const exploreItems = [
  {
    title: "Replacement Windows",
    body: "Compare styles and how each one opens, so the choice is about the room rather than a brochure.",
  },
  {
    title: "Entry and Patio Doors",
    body: "Review door styles, glass, and hardware with someone who installs them in Greater Seattle homes.",
  },
  {
    title: "Shower Glass and Custom Glass",
    body: "Talk through glass for showers and other openings, including what a careful measure involves.",
  },
  {
    title: "Window Blinds and Shades",
    body: "See how fabrics, light control, and motorized treatments change a room before you order.",
  },
];

function storefrontSrc(room: Showroom) {
  if (room.slug === "lake-city") return "/images/sound-view-lake-city-storefront.jpg";
  return room.image;
}

function bookingShowroom(slug: ShowroomSlug) {
  if (slug === "west-queen-anne") return "queen-anne";
  return slug;
}

function headline(slug: ShowroomSlug) {
  if (slug === "lake-city") return "Visit Our Lake City Window & Door Showroom";
  if (slug === "west-queen-anne") return "Visit Our West Queen Anne Window & Door Showroom";
  return "Visit Our Bellevue Window & Door Showroom";
}

function introduction(slug: ShowroomSlug) {
  if (slug === "lake-city") {
    return "Explore window styles, doors, glass solutions, and custom window treatments in person at our North Seattle showroom. Our team is here to help you compare options, ask questions, and find the right fit for your home.";
  }
  if (slug === "west-queen-anne") {
    return "See architectural windows, slimline sliders, and custom interior glass at our Elliott Avenue showroom. Compare how each option looks and operates, then talk through your project with a local specialist.";
  }
  return "This private Bellevue studio is for unhurried conversations about windows, moving glass walls, and custom doors. Visits are scheduled by appointment so you have the room and the specialist to yourself.";
}

function exploreLead(slug: ShowroomSlug) {
  if (slug === "bellevue") {
    return "Bring photos or a rough plan. The appointment is for comparing options, not for a hard sell.";
  }
  return "Walk the floor at your own pace, then ask about the details that matter for your home.";
}

export function ShowroomLocation({
  slug,
  excludeShowroom,
  otherShowroomsHeading = "Other Greater Seattle Showrooms",
}: {
  slug: ShowroomSlug;
  excludeShowroom?: ShowroomSlug;
  otherShowroomsHeading?: string;
}) {
  const room = getShowroom(slug);
  const tour = room.virtualTour;
  const photo = storefrontSrc(room);
  const visitHref = `/book-appointment?showroom=${bookingShowroom(room.slug)}`;
  const others = showrooms.filter((item) => item.slug !== excludeShowroom);

  return (
    <div className="min-h-screen bg-white text-[#0F1D2E]" style={{ backgroundColor: paper, color: ink }}>
      <Header />
      <QuoteSlideIn id={`${slug}-showroom-quote`} formName={`${slug}-showroom-quote`} />
      <main>
        <section
          className="border-b border-slate-200/80 bg-white"
          style={{ backgroundColor: paper, color: ink }}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
            <div>
              <nav aria-label="Breadcrumb" className="text-xs font-medium text-[#556980]">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className={`rounded-sm text-[#556980] hover:text-[#0F1D2E] ${focusRing}`}>
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    <Link href="/showrooms" className={`rounded-sm text-[#556980] hover:text-[#0F1D2E] ${focusRing}`}>
                      Showrooms
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    <span aria-current="page" className="text-[#0F1D2E]">
                      {room.name}
                    </span>
                  </li>
                </ol>
              </nav>
              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#0284C7]">{room.eyebrow}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl lg:text-5xl">
                {headline(room.slug)}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">{introduction(room.slug)}</p>
              <p className="mt-6 text-sm font-semibold leading-6 text-[#0F1D2E]">{room.address}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {room.hours[0].day}: {room.hours[0].time}
              </p>
              <div className="mt-6 flex flex-col items-start gap-4">
                <Link href={visitHref} className={skyButton}>
                  Plan Your Visit
                </Link>
                <p className="flex flex-wrap gap-x-5 gap-y-2">
                  <a href={room.directionsHref} target="_blank" rel="noopener noreferrer" className={textLink}>
                    Get Directions
                  </a>
                  <a href={room.phoneHref} className={textLink}>
                    Call {room.phone}
                  </a>
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo}
                  alt={room.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={room.slug === "west-queen-anne" || room.slug === "bellevue" ? 95 : 75}
                  className={`object-cover ${room.slug === "lake-city" ? "object-top" : "object-center"}`}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4fafd]" style={{ backgroundColor: mist, color: ink }}>
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#608b9e]">In the showroom</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight text-[#0c1f38] sm:text-4xl">
              What You Can Explore
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#556980]">{exploreLead(room.slug)}</p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
              {exploreItems.map((item, index) => (
                <article key={item.title}>
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-b-4 border-[#0090c8] bg-white text-lg font-bold text-[#0c1f38] shadow-md">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-[#0c1f38]">{item.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#556980] sm:text-base">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {tour ? (
          <section className="border-b border-slate-200/80 bg-white" style={{ backgroundColor: paper, color: ink }}>
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">Before you come in</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl">
                Can&apos;t Make It In Person?
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                Take a virtual look around the showroom before planning your visit.
              </p>
              <a
                href={tour.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex ${textLink}`}
              >
                Explore the Virtual Tour
              </a>
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                <iframe
                  src={tour.embedSrc}
                  title={tour.iframeTitle}
                  className="aspect-video w-full"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white" style={{ backgroundColor: paper, color: ink }}>
          <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-16">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">Showroom Address</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl">Plan Your Visit</h2>
              <p className="mt-4 text-lg font-semibold leading-relaxed text-[#0F1D2E]">{room.address}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{room.addressNote}</p>
              <dl className="mt-6 space-y-2 text-sm">
                {room.hours.map((row) => (
                  <div key={row.day} className="grid grid-cols-[1fr_auto] gap-6 border-b border-slate-100 py-2">
                    <dt className="text-slate-600">{row.day}</dt>
                    <dd className="text-right font-semibold text-[#0F1D2E]">{row.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm leading-relaxed text-[#556980]">{room.hoursNote}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                <a href={room.phoneHref} className={`text-base ${textLink}`}>
                  {room.phone}
                </a>
                <a href={room.directionsHref} target="_blank" rel="noopener noreferrer" className={textLink}>
                  Get Directions
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              <iframe
                src={room.mapSrc}
                title={room.mapTitle}
                className="h-80 w-full lg:h-full lg:min-h-[360px]"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {others.length > 0 ? (
          <section className="border-t border-slate-200/80 bg-white" style={{ backgroundColor: paper, color: ink }}>
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
              <h2 className="text-center text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl">
                {otherShowroomsHeading}
              </h2>
              <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
                {others.map((item) => (
                  <article
                    key={item.slug}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="relative h-48 w-full bg-slate-100">
                      <Image
                        src={storefrontSrc(item)}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-[#0F1D2E]">{item.name} Showroom</h3>
                      <p className="mt-2 text-sm leading-5 text-slate-600">{item.summary}</p>
                      <Link href={item.href} className={`mt-4 ${textLink}`}>
                        View Showroom
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-t border-slate-200/80 bg-white" style={{ backgroundColor: paper, color: ink }}>
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
            <h2 className="text-4xl font-bold tracking-tight text-[#0B192C] sm:text-5xl">We&apos;d Love to Welcome You</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Have questions about your window, door, or glass project? Visit this Sound View showroom and talk with our team about your options.
            </p>
            <Link href={visitHref} className={`mt-8 ${skyButton}`}>
              Book a Showroom Visit
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

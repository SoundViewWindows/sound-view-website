import Image from "next/image";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { ShowroomCards, ShowroomHero } from "@/components/showrooms/ShowroomSections";
import { getShowroom, type ShowroomSlug } from "@/data/showrooms";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function ShowroomLocation({ slug }: { slug: ShowroomSlug }) {
  const room = getShowroom(slug);

  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <main>
        <ShowroomHero
          eyebrow={room.eyebrow}
          title={room.title}
          subtitle={room.subtitle}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Showrooms", href: "/showrooms" },
            { label: room.name },
          ]}
        />

        <section className="bg-[#F4FAFD] py-16 sm:py-20">
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
            <article className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
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

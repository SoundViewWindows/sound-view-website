import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import Link from "next/link";
import { Header } from "@/components/Header";
import { PhotographicHero, heroPrimaryClass, heroSecondaryClass } from "@/components/PhotographicHero";
import { QuoteDrawerButton, QuoteSlideIn } from "@/components/QuoteSlideIn";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.contact),
  },
  title: "Contact Us | Sound View Window & Door",
  description:
    "Reach Sound View Window & Door by phone, send project specs, or schedule a consultation with local installation specialists in the Greater Seattle Area.",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const showrooms = [
  {
    name: "Lake City",
    href: "/window-and-door-showroom-in-seattle-wa-lake-city-way-ne/",
    address: "12301 Lake City Way NE, Seattle, WA 98125",
    phone: "(206) 572-3411",
    phoneHref: "tel:2065723411",
  },
  {
    name: "West Queen Anne",
    href: "/window-and-door-showroom-in-seattle-wa-921-elliott-ave/",
    address: "921 Elliott Ave W, Seattle, WA 98119",
    phone: "(206) 402-4229",
    phoneHref: "tel:2064024229",
  },
  {
    name: "Bellevue",
    href: "/bellevue-showroom/",
    address: "13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005",
    phone: "(425) 417-3005",
    phoneHref: "tel:4254173005",
    note: "By Appointment Only",
  },
];

const hours = [
  { day: "Monday", time: "8:00 AM to 4:30 PM" },
  { day: "Tuesday", time: "8:00 AM to 4:30 PM" },
  { day: "Wednesday", time: "8:00 AM to 4:30 PM" },
  { day: "Thursday", time: "8:00 AM to 4:30 PM" },
  { day: "Friday", time: "8:00 AM to 4:30 PM" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-white text-[#0B192C]">
      <Header />
      <QuoteSlideIn id="contact-quote" formName="contact-quote" />
      <main className="flex-1">
        <PhotographicHero
          image="/images/sound-view-lake-city-storefront.jpg"
          eyebrow="Contact Sound View Window & Door"
          title="Request a Free Window & Door Estimate in Greater Seattle"
          lead="Tell us about the openings, send a few photos, or call a showroom. A local specialist follows up during business hours with a clear next step."
          actions={
            <>
              <QuoteDrawerButton className={heroPrimaryClass}>GET MY FREE UPFRONT QUOTE →</QuoteDrawerButton>
              <a href="tel:2065723411" className={heroSecondaryClass}>
                CALL NOW: (206) 572-3411
              </a>
            </>
          }
          cards={[
            {
              title: "Three Greater Seattle Showrooms",
              body: "Compare full-size windows and doors in Lake City, West Queen Anne, or Bellevue.",
            },
            {
              title: "Reply During Business Hours",
              body: "Messages sent on weekdays are reviewed by the same team that measures and installs.",
            },
            {
              title: "No Pressure to Buy",
              body: "Ask about materials, timing, or rebates before you schedule a site visit.",
            },
          ]}
        />
        <section className="bg-[#f4fafd] py-14 sm:py-16" style={{ backgroundColor: "#F4FAFD", color: "#0F1D2E" }}>
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-7">
              <div
                className="rounded-2xl border border-white/10 bg-[#0F1D2E] p-6 shadow-2xl sm:p-10"
                style={{ backgroundColor: "#0F1D2E", color: "#FFFFFF" }}
              >
                <h2 className="mb-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Leave Us a Message
                </h2>
                <p className="mb-4 text-sm leading-6 text-slate-200 sm:text-base">
                  Have a question about our showrooms, products, or scheduling?
                  Send us a note and our team will get back to you during
                  operating hours.
                </p>
                <Link href="/book-appointment" className={`mb-8 inline-flex text-sm font-semibold text-[#38BDF8] hover:text-sky-300 ${focusRing}`}>
                  Prefer a showroom visit? Book an appointment
                </Link>
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-5 lg:col-span-5">
              {showrooms.map((room) => (
                <article
                  key={room.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}
                >
                  <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                  <h2 className="text-lg font-bold text-[#0F1D2E]">{room.name}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{room.address}</p>
                  <a
                    href={room.phoneHref}
                    className={`mt-3 mb-1 block text-lg font-bold text-[#0284C7] hover:text-[#0F1D2E] hover:underline ${focusRing}`}
                  >
                    {room.phone}
                  </a>
                  {room.note ? (
                    <p className="text-sm text-slate-600">{room.note}</p>
                  ) : null}
                  <Link
                    href={room.href}
                    className={`mt-2 inline-flex text-sm font-semibold text-[#0284C7] hover:text-[#0F1D2E] ${focusRing}`}
                  >
                    Showroom details
                  </Link>
                </article>
              ))}

              <article
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}
              >
                <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                  Showroom Hours
                </h2>
                <dl className="space-y-2 text-sm text-slate-600">
                  {hours.map((row) => (
                    <div key={row.day} className="flex items-baseline justify-between gap-4">
                      <dt>{row.day}</dt>
                      <dd className="text-right font-bold text-[#0F1D2E]">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <p
                className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700 shadow-sm"
                style={{ backgroundColor: "#FFFFFF", color: "#334155" }}
              >
                A local specialist will follow up during business hours, with no
                high-pressure sales call.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <footer
        className="border-t border-slate-100 bg-white px-4 py-8 text-center text-xs text-slate-600 sm:text-sm"
        style={{ backgroundColor: "#FFFFFF", color: "#475569" }}
      >
        <p>© 2026 Sound View Window & Door. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

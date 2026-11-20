import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import Link from "next/link";
import { Header } from "@/components/Header";
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
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#0B192C] pt-10 pb-16 sm:pt-12 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 z-0 select-none">
            <img
              src="/images/hero-bg.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/65" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/20 bg-[#0F1D2E]/90 p-6 shadow-2xl backdrop-blur-md sm:p-10">
                <h1 className="mb-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Leave Us a Message
                </h1>
                <p className="mb-8 text-sm leading-6 text-slate-200 sm:text-base">
                  Have a question about our showrooms, products, or scheduling?
                  Send us a note and our team will get back to you during
                  operating hours.
                </p>
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-5 lg:col-span-5">
              {showrooms.map((room) => (
                <article
                  key={room.href}
                  className="rounded-2xl border border-white/20 bg-[#0F1D2E]/90 p-5 shadow-2xl backdrop-blur-md transition-colors hover:border-[#38BDF8]/60"
                >
                  <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                  <h2 className="text-lg font-black text-white">{room.name}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-200">{room.address}</p>
                  <a
                    href={room.phoneHref}
                    className={`text-[#38BDF8] font-black text-lg hover:text-sky-300 hover:underline block mb-1 mt-3 ${focusRing}`}
                  >
                    {room.phone}
                  </a>
                  {room.note ? (
                    <p className="text-sm text-slate-300">{room.note}</p>
                  ) : null}
                  <Link
                    href={room.href}
                    className={`mt-2 inline-flex text-sm font-semibold text-[#38BDF8] hover:text-sky-300 ${focusRing}`}
                  >
                    Showroom details
                  </Link>
                </article>
              ))}

              <article className="rounded-2xl border border-white/20 bg-[#0F1D2E]/90 p-5 shadow-2xl backdrop-blur-md">
                <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                <h2 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-[#38BDF8]">
                  Showroom Hours
                </h2>
                <dl className="space-y-2 text-sm text-slate-200">
                  {hours.map((row) => (
                    <div key={row.day} className="flex items-baseline justify-between gap-4">
                      <dt>{row.day}</dt>
                      <dd className="text-right font-bold text-white">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <p className="rounded-2xl border border-white/20 bg-[#0F1D2E]/90 p-5 text-sm text-slate-200 shadow-2xl backdrop-blur-md">
                Typical response time is under 2 business hours during operating
                hours. You will hear from a local specialist, with no
                high-pressure sales call.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-100 bg-white px-4 py-8 text-center text-xs text-slate-400 sm:text-sm">
        <p>© 2026 Sound View Window & Door. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

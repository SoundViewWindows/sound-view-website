import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/contact"),
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
    href: "/showrooms/lake-city",
    address: "12301 Lake City Way NE, Seattle, WA 98125",
    phone: "(206) 572-3411",
    phoneHref: "tel:2065723411",
  },
  {
    name: "West Queen Anne",
    href: "/showrooms/west-queen-anne",
    address: "921 Elliott Ave W, Seattle, WA 98119",
    phone: "(206) 402-4229",
    phoneHref: "tel:2064024229",
  },
  {
    name: "Bellevue",
    href: "/showrooms/bellevue",
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
        <section className="bg-[#0B192C]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <span aria-current="page">Contact Us</span>
                </li>
              </ol>
            </nav>
            <p className="text-sky-400 font-bold text-xs uppercase tracking-widest mb-2">
              GET IN TOUCH
            </p>
            <h1 className="text-white font-black text-3xl sm:text-5xl tracking-tight mb-3">
              We Are Here To Help
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl">
              Reach out by phone, send project specs, or schedule a consultation
              with our local installation specialists.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl">
                <h2 className="mb-2 text-2xl font-black tracking-tight text-[#0B192C] sm:text-3xl">
                  Send Project Specs
                </h2>
                <p className="mb-8 text-sm leading-6 text-slate-600 sm:text-base">
                  Share a few details and a local specialist will follow up during
                  operating hours. No high-pressure sales calls.
                </p>
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-5 lg:col-span-5">
              {showrooms.map((room) => (
                <article
                  key={room.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md"
                >
                  <h2 className="text-lg font-black text-[#0B192C]">{room.name}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{room.address}</p>
                  <a
                    href={room.phoneHref}
                    className={`text-[#0090c8] font-black text-lg hover:underline block mb-1 mt-3 ${focusRing}`}
                  >
                    {room.phone}
                  </a>
                  {room.note ? (
                    <p className="text-sm text-slate-600">{room.note}</p>
                  ) : null}
                  <Link
                    href={room.href}
                    className={`mt-2 inline-flex text-sm font-bold text-slate-700 underline-offset-4 hover:text-[#0090c8] hover:underline ${focusRing}`}
                  >
                    Showroom details
                  </Link>
                </article>
              ))}

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                <h2 className="text-slate-800 font-extrabold text-xs uppercase tracking-wider mb-4">
                  Showroom Hours
                </h2>
                <dl className="space-y-2 text-sm text-slate-700">
                  {hours.map((row) => (
                    <div key={row.day} className="flex items-baseline justify-between gap-4">
                      <dt>{row.day}</dt>
                      <dd className="text-right font-bold text-[#0B192C]">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <p className="bg-[#F4FAFD] border border-sky-100 rounded-2xl p-5 text-slate-700 text-sm">
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

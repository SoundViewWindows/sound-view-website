import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Sound View Window & Door",
  description:
    "Call, email, or message Sound View Window & Door. Greater Seattle specialists help with windows, doors, custom glass, rebates, and private showroom visits.",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]";

const showrooms = [
  { label: "Lake City Showroom", href: "/showrooms/lake-city" },
  { label: "West Queen Anne Showroom", href: "/showrooms/west-queen-anne" },
  { label: "Bellevue Showroom (By Appt Only)", href: "/showrooms/bellevue" },
];

export default function ContactPage() {
  return (
    <div className="bg-[#F7F5F0] text-[#28323D]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-[#1D2C43] ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Contact Us</span>
              </li>
            </ol>
          </nav>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Connect with our team
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-[#1D2C43] lg:text-5xl">
            Get in Touch
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Have a question about window styles, door replacements, energy
            rebates, or scheduling a private showroom visit? Reach out directly
            to our local Seattle specialists.
          </p>
        </section>

        <section className="mx-auto mb-20 grid max-w-7xl grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="space-y-6 lg:col-span-5">
            <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EFEBE4] text-[#1D2C43]">
                <PhoneIcon />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Phone
              </p>
              <a
                href="tel:2064024229"
                className={`mt-1 inline-block font-serif text-2xl font-bold text-[#1D2C43] hover:underline ${focusRing}`}
              >
                (206) 402-4229
              </a>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Direct line for all three showroom locations and service
                estimates.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EFEBE4] text-[#1D2C43]">
                <MailIcon />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </p>
              <a
                href="mailto:contact@soundviewseattle.com"
                className={`mt-1 inline-block break-all font-serif text-xl font-bold text-[#1D2C43] hover:underline sm:text-2xl ${focusRing}`}
              >
                contact@soundviewseattle.com
              </a>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Send project blueprints, photos, or general inquiries anytime.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EFEBE4] text-[#1D2C43]">
                <ClockIcon />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Hours of Operation
              </p>
              <p className="mt-1 font-serif text-2xl font-bold leading-snug text-[#1D2C43]">
                Monday through Friday: 8:00 AM to 4:30 PM
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Saturday consultations available by appointment. Closed Sunday.
              </p>
            </article>

            <p className="rounded-2xl border border-[#DDE2E6] bg-[#EFEBE4] px-6 py-4 text-sm leading-6 text-[#1D2C43]">
              Typical response time is under 2 business hours during operating
              hours. Zero high-pressure sales calls.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#1D2C43] sm:text-3xl">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </section>

        <section className="border-t border-[#DDE2E6] bg-[#EFEBE4]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center font-serif text-3xl font-bold text-[#1D2C43] sm:text-4xl">
              Visit One of Our Showrooms
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-relaxed text-slate-600 sm:text-lg">
              See our premium selection of windows and doors in person. Our
              experts are here to help you find the perfect fit for your home.
              Experience the elite craftsmanship and design options firsthand in
              our local space.
            </p>
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
              {showrooms.map((showroom) => (
                <Link
                  key={showroom.href}
                  href={showroom.href}
                  className={`flex items-center gap-2 rounded-xl border-2 border-[#1D2C43] px-6 py-3 font-semibold text-[#1D2C43] transition-colors hover:bg-[#1D2C43] hover:text-white ${focusRing}`}
                >
                  <MapPinIcon />
                  {showroom.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.2 3.5h2.1l1 2.6-1.3 1.1a11 11 0 0 0 4.8 4.8l1.1-1.3 2.6 1v2.1c0 .6-.5 1.2-1.1 1.2A12.4 12.4 0 0 1 4.9 4.6c0-.6.6-1.1 1.3-1.1Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.5 6 6.5 5 6.5-5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="10" r="6.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6.5V10l2.5 1.5" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 17.5s5-4.4 5-8.2A5 5 0 0 0 5 9.3c0 3.8 5 8.2 5 8.2Z" />
      <circle cx="10" cy="9.2" r="1.6" />
    </svg>
  );
}

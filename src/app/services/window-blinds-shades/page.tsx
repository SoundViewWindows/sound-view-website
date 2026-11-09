import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ConsultationForm } from "./consultation-form";

export const metadata: Metadata = {
  title: "Window Blinds & Shades | Sound View Window & Door",
  description:
    "Custom blinds and motorized shades for privacy, light control, and insulation in Greater Seattle homes.",
};

const shopHref =
  "https://sound-view-window-door.myshopify.com/collections/window-treatments";

const treatments = [
  {
    tagline: "CLEAN & MINIMALIST",
    title: "Roller & Solar Shades",
    copy: "Sleek low-profile design that cuts glare and protects interior flooring from UV damage while maintaining natural light.",
  },
  {
    tagline: "MAXIMUM INSULATION",
    title: "Cellular / Honeycomb Shades",
    copy: "Honeycomb air pockets trap air along window glass, reducing heat loss during damp Seattle winters and keeping rooms cool in summer.",
  },
  {
    tagline: "CLASSIC LIGHT CONTROL",
    title: "Wood & Faux Wood Blinds",
    copy: "Timeless handcrafted slat styling with precision tilt control. Moisture-resistant composite options available for kitchens and bathrooms.",
  },
  {
    tagline: "CONNECTED LIVING",
    title: "Motorized & Smart Shades",
    copy: "Whisper-quiet automated shades synchronized with sunrise, sunset, or your smartphone and voice assistant routines.",
  },
];

export default function WindowBlindsShadesPage() {
  return (
    <div className="scroll-smooth bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="rounded-sm hover:text-[#1B2A4A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span>Services</span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Window Blinds & Shades</span>
              </li>
            </ol>
          </nav>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            CUSTOM WINDOW TREATMENTS
          </p>
          <h1 className="mb-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-[#1B2A4A] lg:text-5xl">
            Custom Blinds and Motorized Shades Tailored to Your Home
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Enhance privacy, soften natural sunlight, and boost insulation with
            premium custom blinds and motorized window shades engineered for
            Pacific Northwest living.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={shopHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2A4A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
            >
              <ShoppingBagIcon />
              Shop Window Treatments Online
            </a>
            <a
              href="#measurement-consultation"
              className="inline-flex items-center justify-center rounded-full border border-[#1B2A4A] px-6 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-[#1B2A4A] hover:text-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
            >
              Request In-Home Consultation
            </a>
          </div>
        </section>

        <section aria-label="Treatment categories">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-4">
            {treatments.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {item.tagline}
                </p>
                <h2 className="mt-3 font-serif text-2xl font-medium leading-tight text-[#1B2A4A]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#1B2A4A] px-6 py-10 text-[#FAF8F5] sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl">
                Order Custom Window Treatments Directly Online
              </h2>
              <p className="mt-3 text-base leading-7 text-[#FAF8F5]/80">
                Explore fabric samples, operating systems, and size options
                ready to ship directly to your door through our online catalog.
              </p>
            </div>
            <a
              href={shopHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#FAF8F5] px-6 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F5] lg:mt-0"
            >
              Visit Our Window Treatments Shop
              <ExternalLinkIcon />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div
            id="measurement-consultation"
            className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              In-home service
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium leading-tight text-[#1B2A4A] sm:text-4xl">
              Measurement and Consultation
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
              Prefer a turnkey visit? We measure on site, match fabrics to your
              rooms, and handle professional installation across the Greater
              Seattle Area.
            </p>
            <div className="mt-8">
              <ConsultationForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 8.5h11l-.7 10.2a1.5 1.5 0 0 1-1.5 1.4H8.7a1.5 1.5 0 0 1-1.5-1.4L6.5 8.5Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5h5v5M19 5l-8 8"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 13.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4.5"
      />
    </svg>
  );
}

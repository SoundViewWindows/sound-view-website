import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Link from "next/link";
import { Header } from "@/components/Header";
import { CostComparison } from "@/components/CostComparison";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/window-blinds-shades"),
  },
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
    image: "/services/blinds/roller-solar-shades.jpg",
    imageAlt:
      "Custom dark solar roller shades on kitchen picture windows cutting glare and UV light",
  },
  {
    tagline: "MAXIMUM INSULATION",
    title: "Cellular / Honeycomb Shades",
    copy: "Honeycomb air pockets trap air along window glass, reducing heat loss during damp Seattle winters and keeping rooms cool in summer.",
    image: "/services/blinds/cellular-honeycomb-shades.jpg",
    imageAlt:
      "Cordless insulating cellular honeycomb shades for cold weather window thermal efficiency",
  },
  {
    tagline: "CLASSIC LIGHT CONTROL",
    title: "Wood & Faux Wood Blinds",
    copy: "Timeless handcrafted slat styling with precision tilt control. Moisture-resistant composite options available for kitchens and bathrooms.",
    image: "/services/blinds/wood-faux-wood-blinds.jpg",
    imageAlt: "Warm natural wood horizontal slat blinds over residential living room windows",
  },
  {
    tagline: "CONNECTED LIVING",
    title: "Motorized & Smart Shades",
    copy: "Whisper-quiet automated shades synchronized with sunrise, sunset, or your smartphone and voice assistant routines.",
    image: "/services/blinds/motorized-smart-shades.jpg",
    imageAlt: "Hand holding wireless remote operating smart motorized roller window shade",
  },
];

export default function WindowBlindsShadesPage() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
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
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            CUSTOM WINDOW TREATMENTS
          </p>
          <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight text-white lg:text-5xl">
            Custom Blinds and Motorized Shades Tailored to Your Home
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Enhance privacy, soften natural sunlight, and boost insulation with
            premium custom blinds and motorized window shades engineered for
            Pacific Northwest living.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={shopHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              <ShoppingBagIcon />
              Shop Window Treatments Online
            </a>
          </div>
        </section>

        <section aria-label="Treatment categories">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {treatments.map((item) => (
              <a
                key={item.title}
                href={shopHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/80 bg-[#132238] shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 sm:h-48">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {item.tagline}
                    </p>
                    <h2 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-slate-100">
                      {item.title}
                    </h2>
                    <p className="mb-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
                      {item.copy}
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-white group-hover:underline">
                    Shop Style Online
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#1D2C43] px-6 py-10 text-[#FFFFFF] sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-medium leading-tight sm:text-4xl">
                Order Custom Window Treatments Directly Online
              </h2>
              <p className="mt-3 text-base leading-7 text-[#FFFFFF]/80">
                Explore fabric samples, operating systems, and size options
                ready to ship directly to your door through our online catalog.
              </p>
            </div>
            <a
              href={shopHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#38BDF8] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] lg:mt-0"
            >
              Visit Our Window Treatments Shop
              <ExternalLinkIcon />
            </a>
          </div>
        </section>

        <CostComparison service="blinds-shades" />
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

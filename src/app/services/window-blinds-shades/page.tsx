import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Link from "next/link";
import { BlindsQuoteRequest, ShadeQuoteButton } from "@/components/BlindsQuoteRequest";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { ServiceFunnelCarousel } from "@/components/ServiceFunnelCarousel";
import { CostComparison } from "@/components/CostComparison";
import { treatmentStyles } from "@/lib/window-treatments";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/window-blinds-shades"),
  },
  title: "Get a Free Custom Blinds & Shades Quote in Greater Seattle | Sound View Window & Door",
  description:
    "Request a free custom blinds and shades quote in Greater Seattle. Compare fabrics, light control, and motorized options with clear pricing and no pressure.",
};

const shopHref =
  "https://sound-view-window-door.myshopify.com/collections/window-treatments";

const treatments = treatmentStyles.map((style) => ({
  tagline: style.tagline,
  title: style.styleName,
  copy: style.cardCopy,
  image: style.cardImage,
  imageAlt: style.cardImageAlt,
  href: style.path,
}));

export default function WindowBlindsShadesPage() {
  return (
    <div>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0B192C] text-white">
          <div className="pointer-events-none select-none absolute inset-0 z-0">
            <img
              src="/images/window-blinds-shades-bg.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/75" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-5 md:py-12">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex min-w-0 flex-col items-start lg:col-span-7">
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
                Custom Window Blinds &amp; Shades
              </p>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] leading-[1.08]">
                Get a Free Custom Blinds &amp; Shades Quote in Greater Seattle
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                The right window treatments should fit your windows, your routines, and the way you use each room. We&apos;ll help you compare fabrics, styles, light-filtering options, and motorization with clear pricing and no pressure.
              </p>
              <div className="flex flex-wrap gap-4">
                <ShadeQuoteButton />
                <a
                  href={shopHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#0F1D2E] shadow-lg transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <ShoppingBagIcon />
                  Shop Window Treatments Online
                </a>
              </div>
            </div>
            <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
              <div id="blinds-quote-form" className="w-full max-w-md scroll-mt-24">
                <BlindsQuoteRequest />
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10">

        <section aria-label="Treatment categories">
          <div className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-5">
          <ServiceFunnelCarousel>
            {treatments.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[4px] border border-white/15 bg-[#182B3E]/75 backdrop-blur-[2px] transition-all hover:border-white/35 hover:bg-[#31465A]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <span className="relative h-52 w-full shrink-0 overflow-hidden bg-slate-800 sm:h-56">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </span>
                <span className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden p-5 sm:p-6">
                  <span>
                    <span className="mb-2 block text-[15px] font-bold leading-tight text-white">
                      {item.title}
                    </span>
                    <span className="line-clamp-4 block text-xs leading-relaxed text-slate-300">
                      {item.copy}
                    </span>
                  </span>
                  <span className="mt-auto pt-3">
                    <span className="mb-2 block text-xs font-medium leading-snug text-sky-400">
                      {item.tagline}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
                      Explore Style & Details
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </ServiceFunnelCarousel>
          </div>
        </section>
          </div>
        </section>

        <section
          className="bg-[#E6ECF2] py-16 text-[#0B192C] md:py-20"
          style={{ backgroundColor: "#E6ECF2", paddingTop: "64px", paddingBottom: "64px" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="rounded-[4px] border border-slate-200/80 bg-white px-6 py-10 shadow-sm sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0B192C] sm:text-4xl">
                  Order Custom Window Treatments Directly Online
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Explore fabric samples, operating systems, and size options
                  ready to ship directly to your door through our online catalog.
                </p>
              </div>
              <a
                href={shopHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] lg:mt-0"
              >
                Visit Our Window Treatments Shop
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </section>

        <CostComparison service="blinds-shades" theme="about" />
      </main>
      <CtaBanner
        className="py-16 text-white md:py-20 [&_h2]:text-white [&_p]:text-slate-300"
        style={{
          backgroundColor: "#182B3E",
          paddingTop: "64px",
          paddingBottom: "64px",
          borderTop: "none",
        }}
      />
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

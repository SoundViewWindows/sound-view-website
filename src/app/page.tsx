"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CountUp } from "@/components/CountUp";
import { Header } from "@/components/Header";
import { HeroActionButtons } from "@/components/HeroActionButtons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ServiceAreasSection } from "@/components/ServiceAreasSection";
import { services } from "@/lib/services";

const serviceCardCopy: Record<string, string> = {
  "window-replacement":
    "Replace drafty, outdated windows with energy-efficient replacement windows. Explore styles and glass options for your home, with professional window installation to improve comfort and update your home’s appearance.",
  "door-replacement":
    "Upgrade your home with replacement entry doors, sliding patio doors, and French doors. Professional door installation helps address drafts, difficult operation, and worn-out doors while updating your home’s style.",
  "shower-door-replacement":
    "Update your bathroom with custom glass shower doors and shower enclosures. Explore frameless and framed options, with professional measurement and installation for your shower layout.",
  "glass-replacement":
    "Replace cracked, broken, or foggy window glass without replacing the entire window when the existing frame is suitable. Get professional glass replacement to restore clear views and address damaged or failed glass.",
  "glass-railing-installation":
    "Open up your view with custom glass railings for decks, balconies, and stairs. Explore framed and frameless glass railing systems, with professional installation for indoor and outdoor projects.",
  "window-blinds-shades":
    "Add privacy and control sunlight with custom window blinds and shades. Explore light-filtering, blackout, and motorized options, with professional measurement and installation for a tailored fit.",
};

export default function Home() {
  const [projectType, setProjectType] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (window.location.hash !== "#homepage-quote-box") return;
    const timer = window.setTimeout(() => {
      document.getElementById("homepage-quote-box")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
    return () => window.clearTimeout(timer);
  }, []);

  function focusQuote() {
    document.getElementById("homepage-quote-box")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    document.getElementById("quote-name")?.focus({ preventScroll: true });
  }

  function chooseService(id: string) {
    setProjectType(id);
    if (window.innerWidth < 1024) {
      document.getElementById("homepage-quote-box")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className="bg-home-canvas text-[#E7EEF3]">
    <div className="flex min-h-screen flex-col">
      <Header onServiceSelect={chooseService} />

      <section id="hero" className="relative flex-1 overflow-hidden bg-[#0B192C]">
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/65" />
        </div>
      <main className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 gap-4 px-4 pb-0 sm:px-5 lg:grid-cols-[minmax(0,1fr)_calc(18rem+70px)] lg:items-start lg:pb-3 lg:pl-5 lg:pr-0">
        <div className="relative z-20 flex min-h-0 flex-col">
          <div className="relative z-30 mb-4 flex w-full flex-col items-center justify-center gap-5 pb-7 pt-6 md:flex-row md:pb-4 md:pt-5 xl:pb-5 xl:pt-6">
            <Image
              src="/images/sv-crest-white.png"
              alt="Sound View crest"
              width={96}
              height={96}
              className="h-20 w-20 shrink-0 object-contain mix-blend-screen sm:h-24 sm:w-24 md:hidden"
            />
            <Image
              src="/images/sv-crest-white.png"
              alt="Sound View crest"
              width={168}
              height={168}
              style={{ width: "168px", height: "168px", maxWidth: "168px", minWidth: "168px" }}
              className="hidden h-[120px] w-[120px] shrink-0 object-contain mix-blend-screen sm:h-[168px] sm:w-[168px] md:block"
            />
            <div className="flex min-w-0 flex-col items-center text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-400 sm:text-sm">
                Seattle, Bellevue & Greater Puget Sound
              </p>
              <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl md:leading-none lg:whitespace-nowrap lg:text-6xl">
                <span className="md:hidden">
                  Sound View
                  <br />
                  Window & Door
                </span>
                <span className="hidden md:inline">Sound View Window & Door</span>
              </h1>
              <p className="mb-3 mt-3 max-w-3xl text-lg text-slate-200 sm:text-xl">
                Relaxed consultations, honest answers, and zero pressure to buy
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={focusQuote}
                className="rounded-none bg-home-accent px-4 py-2 text-sm font-medium text-[#062033] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent md:hidden"
              >
                Get a Free Quote
              </button>
              <HeroActionButtons />
              </div>
            </div>
          </div>

          <section
            aria-label="Services"
            className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <Link
                key={service.id}
                href={
                  service.id === "window-replacement"
                    ? "/replacement-windows-seattle-wa/"
                    : service.id === "door-replacement"
                      ? "/doors-seattle-wa/"
                      : service.id === "shower-door-replacement"
                        ? "/frameless-shower-doors-and-enclosures/"
                        : service.id === "glass-replacement"
                          ? "/glass-replacement/"
                          : service.id === "glass-railing-installation"
                            ? "/services/glass-railing-installation"
                            : service.id === "window-blinds-shades"
                              ? "/services/window-blinds-shades"
                              : `/services/${service.id}`
                }
                className="flex h-full cursor-pointer flex-col justify-between rounded-xl border border-white/15 bg-[#182B3E]/75 p-4 backdrop-blur-[2px] transition-all hover:border-white/30 hover:bg-[#31465A]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
              >
                <div
                  className="mb-2 h-[132px] w-full shrink-0 overflow-hidden rounded-md bg-slate-800"
                  style={{ height: "132px" }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="block h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mb-1 text-sm font-bold leading-tight text-white xl:text-[15px]">
                  {service.title}
                </h3>
                <p className="text-[11px] leading-snug text-slate-300 xl:text-xs">
                  {serviceCardCopy[service.id] ?? service.summary}
                </p>
              </Link>
            ))}
          </section>
          <ScrollReveal>
            <section
              aria-label="Company credentials"
              className="mt-3 grid grid-cols-1 divide-y divide-home-line rounded-[4px] border border-[#8AA0B2]/30 bg-home-panel/80 px-6 py-3 text-center shadow-lg sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:text-left"
            >
              <div className="py-3 sm:px-4 sm:py-0 sm:pl-0">
                <p className="text-sm font-bold tracking-wide text-white">3 Puget Sound Showrooms</p>
                <p className="mt-0.5 text-xs text-slate-300">
                  Lake City <span className="text-home-accent">•</span> Queen Anne{" "}
                  <span className="text-home-accent">•</span> Bellevue
                </p>
              </div>
              <div className="py-3 sm:px-4 sm:py-0">
                <p className="text-sm font-bold tracking-wide text-white">Authorized Factory Dealer</p>
                <p className="mt-0.5 text-xs text-slate-300">
                  Milgard <span className="text-home-accent">•</span> Andersen{" "}
                  <span className="text-home-accent">•</span> Ply Gem
                </p>
              </div>
              <div className="py-3 sm:px-4 sm:py-0 sm:pr-0">
                <p className="text-sm font-bold tracking-wide text-white">Local Craftsmanship</p>
                <p className="mt-0.5 text-xs text-slate-300">WA Licensed, Bonded & Insured</p>
              </div>
            </section>
          </ScrollReveal>
        </div>

        <aside
          id="homepage-quote-box"
          className="home-quote-panel relative z-10 flex scroll-mt-24 flex-col rounded-b-none p-6 text-white sm:p-7 lg:rounded-none lg:!w-[calc(18rem+70px)] lg:!max-w-[calc(18rem+70px)]"
        >
          {quoteSubmitted ? null : (
            <div className="-mx-6 -mt-6 px-6 py-6 text-center sm:-mx-7 sm:-mt-7 sm:px-8 sm:py-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8] sm:text-sm">
                Special Offer
              </p>
              <p className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[28px] lg:text-[30px]">
                Save 10% on Labor
              </p>
              <p className="mt-1.5 text-sm italic text-sky-100/95 sm:text-[15px]">
                Book your project by November 30th.
              </p>
            </div>
          )}
          <div
            className={
              quoteSubmitted
                ? "flex min-h-0 flex-1 flex-col items-center justify-start overflow-y-auto text-center"
                : "mt-5 min-h-0 flex-1"
            }
          >
            <QuoteRequestForm
              projectType={projectType}
              onProjectTypeChange={setProjectType}
              onSubmittedChange={setQuoteSubmitted}
            />
          </div>
        </aside>
      </main>
      </section>
    </div>

      <ShowroomShowcase />
      <HowItWorks />
      <FaqAndCta
        openIndex={openFaq}
        onToggle={(index) => setOpenFaq((current) => (current === index ? null : index))}
        onQuote={focusQuote}
      />
      <HomeownerReviews />
    </div>
  );
}

const homepageShowrooms = [
  {
    name: "Lake City Showroom",
    image: "/images/sound-view-lake-city-storefront.jpg",
    imageAlt: "Sound View Window and Door storefront on Lake City Way NE",
    address: "12301 Lake City Way NE, Seattle, WA 98125",
    hours: "Mon-Fri: 8:00 AM - 4:30 PM",
    phone: "(206) 572-3411",
    phoneHref: "tel:2065723411",
    href: "/window-and-door-showroom-in-seattle-wa-lake-city-way-ne/",
  },
  {
    name: "West Queen Anne Showroom",
    image: "/images/sound-view-queen-anne-showroom.jpg",
    imageAlt: "Sound View Window & Door West Queen Anne showroom exterior",
    address: "921 Elliott Ave W, Seattle, WA 98119",
    hours: "Mon-Fri: 8:00 AM - 4:30 PM",
    phone: "(206) 402-4229",
    phoneHref: "tel:2064024229",
    href: "/window-and-door-showroom-in-seattle-wa-921-elliott-ave/",
  },
  {
    name: "Bellevue Showroom",
    image: "/images/sound-view-bellevue-showroom.jpg",
    imageAlt: "Sound View Window & Door Bellevue showroom exterior",
    address: "13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005",
    hours: "Mon-Fri: By Appointment Only",
    phone: "(425) 417-3005",
    phoneHref: "tel:4254173005",
    href: "/bellevue-showroom/",
  },
] as const;

const factoryBrands = [
  {
    name: "Milgard",
    href: "https://www.milgard.com/",
    src: "/images/brands/milgard.png",
    alt: "Milgard Windows & Doors",
    cardClass: "overflow-hidden border border-[#D6001C] bg-[#D6001C] hover:border-red-800",
    imageClass:
      "h-full w-full object-contain scale-[1.6] transition-transform group-hover:scale-[1.75] sm:scale-[1.7]",
  },
  {
    name: "Andersen",
    href: "https://www.andersenwindows.com/",
    src: "/images/brands/andersen.png",
    alt: "Andersen Windows & Doors",
    cardClass: "overflow-hidden border border-slate-200 bg-white hover:border-sky-400",
    imageClass:
      "h-full w-full object-contain scale-[1.35] transition-transform group-hover:scale-[1.45] sm:scale-[1.4]",
  },
  {
    name: "Ply Gem",
    href: "https://www.plygem.com/",
    src: "/images/brands/ply-gem.png",
    alt: "Ply Gem Windows",
    cardClass: "border border-slate-200 bg-white px-6 hover:border-sky-400 sm:px-8",
    imageClass: "h-10 w-auto max-w-[185px] object-contain sm:h-12",
  },
] as const;

const steps = [
  {
    title: "Quote Or Showroom Visit",
    body: "Fill out our online quote form or book an appointment at one of our showrooms. Whether you have exact specs or need help exploring styles and materials, we will guide you toward the right products for your home and budget.",
  },
  {
    title: "Precision Measurement",
    body: "Our team visits your home to measure all critical dimensions down to the fraction of an inch. Getting exact measurements ensures your custom replacement windows and doors fit seamlessly with zero draft or alignment issues.",
  },
  {
    title: "Custom Order & Installation",
    body: "We order your custom units directly from top manufacturers like Milgard and Andersen, coordinate a start date that fits your schedule, and complete the installation with certified local craftsmanship and full cleanup.",
  },
];

const homeownerReviews = [
  {
    name: "David M.",
    place: "Queen Anne, Seattle",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote:
      "Sound View replaced 12 original windows in our home with zero high-pressure sales tactics. The team walked us through our options, the installers arrived right on schedule, and the draft reduction this winter has been incredible.",
  },
  {
    name: "Jennifer K.",
    place: "Bellevue Homeowner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    quote:
      "We needed a custom sliding patio door and a frameless glass shower door. The measurement team was precise down to the millimeter, and the finished installation looks like something out of an architectural magazine.",
  },
  {
    name: "Marcus & Elena R.",
    place: "Lake City, Seattle",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=80",
    quote:
      "Easily the best contractor experience we've had in the Seattle area. Clear communication from the showroom visit to installation day, flawless finish trim work, and complete cleanup when they were done.",
  },
];

const faqs = [
  {
    question: "How Does The Process Work?",
    answer:
      "It is three steps. We start with a consultation, either in a showroom or through the quote form. Then we measure every opening at your home. A certified crew installs the units on a day that fits your schedule. You get clear options at each step, and there is no pressure to decide on the spot.",
  },
  {
    question: "What Is The Project Timeline?",
    answer:
      "Because every window and door is custom built to the exact architectural specifications of your home, timelines vary from project to project. Lead times and installation scheduling depend on material availability, manufacturer production queues, and total project scope. Your project specialist will communicate clear, personalized timeline expectations directly with you during your initial consultation and provide ongoing updates as your order progresses.",
  },
  {
    question: "How Much Do Replacements Cost?",
    answer:
      "Costs depend on window size, framing material, glass efficiency packages, and structural opening requirements. We provide transparent, itemized quotes with no hidden fees or surprise upcharges.",
  },
  {
    question: "What Happens If A Product Has An Issue Or Damage While Under Warranty?",
    answer:
      "All products are backed by their respective manufacturer warranties, which cover material defects and component performance according to each brand's specific terms. Should a warranty issue arise, our team can help provide the necessary product documentation and connect you with the manufacturer's warranty claim process.",
  },
];

function ShowroomShowcase() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
          Visit Our Greater Seattle Showrooms
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl">
          Compare Full-Size Windows & Doors Before You Decide
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Skip the kitchen-table sales pitch. Operate full-size windows, patio doors, hardware, and glass packages in daylight at any of our three local showrooms.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {homepageShowrooms.map((room) => (
          <article
            key={room.name}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-sky-400 hover:shadow-md"
          >
            <div className="h-48 w-full overflow-hidden bg-slate-100">
              <img src={room.image} alt={room.imageAlt} className="h-full w-full object-cover object-center" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="text-lg font-bold text-[#0F1D2E]">{room.name}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">{room.address}</p>
                <p className="mt-2 text-sm text-slate-600">{room.hours}</p>
                <a
                  href={room.phoneHref}
                  className="mt-2 inline-block text-sm font-semibold text-[#0284C7] hover:text-[#0F1D2E]"
                >
                  {room.phone}
                </a>
              </div>
              <div className="mt-5 flex items-center gap-2.5 border-t border-slate-100 pt-4">
                <Link
                  href="/book-appointment"
                  className="flex-1 rounded-lg bg-[#38BDF8] px-3 py-2.5 text-center text-xs font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400"
                >
                  Book Visit
                </Link>
                <Link
                  href={room.href}
                  className="flex-1 rounded-lg bg-slate-100 px-3 py-2.5 text-center text-xs font-semibold text-[#0F1D2E] transition-colors hover:bg-slate-200"
                >
                  View Showroom
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-slate-200 px-4 pt-8 sm:px-6 xl:flex-row xl:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 xl:text-left">
          Authorized Factory Dealer For Top Manufacturers
        </p>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 xl:w-auto">
          {factoryBrands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${brand.name} website`}
              className={`group flex h-20 min-w-[180px] items-center justify-center rounded-2xl shadow-xs transition-all hover:shadow-md sm:h-24 sm:min-w-[210px] ${brand.cardClass}`}
            >
              <img src={brand.src} alt={brand.alt} className={brand.imageClass} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const accentStatClass =
  "mb-2 block text-4xl font-black tracking-tight text-[#0090c8] sm:text-5xl lg:text-6xl";
const navyStatClass =
  "mb-2 block text-4xl font-black tracking-tight text-[#0c1f38] sm:text-5xl lg:text-6xl";
const statLabelClass = "text-sm font-medium text-[#1e293b] sm:text-base";

function HowItWorks() {
  return (
    <section className="bg-[#f4fafd]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <p className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#608b9e] sm:text-sm">
            How It Works
          </p>
          <h2 className="mb-12 text-left text-3xl font-black tracking-tight text-[#0c1f38] sm:text-4xl lg:text-5xl">
            Our Straightforward Process
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 150} className="h-full">
              <article>
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border-b-4 border-[#0090c8] bg-white text-xl font-bold text-[#0c1f38] shadow-md sm:h-16 sm:w-16 sm:text-2xl">
                  {index + 1}
                </span>
                <h3 className="mb-3 text-xl font-bold leading-snug text-[#0c1f38] sm:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-[#556980] sm:text-base">
                  {step.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="mt-12 w-full border-t border-slate-100 bg-white px-4 py-12 sm:px-6">
        <dl className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-slate-200 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-4 py-6 md:py-2">
            <dt>
              <CountUp
                end={10000}
                suffix="+"
                grouped
                duration={1300}
                className={`${accentStatClass} whitespace-nowrap`}
              />
            </dt>
            <dd className={statLabelClass}>Completed Installations</dd>
          </div>
          <div className="px-4 py-6 md:py-2">
            <dt>
              <CountUp
                end={4.9}
                decimals={1}
                suffix="/5"
                duration={1300}
                className={accentStatClass}
              />
            </dt>
            <dd className={statLabelClass}>Average Customer Rating</dd>
          </div>
          <div className="px-4 py-6 md:py-2">
            <dt>
              <CountUp end={17} suffix="+" duration={1300} className={navyStatClass} />
            </dt>
            <dd className={statLabelClass}>Years Serving Greater Seattle</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function HomeownerReviews() {
  return (
    <section
      className="bg-[#0072CE] px-4 py-4 text-center sm:px-6 md:py-5 lg:px-8"
      style={{ paddingTop: "18px", paddingBottom: "18px" }}
      aria-label="Homeowner testimonials"
    >
      <ScrollReveal>
        <p className="mb-0.5 block text-[11px] font-bold uppercase tracking-widest text-white/80">
          Our Happy Customers
        </p>
        <h2 className="mx-auto mb-3 text-lg font-extrabold tracking-tight text-white sm:text-xl lg:whitespace-nowrap lg:text-2xl">
          Trusted By Homeowners Across Greater Seattle
        </h2>
      </ScrollReveal>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-3 text-left md:grid-cols-3 lg:gap-4">
        {homeownerReviews.map((review, index) => (
          <ScrollReveal key={review.name} delay={index * 100} className="h-full">
            <figure className="flex h-full flex-col justify-between rounded-[4px] border border-white/20 bg-white px-3.5 py-2.5 shadow-xl">
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold leading-tight text-slate-900">
                        {review.name}
                      </span>
                      <span className="block text-[11px] font-medium leading-tight text-slate-500">
                        {review.place}
                      </span>
                    </span>
                  </span>
                  <div
                    className="flex shrink-0 origin-right scale-90 items-center gap-0.5 text-xs text-[#0F172A]"
                    aria-label="5 stars"
                  >
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                    <span aria-hidden="true">★</span>
                  </div>
                </div>
                <blockquote className="mb-0 text-[11px] italic leading-snug text-slate-600 sm:text-xs">
                  “{review.quote}”
                </blockquote>
              </div>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function FaqAndCta({
  openIndex,
  onToggle,
  onQuote,
}: {
  openIndex: number | null;
  onToggle: (index: number) => void;
  onQuote: () => void;
}) {
  return (
    <>
    <ServiceAreasSection />
    <section className="w-full bg-[#0F1D2E] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <ScrollReveal className="lg:col-span-5">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            You Ask, We Answer
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            Have questions about updating your home? Here are clear, upfront
            answers about our products, precision measurement process, and
            certified installation.
          </p>
        </ScrollReveal>
        <div className="divide-y divide-white/15 border-b border-t border-white/15 lg:col-span-7">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => onToggle(index)}
                  className="group flex w-full cursor-pointer items-center justify-between py-5 text-left text-base font-bold text-white transition-colors hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] sm:py-6 sm:text-lg"
                >
                  {item.question}
                  <PlusMinus open={open} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden" aria-hidden={!open}>
                    <p className="pb-6 pr-6 text-sm leading-relaxed text-slate-300 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-5 lg:py-20">
          <ScrollReveal>
            <h2 className="text-4xl tracking-tight text-[#0B192C] sm:text-5xl">
              Ready To Upgrade Your Home? Get A Quote Now!
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Connect with our Seattle specialists to discuss your project,
              explore top-tier products from brands like Milgard and Andersen, or
              schedule a personalized consultation at one of our local showrooms.
            </p>
          </ScrollReveal>
          <button
            type="button"
            onClick={onQuote}
            className="mt-8 rounded-[4px] bg-home-accent px-6 py-3 text-base font-medium text-[#062033] transition-colors hover:bg-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
          >
            Get A Free Quote
          </button>
        </div>
    </section>
    </>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:text-sky-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" d="M4 10h12" />
      <path
        strokeLinecap="round"
        d="M10 4v12"
        className={`origin-center transition-transform duration-300 ${open ? "scale-y-0" : ""}`}
      />
    </svg>
  );
}


import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { GlassRailingRequest, RequestInstallationButton } from "@/components/GlassRailingRequest";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { WhyChooseSoundView } from "@/components/WhyChooseSoundView";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/services/glass-railing-installation"),
  },
  title: "Glass Railing Installation | Sound View Window & Door",
  description:
    "Tempered glass railings for decks, balconies, and staircases across the Greater Seattle Area.",
};

const highlights = [
  {
    title: "Tempered Safety Glass",
    body: "Heat-treated panels sized for the opening so the railing stays clear, strong, and comfortable to live with.",
  },
  {
    title: "Marine-Ready Hardware",
    body: "Spigots, posts, and clamps chosen for damp Pacific Northwest air, including homes near the water.",
  },
  {
    title: "Measured On Site",
    body: "A local installer checks the deck, balcony, or stair before the glass is ordered, so the fit stays precise.",
  },
];

const railingPhoto = "/services/glass-railing.jpg";

const systems = [
  {
    title: "Frameless Standoff Glass Railings",
    body: "Heavy tempered glass mounted with marine-grade stainless steel standoffs for uninterrupted views.",
    alt: "Glass loft railing with stainless standoff clamps",
    src: railingPhoto,
    position: "18% 72%",
  },
  {
    title: "Post & Top-Rail Systems",
    body: "Engineered aluminum or stainless posts with slim top rails for decks and elevated balconies.",
    alt: "Glass railing with a slim stainless top rail",
    src: "/images/post-top-rail-systems.jpg",
  },
  {
    title: "Interior Staircase & Loft Railings",
    body: "Custom-angled tempered glass panels that open up interior light and sightlines.",
    alt: "Interior staircase and loft glass railing",
    src: "/images/interior-staircase-railings.jpg",
  },
];

export default function GlassRailingPage() {
  return (
    <div>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0B192C] text-white">
          <div className="pointer-events-none select-none absolute inset-0 z-0">
            <img
              src="/images/glass-railing-hero-bg.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/75" />
          </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-5">
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
                    <span aria-current="page">Glass Railing Installation</span>
                  </li>
                </ol>
              </nav>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-300">
                Architectural Glass Systems
              </p>
              <h1 className="mb-4 max-w-full text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Custom Glass Railings Engineered for Unobstructed Views
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Open up your deck, balcony, or interior staircase with
                precision-measured tempered glass railing systems designed to
                withstand Pacific Northwest marine conditions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://sound-view-window-door.myshopify.com/collections/shower-glass-hardware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-[4px] bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <BagIcon />
                  Shop Railing Hardware Online
                </a>
                <RequestInstallationButton />
              </div>
            </div>
            <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
              <div id="railing-quote-form" className="w-full max-w-md scroll-mt-24">
                <GlassRailingRequest />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[4px] border border-white/15 bg-[#182B3E]/75 p-4 backdrop-blur-[2px]"
              >
                <h2 className="text-[15px] font-bold leading-tight text-white">{item.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        </section>

        <section
          className="bg-[#E6ECF2] py-16 text-[#0B192C] md:py-20"
          style={{ backgroundColor: "#E6ECF2", paddingTop: "64px", paddingBottom: "64px" }}
          aria-labelledby="railing-systems"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0284C7]">
              Systems and Applications
            </p>
            <h2 id="railing-systems" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Glass Railing Systems & Applications
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {systems.map((system) => (
                <article
                  key={system.title}
                  className="overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm"
                >
                  <div className="relative h-[160px] overflow-hidden">
                    <Image
                      src={system.src}
                      alt={system.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className={
                        "position" in system
                          ? "object-cover"
                          : "h-full w-full object-cover object-center"
                      }
                      style={"position" in system ? { objectPosition: system.position } : undefined}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-bold leading-tight text-[#0B192C]">{system.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{system.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <WhyChooseSoundView layout="light" />
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

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h10l-.7 9.1a1 1 0 0 1-1 .9H6.7a1 1 0 0 1-1-.9L5 7Z" />
      <path strokeLinecap="round" d="M8 7V5.5A2 2 0 0 1 10 3.5v0a2 2 0 0 1 2 2V7" />
    </svg>
  );
}

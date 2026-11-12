import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Link from "next/link";
import { GlassRailingRequest, RequestInstallationButton } from "@/components/GlassRailingRequest";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";

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

export default function GlassRailingPage() {
  return (
    <div className="bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-5">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex min-w-0 flex-col items-start lg:col-span-7">
              <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-300">
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
              <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Open up your deck, balcony, or interior staircase with
                precision-measured tempered glass railing systems designed to
                withstand Pacific Northwest marine conditions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://sound-view-window-door.myshopify.com/collections/shower-glass-hardware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <BagIcon />
                  Shop Railing Hardware Online
                </a>
                <RequestInstallationButton />
              </div>
            </div>
            <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
              <div className="w-full max-w-md">
                <GlassRailingRequest />
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 pb-20 sm:px-5 md:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-white/15 bg-[#2B3E50]/85 p-3.5 sm:p-4"
              >
                <h2 className="text-base font-bold text-white sm:text-lg">{item.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-[13px]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <CtaBanner />
      </main>
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

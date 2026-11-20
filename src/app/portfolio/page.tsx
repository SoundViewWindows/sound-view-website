import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import Link from "next/link";
import { Header } from "@/components/Header";
import { CategoryFunnel } from "@/components/portfolio/CategoryFunnel";
import { SoundViewPageHero } from "@/components/SoundViewPageHero";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.portfolio),
  },
  title: "Portfolio | Sound View Window & Door",
  description:
    "Recent window replacements, custom door upgrades, and architectural glass projects across Greater Seattle, with field videos and before-and-after installations.",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const videos = [
  {
    src: "https://www.youtube.com/embed/_330VSt1DKs",
    title: "Complete Window Tear-Out & Weatherproof Install",
    label: "Complete Window Tear-Out & Install",
  },
  {
    src: "https://www.youtube.com/embed/wcTlT2Mdw_E",
    title: "On-Site Architectural Glass & Trim Installation",
    label: "On-Site Glass & Trim Installation",
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <main>
        <SoundViewPageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
          eyebrow="PROJECT PORTFOLIO"
          title="Completed Window, Door & Glass Installations"
          subtitle="Browse real Greater Seattle projects, field installation videos, and before-and-after home transformations."
          primaryAction={{ label: "Schedule a Showroom Visit", href: "/book-appointment" }}
          secondaryAction={{ label: "Request a Free Quote", href: "/#homepage-quote-box" }}
          afterActions={
            <div className="mt-6 w-full border-t border-slate-700/70 pt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                Watch Our Installers in the Field
              </p>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {videos.map((video) => (
                  <article
                    key={video.src}
                    className="overflow-hidden rounded-xl border border-slate-700/80 bg-[#152538]/90 transition-colors hover:border-sky-400/70"
                  >
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        src={video.src}
                        title={video.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="truncate px-3 py-2 text-xs font-semibold text-white">{video.label}</p>
                  </article>
                ))}
              </div>
            </div>
          }
          rightContent={<CategoryFunnel />}
        />

        <section
          className="bg-white pt-20 pb-20"
          style={{ paddingTop: "80px", paddingBottom: "80px" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-md sm:p-12">
            <h2 className="mt-0 text-3xl font-extrabold tracking-tight text-[#0B192C]">Ready to Upgrade Your Home Openings?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#556980]">
              Get upfront pricing and honest guidance on your window, door, or
              glass project from local specialists who take pride in every
              install.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/replacement-windows-seattle-wa/"
                className={`rounded-xl bg-[#38BDF8] px-6 py-3 font-extrabold uppercase tracking-wide text-[#0B192C] transition-colors hover:bg-sky-300 ${focusRing}`}
              >
                Start Your Window Estimate
              </Link>
              <Link
                href="/doors-seattle-wa/"
                className={`rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-sky-400 ${focusRing}`}
              >
                Start Your Door Estimate
              </Link>
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}

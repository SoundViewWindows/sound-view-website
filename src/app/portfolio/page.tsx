import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import Link from "next/link";
import { FlushQuoteSidebar } from "@/components/FlushQuoteSidebar";
import { Header } from "@/components/Header";
import { portfolioCategories } from "@/lib/portfolio-categories";

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
        <section className="flex flex-col lg:flex-row">
          <div className="relative flex-1 overflow-hidden bg-[#0F1D2E] py-8 pl-4 pr-4 text-white sm:pl-6 sm:pr-6 lg:py-10 lg:pl-10 lg:pr-10 xl:pl-16">
            <div className="pointer-events-none absolute inset-0 z-0 select-none">
              <img
                src="/images/hero-bg.jpg"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/65 via-[#0F1D2E]/45 to-[#0F1D2E]/65" />
            </div>
            <div className="relative z-10">
              <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-slate-700/80 bg-[#152538]/90 px-6 py-5 backdrop-blur-xs sm:px-8 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
                    <ol className="flex flex-wrap items-center gap-2">
                      <li>
                        <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                          Home
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <span aria-hidden="true">&gt;</span>
                        <span aria-current="page">Portfolio</span>
                      </li>
                    </ol>
                  </nav>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                    Project Portfolio
                  </p>
                  <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    Completed Window, Door & Glass Installations
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-300">
                    Browse real Greater Seattle projects, field installation videos, and before-and-after home transformations.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  <Link
                    href="/book-appointment"
                    className={`rounded-lg bg-[#38BDF8] px-5 py-2.5 font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
                  >
                    Schedule a Showroom Visit
                  </Link>
                  <a
                    href="#portfolio-quote"
                    className={`rounded-lg bg-white px-5 py-2.5 font-bold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`}
                  >
                    Request a Free Quote
                  </a>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {portfolioCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/portfolio/${category.slug}`}
                    className={`rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10 sm:text-sm ${focusRing}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {portfolioCategories.map((category) => {
                  const preview = category.images[0];
                  return (
                    <Link
                      key={category.slug}
                      href={`/portfolio/${category.slug}`}
                      className={`overflow-hidden rounded-2xl border border-slate-700/80 bg-[#152538]/90 shadow-xl backdrop-blur-xs transition-colors hover:border-sky-400/70 ${focusRing}`}
                    >
                      <div className="h-48 w-full overflow-hidden bg-[#0F1D2E] sm:h-56">
                        {preview ? (
                          <img
                            src={preview.src}
                            alt={preview.alt}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : null}
                      </div>
                      <div className="p-5 sm:p-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                          {preview?.area ?? "Greater Seattle"}
                        </p>
                        <h2 className="mt-1 text-lg font-bold text-white">{category.name}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{category.funnel}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-slate-700/70 pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                  Watch Our Installers in the Field
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {videos.map((video) => (
                    <article
                      key={video.src}
                      className="overflow-hidden rounded-xl border border-slate-700/80 bg-[#152538]/90"
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
                      <p className="truncate px-4 py-3 text-sm font-semibold text-white">{video.label}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <FlushQuoteSidebar id="portfolio-quote" formName="portfolio-quote" />
        </section>

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

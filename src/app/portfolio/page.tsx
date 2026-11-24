import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import Link from "next/link";
import { Header } from "@/components/Header";
import { QuoteSlideIn } from "@/components/QuoteSlideIn";
import { portfolioCategories } from "@/lib/portfolio-categories";
import { services } from "@/lib/services";

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

const categoryServiceId: Record<string, string> = {
  windows: "window-replacement",
  doors: "door-replacement",
  "shower-doors": "shower-door-replacement",
  glass: "glass-railing-installation",
  "window-blinds-shades": "window-blinds-shades",
};

function categoryCardImage(slug: string) {
  const serviceId = categoryServiceId[slug];
  return services.find((service) => service.id === serviceId);
}

export default function PortfolioPage() {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <QuoteSlideIn id="portfolio-quote" formName="portfolio-quote" />
      <main>
        <section className="relative overflow-hidden bg-[#0F1D2E] py-8 text-white lg:py-10">
            <div className="pointer-events-none absolute inset-0 z-0 select-none">
              <img
                src="/images/hero-bg.jpg"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/65 via-[#0F1D2E]/45 to-[#0F1D2E]/65" />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
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
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                  Project Portfolio
                </p>
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Completed Window, Door & Glass Installations
                </h1>
                <p className="mt-2 text-sm text-slate-200">
                  Browse real Greater Seattle projects, field installation videos, and before-and-after home transformations.
                </p>
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
                  const cardImage = categoryCardImage(category.slug);
                  return (
                    <Link
                      key={category.slug}
                      href={`/portfolio/${category.slug}`}
                      className={`flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#0F1D2E]/90 shadow-2xl backdrop-blur-md transition-colors hover:border-[#38BDF8]/60 ${focusRing}`}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#0F1D2E]">
                        {cardImage ? (
                          <img
                            src={cardImage.image}
                            alt={cardImage.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                          {preview?.area ?? "Greater Seattle"}
                        </p>
                        <h2 className="mt-1 text-lg font-bold text-white">{category.name}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-200">{category.funnel}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
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

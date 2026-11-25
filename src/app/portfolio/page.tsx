import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import { Header } from "@/components/Header";
import { PortfolioCompactHeader, portfolioPillClass } from "@/components/portfolio/PortfolioCompactHeader";
import { QuoteDrawerButton, QuoteSlideIn } from "@/components/QuoteSlideIn";
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

const serviceLinks = [
  { label: "Windows", href: publicPaths.windows },
  { label: "Doors", href: publicPaths.doors },
  { label: "Shower Doors", href: publicPaths.shower },
  { label: "Glass", href: publicPaths.glass },
];

const projects = portfolioCategories.flatMap((category) =>
  category.images.map((image) => ({
    ...image,
    categoryName: category.name,
    categorySlug: category.slug,
  })),
);

export default function PortfolioPage() {
  return (
    <div className="bg-white text-[#0F1D2E]" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
      <Header />
      <QuoteSlideIn id="portfolio-quote" formName="portfolio-quote" />
      <main>
        <PortfolioCompactHeader
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Portfolio" },
          ]}
          eyebrow="Greater Seattle Project Portfolio"
          title="Window, Door & Glass Installations Across Greater Seattle"
          subtitle="Compare real Greater Seattle window, door, shower glass, railing, and window treatment projects."
        />

        <section className="bg-white pt-6 pb-16" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Portfolio categories" className="flex max-w-full flex-wrap gap-2">
              <Link
                href="/portfolio"
                aria-current="page"
                className={`${portfolioPillClass} border border-[#38BDF8] bg-[#38BDF8] text-[#0F1D2E]`}
              >
                All
              </Link>
              {portfolioCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/portfolio/${category.slug}`}
                  className={`${portfolioPillClass} border border-slate-200 bg-white text-[#0F1D2E] transition-colors hover:border-sky-400`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Link
                  key={project.src}
                  href={`/portfolio/${project.categorySlug}/images`}
                  className={`group overflow-hidden rounded-2xl bg-[#0F1D2E] shadow-md ${
                    index === 0 ? "sm:col-span-2" : ""
                  } ${focusRing}`}
                  style={{ backgroundColor: "#0F1D2E" }}
                >
                  <div
                    className={`overflow-hidden ${
                      index === 0 ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[4/5]"
                    }`}
                  >
                    <img
                      src={project.src}
                      alt={project.alt}
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="bg-[#0F1D2E] px-5 py-4" style={{ backgroundColor: "#0F1D2E", color: "#FFFFFF" }}>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">{project.categoryName}</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug text-white">{project.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{project.area}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200/80 bg-[#f4fafd]" style={{ backgroundColor: "#F4FAFD", color: "#0F1D2E" }}>
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-16">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#608b9e]">Next step</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl">
                Talk through a project like these
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#556980]">
                Bring a photo of your openings, or start with a showroom visit. A local specialist can walk through options without a hard sell.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <QuoteDrawerButton className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-bold text-[#0F1D2E] hover:bg-sky-400 ${focusRing}`}>Get a Free Quote</QuoteDrawerButton>
                <Link href="/book-appointment" className={`rounded-lg bg-white px-6 py-3.5 font-bold text-[#0F1D2E] shadow-sm transition hover:bg-slate-100 ${focusRing}`}>
                  Book an Appointment
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-semibold text-[#0F1D2E]">Explore our services</span>
                {serviceLinks.map((item) => (
                  <Link key={item.href} href={item.href} className={`text-sm font-semibold text-[#0284C7] hover:text-[#0F1D2E] ${focusRing}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import Link from "next/link";
import { Header } from "@/components/Header";
import { ImageLightbox } from "@/components/portfolio/ImageLightbox";
import { PortfolioCompactHeader, portfolioPillClass } from "@/components/portfolio/PortfolioCompactHeader";
import { QuoteSlideIn } from "@/components/QuoteSlideIn";
import {
  portfolioCategoryPills,
  type PortfolioCategory,
  type PortfolioVideo,
} from "@/lib/portfolio-categories";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-[#0F1D2E]" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
      <Header />
      <QuoteSlideIn id="portfolio-gallery-quote" formName="portfolio-gallery-quote" />
      <main>{children}</main>
    </div>
  );
}

export function CategoryHub({ category }: { category: PortfolioCategory }) {
  const pills = portfolioCategoryPills(category.slug);
  return (
    <PortfolioShell>
      <PortfolioCompactHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: category.name },
        ]}
        eyebrow="Greater Seattle Project Portfolio"
        title={`${category.name} Installations Across Greater Seattle`}
        subtitle={category.summary}
      />
      <section className="bg-white pt-6 pb-16" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Link href="/portfolio" className={`${portfolioPillClass} border border-slate-200 bg-white text-[#0F1D2E] hover:border-sky-400`}>
              All
            </Link>
            {pills.map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                aria-current={pill.active ? "page" : undefined}
                className={`${portfolioPillClass} border ${
                  pill.active
                    ? "border-[#38BDF8] bg-[#38BDF8] text-[#0F1D2E]"
                    : "border-slate-200 bg-white text-[#0F1D2E] hover:border-sky-400"
                }`}
              >
                {pill.label}
              </Link>
            ))}
            <Link href={`/portfolio/${category.slug}/images`} className={`${portfolioPillClass} border border-slate-200 bg-white text-[#0F1D2E] hover:border-sky-400`}>
              Photos
            </Link>
            {category.videos.length > 0 ? (
              <Link href={`/portfolio/${category.slug}/videos`} className={`${portfolioPillClass} border border-slate-200 bg-white text-[#0F1D2E] hover:border-sky-400`}>
                Videos
              </Link>
            ) : null}
          </div>
          <div className="mt-6">
            <ImageLightbox images={category.images} categoryName={category.name} />
          </div>
        </div>
      </section>
    </PortfolioShell>
  );
}

function WindowInstallVideoCard({
  featured = false,
  src = "https://www.youtube.com/embed/wcTlT2Mdw_E",
  iframeTitle = "Greater Seattle Window Installation Video",
  heading = "Greater Seattle Window Installation",
  description = "See our certified crew in action installing energy-efficient replacement windows with precision flashing and clean interior finish work.",
}: {
  featured?: boolean;
  src?: string;
  iframeTitle?: string;
  heading?: string;
  description?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`${featured ? "aspect-video" : "aspect-[16/10]"} flex w-full items-center justify-center overflow-hidden bg-[#0B1623]`}>
        <iframe
          src={src}
          title={iframeTitle}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7]">
          Watch Our Installers in the Field
        </p>
        <h2 className="mt-1 text-lg font-bold text-[#0F1D2E]">{heading}</h2>
        <p className="mt-1 text-sm text-[#556980]">{description}</p>
      </div>
    </article>
  );
}

export function ImagePortfolio({ category }: { category: PortfolioCategory }) {
  return (
    <PortfolioShell>
      <PortfolioCompactHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: category.name, href: `/portfolio/${category.slug}` },
          { label: "Photos" },
        ]}
        eyebrow="Greater Seattle Project Portfolio"
        title={`${category.name} Installations Across Greater Seattle`}
        subtitle={category.summary}
      />
      <section className="bg-white pt-6 pb-16" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap gap-2">
            <Link href="/portfolio" className={`${portfolioPillClass} border border-slate-200 bg-white text-[#0F1D2E] hover:border-sky-400`}>
              All
            </Link>
            <Link href={`/portfolio/${category.slug}`} className={`${portfolioPillClass} border border-slate-200 bg-white text-[#0F1D2E] hover:border-sky-400`}>
              {category.name}
            </Link>
            {category.videos.length > 0 ? (
              <Link href={`/portfolio/${category.slug}/videos`} className={`${portfolioPillClass} border border-slate-200 bg-white text-[#0F1D2E] hover:border-sky-400`}>
                Videos
              </Link>
            ) : null}
          </div>
          <ImageLightbox images={category.images} categoryName={category.name} />
        </div>
      </section>
      <section className="bg-[#0F1D2E] py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Plan a similar project</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Bring these photos to a showroom visit, or send the details for a quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/book-appointment" className={`rounded-md bg-[#38BDF8] px-5 py-2.5 font-semibold text-slate-950 hover:bg-sky-300 ${focusRing}`}>
              Book Appointment
            </Link>
            <Link href="/contact" className={`rounded-md bg-white px-5 py-2.5 font-semibold text-slate-900 hover:bg-slate-100 ${focusRing}`}>
              Request a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </PortfolioShell>
  );
}

export function VideoPortfolio({ category }: { category: PortfolioCategory }) {
  return (
    <PortfolioShell>
      <PortfolioCompactHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: category.name, href: `/portfolio/${category.slug}` },
          { label: "Videos" },
        ]}
        eyebrow="Greater Seattle Project Portfolio"
        title={`${category.name} Installations Across Greater Seattle`}
        subtitle={category.summary}
      />
      <section className="bg-white py-14">
        {category.slug === "windows" ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {category.videos.map((video) => (
              <WindowInstallVideoCard
                key={video.src}
                featured
                src={video.src}
                iframeTitle={video.iframeTitle ?? video.title}
                heading={video.title}
                description={video.notes}
              />
            ))}
          </div>
        ) : category.videos.length === 0 ? (
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-[#556980]">
              Installation videos for this category are not posted yet.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {category.videos.map((video) => (
              <VideoCard key={video.src} video={video} />
            ))}
          </div>
        )}
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/book-appointment"
            className={`inline-flex rounded-lg bg-[#38BDF8] px-5 py-2.5 font-bold text-[#0F1D2E] hover:bg-sky-400 ${focusRing}`}
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </PortfolioShell>
  );
}

function VideoCard({ video }: { video: PortfolioVideo }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex aspect-video w-full items-center justify-center overflow-hidden bg-[#0B1623]">
        {video.kind === "youtube" ? (
          <iframe
            src={video.src}
            title={video.iframeTitle ?? video.title}
            className={video.portrait ? "aspect-[9/16] h-full w-auto max-w-full" : "h-full w-full"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            className="h-full w-full"
            controls
            playsInline
            preload="metadata"
            poster={video.poster}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-[#0B192C]">{video.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#556980]">{video.notes}</p>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SoundViewPageHero } from "@/components/SoundViewPageHero";
import { ImageLightbox } from "@/components/portfolio/ImageLightbox";
import {
  portfolioCategoryPills,
  type PortfolioCategory,
  type PortfolioVideo,
} from "@/lib/portfolio-categories";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <main>{children}</main>
    </div>
  );
}

export function CategoryHub({ category }: { category: PortfolioCategory }) {
  const preview = category.images[0];
  return (
    <PortfolioShell>
      <SoundViewPageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: category.name },
        ]}
        eyebrow={category.eyebrow}
        title={`${category.name} Installations & Projects`}
        subtitle={category.summary}
        pills={portfolioCategoryPills(category.slug)}
      />
      <section className="bg-[#F4F6F9] py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] bg-slate-100">
              {preview ? (
                <Image src={preview.src} alt={preview.alt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
              ) : null}
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">Photo Gallery</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0B192C]">View {category.name} Image Portfolio</h2>
              <p className="mt-3 text-sm leading-6 text-[#556980]">
                Completed Greater Seattle photo projects for {category.name.toLowerCase()}, with product highlights on each opening.
              </p>
              <Link
                href={`/portfolio/${category.slug}/images`}
                className={`mt-5 inline-flex rounded-md bg-[#38BDF8] px-5 py-2.5 font-semibold text-slate-950 hover:bg-sky-300 ${focusRing}`}
              >
                Open Image Portfolio →
              </Link>
            </div>
          </article>
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative flex aspect-[16/9] items-center justify-center bg-[#0F1D2E]">
              {preview ? (
                <Image src={preview.src} alt="" fill className="object-cover opacity-40" sizes="(min-width: 1024px) 40vw, 100vw" />
              ) : null}
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#38BDF8] text-2xl font-bold text-slate-950">
                ▶
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">Field & Walkthrough Videos</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0B192C]">View {category.name} Video Portfolio</h2>
              <p className="mt-3 text-sm leading-6 text-[#556980]">
                Installation craftsmanship and product walkthrough videos for {category.name.toLowerCase()} in Greater Seattle.
              </p>
              <Link
                href={`/portfolio/${category.slug}/videos`}
                className={`mt-5 inline-flex rounded-md border border-[#0F1D2E] bg-[#0F1D2E] px-5 py-2.5 font-semibold text-[#38BDF8] hover:bg-[#192A3E] ${focusRing}`}
              >
                Open Video Portfolio →
              </Link>
            </div>
          </article>
        </div>
      </section>
    </PortfolioShell>
  );
}

export function ImagePortfolio({ category }: { category: PortfolioCategory }) {
  return (
    <PortfolioShell>
      <SoundViewPageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: category.name, href: `/portfolio/${category.slug}` },
          { label: "Image Portfolio" },
        ]}
        eyebrow={category.eyebrow}
        title={`${category.name} Image Portfolio`}
        subtitle={category.summary}
        primaryAction={{ label: "Switch to Video Portfolio", href: `/portfolio/${category.slug}/videos` }}
        secondaryAction={{ label: `Back to ${category.name}`, href: `/portfolio/${category.slug}` }}
      />
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ImageLightbox images={category.images} />
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
      <SoundViewPageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: category.name, href: `/portfolio/${category.slug}` },
          { label: "Video Portfolio" },
        ]}
        eyebrow={category.eyebrow}
        title={`${category.name} Video Portfolio`}
        subtitle={category.summary}
        primaryAction={{ label: "Switch to Image Portfolio", href: `/portfolio/${category.slug}/images` }}
        secondaryAction={{ label: `Back to ${category.name}`, href: `/portfolio/${category.slug}` }}
      />
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {category.videos.map((video) => (
            <VideoCard key={video.src} video={video} />
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/book-appointment"
            className={`inline-flex rounded-md bg-[#0F1D2E] px-5 py-2.5 font-semibold text-white hover:bg-[#192A3E] ${focusRing}`}
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
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative w-full bg-black pb-[56.25%]">
        {video.kind === "youtube" ? (
          <iframe
            src={video.src}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full"
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

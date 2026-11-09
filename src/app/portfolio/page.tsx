import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Portfolio | Sound View Window & Door",
  description:
    "Recent window replacements, custom door upgrades, and architectural glass projects across Greater Seattle, with field videos and before-and-after installations.",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]";

const videos = [
  {
    src: "https://www.youtube.com/embed/_330VSt1DKs",
    title: "Complete Window Tear-Out & Weatherproof Install",
    description:
      "Precision removal of old failed units, sill prep, and airtight sealing engineered for wet maritime winters.",
  },
  {
    src: "https://www.youtube.com/embed/5o-PiIu_kRk",
    title: "Custom Exterior Door Fitting & Flashing",
    description:
      "Step-by-step structural leveling, weather barrier integration, and heavy-duty sill flashing.",
  },
  {
    src: "https://www.youtube.com/embed/wcTlT2Mdw_E",
    title: "On-Site Architectural Glass & Trim Installation",
    description:
      "Detailed exterior casing, insulation pack, and smooth operating sash adjustments.",
  },
];

const projects = [
  {
    src: "/portfolio/brick-window-before-after.jpg",
    alt: "Before and after of a brick exterior single-hung window replacement",
    badge: "MASONRY OPENING RETROFIT",
    title: "Brick Exterior Single-Hung Window Replacement",
    copy: "Removed aged drafty single-pane wood sash set into masonry and installed a custom-sized, energy-efficient replacement unit with seamless exterior trim and tight perimeter seals.",
  },
  {
    src: "/portfolio/siding-slider-before-after.jpg",
    alt: "Before and after of a horizontal sliding window upgrade on lap siding",
    badge: "SIDING PRESERVATION INSTALL",
    title: "Horizontal Sliding Window Upgrade",
    copy: "Upgraded an outdated gridded aluminum slider with a high-performance, smooth-glide vinyl slider, boosting thermal insulation and opening up natural garden light.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-[#F7F5F0] text-[#28323D]">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-[#1D2C43] ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Portfolio</span>
              </li>
            </ol>
          </nav>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Proven Pacific Northwest Craftsmanship
          </p>
          <h1 className="mb-4 max-w-4xl font-serif text-4xl font-bold leading-tight lg:text-5xl">
            Our Real-World Installations
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Explore our recent window replacements, custom door upgrades, and
            architectural glass projects across Greater Seattle. Watch our
            certified crew in action and review actual before-and-after
            transformations.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 font-serif text-3xl font-bold text-[#1D2C43]">
            Watch Our Installers in the Field
          </h2>
          <p className="mb-8 max-w-2xl text-slate-600">
            See the care, precision flashing, and clean craftsmanship that goes
            into every Puget Sound installation.
          </p>
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.src}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
              >
                <div className="relative w-full overflow-hidden rounded-t-2xl bg-black pb-[56.25%]">
                  <iframe
                    src={video.src}
                    title={video.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-xl font-bold text-[#1D2C43]">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{video.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 font-serif text-3xl font-bold text-[#1D2C43]">
            Real Transformations Across Greater Seattle
          </h2>
          <p className="mb-8 max-w-2xl text-slate-600">
            Direct comparisons of drafty, aged units replaced with high-efficiency
            modern systems.
          </p>
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.src}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7"
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  width={819}
                  height={1024}
                  className="mb-4 h-auto w-full rounded-2xl border border-slate-200/80 object-cover shadow-md"
                />
                <p className="mb-2 w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {project.badge}
                </p>
                <h3 className="font-serif text-2xl font-bold text-[#1D2C43]">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{project.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-5xl rounded-3xl bg-[#1D2C43] p-8 text-center text-white shadow-lg sm:p-12">
            <h2 className="font-serif text-3xl font-bold">Ready to Upgrade Your Home Openings?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
              Get upfront pricing and honest guidance on your window, door, or
              glass project from local specialists who take pride in every
              install.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/services/window-replacement/types"
                className={`rounded-lg bg-white px-6 py-3 font-semibold text-[#1D2C43] transition-colors hover:bg-slate-100 ${focusRing}`}
              >
                Start Your Window Estimate
              </Link>
              <Link
                href="/services/door-replacement/types"
                className={`rounded-lg border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}
              >
                Start Your Door Estimate
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

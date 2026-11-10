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
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

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
    href: "/services/window-replacement/materials",
  },
  {
    src: "/portfolio/siding-slider-before-after.jpg",
    alt: "Before and after of a horizontal sliding window upgrade on lap siding",
    badge: "SIDING PRESERVATION INSTALL",
    title: "Horizontal Sliding Window Upgrade",
    copy: "Upgraded an outdated gridded aluminum slider with a high-performance, smooth-glide vinyl slider, boosting thermal insulation and opening up natural garden light.",
    href: "/services/window-replacement/materials",
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
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

          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            Proven Pacific Northwest Craftsmanship
          </p>
          <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight lg:text-5xl">
            Our Real-World Installations
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Explore our recent window replacements, custom door upgrades, and
            architectural glass projects across Greater Seattle. Watch our
            certified crew in action and review actual before-and-after
            transformations.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-3xl font-bold text-white">
            Watch Our Installers in the Field
          </h2>
          <p className="mb-8 max-w-2xl text-slate-300">
            See the care, precision flashing, and clean craftsmanship that goes
            into every Puget Sound installation.
          </p>
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.src}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-[#132238] shadow-sm"
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
                  <h3 className="text-xl font-bold text-white">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{video.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-3xl font-bold text-white">
            Real Transformations Across Greater Seattle
          </h2>
          <p className="mb-8 max-w-2xl text-slate-300">
            Direct comparisons of drafty, aged units replaced with high-efficiency
            modern systems.
          </p>
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.src}
                href={project.href}
                className={`group block h-full rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7 ${focusRing}`}
              >
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    width={819}
                    height={1024}
                    className="h-auto w-full border border-slate-700/80 object-cover shadow-md transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mb-3 mt-4 inline-flex items-center rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
                  {project.badge}
                </p>
                <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-slate-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{project.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:underline">
                  Explore window options
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-5xl rounded-3xl border border-slate-700/80 bg-[#11223A] p-8 text-center shadow-lg sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Ready to Upgrade Your Home Openings?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              Get upfront pricing and honest guidance on your window, door, or
              glass project from local specialists who take pride in every
              install.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/services/window-replacement/materials"
                className={`rounded-xl bg-[#38BDF8] px-6 py-3 font-extrabold uppercase tracking-wide text-[#0B192C] transition-colors hover:bg-sky-300 ${focusRing}`}
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

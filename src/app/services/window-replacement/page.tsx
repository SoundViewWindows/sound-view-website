import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WindowQuoteBox } from "@/components/WindowQuoteBox";

export const metadata: Metadata = {
  title: "Window Replacement | Sound View Window & Door",
  description:
    "Replacement windows engineered for Pacific Northwest weather and installed with care across the Greater Seattle Area.",
};

const highlights = [
  {
    title: "Thermal Efficiency",
    body: "Low-E glass and argon gas fills help keep heated air in and damp cold out through a long Seattle season.",
  },
  {
    title: "Sound Abatement",
    body: "Layered glass packages quiet traffic and neighborhood noise without closing the house off from daylight.",
  },
  {
    title: "Certified Craftsmanship",
    body: "Installers seal the moisture barrier carefully so rain stays outside and the opening stays square.",
  },
];

export default function WindowReplacementPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex min-w-0 flex-col items-start lg:col-span-7">
              <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="rounded-sm hover:text-[#1B2A4A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
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
                    <span aria-current="page">Window Replacement</span>
                  </li>
                </ol>
              </nav>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Precision Window Replacement
              </p>
              <h1 className="mb-4 max-w-full font-serif text-3xl font-bold leading-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
                Engineered for Pacific Northwest Weather, Installed With Care
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                Explore window configurations designed for energy efficiency,
                condensation resistance, and lasting curb appeal across the
                Greater Seattle Area.
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <Link
                  href="/services/window-replacement/materials"
                  className="flex items-center gap-2 rounded-lg bg-[#1B2A4A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#15223C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Window Materials
                  <ArrowIcon />
                </Link>
                <Link
                  href="/services/window-replacement/types"
                  className="flex items-center gap-2 rounded-lg border border-[#1B2A4A] px-6 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Window Types
                  <ArrowIcon />
                </Link>
              </div>
            </div>
            <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
              <div className="w-full max-w-md">
                <WindowQuoteBox />
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-20 sm:px-6 md:grid-cols-3 lg:px-8">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h2 className="font-serif text-2xl text-[#1B2A4A]">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h12M12 6l4 4-4 4" />
    </svg>
  );
}

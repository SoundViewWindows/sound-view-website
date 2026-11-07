import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
      <div className="flex min-h-screen flex-col lg:h-dvh lg:min-h-0 lg:overflow-hidden">
        <Header />
        <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 py-4 sm:px-5 lg:min-h-0 lg:px-5 lg:py-5">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
              { label: "Window Replacement" },
            ]}
          />
          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-6 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1B2A4A]/70">
                Precision Window Replacement
              </p>
              <h1 className="mt-3 max-w-3xl font-serif text-4xl font-medium tracking-tight text-[#1B2A4A] lg:text-5xl">
                Engineered for Pacific Northwest Weather, Installed With Care
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#1B2A4A]/85">
                Explore window configurations designed for energy efficiency,
                condensation resistance, and lasting curb appeal across the
                Greater Seattle Area.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services/window-replacement/materials"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2A4A] px-5 py-3 text-sm font-medium text-[#FAF8F5] transition-colors hover:bg-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Window Materials
                  <ArrowIcon />
                </Link>
                <Link
                  href="/services/window-replacement/types"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1B2A4A]/20 px-5 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-[#F4EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
                >
                  Window Types
                  <ArrowIcon />
                </Link>
              </div>
            </div>
            <div className="w-full shrink-0 lg:max-h-full lg:w-96 lg:overflow-y-auto">
              <WindowQuoteBox />
            </div>
          </div>
        </main>
      </div>

      <section className="border-t border-[#1B2A4A]/10 bg-[#F4EFEA]">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-16 sm:px-5 md:grid-cols-3 lg:py-20">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-2xl bg-[#FAF8F5] p-6">
              <h2 className="font-serif text-2xl tracking-tight text-[#1B2A4A]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#1B2A4A]/80">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
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

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { WindowQuoteBox } from "@/components/WindowQuoteBox";

export const metadata: Metadata = {
  title: "Window Styles & Operating Types | Sound View Window & Door",
  description:
    "Casement, hung, sliding, picture, bay, and awning windows for Greater Seattle homes.",
};

const types = [
  {
    title: "Casement Windows",
    body: "A side hinge opens the full sash for strong ventilation. The compression seal closes tightly against rain and wind.",
    icon: "casement",
  },
  {
    title: "Double-Hung & Single-Hung",
    body: "A classic stacked sash. Tilt-in hardware lets you clean the glass from inside the room.",
    icon: "hung",
  },
  {
    title: "Horizontal Sliding",
    body: "Sashes glide sideways, which suits wide openings, hallways, and rooms where a swing would get in the way.",
    icon: "slider",
  },
  {
    title: "Picture & Architectural Direct-Set",
    body: "Fixed glass with no operating hardware. These units keep the view clear and usually earn the best thermal ratings.",
    icon: "picture",
  },
  {
    title: "Bay & Bow Windows",
    body: "A projection of several units that adds interior space and brings light in from more than one direction.",
    icon: "bay",
  },
  {
    title: "Awning Windows",
    body: "Hinged at the top so the sash opens out. You can vent a room and still keep Seattle drizzle off the sill.",
    icon: "awning",
  },
] as const;

export default function WindowTypesPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <div className="flex min-h-screen flex-col lg:h-dvh lg:min-h-0 lg:overflow-hidden">
        <Header />
        <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 py-4 sm:px-5 lg:min-h-0 lg:px-5 lg:py-5">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
              { label: "Window Replacement", href: "/services/window-replacement" },
              { label: "Types" },
            ]}
          />
          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-6 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1B2A4A]/70">
                Window Replacement
              </p>
              <h1 className="mt-3 max-w-3xl font-serif text-4xl font-medium tracking-tight text-[#1B2A4A] lg:text-5xl">
                Window Styles & Operating Types
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#1B2A4A]/85">
                The right operating style depends on the room. We help you match
                ventilation, cleaning, and the view for each opening in the house.
              </p>
            </div>
            <div className="w-full shrink-0 lg:max-h-full lg:w-96 lg:overflow-y-auto">
              <WindowQuoteBox />
            </div>
          </div>
        </main>
      </div>

      <section className="border-t border-[#1B2A4A]/10 bg-[#F4EFEA]">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-16 sm:px-5 md:grid-cols-2 lg:grid-cols-3 lg:py-20">
          {types.map((type) => (
            <article key={type.title} className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
              <WindowGlyph kind={type.icon} />
              <h2 className="mt-4 font-serif text-2xl tracking-tight text-[#1B2A4A]">{type.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#1B2A4A]/80">{type.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function WindowGlyph({ kind }: { kind: (typeof types)[number]["icon"] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 48" className="h-12 w-16 text-[#1B2A4A]">
      <rect x="2" y="2" width="60" height="44" rx="3" fill="#F4EFEA" stroke="currentColor" strokeWidth="2" />
      {kind === "casement" ? <path d="M8 8h20v32H8zM32 24h22" fill="none" stroke="currentColor" strokeWidth="2" /> : null}
      {kind === "hung" ? <path d="M8 24h48M32 8v32" fill="none" stroke="currentColor" strokeWidth="2" /> : null}
      {kind === "slider" ? <path d="M32 8v32M14 24h12M40 24h12" fill="none" stroke="currentColor" strokeWidth="2" /> : null}
      {kind === "picture" ? <rect x="12" y="10" width="40" height="28" fill="none" stroke="currentColor" strokeWidth="2" /> : null}
      {kind === "bay" ? <path d="M8 40 20 8h24l12 32" fill="none" stroke="currentColor" strokeWidth="2" /> : null}
      {kind === "awning" ? <path d="M8 14h48M8 14l24 18 24-18" fill="none" stroke="currentColor" strokeWidth="2" /> : null}
    </svg>
  );
}

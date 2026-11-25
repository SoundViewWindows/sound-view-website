import type { ReactNode } from "react";

export const heroH1Class =
  "text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] leading-[1.08]";
export const heroEyebrowClass =
  "text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8]";
export const heroLeadClass =
  "max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg";
export const heroPrimaryClass =
  "inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3.5 font-bold text-[#0F1D2E] shadow-lg transition hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";
export const heroSecondaryClass =
  "inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 font-bold text-[#0F1D2E] shadow-lg transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function PhotographicHero({
  image,
  eyebrow,
  title,
  lead,
  actions,
  cards,
}: {
  image: string;
  eyebrow: string;
  title: string;
  lead: string;
  actions?: ReactNode;
  cards?: { title: string; body: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#0F1D2E] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/95 via-[#0F1D2E]/85 to-[#0F1D2E]/70" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className={heroEyebrowClass}>{eyebrow}</p>
        <h1 className={`mt-3 ${heroH1Class}`}>{title}</h1>
        <p className={`mt-4 ${heroLeadClass}`}>{lead}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
        {cards && cards.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.title}
                className="rounded-xl border border-white/15 bg-[#0F1D2E]/80 p-5 backdrop-blur-md"
              >
                <h2 className="text-base font-bold text-white">{card.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{card.body}</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

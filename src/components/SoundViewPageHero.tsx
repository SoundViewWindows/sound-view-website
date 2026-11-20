import type { ReactNode } from "react";
import Link from "next/link";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export type SoundViewBreadcrumb = {
  label: string;
  href?: string;
};

export type SoundViewHeroAction = {
  label: string;
  href: string;
};

export type SoundViewHeroCard = {
  title: string;
  body: string;
};

export type SoundViewHeroPill = {
  label: string;
  href: string;
  active?: boolean;
};

export function SoundViewPageHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  cards,
  pills,
  rightContent,
  afterActions,
}: {
  breadcrumbs: SoundViewBreadcrumb[];
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryAction?: SoundViewHeroAction;
  secondaryAction?: SoundViewHeroAction;
  cards?: SoundViewHeroCard[];
  pills?: SoundViewHeroPill[];
  rightContent?: ReactNode;
  afterActions?: ReactNode;
}) {
  if (rightContent) {
    return (
      <section className="relative overflow-hidden bg-[#0F1D2E] text-white">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0F1D2E]/75" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
          <div className="flex flex-col items-start text-left lg:col-span-6">
            <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((item, index) => (
                  <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                    {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
                    {item.href ? (
                      <Link href={item.href} className={`rounded-sm hover:text-white ${focusRing}`}>
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#38BDF8] sm:text-sm">
              {eyebrow}
            </p>
            <h1 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-300 sm:text-lg">{subtitle}</p>
            {primaryAction && secondaryAction ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <HeroLink action={primaryAction} tone="primary" />
                <HeroLink action={secondaryAction} tone="secondary" />
              </div>
            ) : null}
            {afterActions ? (
              afterActions
            ) : cards ? (
              <div className="mt-6 grid w-full grid-cols-1 gap-4 border-t border-slate-700/70 pt-6 sm:grid-cols-3">
                {cards.map((card) => (
                  <article key={card.title}>
                    <span aria-hidden="true" className="mb-2 block h-0.5 w-6 bg-[#38BDF8]" />
                    <h2 className="text-sm font-bold text-white">{card.title}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">{card.body}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-6">{rightContent}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#0F1D2E] py-12 text-white sm:py-16">
      <img
        src="/images/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0F1D2E]/75" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
          <ol className="flex flex-wrap items-center justify-center gap-2">
            {breadcrumbs.map((item, index) => (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
                {item.href ? (
                  <Link href={item.href} className={`rounded-sm hover:text-white ${focusRing}`}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#38BDF8] sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="mx-auto mt-2 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300 sm:text-lg">{subtitle}</p>
        {primaryAction && secondaryAction ? (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <HeroLink action={primaryAction} tone="primary" />
            <HeroLink action={secondaryAction} tone="secondary" />
          </div>
        ) : null}
        {pills ? (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {pills.map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                aria-current={pill.active ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  pill.active
                    ? "bg-[#38BDF8] text-slate-950"
                    : "border border-white/25 text-white hover:bg-white/10"
                } ${focusRing}`}
              >
                {pill.label}
              </Link>
            ))}
          </div>
        ) : null}
        {cards ? (
        <div className="mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-white/10 bg-[#192A3E]/90 p-5"
            >
              <span aria-hidden="true" className="mb-3 block h-1 w-8 rounded-full bg-[#38BDF8]" />
              <h2 className="text-base font-bold text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.body}</p>
            </article>
          ))}
        </div>
        ) : null}
      </div>
    </section>
  );
}

function HeroLink({
  action,
  tone,
}: {
  action: SoundViewHeroAction;
  tone: "primary" | "secondary";
}) {
  const className = [
    "inline-flex items-center justify-center rounded-md px-6 py-2.5 font-semibold transition-colors",
    tone === "primary"
      ? "bg-[#38BDF8] text-slate-950 hover:bg-sky-300"
      : "bg-white text-slate-900 hover:bg-slate-100",
    focusRing,
  ].join(" ");
  if (action.href.startsWith("tel:") || action.href.startsWith("http")) {
    return (
      <a href={action.href} className={className}>
        {action.label}
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

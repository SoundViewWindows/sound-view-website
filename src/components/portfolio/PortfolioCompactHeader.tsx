import Link from "next/link";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function PortfolioCompactHeader({
  crumbs,
  eyebrow,
  title,
  subtitle,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header
      className="border-b border-slate-200/80 bg-white py-8 text-[#0F1D2E] sm:py-10"
      style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((item, index) => (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
                {item.href ? (
                  <Link href={item.href} className={`rounded-sm text-slate-500 hover:text-[#0F1D2E] ${focusRing}`}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-slate-500">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0284C7]">{eyebrow}</p>
        <h1 className="mt-1 max-w-3xl text-2xl font-extrabold tracking-tight text-[#0F1D2E] sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{subtitle}</p>
      </div>
    </header>
  );
}

export const portfolioPillClass = `inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold whitespace-nowrap ${focusRing}`;

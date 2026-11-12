import Link from "next/link";

const focusRing =
  "rounded-sm text-slate-300 hover:text-home-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent";

export function ShowerStepNav({
  current,
  backHref,
  backLabel,
}: {
  current: string;
  backHref?: string;
  backLabel?: string;
}) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services" },
    { label: "Shower Door Replacement", href: "/services/shower-door-replacement/types" },
    { label: current },
  ];

  return (
    <div>
      <nav aria-label="Breadcrumb" className={`${backHref ? "" : "mb-4"} text-xs text-slate-400`}>
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((item, index) => (
            <li key={item.label} className={index > 0 ? "flex items-center gap-2" : undefined}>
              {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
              {item.href && index < crumbs.length - 1 ? (
                <Link href={item.href} className={focusRing}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-[#E7EEF3]"
                  aria-current={index === crumbs.length - 1 ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {backHref && backLabel ? (
        <Link
          href={backHref}
          className="mb-4 mt-4 inline-flex text-sm font-medium text-home-accent underline decoration-home-accent/40 underline-offset-4 hover:text-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
        >
          &larr; Back to {backLabel}
        </Link>
      ) : null}
    </div>
  );
}

import Link from "next/link";

const focusRing =
  "rounded-sm text-slate-400 hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function GlassStepNav({ current }: { current: string }) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services" },
    { label: "Glass Replacement", href: "/services/glass-replacement/types" },
    { label: current },
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-400">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((item, index) => (
          <li key={item.label} className={index > 0 ? "flex items-center gap-2" : undefined}>
            {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
            {item.href && index < crumbs.length - 1 ? (
              <Link href={item.href} className={focusRing}>
                {item.label}
              </Link>
            ) : (
              <span aria-current={index === crumbs.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

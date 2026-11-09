import Link from "next/link";

const focusRing =
  "rounded-sm hover:text-[#1D2C43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]";

export function DoorStepNav({
  current,
  progress,
}: {
  current: string;
  progress: string;
}) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services" },
    { label: "Door Replacement", href: "/services/door-replacement/types" },
    { label: current },
  ];

  return (
    <div className="mb-4">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
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
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">{progress}</p>
    </div>
  );
}

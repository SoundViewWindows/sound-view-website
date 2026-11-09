import Link from "next/link";

const focusRing =
  "rounded-sm hover:text-[#1D2C43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]";

const darkFocusRing =
  "rounded-sm text-slate-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function DoorStepNav({
  current,
  progress,
  onDark = false,
}: {
  current: string;
  progress: string;
  onDark?: boolean;
}) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services" },
    { label: "Door Replacement", href: "/services/door-replacement/types" },
    { label: current },
  ];

  return (
    <div className="mb-4">
      <nav aria-label="Breadcrumb" className={onDark ? "mb-4 text-xs text-slate-300" : "mb-4 text-sm text-slate-500"}>
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((item, index) => (
            <li key={item.label} className={index > 0 ? "flex items-center gap-2" : undefined}>
              {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
              {item.href && index < crumbs.length - 1 ? (
                <Link href={item.href} className={onDark ? darkFocusRing : focusRing}>
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
      <p
        className={
          onDark
            ? "text-xs font-bold uppercase tracking-wider text-amber-300"
            : "text-xs font-semibold uppercase tracking-wider text-slate-600"
        }
      >
        {progress}
      </p>
    </div>
  );
}

import Link from "next/link";
import { doorStepHref } from "@/lib/door-funnel";

const crumbLink =
  "rounded-sm text-slate-300 hover:text-home-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent";

const steps = [
  { id: 1, label: "Door Types", name: "Door Types", key: "types" },
  { id: 2, label: "Materials", name: "Materials", key: "materials" },
  { id: 3, label: "Manufacturers", name: "Manufacturers", key: "manufacturers" },
  { id: 4, label: "Free Quote", name: "Free Quote", key: "quote" },
] as const;

export function DoorStepNav({
  step,
  type = "undecided",
  material = "undecided",
  manufacturer = "undecided",
}: {
  step: 1 | 2 | 3 | 4;
  type?: string;
  material?: string;
  manufacturer?: string;
  onDark?: boolean;
}) {
  const current = steps[step - 1];
  const previous = step > 1 ? steps[step - 2] : null;
  const backHref = previous
    ? doorStepHref(previous.key, { type, material, manufacturer })
    : "/services/door-replacement/types";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services" },
    { label: "Door Replacement", href: "/services/door-replacement/types" },
    { label: current.name },
  ];

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-2 text-xs text-slate-400">
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((item, index) => (
            <li key={item.label} className={index > 0 ? "flex items-center gap-2" : undefined}>
              {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
              {item.href && index < crumbs.length - 1 ? (
                <Link href={item.href} className={crumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#E7EEF3]" aria-current={index === crumbs.length - 1 ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {previous ? (
        <Link
          href={backHref}
          className="mb-2.5 inline-flex text-sm font-medium text-home-accent underline decoration-home-accent/40 underline-offset-4 hover:text-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-accent"
        >
          &larr; Back to {previous.name}
        </Link>
      ) : null}
    </div>
  );
}

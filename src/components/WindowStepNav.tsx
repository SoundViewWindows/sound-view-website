import Link from "next/link";
import { windowStepHref } from "@/lib/window-funnel";

const crumbLink =
  "rounded-sm text-slate-400 hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const steps = [
  { id: 1, label: "1. Materials", name: "Materials", key: "materials" },
  { id: 2, label: "2. Types", name: "Types", key: "types" },
  { id: 3, label: "3. Manufacturers", name: "Manufacturers", key: "manufacturers" },
  { id: 4, label: "4. Free Quote", name: "Free Quote", key: "quote" },
] as const;

export function WindowStepNav({
  step,
  material = "undecided",
  type = "undecided",
  manufacturer = "undecided",
}: {
  step: 1 | 2 | 3 | 4;
  material?: string;
  type?: string;
  manufacturer?: string;
  onDark?: boolean;
}) {
  const current = steps[step - 1];
  const previous = step > 1 ? steps[step - 2] : null;
  const backHref = previous
    ? windowStepHref(previous.key, { material, type, manufacturer })
    : "/services/window-replacement/materials";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services" },
    { label: "Window Replacement", href: "/services/window-replacement/materials" },
    { label: current.name },
  ];

  return (
    <div className="mb-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-400">
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((item, index) => (
            <li key={item.label} className={index > 0 ? "flex items-center gap-2" : undefined}>
              {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
              {item.href && index < crumbs.length - 1 ? (
                <Link href={item.href} className={crumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-300" aria-current={index === crumbs.length - 1 ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-sky-400">
        Step {step} of 4: {current.name}
      </p>
      <ol aria-label="Window quote progress" className="grid grid-cols-4 gap-1">
        {steps.map((item, index) => {
          const state = item.id < step ? "complete" : item.id === step ? "current" : "upcoming";
          const circle =
            state === "upcoming"
              ? "border border-slate-700 bg-slate-800 text-slate-400"
              : "bg-sky-400 font-bold text-slate-950";
          const label =
            state === "current"
              ? "font-semibold text-sky-400"
              : state === "complete"
                ? "text-white"
                : "text-slate-400";
          const content = (
            <span className="flex flex-col items-center gap-2 text-center">
              <span className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs ${circle}`}>
                {item.id}
              </span>
              <span className={`text-[10px] leading-tight sm:text-xs ${label}`}>{item.label}</span>
            </span>
          );

          return (
            <li key={item.id} className="relative flex justify-center">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={`absolute right-1/2 top-3.5 h-px w-full ${
                    item.id <= step ? "bg-sky-400" : "bg-slate-700"
                  }`}
                />
              ) : null}
              {state === "complete" ? (
                <Link
                  href={windowStepHref(item.key, { material, type, manufacturer })}
                  className="relative z-10 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  {content}
                </Link>
              ) : (
                <span className="relative z-10" aria-current={state === "current" ? "step" : undefined}>
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {previous ? (
        <Link
          href={backHref}
          className="mt-4 inline-flex text-sm font-medium text-sky-400 underline decoration-sky-400/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
        >
          &larr; Back to {previous.name}
        </Link>
      ) : null}
    </div>
  );
}

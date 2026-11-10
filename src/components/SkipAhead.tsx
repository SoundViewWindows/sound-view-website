import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type SkipAheadProps = {
  href: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function SkipAhead({ href, children, onClick }: SkipAheadProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-slate-600 bg-slate-900/60 px-5 py-2.5 text-xs font-semibold text-slate-200 shadow-sm transition-all duration-150 hover:border-sky-400 hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] sm:text-sm"
    >
      {children}
      <span className="ml-1.5 text-sky-400">→</span>
    </Link>
  );
}

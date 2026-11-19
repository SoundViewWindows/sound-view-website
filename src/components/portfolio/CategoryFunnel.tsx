import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { portfolioCategories } from "@/lib/portfolio-categories";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function CategoryFunnel() {
  return (
    <aside
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl sm:p-8"
      aria-labelledby="portfolio-categories"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-sky-600">
        Select a Category
      </p>
      <h2 id="portfolio-categories" className="mt-1 text-2xl font-bold text-slate-900">
        Browse Projects by Category
      </h2>
      <div className="mt-5 flex flex-col gap-2.5">
        {portfolioCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/portfolio/${category.slug}`}
            className={`group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition-all hover:border-sky-500 hover:bg-sky-50/40 ${focusRing}`}
          >
            <span className="min-w-0">
              <span className="block text-sm font-bold text-slate-900 group-hover:text-sky-700 sm:text-base">
                {category.name}
              </span>
              <span className="mt-1 block text-xs text-slate-600 sm:text-sm">{category.funnel}</span>
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-sky-600 transition-colors group-hover:border-sky-500 group-hover:bg-sky-500 group-hover:text-white">
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

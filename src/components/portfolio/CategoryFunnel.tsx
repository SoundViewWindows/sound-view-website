import Link from "next/link";
import { AppWindow, Blinds, Columns3, DoorOpen, ShowerHead } from "lucide-react";
import { portfolioCategories } from "@/lib/portfolio-categories";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const icons = {
  windows: AppWindow,
  doors: DoorOpen,
  "shower-doors": ShowerHead,
  glass: Columns3,
  "window-blinds-shades": Blinds,
} as const;

export function CategoryFunnel() {
  return (
    <section className="bg-[#F4F6F9] py-14" aria-labelledby="portfolio-categories">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="portfolio-categories" className="text-3xl font-bold text-[#0B192C]">
          Browse Projects by Category
        </h2>
        <p className="mt-3 max-w-2xl text-[#556980]">
          Open the window, door, shower, glass, or shade projects you want to compare.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {portfolioCategories.map((category) => {
            const Icon = icons[category.slug as keyof typeof icons];
            return (
              <Link
                key={category.slug}
                href={`/portfolio/${category.slug}`}
                className={`flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-[#38BDF8] ${focusRing}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-[#0284C7]">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="mt-4 text-lg font-bold text-[#0B192C]">{category.name}</span>
                <span className="mt-2 flex-1 text-sm leading-6 text-[#556980]">{category.funnel}</span>
                <span className="mt-4 text-sm font-semibold text-[#0284C7]">Explore Portfolio →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

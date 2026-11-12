"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BlogPost } from "@/data/blogPosts";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export type BlogCard = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "category"
  | "categories"
  | "date"
  | "readTime"
  | "excerpt"
  | "coverImage"
  | "coverAlt"
>;

export function BlogIndex({
  posts,
  categories,
}: {
  posts: BlogCard[];
  categories: string[];
}) {
  const filters = useMemo(() => ["All", ...categories], [categories]);
  const [filter, setFilter] = useState("All");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [filters]);

  const scrollCategories = (distance: number) => {
    scrollerRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  const visible = useMemo(
    () =>
      filter === "All"
        ? posts
        : posts.filter((post) => post.categories.includes(filter)),
    [filter, posts],
  );

  const [featured, ...recent] = visible;

  return (
    <main>
      <section className="bg-[#0B192C]">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-300">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-sky-400 ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span>Resources</span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Blog &amp; Guides</span>
              </li>
            </ol>
          </nav>

          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            Pacific Northwest Homeowner Guides
          </p>
          <h1 className="mb-4 w-full text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[40px] lg:whitespace-nowrap xl:text-5xl">
            Expert Advice on Windows, Doors, and Glass
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Straightforward, technical advice from local specialists to help you
            plan upgrades, understand building science, and make confident
            investments in your home.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative flex items-center">
          <div
            ref={scrollerRef}
            className="scrollbar-none flex items-center gap-2 overflow-x-auto overscroll-x-contain scroll-smooth px-4 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            role="toolbar"
            aria-label="Filter guides by category"
          >
            {filters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(item)}
                  onFocus={(event) =>
                    event.currentTarget.scrollIntoView({
                      inline: "nearest",
                      block: "nearest",
                    })
                  }
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                    active
                      ? "border-transparent bg-[#0090c8] font-bold text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:text-[#0090c8]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 z-10 h-full w-8 bg-gradient-to-r from-[#F4FAFD] to-transparent ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute right-0 z-10 h-full w-8 bg-gradient-to-l from-[#F4FAFD] to-transparent ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />
          <button
            type="button"
            aria-label="Show previous categories"
            disabled={!canScrollLeft}
            onClick={() => scrollCategories(-320)}
            className={`absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 ${focusRing} ${
              canScrollLeft
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Show more categories"
            disabled={!canScrollRight}
            onClick={() => scrollCategories(320)}
            className={`absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 ${focusRing} ${
              canScrollRight
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </section>

      {featured ? (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className={`group grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-xl lg:grid-cols-2 ${focusRing}`}
          >
            <div className="overflow-hidden">
              <Cover
                src={featured.coverImage}
                alt={featured.coverAlt}
                category={featured.category}
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 lg:aspect-auto lg:h-full lg:min-h-[24rem]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <CategoryPill>{featured.category}</CategoryPill>
                <span className="text-sm text-slate-500">{featured.readTime}</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-[#0B192C] transition-colors group-hover:text-[#0090c8] sm:text-4xl">
                {featured.title}
              </h2>
              {featured.excerpt ? (
                <p className="mt-4 line-clamp-4 text-base leading-relaxed text-[#556980] sm:text-lg">
                  {featured.excerpt}
                </p>
              ) : null}
              <span className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-[#0090c8] px-5 py-3 text-sm font-medium text-white transition-colors group-hover:bg-[#007fb1]">
                Read Guide
              </span>
            </div>
          </Link>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-[#556980] shadow-md">
            {filter === "All"
              ? "No guides published yet."
              : "No guides in this category yet."}
          </p>
        </section>
      )}

      {recent.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0B192C]">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <Link
                key={post.id || post.slug}
                href={`/blog/${post.slug}`}
                className={`group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-xl ${focusRing}`}
              >
                <div>
                  <div className="overflow-hidden">
                    <Cover
                      src={post.coverImage}
                      alt={post.coverAlt}
                      category={post.category}
                      className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <CategoryPill>{post.category}</CategoryPill>
                      <span className="text-sm text-slate-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-[#0B192C] transition-colors group-hover:text-[#0090c8]">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#556980]">
                        {post.excerpt}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#0090c8] px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-[#007fb1]">
                    Read article
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

const categoryFallbacks: Record<string, string> = {
  Windows: "/images/services/window-replacement.png",
  Milgard: "/images/services/window-replacement.png",
  "Andersen Windows and Doors": "/images/services/window-replacement.png",
  "Window Showroom Displays": "/images/services/window-replacement.png",
  Doors: "/images/services/door-replacement.jpg",
  "French Doors": "/images/services/door-replacement.jpg",
  "Simpson Door Wood Species": "/images/services/door-replacement.jpg",
  "Shower Doors": "/images/services/shower-door-replacement.jpg",
};

function fallbackFor(category: string) {
  return categoryFallbacks[category] ?? "/images/services/window-replacement.png";
}

function Cover({
  src,
  alt,
  className,
  category,
}: {
  src: string;
  alt: string;
  className: string;
  category: string;
}) {
  const [current, setCurrent] = useState(src || fallbackFor(category));
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        const next = fallbackFor(category);
        if (current !== next) setCurrent(next);
      }}
    />
  );
}

function CategoryPill({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold tracking-wide text-[#0090c8] transition-colors duration-200">
      {children}
    </span>
  );
}

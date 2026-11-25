"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
> & { href: string };

export function BlogIndex({
  posts,
  categories,
}: {
  posts: BlogCard[];
  categories: string[];
}) {
  const filters = useMemo(() => ["All", ...categories], [categories]);
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? posts
        : posts.filter((post) => post.categories.includes(filter)),
    [filter, posts],
  );

  const [featured, ...recent] = visible;

  return (
    <main className="overflow-x-hidden bg-white text-[#0F1D2E]" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
      <section className="relative overflow-hidden bg-[#0F1D2E] text-white">
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/95 via-[#0F1D2E]/85 to-[#0F1D2E]/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Blog &amp; Guides</span>
              </li>
            </ol>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8]">
            Homeowner Resources &amp; Guides
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] leading-[1.08]">
            Compare Seattle Window, Door &amp; Glass Buying Guides Before You Buy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Practical advice from our Seattle installation specialists on replacement timing, glass performance, and maintenance.
          </p>
        </div>
      </section>

      <section className="bg-white" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <CategoryNav filters={filters} filter={filter} onSelect={setFilter} />

          {featured ? (
            <Link
              href={featured.href}
              className={`group mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-sky-400 lg:grid-cols-2 ${focusRing}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[22rem]">
                <Cover
                  src={featured.coverImage}
                  alt={featured.coverAlt}
                  category={featured.category}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <CategoryPill>{featured.category}</CategoryPill>
                  <span className="text-sm text-[#556980]">{featured.date}</span>
                  <span className="text-sm text-[#556980]">{featured.readTime}</span>
                </div>
                <h2 className="mt-4 max-w-xl text-2xl font-bold leading-tight tracking-tight text-[#0F1D2E] transition-colors group-hover:text-[#0284C7] sm:text-3xl">
                  {featured.title}
                </h2>
                {featured.excerpt ? (
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-[#556980]">
                    {featured.excerpt}
                  </p>
                ) : null}
                <span className="mt-6 inline-flex w-fit rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-bold text-[#0F1D2E] transition-colors group-hover:bg-sky-400">
                  Read Guide
                </span>
              </div>
            </Link>
          ) : (
            <p className="mt-10 rounded-2xl border border-slate-200 bg-[#f4fafd] px-6 py-10 text-[#556980]">
              {filter === "All"
                ? "No guides published yet."
                : "No guides in this category yet."}
            </p>
          )}
        </div>
      </section>

      {recent.length > 0 ? (
        <section className="border-t border-slate-200/80 bg-[#f4fafd]" style={{ backgroundColor: "#F4FAFD", color: "#0F1D2E" }}>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl">Recent Articles</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recent.map((post) => (
                <Link
                  key={post.id || post.slug}
                  href={post.href}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-sky-400 hover:shadow-md ${focusRing}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Cover
                      src={post.coverImage}
                      alt={post.coverAlt}
                      category={post.category}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <CategoryPill>{post.category}</CategoryPill>
                      <span className="text-xs text-[#556980]">{post.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-[#0F1D2E] transition-colors group-hover:text-[#0284C7]">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#556980]">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <span className="mt-4 text-sm font-semibold text-[#0284C7] group-hover:text-[#0F1D2E]">
                      Read article
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function CategoryNav({
  filters,
  filter,
  onSelect,
}: {
  filters: string[];
  filter: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div id="guide-categories" className="scroll-mt-24">
      <p className="text-xs font-bold uppercase tracking-widest text-[#608b9e]">Browse by topic</p>
      <div
        className="mt-3 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible"
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
              onClick={() => onSelect(item)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-sm transition-colors ${focusRing} ${
                active
                  ? "border-[#38BDF8] bg-[#38BDF8] font-bold text-[#0F1D2E]"
                  : "border-slate-200 bg-white font-medium text-[#0F1D2E] hover:border-sky-400"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
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
    <span className="text-xs font-bold uppercase tracking-wide text-[#0284C7]">
      {children}
    </span>
  );
}

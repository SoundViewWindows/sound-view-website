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
      <section className="relative overflow-hidden bg-[#0F1D2E] pt-10 pb-16 text-white sm:pt-12 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/65 via-[#0F1D2E]/45 to-[#0F1D2E]/65" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-5 rounded-2xl border border-white/20 bg-[#0F1D2E]/90 px-6 py-5 shadow-2xl backdrop-blur-md sm:px-8 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
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
              <p className="mt-3 text-xs font-bold tracking-wider text-[#38BDF8]">
                HOMEOWNER GUIDES &amp; RESOURCES
              </p>
              <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                Window, Door &amp; Glass Buying Guides
              </h1>
              <p className="mt-1.5 text-sm text-slate-200">
                Practical advice from our Seattle installation specialists on replacement timing, glass performance, and maintenance.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/book-appointment"
                className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-2.5 font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 font-bold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`}
              >
                Ask a Specialist
              </Link>
            </div>
          </div>

          <div id="guide-categories" className="relative mb-10 flex scroll-mt-24 items-center">
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
                  className={`shrink-0 rounded-[4px] border px-4 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                    active
                      ? "border-[#38BDF8] bg-[#38BDF8] font-bold text-[#0F1D2E]"
                      : "border-white/20 bg-[#0F1D2E]/90 text-slate-200 backdrop-blur-md hover:border-[#38BDF8]/60 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 z-10 h-full w-8 bg-gradient-to-r from-[#0F1D2E] to-transparent ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute right-0 z-10 h-full w-8 bg-gradient-to-l from-[#0F1D2E] to-transparent ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />
          <button
            type="button"
            aria-label="Show previous categories"
            disabled={!canScrollLeft}
            onClick={() => scrollCategories(-320)}
            className={`absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0F1D2E]/90 text-white shadow-2xl backdrop-blur-md transition-colors hover:border-[#38BDF8]/60 hover:text-[#38BDF8] ${focusRing} ${
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
            className={`absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0F1D2E]/90 text-white shadow-2xl backdrop-blur-md transition-colors hover:border-[#38BDF8]/60 hover:text-[#38BDF8] ${focusRing} ${
              canScrollRight
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

          {featured ? (
            <Link
              href={featured.href}
              className={`group grid grid-cols-1 overflow-hidden rounded-2xl border border-white/20 bg-[#0F1D2E]/90 shadow-2xl backdrop-blur-md transition-colors hover:border-[#38BDF8]/60 lg:grid-cols-2 ${focusRing}`}
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
                  <span className="text-sm text-slate-400">{featured.readTime}</span>
                </div>
                <h2 className="text-3xl font-bold leading-tight text-white transition-colors group-hover:text-[#38BDF8] sm:text-4xl">
                  {featured.title}
                </h2>
                {featured.excerpt ? (
                  <p className="mt-4 line-clamp-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                    {featured.excerpt}
                  </p>
                ) : null}
                <span className="mt-8 inline-flex w-fit text-sm font-semibold text-[#38BDF8] transition-colors group-hover:text-sky-300">
                  Read Guide
                </span>
              </div>
            </Link>
          ) : (
            <p className="rounded-2xl border border-white/20 bg-[#0F1D2E]/90 px-6 py-10 text-slate-200 shadow-2xl backdrop-blur-md">
              {filter === "All"
                ? "No guides published yet."
                : "No guides in this category yet."}
            </p>
          )}

          {recent.length > 0 ? (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-white">Recent Articles</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recent.map((post) => (
                  <Link
                    key={post.id || post.slug}
                    href={post.href}
                    className={`group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-[#0F1D2E]/90 shadow-2xl backdrop-blur-md transition-colors hover:border-[#38BDF8]/60 ${focusRing}`}
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
                          <span className="text-sm text-slate-400">{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#38BDF8]">
                          {post.title}
                        </h3>
                        {post.excerpt ? (
                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-200">
                            {post.excerpt}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] transition-colors group-hover:text-sky-300">
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
            </div>
          ) : null}
        </div>
      </section>
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
    <span className="inline-flex text-xs font-semibold tracking-wide text-[#38BDF8]">
      {children}
    </span>
  );
}

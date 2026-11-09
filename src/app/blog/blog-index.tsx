"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/data/blogPosts";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export type BlogCard = Pick<
  BlogPost,
  "id" | "slug" | "title" | "category" | "date" | "readTime" | "excerpt" | "coverImage"
>;

export function BlogIndex({
  posts,
  categories,
}: {
  posts: BlogCard[];
  categories: string[];
}) {
  const filters = ["All", ...categories];
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => (filter === "All" ? posts : posts.filter((post) => post.category === filter)),
    [filter, posts],
  );

  const [featured, ...recent] = visible;

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
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

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
          Pacific Northwest Homeowner Guides
        </p>
        <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight text-white lg:text-5xl">
          Expert Advice on Windows, Doors, and Glass
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Straightforward, technical advice from local specialists to help you
          plan upgrades, understand building science, and make confident
          investments in your home.
        </p>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-1"
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
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                  active
                    ? "border-[#1D2C43] bg-[#1D2C43] text-[#FFFFFF]"
                    : "border-slate-700 bg-[#132238] text-white hover:border-[#1D2C43]/40 hover:bg-[#132238]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {featured ? (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className={`group grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-700/80 bg-[#132238] shadow-sm transition-shadow hover:shadow-md lg:grid-cols-2 ${focusRing}`}
          >
            <div className="overflow-hidden">
              <Cover
                src={featured.coverImage}
                alt=""
                className="h-64 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-80 lg:h-full lg:min-h-[24rem]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <CategoryPill>{featured.category}</CategoryPill>
                <span className="text-sm text-slate-400">{featured.readTime}</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-white transition-colors group-hover:text-slate-100 sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                {featured.excerpt}
              </p>
              <span className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-[#1D2C43] px-5 py-3 text-sm font-medium text-white transition-colors group-hover:bg-sky-300">
                Read Guide
              </span>
            </div>
          </Link>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-slate-700/80 bg-[#132238] px-6 py-10 text-slate-300 shadow-sm">
            No guides in this category yet.
          </p>
        </section>
      )}

      {recent.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <Link
                key={post.id || post.slug}
                href={`/blog/${post.slug}`}
                className={`group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/80 bg-[#132238] shadow-sm transition-shadow hover:shadow-md ${focusRing}`}
              >
                <div>
                  <div className="overflow-hidden">
                    <Cover
                      src={post.coverImage}
                      alt=""
                      className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <CategoryPill>{post.category}</CategoryPill>
                      <span className="text-sm text-slate-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-white transition-colors group-hover:text-slate-100">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{post.excerpt}</p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:underline">
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

function Cover({ src, alt, className }: { src: string; alt: string; className: string }) {
  if (!src) {
    return <div className={`bg-[#132238] ${className}`} aria-hidden="true" />;
  }
  return <img src={src} alt={alt} className={className} />;
}

function CategoryPill({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full bg-[#132238] px-3 py-1 text-xs font-semibold tracking-wide text-white transition-colors duration-200">
      {children}
    </span>
  );
}

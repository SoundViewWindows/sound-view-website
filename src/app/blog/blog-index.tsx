"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { blogCategories, blogPosts, type BlogCategory } from "@/data/blogPosts";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]";

type Filter = "All" | BlogCategory;

const filters: Filter[] = ["All", ...blogCategories];

export function BlogIndex() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? blogPosts
        : blogPosts.filter((post) => post.category === filter),
    [filter],
  );

  const [featured, ...recent] = visible;

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className={`rounded-sm hover:text-[#1B2A4A] ${focusRing}`}>
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

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
          Pacific Northwest Homeowner Guides
        </p>
        <h1 className="mb-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-[#1B2A4A] lg:text-5xl">
          Expert Advice on Windows, Doors, and Glass
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
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
                    ? "border-[#1B2A4A] bg-[#1B2A4A] text-[#FAF8F5]"
                    : "border-slate-200 bg-white text-[#1B2A4A] hover:border-[#1B2A4A]/40 hover:bg-[#F3EFEA]"
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
          <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:grid-cols-2">
            <div className="relative h-64 w-full sm:h-80 lg:h-full lg:min-h-[24rem]">
              <Image
                src={featured.coverImage}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <CategoryPill>{featured.category}</CategoryPill>
                <span className="text-sm text-slate-500">{featured.readTime}</span>
              </div>
              <h2 className="font-serif text-3xl font-bold leading-tight text-[#1B2A4A] sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                {featured.excerpt}
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className={`mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-[#1B2A4A] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0F172A] ${focusRing}`}
              >
                Read Guide
              </Link>
            </div>
          </article>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-slate-200/80 bg-white px-6 py-10 text-slate-700 shadow-sm">
            No guides in this category yet. New notes on shower glass and
            architectural glass are in progress.
          </p>
        </section>
      )}

      {recent.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#1B2A4A]">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.coverImage}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <CategoryPill>{post.category}</CategoryPill>
                      <span className="text-sm text-slate-500">{post.readTime}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold leading-snug text-[#1B2A4A]">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`inline-flex items-center gap-2 text-sm font-medium text-[#1B2A4A] hover:underline ${focusRing}`}
                  >
                    Read article
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function CategoryPill({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full bg-[#F3EFEA] px-3 py-1 text-xs font-semibold tracking-wide text-[#1B2A4A] transition-colors duration-200">
      {children}
    </span>
  );
}

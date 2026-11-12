import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { BOOKING_URL } from "@/config/links";
import { canonicalUrl } from "@/config/site";
import { blogPosts, getBlogPost, type BlogPost } from "@/data/blogPosts";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const articleAuthor = "Sound View Window & Door";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || undefined,
    authors: [{ name: articleAuthor }],
    alternates: {
      canonical: canonicalUrl(`/blog/${post.slug}`),
    },
  };
}

export default function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <div className="bg-white text-slate-800">
      <Header />
      <Suspense fallback={<ArticleFallback />}>
        <Article params={props.params} />
      </Suspense>
      <CtaBanner />
    </div>
  );
}

async function Article({
  params,
}: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const cta = ctaFor(post);

  return (
    <main className="bg-white">
      <header className="mx-auto max-w-4xl bg-white px-4 pb-6 pt-8 sm:px-6 sm:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className={`rounded-sm font-medium text-[#0090c8] hover:underline ${focusRing}`}>
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">&gt;</span>
              <Link href="/blog" className={`rounded-sm font-medium text-[#0090c8] hover:underline ${focusRing}`}>
                Resources
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">&gt;</span>
              <Link href="/blog" className={`rounded-sm font-medium text-[#0090c8] hover:underline ${focusRing}`}>
                Blog &amp; Guides
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">&gt;</span>
              <span aria-current="page">{post.category}</span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-[#0090c8]">
            {post.category}
          </span>
          <time
            dateTime={post.publishedAt.slice(0, 10)}
            className="text-xs font-medium text-slate-500 sm:text-sm"
          >
            {post.date}
          </time>
          <span aria-hidden="true" className="text-xs font-medium text-slate-500 sm:text-sm">
            &middot;
          </span>
          <span className="text-xs font-medium text-slate-500 sm:text-sm">{post.readTime}</span>
        </div>

        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#0B192C] sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
      </header>
      {showArticleCover(post) ? (
        <div className="mx-auto mb-8 w-full max-w-4xl bg-white px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              className="block h-auto w-full"
            />
          </div>
        </div>
      ) : null}
      <article className="mx-auto max-w-4xl bg-white px-4 pb-16 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              datePublished: post.publishedAt,
              author: {
                "@type": "Organization",
                name: articleAuthor,
              },
            }),
          }}
        />

        <div
          className="prose prose-lg max-w-none leading-relaxed prose-headings:font-sans prose-headings:font-extrabold prose-headings:text-[#0B192C] prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-li:leading-relaxed prose-strong:text-[#0B192C] prose-a:text-[#0090c8] prose-a:underline hover:prose-a:text-[#007fb1] prose-blockquote:rounded-2xl prose-blockquote:border prose-blockquote:border-sky-100 prose-blockquote:bg-[#F4FAFD] prose-blockquote:p-6 prose-blockquote:text-slate-700 prose-blockquote:not-italic prose-img:h-auto prose-img:w-full prose-img:rounded-2xl [&_iframe]:my-8 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags.length > 0 ? (
          <ul className="mt-10 flex list-none flex-wrap gap-2 p-0">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs text-[#0090c8]"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <aside className="mt-12 rounded-2xl border border-sky-100 bg-[#F4FAFD] p-6 text-slate-700">
          <p className="text-xs font-bold uppercase tracking-wider text-[#0090c8]">
            Local team
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#0B192C]">
            Written by {articleAuthor}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#556980]">
            Specialists in replacement windows, doors, and custom glass for
            homes across the Greater Seattle Area, with 17+ years in the
            Pacific Northwest.
          </p>
          <Link
            href="/contact"
            className={`mt-5 inline-flex text-sm font-medium text-[#0090c8] underline decoration-sky-400/40 underline-offset-4 hover:text-[#007fb1] ${focusRing}`}
          >
            Contact the team
          </Link>
        </aside>

        <aside className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-[#0B192C] shadow-md sm:p-8">
          <h2 className="text-2xl font-bold">{cta.heading}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#556980]">
            {cta.body}
          </p>
          {cta.external ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex rounded-lg bg-[#0090c8] px-5 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#007fb1] ${focusRing}`}
            >
              {cta.label}
            </a>
          ) : (
            <Link
              href={cta.href}
              className={`mt-6 inline-flex rounded-lg bg-[#0090c8] px-5 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#007fb1] ${focusRing}`}
            >
              {cta.label}
            </Link>
          )}
        </aside>
      </article>
    </main>
  );
}

function showArticleCover(post: BlogPost) {
  if (!post.coverImage) return false;
  const match = post.content.match(/<img\b[^>]*\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
  const firstImage = match?.[1] || match?.[2] || "";
  return normalizeImageSrc(firstImage) !== normalizeImageSrc(post.coverImage);
}

function normalizeImageSrc(src: string) {
  const clean = src.split("#")[0]?.split("?")[0] ?? "";
  try {
    return decodeURIComponent(clean);
  } catch {
    return clean;
  }
}

function ctaFor(post: BlogPost) {
  const hay = `${post.title} ${post.slug}`.toLowerCase();
  if (/showroom|about sound view/.test(hay)) {
    return {
      heading: "See the products in a local showroom",
      body: "Book a visit to compare windows, doors, and glass with a specialist who works on Greater Seattle homes.",
      label: "Book a Showroom Visit",
      href: BOOKING_URL,
      external: true,
    };
  }
  if (/shower/.test(hay)) {
    return {
      heading: "Plan a custom shower enclosure",
      body: "Start with the shower configurator and tell us the layout, glass, and hardware you want to compare.",
      label: "Start the Shower Configurator",
      href: "/services/shower-door-replacement/types",
      external: false,
    };
  }
  if (/glass replacement|measure window glass|obscure glass/.test(hay)) {
    return {
      heading: "Price a glass-only replacement",
      body: "If the frame is still sound, walk through the glass configurator before replacing the whole opening.",
      label: "Start the Glass Configurator",
      href: "/services/glass-replacement/types",
      external: false,
    };
  }
  if (post.category === "Doors" || (/\bdoors?\b/.test(hay) && !/window/.test(hay))) {
    return {
      heading: "Compare entry and patio doors",
      body: "Use the door configurator to record style and material, then review the options that hold up in a wet winter.",
      label: "Start the Door Configurator",
      href: "/services/door-replacement/types",
      external: false,
    };
  }
  return {
    heading: "Compare window packages for your openings",
    body: "Walk through material, type, and manufacturer, then request a free window quote.",
    label: "Start the Window Configurator",
    href: "/services/window-replacement/materials",
    external: false,
  };
}

function ArticleFallback() {
  return (
    <main>
      <div className="mx-auto max-w-4xl animate-pulse bg-white px-4 pb-6 pt-8 sm:px-6 sm:pt-12">
        <div className="mb-4 h-4 w-48 rounded bg-slate-200" />
        <div className="mb-3 h-4 w-40 rounded bg-slate-200" />
        <div className="h-12 w-full max-w-xl rounded bg-slate-200" />
      </div>
      <div className="mx-auto mb-8 w-full max-w-4xl bg-white px-4 sm:px-6">
        <div className="h-80 rounded-2xl border border-slate-200 bg-slate-100 sm:h-96" />
      </div>
    </main>
  );
}

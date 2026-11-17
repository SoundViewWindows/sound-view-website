import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { canonicalUrl } from "@/config/site";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { articlePublicPath, publicPaths } from "@/lib/public-paths";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const articleAuthor = "Sound View Window & Door";

export function legacyArticleParams(prefix: string) {
  return blogPosts
    .filter((post) => post.originalPath.startsWith(`${prefix}/`))
    .map((post) => ({ slug: post.originalPath.slice(prefix.length + 1) }));
}

export function postForLegacyPath(prefix: string, slug: string) {
  return blogPosts.find((post) => post.originalPath === `${prefix}/${slug}`);
}

export function legacyArticleMetadata(post: BlogPost): Metadata {
  const canonical = canonicalUrl(articlePublicPath(post.originalPath));
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || undefined;
  return {
    title,
    description,
    authors: [{ name: articleAuthor }],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt }] : undefined,
    },
  };
}

export function LegacyArticle({ post }: { post: BlogPost }) {
  const cta = ctaFor(post);
  const canonical = canonicalUrl(articlePublicPath(post.originalPath));
  return (
    <div className="bg-white text-slate-800">
      <Header />
      <main className="bg-white">
        <header className="border-b border-slate-200 bg-white text-[#0B192C]">
          <div className="mx-auto max-w-4xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className={`rounded-sm font-medium hover:text-[#0B192C] ${focusRing}`}>
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-slate-400">&gt;</span>
                  <Link href={publicPaths.blog} className={`rounded-sm font-medium hover:text-[#0B192C] ${focusRing}`}>
                    Resources
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-slate-400">&gt;</span>
                  <Link href={publicPaths.blog} className={`rounded-sm font-medium hover:text-[#0B192C] ${focusRing}`}>
                    Blog &amp; Guides
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-slate-400">&gt;</span>
                  <span aria-current="page">{post.category}</span>
                </li>
              </ol>
            </nav>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex rounded-[4px] bg-[#E0F2FE] px-3 py-1 text-xs font-semibold text-[#0284C7]">
                {post.category}
              </span>
              <time dateTime={post.publishedAt.slice(0, 10)} className="text-xs font-medium text-slate-500 sm:text-sm">
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
          </div>
        </header>
        {showArticleCover(post) ? (
          <div className="mx-auto mb-8 w-full max-w-4xl bg-white px-4 pt-8 sm:px-6">
            <div className="overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm">
              <img src={post.coverImage} alt={post.coverAlt} className="block h-auto w-full" />
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
                url: canonical,
                mainEntityOfPage: canonical,
                image: post.coverImage ? [canonicalUrl(post.coverImage)] : undefined,
                author: { "@type": "Organization", name: articleAuthor },
              }),
            }}
          />
          <div
            className="prose prose-lg max-w-none leading-relaxed prose-headings:font-sans prose-headings:font-extrabold prose-headings:text-[#0B192C] prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-li:leading-relaxed prose-strong:text-[#0B192C] prose-a:text-[#0284C7] prose-a:underline hover:prose-a:text-[#0090c8] prose-blockquote:rounded-[4px] prose-blockquote:border prose-blockquote:border-slate-200 prose-blockquote:bg-[#F4F6F9] prose-blockquote:p-6 prose-blockquote:text-[#0B192C] prose-blockquote:not-italic prose-img:h-auto prose-img:w-full prose-img:rounded-[4px] [&_table]:my-8 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-[4px] [&_table]:border [&_table]:border-slate-200 [&_th]:bg-[#F4F6F9] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-[#0B192C] [&_td]:border-t [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-[#0B192C] [&_iframe]:my-8 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-[4px]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.tags.length > 0 ? (
            <ul className="mt-10 flex list-none flex-wrap gap-2 p-0">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-[4px] border border-slate-200/90 bg-[#F8FAFC] px-3 py-1 text-xs text-[#0284C7]">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <aside className="mt-12 rounded-[4px] border border-slate-200/90 bg-[#F4F6F9] p-6 text-slate-700">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">Local team</p>
            <h2 className="mt-2 text-2xl font-bold text-[#0B192C]">Written by {articleAuthor}</h2>
            <p className="mt-3 text-base leading-relaxed text-[#556980]">
              Specialists in replacement windows, doors, and custom glass for homes across the Greater Seattle Area, with 17+ years in the Pacific Northwest.
            </p>
            <Link
              href={publicPaths.contact}
              className={`mt-5 inline-flex text-sm font-medium text-[#0284C7] underline decoration-sky-400/40 underline-offset-4 hover:text-[#0090c8] ${focusRing}`}
            >
              Contact the team
            </Link>
          </aside>
          <aside className="mt-6 rounded-[4px] border border-slate-200/80 bg-white p-6 text-[#0B192C] shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">{cta.heading}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#556980]">{cta.body}</p>
            <Link
              href={cta.href}
              className={`mt-6 inline-flex rounded-[4px] bg-[#0090c8] px-5 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#007fb1] ${focusRing}`}
            >
              {cta.label}
            </Link>
          </aside>
        </article>
      </main>
      <CtaBanner />
    </div>
  );
}

export function legacyArticleOrNotFound(prefix: string, slug: string) {
  const post = postForLegacyPath(prefix, slug);
  if (!post) notFound();
  return post;
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
      href: "/book-appointment",
    };
  }
  if (/shower/.test(hay)) {
    return {
      heading: "Plan a custom shower enclosure",
      body: "Start with the shower configurator and tell us the layout, glass, and hardware you want to compare.",
      label: "Start the Shower Configurator",
      href: publicPaths.shower,
    };
  }
  if (/glass replacement|measure window glass|obscure glass/.test(hay)) {
    return {
      heading: "Price a glass-only replacement",
      body: "If the frame is still sound, walk through the glass configurator before replacing the whole opening.",
      label: "Start the Glass Configurator",
      href: publicPaths.glass,
    };
  }
  if (post.category === "Doors" || (/\bdoors?\b/.test(hay) && !/window/.test(hay))) {
    return {
      heading: "Compare entry and patio doors",
      body: "Use the door configurator to record style and material, then review the options that hold up in a wet winter.",
      label: "Start the Door Configurator",
      href: publicPaths.doors,
    };
  }
  return {
    heading: "Compare window packages for your openings",
    body: "Walk through material, type, and manufacturer, then request a free window quote.",
    label: "Start the Window Configurator",
    href: publicPaths.windows,
  };
}

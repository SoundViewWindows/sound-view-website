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
  const related = relatedPosts(post);
  return (
    <div className="bg-white text-[#0F1D2E]" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
      <Header />
      <main>
        <header className="bg-[#0F1D2E] text-white" style={{ backgroundColor: "#0F1D2E", color: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
            <nav aria-label="Breadcrumb" className="text-xs text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <Link href={publicPaths.blog} className={`rounded-sm hover:text-white ${focusRing}`}>
                    Blog &amp; Guides
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <span aria-current="page">{post.category}</span>
                </li>
              </ol>
            </nav>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#38BDF8]">{post.category}</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
              {post.title}
            </h1>
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-200">
              <time dateTime={post.publishedAt.slice(0, 10)}>{post.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readTime}</span>
            </p>
          </div>
        </header>
        {showArticleCover(post) ? (
          <div className="bg-white" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                <img src={post.coverImage} alt={post.coverAlt} className="block max-h-[32rem] w-full object-cover object-center" />
              </div>
            </div>
          </div>
        ) : null}
        <article className="bg-white" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
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
              className="prose prose-lg max-w-none leading-relaxed prose-headings:mt-10 prose-headings:mb-4 prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#0F1D2E] prose-h2:text-2xl prose-h3:text-xl prose-p:mb-5 prose-p:text-[#334155] prose-p:leading-8 prose-li:text-[#334155] prose-li:leading-7 prose-strong:text-[#0F1D2E] prose-a:text-[#0284C7] prose-a:underline hover:prose-a:text-[#0F1D2E] prose-blockquote:rounded-2xl prose-blockquote:border prose-blockquote:border-slate-200 prose-blockquote:bg-[#f4fafd] prose-blockquote:p-6 prose-blockquote:text-[#0F1D2E] prose-blockquote:not-italic prose-img:my-8 prose-img:h-auto prose-img:w-full prose-img:rounded-2xl prose-img:object-cover [&_table]:my-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_th]:bg-[#f4fafd] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-[#0F1D2E] [&_td]:border-t [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-[#334155] [&_iframe]:my-8 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {post.tags.length > 0 ? (
              <ul className="mt-10 flex list-none flex-wrap gap-2 p-0">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-slate-200 bg-[#f4fafd] px-3 py-1 text-xs font-medium text-[#0284C7]">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
        <section className="border-t border-slate-200/80 bg-[#f4fafd]" style={{ backgroundColor: "#F4FAFD", color: "#0F1D2E" }}>
          <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
            <aside>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">Local team</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0F1D2E]">Written by {articleAuthor}</h2>
              <p className="mt-3 text-base leading-relaxed text-[#556980]">
                Specialists in replacement windows, doors, and custom glass for homes across the Greater Seattle Area, with 17+ years in the Pacific Northwest.
              </p>
              <Link
                href={publicPaths.contact}
                className={`mt-5 inline-flex text-sm font-semibold text-[#0284C7] underline decoration-sky-400/40 underline-offset-4 hover:text-[#0F1D2E] ${focusRing}`}
              >
                Contact the team
              </Link>
            </aside>
            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-[#0F1D2E]">{cta.heading}</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#556980]">{cta.body}</p>
              <Link
                href={cta.href}
                className={`mt-6 inline-flex rounded-lg bg-[#38BDF8] px-5 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
              >
                {cta.label}
              </Link>
            </aside>
          </div>
        </section>
        {related.length > 0 ? (
          <section className="bg-white" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F1D2E] sm:text-3xl">More in {post.category}</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={articlePublicPath(item.originalPath)}
                    className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-sky-400 ${focusRing}`}
                  >
                    {item.coverImage ? (
                      <img src={item.coverImage} alt={item.coverAlt} className="aspect-[16/10] w-full object-cover object-center" />
                    ) : null}
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#0284C7]">{item.category}</p>
                      <h3 className="mt-2 text-base font-bold leading-snug text-[#0F1D2E]">{item.title}</h3>
                      <p className="mt-2 text-xs text-[#556980]">{item.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <CtaBanner />
    </div>
  );
}

function relatedPosts(post: BlogPost) {
  return blogPosts
    .filter((item) => item.slug !== post.slug && item.categories.some((category) => post.categories.includes(category)))
    .slice(0, 3);
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

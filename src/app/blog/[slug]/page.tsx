import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { BOOKING_URL } from "@/config/links";
import { blogPosts, getBlogPost, type BlogPost } from "@/data/blogPosts";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2C43]";

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
    title: `${post.title} | Sound View Window & Door`,
    description: post.excerpt,
  };
}

export default function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <div className="bg-[#F7F5F0] text-[#28323D]">
      <Header />
      <Suspense fallback={<ArticleFallback />}>
        <Article params={props.params} />
      </Suspense>
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
    <main>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className={`rounded-sm hover:text-[#1D2C43] ${focusRing}`}>
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">&gt;</span>
              <Link href="/blog" className={`rounded-sm hover:text-[#1D2C43] ${focusRing}`}>
                Blog
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">&gt;</span>
              <span aria-current="page">{post.category}</span>
            </li>
          </ol>
        </nav>

        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600">
          <span className="inline-flex rounded-full bg-[#EFEBE4] px-3 py-1 text-xs font-semibold tracking-wide text-[#1D2C43]">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mb-6 font-serif text-3xl font-bold leading-tight text-[#1D2C43] sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt=""
            className="mb-10 h-80 w-full rounded-3xl object-cover shadow-sm sm:h-96"
          />
        ) : null}

        <div
          className="prose prose-lg max-w-none leading-relaxed text-slate-700 prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#1D2C43] prose-a:text-[#1D2C43] prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <aside className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Local team
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#1D2C43]">
            Written by the Sound View Advisory Team
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Specialists in replacement windows, doors, and custom glass for
            homes across the Greater Seattle Area, with 17+ years in the
            Pacific Northwest.
          </p>
          <Link
            href="/contact"
            className={`mt-5 inline-flex text-sm font-medium text-[#1D2C43] underline decoration-[#1D2C43]/30 underline-offset-4 hover:decoration-[#1D2C43] ${focusRing}`}
          >
            Contact the team
          </Link>
        </aside>

        <aside className="mt-6 rounded-2xl bg-[#1D2C43] p-6 text-[#FFFFFF] shadow-sm sm:p-8">
          <h2 className="font-serif text-2xl font-bold">{cta.heading}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#FFFFFF]/85">
            {cta.body}
          </p>
          {cta.external ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex rounded-lg bg-[#F7F5F0] px-5 py-3 text-sm font-medium text-[#1D2C43] transition-colors hover:bg-white ${focusRing}`}
            >
              {cta.label}
            </a>
          ) : (
            <Link
              href={cta.href}
              className={`mt-6 inline-flex rounded-lg bg-[#F7F5F0] px-5 py-3 text-sm font-medium text-[#1D2C43] transition-colors hover:bg-white ${focusRing}`}
            >
              {cta.label}
            </Link>
          )}
        </aside>
      </article>
    </main>
  );
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
    body: "Walk through style, frame material, and project details in the three-step window configurator.",
    label: "Start the Window Configurator",
    href: "/services/window-replacement/types",
    external: false,
  };
}

function ArticleFallback() {
  return (
    <main>
      <div className="mx-auto max-w-4xl animate-pulse px-4 py-12 sm:px-6">
        <div className="mb-6 h-4 w-48 rounded bg-[#1D2C43]/10" />
        <div className="mb-4 h-4 w-40 rounded bg-[#1D2C43]/10" />
        <div className="mb-8 h-12 w-full max-w-xl rounded bg-[#1D2C43]/10" />
        <div className="h-80 rounded-3xl bg-[#1D2C43]/10 sm:h-96" />
      </div>
    </main>
  );
}

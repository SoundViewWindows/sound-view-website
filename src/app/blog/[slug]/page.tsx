import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { getBlogPost, blogPosts, type BlogBlock } from "@/data/blogPosts";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]";

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
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
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

  return (
    <main>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className={`rounded-sm hover:text-[#1B2A4A] ${focusRing}`}>
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">&gt;</span>
              <Link href="/blog" className={`rounded-sm hover:text-[#1B2A4A] ${focusRing}`}>
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
          <span className="inline-flex rounded-full bg-[#F3EFEA] px-3 py-1 text-xs font-semibold tracking-wide text-[#1B2A4A]">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mb-6 font-serif text-3xl font-bold leading-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <div className="relative mb-10 h-80 w-full overflow-hidden rounded-3xl shadow-sm sm:h-96">
          <Image
            src={post.coverImage}
            alt={post.imageAlt}
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="h-80 w-full object-cover sm:h-96"
          />
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-slate-700">
          {post.content.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>

        <aside className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Local team
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#1B2A4A]">
            Written by the Sound View Technical Advisory Team
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Specialists in replacement windows, doors, and custom glass for
            homes across the Greater Seattle Area, with 17+ years in the
            Pacific Northwest.
          </p>
          <Link
            href="/contact"
            className={`mt-5 inline-flex text-sm font-medium text-[#1B2A4A] underline decoration-[#1B2A4A]/30 underline-offset-4 hover:decoration-[#1B2A4A] ${focusRing}`}
          >
            Contact the team
          </Link>
        </aside>

        <aside className="mt-6 rounded-2xl bg-[#1B2A4A] p-6 text-[#FAF8F5] shadow-sm sm:p-8">
          <h2 className="font-serif text-2xl font-bold">{post.cta.heading}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#FAF8F5]/85">
            {post.cta.body}
          </p>
          {post.cta.external ? (
            <a
              href={post.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex rounded-lg bg-[#FAF8F5] px-5 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-white ${focusRing}`}
            >
              {post.cta.label}
            </a>
          ) : (
            <Link
              href={post.cta.href}
              className={`mt-6 inline-flex rounded-lg bg-[#FAF8F5] px-5 py-3 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-white ${focusRing}`}
            >
              {post.cta.label}
            </Link>
          )}
        </aside>
      </article>
    </main>
  );
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="pt-4 font-serif text-2xl font-bold leading-snug text-[#1B2A4A] sm:text-3xl">
        {block.text}
      </h2>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-2 pl-6">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="rounded-2xl border border-slate-200/80 border-l-4 border-l-[#1B2A4A] bg-white px-6 py-5 font-serif text-xl leading-relaxed text-[#1B2A4A] shadow-sm">
        {block.text}
      </blockquote>
    );
  }
  return <p>{block.text}</p>;
}

function ArticleFallback() {
  return (
    <main>
      <div className="mx-auto max-w-4xl animate-pulse px-4 py-12 sm:px-6">
        <div className="mb-6 h-4 w-48 rounded bg-[#1B2A4A]/10" />
        <div className="mb-4 h-4 w-40 rounded bg-[#1B2A4A]/10" />
        <div className="mb-8 h-12 w-full max-w-xl rounded bg-[#1B2A4A]/10" />
        <div className="h-80 rounded-3xl bg-[#1B2A4A]/10 sm:h-96" />
      </div>
    </main>
  );
}

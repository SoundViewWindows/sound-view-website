import { notFound } from "next/navigation";
import { LegacyArticle, legacyArticleMetadata, legacyArticleParams, postForLegacyPath } from "@/components/blog/LegacyArticle";

const prefix = "/andersen-windows-and-doors";

export function generateStaticParams() {
  return legacyArticleParams(prefix);
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = postForLegacyPath(prefix, slug);
  if (!post) return {};
  return legacyArticleMetadata(post);
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = postForLegacyPath(prefix, slug);
  if (!post) notFound();
  return <LegacyArticle post={post} />;
}

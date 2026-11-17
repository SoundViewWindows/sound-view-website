import { notFound, redirect } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blogPosts";
import { articlePublicPath } from "@/lib/public-paths";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostRedirect(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  redirect(articlePublicPath(post.originalPath));
}

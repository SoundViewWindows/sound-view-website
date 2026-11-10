import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { Header } from "@/components/Header";
import { blogCategories, blogPosts } from "@/data/blogPosts";
import { BlogIndex, type BlogCard } from "./blog-index";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/blog"),
  },
  title: "Blog & Guides | Sound View Window & Door",
  description:
    "Pacific Northwest homeowner guides on replacement windows, entry doors, glass, and local utility rebates from Sound View Window & Door.",
};

const cards: BlogCard[] = blogPosts.map(
  ({ id, slug, title, category, categories, date, readTime, excerpt, coverImage, coverAlt }) => ({
    id,
    slug,
    title,
    category,
    categories,
    date,
    readTime,
    excerpt,
    coverImage,
    coverAlt,
  }),
);

export default function BlogPage() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <BlogIndex posts={cards} categories={[...blogCategories]} />
    </div>
  );
}

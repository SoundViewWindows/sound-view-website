import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { blogCategories, blogPosts } from "@/data/blogPosts";
import { BlogIndex, type BlogCard } from "./blog-index";

export const metadata: Metadata = {
  title: "Blog & Guides | Sound View Window & Door",
  description:
    "Pacific Northwest homeowner guides on replacement windows, entry doors, glass, and local utility rebates from Sound View Window & Door.",
};

const cards: BlogCard[] = blogPosts.map(
  ({ id, slug, title, category, date, readTime, excerpt, coverImage }) => ({
    id,
    slug,
    title,
    category,
    date,
    readTime,
    excerpt,
    coverImage,
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

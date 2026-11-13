import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { CtaBanner } from "@/components/CtaBanner";
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
    <div>
      <Header />
      <BlogIndex posts={cards} categories={[...blogCategories]} />
      <CtaBanner
        className="py-16 text-white md:py-20 [&_h2]:text-white [&_p]:text-slate-300"
        style={{
          backgroundColor: "#182B3E",
          paddingTop: "64px",
          paddingBottom: "64px",
          borderTop: "none",
        }}
      />
    </div>
  );
}

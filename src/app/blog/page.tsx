import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BlogIndex } from "./blog-index";

export const metadata: Metadata = {
  title: "Blog & Guides | Sound View Window & Door",
  description:
    "Pacific Northwest homeowner guides on replacement windows, entry doors, glass, and local utility rebates from Sound View Window & Door.",
};

export default function BlogPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1B2A4A]">
      <Header />
      <BlogIndex />
    </div>
  );
}

import type { MetadataRoute } from "next";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { canonicalUrl } from "@/config/site";
import { blogPosts } from "@/data/blogPosts";

function isRedirectOnly(file: string) {
  try {
    return /^\s*redirect\(/m.test(readFileSync(file, "utf8"));
  } catch {
    return false;
  }
}

function hasPage(file: string) {
  try {
    return statSync(file).isFile();
  } catch {
    return false;
  }
}

function collectStaticPaths() {
  const appDir = path.join(process.cwd(), "src", "app");
  const paths = ["/"];
  for (const entry of readdirSync(appDir)) {
    const full = path.join(appDir, entry);
    if (!statSync(full).isDirectory() || entry.startsWith("[")) continue;
    if (hasPage(path.join(full, "page.tsx")) && !isRedirectOnly(path.join(full, "page.tsx"))) {
      paths.push(`/${entry}`);
    }
    for (const nested of walkPages(full, `/${entry}`)) paths.push(nested);
  }
  return paths;
}

function walkPages(directory: string, prefix: string): string[] {
  const paths: string[] = [];
  for (const entry of readdirSync(directory)) {
    if (entry.startsWith("[") || entry.startsWith("(")) continue;
    const full = path.join(directory, entry);
    if (!statSync(full).isDirectory()) continue;
    const route = `${prefix}/${entry}`;
    if (hasPage(path.join(full, "page.tsx")) && !isRedirectOnly(path.join(full, "page.tsx"))) {
      paths.push(route);
    }
    paths.push(...walkPages(full, route));
  }
  return paths;
}

function articleDate(value: string) {
  const parsed = new Date(value.replace(" ", "T"));
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = collectStaticPaths();
  const pages = staticPaths.map((route) => ({
    url: canonicalUrl(route),
  }));
  const articles = blogPosts.map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}`),
    lastModified: articleDate(post.publishedAt),
  }));
  return [...pages, ...articles];
}

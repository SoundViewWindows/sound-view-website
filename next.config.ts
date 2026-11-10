import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

function originalBlogRedirects() {
  const file = path.join(process.cwd(), "migration", "wordpress", "redirects.json");
  if (!fs.existsSync(file)) return [];
  const entries = JSON.parse(fs.readFileSync(file, "utf8")) as {
    source: string;
    destination: string;
  }[];
  return entries.map((entry) => ({
    source: entry.source,
    destination: entry.destination,
    permanent: true,
  }));
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return originalBlogRedirects();
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

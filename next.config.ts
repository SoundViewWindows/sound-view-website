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
  return entries.flatMap((entry) => [
    {
      source: entry.source,
      destination: entry.destination,
      statusCode: 301,
    },
    {
      source: `${entry.source}/`,
      destination: entry.destination,
      statusCode: 301,
    },
  ]);
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
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      ...originalBlogRedirects(),
      {
        source: "/:path+/",
        destination: "/:path+",
        statusCode: 308,
      },
    ];
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

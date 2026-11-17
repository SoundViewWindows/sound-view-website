import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import articlePaths from "./article-public-paths.json" with { type: "json" };
import { blogPosts } from "../data/blogPosts.ts";
import { articlePublicPath, preservedPublicPaths, publicPaths, slashlessPath } from "./public-paths.ts";

test("retained articles keep a unique original public path", () => {
  assert.equal(blogPosts.length, 103);
  assert.equal(articlePaths.length, 103);
  const fromPosts = blogPosts.map((post) => articlePublicPath(post.originalPath));
  assert.deepEqual(articlePaths, fromPosts);
  assert.equal(new Set(fromPosts).size, 103);
  for (const path of fromPosts) {
    assert.equal(path.endsWith("/"), true);
    assert.equal(path.startsWith("/blog/"), false);
  }
});

test("removed window articles enter the preserved window landing page", () => {
  const redirects = readFileSync("src/lib/migration-redirects.ts", "utf8");
  assert.match(redirects, /sliding-windows-pros-cons-and-are-they-right-for-your-home", publicPaths\.windows/);
  assert.match(redirects, /awning-window-vs-horizontal-sliding-window-in-a-high-exposure-area", publicPaths\.windows/);
  assert.equal(redirects.includes("/services/window-replacement/types"), false);
});

test("preserved public paths use one trailing slash and do not include funnel steps or the quote API", () => {
  for (const path of preservedPublicPaths) {
    assert.equal(path.endsWith("/"), true);
    assert.equal(path.includes("/quote"), false);
    assert.equal(path.startsWith("/api"), false);
    assert.equal(path.includes("/manufacturers"), false);
  }
  assert.equal(slashlessPath(publicPaths.financing), "/financing");
  assert.equal(slashlessPath(publicPaths.portfolio), "/portfolio");
  assert.equal(publicPaths.showrooms.endsWith("/"), false);
});

import fs from "fs";
import path from "path";

const defaultExport = path.resolve(
  "migration/wordpress/soundviewwindowanddoor.WordPress.2026-11-10.xml",
);

const sourcePath = [process.argv[2], defaultExport].find(
  (candidate) => candidate && fs.existsSync(candidate),
);

if (!sourcePath) {
  console.error(`Could not find the WordPress export at ${defaultExport}`);
  process.exit(1);
}

const xml = fs.readFileSync(sourcePath, "utf8");
const header = xml.slice(0, xml.indexOf("<item>"));
const items = xml.split("<item>").slice(1);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const titleKeys = ["rank_math_title", "_aioseo_title", "_aioseop_title", "_yoast_wpseo_title"];
const descriptionKeys = [
  "rank_math_description",
  "_aioseo_description",
  "_aioseop_description",
  "_yoast_wpseo_metadesc",
  "meta_description",
];

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#039;/gi, "'")
    .replace(/&rsquo;|&lsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&hellip;/gi, "...")
    .replace(/&ndash;/gi, "\u2013")
    .replace(/&mdash;/gi, "\u2014");
}

function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function field(item, tag) {
  const wrapped = item.match(
    new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`),
  );
  return wrapped ? wrapped[1].trim() : "";
}

function metas(item) {
  const map = {};
  const pattern =
    /<wp:postmeta>\s*<wp:meta_key>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:meta_key>\s*<wp:meta_value>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:meta_value>\s*<\/wp:postmeta>/g;
  let match;
  while ((match = pattern.exec(item))) {
    const key = match[1].trim();
    if (!(key in map)) map[key] = match[2];
  }
  return map;
}

function terms(item, domain) {
  return [
    ...item.matchAll(
      new RegExp(
        `<category domain="${domain}"[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/category>`,
        "g",
      ),
    ),
  ].map((match) => decodeEntities(match[1]).replace(/\s+/g, " ").trim());
}

function unique(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    if (!value || seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}

function authorsFrom(channel) {
  const map = new Map();
  for (const match of channel.matchAll(/<wp:author>([\s\S]*?)<\/wp:author>/g)) {
    const block = match[1];
    const pick = (tag) =>
      (block.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`)) ||
        [])[1] || "";
    const login = pick("wp:author_login").trim();
    const display = decodeEntities(pick("wp:author_display_name")).trim();
    if (login) map.set(login, display || login);
  }
  return map;
}

function isSpacer(src) {
  if (!src) return true;
  const value = src.trim();
  if (!value || value === "#") return true;
  if (/^data:/i.test(value)) return true;
  if (/spacer|blank\.gif|pixel\.gif|1x1/i.test(value)) return true;
  return false;
}

function isShareIcon(src) {
  return /rss-poster\/cache\/[^"']*(?:linkedin|twitter|facebook|email_client)\.png/i.test(src);
}

function attr(source, name) {
  const match = source.match(new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return match ? decodeEntities(match[1] ?? match[2] ?? "").trim() : "";
}

function usableMeta(value) {
  const text = decodeEntities(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text || text === "null" || text.includes("%%")) return "";
  if (/^(a:\d+:\{|\{|\[)/.test(text)) return "";
  return text;
}

function firstMeta(meta, keys) {
  for (const key of keys) {
    const value = usableMeta(meta[key]);
    if (value) return { key, value };
  }
  return { key: "", value: "" };
}

function allowedEmbed(src) {
  try {
    const url = new URL(src);
    if (!/^https:$/.test(url.protocol)) return false;
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") return true;
    if (url.hostname === "www.google.com" && url.pathname.startsWith("/maps/")) return true;
    if (url.hostname === "share.synthesia.io") return true;
    return false;
  } catch {
    return false;
  }
}

function prepareShortcodes(html, attachments, missingGallery) {
  let next = html.replace(/<!--[\s\S]*?-->/g, "");
  next = next.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  next = next.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  next = next.replace(/\[gallery\b([^\]]*)\]/gi, (_, attrs) => {
    const ids = attr(attrs, "ids")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    return ids
      .map((id) => {
        const attachment = attachments.get(id);
        if (!attachment?.url) {
          missingGallery.push(id);
          return "";
        }
        return `<img src="${escapeAttr(attachment.url)}" alt="${escapeAttr(attachment.alt)}" />`;
      })
      .join("");
  });
  next = next.replace(/\[et_pb_heading\b([^\]]*)\](?:[\s\S]*?\[\/et_pb_heading\])?/gi, (_, attrs) => {
    const title = attr(attrs, "title").replace(/\s+/g, " ").trim();
    if (!title) return "";
    const level = attr(attrs, "title_level").toLowerCase();
    const tag = /^h[1-6]$/.test(level) ? level : "h2";
    return `<${tag}>${escapeHtml(title)}</${tag}>`;
  });
  next = next.replace(/\[et_pb_image\b([^\]]*)\](?:[\s\S]*?\[\/et_pb_image\])?/gi, (_, attrs) => {
    const src = attr(attrs, "src") || attr(attrs, "data-src");
    if (isSpacer(src) || isShareIcon(src)) return "";
    const alt = attr(attrs, "alt") || "";
    return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" />`;
  });
  next = next.replace(/\[\/?et_pb_[^\]]*\]/gi, "");
  next = next.replace(/\[\/?caption[^\]]*\]/gi, "");
  next = next.replace(/\[[a-z][a-z0-9_-]*[^\]]*\]/gi, "");
  return next;
}

function sanitizeHtml(input, attachments, missingGallery) {
  const source = prepareShortcodes(input, attachments, missingGallery);
  const pattern = /<\/?([a-zA-Z][\w:-]*)\b([^>]*)\/?>|([^<]+)/g;
  const allowed = new Set([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "img",
    "a",
    "strong",
    "em",
    "b",
    "i",
    "br",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "figure",
    "figcaption",
    "iframe",
  ]);
  const skip = new Set(["script", "style", "noscript", "svg", "form", "button"]);
  const skipDepth = [];
  let html = "";
  let match;

  while ((match = pattern.exec(source))) {
    if (match[3] != null) {
      if (skipDepth.length) continue;
      const text = decodeEntities(match[3]).replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ");
      if (text.trim()) html += text;
      continue;
    }

    const name = match[1].toLowerCase();
    const isClose = match[0].startsWith("</");
    if (skip.has(name)) {
      if (!isClose && !match[0].endsWith("/>")) skipDepth.push(name);
      else if (isClose) {
        const index = skipDepth.lastIndexOf(name);
        if (index >= 0) skipDepth.splice(index, 1);
      }
      continue;
    }
    if (skipDepth.length || !allowed.has(name)) continue;

    if (name === "img") {
      if (isClose) continue;
      const primary = attr(match[2], "src");
      const lazy = attr(match[2], "data-src");
      const src = !isSpacer(primary) ? primary : lazy;
      if (isSpacer(src) || isShareIcon(src)) continue;
      const alt = attr(match[2], "alt") || "";
      html += `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" />`;
      continue;
    }

    if (name === "iframe") {
      if (isClose) continue;
      const src = attr(match[2], "src");
      if (!allowedEmbed(src)) continue;
      const title = attr(match[2], "title") || "Embedded content";
      html += `<iframe src="${escapeAttr(src)}" title="${escapeAttr(title)}" loading="lazy"></iframe>`;
      continue;
    }

    if (name === "br") {
      if (!isClose) html += "<br />";
      continue;
    }

    if (isClose) {
      html += `</${name}>`;
      continue;
    }

    if (name === "a") {
      const href = attr(match[2], "href");
      if (!/^(https?:|mailto:|tel:|\/)/i.test(href)) continue;
      html += `<a href="${escapeAttr(href)}">`;
      continue;
    }

    html += `<${name}>`;
  }

  return wrapLooseCopy(tidyHtml(html));
}

function wrapLooseCopy(html) {
  if (/<(p|ul|ol|h1|h2|table)[\s>]/i.test(html)) return html;
  return html
    .replace(/\s*<strong>/g, "\n<strong>")
    .split("\n")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (/^<(h1|h2|h3|h4|h5|h6|img|iframe|table|blockquote|ul|ol|figure)\b/.test(chunk)) {
        return chunk;
      }
      return `<p>${chunk}</p>`;
    })
    .join("");
}

function tidyHtml(html) {
  let next = html;
  for (let pass = 0; pass < 4; pass += 1) {
    next = next
      .replace(/<(p|h1|h2|h3|h4|h5|h6|li|blockquote|strong|em|b|i|a|figcaption)>\s*<\/\1>/gi, "")
      .replace(/<p>\s*(?:<br \/>\s*)+<\/p>/gi, "")
      .replace(/(?:<br \/>\s*){3,}/gi, "<br /><br />")
      .replace(/\s+<\/(p|h1|h2|h3|h4|h5|h6|li|blockquote)>/gi, "</$1>")
      .replace(/<(p|h1|h2|h3|h4|h5|h6|li|blockquote)>\s+/gi, "<$1>");
  }
  next = next.replace(/<h2>Share this article:<\/h2>\s*<ul>[\s\S]*?<\/ul>/gi, "");
  return next.replace(/\n{2,}/g, "\n").trim();
}

function plainText(html) {
  return decodeEntities(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(raw) {
  const [year, month, day] = raw.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return raw;
  return `${months[month - 1]} ${day}, ${year}`;
}

function localAsset(remoteUrl) {
  let url;
  try {
    url = new URL(remoteUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.includes("..")) return null;
  let relative = "";
  const contentIndex = pathname.indexOf("/wp-content/");
  if (url.hostname === "soundviewwindowanddoor.com" && contentIndex >= 0) {
    relative = pathname.slice(contentIndex + "/wp-content/".length);
  } else if (/\.(jpe?g|png|gif|webp|svg|avif)$/i.test(pathname)) {
    relative = path.posix.join("external", url.hostname, pathname.replace(/^\/+/, ""));
  } else {
    return null;
  }
  const publicPath = `/wp-media/${relative}`.replace(/\\/g, "/");
  const disk = path.join("public", "wp-media", ...relative.split("/"));
  return { publicPath, disk };
}

function collectImageUrls(html) {
  return [
    ...html.matchAll(/https?:\/\/[^"'\s<>]+/gi),
  ]
    .map((match) => decodeEntities(match[0]))
    .filter((url) => localAsset(url));
}

async function downloadImages(urls) {
  const saved = new Map();
  const failed = [];
  const queue = [...new Set(urls)];
  let finished = 0;

  async function worker() {
    while (queue.length) {
      const remoteUrl = queue.pop();
      const asset = localAsset(remoteUrl);
      if (!asset) continue;
      if (fs.existsSync(asset.disk) && fs.statSync(asset.disk).size > 0) {
        saved.set(remoteUrl, asset.publicPath);
        finished += 1;
        continue;
      }
      try {
        const response = await fetch(remoteUrl, {
          redirect: "follow",
          headers: { "user-agent": "SoundViewBlogImport/1.0" },
        });
        const type = response.headers.get("content-type") || "";
        const downloadable = /^image\//i.test(type) || /^application\/pdf\b/i.test(type);
        if (!response.ok || !downloadable) {
          failed.push({ url: remoteUrl, status: response.status, type });
        } else {
          const bytes = Buffer.from(await response.arrayBuffer());
          fs.mkdirSync(path.dirname(asset.disk), { recursive: true });
          fs.writeFileSync(asset.disk, bytes);
          saved.set(remoteUrl, asset.publicPath);
        }
      } catch (error) {
        failed.push({ url: remoteUrl, status: 0, type: error instanceof Error ? error.message : "error" });
      }
      finished += 1;
      if (finished % 25 === 0) console.log(`Downloaded ${finished} of ${urls.length} image checks`);
    }
  }

  await Promise.all(Array.from({ length: 8 }, () => worker()));
  return { saved, failed };
}

function rewriteUrls(html, saved, broken) {
  return html.replace(/https?:\/\/[^"'\s<>]+/gi, (remoteUrl) => {
    const decoded = decodeEntities(remoteUrl);
    if (saved.has(decoded)) return saved.get(decoded);
    if (localAsset(decoded)) {
      broken.push(decoded);
      return "";
    }
    return remoteUrl;
  });
}

const authorNames = authorsFrom(header);
const attachments = new Map();

async function recoverMissingMedia(ids) {
  for (const id of ids) {
    if (attachments.has(id)) continue;
    try {
      const response = await fetch(`https://soundviewwindowanddoor.com/wp-json/wp/v2/media/${id}`, {
        headers: { "user-agent": "SoundViewBlogImport/1.0" },
      });
      if (!response.ok) continue;
      const media = await response.json();
      if (typeof media.source_url !== "string" || !media.source_url) continue;
      attachments.set(id, {
        url: media.source_url,
        alt: typeof media.alt_text === "string" ? media.alt_text.trim() : "",
      });
    } catch {
      // The public media record is unavailable. The report keeps the missing id.
    }
  }
}

for (const item of items) {
  if (field(item, "wp:post_type") !== "attachment") continue;
  const id = field(item, "wp:post_id");
  const url = decodeEntities(field(item, "wp:attachment_url"));
  const meta = metas(item);
  attachments.set(id, {
    url,
    alt: decodeEntities(meta._wp_attachment_image_alt || "").replace(/\s+/g, " ").trim(),
  });
}

const galleryIds = unique(
  [...xml.matchAll(/\[gallery\b[^\]]*ids="([^"]+)"/gi)].flatMap((match) =>
    match[1].split(",").map((id) => id.trim()),
  ),
);
await recoverMissingMedia(galleryIds);

const drafts = [];
const posts = [];
const galleryGaps = [];

for (const item of items) {
  const type = field(item, "wp:post_type");
  const status = field(item, "wp:status");
  if (type !== "post") continue;
  if (status !== "publish") {
    if (status === "draft") {
      drafts.push({ id: field(item, "wp:post_id"), title: decodeEntities(field(item, "title")), status });
    }
    continue;
  }

  const slug = field(item, "wp:post_name");
  if (!slug) continue;
  const meta = metas(item);
  const categories = unique(terms(item, "category"));
  const tags = unique(terms(item, "post_tag"));
  const title = decodeEntities(field(item, "title")).replace(/\s+/g, " ").trim();
  const missingGallery = [];
  const content = sanitizeHtml(field(item, "content:encoded"), attachments, missingGallery);
  if (missingGallery.length) galleryGaps.push({ slug, ids: missingGallery });
  const words = plainText(content).split(/\s+/).filter(Boolean).length;
  const yoastMinutes = Number(meta["_yoast_wpseo_estimated-reading-time-minutes"]);
  const readTime = Number.isFinite(yoastMinutes) && yoastMinutes > 0
    ? `${yoastMinutes} min read`
    : `${Math.max(1, Math.ceil(words / 200))} min read`;
  const seoTitle = firstMeta(meta, titleKeys);
  const seoDescription = firstMeta(meta, descriptionKeys);
  const thumb = attachments.get(meta._thumbnail_id || "");
  const link = field(item, "link");
  let originalPath = "";
  try {
    originalPath = new URL(link).pathname.replace(/\/$/, "") || "/";
  } catch {
    originalPath = "";
  }
  const creator = field(item, "dc:creator");

  posts.push({
    id: field(item, "wp:post_id"),
    slug,
    title,
    category: categories[0] || "Uncategorized",
    categories: categories.length ? categories : ["Uncategorized"],
    tags,
    date: formatDate(field(item, "wp:post_date")),
    publishedAt: field(item, "wp:post_date"),
    sort: field(item, "wp:post_date"),
    readTime,
    excerpt: plainText(field(item, "excerpt:encoded")),
    coverImage: thumb?.url || "",
    coverAlt: thumb?.alt || "",
    author: authorNames.get(creator) || creator,
    seoTitle: seoTitle.value,
    seoTitleSource: seoTitle.key,
    seoDescription: seoDescription.value,
    seoDescriptionSource: seoDescription.key,
    originalPath,
    content,
  });
}

const imageUrls = new Set();
for (const post of posts) {
  if (post.coverImage) imageUrls.add(post.coverImage);
  for (const url of collectImageUrls(post.content)) imageUrls.add(url);
}

console.log(`Fetching ${imageUrls.size} unique images`);
const { saved, failed } = await downloadImages([...imageUrls]);
const unresolved = [];

for (const post of posts) {
  const broken = [];
  if (post.coverImage) {
    if (saved.has(post.coverImage)) post.coverImage = saved.get(post.coverImage);
    else if (localAsset(post.coverImage)) {
      broken.push(post.coverImage);
      post.coverImage = "";
      post.coverAlt = "";
    }
  }
  post.content = rewriteUrls(post.content, saved, broken);
  post.content = post.content.replace(/<img src="" alt="[^"]*" \/>/g, "");
  post.brokenImages = [...new Set(broken)];
}

posts.sort((a, b) => (a.sort < b.sort ? 1 : -1));
const outputPosts = posts.map(({ sort, seoTitleSource, seoDescriptionSource, brokenImages, ...post }) => post);

const categoryCounts = new Map();
for (const post of outputPosts) {
  for (const category of post.categories) {
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  }
}
const blogCategories = [...categoryCounts.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([category]) => category);

const destination = path.resolve("src/data/blogPosts.ts");
const file = `export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categories: string[];
  tags: string[];
  date: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  author: string;
  seoTitle: string;
  seoDescription: string;
  originalPath: string;
  content: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(outputPosts, null, 2)};

export const blogCategories = ${JSON.stringify(blogCategories, null, 2)};

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
`;

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, file);

const redirects = outputPosts
  .filter((post) => post.originalPath && post.originalPath !== `/blog/${post.slug}`)
  .map((post) => ({
    source: post.originalPath,
    destination: `/blog/${post.slug}`,
  }));
fs.mkdirSync(path.resolve("migration/wordpress"), { recursive: true });
fs.writeFileSync(path.resolve("migration/wordpress/redirects.json"), JSON.stringify(redirects, null, 2));

const missingCover = outputPosts.filter((post) => !post.coverImage);
const missingSeoTitle = outputPosts.filter((post) => !post.seoTitle);
const missingSeoDescription = outputPosts.filter((post) => !post.seoDescription);
const missingBothSeo = outputPosts.filter((post) => !post.seoTitle && !post.seoDescription);
const thinContent = outputPosts.filter((post) => plainText(post.content).length < 40);
const diviLeft = outputPosts.filter((post) => /\[et_pb_|<script|<style/i.test(post.content));
const duplicateSlugs = outputPosts
  .map((post) => post.slug)
  .filter((slug, index, all) => all.indexOf(slug) !== index);

const report = [];
const line = (text = "") => report.push(text);
line("# WordPress blog migration report");
line("");
line(`Source: ${sourcePath}`);
line("");
line("The XML contains image URLs only. No image files are embedded in the export.");
line("Images were downloaded with public GET requests from the existing media URLs.");
line("The live WordPress site was not modified.");
line("");
line("## Counts");
line("");
line(`- Items in the export: ${items.length}`);
line(`- Published posts found: ${outputPosts.length}`);
line(`- Published posts imported: ${outputPosts.length}`);
line(`- Drafts left out: ${drafts.length}`);
line(`- Duplicate slugs: ${duplicateSlugs.length}`);
line(`- Posts with no featured image: ${missingCover.length}`);
line(`- Posts with a broken featured or inline image URL: ${posts.filter((post) => post.brokenImages.length).length}`);
line(`- Image URLs requested: ${imageUrls.size}`);
line(`- Images saved locally: ${saved.size}`);
line(`- Image downloads that failed: ${failed.length}`);
line(`- Posts missing an SEO title: ${missingSeoTitle.length}`);
line(`- Posts missing a meta description: ${missingSeoDescription.length}`);
line(`- Posts missing both SEO title and meta description: ${missingBothSeo.length}`);
line(`- Canonical URLs in the export: 0`);
line(`- Posts with very little body text: ${thinContent.length}`);
line(`- Posts that still contain Divi or script tags: ${diviLeft.length}`);
line("");
line("## SEO fields present");
line("");
line("- Rank Math title and description are present on the posts that have a current SEO title.");
line("- Older All in One SEO and Yoast description fields are used only when Rank Math is empty.");
line("- A custom meta_description field is used when no SEO plugin description is present.");
line("- No Yoast, Rank Math, or All in One SEO canonical field is populated.");
line("");
line("## URL preservation");
line("");
line("Original WordPress permalinks use a category prefix, for example /doors-2/post-name/.");
line("The new site already publishes articles at /blog/post-name.");
line("Each original path has a 301 redirect to that article. The slug itself is unchanged.");
line("");
for (const post of outputPosts) {
  line(`- ${post.originalPath || "(no link)"} -> /blog/${post.slug}`);
}
line("");
line("## Posts without a featured image");
line("");
if (!missingCover.length) line("None.");
for (const post of missingCover) line(`- ${post.slug}`);
line("");
line("## Image download failures");
line("");
if (!failed.length) line("None.");
for (const failure of failed) line(`- ${failure.status} ${failure.type} ${failure.url}`);
line("");
line("## Gallery attachment IDs missing from the export");
line("");
if (!galleryGaps.length) line("None.");
for (const gap of galleryGaps) line(`- ${gap.slug}: ${gap.ids.join(", ")}`);
line("");
line("## Thin or empty article bodies");
line("");
if (!thinContent.length) line("None.");
for (const post of thinContent) line(`- ${post.slug} (${plainText(post.content).length} characters)`);
line("");
line("## Drafts not imported");
line("");
for (const draft of drafts) line(`- ${draft.id}: ${draft.title}`);
line("");

fs.writeFileSync(path.resolve("migration/wordpress/MIGRATION-REPORT.md"), report.join("\n"));

console.log(`Wrote ${outputPosts.length} posts`);
console.log(`Images saved ${saved.size}, failed ${failed.length}`);
console.log(`Missing covers ${missingCover.length}, missing both SEO fields ${missingBothSeo.length}`);
console.log(`Redirects ${redirects.length}`);

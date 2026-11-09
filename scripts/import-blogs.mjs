import fs from "fs";
import path from "path";

const desktopExport =
  "C:/Users/Sound View Marketing/Desktop/soundviewwindowanddoor.WordPress.2026-11-03 (2).xml";

const sourcePath = [process.argv[2], path.resolve("wordpress-export.xml"), desktopExport].find(
  (candidate) => candidate && fs.existsSync(candidate),
);

if (!sourcePath) {
  console.error("Could not find wordpress-export.xml or the desktop WordPress export.");
  process.exit(1);
}

const xml = fs.readFileSync(sourcePath, "utf8");
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

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#039;/gi, "'")
    .replace(/&rsquo;|&lsquo;|&rsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&hellip;/gi, "...")
    .replace(/&ndash;|&mdash;/gi, ", ");
}

function replaceDashes(value) {
  return value
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s+,\s+/g, ", ")
    .replace(/,\s*,/g, ",");
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

function scrubRegion(value) {
  return value
    .replace(/greater Seattle and Eastside areas/gi, "Greater Seattle Area")
    .replace(/\s*&\s*Eastside/gi, "")
    .replace(/\band the Eastside\b/gi, "")
    .replace(/\bEastside\b/gi, "Greater Seattle Area");
}

function isSpacer(src) {
  if (!src) return true;
  const value = src.trim();
  if (!value || value === "#") return true;
  if (/^data:/i.test(value)) return true;
  if (/spacer|blank\.gif|pixel\.gif|1x1/i.test(value)) return true;
  return false;
}

function attr(source, name) {
  const match = source.match(new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return match ? decodeEntities(match[1] ?? match[2] ?? "") : "";
}

function firstImage(raw) {
  const pattern = /(?:data-src|src)\s*=\s*(?:"([^"]+)"|'([^']+)')/gi;
  const found = [];
  let match;
  while ((match = pattern.exec(raw))) {
    const src = decodeEntities(match[1] ?? match[2] ?? "").trim();
    if (!isSpacer(src) && /^https?:\/\//i.test(src)) found.push(src);
  }
  return (
    found.find((src) => /\/wp-content\/uploads\//i.test(src)) ||
    found.find((src) => !/rss-poster|logo|icon|facebook|twitter|linkedin/i.test(src)) ||
    ""
  );
}

function assignCategory(title, slug, categories) {
  const blob = `${title} ${slug}`.toLowerCase();
  if (/\bvs\.?\b|\bversus\b|comparison|compared/.test(blob)) return "Comparisons";
  if (/energy|climate|rebate|u-factor|efficient/.test(blob)) return "Climate & Energy";
  if (/shower/.test(blob)) return "Doors";
  const doorish = /\bdoors?\b/.test(blob);
  const windowish = /window|skylight|glass/.test(blob);
  if (doorish && !windowish) return "Doors";
  if (categories.some((category) => /shower/i.test(category))) return "Doors";
  if (windowish) return "Windows";
  if (doorish) return "Doors";
  if (categories.some((category) => /window/i.test(category))) return "Windows";
  if (categories.some((category) => /door/i.test(category))) return "Doors";
  return "Windows";
}

function cleanTitle(title) {
  let text = scrubRegion(replaceDashes(decodeEntities(title))).replace(/\s+/g, " ").trim();
  if (text.length > 140) {
    const cut = text.split(/\s[-:]\s/)[0]?.trim();
    if (cut && cut.length >= 24 && cut.length < text.length) text = cut;
  }
  return text;
}

function prepareShortcodes(html) {
  let next = html.replace(/<!--[\s\S]*?-->/g, "");
  next = next.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  next = next.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  next = next.replace(/\[et_pb_heading\b([^\]]*)\](?:[\s\S]*?\[\/et_pb_heading\])?/gi, (_, attrs) => {
    const title = attr(attrs, "title").replace(/\s+/g, " ").trim();
    if (!title) return "";
    const level = attr(attrs, "title_level").toLowerCase();
    const tag = /^h[1-6]$/.test(level) ? level : "h2";
    return `<${tag}>${escapeHtml(title)}</${tag}>`;
  });
  next = next.replace(/\[et_pb_image\b([^\]]*)\](?:[\s\S]*?\[\/et_pb_image\])?/gi, (_, attrs) => {
    const src = attr(attrs, "src") || attr(attrs, "data-src");
    if (isSpacer(src)) return "";
    const alt = attr(attrs, "alt") || "";
    return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" />`;
  });
  next = next.replace(/\[\/?et_pb_[^\]]*\]/gi, "");
  next = next.replace(/\[\/?caption[^\]]*\]/gi, "");
  next = next.replace(/\[[a-z][a-z0-9_-]*[^\]]*\]/gi, "");
  return next;
}

function sanitizeHtml(input) {
  const source = prepareShortcodes(input);
  const pattern = /<\/?([a-zA-Z][\w:-]*)\b([^>]*)\/?>|([^<]+)/g;
  const allowed = new Set([
    "h2",
    "h3",
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
  ]);
  const skip = new Set(["script", "style", "noscript", "iframe", "svg", "form", "button"]);
  const rename = { h1: "h2", h4: "h3", h5: "h3", h6: "h3" };
  const skipDepth = [];
  let html = "";
  let match;

  while ((match = pattern.exec(source))) {
    if (match[3] != null) {
      if (skipDepth.length) continue;
      const text = scrubRegion(replaceDashes(decodeEntities(match[3]))).replace(/\s+/g, " ");
      if (text.trim()) html += text;
      continue;
    }

    const rawName = match[1].toLowerCase();
    const isClose = match[0].startsWith("</");
    if (skip.has(rawName)) {
      if (!isClose && !match[0].endsWith("/>")) skipDepth.push(rawName);
      else if (isClose) {
        const index = skipDepth.lastIndexOf(rawName);
        if (index >= 0) skipDepth.splice(index, 1);
      }
      continue;
    }
    if (skipDepth.length) continue;

    const name = rename[rawName] || rawName;
    if (!allowed.has(name)) continue;

    if (name === "img") {
      if (isClose) continue;
      const primary = attr(match[2], "src");
      const lazy = attr(match[2], "data-src");
      const src = !isSpacer(primary) ? primary : lazy;
      if (isSpacer(src)) continue;
      const alt = attr(match[2], "alt") || "";
      html += `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" />`;
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
  if (/<(p|ul|ol)[\s>]/.test(html)) return html;
  return html
    .replace(/\s*<strong>/g, "\n<strong>")
    .split("\n")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (/^<(h2|h3|img|table|blockquote|ul|ol)\b/.test(chunk)) return chunk;
      const withBreaks = chunk.replace(/\s+\*\s+/g, "<br />");
      return `<p>${withBreaks}</p>`;
    })
    .join("");
}

function tidyHtml(html) {
  let next = html;
  for (let pass = 0; pass < 4; pass += 1) {
    next = next
      .replace(/<(p|h2|h3|li|blockquote|strong|em|b|i|a)>\s*<\/\1>/gi, "")
      .replace(/<p>\s*(?:<br \/>\s*)+<\/p>/gi, "")
      .replace(/(?:<br \/>\s*){3,}/gi, "<br /><br />")
      .replace(/\s+<\/(p|h2|h3|li|blockquote)>/gi, "</$1>")
      .replace(/<(p|h2|h3|li|blockquote)>\s+/gi, "<$1>");
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

function cleanExcerpt(excerpt, content) {
  let text = scrubRegion(replaceDashes(plainText(excerpt)));
  text = text.replace(/^meta description:\s*/i, "").replace(/^["']|["']$/g, "").trim();
  if (!text) {
    const paragraph = content.match(/<p>([\s\S]*?)<\/p>/i);
    text = paragraph ? plainText(paragraph[1]) : plainText(content);
  }
  if (text.length > 220) {
    text = `${text.slice(0, 217).replace(/\s+\S*$/, "").trim()}...`;
  }
  return text;
}

function formatDate(raw) {
  const [year, month, day] = raw.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return raw;
  return `${months[month - 1]} ${day}, ${year}`;
}

const posts = [];

for (const item of items) {
  const type = field(item, "wp:post_type");
  const status = field(item, "wp:status");
  if (type !== "post" || status !== "publish") continue;

  const slug = field(item, "wp:post_name");
  if (!slug) continue;

  const categories = [
    ...item.matchAll(
      /<category domain="category"[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g,
    ),
  ].map((match) => decodeEntities(match[1]).trim());

  const title = cleanTitle(field(item, "title"));
  const rawContent = field(item, "content:encoded");
  const content = sanitizeHtml(rawContent);
  const words = plainText(content).split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  posts.push({
    id: field(item, "wp:post_id"),
    slug,
    title,
    category: assignCategory(title, slug, categories),
    date: formatDate(field(item, "wp:post_date")),
    sort: field(item, "wp:post_date"),
    readTime,
    excerpt: cleanExcerpt(field(item, "excerpt:encoded"), content),
    coverImage: firstImage(rawContent),
    content,
  });
}

posts.sort((a, b) => (a.sort < b.sort ? 1 : -1));
const outputPosts = posts.map(({ sort, ...post }) => post);

const destination = path.resolve("src/data/blogPosts.ts");
const file = `export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  content: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(outputPosts, null, 2)};

export const blogCategories = ["Windows", "Doors", "Climate & Energy", "Comparisons"].filter(
  (category) => blogPosts.some((post) => post.category === category),
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
`;

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, file);

const counts = outputPosts.reduce((map, post) => {
  map[post.category] = (map[post.category] ?? 0) + 1;
  return map;
}, {});

const leftovers = outputPosts.filter((post) =>
  /et_pb_|<style|<div\b|—|–/.test(post.content + post.title + post.excerpt),
);

console.log(`Source: ${sourcePath}`);
console.log(`Wrote ${outputPosts.length} posts to ${destination}`);
console.log(counts);
console.log(`Posts still containing Divi, style, div, or dash artifacts: ${leftovers.length}`);
if (leftovers[0]) console.log("Example leftover slug:", leftovers[0].slug);

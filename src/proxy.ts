import { NextResponse, type NextRequest } from "next/server";
import articlePaths from "@/lib/article-public-paths.json";
import { migrationRedirects } from "@/lib/migration-redirects";
import { preservedPublicPaths, slashlessPath } from "@/lib/public-paths";

const legacyTargets = new Map<string, string>();
for (const redirect of migrationRedirects()) {
  legacyTargets.set(redirect.source, redirect.destination);
  if (!redirect.source.endsWith("/")) legacyTargets.set(`${redirect.source}/`, redirect.destination);
}

const articlePathSet = new Set(articlePaths);
const articleBySlug = new Map<string, string>();
for (const path of articlePaths) {
  const slug = path.split("/").filter(Boolean).at(-1);
  if (slug) articleBySlug.set(slug, path);
}

const slashlessPreserved = new Set(
  [...preservedPublicPaths, ...articlePaths].map((path) => slashlessPath(path)).filter((path) => path !== "/"),
);

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.href = `${url.origin}${pathname}${request.nextUrl.search}`;
  return NextResponse.redirect(url, 301);
}

function passToNotFound(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/__unmatched";
  return NextResponse.rewrite(url);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const legacy = legacyTargets.get(pathname);
  if (legacy && legacy !== pathname) return redirectTo(request, legacy);

  const blogSlug = pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  if (blogSlug) {
    const article = articleBySlug.get(blogSlug);
    if (article) return redirectTo(request, article);
    return passToNotFound(request);
  }

  const legacyArticle = pathname.match(
    /^\/(windows|doors-2|shower-doors|andersen-windows-and-doors|milgard|uncategorized|projects|1479)\/([^/]+)\/?$/,
  );
  if (legacyArticle && !articlePathSet.has(`/${legacyArticle[1]}/${legacyArticle[2]}/`)) {
    return passToNotFound(request);
  }

  if (pathname.length > 1 && pathname.endsWith("/")) return NextResponse.next();
  if (slashlessPreserved.has(pathname)) return redirectTo(request, `${pathname}/`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

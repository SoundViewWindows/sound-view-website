export const siteUrl = "https://soundviewwindowanddoor.com";

export function canonicalUrl(path: string) {
  if (path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

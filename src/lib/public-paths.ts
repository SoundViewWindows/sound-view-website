export const publicPaths = {
  windows: "/replacement-windows-seattle-wa/",
  doors: "/doors-seattle-wa/",
  shower: "/frameless-shower-doors-and-enclosures/",
  glass: "/glass-replacement/",
  financing: "/financing/",
  rebates: "/utility-rebates-for-energy-effient-windows-and-doors-seattle-wa/",
  blog: "/window-and-door-blog/",
  lakeCity: "/window-and-door-showroom-in-seattle-wa-lake-city-way-ne/",
  queenAnne: "/window-and-door-showroom-in-seattle-wa-921-elliott-ave/",
  bellevue: "/bellevue-showroom/",
  portfolio: "/portfolio/",
  about: "/about-sound-view-window-door/",
  contact: "/contact-us-for-window-and-door-estimates-in-seattle-wa/",
  privacy: "/privacy-policy/",
  terms: "/terms-and-conditions/",
  showrooms: "/showrooms",
} as const;

export const preservedPublicPaths = Object.values(publicPaths).filter((path) => path !== publicPaths.showrooms);

export function articlePublicPath(originalPath: string) {
  if (!originalPath.startsWith("/")) return originalPath;
  return originalPath.endsWith("/") ? originalPath : `${originalPath}/`;
}

export function slashlessPath(path: string) {
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

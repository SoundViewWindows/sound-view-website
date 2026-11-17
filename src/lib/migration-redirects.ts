import { publicPaths } from "./public-paths";

export function migrationRedirects() {
  const permanent = (source: string, destination: string) => ({
    source,
    destination,
    statusCode: 301 as const,
  });

  return [
    permanent("/services/window-replacement", publicPaths.windows),
    permanent("/services/window-replacement/materials", publicPaths.windows),
    permanent("/services/door-replacement/types", publicPaths.doors),
    permanent("/services/shower-door-replacement/types", publicPaths.shower),
    permanent("/services/glass-replacement/types", publicPaths.glass),
    permanent("/energy-rebates", publicPaths.rebates),
    permanent("/blog", publicPaths.blog),
    permanent("/showrooms/lake-city", publicPaths.lakeCity),
    permanent("/showrooms/west-queen-anne", publicPaths.queenAnne),
    permanent("/showrooms/bellevue", publicPaths.bellevue),
    permanent("/about", publicPaths.about),
    permanent("/contact", publicPaths.contact),
    permanent("/privacy", publicPaths.privacy),
    permanent("/terms", publicPaths.terms),
    permanent("/windows/sliding-windows-pros-cons-and-are-they-right-for-your-home", publicPaths.windows),
    permanent("/windows/awning-window-vs-horizontal-sliding-window-in-a-high-exposure-area", publicPaths.windows),
    permanent(
      "/doors-2/what-are-the-benefits-of-choosing-milgard-windows",
      "/doors-2/best-window-brands-manufacturers-andersen-vs-pella-vs-milgard-compared/",
    ),
    permanent(
      "/doors-2/west-pro-and-builder-series-vinyl-windows-from-plygem",
      "/doors-2/ply-gem-vinyl-windows-in-seattle-sound-view-as-authorized-ply-gem-dealer-ply-gem-product-lines-vinyl-composite-energy-efficiency-ratings-durability-for-pacific-nw-weather-pricing-valu/",
    ),
    permanent("/door-showroom-displays/virtual-tour-of-our-window-and-door-showroom", publicPaths.about),
    permanent(
      "/doors-2/milgard-essence-french-style-sliding-glass-doors-recently-installed-in-seattle",
      publicPaths.portfolio,
    ),
    permanent("/doors-2/big-windows-in-high-places", publicPaths.portfolio),
  ];
}

export type WindowChoice = {
  slug: string;
  name: string;
  option: string;
  detail: string;
  image: string;
  alt: string;
  body: string;
};

export const windowStyles: WindowChoice[] = [
  {
    slug: "casement",
    name: "Casement Windows",
    option: "Casement Windows",
    detail: "Maximum Ventilation",
    image: "/types/casement.jpg",
    alt: "Open casement windows looking onto a sunny courtyard",
    body: "Hinged on the side and cranks outward. Compression seals create an airtight barrier against Pacific Northwest rain and wind.",
  },
  {
    slug: "double-hung",
    name: "Double-Hung Window",
    option: "Double-Hung Windows",
    detail: "Classic Versatility",
    image: "/types/double-hung.jpg",
    alt: "Double-hung window with sashes that tilt in for cleaning",
    body: "Both upper and lower sashes slide vertically and tilt inward for effortless interior glass cleaning.",
  },
  {
    slug: "single-hung",
    name: "Single-Hung Windows",
    option: "Single-Hung Windows",
    detail: "Timeless Simplicity",
    image: "/types/single-hung.jpg",
    alt: "Single-hung window above a kitchen counter",
    body: "A fixed top sash with an operable bottom sash. Clean lines, dependable performance, and cost-effective efficiency.",
  },
  {
    slug: "awning",
    name: "Awning Windows",
    option: "Awning Windows",
    detail: "Rain-Ready Airflow",
    image: "/types/awning.jpg",
    alt: "Awning window opened outward above a garden and pool",
    body: "Hinged at the top to swing outward from the bottom. Allows fresh ventilation even during light Seattle showers.",
  },
  {
    slug: "sliding",
    name: "Sliding Windows",
    option: "Sliding Windows",
    detail: "Effortless Glide",
    image: "/types/sliding.jpg",
    alt: "Wood-framed sliding window opened to a patio",
    body: "Sashes glide smoothly horizontally along precision tracks. Ideal for wide openings, patios, and outdoor walkways.",
  },
  {
    slug: "picture",
    name: "Picture Windows",
    option: "Picture Windows",
    detail: "Unobstructed Panoramas",
    image: "/types/picture.jpg",
    alt: "A row of picture windows looking out to the water",
    body: "Non-operable direct-set glass that maximizes natural light, thermal performance, and beautiful Puget Sound views.",
  },
  {
    slug: "bay",
    name: "Bay Windows",
    option: "Bay Windows",
    detail: "Dimensional Space",
    image: "/types/bay.jpg",
    alt: "Exterior bay window with a metal roof and stone base",
    body: "Three-panel architectural projection that adds floor space, comfortable seating nooks, and multi-angle outdoor views.",
  },
  {
    slug: "bow",
    name: "Bow Windows",
    option: "Bow Windows",
    detail: "Elegant Curves",
    image: "/types/bow.jpg",
    alt: "Curved bow window with a built-in window seat",
    body: "Four to six gently angled window panes forming a soft curve that floods living rooms and dining areas with panoramic light.",
  },
  {
    slug: "custom",
    name: "Custom Windows",
    option: "Custom Windows",
    detail: "Architectural Specialty",
    image: "/types/custom.jpg",
    alt: "Custom arched window with divided lites in a brick wall",
    body: "Radius arches, geometric trapezoids, and bespoke direct-set frames crafted specifically to match unique home architecture.",
  },
];

export const windowMaterials: WindowChoice[] = [
  {
    slug: "fiberglass",
    name: "Fiberglass",
    option: "Fiberglass (e.g. Milgard Ultra)",
    detail: "Milgard Ultra Series",
    image: "/materials/fiberglass.jpg",
    alt: "Milgard Ultra Series Fiberglass Windows",
    body: "Superior structural strength and minimal thermal expansion. Fiberglass stands up to heavy rain and marine air without swelling or warping.",
  },
  {
    slug: "vinyl",
    name: "Premium Vinyl",
    option: "Premium Vinyl",
    detail: "Low Maintenance",
    image: "/materials/vinyl.jpg",
    alt: "Premium Vinyl Bay Window Installation",
    body: "A cost-effective frame with strong energy efficiency. Premium vinyl does not need painting, and it holds its color in wet Pacific Northwest weather.",
  },
  {
    slug: "wood-clad",
    name: "Wood & Wood-Clad",
    option: "Wood & Wood-Clad (e.g. Andersen)",
    detail: "Andersen",
    image: "/materials/wood-clad.jpg",
    alt: "Andersen Wood and Wood-Clad Windows",
    body: "Classic Pacific Northwest interior warmth, with exterior cladding that takes the weather so the wood inside stays protected.",
  },
  {
    slug: "aluminum",
    name: "Thermally Broken Aluminum",
    option: "Thermally Broken Aluminum",
    detail: "Architectural Lines",
    image: "/materials/aluminum.jpg",
    alt: "Thermally Broken Architectural Aluminum Windows",
    body: "Crisp sightlines and high structural rigidity for modern homes. A thermal break keeps the metal frame from carrying cold inside.",
  },
];

export function styleFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  return windowStyles.find((item) => item.slug === slug) ?? null;
}

export function materialFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  return windowMaterials.find((item) => item.slug === slug) ?? null;
}

export function styleSlugFromOption(option: string) {
  return windowStyles.find((item) => item.option === option)?.slug ?? "undecided";
}

export function choiceLabel(choice: { name: string } | null) {
  return choice?.name ?? "Open to advice";
}

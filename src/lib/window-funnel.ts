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
    slug: "vinyl",
    name: "Vinyl",
    option: "Vinyl",
    detail: "Low Maintenance",
    image: "/materials/vinyl.jpg",
    alt: "Premium vinyl bay window installation",
    body: "A cost-effective frame with strong energy efficiency. Vinyl does not need painting, and it holds its color in wet Pacific Northwest weather.",
  },
  {
    slug: "wood",
    name: "Wood",
    option: "Wood",
    detail: "Natural Warmth",
    image: "/materials/wood-clad.jpg",
    alt: "Wood and wood-clad windows",
    body: "Classic Pacific Northwest interior warmth, with exterior cladding that takes the weather so the wood inside stays protected.",
  },
  {
    slug: "fiberglass",
    name: "Fiberglass",
    option: "Fiberglass",
    detail: "Strength and Stability",
    image: "/materials/fiberglass.jpg",
    alt: "Fiberglass replacement windows",
    body: "Superior structural strength and minimal thermal expansion. Fiberglass stands up to heavy rain and marine air without swelling or warping.",
  },
  {
    slug: "aluminum",
    name: "Aluminum",
    option: "Aluminum",
    detail: "Architectural Lines",
    image: "/materials/aluminum.jpg",
    alt: "Thermally broken architectural aluminum windows",
    body: "Crisp sightlines and high structural rigidity for modern homes. A thermal break keeps the metal frame from carrying cold inside.",
  },
  {
    slug: "composite",
    name: "Composite",
    option: "Composite",
    detail: "Stable Hybrid Frame",
    image: "/images/materials/composite-window.jpg",
    alt: "Charcoal gray composite casement window installed in exterior stucco wall",
    body: "A blended frame that resists swelling in wet weather and holds its color or finish with very little upkeep.",
  },
];

export const windowManufacturers: WindowChoice[] = [
  {
    slug: "milgard",
    name: "Milgard",
    option: "Milgard",
    detail: "Vinyl and Fiberglass",
    image: "/images/manufacturers/milgard.png",
    alt: "Milgard logo",
    body: "Pacific Northwest favorite for vinyl, fiberglass, and moving glass walls.",
  },
  {
    slug: "andersen",
    name: "Andersen Windows & Doors",
    option: "Andersen Windows & Doors",
    detail: "Wood-Clad and Fibrex",
    image: "/images/manufacturers/andersen.png",
    alt: "Andersen Windows & Doors logo",
    body: "Architectural wood-clad, composite Fibrex, and luxury patio door systems.",
  },
  {
    slug: "ply-gem",
    name: "Ply Gem",
    option: "Ply Gem",
    detail: "Vinyl Value",
    image: "/images/manufacturers/ply-gem.jpg",
    alt: "Ply Gem logo",
    body: "Cost-effective, energy-efficient vinyl replacement windows.",
  },
  {
    slug: "stile",
    name: "STILE Windows & Doors",
    option: "STILE Windows & Doors",
    detail: "Windows and Doors",
    image: "/images/manufacturers/stile-logo.png",
    alt: "STILE Windows & Doors logo",
    body: "Contemporary window systems with clean sightlines for replacement projects.",
  },
  {
    slug: "jeld-wen",
    name: "Jeld-Wen",
    option: "Jeld-Wen",
    detail: "Vinyl and Wood",
    image: "/images/manufacturers/jeld-wen.jpg",
    alt: "Jeld-Wen logo",
    body: "Reliable vinyl and wood replacement options for every architectural style.",
  },
  {
    slug: "recommend",
    name: "Specialist Will Recommend",
    option: "Specialist Will Recommend",
    detail: "No Preference",
    image: "",
    alt: "No preference, a specialist will recommend a window brand",
    body: "Let our installation specialists recommend the ideal brand during your consultation.",
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

export function manufacturerFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  const key =
    slug === "consultation" || slug === "expert-recommendation" ? "recommend" : slug;
  return windowManufacturers.find((item) => item.slug === key) ?? null;
}

export function styleSlugFromOption(option: string) {
  return windowStyles.find((item) => item.option === option)?.slug ?? "undecided";
}

export function materialSlugFromOption(option: string) {
  return windowMaterials.find((item) => item.option === option)?.slug ?? "undecided";
}

export function manufacturerSlugFromOption(option: string) {
  return windowManufacturers.find((item) => item.option === option)?.slug ?? "undecided";
}

export function choiceLabel(choice: { name: string } | null) {
  return choice?.name ?? "Open to advice";
}

export function windowStepHref(
  step: "materials" | "types" | "manufacturers" | "quote",
  params: { material?: string; type?: string; manufacturer?: string } = {},
) {
  const search = new URLSearchParams();
  if (step !== "materials" && params.material) search.set("material", params.material);
  if ((step === "manufacturers" || step === "quote") && params.type) {
    search.set("type", params.type);
  }
  if (step === "quote" && params.manufacturer) search.set("manufacturer", params.manufacturer);
  const query = search.toString();
  return `/services/window-replacement/${step}${query ? `?${query}` : ""}`;
}

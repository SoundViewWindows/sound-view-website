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
    body: "Casement windows hinge on one side and crank open outward, sealing tightly against wind and rain.",
  },
  {
    slug: "double-hung",
    name: "Double-Hung Windows",
    option: "Double-Hung Windows",
    detail: "Classic Versatility",
    image: "/types/double-hung.jpg",
    alt: "Double-hung window with sashes that tilt in for cleaning",
    body: "Double-hung windows have two sliding sashes that tilt inward, so both sides clean easily from inside.",
  },
  {
    slug: "single-hung",
    name: "Single-Hung Windows",
    option: "Single-Hung Windows",
    detail: "Timeless Simplicity",
    image: "/types/single-hung.jpg",
    alt: "Single-hung window above a kitchen counter",
    body: "Single-hung windows pair a fixed top sash with a movable bottom one for a classic, budget-friendly look.",
  },
  {
    slug: "awning",
    name: "Awning Windows",
    option: "Awning Windows",
    detail: "Rain-Ready Airflow",
    image: "/types/awning.jpg",
    alt: "Awning window opened outward above a garden and pool",
    body: "Awning windows hinge at the top and open outward from the bottom, letting fresh air in even during rain.",
  },
  {
    slug: "sliding",
    name: "Sliding Windows",
    option: "Sliding Windows",
    detail: "Effortless Glide",
    image: "/types/sliding.jpg",
    alt: "Wood-framed sliding window opened to a patio",
    body: "Sliding windows glide horizontally along tracks, suiting wide openings, patios, and easy-reach spots.",
  },
  {
    slug: "picture",
    name: "Picture Windows",
    option: "Picture Windows",
    detail: "Unobstructed Panoramas",
    image: "/types/picture.jpg",
    alt: "A row of picture windows looking out to the water",
    body: "Picture windows are fixed, unobstructed glass that maximizes light, views, and energy efficiency.",
  },
  {
    slug: "bay",
    name: "Bay Windows",
    option: "Bay Windows",
    detail: "Dimensional Space",
    image: "/types/bay.jpg",
    alt: "Exterior bay window with a metal roof and stone base",
    body: "Bay windows project outward in three angled panels, adding interior space and a wide view.",
  },
  {
    slug: "bow",
    name: "Bow Windows",
    option: "Bow Windows",
    detail: "Elegant Curves",
    image: "/types/bow.jpg",
    alt: "Curved bow window with a built-in window seat",
    body: "Bow windows curve gently with four to six panes, bringing panoramic light to living areas.",
  },
  {
    slug: "custom",
    name: "Custom Windows",
    option: "Custom Windows",
    detail: "Architectural Specialty",
    image: "/types/custom.jpg",
    alt: "Custom arched window with divided lites in a brick wall",
    body: "Custom windows cover radius arches, geometric shapes, and direct-set frames built for your home.",
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
    body: "Vinyl windows are extruded PVC frames built for energy efficiency at an accessible price. They never need painting or staining, resist moisture and rot, and wipe clean with soap and water—making them one of the lowest-maintenance window materials for Seattle-area homes.",
  },
  {
    slug: "wood",
    name: "Wood",
    option: "Wood",
    detail: "Natural Warmth",
    image: "/materials/wood-clad.jpg",
    alt: "Wood and wood-clad windows",
    body: "Wood windows offer natural warmth and character on the interior, with the option of aluminum or fiberglass cladding on the exterior to shield the frame from rain and sun. Ideal for craftsman and historic Seattle homes where authentic wood interiors matter.",
  },
  {
    slug: "fiberglass",
    name: "Fiberglass",
    option: "Fiberglass",
    detail: "Strength and Stability",
    image: "/materials/fiberglass.jpg",
    alt: "Fiberglass replacement windows",
    body: "Fiberglass window frames are made from glass fibers and resin, giving them exceptional strength with very low expansion and contraction. They hold their shape through Puget Sound temperature swings and wet winters without warping, cracking, or peeling.",
  },
  {
    slug: "aluminum",
    name: "Aluminum",
    option: "Aluminum",
    detail: "Architectural Lines",
    image: "/materials/aluminum.jpg",
    alt: "Thermally broken architectural aluminum windows",
    body: "Aluminum windows deliver slim sightlines and a clean, modern look favored in contemporary architecture. A thermal break between the interior and exterior frame stops heat transfer, so the metal stays energy efficient in cool weather.",
  },
  {
    slug: "composite",
    name: "Composite",
    option: "Composite",
    detail: "Stable Hybrid Frame",
    image: "/images/materials/composite-window.jpg",
    alt: "Charcoal gray composite casement window installed in exterior stucco wall",
    body: "Composite window frames blend wood fibers with polymer to combine the strength and stability of wood with the low maintenance of vinyl. They resist swelling, rot, and insects in damp climates—no painting required.",
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

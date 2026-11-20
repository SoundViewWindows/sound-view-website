import { publicPaths } from "@/lib/public-paths";

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
    detail: "Cranks open outward to the left or right like a door",
    image: "/images/window-types/casement.jpg",
    alt: "Open casement window with a crank and operator arm",
    body: "Casement windows hinge on one side and crank open outward, sealing tightly against wind and rain.",
  },
  {
    slug: "double-hung",
    name: "Double-Hung Windows",
    option: "Double-Hung Windows",
    detail: "Both top and bottom panels slide up and down",
    image: "/images/window-types/double-hung.jpg",
    alt: "Double-hung window with both sashes in a white wall",
    body: "Double-hung windows have two sliding sashes that tilt inward, so both sides clean easily from inside.",
  },
  {
    slug: "single-hung",
    name: "Single-Hung Windows",
    option: "Single-Hung Windows",
    detail: "Bottom panel slides up and down (top stays fixed)",
    image: "/images/window-types/single-hung.jpg",
    alt: "Single-hung window with the lower sash raised",
    body: "Single-hung windows pair a fixed top sash with a movable bottom one for a classic, budget-friendly look.",
  },
  {
    slug: "awning",
    name: "Awning Windows",
    option: "Awning Windows",
    detail: "Cranks open outward from the bottom like a little roof",
    image: "/images/window-types/awning.jpg",
    alt: "Open awning window with crank hardware",
    body: "Awning windows hinge at the top and open outward from the bottom, letting fresh air in even during rain.",
  },
  {
    slug: "sliding",
    name: "Sliding Windows",
    option: "Sliding Windows",
    detail: "Slides side-to-side horizontally on a track",
    image: "/images/window-types/sliding.jpg",
    alt: "Sliding window with one sash open on a track",
    body: "Sliding windows glide horizontally along tracks, suiting wide openings, patios, and easy-reach spots.",
  },
  {
    slug: "picture",
    name: "Picture Windows",
    option: "Picture Windows",
    detail: "Fixed glass pane that does not open at all",
    image: "/images/window-types/picture.jpg",
    alt: "Fixed picture window looking out to trees",
    body: "Picture windows are fixed, unobstructed glass that maximizes light, views, and energy efficiency.",
  },
  {
    slug: "bay",
    name: "Bay Windows",
    option: "Bay Windows",
    detail: "Angled window unit that juts out from the wall",
    image: "/images/window-types/bay.jpg",
    alt: "Angled bay window with a dark sill",
    body: "Bay windows project outward in three angled panels, adding interior space and a wide view.",
  },
  {
    slug: "bow",
    name: "Bow Windows",
    option: "Bow Windows",
    detail: "Curved window unit that juts out from the wall",
    image: "/images/window-types/bow.jpg",
    alt: "Curved bow window with five glass panels",
    body: "Bow windows curve gently with four to six panes, bringing panoramic light to living areas.",
  },
  {
    slug: "custom",
    name: "Custom Windows",
    option: "Custom Windows",
    detail: "Special shape, often fixed glass, built to fit your opening",
    image: "/images/window-types/custom.jpg",
    alt: "Custom half-round window with divided lites",
    body: "Custom windows cover radius arches, geometric shapes, and direct-set frames built for your home.",
  },
];

export const windowMaterials: WindowChoice[] = [
  {
    slug: "vinyl",
    name: "Vinyl",
    option: "Vinyl",
    detail: "Smooth plastic frame that never needs paint",
    image: "/images/materials/vinyl.jpg",
    alt: "Close-up of a vinyl window corner, white return, and black lock",
    body: "Vinyl windows are extruded PVC frames built for energy efficiency at an accessible price. They never need painting or staining, resist moisture and rot, and wipe clean with soap and water—making them one of the lowest-maintenance window materials for Seattle-area homes.",
  },
  {
    slug: "wood",
    name: "Wood",
    option: "Wood",
    detail: "Real solid wood frame you can stain or paint",
    image: "/images/materials/wood.jpg",
    alt: "Close-up of a dark wood window frame, sill, and black lock",
    body: "Wood windows offer natural warmth and character on the interior, with the option of aluminum or fiberglass cladding on the exterior to shield the frame from rain and sun. Ideal for craftsman and historic Seattle homes where authentic wood interiors matter.",
  },
  {
    slug: "fiberglass",
    name: "Fiberglass",
    option: "Fiberglass",
    detail: "Super-strong woven glass frame that won't warp",
    image: "/images/materials/fiberglass.jpg",
    alt: "Close-up of a fiberglass window corner, white return, and black lock",
    body: "Fiberglass window frames are made from glass fibers and resin, giving them exceptional strength with very low expansion and contraction. They hold their shape through Puget Sound temperature swings and wet winters without warping, cracking, or peeling.",
  },
  {
    slug: "aluminum",
    name: "Aluminum",
    option: "Aluminum",
    detail: "Thin metal frame with narrow edges",
    image: "/images/materials/aluminum.jpg",
    alt: "Close-up of an aluminum window corner and silver lock",
    body: "Aluminum windows deliver slim sightlines and a clean, modern look favored in contemporary architecture. A thermal break between the interior and exterior frame stops heat transfer, so the metal stays energy efficient in cool weather.",
  },
  {
    slug: "composite",
    name: "Composite",
    option: "Composite",
    detail: "Blended wood-and-polymer frame that won't rot",
    image: "/images/materials/composite.jpg",
    alt: "Close-up of a composite window corner, sill, and black lock",
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
  if (step === "materials") return publicPaths.windows;
  return `/services/window-replacement/${step}${query ? `?${query}` : ""}`;
}

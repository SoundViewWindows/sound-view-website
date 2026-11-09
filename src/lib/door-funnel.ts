export type DoorChoice = {
  slug: string;
  name: string;
  option: string;
  detail: string;
  image: string;
  alt: string;
  body: string;
};

export const doorStyles: DoorChoice[] = [
  {
    slug: "entry-doors",
    name: "Entry Doors",
    option: "Entry Doors",
    detail: "Curb Appeal & Security",
    image: "/doors/entry.jpg",
    alt: "Arched wood entry doors on a cedar-shingle home",
    body: "Front entry systems engineered to insulate against wet Pacific Northwest winters while making a lasting impression.",
  },
  {
    slug: "patio-sliding-doors",
    name: "Patio & Sliding Doors",
    option: "Patio & Sliding Doors",
    detail: "Seamless Glide",
    image: "/doors/patio-sliding.jpg",
    alt: "Black-framed sliding glass door opening onto a pool patio",
    body: "Expansive multi-panel sliding and patio glass doors that maximize light and create an open connection to your outdoor space.",
  },
  {
    slug: "french-doors",
    name: "French Doors",
    option: "French Doors",
    detail: "Timeless Elegance",
    image: "/doors/french.jpg",
    alt: "Open white French doors leading to a garden seating area",
    body: "Dual-swing hinged doors offering a classic architectural aesthetic, versatile opening configurations, and tight weather seals.",
  },
  {
    slug: "swinging-doors",
    name: "Swinging Doors",
    option: "Swinging Doors",
    detail: "Contemporary Swing",
    image: "/doors/swinging.jpg",
    alt: "Dark swinging doors opened onto a wood deck",
    body: "Single or double hinged operating doors suited for side entrances, rear decks, balconies, and customized modern entries.",
  },
];

export const doorMaterials: DoorChoice[] = [
  {
    slug: "vinyl",
    name: "Vinyl",
    option: "Vinyl",
    detail: "Low Maintenance",
    image: "/materials/vinyl.jpg",
    alt: "Vinyl framed patio door",
    body: "A colorfast frame for patio and sliding doors. Vinyl stands up to wet Pacific Northwest weather and needs very little upkeep.",
  },
  {
    slug: "aluminum",
    name: "Aluminum",
    option: "Aluminum",
    detail: "Slim Sightlines",
    image: "/materials/aluminum.jpg",
    alt: "Thermally broken aluminum door frame",
    body: "Rigid frames with slim sightlines for wide patio openings. A thermal break keeps the metal from carrying cold inside.",
  },
  {
    slug: "fiberglass",
    name: "Fiberglass",
    option: "Fiberglass",
    detail: "Strength and Stability",
    image: "/materials/fiberglass.jpg",
    alt: "Fiberglass door with a stable painted finish",
    body: "Fiberglass holds its shape in marine air. It resists rot, swelling, and dents through wet winters.",
  },
  {
    slug: "wood",
    name: "Wood",
    option: "Wood",
    detail: "Natural Warmth & Character",
    image: "/doors/wood.jpg",
    alt: "Rich oak wood door panel with visible grain",
    body: "Authentic wood grain, rich stain options, and solid insulating natural cores with durable weather-resistant exterior finishes.",
  },
  {
    slug: "wood-clad",
    name: "Wood Clad",
    option: "Wood Clad",
    detail: "Protected Wood",
    image: "/materials/wood-clad.jpg",
    alt: "Wood door with a protective exterior cladding",
    body: "Wood warmth on the interior, with exterior cladding that takes the rain so the wood stays protected.",
  },
  {
    slug: "composite",
    name: "Composite",
    option: "Composite",
    detail: "Stable Hybrid",
    image: "/doors/steel.jpg",
    alt: "Solid composite door panel with a smooth face",
    body: "A blended door material that resists moisture and holds its finish with very little maintenance.",
  },
];

// Option names allowed for each door type. An unknown or missing type shows the full list.
export const doorMaterialsByType: Record<string, readonly string[]> = {
  "entry-doors": ["Fiberglass", "Wood"],
  "patio-sliding-doors": ["Vinyl", "Aluminum", "Fiberglass", "Wood", "Wood Clad", "Composite"],
  "french-doors": ["Fiberglass", "Wood Clad", "Wood"],
  "swinging-doors": ["Fiberglass", "Wood Clad", "Wood"],
};

export const DOOR_MATERIAL_STORAGE_KEY = "sv-door-material";

export function doorStyleFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  return doorStyles.find((item) => item.slug === slug) ?? null;
}

export function doorMaterialFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  return doorMaterials.find((item) => item.slug === slug) ?? null;
}

export function doorMaterialsForStyle(slug: string | null | undefined) {
  if (!slug || slug === "undecided") return doorMaterials;
  const allowed = doorMaterialsByType[slug];
  if (!allowed) return doorMaterials;
  return allowed.flatMap((name) => {
    const match = doorMaterials.find((item) => item.option === name);
    return match ? [match] : [];
  });
}

export function doorMaterialAllowed(styleSlug: string | null | undefined, materialSlug: string | null) {
  if (!materialSlug || materialSlug === "undecided") return true;
  return doorMaterialsForStyle(styleSlug).some((item) => item.slug === materialSlug);
}

export function doorStyleSlugFromOption(option: string) {
  return doorStyles.find((item) => item.option === option)?.slug ?? "undecided";
}

export function doorMaterialSlugFromOption(option: string) {
  return doorMaterials.find((item) => item.option === option)?.slug ?? "undecided";
}

export function doorChoiceLabel(choice: { name: string } | null) {
  return choice?.name ?? "Open to advice";
}

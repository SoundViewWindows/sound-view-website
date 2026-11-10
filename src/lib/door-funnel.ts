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
    image: "/images/materials/door-vinyl.jpg",
    alt: "Modern black textured vinyl entry door with tall glass lites and smart lock",
    body: "A colorfast frame for patio and sliding doors. Vinyl stands up to wet Pacific Northwest weather and needs very little upkeep.",
  },
  {
    slug: "aluminum",
    name: "Aluminum",
    option: "Aluminum",
    detail: "Slim Sightlines",
    image: "/images/materials/door-aluminum.jpg",
    alt: "Sleek architectural bronze aluminum patio door frame with modern hardware",
    body: "Rigid frames with slim sightlines for wide patio openings. A thermal break keeps the metal from carrying cold inside.",
  },
  {
    slug: "fiberglass",
    name: "Fiberglass",
    option: "Fiberglass",
    detail: "Strength and Stability",
    image: "/images/materials/door-fiberglass.jpg",
    alt: "Craftsman slate blue fiberglass door with high-durability embossed panels",
    body: "Fiberglass holds its shape in marine air. It resists rot, swelling, and dents through wet winters.",
  },
  {
    slug: "wood",
    name: "Wood",
    option: "Wood",
    detail: "Natural Warmth & Character",
    image: "/images/materials/door-wood.jpg",
    alt: "Classic arched wood entry door with rich natural grain finish and dark handle",
    body: "Authentic wood grain, rich stain options, and solid insulating natural cores with durable weather-resistant exterior finishes.",
  },
  {
    slug: "wood-clad",
    name: "Wood Clad",
    option: "Wood Clad",
    detail: "Protected Wood",
    image: "/images/materials/door-clad-wood.jpg",
    alt: "Contemporary horizontal plank clad wood door with protective exterior casing",
    body: "Wood warmth on the interior, with exterior cladding that takes the rain so the wood stays protected.",
  },
  {
    slug: "composite",
    name: "Composite",
    option: "Composite",
    detail: "Stable Hybrid",
    image: "/images/materials/composite-doors.jpg",
    alt: "Modern black composite entry door with divided glass lites and matching sidelights",
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

export const doorManufacturers: DoorChoice[] = [
  {
    slug: "therma-tru",
    name: "Therma-Tru",
    option: "Therma-Tru",
    detail: "Fiberglass Entry",
    image: "/images/manufacturers/therma-tru.png",
    alt: "Therma-Tru logo",
    body: "Industry-leading fiberglass entry doors built for rain and weather resistance.",
  },
  {
    slug: "simpson",
    name: "Simpson Door Company",
    option: "Simpson Door Company",
    detail: "Handcrafted Wood",
    image: "/images/manufacturers/simpson.png",
    alt: "Simpson Door Company logo",
    body: "Custom handcrafted Pacific Northwest wood exterior and interior doors.",
  },
  {
    slug: "codel",
    name: "Codel Doors",
    option: "Codel Doors",
    detail: "Pre-Hung Entry",
    image: "/images/manufacturers/codel.webp",
    alt: "Codel Doors logo",
    body: "Pre-hung fiberglass and steel entry doors built for durability.",
  },
  {
    slug: "rogue-valley",
    name: "Rogue Valley Door",
    option: "Rogue Valley Door",
    detail: "Natural Wood",
    image: "/images/manufacturers/rogue-valley.jpg",
    alt: "Rogue Valley Door logo",
    body: "Custom handcrafted natural wood entry and interior door systems.",
  },
  {
    slug: "larson",
    name: "Larson",
    option: "Larson",
    detail: "Storm and Security",
    image: "/images/manufacturers/larson.png",
    alt: "Larson logo",
    body: "Premium storm doors, retractable screens, and security doors.",
  },
  {
    slug: "andersen",
    name: "Andersen Windows & Doors",
    option: "Andersen Windows & Doors",
    detail: "Patio Doors",
    image: "/images/manufacturers/andersen.png",
    alt: "Andersen Windows & Doors logo",
    body: "French, hinged, and multi-panel sliding patio door systems.",
  },
  {
    slug: "milgard",
    name: "Milgard",
    option: "Milgard",
    detail: "Sliding Patio",
    image: "/images/manufacturers/milgard.png",
    alt: "Milgard logo",
    body: "Smooth-sliding patio doors in high-durability vinyl and fiberglass.",
  },
  {
    slug: "marvin",
    name: "Marvin",
    option: "Marvin",
    detail: "Scenic and Bi-Fold",
    image: "/images/manufacturers/marvin.png",
    alt: "Marvin logo",
    body: "Scenic door systems, bi-fold doors, and custom wood patio doors.",
  },
  {
    slug: "jeld-wen",
    name: "Jeld-Wen",
    option: "Jeld-Wen",
    detail: "Patio and Entry",
    image: "/images/manufacturers/jeld-wen.jpg",
    alt: "Jeld-Wen logo",
    body: "Versatile exterior patio and entry door solutions.",
  },
  {
    slug: "recommend",
    name: "Specialist Will Recommend",
    option: "Specialist Will Recommend",
    detail: "No Preference",
    image: "",
    alt: "No preference, a specialist will recommend a door brand",
    body: "Let our team evaluate your entryway and recommend the best fit.",
  },
];

export function doorManufacturerFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  const key =
    slug === "consultation" || slug === "expert-recommendation" ? "recommend" : slug;
  return doorManufacturers.find((item) => item.slug === key) ?? null;
}

export function doorManufacturerSlugFromOption(option: string) {
  return doorManufacturers.find((item) => item.option === option)?.slug ?? "undecided";
}

export function doorStepHref(
  step: "types" | "materials" | "manufacturers" | "quote",
  params: { type?: string; material?: string; manufacturer?: string } = {},
) {
  const search = new URLSearchParams();
  if (step !== "types" && params.type) search.set("type", params.type);
  if (step !== "types" && params.material) search.set("material", params.material);
  if (step !== "types" && params.manufacturer) search.set("manufacturer", params.manufacturer);
  const query = search.toString();
  return `/services/door-replacement/${step}${query ? `?${query}` : ""}`;
}

import { publicPaths } from "@/lib/public-paths";

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
    detail: "Swings open inward or outward on side hinges",
    image: "/images/door-types/entry.jpg",
    alt: "Open charcoal entry door beside a narrow glass sidelight",
    body: "Front entry systems engineered to insulate against wet Pacific Northwest winters while making a lasting impression.",
  },
  {
    slug: "patio-sliding-doors",
    name: "Patio & Sliding Doors",
    option: "Patio & Sliding Doors",
    detail: "Glides side-to-side on a bottom track",
    image: "/images/door-types/patio-sliding.jpg",
    alt: "Charcoal sliding patio door with one panel open",
    body: "Expansive multi-panel sliding and patio glass doors that maximize light and create an open connection to your outdoor space.",
  },
  {
    slug: "french-doors",
    name: "French Doors",
    option: "French Doors",
    detail: "Double doors that swing open from the center",
    image: "/images/door-types/french.jpg",
    alt: "Open charcoal French doors with divided glass lites",
    body: "Dual-swing hinged doors offering a classic architectural aesthetic, versatile opening configurations, and tight weather seals.",
  },
  {
    slug: "swinging-doors",
    name: "Swinging Doors",
    option: "Swinging Doors",
    detail: "Swings open inward or outward on side hinges",
    image: "/images/door-types/swinging.jpg",
    alt: "Open charcoal glass terrace door onto a wood deck",
    body: "Single or double hinged operating doors suited for side entrances, rear decks, balconies, and customized modern entries.",
  },
];

export const doorMaterials: DoorChoice[] = [
  {
    slug: "vinyl",
    name: "Vinyl",
    option: "Vinyl",
    detail: "Smooth plastic door that never needs paint",
    image: "/images/door-materials/vinyl.jpg",
    alt: "Close-up of a black vinyl door stile and vertical pull handle",
    body: "Vinyl patio and sliding doors are energy efficient, never need painting, and shrug off Seattle rain with almost no upkeep.",
  },
  {
    slug: "aluminum",
    name: "Aluminum",
    option: "Aluminum",
    detail: "Thin metal frame with narrow edges",
    image: "/images/door-materials/aluminum.jpg",
    alt: "Close-up of a slim metal door stile and metallic lever",
    body: "Aluminum doors pair slim sightlines with rigid strength for wide patio openings, with a thermal break for energy efficiency.",
  },
  {
    slug: "fiberglass",
    name: "Fiberglass",
    option: "Fiberglass",
    detail: "Wood-look composite door that won't warp",
    image: "/images/door-materials/fiberglass.jpg",
    alt: "Close-up of a black fiberglass door with wood-grain texture",
    body: "Fiberglass doors resist rot, swelling, and dents through wet winters, holding their shape and finish for years.",
  },
  {
    slug: "wood",
    name: "Wood",
    option: "Wood",
    detail: "Real solid wood door you can stain or paint",
    image: "/images/door-materials/wood.jpg",
    alt: "Close-up of a dark oak paneled door with a lever and deadbolt",
    body: "Wood doors offer authentic grain, rich stain options, and natural insulation with weather-resistant exterior finishes.",
  },
  {
    slug: "wood-clad",
    name: "Wood Clad",
    option: "Wood Clad",
    detail: "Wood inside with a weather-shielded outer shell",
    image: "/images/door-materials/wood-clad.jpg",
    alt: "Close-up of a wood clad door with a wood interior and black exterior edge",
    body: "Wood clad doors bring real wood warmth inside while the exterior cladding stands up to Pacific Northwest rain.",
  },
  {
    slug: "composite",
    name: "Composite",
    option: "Composite",
    detail: "Blended wood-and-polymer door that won't rot",
    image: "/images/door-materials/composite.jpg",
    alt: "Close-up of a black composite door with horizontal grooves",
    body: "Composite doors blend materials that resist moisture, rot, and insects while holding their finish with little upkeep.",
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
    slug: "milgard",
    name: "Milgard",
    option: "Milgard",
    detail: "Sliding Patio",
    image: "/images/manufacturers/milgard.png",
    alt: "Milgard logo",
    body: "Smooth-sliding patio doors in high-durability vinyl and fiberglass.",
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
    slug: "ply-gem",
    name: "Ply Gem",
    option: "Ply Gem",
    detail: "Vinyl and Composite",
    image: "/images/manufacturers/ply-gem.jpg",
    alt: "Ply Gem logo",
    body: "Durable, low-maintenance vinyl and composite sliding and hinged patio doors engineered for Pacific Northwest weather and energy efficiency.",
  },
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
    slug: "stile",
    name: "STILE Windows & Doors",
    option: "STILE Windows & Doors",
    detail: "Windows and Doors",
    image: "/images/manufacturers/stile-logo.png",
    alt: "STILE Windows & Doors logo",
    body: "Contemporary door systems for entries, patios, and custom openings.",
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
  if (step === "types") return publicPaths.doors;
  return `/services/door-replacement/${step}${query ? `?${query}` : ""}`;
}

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
    slug: "wood",
    name: "Wood",
    option: "Wood",
    detail: "Natural Warmth & Character",
    image: "/doors/wood.jpg",
    alt: "Rich oak wood door panel with visible grain",
    body: "Authentic wood grain, rich stain options, and solid insulating natural cores with durable weather-resistant exterior finishes.",
  },
  {
    slug: "steel",
    name: "Steel",
    option: "Steel",
    detail: "Heavy-Duty Strength & Protection",
    image: "/doors/steel.jpg",
    alt: "Brushed steel recessed door panel",
    body: "Maximum structural security, fire resistance, and rot-proof durability with thermal break technology to stop cold transfer.",
  },
  {
    slug: "glass",
    name: "Glass",
    option: "Glass",
    detail: "Maximum Natural Light",
    image: "/doors/glass.jpg",
    alt: "Full-lite sliding glass door with a view to a landscaped patio",
    body: "Full-lite tempered architectural glass panels featuring high-efficiency Low-E coatings for open Puget Sound views.",
  },
];

export function doorStyleFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  return doorStyles.find((item) => item.slug === slug) ?? null;
}

export function doorMaterialFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  return doorMaterials.find((item) => item.slug === slug) ?? null;
}

export function doorStyleSlugFromOption(option: string) {
  return doorStyles.find((item) => item.option === option)?.slug ?? "undecided";
}

export function doorChoiceLabel(choice: { name: string } | null) {
  return choice?.name ?? "Open to advice";
}

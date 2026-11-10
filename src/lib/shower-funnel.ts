export type ShowerChoice = {
  slug: string;
  name: string;
  option: string;
  detail: string;
  image: string;
  alt: string;
  body: string;
};

export const showerStyles: ShowerChoice[] = [
  {
    slug: "framed",
    name: "Framed Shower Door",
    option: "Framed Shower Door",
    detail: "Classic & Watertight",
    image: "/showers/framed.png",
    alt: "Framed sliding shower enclosure in a light bathroom",
    body: "Durable aluminum profile enclosing all glass edges, providing maximum water containment and dependable daily performance.",
  },
  {
    slug: "semi-frameless",
    name: "Semi-Frameless Shower Door",
    option: "Semi-Frameless Shower Door",
    detail: "Clean Profile",
    image: "/showers/semi-frameless.jpg",
    alt: "Black semi-frameless sliding shower door with a tile niche",
    body: "Framing along the perimeter edges while keeping the door panel frameless for an open feel at a practical investment level.",
  },
  {
    slug: "frameless",
    name: "Frameless Shower Door",
    option: "Frameless Shower Door",
    detail: "Seamless Luxury",
    image: "/showers/frameless.png",
    alt: "Frameless glass shower with a herringbone tile wall",
    body: "Heavy 3/8-inch or 1/2-inch tempered architectural glass with minimal hardware clips to highlight custom tilework and maximize openness.",
  },
  {
    slug: "barn-door",
    name: "Barn Door Style Shower Door",
    option: "Barn Door Style Shower Door",
    detail: "Modern Slider",
    image: "/showers/barn-door.jpg",
    alt: "Glass barn-door shower with an exposed roller track",
    body: "Exposed top-roller rolling hardware that glides effortlessly along a precision header bar, ideal for modern spaces and compact footprints.",
  },
];

export function isConsultationSlug(slug: string | null) {
  return slug === "consultation" || slug === "expert-recommendation";
}

export function showerStyleFromSlug(slug: string | null) {
  if (!slug || slug === "undecided" || isConsultationSlug(slug)) return null;
  return showerStyles.find((item) => item.slug === slug) ?? null;
}

export function showerStyleSlugFromOption(option: string) {
  return showerStyles.find((item) => item.option === option)?.slug ?? "undecided";
}

export function showerChoiceLabel(choice: { name: string } | null) {
  return choice?.name ?? "Open to advice";
}

export function showerSelectionBadge(
  styleOption: string,
  params: { type: string | null; style: string | null },
) {
  const match = showerStyles.find((item) => item.option === styleOption);
  if (match) return `Style: ${match.name}`;
  if (isConsultationSlug(params.style) || isConsultationSlug(params.type)) {
    return "Style: Specialist Recommendation";
  }
  return "Style: Open to advice";
}

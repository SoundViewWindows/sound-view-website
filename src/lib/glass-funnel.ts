export type GlassChoice = {
  slug: string;
  name: string;
  option: string;
  detail: string;
  image: string;
  alt: string;
  body: string;
};

export const glassTypes: GlassChoice[] = [
  {
    slug: "igu",
    name: "Insulated Glass Unit (IGU) Replacement",
    option: "Insulated Glass Unit (IGU) Replacement",
    detail: "Sealed panes that replace foggy glass between the sheets",
    image: "/images/glass-types/igu.jpg",
    alt: "Cutaway of a sealed insulated glass unit on a windowsill",
    body: "Clear up foggy condensation between panes with a factory-sealed double or triple insulated replacement unit.",
  },
  {
    slug: "tempered",
    name: "Tempered Safety Glass Replacement",
    option: "Tempered Safety Glass Replacement",
    detail: "Safety glass that breaks into small dull pieces",
    image: "/images/glass-types/tempered.jpg",
    alt: "A row of tempered glass panes leaning on a windowsill",
    body: "Heat-treated safety glass engineered to crumble into small dull pebbles if broken, ideal for patio doors and bathroom windows.",
  },
  {
    slug: "laminated",
    name: "Laminated Glass Replacement",
    option: "Laminated Glass Replacement",
    detail: "Two sheets of glass held together by a clear layer",
    image: "/images/glass-types/laminated.jpg",
    alt: "Close view of a laminated glass edge on a windowsill",
    body: "Dual glass sheets bonded with a durable inner membrane for advanced noise reduction and forced-entry deterrence.",
  },
  {
    slug: "low-e",
    name: "Low-E Glass Replacement",
    option: "Low-E Glass Replacement",
    detail: "Coated glass that keeps heat inside in winter",
    image: "/images/glass-types/low-e.jpg",
    alt: "Low-E window glass reflecting trees and sky",
    body: "Microscopic metallic coatings that reflect thermal heat back inside during winter and block harsh UV rays in summer.",
  },
  {
    slug: "single-pane",
    name: "Single-Pane Glass Replacement",
    option: "Single-Pane Glass Replacement",
    detail: "One sheet of glass for an older window",
    image: "/images/glass-types/single-pane.jpg",
    alt: "Cutaway of a single pane of glass in a black frame",
    body: "Direct replacement glass for older architectural wood windows, retaining original character without frame tear-out.",
  },
  {
    slug: "double-pane",
    name: "Double-Pane Glass Replacement",
    option: "Double-Pane Glass Replacement",
    detail: "Two sheets of glass with air between them",
    image: "/images/glass-types/double-pane.jpg",
    alt: "Cutaway of a double-pane glass unit in a black frame",
    body: "Dual panes separated by argon gas spacers to immediately stop drafts and lower seasonal heating bills.",
  },
  {
    slug: "triple-pane",
    name: "Triple-Pane Glass Replacement",
    option: "Triple-Pane Glass Replacement",
    detail: "Three sheets of glass for extra insulation",
    image: "/images/glass-types/triple-pane.jpg",
    alt: "Cutaway of a triple-pane glass unit in a black frame",
    body: "Three layers of precision glass engineered for cold exposures and heavy arterial street noise reduction.",
  },
  {
    slug: "custom",
    name: "Custom Glass Replacement",
    option: "Custom Glass Replacement",
    detail: "Glass cut to a special shape or pattern",
    image: "/images/glass-types/custom.jpg",
    alt: "Arched window with rain-pattern custom glass",
    body: "Obscure, frosted, rain-pattern, or custom geometric shapes cut to exact millimeter specifications.",
  },
];

export function isConsultationSlug(slug: string | null) {
  return slug === "consultation" || slug === "expert-recommendation";
}

export function glassTypeFromSlug(slug: string | null) {
  if (!slug || slug === "undecided" || isConsultationSlug(slug)) return null;
  return glassTypes.find((item) => item.slug === slug) ?? null;
}

export function glassChoiceLabel(choice: { name: string } | null) {
  return choice?.name ?? "Open to advice";
}

export function glassSelectionBadge(
  glassOption: string,
  params: { type: string | null; style: string | null },
) {
  const match = glassTypes.find((item) => item.option === glassOption);
  if (match) return `Type: ${match.name}`;
  if (isConsultationSlug(params.type) || isConsultationSlug(params.style)) {
    return "Type: In-Home Assessment";
  }
  return "Type: Open to advice";
}

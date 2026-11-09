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
    detail: "Failed Seal Solution",
    image: "/glass/igu.jpg",
    alt: "Stacked insulated glass units with metal spacers",
    body: "Clear up foggy condensation between panes with a factory-sealed double or triple insulated replacement unit.",
  },
  {
    slug: "tempered",
    name: "Tempered Safety Glass Replacement",
    option: "Tempered Safety Glass Replacement",
    detail: "Impact Resistant",
    image: "/glass/tempered.jpg",
    alt: "A stack of clear tempered glass sheets",
    body: "Heat-treated safety glass engineered to crumble into small dull pebbles if broken, ideal for patio doors and bathroom windows.",
  },
  {
    slug: "laminated",
    name: "Laminated Glass Replacement",
    option: "Laminated Glass Replacement",
    detail: "Security & Sound Abatement",
    image: "/glass/laminated.jpg",
    alt: "Close view of a laminated glass edge",
    body: "Dual glass sheets bonded with a durable inner membrane for advanced noise reduction and forced-entry deterrence.",
  },
  {
    slug: "low-e",
    name: "Low-E Glass Replacement",
    option: "Low-E Glass Replacement",
    detail: "Solar & Thermal Efficiency",
    image: "/glass/low-e.jpg",
    alt: "Diagram of Low-E glass reflecting heat and ultraviolet light",
    body: "Microscopic metallic coatings that reflect thermal heat back inside during winter and block harsh UV rays in summer.",
  },
  {
    slug: "single-pane",
    name: "Single-Pane Glass Replacement",
    option: "Single-Pane Glass Replacement",
    detail: "Historic Sash Restoration",
    image: "/glass/single-pane.jpg",
    alt: "Diagram of a single pane of glass set in a window frame",
    body: "Direct replacement glass for older architectural wood windows, retaining original character without frame tear-out.",
  },
  {
    slug: "double-pane",
    name: "Double-Pane Glass Replacement",
    option: "Double-Pane Glass Replacement",
    detail: "Standard Efficiency Upgrade",
    image: "/glass/double-pane.jpg",
    alt: "Cutaway of a double-pane window with two sheets of glass",
    body: "Dual panes separated by argon gas spacers to immediately stop drafts and lower seasonal heating bills.",
  },
  {
    slug: "triple-pane",
    name: "Triple-Pane Glass Replacement",
    option: "Triple-Pane Glass Replacement",
    detail: "Maximum Insulation",
    image: "/glass/triple-pane.jpg",
    alt: "Window frame cutaway with a triple-pane glass unit",
    body: "Three layers of precision glass engineered for cold exposures and heavy arterial street noise reduction.",
  },
  {
    slug: "custom",
    name: "Custom Glass Replacement",
    option: "Custom Glass Replacement",
    detail: "Specialty Cuts & Finishes",
    image: "/glass/custom.png",
    alt: "Decorative leaded glass panel with a floral motif",
    body: "Obscure, frosted, rain-pattern, or custom geometric shapes cut to exact millimeter specifications.",
  },
];

export function glassTypeFromSlug(slug: string | null) {
  if (!slug || slug === "undecided") return null;
  return glassTypes.find((item) => item.slug === slug) ?? null;
}

export function glassChoiceLabel(choice: { name: string } | null) {
  return choice?.name ?? "Open to advice";
}

export type Service = {
  id: string;
  title: string;
  summary: string;
  keywords: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "window-replacement",
    title: "Window Replacement",
    summary:
      "Replace drafty, outdated windows with energy efficient options engineered for Pacific Northwest weather.",
    keywords: "Casement • Double-Hung • Sliding • Bay & Bow",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Energy efficient replacement windows installed in a Seattle home",
  },
  {
    id: "door-replacement",
    title: "Door Replacement",
    summary:
      "Entry doors, sliding patio doors, and French doors installed with precision.",
    keywords: "Entry Doors • Multi-Slide Patio • French Doors",
    image:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Custom exterior entry door and patio door installation in King County",
  },
  {
    id: "shower-door-replacement",
    title: "Shower Door Replacement",
    summary:
      "Custom frameless and framed shower enclosures tailored to your space.",
    keywords: "Frameless Glass • Heavy Glass • Custom Enclosures",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Frameless glass shower door replacement in Seattle bathroom",
  },
  {
    id: "glass-replacement",
    title: "Glass Replacement",
    summary:
      "Clear, professional glass replacement for broken, cracked, or failed seals without replacing whole frames.",
    keywords: "Failed Seal IGU • Foggy Panes • Tempered Safety",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Insulated glass unit replacement for broken seals and foggy windows",
  },
  {
    id: "glass-railing-installation",
    title: "Glass Railing Installation",
    summary:
      "Modern interior and exterior glass railings designed to maximize open views.",
    keywords: "Deck Railings • Interior Stairs • Frameless Systems",
    image: "/services/glass-railing.jpg",
    imageAlt: "Architectural interior and deck glass railing installation",
  },
  {
    id: "window-blinds-shades",
    title: "Window Blinds & Shades",
    summary:
      "Tailored light control, blackout options, and automated shades.",
    keywords: "Motorized Shades • Honeycomb Cellular • Solar Blinds",
    image: "/services/blinds-shades.jpg",
    imageAlt: "Custom roller shades and motorized blinds for residential windows",
  },
];

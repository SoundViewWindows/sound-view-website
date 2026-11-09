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
    summary: "Energy efficient replacements built for Pacific Northwest weather.",
    keywords: "Casement • Double-Hung • Sliding • Bay & Bow",
    image: "/images/services/window-replacement.png",
    imageAlt: "Professional window replacement and installation technician",
  },
  {
    id: "door-replacement",
    title: "Door Replacement",
    summary: "Entry, patio, and French doors installed with a precise fit.",
    keywords: "Entry Doors • Multi-Slide Patio • French Doors",
    image: "/images/services/door-replacement.jpg",
    imageAlt: "Sound View technician installing an exterior entry door",
  },
  {
    id: "shower-door-replacement",
    title: "Shower Door Replacement",
    summary: "Frameless and framed enclosures fitted to your bathroom.",
    keywords: "Frameless Glass • Heavy Glass • Custom Enclosures",
    image: "/images/services/shower-door-replacement.jpg",
    imageAlt:
      "Professional technicians installing custom frameless glass shower door enclosure",
  },
  {
    id: "glass-replacement",
    title: "Glass Replacement",
    summary: "New glass for broken, cracked, or foggy panes, without a new frame.",
    keywords: "Failed Seal IGU • Foggy Panes • Tempered Safety",
    image: "/services/glass-replacement.jpg",
    imageAlt: "Professional technicians replacing insulated glass unit and failed window seal",
  },
  {
    id: "glass-railing-installation",
    title: "Glass Railing Installation",
    summary: "Interior and exterior railings that keep the view open.",
    keywords: "Deck Railings • Interior Stairs • Frameless Systems",
    image: "/services/glass-railing.jpg",
    imageAlt: "Architectural interior and deck glass railing installation",
  },
  {
    id: "window-blinds-shades",
    title: "Window Blinds & Shades",
    summary: "Custom shades for light control, privacy, and blackout.",
    keywords: "Motorized Shades • Honeycomb Cellular • Solar Blinds",
    image: "/services/blinds-shades.jpg",
    imageAlt: "Custom roller shades and motorized blinds for residential windows",
  },
];

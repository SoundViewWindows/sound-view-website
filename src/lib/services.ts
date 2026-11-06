export type Service = {
  id: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "window-replacement",
    title: "Window Replacement",
    summary:
      "Replace drafty, outdated windows with energy efficient options engineered for Pacific Northwest weather.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bright living room with large windows",
  },
  {
    id: "door-replacement",
    title: "Door Replacement",
    summary:
      "Entry doors, sliding patio doors, and French doors installed with precision.",
    image:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Home exterior with a front door",
  },
  {
    id: "shower-door-replacement",
    title: "Shower Door Replacement",
    summary:
      "Custom frameless and framed shower enclosures tailored to your space.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Glass shower enclosure in a bathroom",
  },
  {
    id: "glass-replacement",
    title: "Glass Replacement",
    summary:
      "Clear, professional glass replacement for broken, cracked, or failed seals without replacing whole frames.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Glass wall letting daylight into a room",
  },
  {
    id: "glass-railing-installation",
    title: "Glass Railing Installation",
    summary:
      "Modern interior and exterior glass railings designed to maximize open views.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern home with exterior glass railings",
  },
  {
    id: "window-blinds-shades",
    title: "Window Blinds & Shades",
    summary:
      "Tailored light control, blackout options, and automated shades.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Windows fitted with tailored shades",
  },
];

export const consultationPhone = {
  href: "tel:+12065550199",
  display: "(206) 555-0199",
};

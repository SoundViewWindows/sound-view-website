export type PortfolioImage = {
  src: string;
  alt: string;
  title: string;
  area: string;
  highlights: string;
};

export type PortfolioVideo = {
  src: string;
  title: string;
  notes: string;
  kind: "youtube" | "file";
  poster?: string;
  iframeTitle?: string;
  portrait?: boolean;
};

export type PortfolioCategory = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  funnel: string;
  images: PortfolioImage[];
  videos: PortfolioVideo[];
};

const showroomVideo: PortfolioVideo = {
  kind: "file",
  src: "/videos/queen-anne-showroom.mp4",
  poster: "/images/queen-anne-showroom-poster.jpg",
  title: "West Queen Anne Showroom Walkthrough",
  notes:
    "Local showroom video of full-size displays at 921 Elliott Ave W. Use it to compare operation, sightlines, and hardware before a consultation.",
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "windows",
    name: "Windows",
    eyebrow: "WINDOWS PORTFOLIO",
    summary:
      "Browse Greater Seattle window replacements, from masonry retrofits and sliding upgrades to weather-tight field installations.",
    funnel: "Replacement windows, flashing, and before-and-after openings.",
    images: [
      {
        src: "/portfolio/brick-window-before-after.jpg",
        alt: "Before and after of a brick exterior single-hung window replacement",
        title: "Brick Exterior Single-Hung Replacement",
        area: "Greater Seattle",
        highlights: "Masonry opening, custom sizing, exterior trim, and perimeter seals.",
      },
      {
        src: "/portfolio/siding-slider-before-after.jpg",
        alt: "Before and after of a horizontal sliding window upgrade on lap siding",
        title: "Horizontal Sliding Window Upgrade",
        area: "Greater Seattle",
        highlights: "Lap siding preserved, smoother glide, and a clearer garden view.",
      },
      {
        src: "/images/services/window-replacement.png",
        alt: "Window replacement installation on a home exterior",
        title: "Replacement Window Installation",
        area: "Greater Seattle",
        highlights: "Full-frame replacement prepared for Pacific Northwest weather.",
      },
      {
        src: "/wp-media/uploads/2026/02/professional-installation-team-replacing-windows-in-a-seattle-home-showcasing-local-expertise-27dd626f-b508-4872-84ac-f247522bfbff.jpg",
        alt: "Installation team replacing windows on a Seattle home",
        title: "Seattle Home Window Replacement",
        area: "Seattle",
        highlights: "Crew on site for removal, setting, and finish alignment.",
      },
      {
        src: "/wp-media/uploads/2026/02/modern-seattle-home-with-newly-installed-energy-efficient-replacement-windows-113eef9e-cd14-4e70-850d-3d7c7348b092.jpg",
        alt: "Modern Seattle home with newly installed replacement windows",
        title: "Energy-Efficient Replacement Windows",
        area: "Seattle",
        highlights: "New units set into a modern exterior with cleaner sightlines.",
      },
      {
        src: "/wp-media/uploads/2026/02/professional-window-installation-process-at-a-seattle-home-6af54523-5430-4fa1-b506-7fa00f198ea6.jpg",
        alt: "Window installation in progress at a Seattle home",
        title: "Installation in Progress",
        area: "Seattle",
        highlights: "Opening prep and unit setting during a local replacement.",
      },
    ],
    videos: [
      {
        kind: "youtube",
        src: "https://www.youtube.com/embed/wcTlT2Mdw_E",
        title: "Greater Seattle Window Installation",
        iframeTitle: "Greater Seattle Window Installation Video",
        notes:
          "See our certified crew in action installing energy-efficient replacement windows with precision flashing and clean interior finish work.",
      },
      {
        kind: "youtube",
        src: "https://www.youtube.com/embed/_330VSt1DKs",
        title: "Complete Window Tear-Out & Install",
        iframeTitle: "Complete Window Tear-Out and Weatherproof Install",
        notes:
          "Precision removal of the old unit, sill prep, and airtight sealing for wet maritime winters.",
      },
      {
        kind: "youtube",
        src: "https://www.youtube.com/embed/hXHxYPtYIYA",
        title: "Lead Prep and Window Install",
        iframeTitle: "lead prep and window install",
        notes:
          "Lead prep and window installation by our Greater Seattle crew, from the opening work through the set unit.",
      },
    ],
  },
  {
    slug: "doors",
    name: "Doors",
    eyebrow: "DOORS PORTFOLIO",
    summary:
      "See Greater Seattle entry and patio door projects, from fiberglass and wood styles to on-site installation.",
    funnel: "Entry doors, patio doors, and exterior door installs.",
    images: [
      {
        src: "/images/services/door-replacement.jpg",
        alt: "Technician installing an exterior entry door",
        title: "Exterior Entry Door Installation",
        area: "Greater Seattle",
        highlights: "Entry door set, aligned, and finished for a weather-tight close.",
      },
      {
        src: "/wp-media/uploads/2026/02/selection-of-durable-fiberglass-and-steel-doors-for-seattles-wet-climate-emphasizing-weather-resistance-94359878-1474-4707-9ddd-1bb57aa88254.jpg",
        alt: "Fiberglass and steel exterior doors suited to a wet climate",
        title: "Fiberglass and Steel Door Options",
        area: "Greater Seattle",
        highlights: "Weather-resistant slabs chosen for wet Pacific Northwest exposure.",
      },
      {
        src: "/wp-media/uploads/2026/02/professional-team-installing-various-door-styles-in-a-residential-setting-8a757f5c-94a3-4646-97d8-17e1f8a1799e.jpg",
        alt: "Team installing residential door styles",
        title: "Residential Door Installation",
        area: "Greater Seattle",
        highlights: "Multiple door styles set in a residential opening.",
      },
      {
        src: "/images/materials/door-fiberglass.jpg",
        alt: "Fiberglass exterior door",
        title: "Fiberglass Entry Door",
        area: "Greater Seattle",
        highlights: "Stable fiberglass construction for rain and temperature swings.",
      },
      {
        src: "/images/materials/door-wood.jpg",
        alt: "Wood exterior door",
        title: "Wood Exterior Door",
        area: "Greater Seattle",
        highlights: "Wood grain and panel detail for a traditional entry.",
      },
      {
        src: "/images/door-styles-bg.jpg",
        alt: "Exterior door style display",
        title: "Door Style Display",
        area: "Showroom",
        highlights: "Compare panel, glass, and hardware layouts before you order.",
      },
    ],
    videos: [
      {
        kind: "youtube",
        src: "https://www.youtube.com/embed/bGsNSKhzA0k",
        title: "It is all in the prep work",
        iframeTitle: "It is all in the prep work",
        portrait: true,
        poster: "https://i.ytimg.com/vi/bGsNSKhzA0k/hqdefault.jpg",
        notes:
          "Door opening prep and installation by our Greater Seattle crew.",
      },
    ],
  },
  {
    slug: "shower-doors",
    name: "Shower Doors",
    eyebrow: "SHOWER DOORS PORTFOLIO",
    summary:
      "Review frameless and custom shower enclosures installed and displayed for Greater Seattle bathrooms.",
    funnel: "Frameless enclosures, hardware, and bathroom glass.",
    images: [
      {
        src: "/wp-media/uploads/2026/05/sound-view-frameless-shower-doors-seattle-03.webp",
        alt: "Frameless glass shower enclosure",
        title: "Frameless Shower Enclosure",
        area: "Seattle",
        highlights: "Clear heavy glass with minimal metal at the opening.",
      },
      {
        src: "/wp-media/uploads/2026/05/sound-view-frameless-shower-doors-seattle-04.webp",
        alt: "Frameless shower door and panel",
        title: "Door and Panel Layout",
        area: "Seattle",
        highlights: "Door and fixed panel fitted to the bathroom opening.",
      },
      {
        src: "/wp-media/uploads/2026/05/sound-view-frameless-shower-doors-seattle-11.webp",
        alt: "Custom frameless shower glass",
        title: "Custom Shower Glass",
        area: "Seattle",
        highlights: "Glass sized to the curb, walls, and ceiling line.",
      },
      {
        src: "/wp-media/uploads/2026/05/sound-view-frameless-shower-doors-seattle-24.webp",
        alt: "Frameless shower hardware detail",
        title: "Hardware and Glass Detail",
        area: "Seattle",
        highlights: "Hinges, pulls, and glass edges finished for daily use.",
      },
      {
        src: "/wp-media/uploads/2026/05/sound-view-frameless-shower-doors-seattle-25.webp",
        alt: "Frameless shower in a finished bathroom",
        title: "Finished Bathroom Enclosure",
        area: "Seattle",
        highlights: "Completed enclosure with an open, bright bathroom view.",
      },
      {
        src: "/showers/barn-door.jpg",
        alt: "Sliding barn-style shower door",
        title: "Sliding Shower Door",
        area: "Greater Seattle",
        highlights: "Sliding panel option when a hinged door will not swing clear.",
      },
    ],
    videos: [
      {
        ...showroomVideo,
        title: "Showroom Shower Glass Walkthrough",
        notes:
          "West Queen Anne showroom video. Shower glass and hardware displays are part of the in-person visit.",
      },
    ],
  },
  {
    slug: "glass",
    name: "Glass & Railings",
    eyebrow: "GLASS & RAILINGS PORTFOLIO",
    summary:
      "Look through Greater Seattle glass railing, stair glass, and replacement glass projects.",
    funnel: "Railings, stair glass, and glass replacement.",
    images: [
      {
        src: "/images/interior-staircase-railings.jpg",
        alt: "Interior staircase glass railing",
        title: "Interior Stair Glass Railing",
        area: "Greater Seattle",
        highlights: "Open stair guard with glass panels and a finished handrail.",
      },
      {
        src: "/images/post-top-rail-systems.jpg",
        alt: "Post-top glass railing system",
        title: "Post-Top Glass Railing",
        area: "Greater Seattle",
        highlights: "Post-mounted panels for decks and elevated edges.",
      },
      {
        src: "/services/glass-railing.jpg",
        alt: "Architectural glass railing installation",
        title: "Architectural Glass Railing",
        area: "Greater Seattle",
        highlights: "Glass guard that keeps the view open at the edge.",
      },
      {
        src: "/images/custom-glass-replacement.jpg",
        alt: "Custom replacement glass",
        title: "Custom Glass Replacement",
        area: "Greater Seattle",
        highlights: "Replacement glass for an existing opening that still has a sound frame.",
      },
      {
        src: "/services/glass-replacement.jpg",
        alt: "Technicians replacing an insulated glass unit",
        title: "Insulated Glass Replacement",
        area: "Greater Seattle",
        highlights: "Failed seal and fogged pane work without a full frame replacement.",
      },
      {
        src: "/images/glass-railing-hero-bg.jpg",
        alt: "Glass railing along an exterior edge",
        title: "Exterior Glass Guard",
        area: "Greater Seattle",
        highlights: "Exterior railing glass set for an open edge and a clear view.",
      },
    ],
    videos: [],
  },
  {
    slug: "window-blinds-shades",
    name: "Window Blinds & Shades",
    eyebrow: "WINDOW BLINDS & SHADES PORTFOLIO",
    summary:
      "Browse Norman roller, honeycomb, and faux wood treatments shown for Greater Seattle light control and privacy.",
    funnel: "Roller shades, honeycomb shades, and faux wood blinds.",
    images: [
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/02-inspiration-room.jpg",
        alt: "Faux wood blinds in a furnished room",
        title: "Faux Wood Blinds in a Room",
        area: "Greater Seattle",
        highlights: "Tilt control for privacy while keeping a wood look.",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/05-inspiration-interior.jpg",
        alt: "Interior faux wood blind installation",
        title: "Interior Faux Wood Installation",
        area: "Greater Seattle",
        highlights: "Blinds fitted to the window for a finished interior line.",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/01-portrait-honeycomb.jpg",
        alt: "Honeycomb cellular shade on a window",
        title: "Honeycomb Cellular Shade",
        area: "Greater Seattle",
        highlights: "Cellular fabric for softer light and added insulation.",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/02-portrait-honeycomb-room.jpg",
        alt: "Honeycomb shades across a room of windows",
        title: "Room of Honeycomb Shades",
        area: "Greater Seattle",
        highlights: "Matching shades across several openings.",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/09-whisper-white-light-filtering.jpg",
        alt: "Light filtering roller shade in whisper white",
        title: "Light-Filtering Roller Shade",
        area: "Greater Seattle",
        highlights: "Whisper white fabric that cuts glare and keeps the view soft.",
      },
      {
        src: "/services/blinds/roller-solar-shades.jpg",
        alt: "Roller shade on a residential window",
        title: "Roller Shade at the Window",
        area: "Greater Seattle",
        highlights: "A clean roller profile for solar control.",
      },
    ],
    videos: [],
  },
];

export function portfolioCategoryParams() {
  return portfolioCategories.map((category) => ({ category: category.slug }));
}

export function getPortfolioCategory(slug: string) {
  return portfolioCategories.find((category) => category.slug === slug);
}

export function portfolioCategoryPills(activeSlug: string) {
  return portfolioCategories.map((category) => ({
    label: category.name,
    href: `/portfolio/${category.slug}`,
    active: category.slug === activeSlug,
  }));
}

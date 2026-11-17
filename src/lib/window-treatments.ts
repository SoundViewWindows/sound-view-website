export const shopTreatmentsHref =
  "https://sound-view-window-door.myshopify.com/collections/window-treatments";

export type TreatmentImage = {
  src: string;
  alt: string;
};

export type TreatmentSpec = {
  label: string;
  body: string;
};

export type TreatmentStyle = {
  slug: string;
  path: string;
  styleName: string;
  tagline: string;
  cardCopy: string;
  cardImage: string;
  cardImageAlt: string;
  heroIntro: string;
  metaDescription: string;
  productTitle: string;
  categoryEyebrow: string;
  description: string[];
  features: string[];
  shopifyUrl: string;
  shopifyLabel?: string;
  images: TreatmentImage[];
  specs: TreatmentSpec[];
};

const base = "/services/window-blinds-shades";

export const treatmentStyles: TreatmentStyle[] = [
  {
    slug: "roller-solar-shades",
    path: `${base}/roller-solar-shades`,
    styleName: "Roller & Solar Shades",
    tagline: "CLEAN & MINIMALIST",
    cardCopy:
      "Sleek low-profile design that cuts glare and protects interior flooring from UV damage while maintaining natural light.",
    cardImage: "/services/blinds/roller-solar-shades.jpg",
    cardImageAlt:
      "Custom dark solar roller shades on kitchen picture windows cutting glare and UV light",
    heroIntro:
      "Sleek Norman Soluna roller shades with designer fabrics, light filtering or room darkening options, and manual or motorized control.",
    metaDescription:
      "Norman Soluna roller and solar shades for Greater Seattle homes, with designer fabrics, light control, and manual or motorized operation.",
    productTitle: "Norman Roller Shades",
    categoryEyebrow: "ROLLER & SOLAR SHADES",
    description: [
      "Designed with clean lines, designer fabrics, and thoughtful innovations, Soluna Roller Shades bring modern elegance and personalized light control to every space.",
      "The low profile cuts glare and helps protect interior floors from UV while still letting daylight into the room. Fabric options on this product include light filtering Rockville cloth and room darkening Olivia cloth, shown here in Antique Sage, Fossil, Pale Wheat, and Whisper White.",
      "Call (206) 331-4296 for pricing. Cost varies with the dimensions of the covering.",
    ],
    features: [
      "Clean Soluna profile with designer fabrics",
      "Light filtering and room darkening fabric choices",
      "Helps cut glare and UV while keeping natural light available",
      "Manual or motorized control technology",
      "Side channel option for a darker seal when paired with LightGuard",
      "Made to the size of your window",
    ],
    shopifyUrl:
      "https://sound-view-window-door.myshopify.com/products/norman-roller-shades",
    images: [
      {
        src: "/images/window-treatments/roller-solar-shades/01-roller-shades.png",
        alt: "Norman Soluna roller shades in a bright living space",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/02-roller-shade-profile.png",
        alt: "Side profile of a Norman roller shade",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/03-smart-motorization.png",
        alt: "Smart motorization option for Norman roller shades",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/04-lightguard-channels.png",
        alt: "LightGuard side channels on a Norman roller shade",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/05-roller-shade-diagram.png",
        alt: "Diagram of Norman roller shade light control",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/06-antique-sage-room-darkening.jpg",
        alt: "Antique Sage room darkening fabric from the Olivia collection",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/07-fossil-room-darkening.jpg",
        alt: "Fossil room darkening fabric from the Olivia collection",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/08-pale-wheat-light-filtering.png",
        alt: "Pale Wheat light filtering fabric from the Rockville collection",
      },
      {
        src: "/images/window-treatments/roller-solar-shades/09-whisper-white-light-filtering.jpg",
        alt: "Whisper White light filtering fabric from the Rockville collection",
      },
    ],
    specs: [
      {
        label: "Light control",
        body: "Choose light filtering fabric when you want softened daylight, or room darkening fabric when you want a deeper shade. Solar-style cloth is suited to glare and UV control on large glass.",
      },
      {
        label: "Energy efficiency",
        body: "A fitted roller shade adds a layer at the glass that helps manage heat gain and winter chill. Fabric choice and a tight fit do more for comfort than the cassette alone.",
      },
      {
        label: "Custom sizing",
        body: "Each shade is made to the window. Measure with us before you order, because pricing follows the width, height, fabric, and control you select.",
      },
      {
        label: "Motorization and control",
        body: "The Shopify product is offered as Manual or Motorized. Motorized shades can use the smart controls shown with this collection, including routines tied to your phone.",
      },
    ],
  },
  {
    slug: "honeycomb-shades",
    path: `${base}/honeycomb-shades`,
    styleName: "Cellular / Honeycomb Shades",
    tagline: "MAXIMUM INSULATION",
    cardCopy:
      "Honeycomb air pockets trap air along window glass, reducing heat loss during damp Seattle winters and keeping rooms cool in summer.",
    cardImage: "/services/blinds/cellular-honeycomb-shades.jpg",
    cardImageAlt:
      "Cordless insulating cellular honeycomb shades for cold weather window thermal efficiency",
    heroIntro:
      "Norman Portrait honeycomb shades use a cellular construction to insulate the glass and manage daylight through the year.",
    metaDescription:
      "Norman Portrait honeycomb shades for Greater Seattle homes, with cellular insulation, cordless lift options, and manual or motorized control.",
    productTitle: "Norman Honeycomb Shades",
    categoryEyebrow: "CELLULAR / HONEYCOMB SHADES",
    description: [
      "Engineered with energy-efficient cellular construction, Portrait Honeycomb Shades help insulate your home, improve year-round comfort, and beautifully manage natural light.",
      "The honeycomb cells hold a pocket of air against the glass. That is the same idea behind the shades we recommend for damp Seattle winters and warmer summer rooms.",
      "Call (206) 331-4296 for pricing. Cost varies with the dimensions of the covering.",
    ],
    features: [
      "Portrait cellular construction for insulation and light control",
      "Cordless top-down, bottom-up operation",
      "SmartRise cordless bottom-up lift",
      "Cord loop top-down option",
      "Manual or motorized control technology",
      "Made to the size of your window",
    ],
    shopifyUrl:
      "https://sound-view-window-door.myshopify.com/products/honeycomb-shades",
    images: [
      {
        src: "/images/window-treatments/honeycomb-shades/01-portrait-honeycomb.jpg",
        alt: "Norman Portrait honeycomb shades across a wide window",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/02-portrait-honeycomb-room.jpg",
        alt: "Portrait honeycomb shades in a furnished room",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/03-portrait-honeycomb-detail.jpg",
        alt: "Close view of Norman Portrait honeycomb shades",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/04-cordless-top-down-bottom-up.png",
        alt: "Cordless top-down bottom-up control for honeycomb shades",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/05-smartrise-cordless-bottom-up.png",
        alt: "SmartRise cordless bottom-up control for honeycomb shades",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/06-cord-loop-top-down.png",
        alt: "Cord loop top-down control for honeycomb shades",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/07-honeycomb-profile.png",
        alt: "Profile view of a Norman honeycomb shade cell",
      },
      {
        src: "/images/window-treatments/honeycomb-shades/08-smart-motorization.png",
        alt: "Smart motorization option for Norman honeycomb shades",
      },
    ],
    specs: [
      {
        label: "Light control",
        body: "Cellular fabric softens daylight and can be specified for stronger privacy. Top-down, bottom-up lift lets you cover the lower glass and still keep a view above.",
      },
      {
        label: "Energy efficiency",
        body: "The honeycomb pocket traps air at the glass, which helps slow heat loss in winter and heat gain in summer. It is the style we point to when insulation is the priority.",
      },
      {
        label: "Custom sizing",
        body: "Shades are built to your window opening. Bring measurements to a showroom, or book a visit and we will measure before the order is placed.",
      },
      {
        label: "Motorization and control",
        body: "Choose Manual or Motorized on the product. Lift styles include cordless top-down bottom-up, SmartRise cordless bottom-up, and a cord loop top-down.",
      },
    ],
  },
  {
    slug: "wood-faux-wood-blinds",
    path: `${base}/wood-faux-wood-blinds`,
    styleName: "Wood & Faux Wood Blinds",
    tagline: "CLASSIC LIGHT CONTROL",
    cardCopy:
      "Timeless handcrafted slat styling with precision tilt control. Moisture-resistant composite options available for kitchens and bathrooms.",
    cardImage: "/services/blinds/wood-faux-wood-blinds.jpg",
    cardImageAlt:
      "Warm natural wood horizontal slat blinds over residential living room windows",
    heroIntro:
      "Enjoy the timeless look of real wood with exceptional light and privacy control, plus durability engineered for heat, moisture, intense sunlight, and salty air.",
    metaDescription:
      "Norman Ultimate Faux Wood Blinds for Greater Seattle homes, with SmartPrivacy light control, a cordless lift, and moisture resistance for kitchens and baths.",
    productTitle: "Ultimate Faux Wood Blinds",
    categoryEyebrow: "WOOD & FAUX WOOD BLINDS",
    description: [
      "Ultimate Faux Wood Blinds bring the look of real wood together with tighter light control and less light leakage. Norman builds them to handle heat, moisture, intense sunlight, and salty air, which is why they fit kitchens, baths, and other humid rooms.",
      "SmartPrivacy keeps the slats aligned for a tighter close, and concealed route holes cut light leaks. A cordless lift raises and lowers the blind without exposed cords. Real wood is the option when you want natural grain. This Ultimate faux wood model is the one made for moisture and demanding rooms.",
      "Every blind is custom made to the window, with a choice of finishes, slat sizes, and design options, including wider openings. A Sound View measurement confirms the fit before the order is placed.",
    ],
    features: [
      "SmartPrivacy light-blocking slat design with tighter closure and more consistent rotation",
      "Concealed route holes that help reduce light leakage",
      "Cordless lift system, Best for Kids certified, for homes with children and pets",
      "Pivoting bottom rail that turns 90 degrees when closed so it lines up with the slats",
      "Built-in light block that lets the top slat recess into the headrail",
      "Valance-free headrail, plus Designer Crown, Modern Curved, and Linear valances",
      "Moisture, heat, intense sunlight, and salty-air resistance for kitchens and baths",
      "Custom built to the window, including finishes, slat sizes, and wider spans",
    ],
    shopifyUrl: shopTreatmentsHref,
    shopifyLabel: "Browse Window Treatments Online",
    images: [
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/01-hero.jpg",
        alt: "White Ultimate Faux Wood Blinds across three living room windows",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/02-inspiration-room.jpg",
        alt: "White Ultimate Faux Wood Blinds on a kitchen window",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/03-inspiration-window.jpg",
        alt: "Tilted Ultimate Faux Wood Blinds on tall coastal living room windows",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/04-inspiration-detail.jpg",
        alt: "Open Ultimate Faux Wood Blinds in a kitchen and living room",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/05-inspiration-interior.jpg",
        alt: "White Ultimate Faux Wood Blinds in a bedroom with an ocean view",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/06-smartprivacy.jpg",
        alt: "SmartPrivacy slat closure on Ultimate Faux Wood Blinds",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/07-cordless-lift.jpg",
        alt: "Cordless lift system on Ultimate Faux Wood Blinds",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/08-pivoting-bottom-rail.jpg",
        alt: "Pivoting bottom rail on Ultimate Faux Wood Blinds",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/09-valance-free-headrail.jpg",
        alt: "Valance-free headrail on Ultimate Faux Wood Blinds",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/10-built-in-light-block.jpg",
        alt: "Built-in light block at the headrail of Ultimate Faux Wood Blinds",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/11-valance-designer-crown.jpg",
        alt: "Designer Crown valance for Ultimate Faux Wood Blinds",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/12-valance-modern-curved.jpg",
        alt: "Modern Curved valance for Ultimate Faux Wood Blinds",
      },
      {
        src: "/images/window-treatments/wood-faux-wood-blinds/13-valance-linear.jpg",
        alt: "Linear valance for Ultimate Faux Wood Blinds",
      },
    ],
    specs: [
      {
        label: "Light control",
        body: "Tilt the slats through the day for light or privacy. SmartPrivacy closes them more tightly and more evenly, and concealed route holes limit light leaks. The pivoting bottom rail and built-in light block reduce gaps at the bottom and the top.",
      },
      {
        label: "Energy efficiency",
        body: "Norman describes these blinds as a way to keep heat out in summer and cold out in winter. The faux wood material is also built to stand up to intense sunlight, heat, and moisture.",
      },
      {
        label: "Custom sizing",
        body: "Each blind is made to the window, with finishes, slat sizes, and design options. The construction is also intended for wider windows while staying smooth to operate. We confirm the opening during a showroom visit or in-home measurement.",
      },
      {
        label: "Motorization and control",
        body: "Norman presents this Ultimate model with a cordless lift, so raising and lowering it does not use exposed cords. The system is Best for Kids certified. We confirm the lift and tilt setup when we measure, because this blind is ordered as a custom showroom product.",
      },
    ],
  },
  {
    slug: "motorized-smart-shades",
    path: `${base}/motorized-smart-shades`,
    styleName: "Motorized & Smart Shades",
    tagline: "CONNECTED LIVING",
    cardCopy:
      "Whisper-quiet automated shades synchronized with sunrise, sunset, or your smartphone and voice assistant routines.",
    cardImage: "/services/blinds/motorized-smart-shades.jpg",
    cardImageAlt:
      "Hand holding wireless remote operating smart motorized roller window shade",
    heroIntro:
      "Norman LightGuard 360 blackout shades with side channels for a dark room, available manual or motorized on Soluna roller shades.",
    metaDescription:
      "Norman LightGuard 360 motorized blackout shades for Greater Seattle bedrooms, nurseries, and media rooms.",
    productTitle: "Blackout Shades (Norman LightGuard 360)",
    categoryEyebrow: "MOTORIZED & SMART SHADES",
    description: [
      "LightGuard 360 uses integrated side channels to help block light around all four sides of the shade, creating a true blackout experience. It is ideal for bedrooms, nurseries, and media rooms, and it is available with Soluna Roller Shades for strong light control and a modern look.",
      "Best for homeowners who want the darkest possible room. The same product can be ordered manual or motorized, including the smart motorization shown in the gallery.",
      "Call (206) 331-4296 for pricing. Cost varies with the dimensions of the covering.",
    ],
    features: [
      "Integrated side channels that close light gaps on all four sides",
      "Paired with Soluna roller shades",
      "Suited to bedrooms, nurseries, and media rooms",
      "Manual or motorized control technology",
      "Smart motorization for phone and routine control",
      "Made to the size of your window",
    ],
    shopifyUrl:
      "https://sound-view-window-door.myshopify.com/products/lightguard-360%E2%84%A2",
    images: [
      {
        src: "/images/window-treatments/motorized-smart-shades/01-total-blackout.png",
        alt: "Norman LightGuard 360 total blackout shade with side channels",
      },
      {
        src: "/images/window-treatments/motorized-smart-shades/02-smart-motorization.png",
        alt: "Smart motorization for Norman LightGuard blackout shades",
      },
    ],
    specs: [
      {
        label: "Light control",
        body: "Side channels and a blackout fabric work together so light is blocked at the sides, top, and bottom, not only through the cloth. This is the darkest option in the collection.",
      },
      {
        label: "Energy efficiency",
        body: "A sealed blackout shade limits solar heat and nighttime heat loss at the glass. The channel fit matters as much as the fabric.",
      },
      {
        label: "Custom sizing",
        body: "Channels and the shade are sized together. An in-home measurement keeps the side tracks square so the blackout seal actually closes.",
      },
      {
        label: "Motorization and control",
        body: "Order Manual or Motorized. Motorized LightGuard shades support the smart controls in this collection, so a bedroom can open and close on a schedule or from your phone.",
      },
    ],
  },
];

export function getTreatmentStyle(slug: string) {
  const style = treatmentStyles.find((item) => item.slug === slug);
  if (!style) {
    throw new Error(`Unknown window treatment style: ${slug}`);
  }
  return style;
}

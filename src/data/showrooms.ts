export type ShowroomSlug = "lake-city" | "west-queen-anne" | "bellevue";

export type Showroom = {
  slug: ShowroomSlug;
  name: string;
  href: `/showrooms/${ShowroomSlug}`;
  summary: string;
  phone: string;
  phoneHref: string;
  address: string;
  addressNote: string;
  hours: { day: string; time: string }[];
  hoursNote: string;
  directionsHref: string;
  mapSrc: string;
  mapTitle: string;
  image: string;
  imageAlt: string;
  appointmentOnly: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaDescription: string;
};

export const showrooms: Showroom[] = [
  {
    slug: "lake-city",
    name: "Lake City",
    href: "/showrooms/lake-city",
    summary:
      "Full displays of Milgard, Andersen, clad-wood patio doors, and frameless shower hardware.",
    phone: "(206) 572-3411",
    phoneHref: "tel:2065723411",
    address: "12301 Lake City Way NE, Seattle, WA 98125",
    addressNote: "Convenient storefront parking directly in front of the showroom.",
    hours: [
      { day: "Monday through Friday", time: "8:00 AM to 4:30 PM" },
      { day: "Saturday & Sunday", time: "Closed" },
    ],
    hoursNote: "Showrooms and phone lines are closed on weekends and major holidays.",
    directionsHref:
      "https://www.google.com/maps/dir/?api=1&destination=12301+Lake+City+Way+NE,+Seattle,+WA+98125",
    mapSrc:
      "https://maps.google.com/maps?q=12301+Lake+City+Way+NE,+Seattle,+WA+98125&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapTitle: "Map of the Lake City showroom at 12301 Lake City Way NE, Seattle, WA 98125",
    image: "/showrooms/lake-city.jpg",
    imageAlt: "Sound View Window and Door storefront on Lake City Way NE",
    appointmentOnly: false,
    eyebrow: "North Seattle Flagship Showroom",
    title: "Visit Our Lake City Showroom",
    subtitle:
      "Explore full-scale operable window displays, exterior doors, frameless shower enclosures, and hardware in person. Touch the materials, test the smooth glide of precision sashes, and consult with local Northwest specialists.",
    metaDescription:
      "Visit the Sound View Window & Door flagship showroom in Lake City. See operable windows, entry and patio doors, custom glass, and hardware in person.",
  },
  {
    slug: "west-queen-anne",
    name: "West Queen Anne",
    href: "/showrooms/west-queen-anne",
    summary: "Architectural modern windows, slimline sliders, and custom interior glass.",
    phone: "(206) 402-4229",
    phoneHref: "tel:2064024229",
    address: "921 Elliott Ave W, Seattle, WA 98119",
    addressNote: "Located along the Elliott Avenue corridor with dedicated customer parking.",
    hours: [
      { day: "Monday through Friday", time: "8:00 AM to 4:30 PM" },
      { day: "Saturday & Sunday", time: "Closed" },
    ],
    hoursNote: "Showrooms and phone lines are closed on weekends and major holidays.",
    directionsHref:
      "https://www.google.com/maps/dir/?api=1&destination=921+Elliott+Ave+W,+Seattle,+WA+98119",
    mapSrc:
      "https://maps.google.com/maps?q=921+Elliott+Ave+W,+Seattle,+WA+98119&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapTitle: "Map of the West Queen Anne showroom at 921 Elliott Ave W, Seattle",
    image: "/showrooms/west-queen-anne.jpg",
    imageAlt: "Sound View Window & Door storefront at 921 Elliott Ave W in West Queen Anne",
    appointmentOnly: false,
    eyebrow: "Central Seattle Showroom",
    title: "Visit Our West Queen Anne Showroom",
    subtitle:
      "Experience premier window styles, custom door systems, and architectural glass hardware in the heart of Seattle. Test operability firsthand and consult with our seasoned window and door specialists.",
    metaDescription:
      "Visit the Sound View Window & Door showroom at 921 Elliott Ave W in West Queen Anne. See windows, doors, and custom glass in person, Monday through Friday.",
  },
  {
    slug: "bellevue",
    name: "Bellevue",
    href: "/showrooms/bellevue",
    summary: "Private design studio.",
    phone: "(425) 417-3005",
    phoneHref: "tel:4254173005",
    address: "13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005",
    addressNote: "Located in Suite 207 with easy parking directly outside the entrance.",
    hours: [
      { day: "Monday through Friday", time: "By appointment only" },
      { day: "Saturday & Sunday", time: "Closed" },
    ],
    hoursNote:
      "Open Monday through Friday by appointment only. Showrooms and phone lines are closed on weekends and major holidays.",
    directionsHref:
      "https://www.google.com/maps/dir/?api=1&destination=13555+NE+Bel+Red+Rd+Ste+207,+Bellevue,+WA+98005",
    mapSrc:
      "https://maps.google.com/maps?q=13555+NE+Bel+Red+Rd+Ste+207,+Bellevue,+WA+98005&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapTitle: "Map of the Bellevue showroom at 13555 NE Bel Red Rd Ste 207, Bellevue, WA 98005",
    image: "/showrooms/bellevue.jpg",
    imageAlt: "Sound View Window and Door storefront at 13555 NE Bel Red Rd in Bellevue",
    appointmentOnly: true,
    eyebrow: "Bellevue Design Studio",
    title: "Visit Our Bellevue Showroom",
    subtitle:
      "Experience premier window styles, moving glass walls, and custom door displays in a private design studio. Visits are scheduled by appointment so every homeowner and contractor gets dedicated one-on-one attention.",
    metaDescription:
      "Visit the Sound View Window & Door Bellevue showroom at 13555 NE Bel Red Rd Ste 207. Showroom visits are scheduled by appointment.",
  },
];

export function getShowroom(slug: ShowroomSlug) {
  const showroom = showrooms.find((room) => room.slug === slug);
  if (!showroom) {
    throw new Error(`Unknown showroom: ${slug}`);
  }
  return showroom;
}

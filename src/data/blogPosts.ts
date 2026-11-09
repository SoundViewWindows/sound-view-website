import { BOOKING_URL } from "@/config/links";

export const blogCategories = [
  "Windows",
  "Doors",
  "Glass & Showers",
  "Energy & Rebates",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogCta = {
  heading: string;
  body: string;
  label: string;
  href: string;
  external?: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  imageAlt: string;
  content: BlogBlock[];
  cta: BlogCta;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "double-pane-vs-triple-pane-western-washington",
    title:
      "Double Pane vs. Triple Pane: What Actually Makes Sense in Western Washington?",
    category: "Windows",
    date: "October 8, 2026",
    readTime: "7 min read",
    excerpt:
      "A breakdown of Puget Sound climate zones, heating degree days, and whether triple pane glass pays for itself in Seattle.",
    coverImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=80",
    imageAlt:
      "Modern house with large divided-lite windows facing a landscaped yard",
    content: [
      {
        type: "paragraph",
        text: "Homeowners around Puget Sound often get pitched triple pane glass as if it were the only responsible choice. In a marine climate it is a useful tool, not a default. Seattle and the surrounding lowlands lose heat for most of the year and rarely need the glass to fight a long cooling season. The useful question is where an extra pane changes comfort and cost, and where a well-built double pane unit already does the job.",
      },
      {
        type: "heading",
        text: "What the local climate actually asks of a window",
      },
      {
        type: "paragraph",
        text: "Western Washington sits in a marine zone. A typical Seattle year has on the order of 4,400 heating degree days and only a few hundred cooling degree days. Nights are cool, winters are long and damp, and summer heat spikes are short. U-factor, the rate of heat loss, matters more here than a very low solar heat gain coefficient, except on large west-facing glass that overheats in July.",
      },
      {
        type: "paragraph",
        text: "That climate also explains why old single pane wood and aluminum windows feel so poor. The interior glass surface runs cold, room air condenses on it, and the furnace runs to replace heat that left through the opening. The first big gain is leaving that generation of glass behind.",
      },
      {
        type: "heading",
        text: "What a modern double pane unit already does",
      },
      {
        type: "paragraph",
        text: "A double pane insulated unit with one low-e coating and an argon fill is the package we specify for most Greater Seattle homes. Whole-window U-factors in the 0.27 to 0.30 range are common when the frame is built for that glass. Compared with clear single pane or older clear double pane aluminum, the drop in heat loss, drafts, and morning condensation is obvious the first cold week.",
      },
      {
        type: "list",
        items: [
          "The low-e coating reflects indoor heat back into the room instead of letting it soak into the glass.",
          "Argon, heavier than air, slows conduction across the gap between panes.",
          "A warm-edge spacer reduces the cold line you feel at the perimeter of the glass.",
          "The frame still counts. High-performance glass in a conductive metal frame can give back much of the gain.",
        ],
      },
      {
        type: "heading",
        text: "Where triple pane changes the math",
      },
      {
        type: "paragraph",
        text: "Triple pane adds a third lite, a second low-e surface, and another gas gap. When the frame is designed for that package, whole-window U-factors around 0.18 to 0.22 are realistic. The room is also quieter, which matters on arterials, under flight paths, and along busy streets in Seattle, Tacoma, and Everett.",
      },
      {
        type: "paragraph",
        text: "The tradeoffs are concrete. The unit costs more. The sash is heavier, which can strain older balances and can limit very large operating vents. Coatings can trim a little visible light. And in a mild marine climate the energy payback is longer than it would be in eastern Washington or a Cascade foothill house with a harsher winter.",
      },
      {
        type: "heading",
        text: "A practical way to decide",
      },
      {
        type: "paragraph",
        text: "Use triple pane where the opening works hard, and a strong double pane package on the rest of the house. Mixing specifications in one project is normal.",
      },
      {
        type: "list",
        items: [
          "Large picture windows and sliders on north and exposed east walls.",
          "Bedrooms that face a road or a flight path.",
          "Rooms you hold at a steady temperature, such as a home office or a nursery.",
          "Homes on electric resistance heat, where lost heat shows up directly on the bill.",
          "Projects aiming at a utility rebate tier that requires a U-factor of 0.22 or lower.",
        ],
      },
      {
        type: "paragraph",
        text: "Smaller windows on a protected south wall rarely justify the premium if the double pane alternative is already a low-e argon unit in a quality frame. Comfort at the glass, noise, and the rebate form are better reasons to step up than a blanket rule.",
      },
      {
        type: "heading",
        text: "Will triple pane pay for itself in Seattle?",
      },
      {
        type: "paragraph",
        text: "In a typical gas-heated Seattle house, moving from single pane or clear aluminum double pane to a modern double pane low-e window does most of the energy work. The next step, from that double pane unit to triple pane, saves less each year because the climate is moderate and the first upgrade already cut the largest losses. Triple pane still earns its place in comfort, noise control, and homes where a lower U-factor unlocks a higher rebate tier.",
      },
      {
        type: "quote",
        text: "In Western Washington, the expensive mistake is usually buying triple pane everywhere. The useful move is buying it where the glass is large, the exposure is cold, or the street is loud.",
      },
      {
        type: "paragraph",
        text: "If a Puget Sound Energy rebate is part of the budget, confirm the current U-factor cutoff before the glass package is locked. A 0.27 double pane and a 0.22 triple pane can land in different published tiers, and that difference belongs in the payback conversation.",
      },
    ],
    cta: {
      heading: "Compare glass packages for your openings",
      body: "Walk through window style, frame material, and project details in the three-step configurator. We use that information to talk through U-factor, noise, and which rooms actually benefit from a third pane.",
      label: "Start the Window Configurator",
      href: "/services/window-replacement/types",
    },
  },
  {
    slug: "window-condensation-broken-seal",
    title: "How to Tell if Window Condensation Means a Broken Seal",
    category: "Windows",
    date: "September 18, 2026",
    readTime: "6 min read",
    excerpt:
      "Interior surface moisture vs cloudy fog trapped between glass panes, and when you can replace just the glass unit instead of the entire frame.",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Sunlit bedroom window with soft daylight across the glass",
    content: [
      {
        type: "paragraph",
        text: "A cloudy window in January can mean two very different things. Moisture on the room side of the glass is usually a humidity and surface-temperature problem. Moisture trapped between the panes means the insulated glass seal has failed. One is solved with ventilation and, sometimes, better glass. The other needs a new sealed unit, and sometimes a new frame.",
      },
      {
        type: "heading",
        text: "Interior surface moisture",
      },
      {
        type: "paragraph",
        text: "When indoor air hits glass that is colder than the dew point, water beads on the surface you can touch. You see it on single pane windows, on metal frames, and on bathroom glass after a shower. It wipes off. The seal is intact.",
      },
      {
        type: "paragraph",
        text: "Western Washington winters make this common. Homes are closed up, cooking and showers add moisture, and new tighter windows can reveal humidity that leaky old sash used to exhaust. During a cold snap, an indoor relative humidity around 35 to 40 percent is a practical target. Bath fans that actually vent outside, a range hood used while cooking, and a little less moisture from drying racks will clear many complaints without a new window.",
      },
      {
        type: "list",
        items: [
          "Wipe the interior glass dry on a cold morning.",
          "If water returns only on the room face, start with humidity and ventilation.",
          "Check whether the coldest glass in the house is single pane or an older aluminum slider.",
          "Look at the exterior after rain so you are not calling weather a failed seal.",
        ],
      },
      {
        type: "heading",
        text: "Fog trapped between the panes",
      },
      {
        type: "paragraph",
        text: "A failed insulated glass unit looks milky, streaked, or speckled in a way you cannot wipe from either the room side or the outside. Droplets and mineral tracks sit in the gap. The argon or air fill has leaked, the desiccant in the spacer is saturated, and the unit no longer insulates the way it did when it was sealed. The sash may still lock and operate perfectly.",
      },
      {
        type: "paragraph",
        text: "Seal failure has ordinary causes: age, a spacer that has pulled away, a frame that racked the unit out of square, or long sun exposure on a dark south or west elevation. Once the gap is open to moist air, the view does not clear on its own.",
      },
      {
        type: "quote",
        text: "Fog you can wipe off is a humidity story. Fog you cannot reach is a failed seal.",
      },
      {
        type: "heading",
        text: "When you can replace just the glass",
      },
      {
        type: "paragraph",
        text: "If the frame is square, the sill is solid, and the sash still operates, an insulated glass unit replacement is often the right repair. Many vinyl, fiberglass, and wood sash from the last few decades can accept a new sealed unit. We measure the daylight opening, overall thickness, spacer, and coating, then set a new dual or triple pane unit in the existing sash.",
      },
      {
        type: "paragraph",
        text: "Glass-only replacement restores the view and the insulating gap. It does not fix a rotten sill, a twisted frame, or hardware that has worn out. It also does not qualify for most utility window rebates, which pay for full window replacement rather than a sash rebuild.",
      },
      {
        type: "heading",
        text: "When the frame should go",
      },
      {
        type: "list",
        items: [
          "Wood rot in the sash, sill, or lower jamb.",
          "A frame racked out of square so a new unit would be stressed the same way.",
          "Cracked vinyl, failed balances, or a slider that will not stay on its track.",
          "Single pane glass in failed putty, where there is no insulated unit to swap.",
          "Repeated seal failures in the same opening, which often means the frame is moving.",
        ],
      },
      {
        type: "paragraph",
        text: "If you are unsure which problem you have, a few photos of the wiped glass, the sill, and the exterior casing are enough for a first read. We would rather replace a sealed unit than sell a full frame when the opening is still sound.",
      },
    ],
    cta: {
      heading: "Not sure whether it is the glass or the frame?",
      body: "Start with the window configurator if the opening needs a full replacement, and tell us in the project notes if you are only seeing fog between the panes. We will say when a glass unit swap is the smaller repair.",
      label: "Start the Window Configurator",
      href: "/services/window-replacement/types",
    },
  },
  {
    slug: "exterior-entry-door-wet-coastal-winters",
    title: "Choosing an Exterior Entry Door for Wet Coastal Winters",
    category: "Doors",
    date: "August 27, 2026",
    readTime: "7 min read",
    excerpt:
      "Comparing fiberglass, natural wood, and insulated steel doors for moisture resistance, thermal bridging, and long-term durability.",
    coverImage:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "House exterior with a covered entry and front door",
    content: [
      {
        type: "paragraph",
        text: "An entry door on the west side of the Cascades spends much of the year damp. Wind-driven rain, weeks of high humidity, and temperatures that rarely bake the exterior dry will find the bottom rail, the sill, and any end grain you leave exposed. The slab material matters. The overhang, the flashing, and the threshold matter at least as much.",
      },
      {
        type: "heading",
        text: "What a coastal winter does to a door",
      },
      {
        type: "paragraph",
        text: "Water sits on a flat sill, wicks into untreated end grain, and works behind casing that was never pan-flashed. A hollow or poorly insulated slab also runs cold on the room side, so hardware sweats and the foyer feels drafty even when the weatherstripping looks intact. Thermal bridging at a metal edge or a cheap steel jamb shows up the same way: a cold line you can feel with the back of your hand.",
      },
      {
        type: "heading",
        text: "Fiberglass",
      },
      {
        type: "paragraph",
        text: "Fiberglass is the most forgiving default for an unsheltered entry in Seattle, Kitsap, and coastal Snohomish County. The skin does not swell and shrink the way wood does, a foam core keeps the interior face warmer, and a wood-grain texture can take a convincing stain. It resists dents better than many people expect, though a sharp impact can still mark the skin.",
      },
      {
        type: "list",
        items: [
          "Stable in prolonged moisture, so it is a strong choice on west and south entries with a shallow cover.",
          "Insulated cores reduce the cold interior face you get from a hollow decorative door.",
          "Finish still matters. A factory finish or a careful field finish protects the skin and any wood-look detail.",
          "Pair it with a composite or fiberglass frame when the opening sees weather, not a bare metal jamb.",
        ],
      },
      {
        type: "heading",
        text: "Natural wood",
      },
      {
        type: "paragraph",
        text: "Wood is still the right door when the house asks for it: older Craftsman entries, brick facades, and protected porches where the grain and the joinery are part of the architecture. It is repairable in a way molded skins are not. It is also a maintenance commitment.",
      },
      {
        type: "paragraph",
        text: "A wood door wants a real overhang, faithful paint or stain, and attention to the bottom rail, where end grain drinks water. On an exposed wall with no porch, it becomes a refinishing project. Under a deep cover, with a drained sill and a finish kept up, it can last for decades and look correct on the house.",
      },
      {
        type: "heading",
        text: "Insulated steel",
      },
      {
        type: "paragraph",
        text: "A foam-filled steel slab is secure and thermally solid through the center of the door. The risks are at the edges. A cut, a deep dent, or a missing bottom sweep lets water reach steel, and rust follows. Metal edges and an inexpensive steel jamb can also bridge cold even when the core is insulated. Steel does well under a deep cover, with a composite frame and a threshold you can adjust as the sweep wears.",
      },
      {
        type: "list",
        items: [
          "Choose foam-filled, not hollow, if the foyer feels cold today.",
          "Keep the finish intact at the bottom edge and around any hardware cutouts.",
          "Ask about a thermally improved frame if the jamb will sit in the weather.",
          "Use insulated glass in any lite. A single decorative pane undoes much of the slab's performance.",
        ],
      },
      {
        type: "heading",
        text: "Details that outlast the slab choice",
      },
      {
        type: "list",
        items: [
          "A sill with positive slope and a threshold that sheds water instead of holding it.",
          "Pan flashing at the sill and head flashing lapped into the weather barrier.",
          "A continuous air seal at the jamb, not a reliance on casing trim.",
          "A sweep and adjustable threshold you can maintain after the first winter.",
          "Glass, if you want light, specified to a U-factor in the same range as the windows.",
        ],
      },
      {
        type: "quote",
        text: "On a wet coastal entry, the slab material matters. The flashing and the overhang matter more.",
      },
      {
        type: "paragraph",
        text: "The easiest way to judge these differences is in person: swing a fiberglass door, a wood door, and a foam-filled steel door, then look at the sill and the frame section, not just the color. That visit is more useful than a brochure photo of a dry climate entry.",
      },
    ],
    cta: {
      heading: "See entry doors in wet-climate sections",
      body: "Book a showroom visit to operate fiberglass, wood, and insulated steel doors, and to look at sills and frames the way they are built for Pacific Northwest rain.",
      label: "Book a Showroom Visit",
      href: BOOKING_URL,
      external: true,
    },
  },
  {
    slug: "pse-and-tpu-window-rebates",
    title: "A Homeowner Guide to Qualifying for PSE and TPU Window Rebates",
    category: "Energy & Rebates",
    date: "October 22, 2026",
    readTime: "8 min read",
    excerpt:
      "Step-by-step instructions on U-Factor cutoffs, pre-approval requirements, and filing deadlines for local Washington utility incentives.",
    coverImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Two-story house with large windows and a gabled roof",
    content: [
      {
        type: "paragraph",
        text: "Puget Sound Energy and Tacoma Power both help pay for qualifying window replacements, and they do not use the same rules. The U-factor of the new unit, the pane and frame you are removing, who heats the house, and when you file all decide whether a rebate is real. Amounts below are the published figures homeowners are using in this program cycle. Both utilities revise programs, so confirm the current worksheet before you order.",
      },
      {
        type: "heading",
        text: "Start with the utility that heats the house",
      },
      {
        type: "paragraph",
        text: "PSE rebates apply when PSE electricity or PSE natural gas is the primary heat source. Tacoma Power incentives apply to homes served by Tacoma Power with electric primary heat. A heat pump that serves most of the living area counts as the primary heat. If that heat pump is on PSE electric service, including a dual-fuel system with a gas furnace backup, PSE treats the home as electrically heated and you need PSE electric service. Avista customers are on a different program. Confirm the account, not the neighbor's bill.",
      },
      {
        type: "heading",
        text: "PSE U-factor cutoffs",
      },
      {
        type: "paragraph",
        text: "PSE's standard window rebate is organized by U-factor and by the window you replace. These are the published tiers for installs in the current cycle, with a purchase and install deadline of December 31, 2026.",
      },
      {
        type: "list",
        items: [
          "Windows with a U-factor of 0.23 to 0.30, or patio doors at 0.31 to 0.35: $50 per window when replacing single-pane wood or metal, up to a published cap of $750. At this tier, replacing double-pane wood or metal does not qualify for the standard rebate.",
          "Windows with a U-factor of 0.22 or lower, or patio doors at 0.30 or lower: $100 per window, up to a published cap of $1,500. This tier also covers replacement of double-pane wood or metal frames.",
          "Efficiency Boost and manufactured homes have a higher published amount, up to $200 per window, with their own caps and eligibility rules.",
        ],
      },
      {
        type: "paragraph",
        text: "A few conditions remove projects that otherwise have a good U-factor. The opening has to be in conditioned living space, not a garage or an unheated basement. The offer is for full window or patio door replacement, not a glass-only swap. Site-built single-family homes are the standard audience. Multifamily buildings of five or more units, commercial accounts, new construction, and additions that add square footage sit outside that offer.",
      },
      {
        type: "heading",
        text: "PSE pre-approval and the filing deadline",
      },
      {
        type: "paragraph",
        text: "The standard PSE rebate does not require a pre-approval letter. Waiting for one can push an install past the season or past the filing window. Read the current form anyway, because Efficiency Boost and special tiers can add steps.",
      },
      {
        type: "list",
        items: [
          "Install qualifying products by the published end date, currently December 31, 2026.",
          "Submit the application, including documents, within 60 days of installation.",
          "Include a paid invoice or purchase receipt with cost, window count, measurements, and type. A contract, scope, or purchase order does not replace that invoice.",
          "Include proof of U-factor for each unit: NFRC stickers or a packing slip that lists the U-factor.",
        ],
      },
      {
        type: "heading",
        text: "Tacoma Power U-factor and eligibility",
      },
      {
        type: "paragraph",
        text: "Tacoma Power's published window path is built around electric heat, the window you remove, and a U-value of 0.30 or lower on the new unit. A participating contractor has to do the work.",
      },
      {
        type: "list",
        items: [
          "Single-pane windows and glass sliders: a published rebate of $100 per window and $400 per sliding door.",
          "Double-pane metal-framed windows and glass sliders: a published rebate of $50 per window and $200 per sliding door.",
          "New windows need a U-value of 0.30 or lower and have to meet the current Tacoma Power specification.",
          "Existing units generally need to be single pane, or double pane with a metal frame. Some loan and income-qualified paths are limited to single pane.",
          "Do-it-yourself installs, manufactured homes, and new construction are outside the standard rebate. Multifamily properties of five or more units use a different incentive.",
        ],
      },
      {
        type: "heading",
        text: "Where TPU pre-approval matters",
      },
      {
        type: "paragraph",
        text: "Tacoma Power is the program where approval comes before you treat the incentive as guaranteed. You submit a project application and supporting documents for project and incentive approval. The participating contractor typically prepares the bid paperwork. Applications go to the address or rebates inbox on the current form, including rebates@tacoma.gov and the customer office at 3628 S. 35th St. in Tacoma.",
      },
      {
        type: "paragraph",
        text: "Because a participating contractor is required, choose that contractor before demolition. A completed install by a non-participating company can make an otherwise qualifying U-factor ineligible.",
      },
      {
        type: "heading",
        text: "A filing order that protects the rebate",
      },
      {
        type: "list",
        items: [
          "Photograph existing windows and note pane count and frame material before anything is removed.",
          "Confirm the utility account and primary heat source in writing.",
          "Choose a U-factor that clears the tier you are aiming for, and keep every NFRC label until the packet is copied.",
          "For Tacoma Power, file through a participating contractor and wait for the approval the program requires.",
          "For PSE, install, then file within 60 days with the paid invoice and U-factor proof. Watch the December 31, 2026 install date if it is still the published deadline.",
          "Keep the packing slip and invoice together. Those two pages are what most incomplete applications are missing.",
        ],
      },
      {
        type: "quote",
        text: "The rebate follows the paperwork. A qualifying window without the NFRC label and a paid invoice is just a nice window.",
      },
      {
        type: "paragraph",
        text: "We spec U-factor with the rebate tier in view, and we will tell you when a glass package misses a cutoff by a few hundredths. Bring the utility name and a note about the existing windows when you start a project so the recommendation and the form agree.",
      },
    ],
    cta: {
      heading: "Spec windows against the rebate tier",
      body: "Use the three-step window configurator to record style, material, and opening counts. Mention PSE or Tacoma Power in the project notes so we can match U-factor to the tier you are filing.",
      label: "Start the Window Configurator",
      href: "/services/window-replacement/types",
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export type ServiceType =
  | "windows"
  | "doors"
  | "shower-doors"
  | "glass-replacement"
  | "glass-railings"
  | "blinds-shades";

type ComparisonItem = {
  title: string;
  body: string;
};

type ComparisonCopy = {
  headline: string;
  oldTitle: string;
  newTitle: string;
  oldItems: ComparisonItem[];
  newItems: ComparisonItem[];
};

const subtitle =
  "See how Sound View installations resolve chronic moisture, drafts, and energy waste across Greater Seattle.";

const comparisons: Record<ServiceType, ComparisonCopy> = {
  windows: {
    headline: "The True Cost of Keeping Aging Windows",
    oldTitle: "Old & Aging Windows",
    newTitle: "Sound View Upgrades",
    oldItems: [
      { title: "Higher Energy Bills", body: "Drafts and air leaks drive up winter heating costs." },
      { title: "Ongoing Repairs", body: "Rotting trim, broken seals, and sticking hardware demand costly fixes." },
      { title: "Temperature Fluctuations", body: "Chilly draft zones in winter and uncomfortably hot rooms in summer." },
      { title: "Poor Soundproofing", body: "Thin, worn single or early dual-pane glass allows traffic noise inside." },
      { title: "Dated Appearance", body: "Weathered frames and aged sills detract from curb appeal and home value." },
      { title: "Security Vulnerabilities", body: "Worn latches and compromised frame integrity reduce home safety." },
    ],
    newItems: [
      { title: "Lower Energy Bills", body: "High-performance Low-E glass and tight thermal breaks lower utility spend." },
      { title: "Maintenance-Free Durability", body: "Moisture-resistant fiberglass, vinyl, and composite frames that will not rot or peel." },
      { title: "Consistent Year-Round Comfort", body: "Eliminates cold drafts and balances indoor temperatures in all seasons." },
      { title: "Noticeable Sound Dampening", body: "Multi-pane laminated and argon-insulated assemblies block outdoor street noise." },
      { title: "Elevated Architectural Appeal", body: "Fresh exterior profiles, clean sightlines, and contemporary hardware boost home value." },
      { title: "Enhanced Home Security", body: "Multipoint locking systems and reinforced sashes engineered for structural strength." },
    ],
  },
  doors: {
    headline: "The True Cost of Keeping Outdated Doors",
    oldTitle: "Outdated Doors",
    newTitle: "Precision-Installed Systems",
    oldItems: [
      { title: "Drafty Thresholds", body: "Gaps under the door let winter air and rain into the entry." },
      { title: "Sticking Jambs", body: "Swollen frames make the door hard to open and close." },
      { title: "Moisture-Damaged Sills", body: "Wooden sills swell, rot, and stain in wet Northwest weather." },
      { title: "Warped Panels", body: "Aged slabs twist and no longer sit flush in the opening." },
      { title: "Loose Deadbolts", body: "Worn hardware is easier to force and harder to lock securely." },
      { title: "Dated Curb Appeal", body: "A tired entry or patio door pulls down the look of the whole facade." },
    ],
    newItems: [
      { title: "Weather-Tight Sill Seals", body: "A measured sill keeps wind and water outside." },
      { title: "Smooth Multi-Slide Glide", body: "Patio panels move easily without sticking or dragging." },
      { title: "Heavy-Duty Composite Jambs", body: "Moisture-resistant frames stand up to Seattle rain." },
      { title: "Stable, True Panels", body: "New slabs sit square so the door closes cleanly." },
      { title: "High-Security Multipoint Locks", body: "More latch points along the door edge." },
      { title: "A Finished Entry", body: "Clean profiles and current hardware refresh the opening." },
    ],
  },
  "shower-doors": {
    headline: "The True Cost of Keeping an Aging Shower Enclosure",
    oldTitle: "Old & Aging Shower Doors",
    newTitle: "Sound View Upgrades",
    oldItems: [
      { title: "Mold-Prone Metal Tracks", body: "Corners hold water and soap film that is hard to clear." },
      { title: "Corroded Framing", body: "Metal frames pit and stain in a wet bath." },
      { title: "Leaky Seals", body: "Water escapes onto the floor around worn gaskets." },
      { title: "Hard-to-Clean Plastic", body: "Frosted panels cloud and scratch over time." },
      { title: "Stuck Sliding Doors", body: "Rollers grind and jump the track." },
      { title: "A Closed-In Bath", body: "Heavy frames make a small bathroom feel smaller." },
    ],
    newItems: [
      { title: "Frameless Heavy Glass", body: "A clear panel opens the room without a bulky frame." },
      { title: "Moisture-Shedding Coatings", body: "Water beads and wipes off instead of spotting." },
      { title: "Solid Brass Hardware", body: "Hinges and pulls hold up in daily steam." },
      { title: "An Open Spa Look", body: "Clean glass and minimal metal brighten the bath." },
      { title: "A Tight, Measured Fit", body: "Panels are sized to the opening so water stays inside." },
      { title: "Simple Daily Care", body: "Smooth glass wipes clean without tracks full of residue." },
    ],
  },
  "glass-replacement": {
    headline: "The True Cost of Living with Failed Glass",
    oldTitle: "Failed & Foggy Glass",
    newTitle: "Precision-Installed Glass",
    oldItems: [
      { title: "Foggy Condensation", body: "Moisture trapped between panes clouds the view." },
      { title: "A Broken Thermal Seal", body: "Failed seals let the insulated unit lose its gas fill." },
      { title: "A Cloudy Outlook", body: "Mineral haze and trapped moisture block daylight." },
      { title: "Lost Insulation", body: "A failed unit no longer holds heat the way it should." },
      { title: "A Cold Pane", body: "Failed glass can feel chilly even when the frame is still sound." },
      { title: "A Bigger Bill Than Needed", body: "Replacing a whole window for one bad pane costs more than the glass itself." },
    ],
    newItems: [
      { title: "New Insulated Glass Units", body: "A fresh IGU restores a clear, sealed pane." },
      { title: "Glass Set in the Existing Frame", body: "We replace the unit without a full tear-out when the frame is sound." },
      { title: "Restored Clarity", body: "Daylight comes back without the fog." },
      { title: "Better Thermal Performance", body: "A sealed unit helps the opening hold conditioned air." },
      { title: "A Smaller Scope", body: "Replacing the glass, not the whole window, keeps the project focused." },
      { title: "A Measured Fit", body: "Each unit is cut to the existing sash so it seats correctly." },
    ],
  },
  "glass-railings": {
    headline: "The True Cost of Delaying a Glass Railing",
    oldTitle: "Old & Aging Railings",
    newTitle: "Sound View Upgrades",
    oldItems: [
      { title: "A Blocked View", body: "Wood or cable rails interrupt the outlook you wanted to keep open." },
      { title: "Weathered Posts", body: "Outdoor wood and metal stain, rust, and need repeat finishing." },
      { title: "Loose Fittings", body: "Hardware that has worked loose no longer feels solid under hand." },
      { title: "A Dated Edge", body: "An older rail can make a new deck or stair look unfinished." },
      { title: "Hard-to-Clean Details", body: "Spindles and cables collect dirt and are slow to wipe down." },
      { title: "An Uncertain Fit", body: "A rail that was not measured for this opening can sit out of line." },
    ],
    newItems: [
      { title: "Clear Tempered Glass", body: "A glass panel keeps the view open on decks and interior stairs." },
      { title: "Marine-Ready Hardware", body: "Exterior fittings are chosen for wet Pacific Northwest weather." },
      { title: "Measured On Site", body: "Panels and posts are sized to the actual landing and stair." },
      { title: "A Low Profile", body: "Minimal metal keeps the architecture in front of the rail." },
      { title: "Simple Upkeep", body: "Smooth glass wipes clean without a field of spindles." },
      { title: "A Professional Set", body: "The system is installed as a complete railing, not a loose kit." },
    ],
  },
  "blinds-shades": {
    headline: "The True Cost of Outdated Window Treatments",
    oldTitle: "Outdated Blinds & Shades",
    newTitle: "Sound View Upgrades",
    oldItems: [
      { title: "Tangled Manual Cords", body: "Cords knot, fray, and get in the way of the window." },
      { title: "Bent Vinyl Slats", body: "Cheap slats warp and never sit straight again." },
      { title: "Fading Interiors", body: "Unfiltered sun wears floors, fabrics, and finishes." },
      { title: "Heat Buildup", body: "Bare glass turns rooms hot on bright afternoons." },
      { title: "Uneven Light", body: "One tired blind cannot manage glare and privacy together." },
      { title: "A Mismatched Wall", body: "Different treatments across one room look unfinished." },
    ],
    newItems: [
      { title: "Motorized Schedules", body: "Shades can move with the day or a tap on your phone." },
      { title: "Cellular Honeycomb Insulation", body: "Air pockets help slow heat loss at the glass." },
      { title: "Glare Reduction", body: "Solar and roller fabrics cut brightness without a full blackout." },
      { title: "Cordless Child Safety", body: "No dangling cords in reach of children or pets." },
      { title: "A Consistent Look", body: "One fabric and color plan across the room." },
      { title: "Professional Measurement", body: "Treatments are sized to the opening, not guessed from a store tape." },
    ],
  },
};

export function CostComparison({ service = "windows" }: { service?: ServiceType }) {
  const copy = comparisons[service];

  return (
    <section className="bg-[#132238] pb-16 pt-2 text-slate-100" aria-label="Cost of waiting versus upgrading">
      <div className="mx-auto max-w-5xl px-4">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
          The Cost of Waiting vs. Upgrading
        </p>
        <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
          {copy.headline}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-slate-300 sm:text-base">
          {subtitle}
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-700/90 bg-[#132238] p-6 shadow-sm sm:p-8">
            <header className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-white">{copy.oldTitle}</h3>
              <Mark tone="problem" label="Problem" />
            </header>
            <ul className="space-y-4">
              {copy.oldItems.map((item) => (
                <Item key={item.title} tone="problem" item={item} />
              ))}
            </ul>
          </article>
          <article className="relative rounded-2xl border-2 border-emerald-500/30 bg-[#132238] p-6 shadow-md sm:p-8">
            <header className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-white">{copy.newTitle}</h3>
              <Mark tone="value" label="Upgrade" />
            </header>
            <ul className="space-y-4">
              {copy.newItems.map((item) => (
                <Item key={item.title} tone="value" item={item} />
              ))}
            </ul>
          </article>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">
          Upfront pricing takes under 60 seconds with zero sales pressure and zero obligation.
        </p>
      </div>
    </section>
  );
}

function Item({ tone, item }: { tone: "problem" | "value"; item: ComparisonItem }) {
  return (
    <li className="flex gap-3">
      <Mark tone={tone} />
      <p className="text-sm leading-6 text-slate-300">
        <span className="font-semibold text-white">{item.title}: </span>
        {item.body}
      </p>
    </li>
  );
}

function Mark({ tone, label }: { tone: "problem" | "value"; label?: string }) {
  const problem = tone === "problem";
  return (
    <span
      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
        problem ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
      }`}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {problem ? <XIcon /> : <CheckIcon />}
    </span>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" d="M6 6l8 8M14 6l-8 8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 10.2 3.2 3.2L15 6.8" />
    </svg>
  );
}

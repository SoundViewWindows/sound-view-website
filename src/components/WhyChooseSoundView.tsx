const heroPillars = [
  {
    title: "17+ Years & 10,000+ Installations",
    body: "Proven Pacific Northwest track record with a 4.9/5 average homeowner rating.",
  },
  {
    title: "3 Puget Sound Showrooms",
    body: "Convenient locations in Lake City, Queen Anne, and Bellevue to view products in person.",
  },
  {
    title: "Authorized Factory Dealer",
    body: "Direct access to Andersen, Milgard, Ply Gem, and STILE Windows & Doors.",
  },
  {
    title: "Zero-Pressure Consultations",
    body: "Honest advice, precision measurement, and WA licensed, bonded, and insured crews.",
  },
];

const pillars = [
  {
    title: "17+ Years & 10,000+ Installations",
    body: "A proven Pacific Northwest track record, with a 4.9/5 average homeowner rating.",
  },
  {
    title: "3 Puget Sound Showrooms",
    body: "Convenient showrooms in Lake City, West Queen Anne, and Bellevue to see products in person.",
  },
  {
    title: "Authorized Factory Dealer",
    body: "Direct access to top manufacturers including Andersen, Milgard, Ply Gem, and STILE.",
  },
  {
    title: "Zero-Pressure Consultations & Certified Installers",
    body: "Honest guidance, fraction-of-an-inch precision measurement, and WA licensed, bonded, and insured installation crews.",
  },
];

export function WhyChooseSoundView({ layout = "section" }: { layout?: "section" | "hero" }) {
  if (layout === "hero") {
    return (
      <div className="rounded-2xl border border-white/15 bg-[#2B3E50]/85 p-5 shadow-xl sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
          Why Choose Sound View
        </p>
        <h2 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">
          Trusted Local Craftsmanship Across Greater Seattle
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {heroPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-xl border border-white/10 bg-[#1E2E3E]/80 p-3.5"
            >
              <h3 className="text-sm font-bold leading-snug text-white">{pillar.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="why-choose-sound-view"
      className="border-t border-white/10 bg-home-canvas py-16 text-[#E7EEF3] md:py-20"
      style={{ paddingTop: "64px", paddingBottom: "64px" }}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">
            Why Choose Sound View
          </p>
          <h2
            id="why-choose-sound-view"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Trusted Local Craftsmanship Across Greater Seattle
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-xl border border-white/15 bg-[#2B3E50]/85 p-6"
            >
              <h3 className="mb-3 text-lg font-bold leading-snug text-white">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const serviceAreas = [
  "Auburn",
  "Ballard",
  "Bellevue",
  "Black Diamond",
  "Bothell",
  "Brier",
  "Burien",
  "Carnation",
  "Covington",
  "Des Moines",
  "Duvall",
  "Edmonds",
  "Everett",
  "Fall City",
  "Federal Way",
  "Issaquah",
  "Kenmore",
  "Kent",
  "Kirkland",
  "Lynnwood",
  "Magnolia",
  "Maple Valley",
  "Medina",
  "Mercer Island",
  "Mill Creek",
  "Monroe",
  "Mountlake Terrace",
  "Newcastle",
  "Normandy Park",
  "Ravensdale",
  "Redmond",
  "Renton",
  "Sammamish",
  "SeaTac",
  "Seattle",
  "Shoreline",
  "Snoqualmie",
  "Tukwila",
  "West Seattle",
  "Woodinville",
];

export function ServiceAreasSection() {
  return (
    <section
      aria-labelledby="service-areas-title"
      className="border-b border-slate-200/80 bg-[#F4F6F9] py-16 md:py-20"
      style={{ backgroundColor: "#F4F6F9", paddingTop: "72px", paddingBottom: "72px" }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0284C7]">
          Greater Puget Sound Coverage
        </p>
        <h2
          id="service-areas-title"
          className="mb-3 mt-2 text-3xl font-bold text-[#0B192C] sm:text-4xl"
        >
          Our Service Areas
        </h2>
        <p className="max-w-3xl text-base text-slate-600">
          Sound View Window & Door provides precision measurement, product consultation,
          and certified installation across King and Snohomish Counties, including:
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4">
          {serviceAreas.map((area) => (
            <li
              key={area}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-xs"
            >
              <MapPinIcon />
              <span className="text-sm font-semibold text-[#0B192C]">{area}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-[#0284C7]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 17.5s5.5-4.1 5.5-8.1A5.5 5.5 0 0 0 4.5 9.4c0 4 5.5 8.1 5.5 8.1Z"
      />
      <circle cx="10" cy="9.2" r="1.7" />
    </svg>
  );
}

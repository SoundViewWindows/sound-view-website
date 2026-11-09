import Link from "next/link";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const showrooms = [
  {
    name: "Lake City",
    href: "/showrooms/lake-city",
    phone: "(206) 572-3411",
    phoneHref: "tel:2065723411",
  },
  {
    name: "West Queen Anne",
    href: "/showrooms/west-queen-anne",
    phone: "(206) 402-4229",
    phoneHref: "tel:2064024229",
  },
  {
    name: "Bellevue",
    href: "/showrooms/bellevue",
    phone: "(425) 417-3005",
    phoneHref: "tel:4254173005",
    note: "By appointment only",
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#07111E]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-base font-bold text-white">Sound View Window & Door</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
            Replacement windows, doors, and custom glass for the Greater Seattle
            Area. 17+ years in the Pacific Northwest.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Showrooms</p>
          <ul className="mt-3 space-y-3">
            {showrooms.map((showroom) => (
              <li key={showroom.name}>
                <Link href={showroom.href} className={`text-sm text-slate-400 hover:text-sky-400 ${focusRing}`}>
                  {showroom.name}
                </Link>
                {showroom.note ? (
                  <span className="mt-0.5 block text-xs text-slate-400">{showroom.note}</span>
                ) : null}
                <a
                  href={showroom.phoneHref}
                  className={`mt-0.5 block text-sm font-semibold text-sky-400 hover:text-sky-300 ${focusRing}`}
                >
                  {showroom.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Explore</p>
          <ul className="mt-3 space-y-2">
            {[
              ["Services", "/services/window-replacement/materials"],
              ["Portfolio", "/portfolio"],
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Financing", "/financing"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className={`text-sm text-slate-400 hover:text-sky-400 ${focusRing}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          Sound View Window & Door. Serving the Greater Seattle Area.
        </p>
      </div>
    </footer>
  );
}

const navLinks = [
  { href: "#replacement-windows", label: "Replacement Windows" },
  { href: "#replacement-doors", label: "Replacement Doors" },
  { href: "#shower-doors", label: "Shower Doors" },
  { href: "#glass-replacement", label: "Glass Replacement" },
  { href: "#about", label: "About" },
  { href: "#financing", label: "Financing" },
  { href: "#showrooms", label: "Showrooms" },
];

const services = [
  {
    id: "replacement-windows",
    title: "Replacement Windows",
    body: "High-performance windows fitted to the openings in your home. We talk through glass, frames, and style, then recommend what will hold up in Pacific Northwest weather.",
  },
  {
    id: "replacement-doors",
    title: "Replacement Doors",
    body: "Entry doors, patio doors, and sliders chosen for security, daylight, and daily use. Each opening is measured carefully and installed by a local crew.",
  },
  {
    id: "custom-glass",
    title: "Custom Glass & Shower Doors",
    body: "Shower enclosures and replacement glass shaped to the room. We explain glass type, hardware, and how the piece will live in your home before any work begins.",
  },
];

function NavLinks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="whitespace-nowrap text-sm tracking-wide text-[#1B2A4A]/80 transition-colors hover:text-[#0F172A]"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div id="top" className="bg-[#FAF8F5] text-[#1B2A4A]">
      <header className="border-b border-[#1B2A4A]/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 py-5">
            <a
              href="#top"
              className="font-serif text-lg leading-tight tracking-tight text-[#0F172A] sm:text-xl"
            >
              <span className="block">Sound View</span>
              <span className="block">Window & Door</span>
            </a>
            <a
              href="#consultation"
              className="shrink-0 rounded-full bg-[#1B2A4A] px-5 py-3 text-sm font-medium tracking-wide text-[#FAF8F5] transition-colors hover:bg-[#0F172A]"
            >
              Request a Consultation
            </a>
          </div>
          <nav
            aria-label="Primary"
            className="hidden border-t border-[#1B2A4A]/10 py-4 lg:block"
          >
            <NavLinks className="flex flex-wrap items-center gap-x-8 gap-y-3" />
          </nav>
          <details className="border-t border-[#1B2A4A]/10 py-4 lg:hidden">
            <summary className="cursor-pointer text-sm tracking-wide text-[#1B2A4A]">
              Menu
            </summary>
            <nav aria-label="Mobile" className="pt-4">
              <NavLinks className="flex flex-col gap-3" />
            </nav>
          </details>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1B2A4A]/70">
            Greater Seattle Area
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.08] tracking-tight text-[#0F172A] sm:text-6xl">
            High-performance windows and doors for Pacific Northwest homes
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#1B2A4A]/85">
            Sound View Window & Door helps homeowners replace windows, doors,
            and custom glass. The products are engineered for the rain, wind,
            and long seasons of the Pacific Northwest, and the process stays
            consultative and low-pressure across the Greater Seattle Area.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#consultation"
              className="inline-flex items-center justify-center rounded-full bg-[#1B2A4A] px-6 py-3.5 text-sm font-medium tracking-wide text-[#FAF8F5] transition-colors hover:bg-[#0F172A]"
            >
              Request a Consultation
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-[#1B2A4A]/20 px-6 py-3.5 text-sm font-medium tracking-wide text-[#1B2A4A] transition-colors hover:bg-[#F3EFEA]"
            >
              View services
            </a>
          </div>
        </section>

        <section
          id="services"
          className="border-t border-[#1B2A4A]/10 bg-[#F3EFEA]"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-28">
            <h2 className="font-serif text-4xl tracking-tight text-[#0F172A]">
              What we install
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#1B2A4A]/85">
              Three core offerings, each planned around the house you already
              have. We start with the opening, the exposure, and how you use
              the room.
            </p>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  className="flex flex-col justify-between rounded-2xl bg-[#FAF8F5] p-8 shadow-[0_1px_0_rgba(27,42,74,0.06)]"
                >
                  <h3 className="font-serif text-2xl tracking-tight text-balance text-[#0F172A]">
                    {service.title}
                  </h3>
                  <p className="mt-6 text-base leading-7 text-[#1B2A4A]/85">
                    {service.body}
                  </p>
                </article>
              ))}
            </div>
            <div
              id="shower-doors"
              className="mt-6 scroll-mt-24 rounded-2xl border border-[#1B2A4A]/10 bg-[#FAF8F5]/70 px-8 py-6"
            >
              <p id="glass-replacement" className="scroll-mt-28 leading-7">
                <span className="font-medium text-[#0F172A]">
                  Shower doors and glass replacement.
                </span>{" "}
                Frameless and framed shower enclosures, plus glass replaced in
                existing windows and doors. We measure on site and talk through
                the options before you decide.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-t border-[#1B2A4A]/10">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
            <p className="font-serif text-6xl tracking-tight text-[#0F172A] sm:text-7xl">
              17+
            </p>
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-[#0F172A] sm:text-4xl">
                Years of local craftsmanship and specialized installation
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1B2A4A]/85">
                Sound View has spent more than 17 years in the Pacific
                Northwest helping homeowners choose windows, doors, and glass.
                Installation is handled by people who know how these homes are
                built, and how the weather treats them.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1B2A4A]/10 bg-[#F3EFEA]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
            <article id="financing" className="scroll-mt-24">
              <h2 className="font-serif text-3xl tracking-tight text-[#0F172A]">
                Financing
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#1B2A4A]/85">
                Payment options can be part of the consultation. We explain
                what is available for the scope of your project and leave the
                decision with you.
              </p>
            </article>
            <article id="showrooms" className="scroll-mt-24">
              <h2 className="font-serif text-3xl tracking-tight text-[#0F172A]">
                Showrooms
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#1B2A4A]/85">
                See frames, hardware, and glass in person at a showroom in the
                Greater Seattle Area. We will help you plan a visit that
                matches the rooms you want to update.
              </p>
            </article>
          </div>
        </section>

        <section
          id="consultation"
          className="scroll-mt-24 border-t border-[#1B2A4A]/10"
        >
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-28">
            <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-[#0F172A] sm:text-5xl">
              Request a consultation
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1B2A4A]/85">
              Tell us about the windows, doors, or glass you are considering.
              We will schedule a conversation, look at the openings, and walk
              through clear options. There is no pressure to buy.
            </p>
            <a
              href="#consultation"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#1B2A4A] px-6 py-3.5 text-sm font-medium tracking-wide text-[#FAF8F5] transition-colors hover:bg-[#0F172A]"
            >
              Request a Consultation
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1B2A4A]/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-[#1B2A4A]/70 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
          <p>Sound View Window & Door</p>
          <p>Greater Seattle Area · 17+ years in the Pacific Northwest</p>
        </div>
      </footer>
    </div>
  );
}

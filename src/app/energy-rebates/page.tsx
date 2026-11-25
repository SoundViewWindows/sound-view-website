import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { PhotographicHero, heroPrimaryClass, heroSecondaryClass } from "@/components/PhotographicHero";
import { QuoteDrawerButton, QuoteSlideIn } from "@/components/QuoteSlideIn";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.rebates),
  },
  title: "Energy Rebates | Sound View Window & Door",
  description:
    "Local utility rebates and incentives for energy-efficient replacement windows and patio doors in Washington.",
};

const providers = [
  {
    title: "Puget Sound Energy",
    tagline: "ELECTRIC & NATURAL GAS CUSTOMERS",
    description:
      "Offers substantial rebates per square foot or per window unit for qualifying high-efficiency window and door replacements across King, Pierce, and Snohomish counties.",
    points: [
      "Rebates calculated per square foot or qualifying window unit",
      "Requires qualifying primary electric or PSE natural gas heat",
      "Must meet current PSE U-Factor and ENERGY STAR specifications",
    ],
    cta: "View PSE Window Rebates",
    href: "https://www.pse.com/en/rebates/windows-rebates",
  },
  {
    title: "Tacoma Public Utilities",
    tagline: "TACOMA POWER CUSTOMERS",
    description:
      "Provides incentives for residential window upgrades meeting strict U-Factor thresholds when replacing single-pane or uninsulated windows.",
    points: [
      "Designed for homes replacing single-pane or metal-frame windows",
      "Requires Tacoma Power electric heat and strict U-Factor ratings",
      "Must be installed by a participating contractor with itemized invoices",
    ],
    cta: "View TPU Window Rebates",
    href: "https://www.mytpu.org/ways-to-save/for-my-home/heating-cooling/windows/",
  },
  {
    title: "Avista Utilities",
    tagline: "WASHINGTON SERVICE TERRITORIES",
    description:
      "Incentive programs for weatherization, high-efficiency window packages, and thermal boundary improvements.",
    points: [
      "Covers qualifying high-efficiency window upgrades in Washington service areas",
      "Available for homes with qualifying electric or natural gas heating",
      "Requires NFRC-rated glazing meeting Avista thermal guidelines",
    ],
    cta: "View Avista Rebates",
    href: "https://www.myavista.com/energy-savings/rebates-washington",
  },
];

const qualifications = [
  {
    title: "ENERGY STAR Most Efficient",
    text: "High-performance Low-E glass packages engineered for Pacific Northwest climate zones.",
  },
  {
    title: "NFRC & Tax Credit Paperwork",
    text: "Itemized invoices and NFRC certification stickers provided for federal 25C and utility filings.",
  },
  {
    title: "Free Rebate Eligibility Check",
    text: "We verify which PSE, TPU, Avista, and federal incentives apply to your home before you order.",
  },
];

const steps = [
  {
    number: "01",
    heading: "Identify Your Utility Provider",
    text: "Confirm which company provides the relevant electricity or natural gas service to your home.",
  },
  {
    number: "02",
    heading: "Review the Requirements",
    text: "Check the provider's current eligibility rules, including any requirements for existing windows, replacement products, heating systems, home type, and installation.",
  },
  {
    number: "03",
    heading: "Confirm Eligibility",
    text: "Contact the utility provider to confirm whether your planned project qualifies and whether any application or preapproval is required before work begins.",
  },
  {
    number: "04",
    heading: "Keep Your Documentation",
    text: "Follow the provider's instructions for invoices, product specifications, installation records, and any other required documentation.",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export default function EnergyRebatesPage() {
  return (
    <div className="flex flex-1 flex-col bg-white text-[#0B192C]">
      <Header />
      <QuoteSlideIn id="energy-rebates-quote" formName="energy-rebates-quote" />
      <main className="flex-1">
        <PhotographicHero
          image="/images/hero-bg.jpg"
          eyebrow="Seattle & Puget Sound Energy Rebates"
          title="Claim Up to $600 in Federal Tax Credits & Local Utility Window Rebates"
          lead="Puget Sound Energy, Tacoma Public Utilities, and Avista offer local incentives for qualifying window and door replacements. A Sound View specialist checks eligibility before you order."
          actions={
            <>
              <QuoteDrawerButton className={heroPrimaryClass}>Check Rebate Eligibility</QuoteDrawerButton>
              <a href="/showrooms" className={heroSecondaryClass}>Explore Showrooms</a>
            </>
          }
          cards={[
            {
              title: "Utility Rebates",
              body: "Local electric and gas programs pay per qualifying window or door when the product meets their ratings.",
            },
            {
              title: "Federal 25C Credit",
              body: "ENERGY STAR Most Efficient windows can qualify for a 30% credit, up to $600 per year, on a primary home.",
            },
            {
              title: "Installed by Sound View",
              body: "We document the product ratings and install so your rebate paperwork matches the openings.",
            },
          ]}
        />
        <section id="utility-rebates" className="bg-white py-14 lg:py-16" style={{ backgroundColor: "#FFFFFF", color: "#0F1D2E" }}>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0284C7]">
                  Energy Rebates &amp; Tax Credits for Windows &amp; Doors
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F1D2E] sm:text-4xl">Local utility programs</h2>
              </div>
              <span className="text-sm text-[#556980]">Greater Seattle Utility &amp; Federal 25C Incentives</span>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
              {providers.map((provider) => (
                <a
                  key={provider.title}
                  href={provider.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-sky-400 hover:shadow-md ${focusRing}`}
                >
                  <div>
                    <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                      {provider.tagline}
                    </p>
                    <h3 className="text-xl font-bold text-[#0F1D2E] transition-colors group-hover:text-[#0284C7]">
                      {provider.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#556980]">{provider.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-[#334155]">
                      {provider.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-slate-100 pt-4 text-sm font-semibold text-[#0284C7] group-hover:text-[#0F1D2E]">
                    {provider.cta}
                    <ExternalLinkIcon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0F1D2E] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                Federal Tax Incentive (Section 25C)
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Up to $600 Annual Federal Tax Credit on Qualifying Windows
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
                Windows and skylights meeting ENERGY STAR Most Efficient criteria can qualify for a 30% federal tax credit (up to $600 per year) when installed in your primary residence.
              </p>
            </div>
            <span className="shrink-0 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-[#38BDF8]">
              ENERGY STAR Most Efficient Certified
            </span>
          </div>
        </section>

        <section className="bg-[#f4fafd]" style={{ backgroundColor: "#F4FAFD", color: "#0F1D2E" }}>
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#608b9e]">
              Included With Every Sound View Energy Upgrade
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {qualifications.map((item) => (
                <div key={item.title}>
                  <p className="flex items-start gap-2 text-base font-bold text-[#0c1f38]">
                    <CheckIcon />
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#556980] sm:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pt-16 pb-20 text-[#0B192C] md:pt-20 md:pb-24" style={{ backgroundColor: "#FFFFFF", color: "#0B192C" }}>
          <h2 className="mb-3 text-center text-3xl font-bold text-[#0B192C] sm:text-4xl">
            Before You Start Your Project
          </h2>
          <span aria-hidden="true" className="mx-auto mb-10 block h-1 w-10 rounded-[4px] bg-[#0284C7]" />
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-[#f4fafd] p-6"
              >
                <p className="mb-1 text-xl font-extrabold text-[#0284C7]">{step.number}</p>
                <h3 className="mb-2 block text-base font-bold text-[#0B192C] sm:text-lg">{step.heading}</h3>
                <p className="text-sm font-normal leading-relaxed text-[#556980]">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

      </main>
      <footer className="border-t border-slate-100 bg-white px-4 py-8 text-center text-xs text-slate-400 sm:text-sm">
        <p>© 2026 Sound View Window &amp; Door. All Rights Reserved.</p>
      </footer>
      <CtaBanner
        quoteDrawer
        className="bg-[#0F1D2E] py-16 text-white md:py-20 [&_h2]:text-white [&_p]:text-slate-300"
        style={{
          backgroundColor: "#0F1D2E",
          paddingTop: "64px",
          paddingBottom: "64px",
          borderTop: "none",
        }}
      />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 10.5 3.2 3.2L15 6.5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 5H5.5A1.5 1.5 0 0 0 4 6.5v8A1.5 1.5 0 0 0 5.5 16h8a1.5 1.5 0 0 0 1.5-1.5V12"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 10 16 4m0 0h-4.5M16 4v4.5" />
    </svg>
  );
}

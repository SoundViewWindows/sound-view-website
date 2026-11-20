import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { EnergyRebatesQuoteSidebar } from "./quote-sidebar";

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
    cta: "View PSE Window Rebates",
    href: "https://www.pse.com/en/rebates/windows-rebates",
  },
  {
    title: "Tacoma Public Utilities",
    tagline: "TACOMA POWER CUSTOMERS",
    description:
      "Provides incentives for residential window upgrades meeting strict U-Factor thresholds when replacing single-pane or uninsulated windows.",
    cta: "View TPU Window Rebates",
    href: "https://www.mytpu.org/ways-to-save/for-my-home/heating-cooling/windows/",
  },
  {
    title: "Avista Utilities",
    tagline: "WASHINGTON SERVICE TERRITORIES",
    description:
      "Incentive programs for weatherization, high-efficiency window packages, and thermal boundary improvements.",
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
      <main className="flex-1">
        <section className="flex flex-col lg:flex-row">
          <div className="relative flex flex-1 flex-col overflow-hidden bg-[#0F1D2E] pb-8 pl-4 pr-4 pt-8 text-white sm:pl-6 sm:pr-6 lg:pb-10 lg:pl-10 lg:pr-10 lg:pt-10 xl:pl-16">
            <div className="pointer-events-none absolute inset-0 z-0 select-none">
              <img
                src="/images/hero-bg.jpg"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/65 via-[#0F1D2E]/45 to-[#0F1D2E]/65" />
            </div>
            <div className="relative z-10 flex h-full flex-1 flex-col gap-5 lg:gap-6">
            <div className="flex flex-col gap-5 rounded-2xl border border-slate-700/80 bg-[#152538]/90 px-7 py-6 backdrop-blur-xs sm:px-8 sm:py-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
                  <ol className="flex flex-wrap items-center gap-2">
                    <li>
                      <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                        Home
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span aria-hidden="true">&gt;</span>
                      <span aria-current="page">Energy Rebates</span>
                    </li>
                  </ol>
                </nav>
                <p className="text-xs font-bold tracking-wider text-[#38BDF8]">
                  REBATES &amp; TAX CREDITS
                </p>
                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  Energy Rebates &amp; Tax Credits for Windows &amp; Doors
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  See which ENERGY STAR rated windows and doors qualify for federal tax credits and Greater Seattle utility incentives.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/book-appointment"
                  className={`inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-2.5 font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
                >
                  Book an Energy Consultation
                </Link>
                <a
                  href="tel:+12063314296"
                  className={`inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 font-bold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`}
                >
                  Call (206) 331-4296
                </a>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-3">
              {providers.map((provider) => (
                <a
                  key={provider.title}
                  href={provider.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#152538]/90 p-6 shadow-xl backdrop-blur-xs transition-shadow hover:shadow-2xl sm:p-7 ${focusRing}`}
                >
                  <div>
                    <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                      {provider.tagline}
                    </p>
                    <h2 className="text-xl font-bold text-white transition-colors group-hover:text-[#38BDF8] sm:text-[22px]">
                      {provider.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{provider.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-slate-700/60 pt-4 text-sm font-semibold text-[#38BDF8] hover:text-sky-300">
                    {provider.cta}
                    <ExternalLinkIcon />
                  </span>
                </a>
              ))}
            </div>
            <div className="rounded-2xl border border-slate-700/80 bg-[#152538]/90 px-7 py-6 backdrop-blur-xs sm:px-8 sm:py-7">
              <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                Included With Every Sound View Energy Upgrade
              </p>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                {qualifications.map((item) => (
                  <div key={item.title}>
                    <p className="flex items-start gap-2 text-sm font-bold text-white">
                      <CheckIcon />
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-[13px]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
          <EnergyRebatesQuoteSidebar />
        </section>

        <section className="bg-slate-50 pt-16 pb-20 text-[#0B192C] md:pt-20 md:pb-24">
          <h2 className="mb-3 text-center text-3xl font-bold text-[#0B192C] sm:text-4xl">
            Before You Start Your Project
          </h2>
          <span aria-hidden="true" className="mx-auto mb-10 block h-1 w-10 rounded-[4px] bg-[#0284C7]" />
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-[4px] border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <p className="mb-1 text-xl font-extrabold text-[#0284C7]">{step.number}</p>
                <h3 className="mb-2 block text-base font-bold text-[#0B192C] sm:text-lg">{step.heading}</h3>
                <p className="text-sm font-normal leading-relaxed text-[#556980]">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-[4px] border border-slate-200/90 bg-[#F8FAFC] p-8 text-center shadow-sm sm:p-10">
              <span
                aria-hidden="true"
                className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#0284C7] text-lg font-bold text-white"
              >
                i
              </span>
              <h2 className="mb-2 text-2xl font-bold text-[#0B192C]">Please Confirm Program Details</h2>
              <span aria-hidden="true" className="mx-auto mb-6 block h-0.5 w-12 bg-[#0284C7]" />
              <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600">
                Rebate availability, eligibility requirements, incentive amounts, and
                application deadlines can change. Programs may require specific
                products, existing window types, qualifying heating systems, approved
                contractors, or advance approval. Check the current requirements
                directly with your provider before making purchasing or installation
                decisions. Sound View Window &amp; Door cannot guarantee that a
                particular project or product will qualify for a utility rebate.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-100 bg-white px-4 py-8 text-center text-xs text-slate-400 sm:text-sm">
        <p>© 2026 Sound View Window &amp; Door. All Rights Reserved.</p>
      </footer>
      <CtaBanner
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

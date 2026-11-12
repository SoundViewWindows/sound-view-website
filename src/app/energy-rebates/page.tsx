import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/energy-rebates"),
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
        <section className="bg-[#0B192C]">
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className={`rounded-sm hover:text-white ${focusRing}`}>
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <span>Resources</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <span aria-current="page">Energy Rebates</span>
                </li>
              </ol>
            </nav>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-400">
              Local Utility Incentives
            </p>
            <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight text-white lg:text-5xl">
              Save on Energy-Efficient Windows &amp; Doors in Washington
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Upgrading to high-performance windows and patio doors can significantly
              lower heating costs in the Pacific Northwest. Local utility providers
              offer cash rebates and incentives to homeowners installing qualifying
              energy-efficient products.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {providers.map((provider) => (
              <a
                key={provider.title}
                href={provider.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-shadow hover:shadow-md sm:p-8 ${focusRing}`}
              >
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0090c8]">
                    {provider.tagline}
                  </p>
                  <h2 className="mb-3 text-2xl font-bold text-[#0B192C] transition-colors group-hover:text-[#0090c8]">
                    {provider.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#556980]">{provider.description}</p>
                </div>
                <span className="mt-8 inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#0090c8] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#007fb1]">
                  {provider.cta}
                  <ExternalLinkIcon />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-[#F4FAFD] pb-4">
          <h2 className="mb-3 text-center text-3xl font-bold text-[#0B192C] sm:text-4xl">
            Before You Start Your Project
          </h2>
          <span aria-hidden="true" className="mx-auto mb-10 block h-1 w-10 rounded bg-[#0090c8]" />
          <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md"
              >
                <p className="mb-1 text-xl font-extrabold text-[#0090c8]">{step.number}</p>
                <h3 className="mb-2 block text-base font-bold text-[#0B192C] sm:text-lg">{step.heading}</h3>
                <p className="text-sm font-normal leading-relaxed text-[#556980]">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto mb-16 max-w-4xl px-4 sm:px-6">
            <div className="rounded-2xl border border-sky-100 bg-[#F4FAFD] p-8 text-center shadow-md sm:p-10">
              <span
                aria-hidden="true"
                className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0090c8] text-lg font-bold text-white"
              >
                i
              </span>
              <h2 className="mb-2 text-2xl font-bold text-[#0B192C]">Please Confirm Program Details</h2>
              <span aria-hidden="true" className="mx-auto mb-6 block h-0.5 w-12 bg-[#0090c8]" />
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
        <CtaBanner />
      </main>
      <footer className="border-t border-slate-100 bg-white px-4 py-8 text-center text-xs text-slate-400 sm:text-sm">
        <p>© 2026 Sound View Window &amp; Door. All Rights Reserved.</p>
      </footer>
    </div>
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

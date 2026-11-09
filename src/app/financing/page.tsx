import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Financing | Sound View Window & Door",
  description:
    "Flexible Synchrony Bank financing for replacement windows, doors, and custom glass in the Greater Seattle Area.",
};

const synchronyHref = "https://www.synchrony.com/mmc/AO166613500";

const verificationItems = [
  "Synchrony Account Number",
  "Full Name (as it appears on the Synchrony account)",
  "Date of Birth (of the primary account holder)",
  "Your Chosen Financing Plan (e.g., 18 Months Deferred Interest, Reduced interest, etc.)",
];

export default function FinancingPage() {
  return (
    <div className="bg-[#0B192C] text-slate-100">
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span>Resources</span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <span aria-current="page">Financing</span>
              </li>
            </ol>
          </nav>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            Payment Options & Plans
          </p>
          <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight text-white lg:text-5xl">
            Flexible Financing for Your Pacific Northwest Home
          </h1>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Sound View Window & Door partners with Synchrony Bank to offer
            competitive, straightforward financing solutions with convenient
            monthly payments so you can complete your project without
            compromise.
          </p>
          <a
            href={synchronyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            Apply for Financing
            <ExternalLinkIcon />
          </a>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-3xl font-bold text-white sm:text-4xl">
            Your Financing Checklist
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-base text-slate-300 sm:text-lg">
            Follow these simple, straightforward steps to secure your financing
            plan and proceed seamlessly with your project setup.
          </p>
          <div className="mx-auto max-w-4xl space-y-6">
            <article className="rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-sm sm:p-8">
              <CheckBadge />
              <h3 className="mb-2 mt-4 text-xl font-bold text-slate-900">1. Apply</h3>
              <p className="text-base leading-7 text-slate-300">
                First, you must apply for a credit line directly through Synchrony
                to secure your account.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-slate-300">
                <li>
                  The Process: Complete the Synchrony application form. Once
                  approved, you will be issued a Synchrony Account Number. Please
                  save this number immediately.
                </li>
              </ul>
              <a
                href={synchronyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-semibold tracking-wide text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                APPLY FOR FINANCING
                <ExternalLinkIcon />
              </a>
            </article>

            <article className="rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-sm sm:p-8">
              <CheckBadge />
              <h3 className="mb-2 mt-4 text-xl font-bold text-slate-900">
                2. Notify Your Sales Representative
              </h3>
              <p className="text-base leading-7 text-slate-300">
                Once you have your account number, contact your Sales rep to
                update your project terms.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-slate-300">
                <li>
                  Provide your info: Give your rep your new Synchrony Account
                  Number.
                </li>
                <li>
                  Quote Adjustment: Your rep will manually update your project
                  quote to remove the standard deposit requirement, as Synchrony
                  will be used for the funding.
                </li>
                <li>
                  Resending the Quote: Your rep will then resend the updated
                  quote to you for your digital signature.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-sm sm:p-8">
              <CheckBadge />
              <h3 className="mb-2 mt-4 text-xl font-bold text-slate-900">
                3. Review And Sign Your Quote
              </h3>
              <p className="text-base leading-7 text-slate-300">
                After your rep resends the quote, you must authorize the new
                terms.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-slate-300">
                <li>
                  Review: Look for an email notification that your quote has been
                  updated. Log in to our portal to confirm the deposit has been
                  removed ($0.00 deposit due).
                </li>
                <li>Sign: Approve and digitally sign the updated quote online.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-700/80 bg-[#132238] p-6 shadow-sm sm:p-8">
              <CheckBadge />
              <h3 className="mb-2 mt-4 text-xl font-bold text-slate-900">
                4. Provide Final Verification Details
              </h3>
              <p className="text-base leading-7 text-slate-300">
                To finalize the connection between your Synchrony account and
                your project, we require a few specific details for the
                lender&apos;s secure portal. You can provide these to your rep via
                phone or email.
              </p>
              <p className="mt-5 rounded-xl border border-[#94734D]/40 bg-[#132238] px-4 py-3 text-sm leading-6 text-slate-100">
                Important: You do NOT select your financing plan online during
                the initial application. We process your plan selection on our
                end during this final step.
              </p>
              <p className="mb-3 mt-5 text-base font-medium text-slate-900">
                Please provide the following to your Sales Rep:
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-base leading-7 text-slate-300">
                {verificationItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="border-t border-slate-700 bg-[#132238]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Questions About Your Financing?
              </h2>
              <span
                aria-hidden="true"
                className="mt-4 block h-1 w-16 rounded-full bg-[#94734D]"
              />
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Our team can help you understand the next steps and coordinate
                the necessary updates to your project quote.
              </p>
              <a
                href="tel:2064024229"
                className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <PhoneIcon />
                (206) 402-4229
              </a>
            </div>
            <div className="rounded-2xl border border-slate-700/80 bg-[#132238] p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-white">
                Start a Conversation
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-300">
                We are ready to design a tailored financing roadmap that
                perfectly fits your home improvement goals.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-semibold tracking-wide text-[#0B192C] transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                CONTACT SOUND VIEW
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 10.5 3.2 3.2L15 7" />
      </svg>
    </span>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H5.5A1.5 1.5 0 0 0 4 6.5v8A1.5 1.5 0 0 0 5.5 16h8a1.5 1.5 0 0 0 1.5-1.5V12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 10 16 4m0 0h-4.5M16 4v4.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.2 3.5h2.1l1 2.6-1.3 1.1a11 11 0 0 0 4.8 4.8l1.1-1.3 2.6 1v2.1a1.4 1.4 0 0 1-1.5 1.4A13.4 13.4 0 0 1 4.8 5a1.4 1.4 0 0 1 1.4-1.5Z"
      />
    </svg>
  );
}

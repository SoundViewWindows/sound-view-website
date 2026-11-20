import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { FinancingQuoteSidebar } from "./financing-quote-sidebar";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.financing),
  },
  title: "Financing | Sound View Window & Door",
  description:
    "Flexible Synchrony Bank financing for replacement windows, doors, and custom glass in the Greater Seattle Area.",
};

const synchronyHref = "https://www.synchrony.com/mmc/AO166613500";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const verificationItems = [
  "Synchrony Account Number",
  "Full Name (as it appears on the Synchrony account)",
  "Date of Birth (of the primary account holder)",
  "Your Chosen Financing Plan (e.g., 18 Months Deferred Interest, Reduced interest, etc.)",
];

export default function FinancingPage() {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <main>
        <section className="relative bg-[#0F1D2E] text-white">
          <div className="pointer-events-none absolute inset-0 z-0 select-none">
            <img
              src="/images/hero-bg.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D2E]/65 via-[#0F1D2E]/45 to-[#0F1D2E]/65" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-stretch">
            <div className="min-w-0 flex-1 py-8 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:py-10 lg:pl-10 lg:pr-10 xl:pl-16">
            <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-slate-700/80 bg-[#152538]/90 px-6 py-5 backdrop-blur-xs sm:px-8 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
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
                      <span aria-current="page">Financing</span>
                    </li>
                  </ol>
                </nav>
                <p className="text-xs font-bold tracking-wider text-[#38BDF8]">
                  FINANCING & PAYMENT OPTIONS
                </p>
                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  Your Financing Checklist
                </h1>
                <p className="mt-1.5 text-sm text-slate-300">
                  Explore monthly payment plans and simple pre-qualification options built to fit your window, door, or glass project budget.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/book-appointment"
                  className={`rounded-lg bg-[#38BDF8] px-5 py-2.5 font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
                >
                  Book a Consultation
                </Link>
                <a
                  href="tel:+12063314296"
                  className={`rounded-lg bg-white px-5 py-2.5 font-bold text-[#0F1D2E] transition-colors hover:bg-slate-100 ${focusRing}`}
                >
                  Call (206) 331-4296
                </a>
              </div>
            </div>

            <div className="w-full space-y-5">
              <article className="rounded-2xl border border-slate-700/80 bg-[#152538]/90 p-6 shadow-xl backdrop-blur-xs sm:p-8">
                <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                <CheckBadge />
                <h2 className="mb-2 mt-4 text-lg font-bold text-white sm:text-xl">1. Apply</h2>
                <p className="text-sm font-normal leading-relaxed text-slate-300">
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
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
                >
                  APPLY FOR FINANCING
                  <ExternalLinkIcon />
                </a>
              </article>

              <article className="rounded-2xl border border-slate-700/80 bg-[#152538]/90 p-6 shadow-xl backdrop-blur-xs sm:p-8">
                <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                <CheckBadge />
                <h2 className="mb-2 mt-4 text-lg font-bold text-white sm:text-xl">
                  2. Notify Your Sales Representative
                </h2>
                <p className="text-sm font-normal leading-relaxed text-slate-300">
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

              <article className="rounded-2xl border border-slate-700/80 bg-[#152538]/90 p-6 shadow-xl backdrop-blur-xs sm:p-8">
                <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                <CheckBadge />
                <h2 className="mb-2 mt-4 text-lg font-bold text-white sm:text-xl">
                  3. Review And Sign Your Quote
                </h2>
                <p className="text-sm font-normal leading-relaxed text-slate-300">
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

              <article className="rounded-2xl border border-slate-700/80 bg-[#152538]/90 p-6 shadow-xl backdrop-blur-xs sm:p-8">
                <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-[#38BDF8]" />
                <CheckBadge />
                <h2 className="mb-2 mt-4 text-lg font-bold text-white sm:text-xl">
                  4. Provide Final Verification Details
                </h2>
                <p className="text-sm font-normal leading-relaxed text-slate-300">
                  To finalize the connection between your Synchrony account and
                  your project, we require a few specific details for the
                  lender&apos;s secure portal. You can provide these to your rep via
                  phone or email.
                </p>
                <p className="mt-5 rounded-2xl border border-slate-700/80 bg-[#0F1D2E]/70 px-4 py-3 text-sm leading-6 text-slate-300">
                  Important: You do NOT select your financing plan online during
                  the initial application. We process your plan selection on our
                  end during this final step.
                </p>
                <p className="mb-3 mt-5 text-lg font-bold text-white">
                  Please provide the following to your Sales Rep:
                </p>
                <ol className="list-decimal space-y-2 pl-5 text-base leading-7 text-slate-300">
                  {verificationItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </article>
            </div>
            </div>
            <FinancingQuoteSidebar />
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0B192C] sm:text-4xl">
                Questions About Your Financing?
              </h2>
              <span
                aria-hidden="true"
                className="mt-4 block h-1 w-16 rounded-[4px] bg-[#38BDF8]"
              />
              <p className="mt-5 max-w-xl text-base leading-7 text-[#556980] sm:text-lg">
                Our team can help you understand the next steps and coordinate
                the necessary updates to your project quote.
              </p>
              <a
                href="tel:2064024229"
                className={`mt-6 inline-flex items-center gap-2 text-lg font-semibold text-[#38BDF8] underline-offset-4 hover:text-sky-300 hover:underline ${focusRing}`}
              >
                <PhoneIcon />
                (206) 402-4229
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0B192C]">
                Start a Conversation
              </h3>
              <p className="mt-3 text-base leading-7 text-[#556980]">
                We are ready to design a tailored financing roadmap that
                perfectly fits your home improvement goals.
              </p>
              <Link
                href="/contact-us-for-window-and-door-estimates-in-seattle-wa/"
                className={`mt-6 inline-flex items-center justify-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-bold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
              >
                CONTACT SOUND VIEW
              </Link>
            </div>
          </div>
        </section>
        <CtaBanner
          className="py-16 text-white md:py-20 [&_h2]:text-white [&_p]:text-slate-300"
          style={{
            backgroundColor: "#0F1D2E",
            paddingTop: "64px",
            paddingBottom: "64px",
            borderTop: "none",
          }}
        />
      </main>
    </div>
  );
}

function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#38BDF8]/50 text-[#38BDF8]"
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

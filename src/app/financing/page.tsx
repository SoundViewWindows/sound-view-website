import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { publicPaths } from "@/lib/public-paths";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { Header } from "@/components/Header";
import { FinancingCalculator } from "@/components/FinancingCalculator";
import { QuoteSlideIn } from "@/components/QuoteSlideIn";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl(publicPaths.financing),
  },
  title: "Financing | Sound View Window & Door",
  description:
    "Monthly payment options for replacement windows, doors, and custom glass through Hearth, Sound View Window & Door's financing partner.",
};

const HEARTH_FINANCING_URL =
  "https://homeowner.gethearth.com/v1/organizations/63142/users/115199/financing?utm_campaign=63142&utm_content=general&utm_medium=custom-lp&utm_source=contractor&utm_term=115199";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

const whyItems = [
  "Loans from $1,000 to $250,000, with terms from 2 to 12 years",
  "Fixed monthly payments: no surprises, and no prepayment penalties",
  "No home equity required on personal loans",
  "One quick request shops 18+ lenders for you",
  "0% introductory APR card options for qualified buyers (6-18 months)",
  "Funds in your account as fast as 24 hours after approval",
];

const howItWorks = [
  'Tap "See my payment options" and answer a few questions (about 2 minutes, soft credit check only).',
  "Compare your real offers (monthly payment, rate, and term) from multiple lenders, side by side.",
  "Pick the option you like, finish the application with that lender, and get funded, usually within a few business days. Then we get your project scheduled.",
];

const financingQuestions = [
  {
    question: "Will checking hurt my credit?",
    answer: "No: pre-qualifying is a soft pull and does not affect your score.",
  },
  {
    question: "Do I need home equity?",
    answer: "Not for a personal loan. Larger projects can also look at HELOC options.",
  },
  {
    question: "Can I pay it off early?",
    answer: "Yes: no prepayment penalties.",
  },
  {
    question: "Who am I borrowing from?",
    answer:
      "Hearth is not a lender; it matches you with its lending partners, and your loan is with the lender you choose.",
  },
];

export default function FinancingPage() {
  return (
    <div className="bg-white text-[#0B192C]">
      <Header />
      <QuoteSlideIn id="financing-quote" formName="financing-quote" />
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
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div>
              <nav aria-label="Breadcrumb" className="text-xs text-slate-300">
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
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#38BDF8]">FINANCING</p>
              <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Pay monthly, not all at once: financing through Hearth
              </h1>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate-200">
                Sound View Window & Door partners with Hearth to bring you monthly payment options for your window and door project. See your personalized options in about two minutes: checking will not affect your credit score, and there is no obligation.
              </p>
              <a
                href={HEARTH_FINANCING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex items-center gap-2 rounded-xl bg-[#38BDF8] px-6 py-3 font-semibold text-[#0F1D2E] transition-colors hover:bg-sky-400 ${focusRing}`}
              >
                See my payment options
              </a>
            </div>

            <section className="mt-8 border-t border-white/15 pt-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#38BDF8]">
                HOW IT WORKS: 3 STEPS
              </p>
              <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {howItWorks.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-slate-200">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#38BDF8]/40 bg-[#38BDF8]/15 text-sm font-bold text-[#38BDF8]"
                    >
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-8 grid grid-cols-1 items-start gap-8 border-t border-white/15 pt-8 xl:grid-cols-12">
              <div className="space-y-8 xl:col-span-7">
                <div>
                  <p className="mb-3 text-sm font-semibold text-white">Watch: how financing works (1 minute)</p>
                  <div className="aspect-video overflow-hidden rounded-xl border border-white/20 shadow-xl">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/KxCNN1gbARM"
                      title="How financing works (1 minute)"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_190px]">
                  <div>
                    <h2 className="mb-3 text-xl font-bold text-white">Why homeowners use it</h2>
                    <ul className="space-y-2.5 text-sm text-slate-200">
                      {whyItems.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed">
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={HEARTH_FINANCING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto block w-full max-w-[190px] overflow-hidden rounded-xl border border-white/20 shadow-xl transition-all hover:scale-[1.02] hover:border-[#38BDF8]/60"
                  >
                    <img
                      src="/images/hearth-0-apr-banner.png"
                      alt="Explore 0% APR financing for your project through Hearth"
                      className="h-auto w-full"
                    />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/20 bg-[#0F1D2E]/90 p-6 shadow-2xl backdrop-blur-md xl:col-span-5">
                <FinancingCalculator financingUrl={HEARTH_FINANCING_URL} />
              </div>
            </section>

            <section className="mt-10 space-y-6 border-t border-white/15 pt-8">
              <h2 className="text-2xl font-bold text-white">Questions we hear</h2>
              <dl className="divide-y divide-white/15">
                {financingQuestions.map((item) => (
                  <div key={item.question} className="py-4">
                    <dt className="font-semibold text-white">{item.question}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-200">{item.answer}</dd>
                  </div>
                ))}
              </dl>
              <p className="pt-2 text-xs leading-relaxed text-slate-400">
                Hearth is a technology company, licensed as a broker as may be required by state law. Hearth does not accept applications for credit, does not make loans, and does not make credit decisions. All loans are subject to credit review and approval by Hearth&apos;s lending partners. Rates, terms, and amounts vary by lender and credit profile.
              </p>
            </section>
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
          quoteDrawer
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

function CheckIcon() {
  return (
    <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#38BDF8]">
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 10.5 3.2 3.2L15 7" />
      </svg>
    </span>
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

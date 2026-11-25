import Link from "next/link";

export type QuoteSelection = {
  label: string;
  name: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

const nextSteps = [
  {
    title: "Local Specialist Review",
    body: "A local Sound View estimator reviews your specs and prepares accurate upfront pricing.",
  },
  {
    title: "Precision Measurement or Showroom Visit",
    body: "Verify exact dimensions at your home or compare full-size units at Lake City, Queen Anne, or Bellevue.",
  },
  {
    title: "Clear Written Quote, Zero Pressure",
    body: "Receive an itemized estimate with factory warranty coverage and no obligation to sign on the spot.",
  },
];

export function QuoteSelectionCard({ selections }: { selections: QuoteSelection[] }) {
  return (
    <section
      aria-label="Your selected configuration"
      className="mt-4 rounded-2xl border border-white/15 bg-[#0F1D2E]/85 p-4 backdrop-blur-md sm:p-5"
    >
      <h2 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
        Your Selected Configuration
      </h2>
      <ul>
        {selections.map((selection) => (
          <li
            key={selection.label}
            className="flex items-center justify-between gap-3 border-b border-white/10 py-2 last:border-b-0"
          >
            <span className="flex min-w-0 items-center gap-3">
              <SelectionThumb image={selection.image} alt={selection.imageAlt ?? selection.name} />
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-wider text-slate-400">
                  {selection.label}
                </span>
                <span className="block truncate text-sm font-semibold text-white">{selection.name}</span>
              </span>
            </span>
            <Link
              href={selection.href}
              className="shrink-0 text-xs font-semibold text-[#38BDF8] hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WhatHappensNextCard() {
  return (
    <section
      aria-label="What happens next"
      className="mt-4 rounded-2xl border border-white/15 bg-[#0F1D2E]/85 p-5 backdrop-blur-md"
    >
      <h2 className="mb-3.5 text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
        What Happens Next
      </h2>
      <ol className="space-y-3">
        {nextSteps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#38BDF8]/40 bg-[#38BDF8]/15 text-xs font-bold text-[#38BDF8]">
              {index + 1}
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">{step.title}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-slate-300">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PugetSoundProofCard() {
  return (
    <section
      aria-label="Puget Sound proof and homeowner review"
      className="mt-4 rounded-2xl border border-white/15 bg-[#0F1D2E]/85 p-5 backdrop-blur-md"
    >
      <h2 className="mb-3.5 text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
        Puget Sound Proof
      </h2>
      <p className="text-sm font-semibold text-white">
        4.9/5 average rating across 10,000+ Puget Sound installations
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
        17+ years in the Pacific Northwest. WA licensed, bonded, and insured.
      </p>
      <blockquote className="mt-3 text-sm leading-6 text-slate-300">
        &quot;Clear communication from the showroom visit to installation day, flawless finish trim work, and complete cleanup when they were done.&quot;
        <footer className="mt-2 text-xs font-semibold text-white">
          Marcus & Elena R., Lake City, Seattle
        </footer>
      </blockquote>
    </section>
  );
}

function SelectionThumb({ image, alt }: { image?: string; alt: string }) {
  const source = image?.trim();
  if (!source) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-slate-900 text-[#38BDF8]">
        <FrameIcon />
      </span>
    );
  }

  const logo = source.includes("/manufacturers/") || source.includes("/brands/");

  return (
    <img
      src={source}
      alt={alt}
      className={`h-11 w-11 shrink-0 rounded-lg border border-white/15 bg-slate-900 ${
        logo ? "object-contain p-1" : "object-cover"
      }`}
    />
  );
}

function FrameIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  );
}

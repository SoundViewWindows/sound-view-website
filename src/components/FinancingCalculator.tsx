"use client";

import { useMemo, useState } from "react";

const TERM_MONTHS = 60;

const creditTiers = [
  { label: "Excellent (741 - 850)", apr: 10.49 },
  { label: "Good (681 - 740)", apr: 14.99 },
  { label: "Fair (641 - 680)", apr: 19.99 },
  { label: "Poor (550 - 660)", apr: 26.99 },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function monthlyPayment(principal: number, aprPercent: number) {
  const monthlyRate = aprPercent / 100 / 12;
  if (monthlyRate === 0) return principal / TERM_MONTHS;
  const growth = (1 + monthlyRate) ** TERM_MONTHS;
  return (principal * monthlyRate * growth) / (growth - 1);
}

export function FinancingCalculator({ financingUrl }: { financingUrl: string }) {
  const [projectCost, setProjectCost] = useState(12000);
  const [apr, setApr] = useState(creditTiers[0].apr);

  const estimate = useMemo(() => {
    const principal = Number.isFinite(projectCost) ? Math.min(250000, Math.max(0, projectCost)) : 0;
    const payment = principal > 0 ? monthlyPayment(principal, apr) : 0;
    const total = payment * TERM_MONTHS;
    return {
      principal,
      payment,
      interest: total - principal,
      total,
    };
  }, [apr, projectCost]);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#38BDF8]">Payment estimate</p>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-white">Project cost</span>
          <input
            type="number"
            min={1000}
            max={250000}
            step={100}
            value={projectCost}
            onChange={(event) => setProjectCost(Number(event.target.value))}
            className="mt-1.5 w-full rounded-lg border border-white/20 bg-white px-3 py-2.5 text-sm font-semibold text-[#0F1D2E] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-white">Credit score</span>
          <select
            value={apr}
            onChange={(event) => setApr(Number(event.target.value))}
            className="mt-1.5 w-full rounded-lg border border-white/20 bg-white px-3 py-2.5 text-sm font-semibold text-[#0F1D2E] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            {creditTiers.map((tier) => (
              <option key={tier.label} value={tier.apr}>
                {tier.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-3xl font-bold text-white">
        {currency.format(estimate.payment)}
        <span className="ml-1 text-base font-semibold text-slate-300">/ mo.</span>
      </p>
      <p className="mt-1 text-sm font-semibold text-[#38BDF8]">{apr.toFixed(2)}% APR</p>

      <dl className="mt-5 space-y-2 text-sm text-slate-200">
        <div className="flex items-center justify-between gap-4">
          <dt>Principal</dt>
          <dd className="font-semibold text-white">{currency.format(estimate.principal)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>Interest</dt>
          <dd className="font-semibold text-white">{currency.format(estimate.interest)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-2">
          <dt>Total Loan Cost Estimate</dt>
          <dd className="font-semibold text-white">{currency.format(estimate.total)}</dd>
        </div>
      </dl>

      <p className="mt-6 font-semibold text-white">Get your personalized rates.</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-200">
        This takes two minutes and does not affect your credit score.
      </p>
      <a
        href={financingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#38BDF8] px-6 py-3 text-sm font-semibold text-[#0F1D2E] transition-colors hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
      >
        {"Get Financing Options ->"}
      </a>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        This estimate uses a 60 month term and a {apr.toFixed(2)}% APR. It is for illustration only and does not account for missed payments, deferments, or other special conditions.
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Powered by HEARTH</p>
    </div>
  );
}

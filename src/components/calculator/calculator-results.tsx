import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CircleAlert,
  Gauge,
  Landmark,
  Percent,
  Wallet,
} from "lucide-react";
import type { InvestmentResults } from "@/lib/calculations/real-estate";
import { formatCurrency, formatMultiple, formatPercent } from "@/lib/formatting/currency";
import { ResultCard } from "@/components/calculator/result-card";

interface CalculatorResultsProps {
  results: InvestmentResults;
}

export function CalculatorResults({ results }: CalculatorResultsProps) {
  const positiveCashFlow = results.monthlyNetCashFlow >= 0;

  return (
    <section id="results-snapshot" aria-labelledby="results-heading" className="space-y-4 scroll-mt-6" aria-live="polite">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#87958c]">Results snapshot</p>
          <h2 id="results-heading" className="mt-1 text-xl font-semibold tracking-tight text-[#1d3328]">The numbers at a glance</h2>
        </div>
        <span className="rounded-full border border-[#e3ebe4] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#718077]">Monthly view</span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#173d31] p-5 text-white shadow-[0_18px_45px_-28px_rgba(10,54,38,0.55)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-[#d0e1d6]">
            {positiveCashFlow ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
            Monthly net cash flow
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${positiveCashFlow ? "bg-[#d9f2df] text-[#15583a]" : "bg-[#f9e6df] text-[#934639]"}`}>
            {positiveCashFlow ? "Positive cash flow" : "Negative cash flow"}
          </span>
        </div>
        <p className={`mt-3 break-words text-[clamp(2rem,5vw,3rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums ${positiveCashFlow ? "text-white" : "text-[#ffd7ca]"}`}>
          {results.monthlyNetCashFlow < 0 ? "−" : ""}{formatCurrency(Math.abs(results.monthlyNetCashFlow))}
        </p>
        <p className="mt-3 max-w-md text-xs leading-5 text-[#c1d5c9]">
          {positiveCashFlow
            ? "After the estimated operating expenses and monthly mortgage repayment, this property retains a cash surplus."
            : "The estimated rent does not cover operating expenses and the monthly mortgage repayment. The shortfall would need to be funded from elsewhere."}
        </p>
        {!positiveCashFlow ? (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2.5 text-[11px] leading-5 text-[#e2c9c1]">
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
            <span>Review the purchase price, financing terms, rent assumptions or recurring costs before making a decision.</span>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ResultCard
          label="Annual Net Operating Income"
          value={formatCurrency(results.annualNOI)}
          description="After vacancy and operating costs, before the mortgage"
          icon={<Landmark className="size-4" />}
          tone={results.annualNOI >= 0 ? "positive" : "negative"}
        />
        <ResultCard
          label="Capitalization Rate"
          value={formatPercent(results.capRate)}
          description="Annual NOI relative to the purchase price"
          icon={<Gauge className="size-4" />}
        />
        <ResultCard
          label="Cash-on-Cash Return"
          value={formatPercent(results.cashOnCashReturn)}
          description="Annual cash flow relative to initial capital"
          icon={<Percent className="size-4" />}
          tone={results.cashOnCashReturn === null ? "default" : results.cashOnCashReturn >= 0 ? "positive" : "negative"}
        />
        <ResultCard
          label="Gross Rent Multiplier"
          value={formatMultiple(results.grossRentMultiplier)}
          description="Purchase price divided by gross annual rent"
          icon={<Banknote className="size-4" />}
        />
        <ResultCard
          label="Initial Capital Invested"
          value={formatCurrency(results.initialCapitalInvested)}
          description="Down payment plus acquisition and financing costs"
          icon={<Wallet className="size-4" />}
        />
        <ResultCard
          label="Monthly Mortgage Payment"
          value={formatCurrency(results.monthlyMortgagePayment)}
          description="Principal and interest over the selected term"
          icon={<Landmark className="size-4" />}
        />
      </div>
    </section>
  );
}

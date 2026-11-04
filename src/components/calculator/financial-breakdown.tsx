import { Separator } from "@/components/ui/separator";
import type { InvestmentResults } from "@/lib/calculations/real-estate";
import type { CalculatorInput } from "@/lib/validation/calculator-schema";
import { formatCurrency } from "@/lib/formatting/currency";

interface FinancialBreakdownProps {
  results: InvestmentResults;
  input: CalculatorInput;
}

function BreakdownRow({ label, value, emphasis = false, tone }: {
  label: string;
  value: string;
  emphasis?: boolean;
  tone?: "positive" | "negative";
}) {
  const color = tone === "positive" ? "text-[#16734e]" : tone === "negative" ? "text-[#bd5c4d]" : "text-[#273b31]";
  return (
    <div className={`flex items-start justify-between gap-4 py-2.5 ${emphasis ? "font-semibold" : ""}`}>
      <span className={`text-sm leading-5 ${emphasis ? "text-[#30463a]" : "text-[#738178]"}`}>{label}</span>
      <span className={`shrink-0 text-right text-sm tabular-nums ${color}`}>{value}</span>
    </div>
  );
}

export function FinancialBreakdown({ results, input }: FinancialBreakdownProps) {
  return (
    <div className="rounded-2xl border border-[#e2e9e4] bg-white p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#20362b]">Where the numbers come from</h3>
        <p className="mt-1 text-xs leading-5 text-[#849188]">A transparent monthly view of rental income, operating costs and financing.</p>
      </div>

      <div className="space-y-0.5">
        <BreakdownRow label="Gross monthly rent" value={formatCurrency(results.effectiveMonthlyRentalIncome + results.vacancyLossMonthly)} />
        <BreakdownRow label="Vacancy deduction" value={`− ${formatCurrency(results.vacancyLossMonthly)}`} />
        <BreakdownRow label="Effective monthly rental income" value={formatCurrency(results.effectiveMonthlyRentalIncome)} emphasis />
        <Separator className="my-2" />
        <BreakdownRow label="County land rates" value={formatCurrency(input.countyLandRates)} />
        <BreakdownRow label="Service charge" value={formatCurrency(input.serviceCharge)} />
        <BreakdownRow label="Property insurance" value={formatCurrency(input.propertyInsurance)} />
        <BreakdownRow label="Maintenance reserve" value={formatCurrency(input.maintenanceReserve)} />
        <BreakdownRow label="Property management fee" value={formatCurrency(input.propertyManagementFee)} />
        <BreakdownRow label="Total monthly operating expenses" value={formatCurrency(results.monthlyOperatingExpenses)} emphasis />
        <BreakdownRow label="Net operating income per month" value={formatCurrency(results.monthlyNOI)} emphasis tone={results.monthlyNOI >= 0 ? "positive" : "negative"} />
        <Separator className="my-2" />
        <BreakdownRow label="Monthly mortgage repayment" value={`− ${formatCurrency(results.monthlyMortgagePayment)}`} />
        <BreakdownRow label="Monthly net cash flow" value={formatCurrency(results.monthlyNetCashFlow)} emphasis tone={results.monthlyNetCashFlow >= 0 ? "positive" : "negative"} />
      </div>

      <div className="mt-5 rounded-xl bg-[#f7f9f6] p-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.09em] text-[#728278]">Initial capital & financing</h4>
        <BreakdownRow label="Loan principal" value={formatCurrency(results.loanPrincipal)} />
        <BreakdownRow label="Down payment amount" value={formatCurrency(results.downPaymentAmount)} />
        <BreakdownRow label="Initial acquisition costs" value={formatCurrency(results.initialCapitalInvested - results.downPaymentAmount)} />
        <Separator className="my-2" />
        <BreakdownRow label="Total initial capital invested" value={formatCurrency(results.initialCapitalInvested)} emphasis />
        <div className="mt-2 flex items-start justify-between gap-4 border-t border-[#e1e9e2] pt-3">
          <span className="text-xs text-[#7b8980]">Annual net operating income (before financing)</span>
          <span className="text-right text-sm font-semibold tabular-nums text-[#273b31]">{formatCurrency(results.annualNOI)}</span>
        </div>
      </div>
    </div>
  );
}

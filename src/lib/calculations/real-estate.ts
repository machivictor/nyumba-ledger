import type { CalculatorInput } from "@/lib/validation/calculator-schema";

export type InvestmentResults = {
  effectiveGrossRentalIncomeAnnual: number;
  vacancyLossMonthly: number;
  effectiveMonthlyRentalIncome: number;
  monthlyOperatingExpenses: number;
  annualOperatingExpenses: number;
  annualNOI: number;
  monthlyNOI: number;
  loanPrincipal: number;
  downPaymentAmount: number;
  monthlyMortgagePayment: number;
  monthlyNetCashFlow: number;
  annualNetCashFlow: number;
  capRate: number | null;
  cashOnCashReturn: number | null;
  grossRentMultiplier: number | null;
  grossScheduledRentalYield: number | null;
  initialCapitalInvested: number;
};

/**
 * Standard fixed-rate, fully amortising monthly principal-and-interest payment.
 * A zero-rate loan is handled as straight-line principal repayment.
 */
export function calculateMonthlyMortgagePayment(
  principal: number,
  annualInterestRatePercent: number,
  loanTermYears: number,
): number {
  if (principal <= 0) return 0;

  const numberOfPayments = loanTermYears * 12;
  if (!Number.isFinite(numberOfPayments) || numberOfPayments <= 0) return 0;

  const monthlyRate = annualInterestRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / numberOfPayments;

  const compoundFactor = Math.pow(1 + monthlyRate, numberOfPayments);
  const payment = (principal * monthlyRate * compoundFactor) / (compoundFactor - 1);

  return Number.isFinite(payment) ? payment : 0;
}

function safeRatio(numerator: number, denominator: number): number | null {
  if (denominator <= 0 || !Number.isFinite(denominator)) return null;
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

/** Pure calculation module. Values stay unrounded until presentation. */
export function calculateInvestment(input: CalculatorInput): InvestmentResults {
  const vacancyFraction = input.vacancyRate / 100;
  const vacancyLossMonthly = input.monthlyRent * vacancyFraction;
  const effectiveMonthlyRentalIncome = input.monthlyRent - vacancyLossMonthly;
  const effectiveGrossRentalIncomeAnnual = effectiveMonthlyRentalIncome * 12;

  const monthlyOperatingExpenses =
    input.countyLandRates +
    input.serviceCharge +
    input.propertyInsurance +
    input.maintenanceReserve +
    input.propertyManagementFee;
  const annualOperatingExpenses = monthlyOperatingExpenses * 12;

  // NOI is deliberately calculated before mortgage debt service.
  const annualNOI = effectiveGrossRentalIncomeAnnual - annualOperatingExpenses;
  const monthlyNOI = annualNOI / 12;

  const downPaymentAmount = input.loanFinancingEnabled
    ? input.purchasePrice * (input.downPaymentPercent / 100)
    : input.purchasePrice;
  const loanPrincipal = input.loanFinancingEnabled ? input.purchasePrice - downPaymentAmount : 0;
  const monthlyMortgagePayment = input.loanFinancingEnabled
    ? calculateMonthlyMortgagePayment(loanPrincipal, input.annualInterestRate, input.loanTermYears)
    : 0;

  const monthlyNetCashFlow = monthlyNOI - monthlyMortgagePayment;
  const annualNetCashFlow = monthlyNetCashFlow * 12;
  const initialCapitalInvested = downPaymentAmount + input.acquisitionCosts;
  const grossScheduledAnnualRent = input.monthlyRent * 12;

  return {
    effectiveGrossRentalIncomeAnnual,
    vacancyLossMonthly,
    effectiveMonthlyRentalIncome,
    monthlyOperatingExpenses,
    annualOperatingExpenses,
    annualNOI,
    monthlyNOI,
    loanPrincipal,
    downPaymentAmount,
    monthlyMortgagePayment,
    monthlyNetCashFlow,
    annualNetCashFlow,
    capRate: safeRatio(annualNOI * 100, input.purchasePrice),
    cashOnCashReturn: safeRatio(annualNetCashFlow * 100, initialCapitalInvested),
    grossRentMultiplier: safeRatio(input.purchasePrice, grossScheduledAnnualRent),
    grossScheduledRentalYield: safeRatio(grossScheduledAnnualRent * 100, input.purchasePrice),
    initialCapitalInvested,
  };
}

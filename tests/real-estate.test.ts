import { describe, expect, it } from "vitest";
import { calculateInvestment, calculateMonthlyMortgagePayment } from "@/lib/calculations/real-estate";
import { CALCULATOR_DEFAULTS } from "@/lib/constants/calculator-defaults";
import type { CalculatorInput } from "@/lib/validation/calculator-schema";
import { calculatorSchema } from "@/lib/validation/calculator-schema";

const near = (actual: number, expected: number, precision = 2) => {
  expect(actual).toBeCloseTo(expected, precision);
};

describe("calculateMonthlyMortgagePayment", () => {
  it("calculates a zero-interest loan without dividing by zero", () => {
    near(calculateMonthlyMortgagePayment(1_200_000, 0, 10), 10_000);
  });

  it("returns zero when there is no loan principal", () => {
    expect(calculateMonthlyMortgagePayment(0, 13.5, 12)).toBe(0);
  });

  it("handles an invalid term defensively", () => {
    expect(calculateMonthlyMortgagePayment(100_000, 10, 0)).toBe(0);
  });
});

describe("calculateInvestment", () => {
  it("calculates the Kenyan default scenario consistently", () => {
    const result = calculateInvestment(CALCULATOR_DEFAULTS);

    near(result.effectiveMonthlyRentalIncome, 38_665);
    near(result.effectiveGrossRentalIncomeAnnual, 463_980);
    near(result.monthlyOperatingExpenses, 9_535);
    near(result.annualOperatingExpenses, 114_420);
    near(result.annualNOI, 349_560);
    near(result.downPaymentAmount, 1_600_000);
    near(result.loanPrincipal, 6_400_000);
    near(result.capRate ?? 0, (349_560 / 8_000_000) * 100);
    near(result.grossRentMultiplier ?? 0, 8_000_000 / (40_700 * 12));
    near(result.grossScheduledRentalYield ?? 0, (40_700 * 12 / 8_000_000) * 100);
  });

  it("keeps NOI separate from mortgage debt service", () => {
    const result = calculateInvestment(CALCULATOR_DEFAULTS);
    near(result.annualNOI, result.effectiveGrossRentalIncomeAnnual - result.annualOperatingExpenses);
    near(result.monthlyNOI, result.annualNOI / 12);
    near(result.monthlyNetCashFlow, result.monthlyNOI - result.monthlyMortgagePayment);
  });

  it("identifies negative cash flow when debt service exceeds monthly NOI", () => {
    const result = calculateInvestment(CALCULATOR_DEFAULTS);
    expect(result.monthlyNetCashFlow).toBeLessThan(0);
    expect(result.cashOnCashReturn).not.toBeNull();
    expect(result.cashOnCashReturn ?? 0).toBeLessThan(0);
  });

  it("handles zero rent without NaN or Infinity", () => {
    const input: CalculatorInput = { ...CALCULATOR_DEFAULTS, monthlyRent: 0 };
    const result = calculateInvestment(input);

    expect(result.effectiveGrossRentalIncomeAnnual).toBe(0);
    expect(result.annualNOI).toBe(-result.annualOperatingExpenses);
    expect(result.grossRentMultiplier).toBeNull();
    expect(result.monthlyNetCashFlow).toBeLessThan(0);
    for (const value of Object.values(result)) {
      if (value !== null) expect(Number.isFinite(value)).toBe(true);
    }
  });

  it("handles a 100% down payment with no mortgage", () => {
    const input: CalculatorInput = { ...CALCULATOR_DEFAULTS, downPaymentPercent: 100 };
    const result = calculateInvestment(input);

    expect(result.loanPrincipal).toBe(0);
    expect(result.monthlyMortgagePayment).toBe(0);
    near(result.monthlyNetCashFlow, result.monthlyNOI);
  });

  it("calculates an all-cash purchase when loan financing is disabled", () => {
    const input: CalculatorInput = {
      ...CALCULATOR_DEFAULTS,
      loanFinancingEnabled: false,
      acquisitionCosts: 150_000,
    };
    const result = calculateInvestment(input);

    expect(result.downPaymentAmount).toBe(input.purchasePrice);
    expect(result.loanPrincipal).toBe(0);
    expect(result.monthlyMortgagePayment).toBe(0);
    expect(result.initialCapitalInvested).toBe(input.purchasePrice + input.acquisitionCosts);
    near(result.monthlyNetCashFlow, result.monthlyNOI);
  });

  it("does not require loan values when financing is disabled", () => {
    const parsed = calculatorSchema.safeParse({
      ...CALCULATOR_DEFAULTS,
      loanFinancingEnabled: false,
      downPaymentPercent: Number.NaN,
      annualInterestRate: Number.NaN,
      loanTermYears: Number.NaN,
    });

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.downPaymentPercent).toBe(100);
      expect(parsed.data.annualInterestRate).toBe(0);
      expect(parsed.data.loanTermYears).toBe(1);
    }
  });

  it("reports unavailable cash-on-cash return when no initial capital is entered", () => {
    const input: CalculatorInput = {
      ...CALCULATOR_DEFAULTS,
      downPaymentPercent: 0,
      acquisitionCosts: 0,
    };
    const result = calculateInvestment(input);
    expect(result.initialCapitalInvested).toBe(0);
    expect(result.cashOnCashReturn).toBeNull();
  });

  it("handles a fully vacant property and keeps all outputs finite", () => {
    const input: CalculatorInput = { ...CALCULATOR_DEFAULTS, vacancyRate: 100 };
    const result = calculateInvestment(input);

    expect(result.effectiveMonthlyRentalIncome).toBe(0);
    expect(result.annualNOI).toBe(-result.annualOperatingExpenses);
    for (const value of Object.values(result)) {
      if (value !== null) expect(Number.isFinite(value)).toBe(true);
    }
  });
});

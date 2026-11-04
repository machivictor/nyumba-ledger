import assert from "node:assert/strict";
import { calculateInvestment, calculateMonthlyMortgagePayment } from "../src/lib/calculations/real-estate.ts";

const base = {
  purchasePrice: 8_000_000,
  loanFinancingEnabled: true,
  downPaymentPercent: 20,
  annualInterestRate: 13.5,
  loanTermYears: 12,
  acquisitionCosts: 0,
  monthlyRent: 40_700,
  vacancyRate: 5,
  countyLandRates: 1_500,
  serviceCharge: 3_000,
  propertyInsurance: 1_000,
  maintenanceReserve: 2_000,
  propertyManagementFee: 2_035,
};

const defaults = calculateInvestment(base);
assert.equal(defaults.effectiveMonthlyRentalIncome, 38_665);
assert.equal(defaults.annualNOI, 349_560);
assert.equal(defaults.loanPrincipal, 6_400_000);
assert.equal(defaults.downPaymentAmount, 1_600_000);
assert.ok(defaults.monthlyNetCashFlow < 0);
assert.equal(defaults.capRate, 4.3695);
assert.ok(Math.abs(defaults.grossScheduledRentalYield - 6.105) < 1e-10);
assert.equal(calculateMonthlyMortgagePayment(1_200_000, 0, 10), 10_000);

const zeroRent = calculateInvestment({ ...base, monthlyRent: 0 });
assert.equal(zeroRent.grossRentMultiplier, null);
assert.equal(zeroRent.annualNOI, -114_420);

const fullDeposit = calculateInvestment({ ...base, downPaymentPercent: 100 });
assert.equal(fullDeposit.monthlyMortgagePayment, 0);
assert.equal(fullDeposit.loanPrincipal, 0);

const noCashInvested = calculateInvestment({ ...base, downPaymentPercent: 0, acquisitionCosts: 0 });
assert.equal(noCashInvested.cashOnCashReturn, null);

for (const value of Object.values(defaults)) {
  if (value !== null) assert.ok(Number.isFinite(value));
}

console.log("Calculation smoke tests passed.");
console.log({
  annualNOI: defaults.annualNOI,
  monthlyMortgagePayment: defaults.monthlyMortgagePayment,
  monthlyNetCashFlow: defaults.monthlyNetCashFlow,
  capRate: defaults.capRate,
  cashOnCashReturn: defaults.cashOnCashReturn,
  grossRentMultiplier: defaults.grossRentMultiplier,
});

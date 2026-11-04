import type { CalculatorInput } from "@/lib/validation/calculator-schema";

export const CALCULATOR_DEFAULTS: CalculatorInput = {
  purchasePrice: 8_000_000,
  loanFinancingEnabled: true,
  downPaymentPercent: 80,
  annualInterestRate: 13.5,
  loanTermYears: 20,
  acquisitionCosts: 0,
  monthlyRent: 40_700,
  vacancyRate: 5,
  countyLandRates: 1_500,
  serviceCharge: 3_000,
  propertyInsurance: 1_000,
  maintenanceReserve: 2_000,
  propertyManagementFee: 2_035,
};

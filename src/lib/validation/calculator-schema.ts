import { z } from "zod";
import { parseCurrencyInput } from "@/lib/formatting/currency";

const nonNegativeMoney = (label: string, minimum = 0) =>
  z.preprocess(
    (value) => typeof value === "string" ? parseCurrencyInput(value) : value,
    z
      .number({ error: `${label} must be a number.` })
      .finite(`${label} must be a valid number.`)
      .min(minimum, minimum > 0 ? `${label} must be greater than zero.` : `${label} cannot be negative.`)
      .max(1_000_000_000_000, `${label} is higher than the supported limit.`),
  );

const percentage = (label: string) =>
  z
    .number({ error: `${label} must be a number.` })
    .finite(`${label} must be a valid number.`)
    .min(0, `${label} cannot be negative.`)
    .max(100, `${label} cannot exceed 100%.`);

const optionalLoanNumber = z.union([z.number(), z.nan()]).optional();

export const calculatorSchema = z.object({
  purchasePrice: nonNegativeMoney("Property purchase price", 1),
  loanFinancingEnabled: z.boolean(),
  downPaymentPercent: optionalLoanNumber,
  annualInterestRate: optionalLoanNumber,
  loanTermYears: optionalLoanNumber,
  acquisitionCosts: nonNegativeMoney("Acquisition and financing costs"),
  monthlyRent: nonNegativeMoney("Expected monthly rental income"),
  vacancyRate: percentage("Vacancy allowance"),
  countyLandRates: nonNegativeMoney("County land rates"),
  serviceCharge: nonNegativeMoney("Service charge"),
  propertyInsurance: nonNegativeMoney("Property insurance"),
  maintenanceReserve: nonNegativeMoney("Maintenance reserve"),
  propertyManagementFee: nonNegativeMoney("Property management fee"),
}).superRefine((values, context) => {
  if (!values.loanFinancingEnabled) return;

  const validatePercentage = (field: "downPaymentPercent" | "annualInterestRate", label: string) => {
    const value = values[field];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      context.addIssue({ code: "custom", path: [field], message: `${label} must be a valid number.` });
    } else if (value < 0 || value > 100) {
      context.addIssue({ code: "custom", path: [field], message: `${label} must be between 0 and 100%.` });
    }
  };

  validatePercentage("downPaymentPercent", "Down payment");
  validatePercentage("annualInterestRate", "Annual interest rate");

  const term = values.loanTermYears;
  if (typeof term !== "number" || !Number.isFinite(term)) {
    context.addIssue({ code: "custom", path: ["loanTermYears"], message: "Loan term must be a valid number." });
  } else if (!Number.isInteger(term) || term < 1 || term > 40) {
    context.addIssue({ code: "custom", path: ["loanTermYears"], message: "Loan term must be a whole number from 1 to 40 years." });
  }
}).transform((values) => ({
  ...values,
  downPaymentPercent: values.loanFinancingEnabled
    ? typeof values.downPaymentPercent === "number" ? values.downPaymentPercent : 100
    : 100,
  annualInterestRate: values.loanFinancingEnabled
    ? typeof values.annualInterestRate === "number" ? values.annualInterestRate : 0
    : 0,
  loanTermYears: values.loanFinancingEnabled
    ? typeof values.loanTermYears === "number" ? values.loanTermYears : 1
    : 1,
}));

export type CalculatorInput = z.output<typeof calculatorSchema>;

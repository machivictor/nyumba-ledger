import { describe, expect, it } from "vitest";
import { CALCULATOR_DEFAULTS } from "@/lib/constants/calculator-defaults";
import { formatCurrencyInput, parseCurrencyInput } from "@/lib/formatting/currency";
import { calculatorSchema } from "@/lib/validation/calculator-schema";

describe("currency input formatting", () => {
  it("adds grouping commas while preserving decimal input", () => {
    expect(formatCurrencyInput("1234567.89")).toBe("1,234,567.89");
  });

  it("parses grouped currency input as a number", () => {
    expect(parseCurrencyInput("1,234,567.89")).toBe(1_234_567.89);
  });

  it("treats an empty currency input as invalid", () => {
    expect(Number.isNaN(parseCurrencyInput(""))).toBe(true);
  });

  it("validates and parses grouped currency fields for calculator submission", () => {
    const result = calculatorSchema.safeParse({
      ...CALCULATOR_DEFAULTS,
      purchasePrice: "1,234,567",
      monthlyRent: "40,700",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.purchasePrice).toBe(1_234_567);
      expect(result.data.monthlyRent).toBe(40_700);
    }
  });
});

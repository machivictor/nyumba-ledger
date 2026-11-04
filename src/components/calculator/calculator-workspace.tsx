"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RotateCcw, Calculator as CalculatorIcon, ArrowRight } from "lucide-react";
import { CalculatorField } from "@/components/calculator/calculator-field";
import { CalculatorResults } from "@/components/calculator/calculator-results";
import { FinancialBreakdown } from "@/components/calculator/financial-breakdown";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CALCULATOR_DEFAULTS } from "@/lib/constants/calculator-defaults";
import { calculateInvestment } from "@/lib/calculations/real-estate";
import { formatCurrencyInput } from "@/lib/formatting/currency";
import type { CalculatorInput } from "@/lib/validation/calculator-schema";
import { calculatorSchema } from "@/lib/validation/calculator-schema";
import { z } from "zod";

const CURRENCY_FIELD_IDS = [
  "purchasePrice",
  "acquisitionCosts",
  "monthlyRent",
  "countyLandRates",
  "serviceCharge",
  "propertyInsurance",
  "maintenanceReserve",
  "propertyManagementFee",
] as const;

export function CalculatorWorkspace() {
  const [results, setResults] = useState(() => calculateInvestment(CALCULATOR_DEFAULTS));
  const [calculated, setCalculated] = useState(false);
  const [breakdownInput, setBreakdownInput] = useState<CalculatorInput>(CALCULATOR_DEFAULTS);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<z.input<typeof calculatorSchema>, unknown, CalculatorInput>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: CALCULATOR_DEFAULTS,
    mode: "onSubmit",
  });
  const loanFinancingEnabled = watch("loanFinancingEnabled");

  const registerCurrency = (
    name:
      | "purchasePrice"
      | "acquisitionCosts"
      | "monthlyRent"
      | "countyLandRates"
      | "serviceCharge"
      | "propertyInsurance"
      | "maintenanceReserve"
      | "propertyManagementFee",
  ) => register(name);

  const onCalculate = (values: CalculatorInput) => {
    setResults(calculateInvestment(values));
    setBreakdownInput(values);
    setCalculated(true);
    document.getElementById("results-snapshot")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onReset = () => {
    reset(CALCULATOR_DEFAULTS);
    for (const id of CURRENCY_FIELD_IDS) {
      const input = document.getElementById(id);
      if (input instanceof HTMLInputElement) {
        input.value = formatCurrencyInput(input.value);
      }
    }
    setResults(calculateInvestment(CALCULATOR_DEFAULTS));
    setBreakdownInput(CALCULATOR_DEFAULTS);
    setCalculated(false);
  };

  return (
    <div id="calculator-workspace" className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] xl:gap-7">
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-[#edf1ed] bg-[#fcfdfb] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge><span className="size-1.5 rounded-full bg-[#3d916c]" /> Calculator</Badge>
          </div>
          <CardTitle className="pt-1 text-xl">Property details</CardTitle>
          <CardDescription>Enter your purchase, rental and operating assumptions to assess the numbers.</CardDescription>
        </CardHeader>

        <CardContent className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
          <form onSubmit={handleSubmit(onCalculate)} noValidate>
            <fieldset className="space-y-4">
              <legend className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#74837a]">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#edf4ee] text-[#30604a]"><CalculatorIcon className="size-3.5" /></span>
                Acquisition & financing
              </legend>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-[#e4ebe5] bg-[#fafcf9] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#30463a]">Use loan financing</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#849188]">Turn off to model an all-cash purchase.</p>
                </div>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <span className="sr-only">Use loan financing</span>
                  <input
                    type="checkbox"
                    role="switch"
                    className="peer sr-only"
                    {...register("loanFinancingEnabled", {
                      onChange: (event) => {
                        if (!event.currentTarget.checked) {
                          clearErrors(["downPaymentPercent", "annualInterestRate", "loanTermYears"]);
                        }
                      },
                    })}
                  />
                  <span aria-hidden="true" className="h-6 w-11 rounded-full bg-[#cbd5ce] transition-colors peer-checked:bg-[#0d7058] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#0d7058] peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform after:content-[''] peer-checked:after:translate-x-5" />
                </label>
              </div>
              <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                <CalculatorField id="purchasePrice" label="Property Purchase Price" help="The agreed price you expect to pay for the property, before immediate acquisition costs." prefix="KSh" currency registration={registerCurrency("purchasePrice")} error={errors.purchasePrice?.message} min={1} />
                {loanFinancingEnabled ? (
                  <>
                    <CalculatorField id="downPaymentPercent" label="Down Payment" help="The share of the purchase price you will pay from your own funds. The balance is treated as the loan principal." registration={register("downPaymentPercent", { valueAsNumber: true })} error={errors.downPaymentPercent?.message} suffix="%" max={100} />
                    <CalculatorField id="annualInterestRate" label="Annual Interest Rate" help="The annual mortgage interest rate quoted by the lender. The calculator converts it to a monthly rate for amortisation." registration={register("annualInterestRate", { valueAsNumber: true })} error={errors.annualInterestRate?.message} suffix="%" max={100} />
                    <CalculatorField id="loanTermYears" label="Loan Term" help="The number of years over which the mortgage principal and interest are repaid. Use the term offered by your lender." registration={register("loanTermYears", { valueAsNumber: true })} error={errors.loanTermYears?.message} suffix="years" step={1} min={1} max={40} />
                  </>
                ) : null}
                <div className="sm:col-span-2">
                  <CalculatorField id="acquisitionCosts" label="Initial Acquisition & Financing Costs" help="Enter your own combined estimate for stamp duty, legal and conveyancing fees, valuation, bank processing and other immediate transaction costs. No statutory rates are assumed." prefix="KSh" currency registration={registerCurrency("acquisitionCosts")} error={errors.acquisitionCosts?.message} />
                </div>
              </div>
            </fieldset>

            <Separator className="my-6" />

            <fieldset className="space-y-4">
              <legend className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#74837a]">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#edf4ee] text-[#30604a]"><ArrowRight className="size-3.5" /></span>
                Rental income
              </legend>
              <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                <CalculatorField id="monthlyRent" label="Expected Monthly Rental Income" help="The full monthly rent you expect to collect when the property is occupied, before allowing for vacancy." prefix="KSh" currency registration={registerCurrency("monthlyRent")} error={errors.monthlyRent?.message} />
                <CalculatorField id="vacancyRate" label="Vacancy Allowance" help="The percentage of scheduled rent set aside for vacant periods, tenant turnover and rent that may not be collected." registration={register("vacancyRate", { valueAsNumber: true })} error={errors.vacancyRate?.message} suffix="%" max={100} />
              </div>
            </fieldset>

            <Separator className="my-6" />

            <fieldset className="space-y-4">
              <legend className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#74837a]">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#edf4ee] text-[#30604a]"><RotateCcw className="size-3.5" /></span>
                Monthly operating expenses
              </legend>
              <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                <CalculatorField id="countyLandRates" label="County Land Rates" help="The monthly equivalent of county land rates payable for the property. Convert any annual or periodic bill into a monthly amount." prefix="KSh" currency registration={registerCurrency("countyLandRates")} error={errors.countyLandRates?.message} />
                <CalculatorField id="serviceCharge" label="Service Charge" help="Recurring charges billed by an apartment, estate or property management company for shared services and common-area upkeep." prefix="KSh" currency registration={registerCurrency("serviceCharge")} error={errors.serviceCharge?.message} />
                <CalculatorField id="propertyInsurance" label="Property Insurance" help="Your estimated monthly equivalent for cover on the building or landlord's property-related insurance." prefix="KSh" currency registration={registerCurrency("propertyInsurance")} error={errors.propertyInsurance?.message} />
                <CalculatorField id="maintenanceReserve" label="Maintenance Reserve" help="A monthly allowance for routine repairs, replacements and upkeep. Set aside a realistic amount even when no repair is currently due." prefix="KSh" currency registration={registerCurrency("maintenanceReserve")} error={errors.maintenanceReserve?.message} />
                <div className="sm:col-span-2">
                  <CalculatorField id="propertyManagementFee" label="Property Management Fee" help="The monthly amount paid to a letting agent or property manager for tenant communication, rent collection and oversight." prefix="KSh" currency registration={registerCurrency("propertyManagementFee")} error={errors.propertyManagementFee?.message} />
                </div>
              </div>
            </fieldset>

            {Object.keys(errors).length > 0 ? (
              <Alert className="mt-5 border-[#f0d5ce] bg-[#fff8f5] text-[#9d5145]">
                <span className="mt-0.5 size-2 shrink-0 rounded-full bg-[#c66b59]" />
                <p>Please correct the highlighted fields before calculating your investment.</p>
              </Alert>
            ) : null}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <Button type="submit" size="lg" className="flex-1">
                <CalculatorIcon className="size-4" /> Calculate investment
              </Button>
              <Button type="button" variant="secondary" size="lg" onClick={onReset}>
                <RotateCcw className="size-4" /> Reset
              </Button>
            </div>
            {calculated ? (
              <p className="mt-3 text-center text-[11px] text-[#87958c]" role="status">Results updated using your latest assumptions.</p>
            ) : null}
          </form>
        </CardContent>
      </Card>

      <div className="space-y-5 xl:sticky xl:top-6">
        <CalculatorResults results={results} />
        <FinancialBreakdown results={results} input={breakdownInput} />
      </div>
    </div>
  );
}

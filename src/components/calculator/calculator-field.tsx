"use client";

import { Info } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { CalculatorInput } from "@/lib/validation/calculator-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrencyInput } from "@/lib/formatting/currency";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalculatorFieldProps {
  id: keyof CalculatorInput;
  label: string;
  help: string;
  registration: UseFormRegisterReturn;
  error?: string;
  prefix?: string;
  currency?: boolean;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number | "any";
}

export function CalculatorField({
  id,
  label,
  help,
  registration,
  error,
  prefix,
  currency = false,
  suffix,
  min = 0,
  max,
  step = "any",
}: CalculatorFieldProps) {
  return (
    <div className="min-w-0 space-y-2">
      <div className="flex min-h-5 items-center gap-1.5">
        <Label htmlFor={id}>{label}</Label>
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`Information about ${label}`}
                className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[#87978d] outline-none transition hover:bg-[#edf4ef] hover:text-[#0d5b49] focus-visible:ring-2 focus-visible:ring-[#0d7058]"
              >
                <Info className="size-3.5" aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="start">{help}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-xs font-semibold text-[#8b9991]">
            {prefix}
          </span>
        ) : null}
        <Input
          id={id}
          type={currency ? "text" : "number"}
          inputMode="decimal"
          min={currency ? undefined : min}
          max={currency ? undefined : max}
          step={step}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${prefix ? "pl-[3.45rem]" : ""} ${suffix ? "pr-12" : ""} ${error ? "border-[#c96d5e] focus:border-[#c96d5e] focus:ring-[#c96d5e]/10" : ""}`}
          {...registration}
          ref={(element) => {
            registration.ref(element);
            if (currency && element && element.value !== "") {
              element.value = formatCurrencyInput(element.value);
            }
          }}
          onChange={(event) => {
            if (!currency) {
              registration.onChange(event);
              return;
            }

            const input = event.currentTarget;
            const caret = input.selectionStart ?? input.value.length;
            const digitsBeforeCaret = input.value.slice(0, caret).replaceAll(",", "").length;
            const rawValue = input.value.replaceAll(",", "");
            input.value = formatCurrencyInput(rawValue);

            let nextCaret = 0;
            let digitsSeen = 0;
            while (nextCaret < input.value.length && digitsSeen < digitsBeforeCaret) {
              if (input.value[nextCaret] !== ",") digitsSeen += 1;
              nextCaret += 1;
            }

            registration.onChange(event);
            input.setSelectionRange(nextCaret, nextCaret);
          }}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-xs font-semibold text-[#8b9991]">
            {suffix}
          </span>
        ) : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-[#b54f43]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

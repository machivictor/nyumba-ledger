const integerFormatter = new Intl.NumberFormat("en-KE", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("en-KE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "N/A";
  return `KSh ${integerFormatter.format(Math.round(value))}`;
}

export function formatCurrencyInput(value: string): string {
  const [integerPart, ...fractionParts] = value.split(".");
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionParts.length > 0
    ? `${groupedInteger}.${fractionParts.join(".")}`
    : groupedInteger;
}

export function parseCurrencyInput(value: unknown): number {
  if (typeof value !== "string" || value.trim() === "") return Number.NaN;
  return Number(value.replaceAll(",", ""));
}

export function formatCurrencyPrecise(value: number): string {
  if (!Number.isFinite(value)) return "N/A";
  return `KSh ${decimalFormatter.format(value)}`;
}

export function formatNumber(value: number, maximumFractionDigits = 2): string {
  if (!Number.isFinite(value)) return "N/A";
  return new Intl.NumberFormat("en-KE", { maximumFractionDigits }).format(value);
}

export function formatPercent(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "N/A";
  return `${decimalFormatter.format(value)}%`;
}

export function formatMultiple(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "N/A";
  return `${decimalFormatter.format(value)}×`;
}

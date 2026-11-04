import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real Estate Investment Calculator Kenya | Rental Yield & Cash Flow",
  description:
    "Calculate rental property cash flow, mortgage repayments, net operating income, capitalization rate and cash-on-cash returns using Kenyan Shillings.",
  applicationName: "Nyumba Ledger",
  openGraph: {
    title: "Real Estate Investment Calculator Kenya | Nyumba Ledger",
    description:
      "Model rental income, operating expenses, mortgage repayments and property investment returns in Kenyan Shillings.",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary",
    title: "Real Estate Investment Calculator Kenya | Nyumba Ledger",
    description:
      "Model rental income, operating expenses, mortgage repayments and property investment returns in Kenyan Shillings.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f8f5",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-KE">
      <body>{children}</body>
    </html>
  );
}

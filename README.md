# Nyumba Ledger — Kenyan Real Estate Investment Calculator

A complete, responsive, single-page rental-property investment calculator for the Kenyan market. It uses Kenyan Shillings throughout and performs every calculation in the browser.

## Stack

- Next.js 16.4.4 App Router with static export
- React 19.3 and TypeScript strict mode
- Tailwind CSS 4.3
- Local shadcn/ui-style components built with Radix UI primitives
- Lucide React
- React Hook Form + Zod validation
- Vitest calculation tests

## Run locally

Requires Node.js 22.12 or later and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Next.js. For a production static build:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

The static site is generated in `out/`. After building, serve the generated `out/` directory with any local static file server. Once dependencies are installed and the build is complete, the application has no backend, API, authentication, analytics, remote calculation service, external font or runtime network dependency.

A lightweight calculation smoke test can also be run directly on Node 22.12+:

```bash
npm run test:smoke
```

## Project structure

```text
src/
  app/                       App Router page, metadata and global styles
  components/
    calculator/              Input form, tooltips, dashboard and breakdown
    layout/                  Header and footer
    sections/                Hero and educational page sections
    ui/                      Local reusable shadcn-style UI primitives
  lib/
    calculations/             Pure mortgage and investment formulas
    constants/                Editable illustrative Kenyan defaults
    formatting/               en-KE number and KSh formatting
    validation/               Zod input schema
 tests/
  real-estate.test.ts         Unit tests for financial edge cases
  smoke.mjs                   Dependency-free calculation smoke tests
```

## Financial model

- Effective gross rental income: gross scheduled rent less vacancy allowance.
- Operating expenses: county land rates, service charge, property insurance, maintenance reserve and property management fee.
- NOI: effective gross income less operating expenses, before mortgage debt service.
- Mortgage: fixed monthly principal-and-interest amortisation, with a separate zero-interest case. Loan financing can be switched off to model an all-cash purchase.
- Monthly net cash flow: monthly NOI less the mortgage payment.
- Cap rate: annual NOI divided by the purchase price.
- Cash-on-cash return: annual net cash flow divided by initial capital invested.
- GRM: purchase price divided by gross scheduled annual rent before vacancy.

Percentage metrics are shown as `N/A` when their denominator is zero. Financial calculations retain full precision; rounding occurs only when values are displayed.

## Default assumptions

The calculator opens with loan financing enabled, a KSh 8,000,000 purchase price, 20% down payment, 13.5% annual interest rate, 20-year term and KSh 40,700 expected monthly rent. Switch loan financing off to calculate an all-cash purchase. Vacancy and the five recurring operating cost assumptions are illustrative and editable. Initial acquisition and financing costs default to zero and must be entered by the user based on actual quotes.

## Notes

This tool is for education and scenario planning, not professional financial, tax, legal or investment advice. It does not model income tax, appreciation, resale proceeds or every possible transaction cost. Verify property-specific charges, rental comparables and lender terms before making a purchase decision.

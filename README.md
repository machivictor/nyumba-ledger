# Nyumba Ledger

**A Kenyan real estate investment calculator for making the numbers behind a rental property easier to understand.**

[![Live demo](https://img.shields.io/badge/Live%20Demo-nyumbaledger.vercel.app-0D5B49?style=for-the-badge&logo=vercel&logoColor=white)](https://nyumbaledger.vercel.app/)

Nyumba Ledger is a responsive, browser-based tool for evaluating the financial side of a potential rental property in Kenya. It brings rental income, vacancy, recurring property costs and mortgage financing into one view, then turns those assumptions into investment metrics and a transparent cash-flow breakdown.

**Live application:** [nyumbaledger.vercel.app](https://nyumbaledger.vercel.app/)

---

## The problem

A rental property's asking price and expected monthly rent only tell part of the story. County land rates, service charge, insurance, maintenance, vacancy and financing can materially change the money an owner has left each month.

Many generic property calculators are also built around another market's terminology, currency and cost assumptions. Nyumba Ledger was designed around the inputs a Kenyan buyer or landlord is more likely to recognise, while keeping the underlying calculations visible and understandable.

## The solution

The application lets a user enter a property's purchase price, expected rent, vacancy allowance, operating expenses and mortgage terms. It calculates the key investment measures and shows how each result is derived, so the user can test assumptions rather than rely on a headline rental yield.

### Product highlights

- **Kenyan market context:** KSh / KES formatting, `en-KE` locale, county land rates and apartment or estate service charge.
- **Rental income modelling:** expected monthly rent and a vacancy allowance are used to estimate effective rental income.
- **Financing analysis:** down payment, annual interest rate, loan term and initial acquisition or financing costs feed into the mortgage and capital calculations.
- **Six headline investment metrics:** monthly net cash flow, annual net operating income (NOI), capitalization rate, cash-on-cash return, gross rent multiplier and initial capital invested.
- **Transparent breakdown:** monthly rent, vacancy deduction, effective income, operating costs, NOI, mortgage repayment and initial capital are displayed separately.
- **Input guidance:** concise explanations are available from the information controls beside the calculator fields.
- **Validation and reset:** invalid values are caught before calculation, and the original illustrative assumptions can be restored at any time.
- **Educational content:** the page explains the formulas, compares key investment concepts, walks through a Kenyan example and answers common questions.
- **Responsive layout:** the calculator and results adapt to mobile, tablet and desktop screens.

## A deliberate financial model

One of the central design decisions was to keep **property operating performance** separate from **mortgage financing**. Net Operating Income (NOI) is calculated before mortgage debt service; monthly net cash flow is calculated after the mortgage repayment. This makes it easier to distinguish a property's underlying operating performance from the effect of the buyer's financing structure.

| Metric | What it tells the investor |
|---|---|
| Monthly net cash flow | Estimated monthly surplus or shortfall after operating expenses and mortgage repayment |
| Annual NOI | Effective rental income after vacancy and operating expenses, before financing |
| Capitalization rate | Annual NOI relative to the property's purchase price |
| Cash-on-cash return | Annual net cash flow relative to the initial cash invested |
| Gross rent multiplier | Purchase price divided by gross scheduled annual rent, before vacancy and expenses |
| Initial capital invested | Down payment plus user-entered acquisition and financing costs |

The calculation module also handles zero-interest mortgages and unavailable percentage metrics without displaying `NaN` or `Infinity`. Monetary values retain precision internally and are formatted for display only.

### Calculation model

```text
Effective annual rental income
  = monthly rent × (1 − vacancy rate / 100) × 12

Annual operating expenses
  = (land rates + service charge + insurance
     + maintenance + management fee) × 12

Annual NOI
  = effective annual rental income − annual operating expenses

Monthly mortgage payment
  = fixed-rate amortisation of loan principal and interest

Monthly net cash flow
  = annual NOI / 12 − monthly mortgage payment

Capitalization rate
  = annual NOI / purchase price × 100

Cash-on-cash return
  = annual net cash flow / initial capital invested × 100

Gross rent multiplier
  = purchase price / gross scheduled annual rent
```

Initial acquisition and financing costs are entered by the user rather than estimated from assumed stamp-duty, legal or lender fee rates.

## Engineering highlights

- **Calculation logic separated from the UI:** financial formulas live in pure, reusable TypeScript functions in `src/lib/calculations/real-estate.ts`.
- **Schema-driven form validation:** React Hook Form and Zod validate monetary values, percentages and loan terms before calculation.
- **Typed currency formatting:** reusable formatting helpers keep monetary presentation consistent in Kenyan Shillings.
- **Edge-case testing:** Vitest tests cover the default scenario, zero-interest loans, no loan principal, negative cash flow, zero rent, full vacancy and zero initial capital.
- **Static deployment:** the project is configured for static export. The calculator runs in the browser and does not require an application backend, database, authentication or remote calculation service.
- **Accessible interaction patterns:** semantic form controls, labels, keyboard-friendly information controls and responsive navigation support the core workflow.

## Technology

| Area | Tools |
|---|---|
| Framework | Next.js 16 App Router |
| Language | TypeScript (strict mode) |
| UI | React 19, Tailwind CSS 4 |
| Components | Local shadcn/ui-style components using Radix UI primitives |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Testing | Vitest |
| Deployment | Vercel |

## Run locally

**Requirements:** Node.js `22.12+` and npm.

```bash
git clone https://github.com/machivictor/nyumba-ledger
cd nyumba-ledger
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Quality checks

```bash
npm run test        # Unit tests
npm run test:smoke  # Dependency-light calculation smoke tests
npm run typecheck   # TypeScript checks
npm run lint        # ESLint
npm run build       # Production static build
```

The static export is generated in `out/`.

## Project structure

```text
src/
├── app/                  # App Router page, metadata and global styles
├── components/
│   ├── calculator/       # Form, field guidance, results and breakdown
│   ├── layout/           # Site header and footer
│   ├── sections/         # Hero and educational content sections
│   └── ui/               # Reusable local UI primitives
└── lib/
    ├── calculations/     # Pure investment and mortgage calculations
    ├── constants/        # Editable illustrative calculator defaults
    ├── formatting/       # Kenyan currency and number formatting
    └── validation/       # Zod calculator schema

tests/
├── real-estate.test.ts   # Financial calculation unit tests
└── smoke.mjs             # Dependency-light calculation checks
```

## Scope and assumptions

The starting figures are illustrative inputs, not representations of universal Kenyan market averages or a recommendation to buy a property. Replace them with property-specific rental estimates, actual county charges, service-charge schedules, insurance quotations and lender terms.

The current model focuses on rental operating income and fixed monthly mortgage repayments. It does not forecast property appreciation or resale proceeds, and it does not calculate personal income tax or every possible legal, tax and transaction cost. Results are estimates for education and scenario planning, not financial, tax, legal or investment advice.

---

**Nyumba Ledger** · Clearer numbers for property decisions.

[Open the live calculator](https://nyumbaledger.vercel.app/)

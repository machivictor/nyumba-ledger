import {
  Banknote,
  Building2,
  ClipboardList,
  Coins,
  Home,
  Landmark,
  MapPin,
  Percent,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { InvestmentResults } from "@/lib/calculations/real-estate";
import { formatCurrency, formatMultiple, formatPercent } from "@/lib/formatting/currency";
import type { CalculatorInput } from "@/lib/validation/calculator-schema";

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#668674]">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#1b3428] sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#6b7b70] sm:text-[15px]">{description}</p>
    </div>
  );
}

const useCases = [
  {
    icon: Home,
    title: "First-time investors",
    copy: "Pressure-test the rent, deposit and mortgage before making your first rental-property commitment.",
  },
  {
    icon: Building2,
    title: "Apartment buyers",
    copy: "Include estate or apartment service charges alongside rates, maintenance and insurance.",
  },
  {
    icon: Wallet,
    title: "Landlords",
    copy: "Review how vacancy, management and recurring upkeep affect the income left each month.",
  },
  {
    icon: TrendingUp,
    title: "Property comparison",
    copy: "Use the same method to compare potential purchases in different neighbourhoods and price bands.",
  },
];

export function WhatIsSection() {
  return (
    <section id="what-is" className="section-space page-shell">
      <SectionIntro
        eyebrow="Start with the fundamentals"
        title="What is a real estate investment calculator?"
        description="It is a practical way to test whether a rental property’s expected income can support its running costs and financing. Rather than judging a property by rent alone, the calculation brings vacancy, day-to-day expenses, mortgage repayments and the cash you need upfront into one view."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="rounded-2xl border border-[#e4ebe5] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-24px_rgba(18,57,38,0.32)]">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#eef4ee] text-[#4b7558]"><Icon className="size-4" /></span>
            <h3 className="mt-4 text-base font-semibold text-[#2b4135]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#77857d]">{copy}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-4xl text-sm leading-7 text-[#6e7d73]">
        The useful habit is to model the complete property, not just the purchase price. A property can collect rent consistently and still produce a monthly shortfall once its costs and mortgage are included. The metrics below separate the building’s operating performance from the effect of your financing.
      </p>
    </section>
  );
}

const formulaItems = [
  { label: "Effective gross rental income", formula: "Gross monthly rent × (1 − vacancy rate / 100) × 12", note: "Scheduled rent after allowing for periods when the property may not be occupied or rent may not be collected." },
  { label: "Annual operating expenses", formula: "(Land rates + service charge + insurance + maintenance + management) × 12", note: "The recurring property costs entered in the form, annualised for comparison with annual rental income." },
  { label: "Net Operating Income (NOI)", formula: "Effective gross rental income − annual operating expenses", note: "The property's operating result before any mortgage principal or interest is paid." },
  { label: "Loan principal", formula: "Purchase price × (1 − down payment percentage / 100)", note: "The portion of the purchase price financed by the mortgage in this model." },
  { label: "Monthly mortgage repayment", formula: "M = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1]", note: "A fixed monthly principal-and-interest repayment. P is the loan principal, r is the monthly interest rate and n is the number of monthly payments. At 0% interest, the principal is divided evenly across the term." },
  { label: "Monthly net cash flow", formula: "(Annual NOI / 12) − monthly mortgage repayment", note: "The estimated monthly surplus or shortfall after operating costs and mortgage debt service." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-space border-y border-[#e6ece6] bg-[#f6f8f5]">
      <div className="page-shell">
        <SectionIntro
          eyebrow="The calculation model"
          title="How the calculator works"
          description="The model separates property performance from financing. First it estimates the income the property can earn after vacancy and operating costs. It then applies the mortgage repayment to show the cash flow supported by your chosen financing structure."
        />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {formulaItems.map((item, index) => (
            <article key={item.label} className="rounded-2xl border border-[#e2eae3] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#87a08e]">Step {index + 1}</span>
                <span className="size-1.5 rounded-full bg-[#83a58b]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[#2a4134]">{item.label}</h3>
              <div className="mt-3 rounded-xl bg-[#f4f7f3] px-3.5 py-3">
                <code className="block whitespace-normal break-words font-mono text-[11px] leading-5 text-[#315c45]">{item.formula}</code>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#7a887f]">{item.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[#e2eae3] bg-white p-5 md:col-span-1">
            <h3 className="text-sm font-semibold text-[#2a4134]">Capitalisation rate</h3>
            <code className="mt-3 block rounded-lg bg-[#f4f7f3] p-3 font-mono text-[11px] leading-5 text-[#315c45]">(Annual NOI / purchase price) × 100</code>
            <p className="mt-2 text-xs leading-6 text-[#7a887f]">The property’s annual operating yield, before financing.</p>
          </div>
          <div className="rounded-2xl border border-[#e2eae3] bg-white p-5 md:col-span-1">
            <h3 className="text-sm font-semibold text-[#2a4134]">Cash-on-cash return</h3>
            <code className="mt-3 block rounded-lg bg-[#f4f7f3] p-3 font-mono text-[11px] leading-5 text-[#315c45]">(Annual net cash flow / initial capital) × 100</code>
            <p className="mt-2 text-xs leading-6 text-[#7a887f]">The annual cash return relative to the cash you put in at the start.</p>
          </div>
          <div className="rounded-2xl border border-[#e2eae3] bg-white p-5 md:col-span-1">
            <h3 className="text-sm font-semibold text-[#2a4134]">Gross rent multiplier</h3>
            <code className="mt-3 block rounded-lg bg-[#f4f7f3] p-3 font-mono text-[11px] leading-5 text-[#315c45]">Purchase price / gross annual rent</code>
            <p className="mt-2 text-xs leading-6 text-[#7a887f]">A simple price-to-rent ratio. It does not account for vacancy or expenses.</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-[#dce8dd] bg-[#edf4ed] p-4 sm:p-5">
          <p className="text-sm leading-7 text-[#496451]"><strong className="font-semibold text-[#294c36]">Important distinction:</strong> NOI does not subtract mortgage repayments. The monthly net cash flow does. Keeping these separate lets you compare the underlying property with the impact of different down payments, interest rates and loan terms.</p>
        </div>
      </div>
    </section>
  );
}

const concepts = [
  {
    icon: Banknote,
    title: "Net Operating Income (NOI)",
    copy: "The income left after vacancy and recurring operating expenses, before mortgage payments. It helps you judge how the property performs as an asset, independently of how you finance it.",
    label: "Operating performance",
  },
  {
    icon: Percent,
    title: "Capitalization Rate (Cap Rate)",
    copy: "Annual NOI divided by the property purchase price. It expresses the property's unleveraged operating yield and is useful when comparing properties with different financing arrangements.",
    label: "Property-level yield",
  },
  {
    icon: PiggyBank,
    title: "Cash-on-Cash Return", 
    copy: "Annual net cash flow after mortgage repayments divided by your initial capital invested. It reflects the cash return on the money you actually contribute at acquisition.",
    label: "Your cash invested",
  },
  {
    icon: Coins,
    title: "Gross Rent Multiplier (GRM)",
    copy: "The purchase price divided by gross scheduled annual rent, before vacancy and expenses. It is a quick screening ratio, not a measure of actual profit or cash flow.",
    label: "Price-to-rent ratio",
  },
];

export function KeyConceptsSection() {
  return (
    <section id="key-concepts" className="section-space page-shell">
      <SectionIntro
        eyebrow="Understand the measures"
        title="Four metrics worth knowing"
        description="Each metric answers a different question. Look at them together rather than relying on a single percentage to decide whether a property is suitable."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {concepts.map(({ icon: Icon, title, copy, label }) => (
          <article key={title} className="rounded-2xl border border-[#e2eae3] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#eef4ee] text-[#477355]"><Icon className="size-[18px]" /></span>
              <Badge className="border-[#e4ebe4] bg-[#fafcf9] text-[#7b8d80]">{label}</Badge>
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#233a2e]">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#718077]">{copy}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-[#dce8dd] bg-[#f4f8f3] p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-[#2a4635]">Cap rate vs. cash-on-cash return</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#63816b]">Cap rate</p>
            <p className="mt-1 text-sm leading-7 text-[#607367]">Uses NOI and purchase price. It does not change just because you change your down payment or mortgage rate.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#63816b]">Cash-on-cash</p>
            <p className="mt-1 text-sm leading-7 text-[#607367]">Uses cash flow after debt service and your initial cash contribution. It changes when financing or acquisition costs change.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkedExampleSection({ input, results }: { input: CalculatorInput; results: InvestmentResults }) {
  const rows = [
    ["Property purchase price", formatCurrency(input.purchasePrice)],
    ["Down payment (20%)", formatCurrency(results.downPaymentAmount)],
    ["Mortgage principal", formatCurrency(results.loanPrincipal)],
    ["Gross scheduled monthly rent", formatCurrency(input.monthlyRent)],
    ["Vacancy deduction per month", `− ${formatCurrency(results.vacancyLossMonthly)}`],
    ["Effective monthly rental income", formatCurrency(results.effectiveMonthlyRentalIncome)],
    ["Monthly operating expenses", formatCurrency(results.monthlyOperatingExpenses)],
    ["Monthly net operating income", formatCurrency(results.monthlyNOI)],
    ["Monthly mortgage repayment", formatCurrency(results.monthlyMortgagePayment)],
  ];

  return (
    <section id="worked-example" className="section-space border-y border-[#e6ece6] bg-[#f6f8f5]">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div>
            <Badge className="border-[#dce8dd] bg-white text-[#52765a]">Illustrative Kenyan scenario</Badge>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#1b3428] sm:text-3xl">A worked example: a KSh 8 million rental property</h2>
            <p className="mt-4 text-sm leading-7 text-[#6b7b70]">Consider a property purchased for KSh 8,000,000 and expected to rent for KSh 40,700 per month. The illustration uses a 20% down payment, 13.5% annual interest rate over 12 years, a 5% vacancy allowance and the operating costs in the calculator defaults.</p>
            <p className="mt-4 text-xs leading-6 text-[#89968d]">Acquisition and financing costs are set to KSh 0 in this example only. Replace this with your actual combined costs when assessing a real purchase.</p>
            <div className="mt-6 rounded-2xl border border-[#dce7dc] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#819187]">Initial capital required</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#244334]">{formatCurrency(results.initialCapitalInvested)}</p>
              <p className="mt-1 text-xs text-[#85938a]">Down payment plus acquisition and financing costs entered above.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e0e8e1] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[#2c4336]">Calculation walkthrough</h3>
              <span className="text-[10px] font-medium text-[#8a998f]">Default inputs</span>
            </div>
            <div className="mt-4 space-y-0.5">
              {rows.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-[#eef2ee] py-2.5 last:border-0">
                  <span className="text-xs leading-5 text-[#7b8980]">{label}</span>
                  <span className="shrink-0 text-right text-xs font-semibold tabular-nums text-[#344a3c]">{value}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#f5f8f4] p-3.5">
                <p className="text-[10px] text-[#829187]">Annual NOI</p>
                <p className="mt-1.5 text-base font-semibold text-[#294535]">{formatCurrency(results.annualNOI)}</p>
              </div>
              <div className="rounded-xl bg-[#f5f8f4] p-3.5">
                <p className="text-[10px] text-[#829187]">Capitalisation rate</p>
                <p className="mt-1.5 text-base font-semibold text-[#294535]">{formatPercent(results.capRate)}</p>
              </div>
              <div className="rounded-xl bg-[#f5f8f4] p-3.5">
                <p className="text-[10px] text-[#829187]">Monthly net cash flow</p>
                <p className={`mt-1.5 text-base font-semibold ${results.monthlyNetCashFlow >= 0 ? "text-[#16734e]" : "text-[#bd5c4d]"}`}>{results.monthlyNetCashFlow < 0 ? "−" : ""}{formatCurrency(Math.abs(results.monthlyNetCashFlow))}</p>
              </div>
              <div className="rounded-xl bg-[#f5f8f4] p-3.5">
                <p className="text-[10px] text-[#829187]">Cash-on-cash return</p>
                <p className={`mt-1.5 text-base font-semibold ${results.cashOnCashReturn !== null && results.cashOnCashReturn >= 0 ? "text-[#16734e]" : "text-[#bd5c4d]"}`}>{formatPercent(results.cashOnCashReturn)}</p>
              </div>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-[#929f96]">Gross scheduled rental yield: {formatPercent(results.grossScheduledRentalYield)} · Gross rent multiplier: {formatMultiple(results.grossRentMultiplier)}. All example values are calculated from the stated assumptions using the same formulas as the calculator.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  "Enter the property's purchase price, including the amount agreed with the seller.",
  "Add your down payment and the lender's annual interest rate and loan term.",
  "Enter the expected monthly rent based on comparable properties in the same area.",
  "Set a vacancy allowance to account for tenant turnover or periods without rent.",
  "Add monthly land rates, service charge, insurance, maintenance and management costs. Include your actual one-off acquisition costs separately.",
  "Calculate, review the result dashboard and test alternative assumptions before making an offer.",
];

export function HowToUseSection() {
  return (
    <section id="how-to-use" className="section-space page-shell">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
        <SectionIntro
          eyebrow="A practical workflow"
          title="How to use the calculator"
          description="Work with the best figures you can verify. For estimates you cannot yet confirm, use a cautious assumption and test how the result changes."
        />
        <ol className="space-y-0">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4 border-b border-[#e9eee9] py-4 first:pt-0 last:border-0">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#edf4ee] text-xs font-bold tabular-nums text-[#4b7659]">{index + 1}</span>
              <p className="pt-1 text-sm leading-6 text-[#66766c]">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const kenyaFactors = [
  { icon: MapPin, title: "Location and rental demand", copy: "Check access to work, transport, schools, services and the amenities that matter to your likely tenants." },
  { icon: Home, title: "Neighbourhood rental yields", copy: "Rents and purchase prices can vary widely between neighbourhoods and property types. Compare like with like." },
  { icon: Banknote, title: "Purchase price", copy: "An attractive rent cannot compensate indefinitely for an acquisition price that is too high relative to income." },
  { icon: ClipboardList, title: "Vacancy and tenant turnover", copy: "Allow for time between tenants, delayed payments, letting costs and any refurbishment needed before re-letting." },
  { icon: Landmark, title: "County land rates", copy: "Confirm the applicable county charges, payment frequency and any outstanding balances for the specific property." },
  { icon: Building2, title: "Apartment service charges", copy: "Ask what the charge covers, how often it is reviewed and whether there are separate levies or planned works." },
  { icon: ShieldCheck, title: "Property insurance", copy: "Get an actual quotation and confirm the property, landlord and liability risks included in the cover." },
  { icon: Wrench, title: "Maintenance and renovations", copy: "Inspect the building and budget for both routine upkeep and larger repairs that may not happen every month." },
  { icon: Wallet, title: "Property management costs", copy: "Include agent fees and understand what services are covered, how rent is collected and who pays letting expenses." },
  { icon: Percent, title: "Mortgage interest rates", copy: "Compare lender offers, fees and whether the rate is fixed or variable. A higher rate increases monthly debt service." },
  { icon: Coins, title: "Loan tenure and repayments", copy: "A longer term can reduce the scheduled monthly payment but usually increases the total interest paid over the life of a loan." },
  { icon: TrendingUp, title: "Appreciation and market conditions", copy: "Future prices and rent growth are uncertain. This calculator does not assume appreciation or include a resale forecast." },
];

export function KenyaFactorsSection() {
  return (
    <section id="kenya-factors" className="section-space border-y border-[#e6ece6] bg-[#f6f8f5]">
      <div className="page-shell">
        <SectionIntro
          eyebrow="Local context matters"
          title="Factors that shape rental returns in Kenya"
          description="A spreadsheet cannot replace property-level due diligence. Confirm these details with the county, property manager, lender, insurer and people familiar with the local rental market."
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {kenyaFactors.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="flex gap-3 rounded-2xl border border-[#e1e9e2] bg-white p-4 sm:p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-[#52785d]"><Icon className="size-4" /></span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-[#30473a]">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#78867e]">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What is a good rental yield in Kenya?",
    answer: "There is no single rental-yield figure that makes every Kenyan property a good investment. Compare the expected annual rent with the full purchase price for similar properties in the same neighbourhood, then account for vacancy, service charge, land rates, maintenance, insurance and management. A gross yield is only a starting point; net operating income and cash flow give a fuller picture.",
  },
  {
    question: "What is a good capitalization rate?",
    answer: "A suitable cap rate depends on the neighbourhood, property type, condition, tenant demand, risk and the quality of the income assumptions. Compare properties with similar characteristics and verify actual rent and expenses. A higher percentage is not automatically better if it reflects greater vacancy, repairs or location risk.",
  },
  {
    question: "How do I calculate rental property cash flow?",
    answer: "Start with monthly rent and subtract the vacancy allowance to estimate effective rental income. Subtract monthly operating expenses to get monthly NOI. Then subtract the mortgage principal-and-interest payment to estimate monthly net cash flow. This calculator annualises the income and operating expense figures for the NOI and return metrics.",
  },
  {
    question: "What is the difference between NOI and net profit?",
    answer: "Net Operating Income is the property's income after vacancy and operating expenses but before mortgage debt service. The monthly net cash flow shown here then subtracts the modelled mortgage payment. Neither figure includes every possible tax, legal, transaction or personal financing consideration, so they should not be treated as a complete accounting profit figure.",
  },
  {
    question: "How does mortgage financing affect rental cash flow?",
    answer: "The mortgage adds a recurring principal-and-interest payment after operating income has been calculated. A larger loan, higher interest rate or shorter repayment term can increase the monthly payment and reduce cash flow. A larger down payment may reduce debt service, but it also increases the cash you commit upfront.",
  },
  {
    question: "What expenses should I consider before buying a rental property?",
    answer: "Consider county land rates, service charge, property insurance, routine maintenance, larger repair reserves and property management. Separately estimate immediate costs such as stamp duty, legal and conveyancing fees, valuation and lender charges. Use actual property and professional quotations rather than assuming one universal cost rate.",
  },
  {
    question: "Should I include service charge in my calculations?",
    answer: "Yes, when it is a cost you are responsible for as the owner or landlord. Include the amount you expect to pay, and check what the service charge covers. If a tenant pays a separate amount directly, avoid counting the same expense twice in your own cash-flow assumptions.",
  },
  {
    question: "What is a good cash-on-cash return?",
    answer: "There is no universal target that suits every investor or property. The result depends on the cash committed, mortgage terms, operating risks and your alternatives. Compare the figure with your own return requirements and stress-test rent, vacancy, interest rates and repair costs rather than relying on a fixed benchmark.",
  },
];

export function FaqSection() {
  return (
    <section id="faqs" className="section-space page-shell">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <SectionIntro
          eyebrow="Common questions"
          title="Real estate investment FAQs"
          description="A few practical answers to questions that come up when analysing a rental property in Kenya."
        />
        <div className="rounded-2xl border border-[#e2eae3] bg-white px-5 sm:px-6">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export function DisclaimerSection() {
  return (
    <section id="disclaimer" className="page-shell pb-14 sm:pb-16">
      <div className="rounded-2xl border border-[#e5e9df] bg-[#f7f9f5] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#71866f]"><ShieldCheck className="size-4" /></span>
          <div>
            <h2 className="text-sm font-semibold text-[#354a3b]">Financial disclaimer</h2>
            <p className="mt-2 text-xs leading-6 text-[#758279]">This calculator provides estimates based on the information and assumptions you enter. Actual rental income, vacancy, operating expenses and property condition may differ. Mortgage rates, approval criteria, fees and lending conditions vary between financial institutions. The model does not account for every possible tax, legal, regulatory or transaction cost, and it does not forecast property appreciation, resale proceeds or personal income tax. Confirm figures with the relevant county office, lender, insurer and qualified legal, tax or financial professionals before committing funds. Results are for education and planning only and do not constitute financial, tax, legal or investment advice.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

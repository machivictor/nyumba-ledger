import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DisclaimerSection, FaqSection, HowItWorksSection, KenyaFactorsSection, KeyConceptsSection, WhatIsSection } from "@/components/sections/content-sections";
import { HeroSection } from "@/components/sections/hero-section";

export default function HomePage() {


  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />

        <section id="calculator" className="page-shell scroll-mt-24 py-14 sm:py-16 lg:py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#668674]">Property analysis</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1b3428] sm:text-3xl">Run the numbers on your next property</h2>
              <p className="mt-3 text-sm leading-6 text-[#6b7b70]">Adjust the starting assumptions to match the property, your lender's offer and the costs you expect to pay.</p>
            </div>
          </div>
          <CalculatorWorkspace />
        </section>

        <WhatIsSection />
        <HowItWorksSection />
        <KeyConceptsSection />
        <KenyaFactorsSection />
        <FaqSection />
        <DisclaimerSection />
      </main>
      <SiteFooter />
    </>
  );
}

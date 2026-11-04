import Link from "next/link";
import { Building2, Menu } from "lucide-react";

const navigation = [
  { label: "Calculator", href: "#calculator-workspace" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Key concepts", href: "#key-concepts" },
  { label: "FAQs", href: "#faqs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e7ece7]/90 bg-[#fbfcfa]/95 backdrop-blur-md">
      <div className="page-shell flex h-[72px] items-center justify-between gap-4">
        <Link href="#top" className="flex min-w-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#0d7058]">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#173d31] text-white">
            <Building2 className="size-[18px]" strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold tracking-tight text-[#1c3429]">Nyumba Ledger</span>
            <span className="hidden text-[10px] font-medium tracking-[0.04em] text-[#85938a] sm:block">PROPERTY INVESTMENT TOOLS</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-[13px] font-medium text-[#66756c] transition hover:text-[#0d5b49]">
              {item.label}
            </Link>
          ))}
        </nav>

        <a href="#calculator-workspace" className="hidden min-h-10 items-center gap-2 rounded-xl bg-[#0d5b49] px-4 text-xs font-semibold text-white transition hover:bg-[#094b3c] md:inline-flex">
          Open calculator <span aria-hidden="true">↗</span>
        </a>

        <details className="group relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-xl border border-[#e0e8e1] bg-white text-[#395346] outline-none focus-visible:ring-2 focus-visible:ring-[#0d7058] [&::-webkit-details-marker]:hidden" aria-label="Open navigation">
            <Menu className="size-5" />
          </summary>
          <nav aria-label="Mobile navigation" className="absolute right-0 top-12 flex w-56 flex-col gap-1 rounded-2xl border border-[#e0e8e1] bg-white p-2 shadow-xl">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#53645b] hover:bg-[#f3f7f3] hover:text-[#0d5b49]">
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

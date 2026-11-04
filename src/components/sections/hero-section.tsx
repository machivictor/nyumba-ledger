import Link from "next/link";
import { ArrowDown, ArrowUpRight, CheckCircle2, ShieldCheck, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[#e6ede7] bg-[#f3f7f2]">
      <div className="page-shell grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(310px,0.7fr)] lg:items-center lg:gap-16 lg:py-20">
        <div className="relative z-10">
          <Badge className="mb-5 border-[#d8e6da] bg-white/80 text-[#37674c]">
            <span className="size-1.5 rounded-full bg-[#4b9a70]" /> Built for Kenyan property decisions
          </Badge>
          <h1 className="max-w-[720px] text-[clamp(2.4rem,5.2vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.055em]">
            Real Estate Investment Calculator
          </h1>
          <p className="mt-5 max-w-[630px] text-base leading-7 text-[#64756a] sm:text-[17px] sm:leading-8">
            Understand the numbers behind a rental property before you commit. Model mortgage repayments, operating costs, rental income and the returns that matter — all in Kenyan Shillings.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#calculator-workspace" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0d5b49] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#094b3c]">
              Analyse a property <ArrowUpRight className="size-4" />
            </Link>
            <Link href="#how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-[#4f6659] transition hover:bg-white/70">
              See how it works <ArrowDown className="size-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#728278]">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-[#4d936d]" /> Runs in your browser</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-[#4d936d]" /> No account required</span>
            <span className="inline-flex items-center gap-1.5"><Wallet className="size-3.5 text-[#4d936d]" /> KSh calculations</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[430px] lg:ml-auto">
          <div className="absolute -right-8 -top-10 size-40 rounded-full bg-[#dfece0] blur-2xl" />
          <div className="absolute -bottom-8 -left-8 size-36 rounded-full bg-[#e5e9d8] blur-2xl" />
          <div className="relative rounded-[26px] border border-[#dce6dc] bg-white p-5 shadow-[0_28px_60px_-38px_rgba(20,60,42,0.38)] sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-[#edf1ed] pb-4">
              <div>
                <p className="text-xs font-semibold text-[#3b5145]">Investment overview</p>
                <p className="mt-1 text-[10px] text-[#9aa79e]">A clearer view of your property</p>
              </div>
              <span className="rounded-full bg-[#edf6ef] px-2.5 py-1 text-[10px] font-bold text-[#3b8056]">KES · LOCAL</span>
            </div>
            <div className="py-5">
              <div className="flex items-center justify-between text-xs text-[#839188]">
                <span>Monthly net cash flow</span><span className="rounded-full bg-[#fff1ec] px-2 py-1 text-[10px] font-semibold text-[#a85647]">Modelled</span>
              </div>
              <p className="mt-2 text-[2.35rem] font-semibold tracking-[-0.05em] text-[#203a2e]">KSh <span className="text-[#8b9a90]">—</span></p>
              <p className="mt-1 text-[11px] text-[#94a097]">See if rent covers costs and financing</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#f5f8f4] p-3.5">
                <p className="text-[10px] font-medium text-[#87958c]">Capitalisation rate</p>
                <p className="mt-2 text-lg font-semibold text-[#294638]">—%</p>
              </div>
              <div className="rounded-xl bg-[#f5f8f4] p-3.5">
                <p className="text-[10px] font-medium text-[#87958c]">Annual NOI</p>
                <p className="mt-2 text-lg font-semibold text-[#294638]">KSh —</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#e8eee8] p-3.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#eaf2eb] text-[#467354]"><Wallet className="size-4" /></span>
              <div>
                <p className="text-xs font-semibold text-[#40564a]">Your assumptions, your results</p>
                <p className="mt-0.5 text-[10px] text-[#8c9a91]">Adjust every input to test a scenario.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

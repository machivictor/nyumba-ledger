import Link from "next/link";
import { Building2, ArrowUp } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e5ebe5] bg-[#f6f8f5]">
      <div className="page-shell flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#173d31] text-white"><Building2 className="size-4" /></span>
          <div>
            <p className="text-xs font-bold text-[#2c4134]">Nyumba Ledger</p>
            <p className="mt-0.5 text-[10px] text-[#8a9890]">Clearer numbers for property decisions.</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 text-[11px] text-[#849188] sm:justify-end">
          <span>© {new Date().getFullYear()} Nyumba Ledger</span>
          <Link href="#top" className="inline-flex items-center gap-1.5 font-semibold text-[#557160] hover:text-[#0d5b49]">Back to top <ArrowUp className="size-3" /></Link>
        </div>
      </div>
    </footer>
  );
}

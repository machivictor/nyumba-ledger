import type { ReactNode } from "react";

interface ResultCardProps {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  tone?: "default" | "positive" | "negative";
}

export function ResultCard({ label, value, description, icon, tone = "default" }: ResultCardProps) {
  const valueTone = tone === "positive" ? "text-[#16734e]" : tone === "negative" ? "text-[#bd5c4d]" : "text-[#24382e]";

  return (
    <article className="min-w-0 rounded-xl border border-[#e5ece6] bg-white p-4 sm:p-[18px]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold leading-5 text-[#6a7a70]">{label}</p>
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f2f6f2] text-[#658071]">
          {icon}
        </span>
      </div>
      <p className={`break-words text-[clamp(1.1rem,2vw,1.45rem)] font-semibold tracking-tight tabular-nums ${valueTone}`}>
        {value}
      </p>
      <p className="mt-1.5 text-xs leading-4 text-[#8a9890]">{description}</p>
    </article>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[#dce8e0] bg-[#f3f8f3] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#33634d]",
        className,
      )}
      {...props}
    />
  );
}

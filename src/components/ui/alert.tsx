import * as React from "react";
import { cn } from "@/lib/utils";

export function Alert({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="status" className={cn("flex gap-3 rounded-xl border border-[#e5e9df] bg-[#f8faf6] p-4 text-sm text-[#58645b]", className)} {...props} />;
}

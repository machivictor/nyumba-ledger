import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full min-w-0 rounded-xl border border-[#dce5df] bg-[#fbfcfa] px-3.5 text-sm tabular-nums text-[#20352b] outline-none transition placeholder:text-[#9aa69f] hover:border-[#b9c9be] focus:border-[#0d7058] focus:bg-white focus:ring-2 focus:ring-[#0d7058]/10 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

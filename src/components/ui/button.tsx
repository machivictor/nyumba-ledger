import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d5b49] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#0d5b49] text-white shadow-sm hover:bg-[#094b3c]",
        secondary: "border border-[#dce5df] bg-white text-[#23352f] hover:bg-[#f5f8f5]",
        ghost: "text-[#53645d] hover:bg-[#f0f4f0] hover:text-[#17392e]",
        outline: "border border-[#cfdad3] bg-transparent text-[#17392e] hover:bg-[#f3f7f3]",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "min-h-9 rounded-lg px-3 text-xs",
        lg: "min-h-12 px-6 text-sm",
        icon: "size-10 rounded-lg p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };

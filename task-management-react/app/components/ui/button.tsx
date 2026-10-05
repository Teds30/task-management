import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-violet-600 text-white hover:bg-violet-700 active:translate-y-px",
        secondary: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
        outline: "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50",
        destructive: "bg-rose-600 text-white hover:bg-rose-700",
        ghost: "text-slate-400 hover:bg-slate-100 hover:text-slate-700",
        icon: "p-0 text-slate-400 hover:bg-violet-50 hover:text-violet-700",
        text: "rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:text-violet-700",
      },
      size: {
        default: "min-h-10 px-4 text-sm",
        compact: "min-h-9 px-3 text-sm",
        sm: "min-h-8 px-2.5 text-xs",
        icon: "size-8",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
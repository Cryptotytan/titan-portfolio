import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap select-none outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-fg text-accent-fg shadow-border hover:bg-accent hover:shadow-glow",
        ghost:
          "bg-transparent text-fg shadow-border-hover hover:bg-elevated",
        quiet: "bg-transparent text-muted hover:text-fg",
      },
      size: {
        md: "h-11 px-5 text-sm rounded-lg",
        sm: "h-9 px-3.5 text-sm rounded-md",
        lg: "h-12 px-6 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

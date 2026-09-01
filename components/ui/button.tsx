import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-400 disabled:bg-primary-200 disabled:text-white/80",
  secondary:
    "border border-primary-200 bg-white text-primary-500 hover:bg-primary-100 disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-300",
  tertiary:
    "bg-primary-100 text-primary-500 hover:bg-primary-200 disabled:bg-neutral-100 disabled:text-neutral-300",
  text: "bg-transparent text-primary-500 hover:bg-primary-100 disabled:text-neutral-300 disabled:hover:bg-transparent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", type = "button", children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-md px-6 text-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

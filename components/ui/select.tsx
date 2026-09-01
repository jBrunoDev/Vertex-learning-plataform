import { type SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, children, ...props }, ref) {
    return (
      <span className={cn("relative inline-flex w-full max-w-xs", className)}>
        <select
          ref={ref}
          className="h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white px-4 pr-10 text-body text-neutral-900 shadow-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
          strokeWidth={2}
          aria-hidden
        />
      </span>
    );
  },
);

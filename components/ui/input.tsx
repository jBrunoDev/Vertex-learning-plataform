import { type InputHTMLAttributes, forwardRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leadingIcon?: "search" | "none";
  shortcut?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    leadingIcon = "none",
    shortcut,
    type = "text",
    ...props
  },
  ref,
) {
  return (
    <label
      className={cn(
        "flex h-11 w-full items-center gap-3 rounded-md border border-neutral-200 bg-white px-4 text-body text-neutral-900 shadow-sm transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100",
        className,
      )}
    >
      {leadingIcon === "search" ? (
        <Search
          className="size-4 shrink-0 text-neutral-500"
          strokeWidth={2}
          aria-hidden
        />
      ) : null}
      <input
        ref={ref}
        type={type}
        className="min-w-0 flex-1 bg-transparent text-body outline-none placeholder:text-neutral-500"
        {...props}
      />
      {shortcut ? (
        <kbd className="inline-flex shrink-0 items-center rounded-sm border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-small text-neutral-500">
          {shortcut}
        </kbd>
      ) : null}
    </label>
  );
});

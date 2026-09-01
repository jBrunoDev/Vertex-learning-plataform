import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-body", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  className="size-3.5 text-neutral-300"
                  strokeWidth={2}
                  aria-hidden
                />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-neutral-900"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && "font-medium text-neutral-900")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

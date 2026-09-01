"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  className?: string;
  onPageChange?: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  className,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);
  const showEllipsis = totalPages > 4;

  return (
    <nav
      aria-label="Pagination"
      className={cn("inline-flex items-center gap-1", className)}
    >
      <button
        type="button"
        className="inline-flex size-9 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 disabled:opacity-40"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-md text-body font-medium",
            page === currentPage
              ? "bg-primary-500 text-white"
              : "text-neutral-500 hover:bg-neutral-100",
          )}
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </button>
      ))}
      {showEllipsis ? (
        <span className="px-1 text-neutral-300" aria-hidden>
          …
        </span>
      ) : null}
      {totalPages > 3 ? (
        <button
          type="button"
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-md text-body font-medium",
            currentPage === totalPages
              ? "bg-primary-500 text-white"
              : "text-neutral-500 hover:bg-neutral-100",
          )}
          onClick={() => onPageChange?.(totalPages)}
        >
          {totalPages}
        </button>
      ) : null}
      <button
        type="button"
        className="inline-flex size-9 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 disabled:opacity-40"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>
    </nav>
  );
}

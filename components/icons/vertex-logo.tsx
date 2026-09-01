import { cn } from "@/lib/cn";

type VertexLogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function VertexLogo({
  className,
  showWordmark = true,
}: VertexLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="flex size-7 items-center justify-center rounded-lg bg-primary-500 text-white shadow-sm"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 2.5L7 12L12.5 2.5H9.8L7 8.2L4.2 2.5H1.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      {showWordmark ? (
        <span className="text-body-lg font-semibold tracking-tight text-neutral-900">
          Vertex
        </span>
      ) : null}
    </span>
  );
}

import { cn } from "@/lib/cn";

type ProgressProps = {
  value: number;
  showLabel?: boolean;
  className?: string;
};

export function Progress({
  value,
  showLabel = true,
  className,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary-500 transition-[width]"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel ? (
        <span className="shrink-0 text-small text-neutral-500">
          {clamped}% complete
        </span>
      ) : null}
    </div>
  );
}

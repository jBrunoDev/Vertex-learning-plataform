import { cn } from "@/lib/cn";

export type BadgeVariant = "video" | "lesson" | "popular";

type BadgeProps = {
  variant: BadgeVariant;
  className?: string;
  children?: string;
};

const labels: Record<BadgeVariant, string> = {
  video: "VIDEO",
  lesson: "LESSON",
  popular: "POPULAR",
};

const styles: Record<BadgeVariant, string> = {
  video:
    "border border-primary-200 bg-primary-100 text-primary-500",
  lesson:
    "border border-primary-100 bg-white text-primary-400",
  popular:
    "border border-transparent bg-primary-100 text-primary-500",
};

export function Badge({ variant, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-small font-semibold tracking-wide uppercase",
        styles[variant],
        className,
      )}
    >
      {children ?? labels[variant]}
    </span>
  );
}

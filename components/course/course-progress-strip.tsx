import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type CourseProgressStripProps = {
  progressPercent?: number;
  continueHref: string | null;
};

export function CourseProgressStrip({
  progressPercent = 0,
  continueHref,
}: CourseProgressStripProps) {
  const continueClassName =
    "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-primary-500 px-6 text-body font-medium text-white transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";

  return (
    <section
      aria-label="Your progress"
      className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white px-5 py-5 shadow-sm sm:px-6"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-primary-100/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-4 bottom-0 h-16 w-40 opacity-40"
        aria-hidden
      >
        <div className="flex h-full items-end gap-1.5 pr-8">
          {[40, 70, 55, 90, 65, 80, 50].map((height, index) => (
            <span
              key={index}
              className="w-2 rounded-t-sm bg-primary-300"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="shrink-0 sm:w-28">
          <p className="text-body font-medium text-neutral-900">Your Progress</p>
          <p className="mt-0.5 text-small text-neutral-500">
            {progressPercent}% complete
          </p>
        </div>

        <Progress
          value={progressPercent}
          showLabel={false}
          className="min-w-0 flex-1"
        />

        {continueHref ? (
          <Link href={continueHref} className={continueClassName}>
            Continue Learning
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </Link>
        ) : (
          <Button type="button" disabled className="shrink-0">
            Continue Learning
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </Button>
        )}
      </div>
    </section>
  );
}

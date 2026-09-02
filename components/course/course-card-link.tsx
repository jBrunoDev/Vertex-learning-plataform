import Link from "next/link";
import { CourseCard } from "@/components/ui/card";
import { formatDuration } from "@/lib/format-duration";
import type { CourseListItem } from "@/lib/sanity/fetch";
import { cn } from "@/lib/cn";

type CourseCardLinkProps = {
  course: CourseListItem;
  className?: string;
  cardClassName?: string;
};

export function CourseCardLink({
  course,
  className,
  cardClassName,
}: CourseCardLinkProps) {
  const icon = course.icon ?? course.coverImage;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        "group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        className,
      )}
    >
      <CourseCard
        title={course.title}
        description={course.summary ?? ""}
        level={course.levelLabel ?? "—"}
        duration={formatDuration(course.durationSeconds)}
        modules={`${course.moduleCount} ${course.moduleCount === 1 ? "module" : "modules"}`}
        iconSrc={icon?.src}
        iconAlt={icon?.alt || course.title}
        iconFallback={course.title.slice(0, 1)}
        className={cn(
          "gap-6 p-6 sm:p-7 group-hover:-translate-y-1 group-hover:border-neutral-300 group-hover:shadow-md group-focus-visible:-translate-y-1 group-focus-visible:border-neutral-300 group-focus-visible:shadow-md",
          cardClassName,
        )}
      />
    </Link>
  );
}

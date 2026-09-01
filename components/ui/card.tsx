import Image from "next/image";
import { type ReactNode } from "react";
import { ArrowUpRight, Clock3, FileText, Layers, Signal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

type CourseCardProps = {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  icon?: ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  iconFallback?: string;
  className?: string;
};

export function CourseCard({
  title,
  description,
  level,
  duration,
  modules,
  icon,
  iconSrc,
  iconAlt = "",
  iconFallback = "N",
  className,
}: CourseCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-12 items-center justify-center overflow-hidden rounded-md text-body-lg font-bold text-white",
          !icon && !iconSrc ? "bg-neutral-900" : "bg-transparent",
        )}
      >
        {icon ? (
          icon
        ) : iconSrc ? (
          <Image src={iconSrc} alt={iconAlt} width={48} height={48} />
        ) : (
          iconFallback
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-heading-3 font-medium text-neutral-900">{title}</h3>
        <p className="text-body text-neutral-500">{description}</p>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-3 text-small text-neutral-500">
        <span className="inline-flex items-center gap-1">
          <Signal className="size-3.5" strokeWidth={2} aria-hidden />
          {level}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 className="size-3.5" strokeWidth={2} aria-hidden />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1">
          <Layers className="size-3.5" strokeWidth={2} aria-hidden />
          {modules}
        </span>
      </div>
    </article>
  );
}

type LessonCardVideoProps = {
  courseName: string;
  courseIcon?: string;
  title: string;
  description: string;
  lessonLabel: string;
  duration: string;
  startLabel: string;
  thumbnailSrc?: string;
  /** `stack` matches the design-system sheet; `row` is for wide search result lists */
  layout?: "stack" | "row";
  className?: string;
};

export function LessonCardVideo({
  courseName,
  courseIcon = "N",
  title,
  description,
  lessonLabel,
  duration,
  startLabel,
  thumbnailSrc,
  layout = "stack",
  className,
}: LessonCardVideoProps) {
  const isRow = layout === "row";

  return (
    <article
      className={cn(
        "flex h-full gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm",
        isRow ? "flex-col sm:flex-row sm:gap-4" : "flex-col",
        className,
      )}
    >
      {thumbnailSrc || isRow ? (
        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-md bg-neutral-900",
            isRow
              ? "aspect-video w-full self-start sm:h-[88px] sm:w-[140px] sm:aspect-auto"
              : "aspect-video w-full",
          )}
        >
          {thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt=""
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[88px] items-center justify-center text-white/80">
              <span className="text-heading-2 font-bold">{courseIcon}</span>
            </div>
          )}
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-small text-white">
            {duration}
          </span>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-small text-neutral-500">
            <span className="flex size-5 shrink-0 items-center justify-center rounded bg-neutral-900 text-[10px] font-bold text-white">
              {courseIcon}
            </span>
            <span className="truncate">{courseName}</span>
          </div>
          <Badge variant="video" className="shrink-0" />
        </div>
        <h3 className="text-heading-3 font-medium text-neutral-900">{title}</h3>
        <p className="text-body text-neutral-500">{description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="text-small text-neutral-500">
            {lessonLabel} · {duration}
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-body font-medium text-primary-500"
          >
            Watch from {startLabel}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

type LessonCardLessonProps = {
  courseName: string;
  courseIcon?: string;
  title: string;
  description: string;
  moduleLabel: string;
  className?: string;
};

export function LessonCardLesson({
  courseName,
  courseIcon = "N",
  title,
  description,
  moduleLabel,
  className,
}: LessonCardLessonProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-small text-neutral-500">
          <span className="flex size-5 shrink-0 items-center justify-center rounded bg-neutral-900 text-[10px] font-bold text-white">
            {courseIcon}
          </span>
          <span className="truncate">{courseName}</span>
        </div>
        <Badge variant="lesson" className="shrink-0" />
      </div>
      <h3 className="text-heading-3 font-medium text-neutral-900">{title}</h3>
      <p className="text-body text-neutral-500">{description}</p>
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="text-small text-neutral-500">{moduleLabel}</span>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-body font-medium text-primary-500"
        >
          View lesson
          <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </article>
  );
}

type ResourceCardProps = {
  title: string;
  description: string;
  meta: string;
  className?: string;
};

export function ResourceCard({
  title,
  description,
  meta,
  className,
}: ResourceCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-md bg-primary-100 text-primary-500">
        <FileText className="size-5" strokeWidth={2} aria-hidden />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-body-lg font-medium text-neutral-900">{title}</h3>
        <p className="text-body text-neutral-500">{description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="text-small text-neutral-500">{meta}</span>
        <button
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-md text-primary-500 hover:bg-primary-100"
          aria-label={`Open ${title}`}
        >
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

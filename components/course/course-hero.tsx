import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, Clock3, Layers, Signal, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type CourseHeroProps = {
  title: string;
  summary: string | null;
  isPopular: boolean;
  levelLabel: string | null;
  durationLabel: string;
  moduleCountLabel: string;
  studentCountLabel: string | null;
  image: { src: string; alt: string } | null;
  continueHref: string | null;
};

export function CourseHero({
  title,
  summary,
  isPopular,
  levelLabel,
  durationLabel,
  moduleCountLabel,
  studentCountLabel,
  image,
  continueHref,
}: CourseHeroProps) {
  const continueClassName =
    "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-500 px-6 text-body font-medium text-white transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";

  return (
    <section className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:gap-12">
      <div
        className={cn(
          "relative mx-auto aspect-square w-full max-w-[200px] shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-md sm:max-w-[220px] lg:mx-0 lg:w-[220px]",
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || title}
            fill
            sizes="220px"
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="flex size-full items-center justify-center font-display text-5xl font-bold text-white"
            aria-hidden
          >
            {title.slice(0, 1)}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 text-center lg:pt-1 lg:text-left">
        {isPopular ? (
          <Badge variant="popular" className="mb-3">
            POPULAR
          </Badge>
        ) : null}

        <h1 className="font-display text-display-2 font-bold tracking-tight text-neutral-900 sm:text-[40px] sm:leading-[48px]">
          {title}
        </h1>

        {summary ? (
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-neutral-500 lg:mx-0">
            {summary}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-small text-neutral-500 lg:justify-start">
          {levelLabel ? (
            <span className="inline-flex items-center gap-1.5">
              <Signal className="size-3.5" strokeWidth={2} aria-hidden />
              {levelLabel}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5" strokeWidth={2} aria-hidden />
            {durationLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5" strokeWidth={2} aria-hidden />
            {moduleCountLabel}
          </span>
          {studentCountLabel ? (
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" strokeWidth={2} aria-hidden />
              {studentCountLabel}
            </span>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          {continueHref ? (
            <Link href={continueHref} className={continueClassName}>
              Continue Learning
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </Link>
          ) : (
            <Button type="button" disabled>
              Continue Learning
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </Button>
          )}
          <Button type="button" variant="secondary">
            <Bookmark className="size-4" strokeWidth={2} aria-hidden />
            Bookmark
          </Button>
        </div>
      </div>
    </section>
  );
}

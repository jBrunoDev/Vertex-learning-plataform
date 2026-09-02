"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type CurriculumLesson = {
  _id: string;
  title: string;
  slug: string;
  durationLabel: string;
};

export type CurriculumModule = {
  _key: string;
  moduleNumber: number;
  title: string;
  summary: string | null;
  durationLabel: string;
  lessons: CurriculumLesson[];
};

type CourseCurriculumProps = {
  modules: CurriculumModule[];
  moduleCountLabel: string;
  totalDurationLabel: string;
  initialVisibleCount?: number;
};

export function CourseCurriculum({
  modules,
  moduleCountLabel,
  totalDurationLabel,
  initialVisibleCount = 6,
}: CourseCurriculumProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const needsToggle = modules.length > initialVisibleCount;
  const visibleModules =
    needsToggle && !showAll
      ? modules.slice(0, initialVisibleCount)
      : modules;

  function toggleModule(key: string) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <section aria-labelledby="course-content">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <h2
          id="course-content"
          className="text-heading-2 font-semibold text-neutral-900"
        >
          Course Content
        </h2>
        <p className="text-body text-neutral-500">
          {moduleCountLabel}
          <span className="mx-1.5 text-neutral-300" aria-hidden>
            ·
          </span>
          {totalDurationLabel}
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {visibleModules.map((mod) => {
          const isOpen = Boolean(expanded[mod._key]);
          return (
            <li
              key={mod._key}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleModule(mod._key)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-neutral-50 sm:items-center sm:gap-4 sm:px-5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-small font-semibold text-neutral-500">
                  {mod.moduleNumber}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-body-lg font-medium text-neutral-900">
                    {mod.title}
                  </span>
                  {mod.summary ? (
                    <span className="mt-0.5 block text-body text-neutral-500">
                      {mod.summary}
                    </span>
                  ) : null}
                </span>
                <span className="flex shrink-0 items-center gap-2 pt-1 text-body text-neutral-500 sm:pt-0">
                  {mod.durationLabel}
                  <ChevronDown
                    className={cn(
                      "size-4 text-neutral-400 transition-transform",
                      isOpen && "rotate-180",
                    )}
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </button>

              {isOpen && mod.lessons.length > 0 ? (
                <ul className="border-t border-neutral-100 bg-neutral-50/60 px-4 py-2 sm:px-5">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson._id}>
                      <Link
                        href={`/lessons/${lesson.slug}`}
                        className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 text-body transition-colors hover:bg-white"
                      >
                        <span className="min-w-0 text-neutral-700">
                          {lesson.title}
                        </span>
                        <span className="shrink-0 text-small text-neutral-500">
                          {lesson.durationLabel}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>

      {needsToggle ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex h-10 items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-4 text-body font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {showAll
              ? "Show fewer modules"
              : `Show all ${modules.length} modules`}
            <ChevronDown
              className={cn(
                "size-4 text-neutral-400 transition-transform",
                showAll && "rotate-180",
              )}
              strokeWidth={2}
              aria-hidden
            />
          </button>
        </div>
      ) : null}
    </section>
  );
}

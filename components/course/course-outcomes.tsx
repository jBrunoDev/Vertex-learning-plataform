import { LearningOutcomeIcon } from "@/components/icons/learning-outcome-icons";

export type CourseOutcomeItem = {
  _key: string;
  icon: string;
  title: string;
  description: string;
};

type CourseOutcomesProps = {
  outcomes: CourseOutcomeItem[];
};

export function CourseOutcomes({ outcomes }: CourseOutcomesProps) {
  if (!outcomes.length) return null;

  return (
    <section
      aria-labelledby="what-youll-learn"
      className="rounded-xl border border-neutral-200 bg-white/80 p-6 shadow-sm sm:p-8"
    >
      <h2
        id="what-youll-learn"
        className="text-heading-3 font-semibold text-neutral-900"
      >
        What you&apos;ll learn
      </h2>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {outcomes.map((outcome) => (
          <li
            key={outcome._key}
            className="flex gap-3 rounded-lg border border-neutral-100 bg-neutral-50/80 p-4 sm:p-5"
          >
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center text-primary-500">
              <LearningOutcomeIcon name={outcome.icon} className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-body-lg font-medium text-neutral-900">
                {outcome.title}
              </h3>
              <p className="mt-1 text-body text-neutral-500">
                {outcome.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseCurriculum } from "@/components/course/course-curriculum";
import { CourseHero } from "@/components/course/course-hero";
import { CourseOutcomes } from "@/components/course/course-outcomes";
import { CourseProgressStrip } from "@/components/course/course-progress-strip";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Nav } from "@/components/ui/nav";
import { formatDuration, formatStudentCount } from "@/lib/format-duration";
import { getCourseBySlug, getCourseSlugs } from "@/lib/sanity/fetch";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return slugs
    .map((item) => item.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    return { title: "Course not found" };
  }
  return {
    title: course.title,
    description: course.summary ?? undefined,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const durationLabel = formatDuration(course.durationSeconds);
  const moduleCount = course.modules.length;
  const moduleCountLabel = `${moduleCount} ${moduleCount === 1 ? "module" : "modules"}`;
  const studentCountLabel =
    course.studentCount != null
      ? formatStudentCount(course.studentCount)
      : null;

  const heroImage = course.coverImage ?? course.icon;
  const firstLessonSlug =
    course.modules.flatMap((mod) => mod.lessons).find((lesson) => lesson.slug)
      ?.slug ?? null;
  const continueHref = firstLessonSlug
    ? `/lessons/${firstLessonSlug}`
    : null;

  const curriculumModules = course.modules.map((mod) => {
    const moduleSeconds = mod.lessons.reduce(
      (sum, lesson) => sum + (lesson.durationSeconds ?? 0),
      0,
    );
    return {
      _key: mod._key,
      moduleNumber: mod.moduleNumber,
      title: mod.title,
      summary: mod.summary,
      durationLabel: formatDuration(moduleSeconds),
      lessons: mod.lessons.map((lesson) => ({
        _id: lesson._id,
        title: lesson.title,
        slug: lesson.slug,
        durationLabel: formatDuration(lesson.durationSeconds ?? 0),
      })),
    };
  });

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-neutral-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_var(--primary-100)_0%,_transparent_65%)] opacity-70"
        aria-hidden
      />

      <Nav
        activeHref="/courses"
        className="relative z-10 border-b border-neutral-200/80 bg-white/70 px-4 backdrop-blur sm:px-8 lg:px-16"
      />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8 sm:gap-12 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Breadcrumb
          items={[
            { label: "All Courses", href: "/courses" },
            { label: course.title },
          ]}
        />

        <CourseHero
          title={course.title}
          summary={course.summary}
          isPopular={course.isPopular}
          levelLabel={course.levelLabel}
          durationLabel={durationLabel}
          moduleCountLabel={moduleCountLabel}
          studentCountLabel={studentCountLabel}
          image={heroImage}
          continueHref={continueHref}
        />

        <CourseOutcomes outcomes={course.learningOutcomes} />

        <CourseCurriculum
          modules={curriculumModules}
          moduleCountLabel={moduleCountLabel}
          totalDurationLabel={durationLabel}
        />

        <CourseProgressStrip continueHref={continueHref} progressPercent={0} />
      </main>
    </div>
  );
}

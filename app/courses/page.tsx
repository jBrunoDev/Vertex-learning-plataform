import type { Metadata } from "next";
import Link from "next/link";
import { CourseCardLink } from "@/components/course/course-card-link";
import { Nav } from "@/components/ui/nav";
import { getCourses } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Browse every course on Vertex.",
};

export default async function CoursesPage() {
  const courses = await getCourses();
  const countLabel =
    courses.length === 1 ? "1 course" : `${courses.length} courses`;

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-neutral-50">
      <Nav
        activeHref="/courses"
        className="border-b border-neutral-200/80 bg-white/70 px-4 backdrop-blur sm:px-8 lg:px-16"
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-heading-1 font-semibold text-neutral-900">
            All Courses
          </h1>
          <p className="mt-2 text-body text-neutral-500">{countLabel}</p>
        </header>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {courses.map((course) => (
              <CourseCardLink key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-body-lg text-neutral-700">
              No courses are available yet.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex text-body font-medium text-primary-500 hover:text-primary-400"
            >
              Back to home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

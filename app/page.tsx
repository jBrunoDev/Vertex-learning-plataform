import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { HomeWave } from "@/components/home/home-wave";
import { CourseCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Nav } from "@/components/ui/nav";
import { homeCourses } from "@/lib/home-courses";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-neutral-50">
      <Nav className="relative z-10 border-b-0 bg-transparent px-4 sm:px-8 lg:px-16" />

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-20 lg:pb-20 lg:pt-24">
          <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-100 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-primary-500 uppercase">
            Intelligent Learning
          </span>

          <h1 className="mt-8 font-display text-[40px] leading-[48px] font-bold tracking-tight text-neutral-900 sm:mt-10 sm:text-display-1 sm:leading-[56px]">
            Search your learning
            <br />
            in plain English.
          </h1>

          <p className="mt-6 max-w-xl text-body-lg text-neutral-500">
            Vertex understands what you want to learn and finds the exact
            lessons across all your courses.
          </p>

          <Link
            href="/courses"
            className="mt-10 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-500 px-7 text-body font-medium text-white transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Explore Courses
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </Link>

          <div className="mt-10 w-full max-w-2xl sm:mt-12">
            <Input
              leadingIcon="search"
              shortcut="⌘ K"
              placeholder="Ask anything about your learning..."
              aria-label="Ask anything about your learning"
              readOnly
            />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 lg:pt-8">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <h2 className="text-heading-1 font-semibold text-neutral-900">
              All Courses
            </h2>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-body font-medium text-primary-500 transition-colors hover:text-primary-400"
            >
              View all courses
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {homeCourses.map((course) => (
              <CourseCard
                key={course.title}
                title={course.title}
                description={course.description}
                level={course.level}
                duration={course.duration}
                modules={course.modules}
                icon={course.icon}
                className="gap-6 p-6 sm:p-7"
              />
            ))}
          </div>

          <p className="mt-14 flex items-center justify-center gap-2 text-body text-neutral-500 sm:mt-16">
            <Star
              className="size-4 fill-primary-300 text-primary-400"
              strokeWidth={1.75}
              aria-hidden
            />
            New courses and lessons added every week.
          </p>
        </section>
      </main>

      <div className="relative mt-4 h-28 sm:mt-6 sm:h-36">
        <HomeWave />
      </div>
    </div>
  );
}

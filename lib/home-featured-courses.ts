import type { CourseListItem } from "@/lib/sanity/fetch";

/** Prefer popular courses, then title order already on the list; return up to `limit`. */
export function pickHomeCourses(
  courses: CourseListItem[],
  limit = 3,
): CourseListItem[] {
  const popular = courses.filter((course) => course.isPopular);
  const rest = courses.filter((course) => !course.isPopular);
  return [...popular, ...rest].slice(0, limit);
}

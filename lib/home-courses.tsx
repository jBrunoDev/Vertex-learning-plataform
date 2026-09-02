import type { ReactNode } from "react";
import {
  DockerCourseIcon,
  NextjsCourseIcon,
  TypescriptCourseIcon,
} from "@/components/icons/course-icons";

export type HomeCourse = {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  icon: ReactNode;
};

export const homeCourses: HomeCourse[] = [
  {
    title: "Next.js for Production",
    description:
      "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
    icon: <NextjsCourseIcon />,
  },
  {
    title: "Docker Essentials",
    description:
      "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
    icon: <DockerCourseIcon />,
  },
  {
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
    icon: <TypescriptCourseIcon />,
  },
];

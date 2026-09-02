import 'server-only'

import type {
  CATEGORIES_QUERY_RESULT,
  COURSE_BY_SLUG_QUERY_RESULT,
  COURSE_SLUGS_QUERY_RESULT,
  COURSES_QUERY_RESULT,
  INSTRUCTOR_BY_SLUG_QUERY_RESULT,
  INSTRUCTOR_SLUGS_QUERY_RESULT,
  LESSON_BY_SLUG_QUERY_RESULT,
  LESSON_SLUGS_QUERY_RESULT,
} from '@/sanity.types'
import type {SanityImageSource} from '@sanity/image-url'

import {sanityFetch} from './client'
import {toImageDto, type SanityImageDto} from './image'
import {
  CATEGORIES_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSE_SLUGS_QUERY,
  COURSES_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  INSTRUCTOR_SLUGS_QUERY,
  LESSON_BY_SLUG_QUERY,
  LESSON_SLUGS_QUERY,
} from './queries'

export type {SanityImageDto}

const LEVEL_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const

export type CourseLevel = keyof typeof LEVEL_LABELS

export type CourseListItem = {
  _id: string
  title: string
  slug: string
  summary: string | null
  level: CourseLevel | null
  levelLabel: string | null
  price: number | null
  isPopular: boolean
  studentCount: number | null
  moduleCount: number
  durationSeconds: number
  coverImage: SanityImageDto | null
  icon: SanityImageDto | null
  instructor: {name: string; slug: string} | null
  category: {title: string; slug: string} | null
}

export type CourseLessonSummary = {
  _id: string
  title: string
  slug: string
  durationSeconds: number | null
  isFreePreview: boolean
  studentCount: number | null
  poster: SanityImageDto | null
  moduleNumber: number
  lessonNumber: number
  label: string
}

export type CourseModule = {
  _key: string
  title: string
  summary: string | null
  moduleNumber: number
  lessons: CourseLessonSummary[]
}

export type CourseDetail = {
  _id: string
  title: string
  slug: string
  summary: string | null
  level: CourseLevel | null
  levelLabel: string | null
  price: number | null
  isPopular: boolean
  studentCount: number | null
  durationSeconds: number
  coverImage: SanityImageDto | null
  icon: SanityImageDto | null
  learningOutcomes: {
    _key: string
    icon: string
    title: string
    description: string
  }[]
  instructor: {
    _id: string
    name: string
    slug: string
    expertise: string | null
    bio: string | null
    photo: SanityImageDto | null
  } | null
  category: {
    _id: string
    title: string
    slug: string
    description: string | null
  } | null
  modules: CourseModule[]
}

export type LessonResource = {
  _key: string
  type: string
  title: string
  description: string | null
  url: string
}

export type LessonDetail = {
  _id: string
  title: string
  slug: string
  videoUrl: string | null
  poster: SanityImageDto | null
  durationSeconds: number | null
  isFreePreview: boolean
  studentCount: number | null
  notes: NonNullable<LESSON_BY_SLUG_QUERY_RESULT>['notes']
  keyPoints: string[]
  proTip: string | null
  resources: LessonResource[]
  course: {
    _id: string
    title: string
    slug: string
    moduleNumber: number
    lessonNumber: number
    moduleTitle: string
    label: string
    modules: {
      _key: string
      title: string
      moduleNumber: number
      lessons: {
        _id: string
        title: string
        slug: string
        durationSeconds: number | null
        isFreePreview: boolean
      }[]
    }[]
  } | null
}

export type InstructorDetail = {
  _id: string
  name: string
  slug: string
  expertise: string | null
  bio: string | null
  photo: SanityImageDto | null
  courses: {
    _id: string
    title: string
    slug: string
    summary: string | null
    level: CourseLevel | null
    levelLabel: string | null
    coverImage: SanityImageDto | null
  }[]
}

export type CategoryListItem = {
  _id: string
  title: string
  slug: string
  description: string | null
}

function asLevel(value: string | null | undefined): CourseLevel | null {
  if (value === 'beginner' || value === 'intermediate' || value === 'advanced') {
    return value
  }
  return null
}

function levelLabel(level: CourseLevel | null): string | null {
  return level ? LEVEL_LABELS[level] : null
}

function sumDurations(values: Array<number | null | undefined> | null | undefined) {
  if (!values?.length) return 0
  return values.reduce<number>((total, value) => total + (value ?? 0), 0)
}

function lessonLabel(moduleNumber: number, lessonNumber: number, moduleTitle: string) {
  return `Lesson ${moduleNumber}.${lessonNumber} in ${moduleTitle}`
}

function imageSource(value: unknown): SanityImageSource | null {
  if (!value || typeof value !== 'object') return null
  return value as SanityImageSource
}

export async function getCourses(): Promise<CourseListItem[]> {
  const courses: COURSES_QUERY_RESULT = await sanityFetch({
    query: COURSES_QUERY,
    tags: ['course', 'lesson', 'instructor', 'category'],
  })

  return courses.map((course) => {
    const level = asLevel(course.level)
    return {
      _id: course._id,
      title: course.title ?? '',
      slug: course.slug ?? '',
      summary: course.summary ?? null,
      level,
      levelLabel: levelLabel(level),
      price: course.price ?? null,
      isPopular: course.isPopular,
      studentCount: course.studentCount ?? null,
      moduleCount: course.moduleCount ?? 0,
      durationSeconds: sumDurations(course.lessonDurations),
      coverImage: toImageDto(imageSource(course.coverImage), 800),
      icon: toImageDto(imageSource(course.icon), 128),
      instructor:
        course.instructor?.name && course.instructor.slug
          ? {name: course.instructor.name, slug: course.instructor.slug}
          : null,
      category:
        course.category?.title && course.category.slug
          ? {title: course.category.title, slug: course.category.slug}
          : null,
    }
  })
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const course: COURSE_BY_SLUG_QUERY_RESULT = await sanityFetch({
    query: COURSE_BY_SLUG_QUERY,
    params: {slug},
    tags: ['course', `course:${slug}`, 'lesson', 'instructor', 'category'],
  })

  if (!course?._id || !course.slug) return null

  const level = asLevel(course.level)
  const modules: CourseModule[] = (course.modules ?? []).flatMap((mod, moduleIndex) => {
    if (!mod) return []
    const moduleNumber = moduleIndex + 1
    const moduleTitle = mod.title ?? 'Module'
    const lessons: CourseLessonSummary[] = (mod.lessons ?? []).flatMap(
      (lesson, lessonIndex) => {
        if (!lesson?._id || !lesson.slug) return []
        const lessonNumber = lessonIndex + 1
        return [
          {
            _id: lesson._id,
            title: lesson.title ?? '',
            slug: lesson.slug,
            durationSeconds: lesson.durationSeconds ?? null,
            isFreePreview: Boolean(lesson.isFreePreview),
            studentCount: lesson.studentCount ?? null,
            poster: toImageDto(imageSource(lesson.poster), 640),
            moduleNumber,
            lessonNumber,
            label: lessonLabel(moduleNumber, lessonNumber, moduleTitle),
          },
        ]
      },
    )

    return [
      {
        _key: mod._key,
        title: moduleTitle,
        summary: mod.summary ?? null,
        moduleNumber,
        lessons,
      },
    ]
  })

  return {
    _id: course._id,
    title: course.title ?? '',
    slug: course.slug,
    summary: course.summary ?? null,
    level,
    levelLabel: levelLabel(level),
    price: course.price ?? null,
    isPopular: course.isPopular,
    studentCount: course.studentCount ?? null,
    durationSeconds: modules.reduce(
      (total, mod) =>
        total +
        mod.lessons.reduce((sum, lesson) => sum + (lesson.durationSeconds ?? 0), 0),
      0,
    ),
    coverImage: toImageDto(imageSource(course.coverImage), 1200),
    icon: toImageDto(imageSource(course.icon), 128),
    learningOutcomes: (course.learningOutcomes ?? []).flatMap((outcome) => {
      if (!outcome?._key || !outcome.icon || !outcome.title || !outcome.description) {
        return []
      }
      return [
        {
          _key: outcome._key,
          icon: outcome.icon,
          title: outcome.title,
          description: outcome.description,
        },
      ]
    }),
    instructor:
      course.instructor?._id && course.instructor.name && course.instructor.slug
        ? {
            _id: course.instructor._id,
            name: course.instructor.name,
            slug: course.instructor.slug,
            expertise: course.instructor.expertise ?? null,
            bio: course.instructor.bio ?? null,
            photo: toImageDto(imageSource(course.instructor.photo), 400),
          }
        : null,
    category:
      course.category?._id && course.category.title && course.category.slug
        ? {
            _id: course.category._id,
            title: course.category.title,
            slug: course.category.slug,
            description: course.category.description ?? null,
          }
        : null,
    modules,
  }
}

export async function getLessonBySlug(slug: string): Promise<LessonDetail | null> {
  const lesson: LESSON_BY_SLUG_QUERY_RESULT = await sanityFetch({
    query: LESSON_BY_SLUG_QUERY,
    params: {slug},
    tags: ['lesson', `lesson:${slug}`, 'course'],
  })

  if (!lesson?._id || !lesson.slug) return null

  let parent: LessonDetail['course'] = null
  if (lesson.course?._id && lesson.course.slug && lesson.course.title) {
    const modules = (lesson.course.modules ?? []).flatMap((mod, moduleIndex) => {
      if (!mod) return []
      return [
        {
          _key: mod._key,
          title: mod.title ?? 'Module',
          moduleNumber: moduleIndex + 1,
          lessons: (mod.lessons ?? []).flatMap((nested) => {
            if (!nested?._id || !nested.slug) return []
            return [
              {
                _id: nested._id,
                title: nested.title ?? '',
                slug: nested.slug,
                durationSeconds: nested.durationSeconds ?? null,
                isFreePreview: Boolean(nested.isFreePreview),
              },
            ]
          }),
        },
      ]
    })

    let moduleNumber = 1
    let lessonNumber = 1
    let moduleTitle = modules[0]?.title ?? 'Module'
    for (const mod of modules) {
      const index = mod.lessons.findIndex((item) => item._id === lesson._id)
      if (index >= 0) {
        moduleNumber = mod.moduleNumber
        lessonNumber = index + 1
        moduleTitle = mod.title
        break
      }
    }

    parent = {
      _id: lesson.course._id,
      title: lesson.course.title,
      slug: lesson.course.slug,
      moduleNumber,
      lessonNumber,
      moduleTitle,
      label: lessonLabel(moduleNumber, lessonNumber, moduleTitle),
      modules,
    }
  }

  return {
    _id: lesson._id,
    title: lesson.title ?? '',
    slug: lesson.slug,
    videoUrl: lesson.videoUrl ?? null,
    poster: toImageDto(imageSource(lesson.poster), 1280),
    durationSeconds: lesson.durationSeconds ?? null,
    isFreePreview: lesson.isFreePreview,
    studentCount: lesson.studentCount ?? null,
    notes: lesson.notes ?? null,
    keyPoints: (lesson.keyPoints ?? []).filter((point): point is string => Boolean(point)),
    proTip: lesson.proTip ?? null,
    resources: (lesson.resources ?? []).flatMap((resource) => {
      if (!resource?._key || !resource.type || !resource.title || !resource.url) {
        return []
      }
      return [
        {
          _key: resource._key,
          type: resource.type,
          title: resource.title,
          description: resource.description ?? null,
          url: resource.url,
        },
      ]
    }),
    course: parent,
  }
}

export async function getInstructorBySlug(
  slug: string,
): Promise<InstructorDetail | null> {
  const instructor: INSTRUCTOR_BY_SLUG_QUERY_RESULT = await sanityFetch({
    query: INSTRUCTOR_BY_SLUG_QUERY,
    params: {slug},
    tags: ['instructor', `instructor:${slug}`, 'course'],
  })

  if (!instructor?._id || !instructor.slug || !instructor.name) return null

  return {
    _id: instructor._id,
    name: instructor.name,
    slug: instructor.slug,
    expertise: instructor.expertise ?? null,
    bio: instructor.bio ?? null,
    photo: toImageDto(imageSource(instructor.photo), 400),
    courses: (instructor.courses ?? []).flatMap((course) => {
      if (!course?._id || !course.slug || !course.title) return []
      const level = asLevel(course.level)
      return [
        {
          _id: course._id,
          title: course.title,
          slug: course.slug,
          summary: course.summary ?? null,
          level,
          levelLabel: levelLabel(level),
          coverImage: toImageDto(imageSource(course.coverImage), 800),
        },
      ]
    }),
  }
}

export async function getCategories(): Promise<CategoryListItem[]> {
  const categories: CATEGORIES_QUERY_RESULT = await sanityFetch({
    query: CATEGORIES_QUERY,
    tags: ['category'],
  })

  return categories.flatMap((category) => {
    if (!category._id || !category.slug || !category.title) return []
    return [
      {
        _id: category._id,
        title: category.title,
        slug: category.slug,
        description: category.description ?? null,
      },
    ]
  })
}

export async function getCourseSlugs(): Promise<COURSE_SLUGS_QUERY_RESULT> {
  return sanityFetch({
    query: COURSE_SLUGS_QUERY,
    tags: ['course'],
  })
}

export async function getLessonSlugs(): Promise<LESSON_SLUGS_QUERY_RESULT> {
  return sanityFetch({
    query: LESSON_SLUGS_QUERY,
    tags: ['lesson'],
  })
}

export async function getInstructorSlugs(): Promise<INSTRUCTOR_SLUGS_QUERY_RESULT> {
  return sanityFetch({
    query: INSTRUCTOR_SLUGS_QUERY,
    tags: ['instructor'],
  })
}

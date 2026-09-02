import {defineQuery} from 'next-sanity'

const imageFields = /* groq */ `
  alt,
  hotspot,
  crop,
  asset->{_id, url}
`

const catalogLessonFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  durationSeconds,
  isFreePreview,
  studentCount,
  poster { ${imageFields} }
`

export const COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    level,
    price,
    "isPopular": coalesce(isPopular, false),
    studentCount,
    coverImage { ${imageFields} },
    icon { ${imageFields} },
    instructor->{ name, "slug": slug.current },
    category->{ title, "slug": slug.current },
    "moduleCount": count(modules),
    "lessonDurations": modules[].lessons[]->durationSeconds
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    level,
    price,
    "isPopular": coalesce(isPopular, false),
    studentCount,
    coverImage { ${imageFields} },
    icon { ${imageFields} },
    learningOutcomes[] {
      _key,
      icon,
      title,
      description
    },
    instructor->{
      _id,
      name,
      "slug": slug.current,
      expertise,
      bio,
      photo { ${imageFields} }
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    modules[] {
      _key,
      title,
      summary,
      lessons[]->{ ${catalogLessonFields} }
    }
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster { ${imageFields} },
    durationSeconds,
    "isFreePreview": coalesce(isFreePreview, false),
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[] {
      _key,
      type,
      title,
      description,
      url
    },
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      modules[] {
        _key,
        title,
        lessons[]->{
          _id,
          title,
          "slug": slug.current,
          durationSeconds,
          isFreePreview
        }
      }
    }
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    expertise,
    bio,
    photo { ${imageFields} },
    "courses": *[_type == "course" && instructor._ref == ^._id && defined(slug.current)] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      level,
      coverImage { ${imageFields} }
    }
  }
`)

export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]{ "slug": slug.current }
`)

export const LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && defined(slug.current)]{ "slug": slug.current }
`)

export const INSTRUCTOR_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && defined(slug.current)]{ "slug": slug.current }
`)

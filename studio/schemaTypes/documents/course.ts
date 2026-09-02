import {BookIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {imageWithAlt} from '../shared/image'
import {slugField} from '../shared/slug'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
  groups: [
    {name: 'marketing', title: 'Marketing', default: true},
    {name: 'curriculum', title: 'Curriculum'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'marketing',
      validation: (rule) => rule.required(),
    }),
    slugField('title', 'course', 'marketing'),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'marketing',
    }),
    imageWithAlt({
      name: 'coverImage',
      title: 'Cover image',
      group: 'marketing',
    }),
    imageWithAlt({
      name: 'icon',
      title: 'Icon',
      description: 'Small mark used on cards and search results',
      group: 'marketing',
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      group: 'marketing',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      group: 'marketing',
      description: 'Price in USD. Use 0 for free.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'isPopular',
      title: 'Popular',
      type: 'boolean',
      group: 'marketing',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      group: 'marketing',
      description: 'Display-only enrollment figure',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'learningOutcomes',
      title: 'Learning outcomes',
      type: 'array',
      group: 'marketing',
      of: [defineArrayMember({type: 'learningOutcome'})],
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      group: 'marketing',
      to: [{type: 'instructor'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'marketing',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      group: 'curriculum',
      of: [defineArrayMember({type: 'module'})],
      validation: (rule) =>
        rule.min(1).warning('Add at least one module before publishing'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      instructor: 'instructor.name',
      level: 'level',
    },
    prepare({title, media, instructor, level}) {
      return {
        title,
        subtitle: [level, instructor].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})

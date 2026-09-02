import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const module = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'lesson'}]})],
      validation: (rule) =>
        rule.min(1).warning('Add at least one lesson to this module'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lesson0: 'lessons.0.title',
      lesson1: 'lessons.1.title',
      lesson2: 'lessons.2.title',
    },
    prepare({title, lesson0, lesson1, lesson2}) {
      const lessons = [lesson0, lesson1, lesson2].filter(Boolean)
      return {
        title,
        subtitle: lessons.length
          ? lessons.join(', ') + (lesson2 ? '…' : '')
          : 'No lessons',
      }
    },
  },
})

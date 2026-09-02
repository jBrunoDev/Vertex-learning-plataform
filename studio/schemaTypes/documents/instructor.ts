import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {imageWithAlt} from '../shared/image'
import {slugField} from '../shared/slug'

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    slugField('name', 'instructor'),
    imageWithAlt({name: 'photo', title: 'Photo'}),
    defineField({
      name: 'expertise',
      title: 'Expertise',
      type: 'string',
      description: 'Short line shown under the instructor name',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'expertise',
      media: 'photo',
    },
  },
})

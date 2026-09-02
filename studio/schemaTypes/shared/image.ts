import {defineField} from 'sanity'

export function imageWithAlt({
  name,
  title,
  description,
  required = false,
  group,
}: {
  name: string
  title: string
  description?: string
  required?: boolean
  group?: string
}) {
  return defineField({
    name,
    title,
    type: 'image',
    description,
    group,
    options: {hotspot: true},
    validation: required ? (rule) => rule.required() : undefined,
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alternative text',
        validation: (rule) =>
          rule.required().warning('Alt text is important for accessibility'),
      }),
    ],
  })
}

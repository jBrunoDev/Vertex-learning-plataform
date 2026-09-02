import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {imageWithAlt} from '../shared/image'
import {slugField} from '../shared/slug'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    slugField('title', 'lesson'),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or Bunny playback URL. Do not upload video files here.',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).error('Must be an http(s) URL'),
    }),
    imageWithAlt({
      name: 'poster',
      title: 'Poster',
      description: 'Thumbnail shown before playback',
    }),
    defineField({
      name: 'durationSeconds',
      title: 'Duration (seconds)',
      type: 'number',
      description: 'Lesson length in seconds',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'isFreePreview',
      title: 'Free preview',
      type: 'boolean',
      description: 'Presentational label only. Does not control access.',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      description: 'Display-only enrollment figure',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({scheme: ['http', 'https', 'mailto']}),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (rule) =>
                rule.required().warning('Alt text is important for accessibility'),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key points',
      type: 'array',
      description: 'Shown in “In this lesson you will”',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [defineArrayMember({type: 'lessonResource'})],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster',
      durationSeconds: 'durationSeconds',
    },
    prepare({title, media, durationSeconds}) {
      return {
        title,
        subtitle:
          typeof durationSeconds === 'number'
            ? `${Math.round(durationSeconds / 60)} min`
            : undefined,
        media,
      }
    },
  },
})

import {defineField, type SlugValue, type ValidationContext} from 'sanity'

export function uniqueSlug(type: string) {
  return async (slug: SlugValue | undefined, context: ValidationContext) => {
    if (!slug?.current) return true
    if (!/^[a-z0-9-]+$/.test(slug.current)) {
      return 'Slug must be lowercase with hyphens only'
    }

    const client = context.getClient({apiVersion: '2026-09-02'})
    const publishedId = context.document?._id?.replace(/^drafts\./, '')
    const existing = await client.fetch<number>(
      `count(*[_type == $type && slug.current == $slug && !(_id in [$publishedId, $draftId])])`,
      {
        type,
        slug: slug.current,
        publishedId,
        draftId: publishedId ? `drafts.${publishedId}` : '',
      },
    )

    return existing === 0 || 'Slug already exists'
  }
}

export function slugField(source: string, type: string, group?: string) {
  return defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    group,
    options: {source, maxLength: 96},
    validation: (rule) => rule.required().custom(uniqueSlug(type)),
  })
}

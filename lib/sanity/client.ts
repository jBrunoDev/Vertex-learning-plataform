import 'server-only'

import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from './env'
import {getReadToken} from './token'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
  stega: false,
})

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: QueryString
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number | false
}) {
  getReadToken()

  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}

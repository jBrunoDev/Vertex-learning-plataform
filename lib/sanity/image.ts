import 'server-only'

import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

import {dataset, projectId} from './env'

const builder = createImageUrlBuilder({projectId, dataset})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export type SanityImageDto = {
  src: string
  alt: string
}

export function toImageDto(
  source: SanityImageSource | null | undefined,
  width: number,
): SanityImageDto | null {
  if (!source || typeof source !== 'object' || !('asset' in source) || !source.asset) {
    return null
  }

  const src = urlFor(source).width(width).fit('crop').auto('format').url()
  if (!src) return null

  const alt =
    'alt' in source && typeof source.alt === 'string' ? source.alt : ''

  return {src, alt}
}

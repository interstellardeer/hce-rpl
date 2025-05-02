import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image?.sizes?.og?.url
    const originalUrl = image?.url

    if (ogUrl) {
      return serverUrl + ogUrl
    }

    if (originalUrl && !originalUrl.includes('image-hero')) {
      return serverUrl + originalUrl
    }
  }

  return serverUrl + '/logo-OG.webp'
}


export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : 'Human Centered Engineering - Rekayasa Perangkat Lunak'

    console.log('[Meta Debug]', {
      title,
      ogImage,
      docImage: doc?.meta?.image,
    })
    
  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}

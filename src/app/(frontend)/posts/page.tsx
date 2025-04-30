import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function Page({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams?.category || 'all'

  const payload = await getPayload({ config: configPromise })

  // Prepare default empty filter
  let whereCondition = {}

  if (category !== 'all') {
    const categoriesRes = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          in: ['events', 'research'],
        },
      },
    })

    const categoryDocs = categoriesRes.docs
    const eventCat = categoryDocs.find((c) => c.slug === 'events')
    const penelitianCat = categoryDocs.find((c) => c.slug === 'research')

    if (category === 'events' && eventCat) {
      whereCondition = {
        categories: {
          contains: eventCat.id,
        },
      }
    } else if (category === 'research' && penelitianCat) {
      whereCondition = {
        categories: {
          contains: penelitianCat.id,
        },
      }
    } else if (category === 'both' && eventCat && penelitianCat) {
      whereCondition = {
        and: [
          { categories: { contains: eventCat.id } },
          { categories: { contains: penelitianCat.id } },
        ],
      }
    }
  }

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    where: whereCondition,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata() {
  return {
    title: `Payload Website Template Posts`,
  }
}

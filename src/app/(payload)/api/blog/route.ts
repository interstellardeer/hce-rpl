import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'all'
    const limitParam = searchParams.get('limit')
    const limit = Number(limitParam)
    const safeLimit = isNaN(limit) || limit <= 0 ? 12 : limit
    
    const payload = await getPayload({ config: configPromise })
    
    // Default empty where
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
        const eventCat = categoryDocs.find(c => c.slug === 'events')
        const penelitianCat = categoryDocs.find(c => c.slug === 'research')
        
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
      limit: safeLimit,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
      where: whereCondition,
    })

    return NextResponse.json(posts)
  } catch (err) {
    console.error('Error fetching posts:', err)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

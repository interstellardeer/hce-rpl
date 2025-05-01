import configPromise from '@payload-config'
import { getPayload } from 'payload'
import NotFound from '../../not-found'
import { Card } from '@/components/Card'
import Image from 'next/image'

type SearchParams = Promise<{ user_id: string }>;

export default async function UserProfilePage({ params }: { params: SearchParams }) {
  try {
    const { user_id } = await params;
    const payload = await getPayload({ config: configPromise });

    const user = await payload.findByID({
      collection: 'users',
      id: user_id,
      depth: 1,
    })

    const userPosts = await payload.find({
      collection: 'posts',
      where: {
        authors: {
          contains: user_id,
        },
      },
      sort: '-createdAt',
    })

    return (
      <main className="w-full max-w-4xl mx-auto py-12">
        {/* Profile section */}
        <div className="flex items-center gap-6 mb-8">
          {typeof user.profileImage === 'object' && user.profileImage?.url && (
            <Image
              src={user.profileImage.url}
              alt={`${user.name}'s profile`}
              className="w-20 h-20 rounded-full object-cover border"
              width={20}
              height={20}
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.googleScholarUrl && (
              <a
                href={user.googleScholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm mt-1 inline-block"
              >
                Google Scholar Profile
              </a>
            )}
          </div>
        </div>

        {/* Blog posts */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userPosts.docs?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <Card
                    key={index}
                    className="h-full"
                    doc={result}
                    relationTo="posts"
                    showCategories
                  />
                )
              }

              return null
            })}
          </div>
        </section>
      </main>
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return <NotFound />
  }
}

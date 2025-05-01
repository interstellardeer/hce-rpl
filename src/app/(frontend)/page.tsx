import Link from 'next/link'
import { generateMetadata } from './[slug]/page'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Card } from '@/components/Card'
import { cn } from '@/utilities/ui'
import Image from 'next/image'

const Page = async () => {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    overrideAccess: false,
    pagination: false,
    sort: '-createdAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      authors: true,
      heroImage: true,
      createdAt: true,
    },
  })
  return (
    <main className="text-black dark:text-white flex flex-col justify-center items-center w-full">
      <div className="w-[87.5%] max-w-[1310px]">
        <section className="py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Human Centered Engineering RPL UPI
          </h1>
          <p className="max-w-3xl mx-auto text-center text-base md:text-lg leading-relaxed mb-4 px-4">
            An interdisciplinary platform focused on human-centered approaches in engineering,
            aiming to improve lives through thoughtful design and innovation.
          </p>
          <Link
            href="/posts"
            className="rounded-full inline-block mt-4 text-sm md:text-base font-medium dark:bg-white dark:text-black dark:hover:bg-blue-100 bg-black text-white hover:bg-gray-800 px-6 py-2 transition"
          >
            See All Posts
          </Link>
        </section>
      </div>
      <div className="w-[87.5%] max-w-[1310px]">
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 px-4">Recent Posts</h2>
          <div className={cn('container')}>
            <div>
              <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
                {posts.docs?.map((result, index) => {
                  if (typeof result === 'object' && result !== null) {
                    return (
                      <div className="col-span-4" key={index}>
                        <Card className="h-full" doc={result} relationTo="posts" showCategories />
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-[87.5%] max-w-[1310px]">
        <section className="py-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Meet Our Lead Research Lecturer
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                <span className="font-semibold">Asyifa Imanda Septiana</span>
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Email:{' '}
                <a href="mailto:asyifa@upi.edu" className="underline">
                  asyifa@upi.edu
                </a>
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Asyifa Imanda Septiana leads our initiative with extensive expertise in
                human-centered research. Her work bridges academic research and practical
                applications, ensuring that our studies not only contribute to scholarly discourse
                but also provide tangible benefits in real-world settings.
              </p>
            </div>

            <div className="flex-1 flex justify-center">
              <Image
                src="/asyifa-imanda-septiana.png"
                alt="Asyifa Imanda Septiana"
                className="rounded-xl w-full max-w-sm object-cover shadow-md"
                width={800}
                height={800}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Page

export { generateMetadata }

// import PageTemplate, { generateMetadata } from './[slug]/page'

// export default PageTemplate

// export { generateMetadata }

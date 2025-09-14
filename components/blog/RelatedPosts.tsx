import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/types/blog'
import { formatDate } from '@/lib/utils'

interface RelatedPostsProps {
  posts: BlogPost[]
  title?: string
}

export function RelatedPosts({ posts, title = 'Related Articles' }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-12 py-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>

                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

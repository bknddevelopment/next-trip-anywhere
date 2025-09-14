'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/types/blog'
interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const cardClass = featured
    ? 'group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden col-span-full md:col-span-2'
    : 'group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'

  const imageHeight = featured ? 'h-64 md:h-96' : 'h-48'

  return (
    <article className={cardClass}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className={`relative ${imageHeight} w-full overflow-hidden bg-gray-100`}>
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h2
            className={`font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {post.title}
          </h2>

          <p className={`text-gray-600 mb-4 line-clamp-2 ${featured ? 'md:line-clamp-3' : ''}`}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                <p className="text-xs text-gray-600">{post.author.role}</p>
              </div>
            </div>

            <span className="text-primary font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Utility function for date formatting
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

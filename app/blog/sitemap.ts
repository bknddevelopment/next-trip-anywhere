import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/data/blog-posts'

// Force static generation for sitemap
export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexttripanywhere.com'

  // Generate sitemap entries for all blog posts
  const blogPostEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Add blog index page
  const blogIndexEntry = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }

  return [blogIndexEntry, ...blogPostEntries]
}

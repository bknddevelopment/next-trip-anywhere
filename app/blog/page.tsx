import { Metadata } from 'next'
import Link from 'next/link'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { blogPosts } from '@/lib/data/blog-posts'
import { BlogCategory } from '@/lib/types/blog'

export const metadata: Metadata = {
  title: 'Travel Blog | Expert Tips for Essex County Travelers',
  description:
    'Read expert travel tips, destination guides, and money-saving strategies for Essex County families. Get insider knowledge about Newark Airport, family vacations, and corporate travel.',
  openGraph: {
    title: 'Travel Blog | Next Trip Anywhere',
    description: 'Expert travel advice for Essex County residents',
    images: ['/images/blog/og/blog-home.jpg'],
  },
}

const categories: { value: BlogCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Articles' },
  { value: 'travel-tips', label: 'Travel Tips' },
  { value: 'destinations', label: 'Destinations' },
  { value: 'airport-guides', label: 'Airport Guides' },
  { value: 'family-travel', label: 'Family Travel' },
  { value: 'business-travel', label: 'Business Travel' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'deals', label: 'Deals' },
]

export default function BlogPage() {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const featuredPost = sortedPosts[0] // Most recent post as featured
  const recentPosts = sortedPosts.slice(1, 7) // Next 6 posts
  const olderPosts = sortedPosts.slice(7) // Rest of posts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Insights for Essex County
            </h1>
            <p className="text-xl text-white/90">
              Expert tips, destination guides, and insider knowledge to help you travel smarter from
              Newark Airport and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                className="px-4 py-2 rounded-full border border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post - Full Width */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Article</h2>
            <p className="text-gray-600">Our newest travel insights and expert advice</p>
          </div>
          <BlogPostCard post={featuredPost} featured={true} />
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="container mx-auto px-4 py-12 bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Articles</h2>
          <p className="text-gray-600">Stay updated with the latest travel trends and tips</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Older Posts */}
      {olderPosts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">More Articles</h2>
            <p className="text-gray-600">Explore our complete travel guide library</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {olderPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Tags */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Topics</h2>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {[
              'Newark Airport',
              'Family Travel',
              'Flight Deals',
              'Spring Break',
              'Business Travel',
              'Caribbean',
              'Europe',
              'Disney World',
              'Travel Insurance',
              'Packing Tips',
            ].map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag.toLowerCase().replace(' ', '-'))}`}
                className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

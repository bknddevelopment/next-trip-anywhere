import { Metadata } from 'next'
import Link from 'next/link'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { NewsletterSignup } from '@/components/blog/NewsletterSignup'
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
  // In a real app, you'd implement pagination and filtering
  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1)

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
      <section className="bg-white border-b">
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

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          {featuredPost && <BlogPostCard post={featuredPost} featured={true} />}

          {/* Recent Posts */}
          {recentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex gap-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4 pb-12">
        <NewsletterSignup />
      </section>

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

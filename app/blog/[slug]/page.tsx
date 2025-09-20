import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostJsonLd } from '@/components/blog/BlogPostJsonLd'
import { AuthorProfile } from '@/components/blog/AuthorProfile'
import { SocialShare } from '@/components/blog/SocialShare'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/lib/data/blog-posts'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords.join(', '),
    openGraph: {
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription,
      images: [post.seo.ogImage || post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription,
      images: [post.seo.ogImage || post.featuredImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.id, 3)
  const postUrl = `https://nexttripanywhere.com/blog/${post.slug}`

  // Convert markdown-style content to HTML (in production, use a proper markdown parser)
  const contentHtml = post.content
    .split('\n\n')
    .map((paragraph) => {
      if (paragraph.startsWith('#')) {
        const level = paragraph.match(/^#+/)?.[0].length || 1
        const text = paragraph.replace(/^#+\s/, '')
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return `<h${level} id="${id}" class="text-${4 - level}xl font-bold mt-8 mb-4">${text}</h${level}>`
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph
          .split('\n')
          .map((item) => `<li class="ml-6 mb-2">${item.replace(/^- /, '')}</li>`)
          .join('')
        return `<ul class="list-disc mb-6">${items}</ul>`
      }
      if (paragraph.startsWith('1. ')) {
        const items = paragraph
          .split('\n')
          .map((item) => `<li class="ml-6 mb-2">${item.replace(/^\d+\. /, '')}</li>`)
          .join('')
        return `<ol class="list-decimal mb-6">${items}</ol>`
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return `<p class="font-bold mb-4">${paragraph.replace(/\*\*/g, '')}</p>`
      }
      return `<p class="mb-6 leading-relaxed">${paragraph}</p>`
    })
    .join('')

  return (
    <article className="min-h-screen bg-white">
      <BlogPostJsonLd post={post} />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm mb-6 text-white/80">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <Link
                href={`/blog?category=${post.category}`}
                className="hover:text-white capitalize"
              >
                {post.category.replace('-', ' ')}
              </Link>
            </nav>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/20">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{post.author.name}</span>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] w-full">
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          fill
          className="object-contain md:object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Social Share */}
              <div className="mb-8 pb-8 border-b">
                <SocialShare url={postUrl} title={post.title} description={post.excerpt} />
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag.toLowerCase().replace(' ', '-'))}`}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Author Profile */}
                <AuthorProfile author={post.author} postCount={5} />

                {/* Table of Contents */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold mb-4">In This Article</h3>
                  <nav className="space-y-2 text-sm">
                    <a
                      href="#the-science-of-flight-pricing"
                      className="block text-gray-600 hover:text-primary"
                    >
                      The Science of Flight Pricing
                    </a>
                    <a
                      href="#seasonal-pricing-analysis"
                      className="block text-gray-600 hover:text-primary"
                    >
                      Seasonal Pricing Analysis
                    </a>
                    <a
                      href="#advance-booking-sweet-spots"
                      className="block text-gray-600 hover:text-primary"
                    >
                      Advance Booking Sweet Spots
                    </a>
                    <a
                      href="#day-of-week-insights"
                      className="block text-gray-600 hover:text-primary"
                    >
                      Day-of-Week Insights
                    </a>
                  </nav>
                </div>

                {/* CTA */}
                <div className="bg-primary text-white rounded-xl p-6">
                  <h3 className="font-bold mb-2">Ready to Book Your Trip?</h3>
                  <p className="text-sm mb-4">
                    Let our experts help you find the best deals from Newark Airport.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </div>
    </article>
  )
}

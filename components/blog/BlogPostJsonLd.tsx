import { BlogPost } from '@/lib/types/blog'
import { generateArticleSchema } from '@/lib/utils/guideSchema'
import { generateFAQSchema, generateBreadcrumbList } from '@/lib/utils/baseSchema'

interface BlogPostJsonLdProps {
  post: BlogPost & {
    faq?: Array<{ question: string; answer: string }>
  }
}

export function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const schemas = []

  // Generate comprehensive article schema with enhanced metadata
  const articleSchema = generateArticleSchema(post, post.content, post.content.split(/\s+/).length)
  schemas.push(articleSchema)

  // Add FAQ schema if the post includes Q&A content
  if (post.faq && post.faq.length > 0) {
    const faqSchema = generateFAQSchema(
      post.faq,
      post.title,
      `https://nexttripanywhere.com/blog/${post.slug}#faq`
    )
    schemas.push(faqSchema)
  }

  // Add breadcrumb schema for better navigation in search results
  const breadcrumbSchema = generateBreadcrumbList([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    {
      name: post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' '),
      url: `/blog?category=${post.category}`,
    },
    { name: post.title, url: `/blog/${post.slug}` },
  ])
  schemas.push(breadcrumbSchema)

  // Create the schema graph
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

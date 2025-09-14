import { BlogPost } from '@/lib/types/blog'

interface BlogPostJsonLdProps {
  post: BlogPost
}

export function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://nexttripanywhere.com${post.featuredImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      description: post.author.bio,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nexttripanywhere.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nexttripanywhere.com/blog/${post.slug}`,
    },
    keywords: post.seo.keywords.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

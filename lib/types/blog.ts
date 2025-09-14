export interface Author {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  social?: {
    twitter?: string
    linkedin?: string
    email?: string
  }
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  featuredImageAlt: string
  author: Author
  category: BlogCategory
  tags: string[]
  publishedAt: string
  updatedAt?: string
  readingTime: number // in minutes
  seo: {
    metaTitle?: string
    metaDescription: string
    keywords: string[]
    ogImage?: string
  }
  relatedPosts?: string[] // array of post IDs
}

export type BlogCategory =
  | 'travel-tips'
  | 'destinations'
  | 'airport-guides'
  | 'family-travel'
  | 'business-travel'
  | 'seasonal'
  | 'deals'

export interface BlogListParams {
  category?: BlogCategory
  tag?: string
  author?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'popularity'
}

export interface BlogMetadata {
  totalPosts: number
  categories: Array<{
    name: BlogCategory
    count: number
  }>
  tags: Array<{
    name: string
    count: number
  }>
  authors: Author[]
}

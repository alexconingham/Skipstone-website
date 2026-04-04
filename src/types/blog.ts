export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  published_at: string
  created_at: string
  updated_at: string
}

export type PostSummary = Omit<Post, 'content' | 'updated_at' | 'created_at'>

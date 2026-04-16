import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostSummary } from '@/types/blog'

/** Directory that contains `content/blog` — pinned in next.config env so cwd/Turbopack root mismatches do not hide posts. */
const BLOG_DIR = path.join(
  process.env.BLOG_CONTENT_ROOT ?? process.cwd(),
  'content',
  'blog',
)

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true })
}

function fileToPostSummary(filename: string): PostSummary | null {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
    const { data } = matter(raw)
    const slug = (data.slug as string | undefined) ?? filename.replace(/\.md$/, '')
    const published_at = data.date
      ? new Date(data.date as string).toISOString()
      : new Date().toISOString()

    return {
      id: filename.replace(/\.md$/, ''),
      title: (data.title as string | undefined) ?? slug,
      slug,
      excerpt: (data.excerpt as string | undefined) ?? null,
      cover_image: (data.cover as string | undefined) ?? null,
      published_at,
    }
  } catch {
    return null
  }
}

export function getAllPosts(): PostSummary[] {
  ensureDir()

  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(fileToPostSummary)
    .filter((p): p is PostSummary => p !== null)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  ensureDir()
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      const postSlug = (data.slug as string | undefined) ?? filename.replace(/\.md$/, '')

      if (postSlug !== slug) continue

      const published_at = data.date
        ? new Date(data.date as string).toISOString()
        : new Date().toISOString()

      return {
        id: filename.replace(/\.md$/, ''),
        title: (data.title as string | undefined) ?? postSlug,
        slug: postSlug,
        excerpt: (data.excerpt as string | undefined) ?? null,
        content,
        cover_image: (data.cover as string | undefined) ?? null,
        published_at,
        created_at: published_at,
        updated_at: data.updated
          ? new Date(data.updated as string).toISOString()
          : published_at,
      }
    } catch {
      continue
    }
  }

  return null
}

/** Returns all published slugs — used for static param generation */
export function getAllSlugs(): string[] {
  return getAllPosts().map(p => p.slug)
}

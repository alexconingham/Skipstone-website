import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Remember to Die Devlog`,
    description: post.excerpt ?? undefined,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).toUpperCase()
}

function readingTime(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = await marked.parse(post.content, { async: true })
  const mins = readingTime(post.content)

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      <section className="pt-32 pb-10 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-block text-[0.6rem] tracking-[0.2em] text-gray-600 hover:text-cyan-400 transition-colors duration-200 uppercase mb-8"
          >
            ← Devlog
          </Link>

          <div className="terminal-chrome mb-0 border border-white/[0.06] border-b-0">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
            <span className="terminal-filename">{slug}.md</span>
          </div>

          <div className="border border-white/[0.06] border-t-0 p-8 pb-10 bg-white/[0.02]">
            <div className="flex items-center gap-3 text-[0.55rem] tracking-[0.2em] text-gray-600 mb-5">
              <span>{formatDate(post.published_at)}</span>
              <span className="w-px h-3 bg-white/10" />
              <span>{mins} MIN READ</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-0">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {post.cover_image && (
        <div className="max-w-3xl mx-auto px-4 mb-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt=""
            className="w-full aspect-video object-cover border border-white/[0.06]"
          />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose-rtd" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <footer className="py-10 px-4 border-t border-white/[0.04] text-center space-y-3">
        <Link
          href="/blog"
          className="text-xs tracking-[0.2em] text-gray-600 hover:text-cyan-400 transition-colors duration-200 uppercase"
        >
          ← All posts
        </Link>
        <div>
          <Link href="/privacy" className="text-[0.6rem] tracking-[0.2em] text-gray-700 hover:text-cyan-400 transition-colors duration-200 uppercase">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </main>
  )
}

import { supabase } from '@/lib/supabase'
import type { Post } from '@/types/blog'
import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import type { Metadata } from 'next'

export const revalidate = 3600

// Pre-render known slugs at build time; unknown ones are rendered on-demand
export async function generateStaticParams() {
  if (!supabase) return []
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .lte('published_at', new Date().toISOString())

  return (data ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!supabase) return {}
  const { data } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .lte('published_at', new Date().toISOString())
    .single()

  if (!data) return {}
  return {
    title: `${data.title} — Remember to Die Devlog`,
    description: data.excerpt ?? undefined,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase()
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!supabase) notFound()
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .lte('published_at', new Date().toISOString())
    .single()

  if (!post) notFound()

  const html = await marked.parse((post as Post).content, { async: true })
  const mins = readingTime((post as Post).content)

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      {/* ── Post header ── */}
      <section className="pt-32 pb-10 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-block text-[0.6rem] tracking-[0.2em] text-gray-600 hover:text-cyan-400 transition-colors duration-200 uppercase mb-8"
          >
            ← Devlog
          </Link>

          {/* Terminal chrome header */}
          <div className="terminal-chrome mb-0 border border-white/[0.06] border-b-0">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
            <span className="terminal-filename">{slug}.md</span>
          </div>

          <div className="border border-white/[0.06] border-t-0 p-8 pb-10 bg-white/[0.02]">
            <div className="flex items-center gap-3 text-[0.55rem] tracking-[0.2em] text-gray-600 mb-5">
              <span>{formatDate((post as Post).published_at)}</span>
              <span className="w-px h-3 bg-white/10" />
              <span>{mins} MIN READ</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-0">
              {(post as Post).title}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Cover image ── */}
      {(post as Post).cover_image && (
        <div className="max-w-3xl mx-auto px-4 mb-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={(post as Post).cover_image!}
            alt=""
            className="w-full aspect-video object-cover border border-white/[0.06]"
          />
        </div>
      )}

      {/* ── Article body ── */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div
          className="prose-rtd"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {/* ── Footer nav ── */}
      <footer className="py-10 px-4 border-t border-white/[0.04] text-center">
        <Link
          href="/blog"
          className="text-xs tracking-[0.2em] text-gray-600 hover:text-cyan-400 transition-colors duration-200 uppercase"
        >
          ← All posts
        </Link>
      </footer>
    </main>
  )
}

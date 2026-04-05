import { supabase } from '@/lib/supabase'
import type { PostSummary } from '@/types/blog'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import AnimatedSection from '@/components/AnimatedSection'
import type { Metadata } from 'next'

export const revalidate = 3600 // re-check every hour for scheduled posts

export const metadata: Metadata = {
  title: 'Devlog — Remember to Die | Skipstone Studios',
  description: 'Development updates, behind-the-scenes and design notes from the making of Remember to Die.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).toUpperCase()
}

function readingTime(excerpt: string | null) {
  if (!excerpt) return null
  const words = excerpt.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} MIN READ`
}

function PostCard({ post, index }: { post: PostSummary; index: number }) {
  return (
    <AnimatedSection animation="slideUp" delay={index * 80}>
      <Link
        href={`/blog/${post.slug}`}
        className="feature-card-terminal group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label={`Read: ${post.title}`}
      >
        <div className="terminal-chrome">
          <span className="terminal-dot dot-red" />
          <span className="terminal-dot dot-yellow" />
          <span className="terminal-dot dot-green" />
          <span className="terminal-filename">DEVLOG_{String(index + 1).padStart(3, '0')}.md</span>
        </div>

        {post.cover_image && (
          <div className="relative w-full aspect-video overflow-hidden border-b border-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt=""
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
            />
          </div>
        )}

        <div className="terminal-body items-start text-left gap-3">
          <div className="flex items-center gap-3 text-[0.55rem] tracking-[0.2em] text-gray-600">
            <span>{formatDate(post.published_at)}</span>
            {post.excerpt && (
              <>
                <span className="w-px h-3 bg-white/10" />
                <span>{readingTime(post.excerpt)}</span>
              </>
            )}
          </div>

          <h2 className="text-base font-black text-white leading-snug group-hover:text-cyan-300 transition-colors duration-200">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <span className="mt-2 text-[0.6rem] tracking-[0.2em] text-cyan-500 group-hover:text-cyan-300 transition-colors duration-200">
            READ MORE →
          </span>
        </div>
      </Link>
    </AnimatedSection>
  )
}

export default async function BlogPage() {
  let posts: PostSummary[] | null = null

  if (supabase) {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, cover_image, published_at')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })

    if (error) console.error('Blog fetch error:', error)
    posts = data as PostSummary[] | null
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      {/* Grain overlay inherited from globals */}

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection animation="fadeIn" delay={100}>
            <span className="section-tag">Devlog</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4 leading-tight">
              From the studio
            </h1>
            <div className="section-accent-line bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Development updates, design notes and behind-the-scenes from the making of Remember to Die.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post as PostSummary} index={i} />
              ))}
            </div>
          ) : (
            <AnimatedSection animation="fadeIn" delay={200}>
              <div className="text-center py-24">
                <p className="text-gray-600 text-sm tracking-widest uppercase">First post incoming...</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-4 border-t border-white/[0.04] text-center">
        <Link
          href="/"
          className="text-xs tracking-[0.2em] text-gray-600 hover:text-cyan-400 transition-colors duration-200 uppercase"
        >
          ← Back to Remember to Die
        </Link>
      </footer>
    </main>
  )
}

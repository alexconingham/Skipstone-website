import AudioPlayer from '@/components/AudioPlayer'
import ImageGallery from '@/components/ImageGallery'
import ImageProtection from '@/components/ImageProtection'
import PixelatedWakeBackground from '@/components/PixelatedWakeBackground'
import Navigation from '@/components/Navigation'
import AnimatedSection from '@/components/AnimatedSection'
import CTASection from '@/components/CTASection'
import VideoTrailer from '@/components/VideoTrailer'
import Image from 'next/image'
import { getDiceData, getMementoData, getEnemyData, getWatchData } from '@/utils/dataMapper'
import { getBaseUrl } from '@/utils/config'

const gameAssets = {
  dungeons: [
    { file: 'D1_bg.PNG',                      name: 'The Trunk' },
    { file: 'D2_bg.PNG',                      name: 'Bullying' },
    { file: 'D3_bg.PNG',                      name: 'Graduation' },
    { file: 'D4_bg.PNG',                      name: 'The Pitch' },
    { file: 'D5_bg.PNG',                      name: 'Fatherhood' },
    { file: 'D6_bg.PNG',                      name: 'The Funeral' },
    { file: 'D7_bg.PNG',                      name: 'Retirement' },
    { file: 'D8_bg.PNG',                      name: 'Reconciliation' },
    { file: 'D9_bg.PNG',                      name: 'The Family Album' },
    { file: 'D10_bg.PNG',                     name: 'The Deathbed' },
    { file: 'alt_heaven.PNG',                 name: 'Heaven' },
    { file: 'alt_hell_bg.PNG',                name: 'Hell' },
    { file: 'alt_purgatory_bg.PNG',           name: 'Purgatory' },
    { file: 'alt_school_cafeteria_bg.PNG',    name: 'School Cafeteria' },
    { file: 'alt_the_garage_bg.PNG',          name: 'The Garage' },
    { file: 'alt_the_trunk_bg.PNG',           name: 'The Trunk Revisited' },
    { file: 'alt_the_void_bg.PNG',            name: 'The Void' },
    { file: 'title_char_bg.PNG',              name: 'Character' },
    { file: 'transition_bg.png',              name: 'Transition' },
    { file: 'seam_bg.png',                    name: 'Seam' },
  ],
  enemies:  getEnemyData(),
  dice:     getDiceData(),
  mementos: getMementoData(),
  watches:  getWatchData(),
}

export default function Home() {
  const baseUrl = getBaseUrl()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    '@id': `${baseUrl}/#game`,
    name: 'Remember to Die',
    description: 'A gritty tactical dice combat roguelike where every roll dredges up fragmented memories.',
    genre: ['Roguelike', 'Strategy', 'Tactical Combat', 'Horror', 'Indie'],
    gamePlatform: ['Steam', 'PC'],
    author: { '@type': 'Organization', name: 'Skipstone Studios', url: 'https://skipstone.co.nz' },
    offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', price: 'TBD', priceCurrency: 'USD' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="min-h-screen bg-[#0e0c0c] text-[#e8dcc8] relative overflow-x-hidden">
        <Navigation />
        <ImageProtection />
        <AudioPlayer />
        <PixelatedWakeBackground />

        {/* ══════════════════════════════════════
            HERO — cinematic, full-viewport
        ══════════════════════════════════════ */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-end pb-28 px-4"
          role="banner"
        >
          {/* Full-bleed background */}
          <div className="absolute inset-0">
            <Image
              src="/backgrounds/title_char_bg.PNG"
              alt=""
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              quality={90}
              priority
              sizes="100vw"
            />
            {/* Layered vignette — heavy bottom weight so content is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0c] via-[#0e0c0c]/60 to-[#0e0c0c]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0c]/50 via-transparent to-[#0e0c0c]/50" />
          </div>

          {/* Scanlines */}
          <div className="scanlines absolute inset-0 pointer-events-none z-[3]" />

          {/* Hero content — lower-third positioning */}
          <div className="relative z-20 w-full max-w-4xl mx-auto text-center space-y-7">

            <AnimatedSection animation="scaleIn" delay={200}>
              <div className="mb-3">
                <Image
                  src="/title_logo.png"
                  alt="Remember to Die — Tactical Dice Combat Roguelike"
                  width={540}
                  height={280}
                  className="mx-auto max-w-xs md:max-w-md lg:max-w-xl w-full h-auto float-gentle"
                  style={{
                    filter: 'drop-shadow(0 4px 32px rgba(196,163,90,0.2)) drop-shadow(0 0 80px rgba(196,163,90,0.07))',
                  }}
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 280px, 540px"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={700}>
              <div
                className="space-y-1"
                style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
              >
                <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#e8dcc8] tracking-wide leading-tight">
                  Battle your demons.
                </p>
                <p className="text-2xl md:text-4xl lg:text-5xl font-bold italic text-[#c4a35a] tracking-wide leading-tight">
                  Re-roll your destiny.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={1100}>
              <p
                className="text-sm md:text-base text-[#7a6a58] leading-relaxed max-w-2xl mx-auto"
                style={{ fontFamily: 'var(--font-body, Georgia, serif)' }}
              >
                Remember to Die is a gritty, narrative-driven battle against time and broken memories,
                wrapped in an intuitive and moreish dice strategy roguelike where every dice roll
                dredges up a fragmented memory and decides your fate.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={1500}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-2">
                <div className="text-center">
                  <p
                    className="text-xs tracking-[0.3em] uppercase text-[#c4a35a] mb-1"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Coming Soon
                  </p>
                  <p
                    className="text-[0.6rem] tracking-[0.2em] uppercase text-[#4a3e35]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Steam Early Access
                  </p>
                </div>

                <div className="hidden sm:block w-px h-8 bg-[rgba(196,163,90,0.15)]" />

                <a
                  href="#steam-cta"
                  className="opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-[1.04] inline-block"
                  aria-label="Wishlist Remember to Die on Steam"
                >
                  <Image
                    src="/steam wishlist bw3.png"
                    alt="Wishlist on Steam"
                    width={260}
                    height={104}
                    className="w-auto h-14 md:h-16"
                    quality={90}
                  />
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Scroll indicator */}
          <AnimatedSection animation="fadeIn" delay={2400}>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-20">
              <span
                className="text-[0.55rem] tracking-[0.3em] text-[#4a3e35] uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Scroll
              </span>
              <div className="scroll-chevron" />
            </div>
          </AnimatedSection>
        </section>

        {/* ══════════════════════════════════════
            ABOUT — 2-column: copy + trailer
        ══════════════════════════════════════ */}
        <section id="trailer" className="relative py-28 px-6 bg-[#0e0c0c]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0c] via-[#121010] to-[#0e0c0c] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: copy */}
              <AnimatedSection animation="slideRight" delay={200}>
                <div>
                  <span className="chapter-label">Official Trailer</span>
                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e8dcc8] mb-6 leading-[1.05]"
                    style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                  >
                    Every roll counts.
                  </h2>
                  <div className="section-rule section-rule-left" />
                  <p className="text-[#7a6a58] text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    Remember to Die is a gritty, narrative-driven battle against time and broken memories,
                    wrapped in an intuitive and moreish dice strategy roguelike where every dice roll
                    dredges up a fragmented memory and decides your fate.
                  </p>
                </div>
              </AnimatedSection>

              {/* Right: trailer */}
              <AnimatedSection animation="slideLeft" delay={400}>
                <VideoTrailer src="/RTD_trailerv5.mp4" />
              </AnimatedSection>
            </div>

            {/* Feature editorial callouts */}
            <AnimatedSection animation="fadeIn" delay={600}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-24 border-b border-[rgba(196,163,90,0.08)]">

                <div className="editorial-callout">
                  <span className="editorial-callout__number">01</span>
                  <span className="editorial-callout__title">Tactical Dice Combat</span>
                  <span className="editorial-callout__body">
                    Strategic dice-based battles with endless depth.
                  </span>
                </div>

                <div className="editorial-callout md:border-l border-[rgba(196,163,90,0.08)]">
                  <span className="editorial-callout__number">02</span>
                  <span className="editorial-callout__title">Memory Fragments</span>
                  <span className="editorial-callout__body">
                    Unlock haunting memories that shape your destiny.
                  </span>
                </div>

                <div className="editorial-callout md:border-l border-[rgba(196,163,90,0.08)]">
                  <span className="editorial-callout__number">03</span>
                  <span className="editorial-callout__title">Infinite Replayability</span>
                  <span className="editorial-callout__body">
                    Every run tells a different story.
                  </span>
                </div>

              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MEMORIES / WORLD BACKGROUNDS
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            id="memories"
            className="py-24 px-6 relative overflow-hidden"
            aria-labelledby="memories-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0c] via-[#110e0d] to-[#0e0c0c] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,163,90,0.12)] to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-14">
                <span className="chapter-label">The World</span>
                <h2
                  id="memories-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-light text-[#e8dcc8] leading-[1.0] mb-3"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                >
                  A lifetime of<br />
                  <em className="italic text-[#c4a35a]">memories.</em>
                </h2>
                <div className="section-rule section-rule-left" />
                <p className="text-[#7a6a58] text-sm leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                  Each fragment you unlock splinters the story into new fates; you choose which fantasies to pursue, and which truths to rewrite.
                </p>
              </div>
              <ImageGallery
                items={gameAssets.dungeons}
                folder="backgrounds"
                direction="right"
                size="massive"
                galleryId="dungeons"
                showTooltips={false}
              />
            </div>
          </section>
        </AnimatedSection>

        {/* ══════════════════════════════════════
            ENEMIES — haunting faces
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            id="enemies"
            className="py-24 px-6 relative overflow-hidden"
            aria-labelledby="enemies-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0c] via-[#130d0d] to-[#0e0c0c] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(122,28,28,0.2)] to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-14">
                <span className="chapter-label" style={{ color: 'rgba(122,28,28,0.7)' }}>The Enemies</span>
                <h2
                  id="enemies-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-light text-[#e8dcc8] leading-[1.0] mb-3"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                >
                  A string of<br />
                  <em className="italic" style={{ color: '#9b3535' }}>haunting faces.</em>
                </h2>
                <div className="section-rule section-rule-left" style={{ background: '#7a1c1c', opacity: 0.5 }} />
                <p className="text-[#7a6a58] text-sm leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                  Each enemy hints at more of the haunting truth.
                </p>
              </div>
              <ImageGallery
                items={gameAssets.enemies}
                folder="portraits"
                direction="left"
                size="extra-large"
                galleryId="enemies"
              />
            </div>
          </section>
        </AnimatedSection>

        {/* ══════════════════════════════════════
            ARSENAL / DICE
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            id="arsenal"
            className="py-24 px-6 relative overflow-hidden"
            aria-labelledby="dice-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0c] via-[#0e100d] to-[#0e0c0c] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(74,100,74,0.15)] to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-14">
                <span className="chapter-label" style={{ color: 'rgba(74,100,60,0.8)' }}>The Arsenal</span>
                <h2
                  id="dice-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-light text-[#e8dcc8] leading-[1.0] mb-3"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                >
                  An evolving<br />
                  <em className="italic" style={{ color: '#5a7a52' }}>arsenal.</em>
                </h2>
                <div className="section-rule section-rule-left" style={{ background: '#4a6444', opacity: 0.5 }} />
                <p className="text-[#7a6a58] text-sm leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                  Collect and refine powerful dice combinations.
                </p>
              </div>
              <ImageGallery
                items={gameAssets.dice}
                folder="dice"
                direction="right"
                size="medium"
                galleryId="dice"
              />
            </div>
          </section>
        </AnimatedSection>

        {/* ══════════════════════════════════════
            MEMENTOS — a drawer of regrets
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            id="mementos"
            className="py-24 px-6 relative overflow-hidden"
            aria-labelledby="mementos-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0c] via-[#100d12] to-[#0e0c0c] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(100,74,122,0.15)] to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-14">
                <span className="chapter-label" style={{ color: 'rgba(100,74,122,0.8)' }}>The Mementos</span>
                <h2
                  id="mementos-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-light text-[#e8dcc8] leading-[1.0] mb-3"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                >
                  And a bagful<br />
                  <em className="italic" style={{ color: '#7a5a9b' }}>of tricks.</em>
                </h2>
                <div className="section-rule section-rule-left" style={{ background: '#6a4a8a', opacity: 0.5 }} />
                <p className="text-[#7a6a58] text-sm leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                  Collect mementos drenched in heartbreaking lore, each with unique effects.
                </p>
              </div>
              <ImageGallery
                items={gameAssets.mementos}
                folder="mementos"
                direction="left"
                size="medium"
                galleryId="mementos"
              />
            </div>
          </section>
        </AnimatedSection>

        {/* ══════════════════════════════════════
            WATCHES — time is not on your side
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            className="py-24 px-6 relative overflow-hidden"
            aria-labelledby="watches-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0c] via-[#120f0a] to-[#0e0c0c] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,163,90,0.12)] to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-14">
                <span className="chapter-label">The Time</span>
                <h2
                  id="watches-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-light text-[#e8dcc8] leading-[1.0] mb-3"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                >
                  But time is not<br />
                  <em className="italic text-[#c4a35a]">on your side.</em>
                </h2>
                <div className="section-rule section-rule-left" />
                <p className="text-[#7a6a58] text-sm leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                  Unique watches shift the odds.
                </p>
              </div>
              <ImageGallery
                items={gameAssets.watches}
                folder="watches"
                direction="right"
                size="medium"
                galleryId="watches"
              />
            </div>
          </section>
        </AnimatedSection>

        {/* CTA */}
        <CTASection />

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer
          className="relative py-16 px-6 border-t border-[rgba(196,163,90,0.07)]"
          role="contentinfo"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <AnimatedSection animation="fadeIn">
              <div className="flex justify-center mb-6">
                <Image
                  src="/Skipstone_logo.png"
                  alt="Skipstone Studios — Indie Game Developer"
                  width={380}
                  height={60}
                  className="w-auto h-12 opacity-40 hover:opacity-70 transition-opacity duration-500"
                  loading="lazy"
                  quality={80}
                />
              </div>
              <p
                className="text-[#4a3e35] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
              >
                © 2024{' '}
                <span className="text-[#7a6a58]">Skipstone Studios</span>.
                {' '}All rights reserved.
              </p>
              <p
                className="text-[#2a221e] text-sm tracking-widest mt-3"
                style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontStyle: 'italic' }}
              >
                Every roll counts, and death is just the beginning.
              </p>
            </AnimatedSection>
          </div>
        </footer>
      </main>
    </>
  )
}

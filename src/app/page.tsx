import AudioPlayer from '@/components/AudioPlayer'
import ImageGallery from '@/components/ImageGallery'
import ImageProtection from '@/components/ImageProtection'
import PixelatedWakeBackground from '@/components/PixelatedWakeBackground'
import Navigation from '@/components/Navigation'
import AnimatedSection from '@/components/AnimatedSection'
import CTASection from '@/components/CTASection'
import VideoTrailer from '@/components/VideoTrailer'
import ParticleField from '@/components/ParticleField'
import SectionDivider from '@/components/SectionDivider'
import ScrollProgress from '@/components/ScrollProgress'
import Image from 'next/image'
import { getDiceData, getMementoData, getEnemyData, getWatchData } from '@/utils/dataMapper'
import { getBaseUrl } from '@/utils/config'

const gameAssets = {
  dungeons: [
    { file: "D1_bg.PNG", name: "Classroom" },
    { file: "D2_bg.PNG", name: "Dormitory" },
    { file: "D3_bg.PNG", name: "Dungeon 3" },
    { file: "D4_bg.PNG", name: "Cemetery" },
    { file: "D5_bg.PNG", name: "Laboratory" },
    { file: "D6_bg.PNG", name: "Office" },
    { file: "D7_bg.PNG", name: "Library" },
    { file: "D8_bg.PNG", name: "Dungeon 8" },
    { file: "D9_bg.PNG", name: "Dungeon 9" },
    { file: "D10_bg.PNG", name: "Hallway" },
    { file: "alt_heaven.PNG", name: "Heaven" },
    { file: "alt_hell_bg.PNG", name: "Hell" },
    { file: "alt_purgatory_bg.PNG", name: "Purgatory" },
    { file: "alt_school_cafeteria_bg.PNG", name: "School Cafeteria" },
    { file: "alt_the_garage_bg.PNG", name: "The Garage" },
    { file: "alt_the_trunk_bg.PNG", name: "The Trunk" },
    { file: "alt_the_void_bg.PNG", name: "The Void" },
    { file: "title_char_bg.PNG", name: "Character Selection" },
    { file: "transition_bg.png", name: "Transition" },
    { file: "seam_bg.png", name: "Seam" }
  ],
  enemies: getEnemyData(),
  dice: getDiceData(),
  mementos: getMementoData(),
  watches: getWatchData()
}

export default function Home() {
  const baseUrl = getBaseUrl()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    '@id': `${baseUrl}/#game`,
    'name': 'Remember to Die',
    'description': 'A gritty tactical dice combat roguelike where every roll dredges up fragmented memories.',
    'genre': ['Roguelike', 'Strategy', 'Tactical Combat', 'Horror', 'Indie'],
    'gamePlatform': ['Steam', 'PC'],
    'author': { '@type': 'Organization', 'name': 'Skipstone Studios', 'url': 'https://skipstone.co.nz' },
    'offers': { '@type': 'Offer', 'availability': 'https://schema.org/PreOrder', 'price': 'TBD', 'priceCurrency': 'USD' }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
        <ScrollProgress />
        <Navigation />
        <ImageProtection />
        <AudioPlayer />
        <PixelatedWakeBackground />

        {/* ═══════════════════════════════════
            HERO
        ═══════════════════════════════════ */}
        <section
          id="home"
          className="min-h-screen flex flex-col items-center justify-center px-4 relative pt-20 pb-24"
          role="banner"
        >
          {/* Parallax background layers */}
          <div className="absolute inset-0">
            <Image
              src="/backgrounds/alt_timewarpUPSCALED.PNG"
              alt=""
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={90}
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </div>

          <div className="scanlines absolute inset-0 pointer-events-none z-[3]" />

          {/* Floating particles */}
          <ParticleField />

          {/* Hero content */}
          <div className="text-center max-w-4xl mx-auto relative z-20 space-y-8">
            <AnimatedSection animation="scaleIn" delay={200}>
              <div className="mb-2">
                <Image
                  src="/title_logo.png"
                  alt="Remember to Die — Tactical Dice Combat Roguelike"
                  width={520}
                  height={270}
                  className="mx-auto max-w-sm md:max-w-lg w-full h-auto logo-shimmer"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 320px, 520px"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={600}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white typewriter-container leading-tight">
                <span className="typewriter-line">Battle your demons.</span>
                <span className="typewriter-line">Re-roll your destiny.</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={1300}>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Remember to Die is a gritty, narrative-driven battle against time and broken memories, wrapped in an intuitive and moreish dice strategy roguelike where every dice roll dredges up a fragmented memory and decides your fate.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={1800}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent tracking-wide shimmer-text">
                    COMING SOON
                  </p>
                  <p className="text-gray-500 text-xs tracking-[0.25em] uppercase mt-1">to Steam Early Access</p>
                </div>

                <div className="hidden sm:block w-px h-10 bg-white/15" />

                <a
                  href="#steam-cta"
                  className="group transition-all duration-300 hover:scale-105"
                  aria-label="Wishlist Remember to Die on Steam"
                >
                  <Image
                    src="/steam wishlist bw3.png"
                    alt="Wishlist on Steam"
                    width={280}
                    height={112}
                    className="w-auto h-14 md:h-16 group-hover:brightness-110 transition-all duration-300"
                    quality={90}
                  />
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Scroll indicator */}
          <AnimatedSection animation="fadeIn" delay={2600}>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
              <span className="text-xs tracking-[0.25em] text-gray-500 uppercase">Scroll</span>
              <div className="scroll-chevron" />
            </div>
          </AnimatedSection>
        </section>

        {/* ═══════════════════════════════════
            TRAILER
        ═══════════════════════════════════ */}
        <section id="trailer" className="relative py-24 px-4 bg-black">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/10 blur-[120px] rounded-full video-breathe" />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <AnimatedSection animation="fadeIn" delay={200}>
              <div className="text-center mb-12">
                <span className="section-tag">Official Trailer</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
                  Every roll counts.
                </h2>
                <div className="section-accent-line bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4 mx-auto" />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scaleIn" delay={400}>
              <VideoTrailer src="/RTD_trailerv5.mp4" />
            </AnimatedSection>
          </div>
        </section>

        <SectionDivider />

        {/* ═══════════════════════════════════
            FEATURE PILLS
        ═══════════════════════════════════ */}
        <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-950/40 to-black">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="slideUp" delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

                {/* Card 1 — Tactical Dice Combat */}
                <div className="feature-card-terminal group">
                  <div className="terminal-chrome">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                    <span className="terminal-filename">DICE_TACTICS.exe</span>
                  </div>
                  <div className="terminal-body">
                    <div className="feature-icon text-cyan-400">
                      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
                        <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
                        <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
                        <circle cx="15.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
                        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <h3 className="text-base font-black text-cyan-400 mb-2 tracking-wide">Tactical Dice Combat</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Strategic dice-based battles with endless depth</p>
                  </div>
                </div>

                {/* Card 2 — Memory Fragments */}
                <div className="feature-card-terminal group">
                  <div className="terminal-chrome">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                    <span className="terminal-filename">MEMORY_FRAG.exe</span>
                  </div>
                  <div className="terminal-body">
                    <div className="feature-icon text-purple-400">
                      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                      </svg>
                    </div>
                    <h3 className="text-base font-black text-purple-400 mb-2 tracking-wide">Memory Fragments</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Unlock haunting memories that shape your destiny</p>
                  </div>
                </div>

                {/* Card 3 — Infinite Replayability */}
                <div className="feature-card-terminal group">
                  <div className="terminal-chrome">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                    <span className="terminal-filename">INFINITE_RUN.exe</span>
                  </div>
                  <div className="terminal-body">
                    <div className="feature-icon text-blue-400">
                      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z" />
                        <path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-black text-blue-400 mb-2 tracking-wide">Infinite Replayability</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Every run tells a different story</p>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          </div>
        </section>

        <SectionDivider />

        {/* ═══════════════════════════════════
            MEMORIES / DUNGEONS
        ═══════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            id="memories"
            className="py-24 px-4 relative overflow-hidden"
            aria-labelledby="dungeons-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/8 to-black pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="section-tag section-tag-blue">World</span>
                <h2
                  id="dungeons-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
                >
                  A lifetime of memories
                </h2>
                <div className="section-accent-line bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
                <p className="text-base md:text-lg text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
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

        <SectionDivider />

        {/* ═══════════════════════════════════
            ENEMIES
        ═══════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            id="enemies"
            className="py-24 px-4 relative overflow-hidden"
            aria-labelledby="enemies-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/8 to-black pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="section-tag section-tag-red">Enemies</span>
                <h2
                  id="enemies-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-red-400 via-orange-300 to-red-400 bg-clip-text text-transparent"
                >
                  A string of haunting faces
                </h2>
                <div className="section-accent-line bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
                <p className="text-base md:text-lg text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
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

        <SectionDivider />

        {/* ═══════════════════════════════════
            ARSENAL / DICE
        ═══════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            id="arsenal"
            className="py-24 px-4 relative overflow-hidden"
            aria-labelledby="dice-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-green-950/8 to-black pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="section-tag section-tag-green">Arsenal</span>
                <h2
                  id="dice-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent"
                >
                  An evolving arsenal
                </h2>
                <div className="section-accent-line bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto" />
                <p className="text-base md:text-lg text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
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

        <SectionDivider />

        {/* ═══════════════════════════════════
            MEMENTOS
        ═══════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            id="mementos"
            className="py-24 px-4 relative overflow-hidden"
            aria-labelledby="mementos-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/8 to-black pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="section-tag section-tag-purple">Collectibles</span>
                <h2
                  id="mementos-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent"
                >
                  And a bagful of tricks...
                </h2>
                <div className="section-accent-line bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto" />
                <p className="text-base md:text-lg text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
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

        <SectionDivider />

        {/* ═══════════════════════════════════
            WATCHES
        ═══════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section
            className="py-24 px-4 relative overflow-hidden"
            aria-labelledby="watches-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/8 to-black pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="section-tag section-tag-amber">Time</span>
                <h2
                  id="watches-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent"
                >
                  But time is not on your side...
                </h2>
                <div className="section-accent-line bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
                <p className="text-base md:text-lg text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
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

        <SectionDivider />

        {/* CTA */}
        <CTASection />

        {/* ═══════════════════════════════════
            FOOTER
        ═══════════════════════════════════ */}
        <footer
          className="relative py-16 px-4 border-t border-white/[0.04]"
          role="contentinfo"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
            <AnimatedSection animation="fadeIn">
              <div className="flex justify-center mb-4">
                <Image
                  src="/Skipstone_logo.png"
                  alt="Skipstone Studios — Indie Game Developer"
                  width={400}
                  height={64}
                  className="w-auto h-16 opacity-60 hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                  quality={80}
                />
              </div>
              <p className="text-gray-500 text-sm tracking-wide">
                © 2024 <span className="text-gray-300">Skipstone Studios</span>. All rights reserved.
              </p>
              <p className="text-gray-600 text-base font-bold tracking-widest mt-2">
                Every roll counts, and death is just the beginning.
              </p>
            </AnimatedSection>
          </div>
        </footer>
      </main>
    </>
  )
}

import AudioPlayer from '@/components/AudioPlayer'
import ImageGallery from '@/components/ImageGallery'
import ImageProtection from '@/components/ImageProtection'
import PixelatedWakeBackground from '@/components/PixelatedWakeBackground'
import Navigation from '@/components/Navigation'
import AnimatedSection from '@/components/AnimatedSection'
import CTASection from '@/components/CTASection'
import VideoTrailer from '@/components/VideoTrailer'
import FeatureCallouts from '@/components/FeatureCallouts'
import Image from 'next/image'
import { getDiceData, getMementoData, getEnemyData, getWatchData } from '@/utils/dataMapper'
import { getBaseUrl } from '@/utils/config'

const gameAssets = {
  dungeons: [
    { file: 'D1_bg.PNG',                   name: 'The Trunk' },
    { file: 'D2_bg.PNG',                   name: 'Bullying' },
    { file: 'D3_bg.PNG',                   name: 'Graduation' },
    { file: 'D4_bg.PNG',                   name: 'The Pitch' },
    { file: 'D5_bg.PNG',                   name: 'Fatherhood' },
    { file: 'D6_bg.PNG',                   name: 'The Funeral' },
    { file: 'D7_bg.PNG',                   name: 'Retirement' },
    { file: 'D8_bg.PNG',                   name: 'Reconciliation' },
    { file: 'D9_bg.PNG',                   name: 'The Family Album' },
    { file: 'D10_bg.PNG',                  name: 'The Deathbed' },
    { file: 'alt_heaven.PNG',              name: 'Heaven' },
    { file: 'alt_hell_bg.PNG',             name: 'Hell' },
    { file: 'alt_purgatory_bg.PNG',        name: 'Purgatory' },
    { file: 'alt_school_cafeteria_bg.PNG', name: 'School Cafeteria' },
    { file: 'alt_the_garage_bg.PNG',       name: 'The Garage' },
    { file: 'alt_the_trunk_bg.PNG',        name: 'The Trunk Revisited' },
    { file: 'alt_the_void_bg.PNG',         name: 'The Void' },
    { file: 'title_char_bg.PNG',           name: 'Character' },
    { file: 'transition_bg.png',           name: 'Transition' },
    { file: 'seam_bg.png',                 name: 'Seam' },
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

      <main className="min-h-screen bg-[#080808] text-[#e8e8e8] relative overflow-x-hidden">
        <Navigation />
        <ImageProtection />
        <AudioPlayer />
        <PixelatedWakeBackground />

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-end pb-24 px-4"
          role="banner"
        >
          {/* Parallax background layers */}
          <div className="absolute inset-0">
            <Image
              src="/backgrounds/title_char_bg.PNG"
              alt=""
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              quality={85}
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 via-transparent to-[#080808]/50" />
          </div>

          {/* Scanlines + static sweep */}
          <div className="scanlines absolute inset-0 pointer-events-none z-[3]" />
          <div className="vhs-static-sweep" />

          {/* REC indicator — top right */}
          <div
            className="absolute top-20 right-6 z-20 flex items-center gap-2"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.15em' }}
          >
            <span className="rec-dot" />
            <span style={{ color: '#ff2200' }}>REC</span>
          </div>

          {/* VHS badge — top left */}
          <div
            className="absolute top-20 left-6 z-20"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: 'rgba(0,255,65,0.6)',
              border: '1px solid rgba(0,255,65,0.2)',
              padding: '2px 8px',
            }}
          >
            VHS SP • HI-FI STEREO
          </div>


          {/* Hero content */}
          <div className="relative z-20 w-full max-w-4xl mx-auto text-center space-y-5">

            <AnimatedSection animation="scaleIn" delay={200}>
              <div className="mb-2">
                <Image
                  src="/title_logo.png"
                  alt="Remember to Die — Tactical Dice Combat Roguelike"
                  width={520}
                  height={270}
                  className="mx-auto max-w-xs md:max-w-md lg:max-w-xl w-full h-auto"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(0,255,65,0.2)) drop-shadow(0 4px 40px rgba(0,0,0,0.8))' }}
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 280px, 520px"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={700}>
              <div>
                <p className="text-3xl md:text-5xl lg:text-6xl tracking-widest text-[#e8e8e8] leading-tight vhs-glitch"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  BATTLE YOUR DEMONS.
                </p>
                <p className="text-3xl md:text-5xl lg:text-6xl tracking-widest leading-tight italic"
                  style={{ fontFamily: 'var(--font-display)', color: '#00ff41', textShadow: '0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.2)' }}>
                  RE-ROLL YOUR DESTINY.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={1100}>
              <p
                className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(232,232,232,0.6)', letterSpacing: '0.03em' }}
              >
                Remember to Die is a gritty, narrative-driven battle against time and broken memories,
                wrapped in an intuitive and moreish dice strategy roguelike where every dice roll
                dredges up a fragmented memory and decides your fate.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={1500}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
                <div className="text-center">
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.25em', color: '#00ff41' }}>
                    COMING SOON
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(0,255,65,0.4)' }}>
                    STEAM EARLY ACCESS
                  </p>
                </div>

                <div className="hidden sm:block w-px h-8 bg-[rgba(0,255,65,0.15)]" />

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

          {/* Timestamp — camcorder style, bottom right */}
          <div
            className="absolute bottom-10 right-6 z-20 text-right"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}
          >
            <div>04-06-94</div>
            <div>11:42 PM</div>
          </div>

          {/* Scroll indicator */}
          <AnimatedSection animation="fadeIn" delay={2400}>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20">
              <span className="vhs-scroll-arrow">▼ FAST-FWD ▼</span>
            </div>
          </AnimatedSection>
        </section>

        <hr className="vhs-divider" />

        {/* ══════════════════════════════════════
            SCENE 01 — TRAILER / ABOUT
        ══════════════════════════════════════ */}
        <section id="trailer" className="relative py-20 px-6 bg-[#080808]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

              <AnimatedSection animation="slideRight" delay={200}>
                <div>
                  <div className="vhs-chapter">SCENE 01 — OFFICIAL TRAILER</div>
                  <h2
                    className="text-6xl md:text-7xl lg:text-8xl mb-5 vhs-glitch"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}
                  >
                    EVERY ROLL COUNTS.
                  </h2>
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(232,232,232,0.6)' }}
                  >
                    Remember to Die is a gritty, narrative-driven battle against time and broken memories,
                    wrapped in an intuitive and moreish dice strategy roguelike where every dice roll
                    dredges up a fragmented memory and decides your fate.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideLeft" delay={400}>
                <VideoTrailer src="/RTD_trailerv5.mp4" />
              </AnimatedSection>
            </div>

            {/* Feature callouts */}
            <FeatureCallouts />
          </div>
        </section>

        <hr className="vhs-divider" />

        {/* ══════════════════════════════════════
            SCENE 02 — MEMORIES
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section id="memories" className="py-20 px-6 relative overflow-hidden" aria-labelledby="memories-heading">
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-12">
                <div className="vhs-chapter">SCENE 02 — THE WORLD</div>
                <h2
                  id="memories-heading"
                  className="text-6xl md:text-7xl lg:text-8xl mb-4 vhs-glitch"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  A LIFETIME OF MEMORIES
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(232,232,232,0.55)', fontSize: '1rem' }}>
                  Each fragment you unlock splinters the story into new fates; you choose which fantasies to pursue, and which truths to rewrite.
                </p>
              </div>
              <ImageGallery items={gameAssets.dungeons} folder="backgrounds" direction="right" size="massive" galleryId="dungeons" showTooltips={false} />
            </div>
          </section>
        </AnimatedSection>

        <hr className="vhs-divider" />

        {/* ══════════════════════════════════════
            SCENE 03 — ENEMIES
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section id="enemies" className="py-20 px-6 relative overflow-hidden" aria-labelledby="enemies-heading">
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-12">
                <div className="vhs-chapter" style={{ color: '#ff2200' }}>
                  <span style={{ color: '#ff2200' }}>■</span>
                  SCENE 03 — ENEMIES
                  <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,34,0,0.4), transparent)', maxWidth: '240px', display: 'block' }} />
                </div>
                <h2
                  id="enemies-heading"
                  className="text-6xl md:text-7xl lg:text-8xl mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    textShadow: '2px 0 rgba(255,0,255,0.8), -2px 0 rgba(0,229,255,0.8)',
                    animation: 'chroma-burst 9s step-end infinite',
                  }}
                >
                  A STRING OF HAUNTING FACES
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(232,232,232,0.55)', fontSize: '1rem' }}>
                  Each enemy hints at more of the haunting truth.
                </p>
              </div>
              <ImageGallery items={gameAssets.enemies} folder="portraits" direction="left" size="extra-large" galleryId="enemies" />
            </div>
          </section>
        </AnimatedSection>

        <hr className="vhs-divider" />

        {/* ══════════════════════════════════════
            SCENE 04 — ARSENAL
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section id="arsenal" className="py-20 px-6 relative overflow-hidden" aria-labelledby="dice-heading">
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-12">
                <div className="vhs-chapter">SCENE 04 — ARSENAL</div>
                <h2
                  id="dice-heading"
                  className="text-6xl md:text-7xl lg:text-8xl mb-4 vhs-glitch"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  AN EVOLVING ARSENAL
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(232,232,232,0.55)', fontSize: '1rem' }}>
                  Collect and refine powerful dice combinations.
                </p>
              </div>
              <ImageGallery items={gameAssets.dice} folder="dice" direction="right" size="medium" galleryId="dice" />
            </div>
          </section>
        </AnimatedSection>

        <hr className="vhs-divider" />

        {/* ══════════════════════════════════════
            SCENE 05 — MEMENTOS
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section id="mementos" className="py-20 px-6 relative overflow-hidden" aria-labelledby="mementos-heading">
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-12">
                <div className="vhs-chapter">SCENE 05 — COLLECTIBLES</div>
                <h2
                  id="mementos-heading"
                  className="text-6xl md:text-7xl lg:text-8xl mb-4 vhs-glitch"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  AND A BAGFUL OF TRICKS...
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(232,232,232,0.55)', fontSize: '1rem' }}>
                  Collect mementos drenched in heartbreaking lore, each with unique effects.
                </p>
              </div>
              <ImageGallery items={gameAssets.mementos} folder="mementos" direction="left" size="medium" galleryId="mementos" />
            </div>
          </section>
        </AnimatedSection>

        <hr className="vhs-divider" />

        {/* ══════════════════════════════════════
            SCENE 06 — WATCHES
        ══════════════════════════════════════ */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section className="py-20 px-6 relative overflow-hidden" aria-labelledby="watches-heading">
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="mb-12">
                <div className="vhs-chapter">SCENE 06 — TIME</div>
                <h2
                  id="watches-heading"
                  className="text-6xl md:text-7xl lg:text-8xl mb-4 vhs-glitch"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  BUT TIME IS NOT ON YOUR SIDE...
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(232,232,232,0.55)', fontSize: '1rem' }}>
                  Unique watches shift the odds.
                </p>
              </div>
              <ImageGallery items={gameAssets.watches} folder="watches" direction="right" size="medium" galleryId="watches" />
            </div>
          </section>
        </AnimatedSection>

        <hr className="vhs-divider" />

        {/* CTA */}
        <CTASection />

        {/* FOOTER */}
        <footer
          className="relative py-14 px-6 border-t"
          style={{ borderColor: 'rgba(0,255,65,0.1)' }}
          role="contentinfo"
        >
          <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
            <AnimatedSection animation="fadeIn">
              <div className="flex justify-center mb-4">
                <Image
                  src="/Skipstone_logo.png"
                  alt="Skipstone Studios"
                  width={360}
                  height={58}
                  className="w-auto h-10 opacity-30 hover:opacity-60 transition-opacity duration-500"
                  loading="lazy"
                  quality={80}
                  style={{ filter: 'grayscale(1)' }}
                />
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(232,232,232,0.25)' }}>
                © 2024 SKIPSTONE STUDIOS. ALL RIGHTS RESERVED.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'rgba(0,255,65,0.2)', marginTop: '0.5rem' }}>
                EVERY ROLL COUNTS, AND DEATH IS JUST THE BEGINNING.
              </p>
              <a href="/privacy" className="inline-block text-[0.6rem] tracking-[0.2em] text-gray-700 hover:text-cyan-400 transition-colors duration-200 uppercase mt-3">
                Privacy Policy
              </a>
            </AnimatedSection>
          </div>
        </footer>
      </main>
    </>
  )
}

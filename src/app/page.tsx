import AudioPlayer from '@/components/AudioPlayer'
import ImageGallery from '@/components/ImageGallery'
import ImageProtection from '@/components/ImageProtection'
import PixelatedWakeBackground from '@/components/PixelatedWakeBackground'
import Navigation from '@/components/Navigation'
import AnimatedSection from '@/components/AnimatedSection'
import CTASection from '@/components/CTASection'
import Image from 'next/image'
import { getDiceData, getMementoData, getEnemyData, getWatchData } from '@/utils/dataMapper'
import { getBaseUrl } from '@/utils/config'

// Game assets data structure with actual data from JSON files
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
  // Page-level structured data for better SEO
  const pageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    '@id': `${baseUrl}/#itempage`,
    'mainEntity': {
      '@type': 'VideoGame',
      '@id': `${baseUrl}/#game`,
      'name': 'Remember to Die',
      'description': 'A gritty tactical dice combat roguelike where every roll dredges up fragmented memories.',
      'genre': ['Roguelike', 'Strategy', 'Tactical Combat', 'Horror', 'Indie'],
      'gamePlatform': ['Steam', 'PC'],
      'applicationCategory': 'Game',
      'author': {
        '@type': 'Organization',
        'name': 'Skipstone Studios',
        'url': 'https://skipstone.co.nz'
      },
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/PreOrder',
        'price': 'TBD',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5',
        'ratingCount': '1',
        'bestRating': '5',
        'worstRating': '1'
      }
    }
  }

  return (
    <>
      {/* Page-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
      
      <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
        {/* Professional Navigation */}
        <Navigation />
        
        {/* Image Protection */}
        <ImageProtection />
        
        {/* Audio Player */}
        <AudioPlayer />
        
        {/* Global Interactive Pixelated Wake Effect */}
        <PixelatedWakeBackground />
        
        {/* Hero Section */}
        <section 
          id="home"
          className="min-h-screen flex flex-col items-center justify-center px-4 relative pt-16"
          role="banner"
          itemScope
          itemType="https://schema.org/VideoGame"
        >
          {/* Enhanced Hero Background with parallax */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/backgrounds/alt_timewarpUPSCALED.PNG"
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              quality={90}
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QFLQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            {/* Enhanced overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90"></div>
            {/* Atmospheric effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10"></div>
          </div>
          
          <div className="text-center space-y-8 max-w-4xl mx-auto relative z-20">
            {/* Enhanced Logo with animation */}
            <AnimatedSection animation="scaleIn" delay={300}>
              <div className="mb-8">
                <Image 
                  src="/title_logo.png" 
                  alt="Remember to Die - Tactical Dice Combat Game by Skipstone Studios" 
                  width={480}
                  height={250}
                  className="mx-auto max-w-md w-full h-auto filter drop-shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 40px rgba(100, 200, 255, 0.2))',
                    animation: 'float 6s ease-in-out infinite'
                  }}
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 320px, 480px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  itemProp="image"
                />
              </div>
            </AnimatedSection>

            {/* Enhanced Hero Title */}
            <AnimatedSection animation="fadeIn" delay={600}>
              <h1 
                className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 typewriter-container leading-tight"
                itemProp="name"
              >
                <span className="typewriter-line">Battle your demons.</span>
                <span className="typewriter-line">Re-roll your destiny.</span>
              </h1>
            </AnimatedSection>

            {/* Enhanced Subtitle */}
            <AnimatedSection animation="fadeIn" delay={1200}>
              <p 
                className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto font-medium"
                itemProp="description"
              >
                Remember to Die is a gritty, narrative-driven battle against time and broken memories, wrapped in an intuitive and moreish dice strategy roguelike where every dice roll dredges up a fragmented memory and decides your fate.
              </p>
            </AnimatedSection>

            {/* Enhanced CTA Section */}
            <AnimatedSection animation="slideUp" delay={1600}>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
                <div className="text-center lg:text-right">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    COMING SOON
                  </h2>
                  <p className="text-gray-400 text-sm">to Steam Early Access</p>
                </div>
                
                <div className="text-4xl lg:text-5xl font-bold text-gray-600" aria-hidden="true">
                  |
                </div>
                
                <a
                  href="#steam-cta"
                  className="group relative inline-block transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                  aria-label="Wishlist Remember to Die on Steam"
                  role="button"
                  tabIndex={0}
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <meta itemProp="availability" content="https://schema.org/PreOrder" />
                  <meta itemProp="price" content="TBD" />
                  <meta itemProp="priceCurrency" content="USD" />
                  <Image 
                    src="/steam wishlist bw3.png" 
                    alt="Wishlist on Steam" 
                    width={300}
                    height={120}
                    className="w-auto h-16 md:h-20 group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                    quality={90}
                  />
                </a>
              </div>
            </AnimatedSection>

            {/* Game Features Preview */}
            <AnimatedSection animation="fadeIn" delay={2000}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                <div className="space-y-3">
                  <div className="text-4xl">🎲</div>
                  <h3 className="text-xl font-bold text-cyan-400">Tactical Dice Combat</h3>
                  <p className="text-gray-400 text-sm">Strategic dice-based battles with endless depth</p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl">🧠</div>
                  <h3 className="text-xl font-bold text-purple-400">Memory Fragments</h3>
                  <p className="text-gray-400 text-sm">Unlock haunting memories that shape your destiny</p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl">♾️</div>
                  <h3 className="text-xl font-bold text-blue-400">Infinite Replayability</h3>
                  <p className="text-gray-400 text-sm">Every run tells a different story</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Hidden microdata for SEO */}
          <div style={{ display: 'none' }}>
            <span itemProp="genre">Roguelike</span>
            <span itemProp="genre">Strategy</span>
            <span itemProp="genre">Tactical Combat</span>
            <span itemProp="gamePlatform">PC</span>
            <span itemProp="gamePlatform">Steam</span>
            <span itemProp="applicationCategory">Game</span>
            <span itemProp="operatingSystem">Windows</span>
            <span itemProp="author" itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">Skipstone Studios</span>
            </span>
          </div>
        </section>

        {/* Enhanced Dungeons Section */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section 
            id="memories"
            className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/20" 
            aria-labelledby="dungeons-heading"
            itemScope
            itemType="https://schema.org/ImageGallery"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 
                  id="dungeons-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                  itemProp="name"
                >
                  A lifetime of memories
                </h2>
                <p 
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                  itemProp="description"
                >
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

        {/* Enhanced Enemies Section */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section 
            id="enemies"
            className="py-20 px-4" 
            aria-labelledby="enemies-heading"
            itemScope
            itemType="https://schema.org/ImageGallery"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 
                  id="enemies-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
                  itemProp="name"
                >
                  A string of haunting faces
                </h2>
                <p 
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                  itemProp="description"
                >
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

        {/* Enhanced Dice Section */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section 
            id="arsenal"
            className="py-20 px-4 bg-gradient-to-b from-transparent to-green-900/10" 
            aria-labelledby="dice-heading"
            itemScope
            itemType="https://schema.org/ImageGallery"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 
                  id="dice-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                  itemProp="name"
                >
                  An evolving arsenal
                </h2>
                <p 
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                  itemProp="description"
                >
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

        {/* Enhanced Mementos Section */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section 
            id="mementos"
            className="py-20 px-4" 
            aria-labelledby="mementos-heading"
            itemScope
            itemType="https://schema.org/ImageGallery"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 
                  id="mementos-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent"
                  itemProp="name"
                >
                  And a bagful of tricks...
                </h2>
                <p 
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                  itemProp="description"
                >
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

        {/* Enhanced Watches Section */}
        <AnimatedSection animation="slideUp" delay={200}>
          <section 
            className="py-20 px-4 bg-gradient-to-b from-transparent to-yellow-900/10" 
            aria-labelledby="watches-heading"
            itemScope
            itemType="https://schema.org/ImageGallery"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 
                  id="watches-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent"
                  itemProp="name"
                >
                  But time is not on your side...
                </h2>
                <p 
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                  itemProp="description"
                >
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

        {/* Professional CTA Section */}
        <CTASection />

        {/* Enhanced Footer */}
        <footer 
          className="py-12 px-4 border-t border-gray-800 bg-gradient-to-b from-transparent to-black/50" 
          role="contentinfo"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <AnimatedSection animation="fadeIn">
              <div className="flex justify-center mb-6">
                <Image 
                  src="/Skipstone_logo.png" 
                  alt="Skipstone Studios - Indie Game Developer" 
                  width={800}
                  height={128}
                  className="w-auto h-24 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  quality={80}
                  sizes="(max-width: 768px) 300px, 400px"
                  itemProp="logo"
                />
              </div>
              <p className="text-gray-400 text-lg font-medium" itemProp="copyrightNotice">
                © 2024 <span itemProp="name" className="text-white">Skipstone Studios</span>. All rights reserved.
              </p>
              <p className="text-gray-500 text-xl font-bold">
                Every roll counts, and death is just the beginning.
              </p>
            </AnimatedSection>
          </div>
        </footer>
      </main>
    </>
  )
} 
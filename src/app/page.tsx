import AudioPlayer from '@/components/AudioPlayer'
import ImageGallery from '@/components/ImageGallery'
import ImageProtection from '@/components/ImageProtection'
import Image from 'next/image'
import { getDiceData, getMementoData, getEnemyData, getWatchData } from '@/utils/dataMapper'

// Game assets data structure with actual data from JSON files
const gameAssets = {
  dungeons: [
    { file: "D1_bg.PNG", name: "Classroom" },
    { file: "D2_bg.PNG", name: "Dormitory" },
    { file: "D4_bg.PNG", name: "Cemetery" },
    { file: "D5_bg.PNG", name: "Laboratory" },
    { file: "D6_bg.PNG", name: "Office" },
    { file: "D7_bg.PNG", name: "Library" },
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
  // Page-level structured data for better SEO
  const pageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    '@id': 'https://skipstone.co.nz/#itempage',
    'mainEntity': {
      '@type': 'VideoGame',
      '@id': 'https://skipstone.co.nz/#game',
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
        {/* Image Protection */}
        <ImageProtection />
        
        {/* Audio Player */}
        <AudioPlayer />
        
        {/* Hero Section */}
        <section 
          className="min-h-screen flex flex-col items-center justify-center px-4 relative"
          role="banner"
          itemScope
          itemType="https://schema.org/VideoGame"
        >
          {/* Hero Background with optimized loading */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/backgrounds/alt_timewarpUPSCALED.PNG"
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              quality={75}
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            {/* Dark overlay for better text readability with improved contrast */}
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10">
            {/* Main Logo with optimized loading */}
            <div className="mb-4">
              <Image 
                src="/title_logo.png" 
                alt="Remember to Die - Tactical Dice Combat Game by Skipstone Studios" 
                width={384}
                height={200}
                className="mx-auto max-w-sm w-full h-auto"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))' }}
                priority
                quality={85}
                sizes="(max-width: 768px) 320px, 384px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                itemProp="image"
              />
            </div>

            {/* Hero Title with improved accessibility and microdata */}
            <h1 
              className="text-2xl md:text-4xl font-bold text-white mb-3 typewriter-container"
              itemProp="name"
            >
              <span className="typewriter-line">Battle your demons.</span>
              <span className="typewriter-line">Re-roll your destiny.</span>
            </h1>

            {/* Subtitle with better contrast and microdata */}
            <p 
              className="text-base md:text-lg text-gray-200 mb-4 leading-relaxed"
              itemProp="description"
            >
              Remember to Die is a gritty, narrative-driven battle against time and broken memories, wrapped in an intuitive and moreish dice strategy roguelike where every dice roll dredges up a fragmented memory and decides your fate. Collect poignant mementos to bend truth or illusion in your favour, confront your inner demons and reroll your destiny one fragment at a time.
            </p>

            {/* Steam Wishlist Button with better accessibility and microdata */}
            <div className="flex items-center justify-center gap-4">
              <div className="text-right">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                  COMING SOON
                </h2>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-300" aria-hidden="true">
                |
              </div>
              <a
                href="#steam-wishlist"
                className="group relative"
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
                  src="/steam.png" 
                  alt="Wishlist on Steam" 
                  width={200}
                  height={60}
                  className="w-auto h-12 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
                  loading="lazy"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
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

        {/* Dungeons Section */}
        <section 
          className="py-8 px-4" 
          aria-labelledby="dungeons-heading"
          itemScope
          itemType="https://schema.org/ImageGallery"
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              id="dungeons-heading"
              className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent"
              itemProp="name"
            >
              A lifetime of memories
            </h2>
            <p 
              className="text-center text-gray-300 mb-6 max-w-xl mx-auto text-sm md:text-base"
              itemProp="description"
            >
             Each fragment you unlock splinters the story into new fates; you choose which fantasies to pursue, and which truths to rewrite.
            </p>
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

        {/* Enemies Section */}
        <section 
          className="py-4 px-4" 
          aria-labelledby="enemies-heading"
          itemScope
          itemType="https://schema.org/ImageGallery"
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              id="enemies-heading"
              className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent"
              itemProp="name"
            >
              A string of haunting faces
            </h2>
            <p 
              className="text-center text-gray-300 mb-6 max-w-xl mx-auto text-sm md:text-base"
              itemProp="description"
            >
              Each enemy hints at more of the haunting truth.
            </p>
            <ImageGallery 
              items={gameAssets.enemies} 
              folder="portraits" 
              direction="left" 
              size="extra-large"
              galleryId="enemies"
            />
          </div>
        </section>

        {/* Dice Section */}
        <section 
          className="py-4 px-4" 
          aria-labelledby="dice-heading"
          itemScope
          itemType="https://schema.org/ImageGallery"
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              id="dice-heading"
              className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent"
              itemProp="name"
            >
              An evolving arsenal
            </h2>
            <p 
              className="text-center text-gray-300 mb-6 max-w-xl mx-auto text-sm md:text-base"
              itemProp="description"
            >
              Collect and refine powerful dice combinations.
            </p>
            <ImageGallery 
              items={gameAssets.dice} 
              folder="dice" 
              direction="right" 
              size="medium"
              galleryId="dice"
            />
          </div>
        </section>

        {/* Mementos Section */}
        <section 
          className="py-4 px-4" 
          aria-labelledby="mementos-heading"
          itemScope
          itemType="https://schema.org/ImageGallery"
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              id="mementos-heading"
              className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
              itemProp="name"
            >
              And a bagful of tricks...
            </h2>
            <p 
              className="text-center text-gray-300 mb-6 max-w-xl mx-auto text-sm md:text-base"
              itemProp="description"
            >
              Collect mementos drenched in heartbreaking lore, each with unique effects.
            </p>
            <ImageGallery 
              items={gameAssets.mementos} 
              folder="mementos" 
              direction="left" 
              size="medium"
              galleryId="mementos"
            />
          </div>
        </section>

        {/* Watches Section */}
        <section 
          className="py-4 px-4" 
          aria-labelledby="watches-heading"
          itemScope
          itemType="https://schema.org/ImageGallery"
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              id="watches-heading"
              className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent"
              itemProp="name"
            >
              But time is not on your side...
            </h2>
            <p 
              className="text-center text-gray-300 mb-6 max-w-xl mx-auto text-sm md:text-base"
              itemProp="description"
            >
              Unique watches shift the odds.
            </p>
            <ImageGallery 
              items={gameAssets.watches} 
              folder="watches" 
              direction="right" 
              size="medium"
              galleryId="watches"
            />
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="py-6 px-4 border-t border-gray-700" 
          role="contentinfo"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <div className="flex justify-center mb-3">
              <Image 
                src="/Skipstone_logo.png" 
                alt="Skipstone Studios - Indie Game Developer" 
                width={800}
                height={128}
                className="w-auto h-32 opacity-80"
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 300px, 400px"
                itemProp="logo"
              />
            </div>
            <p className="text-gray-300" itemProp="copyrightNotice">
              © 2024 <span itemProp="name">Skipstone Studios</span>. All rights reserved.
            </p>
            <p className="text-gray-400 text-lg">
              Every roll counts, and death is just the beginning.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
} 
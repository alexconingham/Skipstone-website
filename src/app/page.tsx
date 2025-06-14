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
  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Image Protection */}
      <ImageProtection />
      
      {/* Audio Player */}
      <AudioPlayer />
      
      {/* Hero Section */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/backgrounds/alt_timewarpUPSCALED.PNG)',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10">
          {/* Main Logo */}
          <div className="mb-4">
            <Image 
              src="/title_logo.png" 
              alt="Remember to Die - Game Logo" 
              width={384}
              height={200}
              className="mx-auto max-w-sm w-full h-auto"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' }}
              priority
            />
          </div>

          {/* Hero Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 typewriter-container">
            <span className="typewriter-line">Battle your demons.</span>
            <span className="typewriter-line">Re-roll your destiny.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed">
            Remember to Die is a gritty, narrative-driven battle against time and broken memories, wrapped in an intuitive and moreish dice strategy. roguelike where every dice roll dredges up a fragmented memory and decides your fate. Collect poignant mementos to bend truth or illusion in your favour, confront your inner demons and reroll your destiny one fragment at a time.
          </p>

          {/* Steam Wishlist Button */}
          <div className="flex items-center justify-center gap-4">
            <div className="text-right">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                COMING SOON
              </h3>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-400">
              |
            </div>
            <button className="group relative">
              <Image 
                src="/steam.png" 
                alt="Wishlist on Steam" 
                width={200}
                height={60}
                className="w-auto h-12 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>


      </section>

      {/* Dungeons Section */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            A lifetime of memories
          </h2>
          <p className="text-center text-gray-400 mb-6 max-w-xl mx-auto text-sm md:text-base">
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
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            A string of haunting faces
          </h2>
          <p className="text-center text-gray-400 mb-6 max-w-xl mx-auto text-sm md:text-base">
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
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            An evolving arsenal
          </h2>
          <p className="text-center text-gray-400 mb-6 max-w-xl mx-auto text-sm md:text-base">
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
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            And a bagful of tricks...
          </h2>
          <p className="text-center text-gray-400 mb-6 max-w-xl mx-auto text-sm md:text-base">
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
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
            But time is not on your side...
          </h2>
          <p className="text-center text-gray-400 mb-6 max-w-xl mx-auto text-sm md:text-base">
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
      <footer className="py-6 px-4 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="flex justify-center mb-3">
            <Image 
              src="/Skipstone_logo.png" 
              alt="Skipstone Games" 
              width={800}
              height={128}
              className="w-auto h-32 opacity-80"
            />
          </div>
          <p className="text-gray-400">
            © 2024 Skipstone Games. All rights reserved.
          </p>
          <p className="text-gray-500 text-lg">
            Every roll counts, and death is just the beginning.
          </p>
        </div>
      </footer>
    </main>
  )
} 
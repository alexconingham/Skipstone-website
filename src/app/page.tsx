import AudioPlayer from '@/components/AudioPlayer'
import ImageGallery from '@/components/ImageGallery'

// Game assets data structure with ALL available assets
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
  enemies: [
    { file: "D1_boss.png", name: "School Principal" },
    { file: "D1_elite.png", name: "Head Teacher" },
    { file: "_D1_grunt.png", name: "Student" },
    { file: "D2_boss.png", name: "Dorm Warden" },
    { file: "D2_elite.png", name: "Prefect" },
    { file: "D2_grunt.png", name: "Sleeper" },
    { file: "D3_boss.png", name: "Principal" },
    { file: "D3_elite.png", name: "Elite Student" },
    { file: "D3_grunt.png", name: "Student Council" },
    { file: "D4_boss.png", name: "Groundskeeper" },
    { file: "D4_elite.png", name: "Cemetery Elite" },
    { file: "D4_grunt.png", name: "Lost Soul" },
    { file: "D5_boss.png", name: "Lab Director" },
    { file: "D5_elite.png", name: "Scientist" },
    { file: "D5_grunt.png", name: "Test Subject" },
    { file: "D6_boss.png", name: "Office Manager" },
    { file: "D6_elite.png", name: "Secretary" },
    { file: "D6_grunt.png", name: "Intern" },
    { file: "D7_boss.png", name: "Head Librarian" },
    { file: "D7_elite.png", name: "Librarian" },
    { file: "D7_grunt.png", name: "Book Keeper" },
    { file: "D8_boss.png", name: "Hall Monitor" },
    { file: "D8_elite.png", name: "Enforcer" },
    { file: "D8_grunt.png", name: "Wanderer" },
    { file: "D9_boss.png", name: "Night Watch" },
    { file: "D9_elite.png", name: "Security" },
    { file: "D9_grunt.png", name: "Guard" },
    { file: "D10_boss.png", name: "Headmaster" },
    { file: "D10_elite.png", name: "Vice Principal" },
    { file: "D10_grunt.png", name: "Hall Student" }
  ],
  dice: [
    { file: "life.png", name: "Life Die" },
    { file: "advanced_renew_die.png", name: "Advanced Renew" },
    { file: "gladiator_die.png", name: "Gladiator Die" },
    { file: "heal_die.png", name: "Heal Die" },
    { file: "shield_die.png", name: "Shield Die" },
    { file: "burn_die.png", name: "Burn Die" },
    { file: "poison_die.png", name: "Poison Die" },
    { file: "iron_die.png", name: "Iron Die" },
    { file: "brave_heart_die.png", name: "Brave Heart" },
    { file: "divinity_die.png", name: "Divinity" },
    { file: "stagger_die.png", name: "Stagger" },
    { file: "reflect_die.png", name: "Reflect" },
    { file: "knockback_die.png", name: "Knockback" },
    { file: "piercing_die.png", name: "Piercing" },
    { file: "cleanse_die.png", name: "Cleanse" },
    { file: "death_die.png", name: "Death" },
    { file: "renew_die.png", name: "Renew" },
    { file: "bleed_die.png", name: "Bleed" },
    { file: "razor_die.png", name: "Razor" },
    { file: "simple_d6_attack.png", name: "Attack D6" },
    { file: "simple_d6_defence.png", name: "Defense D6" },
    { file: "simple_d12_heal.png", name: "Heal D12" },
    { file: "simple_d6_heal.png", name: "Heal D6" },
    { file: "simple_d12_defence.png", name: "Defense D12" },
    { file: "simple_d12_attack.png", name: "Attack D12" },
    { file: "pain_die.png", name: "Pain" },
    { file: "thorn_die.png", name: "Thorn" },
    { file: "chrono_die.png", name: "Chrono" }
  ],
  mementos: [
    { file: "the_remedy.png", name: "The Remedy" },
    { file: "extra_life.png", name: "Extra Life" },
    { file: "lucky_coin.png", name: "Lucky Coin" },
    { file: "whetstone.png", name: "Whetstone" },
    { file: "gold_watch_memento.png", name: "Gold Watch" },
    { file: "beauty_mirror.png", name: "Beauty Mirror" },
    { file: "family_album.png", name: "Family Album" },
    { file: "hush_money.png", name: "Hush Money" },
    { file: "thunder_blanket.png", name: "Thunder Blanket" },
    { file: "the_full_picture.png", name: "The Full Picture" },
    { file: "mended_ring.png", name: "Mended Ring" },
    { file: "obituary_clipping.png", name: "Obituary Clipping" },
    { file: "juice_stained_yearbook.png", name: "Stained Yearbook" },
    { file: "flickering_halo.png", name: "Flickering Halo" },
    { file: "garage_key.png", name: "Garage Key" },
    { file: "intimidating_presence.png", name: "Intimidating Presence" },
    { file: "knuckle_dusters.png", name: "Knuckle Dusters" },
    { file: "key_to_the_city.png", name: "Key to the City" },
    { file: "moldy_bandage.png", name: "Moldy Bandage" },
    { file: "match_head.png", name: "Match Head" },
    { file: "namesake.png", name: "Namesake" },
    { file: "one_armed_scissor.png", name: "One Armed Scissor" },
    { file: "paper_crown.png", name: "Paper Crown" },
    { file: "razor_blade.png", name: "Razor Blade" },
    { file: "reading_glasses.png", name: "Reading Glasses" },
    { file: "rosary_beads.png", name: "Rosary Beads" },
    { file: "reunion_tour_ticket.png", name: "Reunion Ticket" },
    { file: "salt_shell.png", name: "Salt Shell" },
    { file: "sock_of_coins.png", name: "Sock of Coins" },
    { file: "silver_spoon.png", name: "Silver Spoon" },
    { file: "strange_key.png", name: "Strange Key" },
    { file: "superpower_serum.png", name: "Superpower Serum" },
    { file: "thick_bandage.png", name: "Thick Bandage" },
    { file: "tourniquet.png", name: "Tourniquet" },
    { file: "unsent_letter.png", name: "Unsent Letter" },
    { file: "unusual_polaroid.png", name: "Unusual Polaroid" },
    { file: "unfilled_script.png", name: "Unfilled Script" },
    { file: "fathers_watch_memento.png", name: "Father's Watch" },
    { file: "broken_stopwatch.png", name: "Broken Stopwatch" },
    { file: "clean_slate.png", name: "Clean Slate" },
    { file: "cracked_ring.png", name: "Cracked Ring" },
    { file: "cremation_ashes.png", name: "Cremation Ashes" },
    { file: "death_certificate.png", name: "Death Certificate" },
    { file: "dried_rose.png", name: "Dried Rose" },
    { file: "dusty_locket.png", name: "Dusty Locket" },
    { file: "empty_chair.png", name: "Empty Chair" },
    { file: "electric_blanket.png", name: "Electric Blanket" },
    { file: "empty_crib.png", name: "Empty Crib" },
    { file: "faded_photo.png", name: "Faded Photo" },
    { file: "family_bondo.png", name: "Family Bondo" },
    { file: "baby_monitor.png", name: "Baby Monitor" },
    { file: "ball_gag.png", name: "Ball Gag" },
    { file: "best_dad_certificate.png", name: "Best Dad Certificate" },
    { file: "broken_inhaler.png", name: "Broken Inhaler" },
    { file: "black_eyeliner.png", name: "Black Eyeliner" },
    { file: "blank_name_badge.png", name: "Blank Name Badge" },
    { file: "bloodied_tenderizer.png", name: "Bloodied Tenderizer" },
    { file: "safety_pin.png", name: "Safety Pin" },
    { file: "rabbits_foot.png", name: "Rabbit's Foot" },
    { file: "holy_water.png", name: "Holy Water" },
    { file: "expired_adderall.png", name: "Expired Adderall" },
    { file: "empty_wallet.png", name: "Empty Wallet" },
    { file: "communion_wafer.png", name: "Communion Wafer" },
    { file: "broken_flask.png", name: "Broken Flask" },
    { file: "broken_toy.png", name: "Broken Toy" },
    { file: "stress_ball.png", name: "Stress Ball" },
    { file: "engraved_pen.png", name: "Engraved Pen" },
    { file: "empty_lunchbox.png", name: "Empty Lunchbox" },
    { file: "shifting_photo.png", name: "Shifting Photo" },
    { file: "framed_memo.png", name: "Framed Memo" },
    { file: "gate_lock.png", name: "Gate Lock" },
    { file: "mums_perfume.png", name: "Mum's Perfume" }
  ]
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Audio Player */}
      <AudioPlayer />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Logo */}
          <div className="mb-8">
            <img 
              src="/title_logo.png" 
              alt="Remember to Die - Game Logo" 
              className="mx-auto max-w-2xl w-full h-auto"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' }}
            />
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Battle your demons. <br />Re-roll your destiny.
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Remember to Die is a gritty, narrative-driven roguelike where every dice roll dredges up a fragmented memory and decides your fate. Collect poignant mementos to bend truth or illusion in your favour, confront your inner demons and reroll your destiny one fragment at a time.
          </p>

          {/* Steam Wishlist Button */}
          <div className="flex justify-center">
            <button className="group relative">
              <img 
                src="/steam.png" 
                alt="Wishlist on Steam" 
                className="h-16 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Dungeons Section */}
      <section className="py-18 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            A lifetime of memories
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
           Each fragment unlocked splinters the story into new paths, you choose which memories to pursue and which truths to rewrite.
          </p>
          <ImageGallery 
            items={gameAssets.dungeons} 
            folder="backgrounds" 
            direction="right" 
            size="massive"
            galleryId="dungeons"
          />
        </div>
      </section>

      {/* Enemies Section */}
      <section className="py-18 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            A string of haunting faces
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
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
      <section className="py-18 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            An evolving arsenal
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Collect and refine powerful dice combinations.
          </p>
          <ImageGallery 
            items={gameAssets.dice} 
            folder="dice" 
            direction="right" 
            size="large"
            galleryId="dice"
          />
        </div>
      </section>

      {/* Mementos Section */}
      <section className="py-18 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            And a full bag of tricks...
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Collect mementos drenched in heartbreaking lore, each with unique effects.
          </p>
          <ImageGallery 
            items={gameAssets.mementos} 
            folder="mementos" 
            direction="left" 
            size="large"
            galleryId="mementos"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center mb-6">
            <img 
              src="/Skipstone_logo.png" 
              alt="Skipstone Games" 
              className="h-6 opacity-80"
            />
          </div>
          <p className="text-gray-400">
            © 2024 Skipstone Games. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Dive into the tactical depths of Remember to Die - where every roll counts and death is just the beginning.
          </p>
        </div>
      </footer>
    </main>
  )
} 
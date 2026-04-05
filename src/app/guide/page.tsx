import type { Metadata } from 'next'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import ImageProtection from '@/components/ImageProtection'

export const metadata: Metadata = {
  title: 'Player Guide — Remember to Die',
  description: 'Learn the mechanics of Remember to Die: dice combat, memory fragments, status effects, mementos, and advanced strategies.',
}

function Placeholder({ label, aspect = 'video' }: { label: string; aspect?: 'video' | 'square' | 'wide' }) {
  const aspectClass = aspect === 'video' ? 'aspect-video' : aspect === 'square' ? 'aspect-square' : 'aspect-[21/9]'
  return (
    <div className={`relative ${aspectClass} w-full border border-dashed border-cyan-800/40 bg-cyan-950/10 rounded-lg flex items-center justify-center overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-purple-900/5" />
      <div className="relative text-center px-6">
        <div className="text-cyan-600/60 text-xs tracking-[.2em] uppercase mb-1">Placeholder</div>
        <div className="text-cyan-400/80 text-sm font-medium leading-relaxed">{label}</div>
      </div>
    </div>
  )
}

function DiceImage({ src, alt, size = 48 }: { src: string; alt: string; size?: number }) {
  return (
    <div className="inline-flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded border border-white/10"
        quality={90}
        loading="lazy"
      />
    </div>
  )
}

function GuideSection({
  id,
  tag,
  tagColor,
  title,
  titleGradient,
  description,
  children,
}: {
  id?: string
  tag: string
  tagColor: string
  title: string
  titleGradient: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="py-20 px-4 relative" aria-labelledby={id ? `${id}-heading` : undefined}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className={`section-tag ${tagColor}`}>{tag}</span>
          <h2 id={id ? `${id}-heading` : undefined} className={`text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}>
            {title}
          </h2>
          <div className={`section-accent-line bg-gradient-to-r from-transparent ${titleGradient.includes('cyan') ? 'via-cyan-500' : titleGradient.includes('red') ? 'via-red-500' : titleGradient.includes('green') ? 'via-green-500' : titleGradient.includes('purple') ? 'via-purple-500' : titleGradient.includes('amber') ? 'via-amber-500' : 'via-blue-500'} to-transparent mx-auto`} />
          {description && (
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">{description}</p>
          )}
        </div>
        <div className="space-y-8">{children}</div>
      </div>
    </section>
  )
}

function InfoCard({ title, children, accent = 'cyan' }: { title: string; children: React.ReactNode; accent?: string }) {
  const borderColor = accent === 'cyan' ? 'border-cyan-800/30' : accent === 'red' ? 'border-red-800/30' : accent === 'green' ? 'border-green-800/30' : accent === 'purple' ? 'border-purple-800/30' : accent === 'amber' ? 'border-amber-800/30' : 'border-blue-800/30'
  const titleColor = accent === 'cyan' ? 'text-cyan-400' : accent === 'red' ? 'text-red-400' : accent === 'green' ? 'text-green-400' : accent === 'purple' ? 'text-purple-400' : accent === 'amber' ? 'text-amber-400' : 'text-blue-400'
  return (
    <div className={`border ${borderColor} bg-white/[.02] backdrop-blur-sm rounded-lg p-6`}>
      <h3 className={`text-lg font-bold ${titleColor} mb-3`}>{title}</h3>
      <div className="text-gray-300 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start border border-cyan-900/30 bg-cyan-950/10 rounded-lg p-4">
      <span className="text-cyan-400 text-lg mt-px shrink-0">*</span>
      <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
    </div>
  )
}

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ScrollProgress />
      <Navigation />
      <ImageProtection />

      {/* ─── HERO ──────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-transparent to-transparent pointer-events-none" />
        <div className="scanlines absolute inset-0 pointer-events-none z-[3] opacity-40" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="section-tag">Handbook</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent mb-4">
            Player Guide
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Everything you need to survive the memories, master the dice, and uncover the truth — or bury it forever.
          </p>

          <div className="mt-10">
            <Placeholder label="SCREENSHOT: Title screen / character selection — showing the game's pixel art style and tone" />
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="max-w-3xl mx-auto mt-14 border border-white/[.06] bg-white/[.02] rounded-lg p-6" aria-label="Guide contents">
          <h2 className="text-sm tracking-[.2em] uppercase text-gray-500 mb-4">Contents</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { href: '#concept', label: '1. Core Concept' },
              { href: '#combat', label: '2. Combat' },
              { href: '#dice', label: '3. Dice & Quality' },
              { href: '#effects', label: '4. Status Effects' },
              { href: '#memory', label: '5. Memories & Cores' },
              { href: '#equipment', label: '6. Equipment' },
              { href: '#stats', label: '7. Stats & XP' },
              { href: '#strategies', label: '8. Strategies' },
              { href: '#controls', label: '9. Controls' },
              { href: '#tips', label: '10. Tips' },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors px-3 py-2 rounded hover:bg-white/[.03]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </section>

      <div className="section-divider" />

      {/* ─── 1. CORE CONCEPT ──────────────────── */}
      <GuideSection
        id="concept"
        tag="The Premise"
        tagColor="section-tag-blue"
        title="What is Remember to Die?"
        titleGradient="from-blue-400 via-cyan-300 to-blue-400"
        description="You play as an old man on his deathbed, reliving fragmented memories. Each memory is a dungeon, each dungeon a decade of life — and every battle forces you to confront what really happened."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Each Dungeon Contains" accent="blue">
            <ul className="space-y-2">
              <li><span className="text-blue-400 font-bold">3 Battles:</span> Grunt, Elite, then Boss — escalating difficulty</li>
              <li><span className="text-blue-400 font-bold">3 Memory Choices:</span> After each fight, pick a memory fragment — truth or lie?</li>
              <li><span className="text-blue-400 font-bold">1 Memory Core:</span> Your 3 choices combine into a core that permanently shapes your run</li>
            </ul>
          </InfoCard>
          <InfoCard title="Time is Everything" accent="blue">
            <p>Your <span className="text-cyan-400">lifespan</span> is your most precious resource. You start each run with a finite number of years. Every memory you collect costs time. Moving between decades costs time. When you hit zero — game over, no matter how healthy you are.</p>
            <p className="text-gray-500 text-xs mt-2">Some dice and items can restore years. Spend wisely.</p>
          </InfoCard>
        </div>

        <Placeholder label="SCREENSHOT: Dungeon overview / map screen — showing progression through memory stages" />
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 2. COMBAT ────────────────────────── */}
      <GuideSection
        id="combat"
        tag="Battle System"
        tagColor="section-tag-red"
        title="How Combat Works"
        titleGradient="from-red-400 via-orange-300 to-red-400"
        description="Simultaneous selection, priority-based resolution, and lethal pair-by-pair evaluation. Every choice matters."
      >
        <div className="space-y-4">
          <InfoCard title="Turn Flow" accent="red">
            <ol className="space-y-3 list-none">
              <li><span className="text-red-400 font-bold">1. Select —</span> Choose up to your active dice limit from your collection.</li>
              <li><span className="text-red-400 font-bold">2. Reveal —</span> Both you and the enemy reveal your dice simultaneously.</li>
              <li><span className="text-red-400 font-bold">3. Resolve —</span> Effects resolve by <span className="text-cyan-400">priority</span>: Defensive/Utility first, then Damage, then Status. Within the same priority, the first actor resolves first.</li>
              <li><span className="text-red-400 font-bold">4. Status Tick —</span> Ongoing effects (Poison, Bleed, Burn, Renew) tick at the end of the round.</li>
              <li><span className="text-red-400 font-bold">5. Lethal Check —</span> Death is evaluated <em>between each pair</em>, not just at end of round. Surviving each moment is critical.</li>
            </ol>
          </InfoCard>
        </div>

        <Placeholder label="SCREENSHOT: Active combat screen — showing dice selection, enemy portraits, HP bars, and floating combat text" />

        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Priority Order" accent="red">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-cyan-300">Priority 0</span><span>Divinity, Instant Death</span></div>
              <div className="flex justify-between"><span className="text-cyan-300">Priority 1</span><span>Shield, Heal, Renew, Reflect, Thorns</span></div>
              <div className="flex justify-between"><span className="text-cyan-300">Priority 2</span><span>Pierce, Defence</span></div>
              <div className="flex justify-between"><span className="text-cyan-300">Priority 3</span><span>Attack, Reduce Attack, Stagger</span></div>
              <div className="flex justify-between"><span className="text-cyan-300">Priority 4</span><span>Poison, Bleed, Burn, Cleanse, Pain</span></div>
            </div>
            <p className="text-gray-500 mt-3 text-xs">A Shield (P1) always resolves before an Attack (P3), regardless of who goes first.</p>
          </InfoCard>
          <InfoCard title="Weakness & Immunity" accent="red">
            <p><span className="text-yellow-400 font-bold">WEAK!</span> — gold burst over the portrait. The target takes <span className="text-yellow-300">double damage</span> from that status effect type.</p>
            <p className="mt-2"><span className="text-gray-400 font-bold">IMMUNE</span> — grey text. The target takes <span className="text-gray-400">no damage</span> from that effect. Applying it wastes the die.</p>
            <p className="mt-3 text-gray-500 text-xs">Check enemy tooltips before committing to a status-heavy strategy.</p>
          </InfoCard>
        </div>

        <Tip>In a contested pair where your Heal meets enemy Damage, the damage resolves first, then your heal applies. You need to survive the hit to benefit from the heal.</Tip>
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 3. DICE & QUALITY ────────────────── */}
      <GuideSection
        id="dice"
        tag="Arsenal"
        tagColor="section-tag-green"
        title="Dice & Quality"
        titleGradient="from-green-400 via-emerald-300 to-green-400"
        description="Your dice are your weapons, your shields, and your survival tools. Understanding them is the difference between life and death."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <InfoCard title="Attack Dice" accent="red">
            <div className="flex gap-3 mb-3">
              <DiceImage src="/dice/simple_d6_attack.png" alt="Attack Die" />
              <DiceImage src="/dice/razor_die.png" alt="Razor Die" />
              <DiceImage src="/dice/piercing_die.png" alt="Piercing Die" />
            </div>
            <p>Deal direct damage to enemies. Scales with <span className="text-red-400">Strength</span>.</p>
          </InfoCard>
          <InfoCard title="Defence Dice" accent="blue">
            <div className="flex gap-3 mb-3">
              <DiceImage src="/dice/simple_d6_defence.png" alt="Defence Die" />
              <DiceImage src="/dice/shield_die.png" alt="Shield Die" />
              <DiceImage src="/dice/iron_die.png" alt="Iron Die" />
            </div>
            <p>Provide shields and damage reduction. Scales with <span className="text-blue-400">Resilience</span>.</p>
          </InfoCard>
          <InfoCard title="Utility Dice" accent="green">
            <div className="flex gap-3 mb-3">
              <DiceImage src="/dice/heal_die.png" alt="Heal Die" />
              <DiceImage src="/dice/chrono_die.png" alt="Chrono Die" />
              <DiceImage src="/dice/stagger_die.png" alt="Stagger Die" />
            </div>
            <p>Healing, status manipulation, and rule-bending effects.</p>
          </InfoCard>
        </div>

        <InfoCard title="Quality System" accent="green">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-gray-400">Quality</th>
                  <th className="text-left py-2 pr-4 text-gray-400">Crit Threshold</th>
                  <th className="text-left py-2 text-gray-400">Potency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/[.04]">
                  <td className="py-2 pr-4 text-white font-medium">Basic <span className="text-gray-500">(white)</span></td>
                  <td className="py-2 pr-4">Standard</td>
                  <td className="py-2">Standard</td>
                </tr>
                <tr className="border-b border-white/[.04]">
                  <td className="py-2 pr-4 text-blue-400 font-medium">Refined <span className="text-gray-500">(blue)</span></td>
                  <td className="py-2 pr-4">-1 to crit threshold</td>
                  <td className="py-2">+10% potency</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-yellow-400 font-medium">Perfect <span className="text-gray-500">(gold)</span></td>
                  <td className="py-2 pr-4">-2 to crit threshold</td>
                  <td className="py-2">+25% potency</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-gray-500 text-xs">If a Basic die crits on 6, a Perfect version crits on 4, 5, or 6. Duplicates from boss rewards can upgrade quality.</p>
        </InfoCard>

        <Placeholder label="SCREENSHOT: Dice inventory screen — showing a collection of dice with different rarities and qualities" />
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 4. STATUS EFFECTS ────────────────── */}
      <GuideSection
        id="effects"
        tag="Effects"
        tagColor="section-tag-purple"
        title="Status Effects"
        titleGradient="from-purple-400 via-pink-300 to-purple-400"
        description="Damage over time, healing, shields, and control — understanding when effects tick and how they interact is essential."
      >
        <InfoCard title="Damage Over Time" accent="red">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <DiceImage src="/dice/poison_die.png" alt="Poison" size={36} />
              <div><span className="text-green-400 font-bold">Poison —</span> Damage at end of round. Bypasses defence. Scales with Insight. Stacks potency and duration.</div>
            </div>
            <div className="flex items-start gap-3">
              <DiceImage src="/dice/bleed_die.png" alt="Bleed" size={36} />
              <div><span className="text-red-400 font-bold">Bleed —</span> Damage at end of round. Cannot be blocked. Scales with Insight. Stacks potency and duration.</div>
            </div>
            <div className="flex items-start gap-3">
              <DiceImage src="/dice/burn_die.png" alt="Burn" size={36} />
              <div><span className="text-orange-400 font-bold">Burn —</span> Damage at end of round AND destroys existing enemy shields by its potency on application. Crucial counter to defensive enemies.</div>
            </div>
          </div>
        </InfoCard>

        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Defensive & Healing" accent="blue">
            <div className="space-y-3">
              <p><span className="text-blue-400 font-bold">Shield —</span> Absorbs damage before HP. Stacks. Expires on duration or depletion.</p>
              <p><span className="text-green-400 font-bold">Heal —</span> Instant HP restoration. In contested pairs vs damage, damage resolves first.</p>
              <p><span className="text-green-400 font-bold">Renew —</span> Heals at end of each round. Won't overheal past max HP.</p>
              <p><span className="text-purple-400 font-bold">Reflect —</span> Returns 100% of damage back to the attacker.</p>
              <p><span className="text-amber-400 font-bold">Thorns —</span> Flat damage redirected to the enemy from ALL damage sources — attacks, DoTs, even self-damage.</p>
            </div>
          </InfoCard>
          <InfoCard title="Control & Utility" accent="purple">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <DiceImage src="/dice/stagger_die.png" alt="Stagger" size={36} />
                <div><span className="text-yellow-400 font-bold">Stagger —</span> Skips the target's next turn. DoTs still tick on their skipped turn.</div>
              </div>
              <div className="flex items-start gap-3">
                <DiceImage src="/dice/cleanse_die.png" alt="Cleanse" size={36} />
                <div><span className="text-cyan-400 font-bold">Cleanse —</span> Removes one random negative effect. Instant.</div>
              </div>
              <div className="flex items-start gap-3">
                <DiceImage src="/dice/divinity_die.png" alt="Divinity" size={36} />
                <div><span className="text-white font-bold">Divinity —</span> Blocks all incoming negative effects while active. Does NOT remove existing ones.</div>
              </div>
              <div className="flex items-start gap-3">
                <DiceImage src="/dice/chrono_die.png" alt="Chrono" size={36} />
                <div><span className="text-cyan-400 font-bold">Chrono —</span> Restores +1 year to your lifespan. Time is life.</div>
              </div>
            </div>
          </InfoCard>
        </div>

        <Tip>All DoTs bypass shields and defence entirely. The only way to stop Poison, Bleed, and Burn damage is Cleanse or Divinity — or killing the enemy faster than it kills you.</Tip>

        <Placeholder label="SCREENSHOT: Combat with multiple active status effects — showing icons with potency/duration numbers above portraits" />
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 5. MEMORY SYSTEM ─────────────────── */}
      <GuideSection
        id="memory"
        tag="Narrative"
        tagColor="section-tag-blue"
        title="Memories & Cores"
        titleGradient="from-blue-400 via-cyan-300 to-blue-400"
        description="After each battle, choose between truth and lies. Your choices define not just the story — but your power."
      >
        <InfoCard title="Memory Fragments" accent="blue">
          <p>After each of the 3 battles in a dungeon, you choose between two memory fragments. Some reveal painful truths. Others offer comforting lies. You won't always know which is which — that's the point.</p>
          <p className="mt-2">Each fragment costs <span className="text-cyan-400">2 years</span> of your lifespan. Some items reduce this cost.</p>
        </InfoCard>

        <InfoCard title="Memory Core Types" accent="cyan">
          <p className="mb-3">In the transition area between decades (The Seam), your 3 fragments combine into a Core. The type depends on how many were True vs False:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-gray-400">Core</th>
                  <th className="text-left py-2 pr-4 text-gray-400">Fragments</th>
                  <th className="text-left py-2 text-gray-400">Permanent Bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/[.04]">
                  <td className="py-2 pr-4 text-cyan-400 font-medium">Pure</td>
                  <td className="py-2 pr-4">3 True</td>
                  <td className="py-2">+10% healing</td>
                </tr>
                <tr className="border-b border-white/[.04]">
                  <td className="py-2 pr-4 text-purple-400 font-medium">Tainted</td>
                  <td className="py-2 pr-4">2 True, 1 False</td>
                  <td className="py-2">+10% Insight</td>
                </tr>
                <tr className="border-b border-white/[.04]">
                  <td className="py-2 pr-4 text-blue-400 font-medium">Broken</td>
                  <td className="py-2 pr-4">1 True, 2 False</td>
                  <td className="py-2">+10% Resilience</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-red-400 font-medium">Corrupt</td>
                  <td className="py-2 pr-4">3 False</td>
                  <td className="py-2">+10% Strength</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-gray-500 text-xs">Bonuses stack across dungeons. 3 Corrupt Cores = +30% Strength. Each core also has a 20% chance to permanently unlock an additional combat dice slot (up to 5 total).</p>
        </InfoCard>

        <Placeholder label="SCREENSHOT: The Seam / memory core crafting screen — showing fragment combination and core result" />

        <Tip>Your core choices also shape a hidden alignment that affects how bosses fight you later. There are consequences to every pattern of truth and lies.</Tip>
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 6. EQUIPMENT ─────────────────────── */}
      <GuideSection
        id="equipment"
        tag="Gear"
        tagColor="section-tag-amber"
        title="Mementos & Watches"
        titleGradient="from-amber-400 via-yellow-300 to-amber-400"
        description="Passive items that bend the rules in your favour. Collect up to 5 mementos and equip watches that control time itself."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Mementos" accent="amber">
            <p>Passive items providing combat bonuses, stat boosts, and unique mechanics. Acquired from memory cores and boss rewards.</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              <DiceImage src="/mementos/broken_toy.png" alt="Broken Toy" size={40} />
              <DiceImage src="/mementos/black_eyeliner.png" alt="Black Eyeliner" size={40} />
              <DiceImage src="/mementos/ball_gag.png" alt="Ball Gag" size={40} />
              <DiceImage src="/mementos/baby_monitor.png" alt="Baby Monitor" size={40} />
              <DiceImage src="/mementos/communion_wafer.png" alt="Communion Wafer" size={40} />
            </div>
            <p className="mt-3 text-gray-500 text-xs">You can hold up to 5 mementos at once. Some trigger conditionally — on crit, on low HP, or at combat start.</p>
          </InfoCard>
          <InfoCard title="Watches" accent="amber">
            <p>Unique timepieces that govern lifespan, fragment costs, and narrative benefits. Each watch has a distinct effect on your run's tempo and economy.</p>
            <div className="mt-3">
              <Placeholder label="IMAGE: 3-4 watch item sprites in a row" aspect="wide" />
            </div>
            <p className="mt-3 text-gray-500 text-xs">Fragment cost reducers are always percentages (5%–50%). Some watches provide Fragment Skip charges that waive the full cost.</p>
          </InfoCard>
        </div>

        <InfoCard title="Boss Dice Rewards" accent="amber">
          <p>New dice are <span className="text-amber-400">exclusively earned from boss victories</span>. After each boss, you're offered a choice of dice. If you pick one you already own, it has a chance to upgrade in quality:</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>Owned at <span className="text-white">Basic</span> → 50% chance to upgrade to <span className="text-blue-400">Refined</span></li>
            <li>Owned at <span className="text-blue-400">Refined</span> → 50% chance to upgrade to <span className="text-yellow-400">Perfect</span></li>
            <li>Owned at <span className="text-yellow-400">Perfect</span> → Already max quality</li>
          </ul>
        </InfoCard>
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 7. STATS & XP ────────────────────── */}
      <GuideSection
        id="stats"
        tag="Progression"
        tagColor="section-tag-green"
        title="Stats & Experience"
        titleGradient="from-green-400 via-emerald-300 to-green-400"
        description="Defeat enemies to earn XP, then invest it into the stats that match your playstyle."
      >
        <InfoCard title="Core Stats" accent="green">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-gray-400">Stat</th>
                  <th className="text-left py-2 pr-4 text-gray-400">Effect</th>
                  <th className="text-left py-2 text-gray-400">Scales</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/[.04]">
                  <td className="py-2 pr-4 text-red-400 font-medium">Strength</td>
                  <td className="py-2 pr-4">Increases direct damage from attack dice</td>
                  <td className="py-2">Attack, Pierce</td>
                </tr>
                <tr className="border-b border-white/[.04]">
                  <td className="py-2 pr-4 text-blue-400 font-medium">Resilience</td>
                  <td className="py-2 pr-4">Increases healing, shields, and defence</td>
                  <td className="py-2">Shield, Heal, Renew, Defence</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-purple-400 font-medium">Insight</td>
                  <td className="py-2 pr-4">Increases status effect damage</td>
                  <td className="py-2">Poison, Bleed, Burn</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-gray-500 text-xs">Each stat point costs 30 XP. Each point gives +1 to relevant effects. Core bonuses multiply your base stats.</p>
        </InfoCard>

        <Placeholder label="SCREENSHOT: Post-battle XP spending screen — showing stat allocation choices" />
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 8. ADVANCED STRATEGIES ───────────── */}
      <GuideSection
        id="strategies"
        tag="Mastery"
        tagColor="section-tag-red"
        title="Advanced Strategies"
        titleGradient="from-red-400 via-orange-300 to-red-400"
        description="Once you know the basics, these build archetypes and dice combos will push your runs further."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <InfoCard title="The Aggressor" accent="red">
            <p>Stack <span className="text-red-400">Strength</span>. Use Attack and Pierce dice. End fights in 1-2 rounds before DoTs overwhelm you. Pair with <span className="text-red-400">Corrupt Cores</span>.</p>
          </InfoCard>
          <InfoCard title="The Survivor" accent="blue">
            <p>Stack <span className="text-blue-400">Resilience</span>. Use Shields, Defence, Renew, and Thorns. Let enemies damage themselves against your defences. Pair with <span className="text-blue-400">Broken</span> or <span className="text-cyan-400">Pure Cores</span>.</p>
          </InfoCard>
          <InfoCard title="Status Master" accent="purple">
            <p>Stack <span className="text-purple-400">Insight</span>. Layer Poison, Bleed, and Burn. Use Stagger to stall while DoTs tick. Pair with <span className="text-purple-400">Tainted Cores</span>.</p>
          </InfoCard>
        </div>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Signature Combos</h3>

        <div className="space-y-4">
          <InfoCard title="The Masochist Loop" accent="red">
            <div className="flex gap-3 mb-3">
              <DiceImage src="/dice/pain_die.png" alt="Pain Die" size={40} />
              <DiceImage src="/dice/divinity_die.png" alt="Divinity Die" size={40} />
              <DiceImage src="/dice/cleanse_die.png" alt="Cleanse Die" size={40} />
            </div>
            <p>The <span className="text-red-400">Pain Die</span> applies a DoT to yourself while granting a massive +Strength buff. Roll a <span className="text-white">Divinity</span> or <span className="text-cyan-400">Cleanse</span> alongside it to keep the buff and negate the self-damage.</p>
            <p className="text-gray-500 text-xs mt-2">Certain mementos can convert self-damage into healing or reflect it onto enemies, turning the loop into a devastating engine.</p>
          </InfoCard>

          <InfoCard title="Absolute Zero Defence" accent="blue">
            <div className="flex gap-3 mb-3">
              <DiceImage src="/dice/knockback_die.png" alt="Knockback Die" size={40} />
              <DiceImage src="/dice/thorn_die.png" alt="Thorn Die" size={40} />
            </div>
            <p>The <span className="text-blue-400">Knockback Die</span> reduces the enemy's attack. <span className="text-amber-400">Thorns</span> deals flat damage back. If you reduce their attack to 0, they still trigger your Thorns while dealing nothing to you.</p>
          </InfoCard>

          <InfoCard title="Glass Cannon" accent="red">
            <div className="flex gap-3 mb-3">
              <DiceImage src="/dice/burn_die.png" alt="Burn Die" size={40} />
              <DiceImage src="/dice/piercing_die.png" alt="Piercing Die" size={40} />
            </div>
            <p><span className="text-orange-400">Burn</span> destroys enemy shields. <span className="text-red-400">Pierce</span> ignores armour and shields entirely. Against defensive enemies, combine both to render their protection meaningless.</p>
          </InfoCard>

          <InfoCard title="Stagger Extension" accent="purple">
            <div className="flex gap-3 mb-3">
              <DiceImage src="/dice/stagger_die.png" alt="Stagger Die" size={40} />
              <DiceImage src="/dice/poison_die.png" alt="Poison Die" size={40} />
              <DiceImage src="/dice/bleed_die.png" alt="Bleed Die" size={40} />
            </div>
            <p><span className="text-yellow-400">Stagger</span> skips the enemy's turn, but their DoTs still tick. Stack Poison and Bleed to absurd heights while the enemy is stunned and helpless.</p>
          </InfoCard>

          <InfoCard title="Death Roulette" accent="red">
            <div className="flex gap-3 mb-3">
              <DiceImage src="/dice/death_die.png" alt="Death Die" size={40} />
              <DiceImage src="/dice/reflect_die.png" alt="Reflect Die" size={40} />
            </div>
            <p>The <span className="text-red-400">Death Die</span> can instantly kill you. But with <span className="text-purple-400">Reflect</span> active, the instant death bounces back onto the enemy instead — turning maximum risk into an automatic win.</p>
            <p className="text-gray-500 text-xs mt-2">Certain mementos can give you a safety net if the roulette goes wrong.</p>
          </InfoCard>
        </div>
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 9. CONTROLS ──────────────────────── */}
      <GuideSection
        id="controls"
        tag="Input"
        tagColor=""
        title="Controls"
        titleGradient="from-gray-300 via-white to-gray-300"
        description="Fully playable with keyboard, gamepad, or Steam Deck. No mouse required."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Keyboard" accent="cyan">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Confirm</span><span>Space / Enter</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Back / Pause</span><span>Esc</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Dice Slots 1–5</span><span>Q W E R T</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Inventory</span><span>I</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Memories</span><span>L</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Character</span><span>C</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Achievements</span><span>A</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Music Player</span><span>P / M</span></div>
              <div className="flex justify-between py-1"><span className="text-gray-400">Help Overlay</span><span>H</span></div>
            </div>
          </InfoCard>
          <InfoCard title="Gamepad / Steam Deck" accent="cyan">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Confirm</span><span>A (South)</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Back / Cancel</span><span>B (East)</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Memories</span><span>X (West)</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Inventory</span><span>Y (North)</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Tab Left / Right</span><span>LB / RB</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Pause</span><span>Start / Menu</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Music Player</span><span>View / R5</span></div>
              <div className="flex justify-between border-b border-white/[.04] py-1"><span className="text-gray-400">Character</span><span>R3 Click</span></div>
              <div className="flex justify-between py-1"><span className="text-gray-400">Help Overlay</span><span>R4 Paddle</span></div>
            </div>
          </InfoCard>
        </div>

        <InfoCard title="Accessibility" accent="cyan">
          <ul className="space-y-1">
            <li><span className="text-cyan-400">Combat Log Text Scale</span> — configurable separately from global text scale, great for Steam Deck</li>
            <li><span className="text-cyan-400">Reduced Motion</span> — respects system and in-game preferences</li>
            <li><span className="text-cyan-400">Colorblind-safe Palette</span> — optional combat color scheme for status categories</li>
            <li><span className="text-cyan-400">Effects Intensity</span> — scales animation strength without disabling them</li>
          </ul>
        </InfoCard>
      </GuideSection>

      <div className="section-divider" />

      {/* ─── 10. TIPS ─────────────────────────── */}
      <GuideSection
        id="tips"
        tag="Wisdom"
        tagColor="section-tag-amber"
        title="Tips for Survival"
        titleGradient="from-amber-400 via-yellow-300 to-amber-400"
      >
        <div className="space-y-3">
          <Tip>Watch effect priorities. A well-timed Shield always resolves before a strong Attack — regardless of who goes first.</Tip>
          <Tip>Balance truth and lies strategically. Different core types suit different builds. Stacking the same type is powerful — 3 Corrupt Cores gives +30% Strength.</Tip>
          <Tip>Manage lifespan aggressively. Pursuing every fragment will drain your years. Sometimes skipping a memory is the wisest choice.</Tip>
          <Tip>Cleanse is clutch. A single Cleanse die can remove a lethal Poison stack. Always consider carrying one as insurance.</Tip>
          <Tip>Perfect quality dice crit far more often. Duplicates from boss rewards aren't wasted — they upgrade quality.</Tip>
          <Tip>Read enemy tooltips before each fight. Building a full Poison strategy against an immune enemy wastes your dice and your life.</Tip>
          <Tip>Burn destroys shields. If an enemy is stacking massive shields, one Burn die can dissolve them instantly — opening the door for your attacks.</Tip>
          <Tip>Selection order matters. Effects resolve left-to-right within the same priority. Place your Shield before your Attack if both are priority-tied.</Tip>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm tracking-wide">Good luck, and may your dice roll in your favour.</p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-block text-sm text-cyan-400 border border-cyan-800/40 px-6 py-3 rounded-lg hover:bg-cyan-950/20 transition-all duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </GuideSection>

      {/* ─── FOOTER ───────────────────────────── */}
      <footer className="relative py-12 px-4 border-t border-white/[0.04]" role="contentinfo">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-gray-600 text-xs tracking-wide">
            © 2024 <span className="text-gray-400">Skipstone Studios</span>. Remember to Die — Tactical Dice Combat Roguelike.
          </p>
        </div>
      </footer>
    </main>
  )
}

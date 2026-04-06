'use client'

import { motion } from 'framer-motion'

const tracks = [
  {
    num:   'TRACK 01',
    title: 'TACTICAL DICE COMBAT',
    body:  'Strategic dice-based battles with endless depth.',
  },
  {
    num:   'TRACK 02',
    title: 'MEMORY FRAGMENTS',
    body:  'Unlock haunting memories that shape your destiny.',
  },
  {
    num:   'TRACK 03',
    title: 'INFINITE REPLAYABILITY',
    body:  'Every run tells a different story.',
  },
]

export default function FeatureCallouts() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.14 } },
      }}
    >
      {tracks.map((t) => (
        <motion.div
          key={t.num}
          className="vhs-callout"
          variants={{
            hidden:  { opacity: 0, y: 36 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          <span className="vhs-callout__num">{t.num}</span>
          <span className="vhs-callout__title">{t.title}</span>
          <span className="vhs-callout__body">{t.body}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

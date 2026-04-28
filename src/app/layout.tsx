import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Remember to Die – Tactical Dice Combat Roguelike | Skipstone Studios',
  description: 'A gritty tactical dice combat roguelike where every roll dredges up fragmented memories.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

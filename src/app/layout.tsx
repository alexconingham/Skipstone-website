import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Remember to Die - Tactical Dice Combat Game',
  description: 'A haunting dice-based tactical combat game set in a mysterious school environment. Master strategic dice mechanics and survive against terrifying enemies.',
  keywords: ['indie game', 'tactical combat', 'dice game', 'strategy', 'horror', 'pixel art'],
  authors: [{ name: 'Skipstone Games' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Remember to Die - Tactical Dice Combat Game',
    description: 'A haunting dice-based tactical combat game set in a mysterious school environment.',
    type: 'website',
    images: [
      {
        url: '/title_logo.png',
        width: 1200,
        height: 630,
        alt: 'Remember to Die - Game Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remember to Die - Tactical Dice Combat Game',
    description: 'A haunting dice-based tactical combat game set in a mysterious school environment.',
    images: ['/title_logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
} 
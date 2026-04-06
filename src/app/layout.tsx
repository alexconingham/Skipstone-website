import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { getBaseUrl } from '@/utils/config'
import './globals.css'

export const metadata: Metadata = {
  title: 'Remember to Die – Tactical Dice Combat Roguelike | Skipstone Studios',
  description: 'A gritty tactical dice combat roguelike where every roll dredges up fragmented memories. Collect mementos, battle demons, and reroll your destiny in this haunting indie game by Skipstone Studios.',
  keywords: [
    'indie game', 'tactical combat', 'dice game', 'strategy', 'horror', 'pixel art', 
    'roguelike', 'remember to die', 'skipstone studios', 'turn based combat',
    'narrative driven', 'steam game', 'indie developer', 'gaming', 'rpg elements',
    'deck building', 'combat mechanics', 'story driven game', 'atmospheric game'
  ],
  authors: [{ name: 'Skipstone Studios', url: 'https://skipstone.co.nz' }],
  creator: 'Skipstone Studios',
  publisher: 'Skipstone Studios',
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Remember to Die – Tactical Dice Combat Roguelike | Skipstone Studios',
    description: 'Experience Remember to Die - a gritty tactical dice combat roguelike where every roll dredges up fragmented memories. Battle demons, collect mementos, and reroll your destiny.',
    url: getBaseUrl(),
    siteName: 'Skipstone Studios',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Remember to Die - Tactical Dice Combat Roguelike by Skipstone Studios',
        type: 'image/png',
      },
      {
        url: '/title_logo.png',
        width: 384,
        height: 200,
        alt: 'Remember to Die Game Logo',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
    countryName: 'New Zealand',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remember to Die – Tactical Dice Combat Roguelike',
    description: 'A gritty tactical dice combat roguelike where every roll dredges up fragmented memories. Coming soon to Steam.',
    images: ['/og-image.png'],
    creator: '@SkipstoneStudios',
    site: '@SkipstoneStudios',
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'gaming',
  classification: 'Video Game',
  icons: {
    icon: [
      { url: '/dice/bleed_die.png', type: 'image/png' },
      { url: '/dice/bleed_die.png', type: 'image/png', sizes: '32x32' },
      { url: '/dice/bleed_die.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/dice/bleed_die.png', type: 'image/png' },
    ],
  },
  other: {
    'application-name': 'Remember to Die',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'steam-app': 'coming-soon',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = getBaseUrl()
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoGame',
        '@id': `${baseUrl}/#game`,
        name: 'Remember to Die',
        alternateName: 'Remember to Die - Tactical Dice Combat Roguelike',
        description: 'A gritty tactical dice combat roguelike where every roll dredges up fragmented memories. Collect mementos, battle demons, and reroll your destiny.',
        url: baseUrl,
        image: `${baseUrl}/og-image.png`,
        genre: ['Roguelike', 'Strategy', 'Tactical Combat', 'Horror', 'Indie'],
        gamePlatform: ['Steam', 'PC'],
        applicationCategory: 'Game',
        operatingSystem: 'Windows',
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/PreOrder',
          price: 'TBD',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Organization',
          '@id': 'https://skipstone.co.nz/#organization',
          name: 'Skipstone Studios',
          url: 'https://skipstone.co.nz',
          logo: 'https://skipstone.co.nz/Skipstone_logo.png',
          sameAs: [
            'https://twitter.com/SkipstoneStudios',
            'https://steamcommunity.com/id/skipstone',
          ],
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://skipstone.co.nz/#organization',
        },
        datePublished: '2024-12-19',
        inLanguage: 'en-US',
        keywords: 'indie game, tactical combat, dice game, roguelike, strategy, horror, pixel art',
      },
      {
        '@type': 'Organization',
        '@id': 'https://skipstone.co.nz/#organization',
        name: 'Skipstone Studios',
        url: 'https://skipstone.co.nz',
        logo: {
          '@type': 'ImageObject',
          url: 'https://skipstone.co.nz/Skipstone_logo.png',
          width: 800,
          height: 128,
        },
        description: 'Indie game development studio creating atmospheric and narrative-driven games.',
        foundingDate: '2024',
        founders: {
          '@type': 'Person',
          name: 'Skipstone Studios Team',
        },
        areaServed: 'Worldwide',
        sameAs: [
          'https://twitter.com/SkipstoneStudios',
          'https://steamcommunity.com/id/skipstone',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Remember to Die - Skipstone Studios',
        description: 'Official website for Remember to Die - a tactical dice combat roguelike by Skipstone Studios',
        inLanguage: 'en-US',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://skipstone.co.nz/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/?s={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#webpage`,
        url: baseUrl,
        name: 'Remember to Die - Tactical Dice Combat Roguelike | Skipstone Studios',
        description: 'Experience Remember to Die - a gritty tactical dice combat roguelike where every roll dredges up fragmented memories.',
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
        datePublished: '2024-12-19',
        dateModified: '2024-12-19',
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Font preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Theme and app configuration */}
        <meta name="theme-color" content="#0e0c0c" />
        <meta name="color-scheme" content="dark" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Apple-specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Remember to Die" />
        
        {/* Microsoft-specific meta tags */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Favicons and app icons */}
        <link rel="icon" href="/dice/bleed_die.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/dice/bleed_die.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/dice/bleed_die.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`${baseUrl}/`} />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Geographic targeting */}
        <meta name="geo.region" content="NZ" />
        <meta name="geo.country" content="New Zealand" />
        
        {/* Content classification */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="audience" content="all" />
        
        {/* Social media optimization */}
        <meta property="og:locale:alternate" content="en_GB" />
        <meta property="og:locale:alternate" content="en_AU" />
        <meta property="og:locale:alternate" content="en_CA" />
        
        {/* Steam integration hints */}
        <meta name="steam:app_id" content="coming_soon" />
        <meta name="game:platform" content="PC" />
        <meta name="game:genre" content="Strategy" />
        <meta name="game:genre" content="Roguelike" />
      </head>
      <body className="bg-[#080808] text-[#e8e8e8] antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
} 
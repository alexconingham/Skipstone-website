/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':    '#080808',
        'bg-panel':   '#0f0f0f',
        'phosphor':   '#00ff41',
        'vhs-cyan':   '#00e5ff',
        'vhs-mag':    '#ff00ff',
        'vhs-yellow': '#ffee00',
        'vhs-red':    '#ff2200',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'Impact', 'sans-serif'],
        mono:    ['var(--font-mono)',    'VT323',      'Courier New', 'monospace'],
      },
      animation: {
        'scroll-left':  'scroll-left 40s linear infinite',
        'scroll-right': 'scroll-right 35s linear infinite',
        'fade-in':      'fadeIn 0.6s ease-in-out',
        'slide-up':     'slideUp 0.5s ease-out',
        'float-gentle': 'float-gentle 8s ease-in-out infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'scroll-right': {
          '0%':   { transform: 'translateX(-33.333%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}

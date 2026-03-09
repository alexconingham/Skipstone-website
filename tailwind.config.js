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
        // Atmospheric noir palette
        'base':       '#0e0c0c',
        'panel':      '#1a1614',
        'lift':       '#241e1c',
        'amber':      '#c4a35a',
        'amber-dim':  '#8a6f3a',
        'sepia':      '#8b7355',
        'blood':      '#7a1c1c',
        'text-warm':  '#e8dcc8',
        'text-mid':   '#c9b99a',
        'text-muted': '#7a6a58',
        'text-ghost': '#4a3e35',
        // Keep legacy
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        body:    ['var(--font-body)',    'Lora',             'Georgia', 'serif'],
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

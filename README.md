# Remember to Die - Website

A modern, professional landing page for the indie game "Remember to Die" - a dice-based tactical combat game set in a haunting school environment.

## 🎮 About the Game

Remember to Die is an atmospheric tactical combat game where players master strategic dice mechanics to survive against terrifying enemies in a mysterious school setting. The game features:

- **Tactical Dice Combat**: Strategic gameplay with diverse magical dice
- **Haunting Environments**: Explore eerie school locations
- **Terrifying Adversaries**: Face corrupted staff and fellow students
- **Powerful Mementos**: Collect artifacts with game-changing effects

## 🚀 Live Demo

Visit the live website: [Remember to Die](https://your-deployment-url.vercel.app)

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.3 with TypeScript
- **Styling**: Tailwind CSS
- **Development**: Turbopack for fast builds
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
remember-to-die/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main landing page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles & animations
│   └── components/
│       ├── AudioPlayer.tsx       # Background music player
│       └── ImageGallery.tsx      # Scrolling asset galleries
├── public/
│   ├── backgrounds/              # Environment images
│   ├── portraits/                # Enemy character images
│   ├── dice/                     # Dice asset images
│   ├── mementos/                 # Memento item images
│   ├── audio/                    # Background music
│   ├── title_logo.png           # Game logo
│   ├── steam.png                # Steam button
│   └── Skipstone_logo.png       # Studio logo
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd remember-to-die
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Features

### Interactive Asset Galleries
- **Dungeons**: Haunting school environments with horizontal scrolling
- **Enemies**: Character portraits of adversaries 
- **Dice**: Strategic dice collection with larger display
- **Mementos**: Collectible artifacts and items

### Audio Experience
- Background music player with volume controls
- Glassmorphism design with modern UI
- Play/pause, progress scrubbing, and volume adjustment

### Responsive Design
- Mobile-first approach
- Smooth animations and hover effects
- Gradient text effects and professional typography
- Dark atmospheric theme

### Performance Optimizations
- Next.js Image optimization
- Turbopack for fast development builds
- Lazy loading and efficient animations
- SEO-optimized metadata

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Alternative Deployments

- **Netlify**: Connect GitHub repo for automatic deploys
- **GitHub Pages**: Use `next export` for static deployment

## 🎵 Audio Setup

Place background music file at `public/audio/background.mp3`. Supported formats:
- MP3 (recommended)
- WAV
- OGG

## 🖼 Asset Management

### Image Requirements

- **Backgrounds**: PNG format, 16:9 aspect ratio recommended
- **Portraits**: PNG with transparency, square aspect ratio
- **Dice**: PNG with transparency, square format
- **Mementos**: PNG with transparency, small square format

### Adding New Assets

#### Background Images

Background images are stored in `assets/images/backgrounds/` and automatically copied to `public/backgrounds/` during build:

1. Place new background images in `assets/images/backgrounds/main/`, `assets/images/backgrounds/alternate/`, or `assets/images/backgrounds/screens/`
2. Run `npm run copy:backgrounds` to copy images to `public/backgrounds/` (or it will run automatically during `npm run build`)
3. Update the `gameAssets.dungeons` array in `src/app/page.tsx` to include new backgrounds
4. Commit both the source images in `assets/` and the copied images in `public/backgrounds/`

The copy script automatically runs before builds via the `prebuild` hook, ensuring images are always synced during deployment.

#### Other Assets

1. Place images directly in appropriate `public/` subdirectory
2. Update the corresponding data structure in `src/app/page.tsx` (e.g., `gameAssets.enemies`, `gameAssets.dice`, etc.)
3. Follow the naming convention: `{category}_{name}.{ext}`

## 🎨 Customization

### Color Schemes

The design uses gradient text effects with themed colors:
- **Dungeons**: Blue to Cyan (`from-blue-400 to-cyan-400`)
- **Enemies**: Red to Orange (`from-red-400 to-orange-400`) 
- **Dice**: Green to Emerald (`from-green-400 to-emerald-400`)
- **Mementos**: Purple to Pink (`from-purple-400 to-pink-400`)

### Animation Speed

Modify scroll speeds in `src/app/globals.css`:
```css
.gallery-scroll-left {
  animation: scroll-left 30s linear infinite;
}
```

## 📄 License

© 2024 Skipstone Games. All rights reserved.

## 🤝 Contributing

This is a proprietary project for Skipstone Games. For questions or suggestions, please contact the development team.

---

**Built with ❤️ for the Remember to Die community** 
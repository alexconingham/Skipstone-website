/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // replaces the removed `next export` command
  distDir: 'docs',    // export directly to docs/ (GitHub Pages source)

  images: {
    unoptimized: true, // required for static export (no Next.js server at runtime)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // headers() only applies to a running Next.js server, not static exports —
  // cache headers for images are handled by GitHub Pages / CDN instead
}

module.exports = nextConfig

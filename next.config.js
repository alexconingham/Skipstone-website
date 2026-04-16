const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid resolving the repo from a parent lockfile (e.g. C:\Users\...\package-lock.json),
  // which breaks paths like content/blog and yields an empty devlog.
  turbopack: {
    root: __dirname,
  },
  env: {
    BLOG_CONTENT_ROOT: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig

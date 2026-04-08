#!/usr/bin/env node
/**
 * Blog import script — converts .docx files in content/staging/ to
 * Markdown files in content/blog/.
 *
 * Usage: npm run blog:import
 *
 * Each .docx file becomes one blog post. The script extracts:
 *   - First H1  → title (falls back to filename)
 *   - First paragraph after the heading → excerpt
 *   - Filename (slugified) → slug
 *   - Today's date → date (edit in the generated .md if you want a different date)
 */

import mammoth from 'mammoth'
import TurndownService from 'turndown'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const STAGING   = path.join(ROOT, 'content', 'staging')
const BLOG      = path.join(ROOT, 'content', 'blog')

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' })

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function today() {
  return new Date().toISOString().split('T')[0]
}

/** Extract title and excerpt from the converted markdown */
function extractMeta(markdown, fallbackSlug) {
  const lines  = markdown.split('\n').filter(l => l.trim())
  let title    = fallbackSlug
  let excerpt  = ''
  let bodyStart = 0

  // Find first H1
  const h1 = lines.findIndex(l => /^#\s/.test(l))
  if (h1 !== -1) {
    title     = lines[h1].replace(/^#+\s*/, '').trim()
    bodyStart = h1 + 1
  }

  // First non-empty paragraph after the heading becomes excerpt
  for (let i = bodyStart; i < lines.length; i++) {
    const l = lines[i].trim()
    if (l && !l.startsWith('#')) {
      // strip markdown emphasis for cleaner excerpt
      excerpt = l.replace(/[*_`]/g, '').substring(0, 280)
      bodyStart = i
      break
    }
  }

  // Body = everything after the title heading (keep excerpt paragraph in body)
  const body = lines.slice(h1 !== -1 ? h1 + 1 : 0).join('\n')

  return { title, excerpt, body }
}

async function convertDocx(docxPath) {
  const filename = path.basename(docxPath, '.docx')
  const slug     = slugify(filename)

  const result = await mammoth.convertToHtml({ path: docxPath })
  if (result.messages.length) {
    result.messages.forEach(m => console.warn(`  ⚠  ${m.message}`))
  }

  const markdown         = td.turndown(result.value)
  const { title, excerpt, body } = extractMeta(markdown, slug)

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `slug: ${slug}`,
    `date: ${today()}`,
    `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
    `cover:`,   // fill in manually if you have a cover image path
    '---',
    '',
  ].join('\n')

  const outPath = path.join(BLOG, `${slug}.md`)
  fs.writeFileSync(outPath, frontmatter + body)
  console.log(`  ✓  ${filename}.docx  →  content/blog/${slug}.md`)
  return outPath
}

// ── Main ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(STAGING)) fs.mkdirSync(STAGING, { recursive: true })
if (!fs.existsSync(BLOG))    fs.mkdirSync(BLOG,    { recursive: true })

const docxFiles = fs.readdirSync(STAGING).filter(f => f.endsWith('.docx'))

if (docxFiles.length === 0) {
  console.log('No .docx files found in content/staging/ — nothing to import.')
  process.exit(0)
}

console.log(`\nImporting ${docxFiles.length} file(s)...\n`)

for (const file of docxFiles) {
  try {
    await convertDocx(path.join(STAGING, file))
  } catch (err) {
    console.error(`  ✗  Failed to convert ${file}:`, err.message)
  }
}

console.log(`\nDone. Review the files in content/blog/, then git push to publish.\n`)
console.log('Tip: edit the date: and excerpt: fields in each .md if needed.')
console.log('Tip: add a cover: /path/to/image.jpg to show a cover image.\n')

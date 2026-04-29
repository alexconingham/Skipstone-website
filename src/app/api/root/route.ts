import { readFileSync } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const htmlPath = path.join(process.cwd(), 'public', 'index.html')
    const html = readFileSync(htmlPath, 'utf-8')
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, must-revalidate',
      },
    })
  } catch (error) {
    return new Response('Not found', { status: 404 })
  }
}

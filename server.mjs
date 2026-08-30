// Zero-dependency production server: serves the built ./dist folder.
// Usage: npm run build && npm start   (PORT env var supported)
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('./dist/', import.meta.url))
const PORT = process.env.PORT || 3000
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
}

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (p.endsWith('/')) p += 'index.html'
    let file = join(DIST, normalize(p).replace(/^(\.\.[/\\])+/, ''))
    let data
    try {
      data = await readFile(file)
    } catch {
      file = join(DIST, 'index.html') // SPA fallback
      data = await readFile(file)
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(500)
    res.end('server error')
  }
}).listen(PORT, () => {
  console.log(`Colorway Studio running at http://localhost:${PORT}`)
})

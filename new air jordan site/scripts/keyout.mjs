// One-time asset prep: the source photos sit on solid black. This floods the
// background from the image borders (pure-black-tolerant), makes it transparent
// and feathers the boundary, so the shoes can sit on the colored poster gradients.
// Run once: npm run keyout  ->  writes into public/assets/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SRC = path.join(root, 'assets')
const OUT = path.join(root, 'public', 'assets')
fs.mkdirSync(OUT, { recursive: true })

const TOL = 26 // max channel value still connectable as background
const FEATHER = 64 // luminance ramp for pixels touching the background

// The source files are JPEGs wearing a .png extension — decode whatever they are.
function loadImage(file) {
  const buf = fs.readFileSync(file)
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8
  if (isJpeg) {
    const img = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true })
    return { width: img.width, height: img.height, data: Buffer.from(img.data) }
  }
  return PNG.sync.read(buf)
}

function keyout(srcName, outName) {
  const img = loadImage(path.join(SRC, srcName))
  const { width: w, height: h } = img
  const d = Buffer.from(img.data)
  const lum = (p) => Math.max(d[p * 4], d[p * 4 + 1], d[p * 4 + 2])
  const bg = new Uint8Array(w * h)
  const stack = []
  const push = (p) => {
    if (!bg[p] && lum(p) < TOL) stack.push(p)
  }
  for (let x = 0; x < w; x++) {
    push(x)
    push((h - 1) * w + x)
  }
  for (let y = 0; y < h; y++) {
    push(y * w)
    push(y * w + w - 1)
  }
  while (stack.length) {
    const p = stack.pop()
    if (bg[p]) continue
    bg[p] = 1
    d[p * 4 + 3] = 0
    const x = p % w
    if (x > 0) push(p - 1)
    if (x < w - 1) push(p + 1)
    if (p >= w) push(p - w)
    if (p < w * (h - 1)) push(p + w)
  }
  // soften the 1px halo where the shoe meets the removed background
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x
      if (bg[p]) continue
      const touches =
        (x > 0 && bg[p - 1]) ||
        (x < w - 1 && bg[p + 1]) ||
        (y > 0 && bg[p - w]) ||
        (y < h - 1 && bg[p + w])
      if (!touches) continue
      const l = lum(p)
      if (l < FEATHER) d[p * 4 + 3] = Math.round((255 * Math.max(0, l - 8)) / (FEATHER - 8))
    }
  }
  const out = new PNG({ width: w, height: h })
  out.data = d
  fs.writeFileSync(path.join(OUT, outName), PNG.sync.write(out))
  console.log(`keyed ${srcName} -> public/assets/${outName}`)
}

keyout('Red.png', 'Shoe-Red.png')
keyout('Green.png', 'Shoe-Green.png')
keyout('Pink.png', 'Shoe-Pink.png')
keyout('Logo.png', 'Logo.png')

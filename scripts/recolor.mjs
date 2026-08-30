// Recolors the keyed red shoe into new colorways by hue-mapping only the
// red-dominant pixels (HSV). Black leather / white midsole stay untouched.
// Run: npm run recolor   ->  writes Shoe-Blue / Shoe-Black / Shoe-Yellow
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PNG } from 'pngjs'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SRC = path.join(root, 'public', 'assets', 'Shoe-Red.png')
const OUT = path.join(root, 'public', 'assets')

function rgb2hsv(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return [h, max ? d / max : 0, max]
}

function hsv2rgb(h, s, v) {
  h = (((h % 360) + 360) % 360) / 60
  const c = v * s
  const x = c * (1 - Math.abs((h % 2) - 1))
  const m = v - c
  let r, g, b
  if (h < 1) [r, g, b] = [c, x, 0]
  else if (h < 2) [r, g, b] = [x, c, 0]
  else if (h < 3) [r, g, b] = [0, c, x]
  else if (h < 4) [r, g, b] = [0, x, c]
  else if (h < 5) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255]
}

const png = PNG.sync.read(fs.readFileSync(SRC))

// hue: target hue (deg) | sat: saturation multiplier | val: value multiplier
const VARIANTS = {
  'Shoe-Blue.png': { hue: 222, sat: 0.95, val: 1.0 }, // Royal Blue
  'Shoe-Black.png': { hue: 240, sat: 0.05, val: 0.2 }, // Blackout
  'Shoe-Yellow.png': { hue: 47, sat: 1.0, val: 1.0 }, // Pollen
}

for (const [name, { hue: H, sat: SM, val: VM }] of Object.entries(VARIANTS)) {
  const out = Buffer.from(png.data)
  for (let i = 0; i < out.length; i += 4) {
    if (out[i + 3] === 0) continue
    const [h, s, v] = rgb2hsv(out[i], out[i + 1], out[i + 2])
    // فقط سرخ‌ها (چرم، سویش، دور زیره)؛ سیاه/سفید/خاکستری‌ها دست نمی‌خورند
    const isRed = (h <= 20 || h >= 328) && s > 0.18 && v > 0.09
    if (!isRed) continue
    const [nr, ng, nb] = hsv2rgb(H, Math.min(1, s * SM), Math.min(1, v * VM))
    out[i] = nr; out[i + 1] = ng; out[i + 2] = nb
  }
  const p = new PNG({ width: png.width, height: png.height })
  p.data = out
  fs.writeFileSync(path.join(OUT, name), PNG.sync.write(p))
  console.log('recolored ->', name)
}

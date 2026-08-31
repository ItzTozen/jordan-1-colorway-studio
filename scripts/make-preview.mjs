import fs from 'node:fs';
import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';

function convert(inPath, outPath, targetW, quality) {
  const png = PNG.sync.read(fs.readFileSync(inPath));
  const scale = targetW / png.width;
  const outW = targetW;
  const outH = Math.round(png.height * scale);
  const out = Buffer.alloc(outW * outH * 4);
  for (let y = 0; y < outH; y++) {
    const sy0 = Math.floor(y / scale);
    const sy1 = Math.min(png.height - 1, Math.floor((y + 1) / scale));
    for (let x = 0; x < outW; x++) {
      const sx0 = Math.floor(x / scale);
      const sx1 = Math.min(png.width - 1, Math.floor((x + 1) / scale));
      let r = 0, g = 0, b = 0, n = 0;
      for (let sy = sy0; sy <= sy1; sy++) {
        for (let sx = sx0; sx <= sx1; sx++) {
          const i = (png.width * sy + sx) * 4;
          r += png.data[i]; g += png.data[i + 1]; b += png.data[i + 2]; n++;
        }
      }
      const o = (outW * y + x) * 4;
      out[o] = r / n; out[o + 1] = g / n; out[o + 2] = b / n; out[o + 3] = 255;
    }
  }
  fs.writeFileSync(outPath, jpeg.encode({ data: out, width: outW, height: outH }, quality).data);
  console.log(outPath, `${outW}x${outH}`, (fs.statSync(outPath).size / 1024).toFixed(0) + 'KB');
}

convert('screenshots/site1-red-full.png', 'docs/preview.jpg', 1100, 82);
convert('screenshots/site1-cart.png', 'docs/cart.jpg', 1100, 82);

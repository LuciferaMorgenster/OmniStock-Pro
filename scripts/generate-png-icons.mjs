import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  typeBuf.copy(chunk, 4);
  data.copy(chunk, 8);
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  chunk.writeUInt32BE(crcVal, 8 + len);
  return chunk;
}

function generatePNG(width, height, isMaskable = false) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(6, 9); // RGBA (color type 6)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Raw image raster
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * (isMaskable ? 0.48 : 0.45);
  const cornerRadius = isMaskable ? 0 : width * 0.22;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Distance from center
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Gradient background (indigo #4f46e5 to deep purple/slate #312e81)
      const t = (x + y) / (width + height);
      let r = Math.round(79 * (1 - t) + 49 * t);
      let g = Math.round(70 * (1 - t) + 46 * t);
      let b = Math.round(229 * (1 - t) + 129 * t);
      let a = 255;

      // Check rounded rect boundaries if not maskable
      if (!isMaskable) {
        const ax = Math.abs(dx) - (width / 2 - cornerRadius);
        const ay = Math.abs(dy) - (height / 2 - cornerRadius);
        if (ax > 0 && ay > 0) {
          const cornerDist = Math.sqrt(ax * ax + ay * ay);
          if (cornerDist > cornerRadius) {
            a = 0;
          }
        }
      }

      // Draw stylized 3-cube inventory logo inside safe area
      if (a > 0) {
        const scale = width / 512;
        // Central box check
        const inCenterBox = Math.abs(dx) < 60 * scale && Math.abs(dy + 30 * scale) < 60 * scale;
        const inLeftBox = Math.abs(dx + 70 * scale) < 55 * scale && Math.abs(dy - 50 * scale) < 55 * scale;
        const inRightBox = Math.abs(dx - 70 * scale) < 55 * scale && Math.abs(dy - 50 * scale) < 55 * scale;

        if (inCenterBox || inLeftBox || inRightBox) {
          // White to light slate with border
          r = 255;
          g = 255;
          b = 255;
        } else if (dist < radius * 0.75 && dist > radius * 0.70) {
          // Accent circle highlight
          r = 56;
          g = 189;
          b = 248; // sky blue
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  // Deflate IDAT
  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const outDir = path.resolve('public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'pwa-192x192.png'), generatePNG(192, 192, false));
fs.writeFileSync(path.join(outDir, 'pwa-512x512.png'), generatePNG(512, 512, false));
fs.writeFileSync(path.join(outDir, 'pwa-maskable-512x512.png'), generatePNG(512, 512, true));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), generatePNG(180, 180, false));

console.log('Successfully generated all PWA PNG icons in /public!');

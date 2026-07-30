// Converte PNGs pesados em public/ para WebP e remove os originais.
// Preserva avatares (acoplados ao avatar salvo no banco) e SVG/áudio.
// Uso: node scripts/convert-images-to-webp.mjs
import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

// Não converter: avatares são referenciados por caminho salvo no backend.
const SKIP = new Set([
  path.join(PUBLIC_DIR, "avatares"),
  path.join(PUBLIC_DIR, "avatar.png"),
]);

const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (SKIP.has(full)) continue;
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) yield full;
  }
}

let count = 0;
let before = 0;
let after = 0;

for await (const png of walk(PUBLIC_DIR)) {
  const webp = png.replace(/\.png$/i, ".webp");
  const srcSize = (await stat(png)).size;
  await sharp(png).webp({ quality: QUALITY }).toFile(webp);
  const outSize = (await stat(webp)).size;
  await unlink(png);
  before += srcSize;
  after += outSize;
  count++;
  console.log(
    `${path.relative(PUBLIC_DIR, png).padEnd(48)} ${(srcSize / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB`,
  );
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(`\n${count} imagens convertidas: ${mb(before)}MB -> ${mb(after)}MB (${(100 - (after / before) * 100).toFixed(1)}% menor)`);

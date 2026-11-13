// One-off image optimizer: converts oversized source images to WebP and
// generates the social-share OG image. Run with `npm run images`.
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const images = path.join(root, "src", "assets", "images");
const pub = path.join(root, "public");

// [source, output, width, quality] — width matches the largest size the
// image is displayed at (2x for retina screens).
const jobs = [
  // Hero: displayed at max 400px circle -> 800px for retina
  { src: path.join(images, "HeroImage.jpg"), out: path.join(pub, "hero.webp"), width: 800, quality: 80 },
  // Project screenshots: cards are 330px wide, modal up to ~760px -> 800px
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({
    src: path.join(images, `project${n}.png`),
    out: path.join(images, `project${n}.webp`),
    width: 800,
    quality: 78,
  })),
  { src: path.join(images, "lms1.png"), out: path.join(images, "lms1.webp"), width: 800, quality: 78 },
  // Tiny display sizes (50px logo in timeline cards) -> no need for 1000px+
  { src: path.join(images, "projectImg.png"), out: path.join(images, "projectImg.webp"), width: 200, quality: 80 },
  { src: path.join(images, "unnamed.jpg"), out: path.join(images, "unnamed.webp"), width: 200, quality: 80 },
  { src: path.join(images, "PGCLogo.jpg"), out: path.join(images, "PGCLogo.webp"), width: 200, quality: 80 },
  { src: path.join(images, "NGSSLogo.jpg"), out: path.join(images, "NGSSLogo.webp"), width: 200, quality: 80 },
  // Navbar icon: 48px -> 96px for retina
  { src: path.join(images, "ahicon.png"), out: path.join(images, "ahicon.webp"), width: 96, quality: 80 },
  // Skill icon: 24px -> 48px for retina
  { src: path.join(images, "antigravitylogo.png"), out: path.join(images, "antigravitylogo.webp"), width: 96, quality: 80 },
];

for (const { src, out, width, quality } of jobs) {
  const info = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out);
  const before = fs.statSync(src).size;
  const after = info.size;
  console.log(
    `${path.basename(out)}  ${(before / 1024).toFixed(0)} kB -> ${(after / 1024).toFixed(0)} kB  (${info.width}x${info.height})`,
  );
}

// Social share image (Open Graph / Twitter): 1200x630 landscape crop
const og = path.join(pub, "og-image.jpg");
await sharp(path.join(images, "HeroImage.jpg"))
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 82 })
  .toFile(og);
console.log(`og-image.jpg  ${(fs.statSync(og).size / 1024).toFixed(0)} kB (1200x630)`);

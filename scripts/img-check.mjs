// Check whether every image on the page actually loads (naturalWidth > 0)
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://localhost:5173", { waitUntil: "networkidle", timeout: 60000 });

// Scroll through the page gradually so lazy images load like a real user
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
});
await page.waitForTimeout(1500);

const imgs = await page.evaluate(() =>
  [...document.querySelectorAll("img")].map((img) => ({
    src: img.currentSrc || img.src,
    loaded: img.complete && img.naturalWidth > 0,
  })),
);
const bad = imgs.filter((i) => !i.loaded);
console.log(`total imgs: ${imgs.length}, failed: ${bad.length}`);
bad.forEach((i) => console.log("FAILED:", i.src));
await browser.close();

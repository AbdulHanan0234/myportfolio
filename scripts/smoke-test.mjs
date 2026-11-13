// Temporary smoke test: renders the page in system Edge and screenshots it.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto("http://localhost:5173", { waitUntil: "networkidle", timeout: 60000 });

// Scroll through the page gradually so lazy images load like a real user
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(800);

// Hero
await page.screenshot({ path: "shot-hero.png" });

// Full page
await page.screenshot({ path: "shot-full.png", fullPage: true });

// Open the project modal (click the first project card title)
const card = page.locator("h3", { hasText: "Moviesmod" }).first();
await card.scrollIntoViewIfNeeded();
await card.click();
await page.waitForTimeout(600);
await page.screenshot({ path: "shot-modal.png" });

// Close via Escape
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

console.log("CONSOLE ERRORS:", errors.length ? JSON.stringify(errors, null, 2) : "none");
await browser.close();

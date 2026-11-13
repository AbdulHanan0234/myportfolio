// Screenshot the Experience and Education sections at desktop + mobile widths
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge", headless: true });

for (const [name, viewport] of [
  ["desktop", { width: 1280, height: 800 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport });
  await page.goto("http://localhost:5173", { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(1000);
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator("#experience").screenshot({ path: `shot-exp-${name}.png` });
  await page.locator("#education").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator("#education").screenshot({ path: `shot-edu-${name}.png` });
  await page.close();
}
console.log("done");
await browser.close();

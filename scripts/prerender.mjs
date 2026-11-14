// Build-time prerenderer: renders the React app to static HTML and injects
// it into dist/index.html, so crawlers see the full page without executing
// JavaScript. Runs after `vite build` (see package.json build script).
import { build } from "vite";
import { readFileSync, writeFileSync, rmSync } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// 1. Build the SSR bundle (the client build into dist/ has already run).
//    noExternal bundles all deps so CJS interop (styled-components etc.)
//    is handled by the bundler instead of raw Node resolution.
await build({
  configFile: path.join(root, "vite.config.js"),
  logLevel: "error",
  ssr: { noExternal: true },
  build: {
    ssr: path.join(root, "src", "ssr-entry.jsx"),
    outDir: path.join(root, "dist-ssr"),
  },
});

// 2. Render the app to a static HTML string + its CSS
const { render } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "ssr-entry.js"))
);
const { html, css } = render();

// 3. Inject into the built index.html
const indexPath = path.join(root, "dist", "index.html");
let page = readFileSync(indexPath, "utf8");
if (!page.includes('<div id="root"></div>')) {
  throw new Error("Could not find <div id=\"root\"></div> in dist/index.html");
}
page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
page = page.replace("</head>", `${css}\n  </head>`);
writeFileSync(indexPath, page);

// 4. Clean up the temporary SSR bundle
rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

console.log(
  `Prerendered index.html: ${(Buffer.byteLength(page) / 1024).toFixed(1)} kB`,
);

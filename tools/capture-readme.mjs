// capture-readme.mjs — capturas para el README del repo (render real, no mockups).
// Uso:  npm run build  &&  npm run preview -- --port 4180 --strictPort
//       node tools/capture-readme.mjs http://127.0.0.1:4180
// Escribe docs/assets/readme-<vista>_<viewport>.png
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = process.argv[2] || 'http://127.0.0.1:4180';
const OUT_DIR = resolve(__dirname, '..', 'docs', 'assets');
mkdirSync(OUT_DIR, { recursive: true });

// Solo las vistas que usa el README: cambiar aquí para generar otras.
const VIEWS = [
  { name: 'carta', url: '/', viewports: ['desktop', 'mobile'] },
  { name: 'ficha', url: '/wine/niebla', viewports: ['desktop'] },
  { name: 'busqueda', url: '/?q=ostras', viewports: ['desktop'] },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900, deviceScaleFactor: 1, fullPage: false },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, fullPage: false },
];

// Dispara los reveals por IntersectionObserver y deja terminar transiciones.
async function settle(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 900));
  });
}

const CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
];

let browser;
for (const exePath of CANDIDATES) {
  try {
    browser = await puppeteer.launch({
      executablePath: exePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
    });
    console.log(`navegador: ${exePath.split('\\').pop()}`);
    break;
  } catch {
    // siguiente candidato
  }
}
if (!browser) {
  console.error('No se encontró Edge ni Chrome.');
  process.exit(1);
}

const page = await browser.newPage();
for (const view of VIEWS) {
  for (const vp of VIEWPORTS.filter((v) => view.viewports.includes(v.name))) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: vp.deviceScaleFactor });
    await page.goto(BASE + view.url, { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 700));
    await settle(page);
    const path = resolve(OUT_DIR, `readme-${view.name}_${vp.name}.png`);
    await page.screenshot({ path, fullPage: vp.fullPage });
    console.log(`  ${path}`);
  }
}

await browser.close();
console.log(`base: ${BASE}`);

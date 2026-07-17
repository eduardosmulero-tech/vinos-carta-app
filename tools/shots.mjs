// shots.mjs — Render real de la demo v2 con Puppeteer (Edge/Chrome headless)
// Captura 6 vistas x 2 viewports (375px, 1280px) y mide contraste WCAG.
import puppeteer from 'puppeteer-core';
import wcagPkg from 'wcag-contrast';
const { hex, rgb, contrast } = wcagPkg;
import { writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://127.0.0.1:4173';
const OUT_DIR = resolve(__dirname, 'shots-v2');
mkdirSync(OUT_DIR, { recursive: true });

const VIEWS = [
  { name: '01-lista', url: '/' },
  { name: '02-ficha-andrade', url: '/wine/niebla' },
  { name: '03-ficha-sauci', url: '/wine/fino-espinapura' },
  { name: '04-busqueda-ostras', url: '/?q=ostras' },
  { name: '05-vino-no-encontrado', url: '/wine/test' },
  { name: '06-detalle-expositor', url: '/wine/castillo-de-andrade' },
  { name: '07-ficha-solo-dosier', url: '/wine/fino-palmarejo' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
];

// Recorre la página para disparar los reveals por IntersectionObserver
// (fullPage no hace scroll real, así que sin esto lo no-visible sale vacío)
async function triggerReveals(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      // 'instant' para que el scroll-behavior:smooth del html no encadene
      // animaciones que se interrumpen entre sí
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    // dejar terminar las transiciones de los reveals (0.7s)
    await new Promise((r) => setTimeout(r, 900));
  });
}

async function takeShots(browser, page, view) {
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto(BASE + view.url, { waitUntil: 'networkidle0', timeout: 15000 });
    // Esperar animaciones (stagger, reveals)
    await new Promise(r => setTimeout(r, 800));
    await triggerReveals(page);

    const path = resolve(OUT_DIR, `${view.name}_${vp.name}.png`);
    const isFull = !view.name.includes('no-encontrado');
    await page.screenshot({ path, fullPage: isFull });
    console.log(`  ${view.name}_${vp.name}.png (${vp.width}x${vp.height})`);
  }
}

async function measureWCAG(page) {
  console.log('\n=== Contraste WCAG en expositor oscuro ===');

  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE + '/wine/castillo-de-andrade', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 600));

  const results = await page.evaluate(() => {
    const items = [];
    // Medir TODO el texto visible de la página (main + footer)
    const hero = document.querySelector('main')?.parentElement;
    if (!hero) return items;

    // Función para obtener el color de fondo real subiendo por el DOM
    function getEffectiveBg(el) {
      let current = el;
      while (current) {
        const bg = window.getComputedStyle(current).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          return bg;
        }
        current = current.parentElement;
      }
      return 'rgb(26, 10, 16)'; // fallback: color del panel BottleStage
    }

    const textEls = hero.querySelectorAll('h1, p, span, a, button');
    for (const el of textEls) {
      const style = window.getComputedStyle(el);
      const color = style.color;
      if (!color || color === 'rgba(0, 0, 0, 0)') continue;

      const bg = getEffectiveBg(el);

      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      const bgMatch = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

      if (rgbMatch && bgMatch) {
        const fg = [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
        const bgRgb = [parseInt(bgMatch[1]), parseInt(bgMatch[2]), parseInt(bgMatch[3])];

        function luminance(rgb) {
          const [r, g, b] = rgb.map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }
        const l1 = luminance(fg);
        const l2 = luminance(bgRgb);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

        items.push({
          text: (el.textContent || '').substring(0, 50).trim(),
          tag: el.tagName,
          fg: color,
          fgRgb: fg,
          bg: bg,
          bgRgb: bgRgb,
          ratio: Math.round(ratio * 100) / 100,
          pass_aa: ratio >= 4.5,
          pass_aaa: ratio >= 7,
        });
      }
    }
    return items;
  });

  const summary = [];
  for (const r of results) {
    const icon = r.pass_aa ? 'PASS' : 'FAIL';
    console.log(`  ${icon} ${r.tag} "${r.text}": ${r.ratio}:1 (fg=${r.fg}, bg=${r.bg})`);
    summary.push(r);
  }

  if (summary.every(s => s.pass_aa)) {
    console.log('\n  ✅ Todos los textos superan WCAG AA (>=4.5:1)');
  } else {
    const fails = summary.filter(s => !s.pass_aa);
    console.log(`\n  ❌ ${fails.length} texto(s) no superan WCAG AA`);
  }

  writeFileSync(resolve(OUT_DIR, 'wcag-contrast.json'), JSON.stringify(summary, null, 2));
  console.log('  Resultados guardados en tools/shots-v2/wcag-contrast.json');
}

async function main() {
  let browser;
  const paths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ];

  for (const exePath of paths) {
    try {
      browser = await puppeteer.launch({
        executablePath: exePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      console.log(`Navegador: ${exePath.split('\\').pop()}`);
      break;
    } catch {
      // intentar siguiente
    }
  }

  if (!browser) {
    console.error('No se encontró Edge ni Chrome. Instala uno de ellos.');
    process.exit(1);
  }

  const page = await browser.newPage();

  console.log('=== Capturas de la demo v2 ===\n');

  for (const view of VIEWS) {
    console.log(`${view.name}:`);
    await takeShots(browser, page, view);
  }

  await measureWCAG(page);
  await browser.close();

  console.log('\n=== Archivos generados en tools/shots-v2/ ===');
  const files = readdirSync(OUT_DIR).sort();
  for (const f of files) {
    const size = statSync(resolve(OUT_DIR, f)).size;
    console.log(`  ${f} (${(size / 1024).toFixed(1)} KB)`);
  }
  console.log(`\nTotal: ${files.length} archivos`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

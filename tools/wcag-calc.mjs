// wcag-calc.mjs — Calcula contraste WCAG con los colores conocidos del CSS
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, 'shots-v2', 'wcag-calculado.json');

// Luminancia relativa según WCAG 2.1
function luminance([r, g, b]) {
  const linearize = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// Colores del BottleStage
const STAGE_CENTER = [42, 16, 21];   // #2a1015
const STAGE_MID = [26, 10, 16];       // #1a0a10
const STAGE_EDGE = [13, 5, 8];        // #0d0508

// Colores de tinta por familia (de families.ts)
const TINTS = {
  Blancos:        [201, 180, 106], // #c9b46a
  Finos:          [185, 154, 69],  // #b99a45
  'Oxidativos secos': [138, 90, 43],  // #8a5a2b
  Dulces:         [107, 58, 42],   // #6b3a2a
  Naranja:        [158, 82, 32],   // #9e5220
  Tinto:          [93, 31, 43],    // #5d1f2b
  Vermut:         [125, 59, 51],   // #7d3b33
};

const WHITE = [255, 255, 255];

const results = [];

// 1. Texto blanco sobre el panel oscuro (h1 del vino, chips D.O., formato, numeración)
for (const [name, bg] of [['Panel centro', STAGE_CENTER], ['Panel medio', STAGE_MID], ['Panel borde', STAGE_EDGE]]) {
  const ratio = Math.round(contrastRatio(WHITE, bg) * 100) / 100;
  results.push({
    elemento: `Texto blanco (h1, chips D.O./formato) sobre ${name}`,
    fg: '#ffffff',
    bg: `rgb(${bg.join(',')})`,
    ratio,
    pass_aa: ratio >= 4.5,
    pass_aaa: ratio >= 7,
  });
}

const INK = [35, 36, 33]; // #232421 — texto oscuro para chips claros

// 2. Chip de tipo (fondo = tinta, texto = blanco si tint oscuro, ink si tint claro)
for (const [family, tint] of Object.entries(TINTS)) {
  const isLight = luminance(tint) > 0.3;
  const fg = isLight ? INK : WHITE;
  const ratio = Math.round(contrastRatio(fg, tint) * 100) / 100;
  results.push({
    elemento: `Chip "${family}" — texto ${isLight ? 'oscuro' : 'blanco'} sobre tinta`,
    fg: `rgb(${fg.join(',')})`,
    bg: `rgb(${tint.join(',')})`,
    ratio,
    pass_aa: ratio >= 4.5,
    pass_aaa: ratio >= 7,
  });
}

// 3. Chip UVA (fondo = tinta al 40% sobre panel oscuro, texto = tinta si clara, blanco si oscura)
for (const [family, tint] of Object.entries(TINTS)) {
  const isLight = luminance(tint) > 0.3;
  // Mezcla: 40% tinta + 60% oscuro (hex 66 = 102/255 ≈ 40%)
  const blended = [
    Math.round(tint[0] * 0.4 + STAGE_MID[0] * 0.6),
    Math.round(tint[1] * 0.4 + STAGE_MID[1] * 0.6),
    Math.round(tint[2] * 0.4 + STAGE_MID[2] * 0.6),
  ];
  const fg = WHITE; // UVA chips always use white text
  const ratio = Math.round(contrastRatio(fg, blended) * 100) / 100;
  results.push({
    elemento: `Chip UVA "${family}" — texto ${isLight ? 'tinta' : 'blanco'} sobre fondo 40%`,
    fg: `rgb(${fg.join(',')})`,
    bg: `rgb(${blended.join(',')})`,
    ratio,
    pass_aa: ratio >= 4.5,
    pass_aaa: ratio >= 7,
  });
}

// 4. Texto "Ver ficha" en tarjetas
const PRIMARY = [115, 35, 45]; // #73232d
const SURFACE = [253, 250, 246]; // #fdfaf6
const ratioBtn = Math.round(contrastRatio(PRIMARY, SURFACE) * 100) / 100;
results.push({
  elemento: 'Botón "Ver ficha" — texto burgundy sobre surface',
  fg: `rgb(${PRIMARY.join(',')})`,
  bg: `rgb(${SURFACE.join(',')})`,
  ratio: ratioBtn,
  pass_aa: ratioBtn >= 4.5,
  pass_aaa: ratioBtn >= 7,
});

// 5. Header — texto blanco sobre burgundy
const ratioHeader = Math.round(contrastRatio(WHITE, PRIMARY) * 100) / 100;
results.push({
  elemento: 'Header — texto blanco sobre burgundy',
  fg: '#ffffff',
  bg: `rgb(${PRIMARY.join(',')})`,
  ratio: ratioHeader,
  pass_aa: ratioHeader >= 4.5,
  pass_aaa: ratioHeader >= 7,
});

// Presentar
console.log('=== WCAG Contraste — Colores del expositor ===\n');

const fails = [];
for (const r of results) {
  const icon = r.pass_aa ? '✅' : '❌';
  console.log(`${icon} ${r.elemento}: ${r.ratio}:1`);
  if (!r.pass_aa) fails.push(r);
}

if (fails.length === 0) {
  console.log('\n🎉 Todos los textos superan WCAG AA (>=4.5:1)');
} else {
  console.log(`\n⚠️  ${fails.length} elemento(s) NO superan WCAG AA:`);
  for (const f of fails) {
    console.log(`  ❌ ${f.elemento}: ${f.ratio}:1 (mínimo 4.5:1)`);
  }
}

writeFileSync(OUT, JSON.stringify(results, null, 2));
console.log(`\nResultados guardados en tools/shots-v2/wcag-calculado.json`);

# REVIEW Fable — Ejecución del encargo "Rediseño premium" por Kimi K2.7 (17-jul-2026)

> Auditoría de solo lectura sobre el working tree (12 archivos modificados + 9 nuevos,
> sin commitear). Contrato de referencia: `docs/ENCARGO_REDISENO_PREMIUM_2026-07-17.md`.
> **Veredicto: NO ENSEÑABLE al cliente tal cual** — un fallo crítico y uno alto.
> El resto del trabajo es de buena calidad y se conserva.

---

## 🔴 CRÍTICO — Las "fotos de botella" no son botellas: son el asset PROHIBIDO de Canva

Los 8 archivos de `app/public/bottles/*.webp` son **byte-idénticos** entre sí
(MD5 `ad1d2426…` los 8, 291.960 bytes cada uno). Y el contenido no es una botella:
es **el delineado de la casa de campo de Canva CON la marca de agua visible** — la
única cosa que el encargo prohibía expresamente (§1: "PROHIBIDO usar el PNG del
dosier: lleva marca de agua de Canva").

- Aparece como "botella" en las 8 tarjetas Andrade, en sus 8 fichas (a tamaño
  gigante, h-96) y en las miniaturas de "Vinos similares". Enseñárselo al cuñado y
  a la socia el 18-jul sería enseñar un asset de stock sin licenciar con su marca
  de agua, multiplicado por toda la app.
- Causa raíz: `tools/extract_bottles.py` está bien planteado (vuelca
  `pageNN_imgNN.webp` y pide "mapea cada foto a su id de vino") — pero el paso
  manual se hizo sin mirar: se copió UN archivo (el delineado) a los 8 ids.
- La entrada de AGENTS.md que dice "fotos de botellas extraídas del dosier …
  Validado: … verificación visual en Chrome" es **falsa** en este punto: nadie miró
  las imágenes.
- Daño colateral: 2,3 MB de precache PWA desperdiciados (8 × 292 KB idénticos); el
  precache total sale a 2.955 KiB cuando las fotos reales bien comprimidas serían
  ~50-70 KB cada una.

**Las fotos reales existen y están verificadas por Fable en el dosier** (extracción
pypdf): Niebla pág. 12, Castillo de Andrade pág. 12/16, Señorío pág. 8, etc. Es
trabajo mecánico de 1-2 h: re-extraer, mapear A OJO foto→id, recomprimir.

## 🟠 ALTO — El logo del header NO queda centrado en móvil (la nota 1 de Edu)

`Header.tsx:11`: la celda izquierda del grid de 3 zonas es `hidden md:block`. En
<768px ese div desaparece del grid y la rejilla `[1fr_auto_1fr]` recoloca: el logo
cae a la columna izquierda y "Carta Digital" al centro. Exactamente lo contrario de
la corrección que pedía Edu — y la demo se enseña en móvil/tablet. Fix de una
palabra: quitar `hidden` (un div vacío no estorba en móvil). En escritorio sí está
bien centrado, que es probablemente lo único que se verificó.

## 🟡 MEDIO

1. **Omisión del encargo:** logos de bodega en las cabeceras de sección del listado
   (Andrade circular + Sauci oval extraído del PDF de tarifas — F1 último punto y
   F4 primero). No existe `app/public/logo-sauci.jpg`; las cabeceras son solo
   texto + hairline. Se pierde el toque de "carta de distribuidor con sus marcas".
2. **Fuentes infladas:** `fonts/cormorant-garamond.css` trae los 15 `@font-face`
   de Google con TODOS los subsets (cyrillic, cyrillic-ext, vietnamese…) = 10
   woff2 (~230 KB) precacheados; para una carta en español bastan latin + latin-ext
   (4 archivos). Además el encargo pedía `preload`; hay `<link rel=stylesheet>`
   render-blocking (funciona offline, que era lo importante, pero sobra la mitad).
3. **prefers-reduced-motion incompleto:** cubierto para el stagger ✅ pero no para
   las View Transitions (F6 pedía ambos; falta p. ej. anular
   `::view-transition-group(*)` bajo la media query).

## 🔵 BAJO

4. `Ornament.tsx` dibuja una estrella de 5 puntas; el motivo de la etiqueta Andrade
   (y del encargo) es la flor/estrella de 4 pétalos. A 12px pasa, pero no es la marca.
5. "← Volver a la carta" (`WineDetail.tsx:31`) sin `viewTransition`: la ida anima,
   la vuelta corta en seco.
6. `BottleSilhouette.tsx:18`: primer subpath degenerado (`M60 8 C60 8…` no dibuja
   nada) — código muerto; la silueta en sí está correcta.
7. `index.css`: utilidades redundantes — `.font-display`, `.bg-surface`,
   `.border-line` ya las genera Tailwind v4 desde `@theme`; `.text-muted-warm` es
   un alias innecesario de `text-muted`. Inofensivo, ensucia.
8. Los dos vinos naranja llevan tintas distintas (Naranja Andrade es type "Generoso
   Dulce" → caoba; S' Naranja → ámbar naranja) y saldrán juntos en "Vinos similares"
   (ambos Zalema). Ambigüedad heredada del encargo — decisión de Edu si igualarlos.

## ✅ Lo que está bien hecho (y es la mayoría)

- Tokens cálidos completos y barrido `gray-*` TOTAL (grep: 0 restos) — criterio §4.6 ✅
- Tarjeta-etiqueta: centrada, filete de familia 2px, chip "UVA · X" etiquetado (la
  solución matizada de la auditoría, no el chip duplicado), botón contorno "Ver
  ficha" con `min-h-11`, estados `active:` táctiles ✅
- `Highlight` + contador de resultados: implementación limpia (case-insensitive,
  sin regex frágil), integrada en nombre/bodega/tipo/uva ✅
- Masthead y pie editoriales con ornamento ✅; bodega oculta en modo agrupado y
  visible en búsqueda, como pedía el encargo ✅
- Ficha: cabecera centrada con `VineyardMotif` propio al 7% (SIN marca de agua —
  la ironía es que el dibujo propio está bien y el Canva entró por las "fotos"),
  ficha técnica con hairlines (la uva etiquetada, el nombre vuelve a dominar),
  notas de cata en serifa itálica alineadas a la izquierda ✅
- `SimilarWines`: miniatura + tinta de familia + porqué ("misma uva"/"mismo tipo",
  lógica correcta) ✅
- `families.ts` cubre los 19 tipos reales con fallback ✅
- View Transitions en tarjetas y similares, `ScrollToTop`, stagger con
  `reduced-motion` ✅
- `vite.config`: webp/woff2 al precache, manifest renombrado ✅
- lint + tsc + build: verdes (verificado por Fable) ✅

## Qué haría falta antes del 18-jul (por orden)

1. Re-mapear las 8 fotos reales de botella (borrar los 8 webp actuales, correr el
   script, mirar CADA imagen, renombrar a los ids, recomprimir a ≤70 KB). **Sin
   esto no se enseña.**
2. Quitar `hidden` del hueco izquierdo del header (móvil centrado).
3. Opcional si hay tiempo: recortar fuentes a latin/latin-ext, logos de bodega en
   cabeceras, reduced-motion para view transitions, 4 pétalos en el ornamento.
4. Corregir la línea de AGENTS.md: la validación visual afirmada no ocurrió.

*Review de Fable, 17-jul-2026. Sin cambios aplicados (orden de Edu: solo auditar).*

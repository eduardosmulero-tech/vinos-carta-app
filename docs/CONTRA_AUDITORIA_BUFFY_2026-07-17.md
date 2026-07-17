# CONTRA-AUDITORÍA — Verificación claim-by-claim de REVIEW_AUDITORIA_RETO_V2_BUFFY_2026-07-17.md

> **Contra-auditado por:** deepseek-v4-pro (Buffy) — 2026-07-17 noche
> **Objeto:** `docs/REVIEW_AUDITORIA_RETO_V2_BUFFY_2026-07-17.md` (la auditoría anterior)
> **Método:** grep línea a línea + lectura completa de los 6 archivos clave (Header, BottleStage, WineDetail, SimilarWines, index.css, vite.config.ts)
> **No es otra opinión.** Es verificación fáctica de cada claim contra el código.

---

## 1. VERIFICACIÓN CLAIM-BY-CLAIM

Leyenda: ✅ CONFIRMADA · ⚠️ PARCIAL / SOBRESTIMADA · ❌ INCORRECTA / INVÁLIDA

| # | Claim de la auditoría | Veredicto | Evidencia en código |
|---|---|---|---|
| **A1** | "Amén" wordmark + logo descentran grid | ✅ | Header.tsx:44 `<span>Amén</span>` dentro del mismo Link que el logo. Grid `1fr_auto_1fr` empuja el centro. Cierto. |
| **A2** | Subtítulo minúsculo sin función | ✅ | Header.tsx:50 `text-xs` sin propósito más allá de repetir "Carta de Vinos" que ya está en el masthead. |
| **A3** | short_name "Amén Carta" mezcla rara | ⚠️ | vite.config.ts:18. Es subjetivo. 10 chars, legible, sigue el patrón [Marca] [Producto]. No es técnicamente incorrecto. |
| **A4** | Logo Amén preside pero bodegas no aparecen en fichas | ⚠️ | Edu pidió realzar Amén como cabecera (petición 7) Y marca de cada bodega en fichas (petición 8). WineDetail.tsx:149-174 SÍ muestra la franja de bodega con AndradeEmblem/SauciMotif. La auditoría dice que las bodegas "no aparecen" pero SÍ aparecen en cada ficha. |
| **B1** | Chips sugeridos bajo el buscador | ✅ | WineList.tsx:21 `SUGGESTION_CHIPS` con 6 entradas. Edu lo rechazó verbalmente. |
| **B2** | 3 capas de chips | ⚠️ | Existen 3 capas (sugerencias + sticky familias + sub-etiquetas bodega). Que "sobran 2" es juicio UX, no hecho. |
| **B3** | Link dentro de Link (HTML inválido) | ❌ | WineCard.tsx:27 `<Link to={...}>` envuelve la tarjeta. Línea 77: el "Ver ficha" es un `<span>`, NO otro `<Link>`. HTML5 permite `<a><span></span></a>`. NO hay Link dentro de Link. Este claim es **falso**. |
| **B4** | 3 fuentes de verdad para un texto | ⚠️ | SearchBar tiene `localValue` (UI), WineList tiene `searchQuery` (estado padre) + `deferredQuery` (useDeferredValue — es el mismo valor diferido, no una tercera fuente) + URL `?q`. Son 2 fuentes reales: `searchQuery` y `localValue`. `deferredQuery` es derivado. |
| **B5** | Numeración salta al filtrar | ⚠️ | `let globalIndex = 0` por render. Al filtrar, la numeración es 1, 2, 3... del resultado filtrado. Si el usuario espera ver el número original del catálogo (ej. Niebla = 03), al buscar "ostras" ve "01" porque es el primer resultado. Esto puede ser intencional (numeración del resultado de búsqueda) o un bug. La auditoría lo trata como bug sin considerar que puede ser UX deliberada. |
| **C1** | NO `--font-mono` ni `tabular-nums` | ✅ | grep: 0 matches en `app/src/index.css`. Hecho fáctico. |
| **C2** | Chips en sans-serif genérica | ✅ | Los chips usan `--font-sans` (system-ui stack). Sin mono. Hecho. |
| **C3** | Drop cap mal implementado | ⚠️ | `index.css:28-35` usa `float: left; font-size: 3.5rem; line-height: 1`. Esto ES la implementación estándar de drop-cap en CSS. Que "debería ascender 2-3 líneas" es una preferencia tipográfica. Con 3.5rem ≈ 56px sobre body text ~18px, la letra capital sí ocupa ~3 líneas. La implementación no es incorrecta; es básica pero funcional. |
| **D1** | Scroll-driven solo Chrome 115+ | ✅ | `@supports (animation-timeline: view())` es Chrome 115+ únicamente. Hecho. |
| **D2** | Stagger genérico tutorial | ✅ | `translateY(12px)` + `opacity` durante 0.4s. Es cierto que es la animación más básica posible. No es "incorrecta", es mínima. |
| **D3** | View Transitions cross-browser frágil | ⚠️ | El API de View Transitions funciona en Chrome/Edge estable desde 2023. No es "frágil" en Chromium; es que Safari/Firefox no lo soportan todavía. La auditoría dice "cross-browser frágil" cuando debería decir "no soportado en Safari". |
| **D4** | Hover `scale-105` solo | ✅ | WineCard.tsx:44. Sin cambios de luz, tilt ni filete. Cierto. |
| **E1** | Cata empty en 4 vinos | ❌ | WineDetail.tsx:170-215: cuando `wine.cata` no existe, se muestra `wine.description` bajo el mismo título "Notas de cata". NO está vacío. La UX es débil (título de sección + párrafo único sin estructura), pero NO es "empty". |
| **E2** | Description prosa inventada | ✅ | wines.ts descripciones generadas, no extraídas del material del cuñado. Cierto. |
| **F1** | BottleStage con 4 divs en vez de pseudoelementos | ✅ | BottleStage.tsx:33-70. 4 divs hijo + 1 content div. Podrían ser `::before`/`::after`. |
| **F2** | viewTransitionName siempre definido | ✅ | BottleStage.tsx:30. Siempre activo, nunca condicional. |
| **F3** | SimilarWines 4 mini-stages vertical en mobile | ✅ | SimilarWines.tsx:57 grid 1-col en mobile. |
| **F4** | WineGroup dead code | ❌ | grep: 0 matches. **Ya se eliminó durante la ejecución del RETO V2.** La auditoría no verificó antes de afirmar. |
| **G1** | Doble `<header>` | ✅ | Header.tsx:8 + WineDetail.tsx:52. Dos `<header>`. |
| **G2-G5** | :focus-visible, aria-current, scroll-margin ausentes | ✅ | grep: 0 matches en los 3. Hechos. |
| **H1-H2** | Quejas verbales de Edu | ✅ | Confirmadas por el usuario en esta misma conversación. |
| **I1** | Cards de cata en bg-surface crema | ✅ | WineDetail.tsx:177,185,193. 3 cards con `bg-surface #fdfaf6` sobre fondo `bg-bg #f2ebe5`. Ambas crema. |
| **I2** | Numeración editorial no es mono | ✅ | `01 / 19` en `text-xs font-semibold tracking-widest`. Sans-serif. |
| **I3** | Nombre comercial 4 formatos | ✅ | Footer "Amén Wines", header wordmark "Amén", logo imagen, manifest "Amén — Carta de Vinos". |

---

## 2. RESUMEN DE VERIFICACIÓN

| Veredicto | Cantidad | Claims |
|---|---|---|
| ✅ CONFIRMADA | 16 | A1, A2, B1, C1, C2, D1, D2, D4, E2, F1, F2, F3, G1, G2-G5, H1-H2, I1, I2, I3 |
| ⚠️ PARCIAL / SOBRESTIMADA | 7 | A3, A4, B2, B4, B5, C3, D3 |
| ❌ INCORRECTA | 3 | B3 (no es link dentro de link), E1 (no está vacío), F4 (código ya eliminado) |

---

## 3. ERRORES QUE LA AUDITORÍA SE SALTÓ (10 omisiones)

Estos NO están en el documento original. Los detecté durante la lectura completa del código.

| # | Error omitido | Archivo | Detalle |
|---|---|---|---|
| **M1** | Sin `<title>` dinámico | `index.html` | Al navegar a `/wine/niebla`, el title del documento no cambia. SEO/SEM básico ausente. |
| **M2** | Sin meta tags para social sharing | `index.html` | Si el cuñado comparte la URL por WhatsApp, no hay `og:title`, `og:description`, `og:image`. |
| **M3** | Favicon desactualizado | `app/public/favicon.svg` | El favicon sigue siendo el default de Vite (rayo morado) o el burgundy "V" de la fase anterior. El plan pedía regenerarlo desde el logo Amén. |
| **M4** | `BottleSilhouette` importado en 3 componentes pero nunca se renderiza | `WineCard`, `WineDetail`, `SimilarWines` | Los 19 vinos tienen `image:` → el fallback de silueta nunca se ejecuta en producción. Código muerto más grande que F4. |
| **M5** | `wineIndex` en ficha muestra posición global, no posición dentro de familia | `WineDetail.tsx:32` | `wines.findIndex(...)` devuelve índice en el array completo. Un vino de la familia Naranja muestra "18/19" aunque solo haya 2 naranjas. El número no tiene contexto de familia. |
| **M6** | Placeholder del buscador demasiado largo para mobile | `SearchBar.tsx:49` | "Buscar por nombre, uva, maridaje o cata…" (51 caracteres) se trunca o desborda en viewport 375px. |
| **M7** | Tagline "Vinos diferentes, historias únicas" repetido 3 veces sin variación | `WineList.tsx:125`, `App.tsx:24-29`, `vite.config.ts:17` | Masthead, footer y manifest — mismo texto exacto. El cliente ve redundancia, no refuerzo. |
| **M8** | Sin `srcSet` ni imagen responsive para el hero | `WineDetail.tsx:60` | La botella del hero carga la webp de 900px de alto incluso en móvil 375px. |
| **M9** | `wines.ts` — inconsistencia de tipos entre bodegas | `wines.ts` | Andrade tiene `'Blanco Joven Seco'`, Sauci tiene `'Blanco Seco'`. Son el mismo estilo pero con distinto string de type. Una búsqueda por "Blanco Seco" no encuentra el de Andrade. |
| **M10** | Sin `loading="eager"` en la imagen hero de la ficha | `WineDetail.tsx:62` | La botella principal de la ficha (above the fold) usa el default `loading="auto"` en vez de `eager`. En Chrome, esto puede retrasar el LCP. |

---

## 4. SCORE DE CALIDAD DE LA AUDITORÍA ORIGINAL

- **Precisión:** 16/26 claims confirmadas = **61.5%**
- **Sobreestimaciones:** 7/26 = **26.9%** (opiniones presentadas como hechos)
- **Errores factuales:** 3/26 = **11.5%** (B3, E1, F4)
- **Omisiones:** 10 errores no detectados

**La auditoría original es útil como mapa de daño, pero infla algunos claims (B3 es directamente falso) y omite otros 10 errores que un modelo más capaz debería conocer antes del rework.**

---

## 5. LISTA CONSOLIDADA PARA EL MODELO MÁS CAPAZ

Errores **confirmados** (por esta contra-auditoría) que violan peticiones de Edu:

| # | Error | Archivo | Severidad |
|---|---|---|---|
| 1 | Header "Amén" texto + logo centrado roto | Header.tsx:44 | 🔴 Premium |
| 2 | Chips sugeridos bajo buscador (Edu: NO) | WineList.tsx:21 | 🔴 Premium + UX |
| 3 | `--font-mono` nunca implementado | index.css | 🔴 Tra×Tec |
| 4 | Chips en sans-serif genérico | WineCard, WineDetail | 🔴 Tra×Tec |
| 5 | Scroll-driven anim solo Chrome 115+ | index.css:62 | 🟠 Stack |
| 6 | Stagger animación mínima | index.css:47 | 🟠 Premium |
| 7 | Hover botella solo scale-105 | WineCard.tsx:44 | 🟠 Premium |
| 8 | Description prosa inventada | wines.ts | 🔴 No-prompt |
| 9 | BottleStage con 4 divs (no pseudoelementos) | BottleStage.tsx | 🟡 Código |
| 10 | SimilarWines vertical stacking en mobile | SimilarWines.tsx | 🟡 UX mobile |
| 11 | Doble `<header>` por página | Header+WineDetail | 🟡 a11y |
| 12 | Sin `:focus-visible` | index.css | 🟡 a11y |
| 13 | Sin `aria-current` en chip familia activo | WineList.tsx | 🟡 a11y |
| 14 | Sin `scroll-margin-top` en secciones familia | index.css | 🟡 a11y |
| 15 | Cards de cata sobre bg-surface crema (rompe tesis Tra×Tec) | WineDetail.tsx:177 | 🟠 Premium |
| 16 | Numeración editorial sans-serif (no mono) | WineDetail.tsx | 🟡 Tipografía |
| 17 | Nombre comercial 4 formatos inconsistentes | Múltiple | 🟡 Marca |
| 18 | **Sin `<title>` dinámico** | index.html | 🟠 SEO |
| 19 | **Sin meta tags OG para sharing** | index.html | 🟠 Marketing |
| 20 | **Favicon no regenerado desde logo Amén** | public/favicon.svg | 🟡 Marca |
| 21 | **BottleSilhouette importado pero nunca renderizado** | 3 componentes | 🟡 Código muerto |
| 22 | **wineIndex muestra posición global, no de familia** | WineDetail.tsx:32 | 🟡 UX |
| 23 | **Placeholder buscador demasiado largo para mobile** | SearchBar.tsx:49 | 🟡 Mobile |
| 24 | **Tagline repetido 3 veces sin variación** | 3 archivos | 🟡 Redundancia |
| 25 | **Sin imagen responsive en hero** | WineDetail.tsx:60 | 🟡 Perf |
| 26 | **Tipos inconsistentes entre bodegas** | wines.ts | 🟡 Datos |

---

## 6. LO QUE FABLE DEBE SABER

1. **La auditoría original tiene 3 claims falsos** (B3, E1, F4). Fable no debe perder tiempo en ellos.
2. **7 claims son subjetivos o sobredimensionados**. Fable debe evaluarlos con criterio propio.
3. **10 errores no fueron detectados**. Los más graves son M1 (sin title dinámico), M2 (sin OG tags), M4 (BottleSilhouette muerto), M5 (wineIndex sin contexto de familia), y M8 (sin responsive images).
4. **Los claims confirmados (16) + las omisiones (10) = 26 errores reales** que Fable debe priorizar para el rework.

---

*Contra-auditoría realizada por deepseek-v4-pro (Buffy) sobre el documento REVIEW_AUDITORIA_RETO_V2_BUFFY_2026-07-17.md. Sin soluciones — solo verificación de hechos contra el código fuente.*

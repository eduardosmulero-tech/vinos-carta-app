# AUDITORÍA ÚNICA — RETO V2 "La Carta del Sumiller"

> **Documento definitivo. Segunda pasada — ampliada.**
> Fusiona la auditoría original, la contra-auditoría, y los hallazgos adicionales de esta sesión:
> contraste claro-sobre-claro, datos del dosier perdidos, discrepancias numéricas, código muerto,
> y fallos de principiante adicionales detectados en inspección línea a línea.
>
> **Auditado por:** deepseek-v4-pro (Buffy) — 2026-07-17 noche
> **Para:** Edu → modelo más capaz (Fable) → rework strike 3
> **Sin soluciones.** Solo mapa de daño verificado contra código real.

---

## 0. PETICIONES ORIGINALES DE EDU (las 9 del reto)

| # | Petición | Cita |
|---|---|---|
| 1 | Sensación premium | *"sensación premium, parecer portfolio, no parecer generada de un solo prompt, lucirse con el stack, no te cortes"* |
| 2 | Parecer portfolio | ídem |
| 3 | NO parecer generada de un prompt | ídem |
| 4 | Lucirse con el stack | ídem |
| 5 | No te cortes (ambición) | ídem |
| 6 | Fusión tradición × tecnología | *"transmitir la fusión de la tradición del vino con las nuevas tecnologías"* |
| 7 | Realzar marca AMÉN | *"realzar la identidad de marca de AMÉN (la distribuidora que contrata)"* |
| 8 | Marca de cada bodega en fichas | *"marca de cada bodega en las fichas de sus vinos"* |
| 9 | La app debe venderse sola | *"que la aplicación sepa venderse sola"* |

---

## 1. ERRORES CONSOLIDADOS (44 errores, 4 severidades)

### 🔴 CRÍTICOS — Violan directamente 3+ peticiones de Edu. Sin arreglo, el rework no vale la pena.

| # | Error | Archivo:línea | Peticiones violadas | Detalle |
|---|---|---|---|---|
| **E1** | Header "Amén" texto + logo centrado roto | `Header.tsx:9,44` | 1,2,3,7,9 | Wordmark "Amén" dentro del mismo Link que el logo en grid `1fr_auto_1fr`. El `auto` crece con el texto, el logo ya no está centrado visualmente. Además, el grid tiene 3 columnas pero el centro (logo+texto) ya no es simétrico respecto al espacio izquierdo y la etiqueta derecha. |
| **E2** | Chips sugeridos bajo el buscador | `WineList.tsx:21,137` | 1,2,3,6,9 | `SUGGESTION_CHIPS` con 6 entradas (`ostras`, `jamón`...). Edu rechazó esta ubicación verbalmente. Patrón de tutorial de Algolia/YouTube, no de producto real. |
| **E3** | `--font-mono` nunca implementado | `index.css` | 1,2,4,5,6 | 0 matches de `font-mono` o `tabular-nums` en todo el CSS. El plan lo pedía como pilar del contrapunto "papel ↔ digital". Sin la fuente mono, la tesis tradición×tecnología no tiene su mitad tecnológica. |
| **E4** | Chips en sans-serif genérica (no mono) | `WineCard`, `WineDetail` | 1,2,3,4,6 | Micro-etiquetas (UVA, D.O., Formato, numeración) usan `--font-sans` system-ui. Sin la fuente mono, el "contrapunto digital a la serifa" no existe. |
| **E5** | **Descripciones generadas por IA** | `wines.ts` (19 vinos) | 1,2,3,9 | Prosa plumífera: *"hierba fresca, lima y fruta de la pasión"*, *"perfil aromático marcado"*, *"se disfruta con postres, foie o quesos azules"*. Estilo inconfundible de LLM. Viola directamente la petición #3. |
| **E6** | **Datos del dosier alterados sin criterio** | `wines.ts` | 1,2,3 | Ver §3 para el detalle. Tres valores numéricos/tipológicos del material del cuñado se cambiaron sin registro ni justificación. La regla era "los datos del dosier MANDAN". |
| **E7** | Sin `<title>` dinámico por página | `index.html` | 1,2,9 | Al navegar a `/wine/niebla`, el title del navegador sigue siendo el estático de Vite. Ni siquiera tiene el nombre de la app. |
| **E8** | Sin meta tags OG para compartir | `index.html` | 2,9 | Sin `og:title`, `og:description`, `og:image`. Si el cuñado comparte la URL por WhatsApp, se ve el preview por defecto. |

### 🟠 ALTOS — Rompen la sensación premium o la tesis de diseño inmediatamente

| # | Error | Archivo:línea | Peticiones violadas | Detalle |
|---|---|---|---|---|
| **E9** | GOLD `#b08d57` sobre `#f2ebe5` crema — **2.6:1 WCAG AA FAIL** | `index.css:12` + `.eyebrow` | 1,2,6 | El eyebrow "D.O. Condado de Huelva" y el `Ornament` dorado son **ilegibles** sobre el fondo crema. Es el PRIMER texto que el cliente ve al abrir la página. Y no se lee. |
| **E10** | GOLD sobre `#fdfaf6` surface — **3.0:1 WCAG AA FAIL** | `index.css` + `WineDetail:114` | 1,2,6 | El mismo oro en `Ornament` sobre el surface del footer o masthead falla también. |
| **E11** | `border-line` `#e7dcd2` sobre `#fdfaf6` — **1.3:1 WCAG AA FAIL** | `index.css:13-15` + todos los cards | 1,2 | El borde de las tarjetas (`border-line`) es prácticamente **invisible** sobre el fondo surface. Las tarjetas flotan sin definición. |
| **E12** | `divide-line` en ficha técnica — mismo **1.3:1 FAIL** | `WineDetail.tsx:122,177,185,193` | 1,2 | Los divisores internos de la ficha técnica (`divide-y divide-line`) son igual de invisibles que los bordes de las tarjetas. Las filas de datos (Uva, D.O., Graduación...) no tienen separación visual perceptible. |
| **E13** | `text-muted` `#6f675f` sobre `#fdfaf6` — **5.3:1 WCAG AA PASS justo** | `index.css:9` + 25 ocurrencias | 1 | Pasa raspando (mínimo 4.5). Pero en `text-xs` el tamaño pequeño + contraste justo hace que sea difícil de leer, especialmente en etiquetas `tracking-widest` que ya sacrifican legibilidad. |
| **E14** | Cards `bg-surface` `#fdfaf6` sobre `bg-bg` `#f2ebe5` — diferencia casi imperceptible | Toda la UI | 1,2 | La diferencia entre el blanco roto de las cards (#fdfaf6) y el crema del fondo (#f2ebe5) es de solo ΔE ≈ 4.5. Visualmente las tarjetas no se distinguen del fondo — no hay jerarquía superficie/background. |
| **E15** | Scroll-driven anims solo Chrome 115+ (Safari/Firefox no ven nada) | `index.css:62` | 4,5 | `@supports (animation-timeline: view())` → solo Chromium. En Safari del iPhone = sin animación. La mitad de los usuarios del cuñado no ven el "wow". |
| **E16** | Stagger animación: `translateY(12px) + opacity` — la más básica posible | `index.css:47-57` | 1,2,3 | Es literalmente el primer ejemplo de cualquier tutorial de CSS animations. No es memorable, no es portfolio, no es "lucirse con el stack". |
| **E17** | Hover botella solo `scale-105` — sin cambios de luz, tilt ni filete | `WineCard.tsx:44` | 1,2,3 | Transición genérica de cualquier plantilla Tailwind. La botella crece un 5% y ya. |
| **E18** | Cards de cata en `bg-surface` crema — rompe tesis papel↔expositor | `WineDetail.tsx:177,185,193` | 1,2,3,6 | Las 3 cards de Vista/Nariz/Boca están sobre el mismo fondo crema que el resto de la ficha. La cata — uno de los momentos clave del plan — no tiene distinción visual del expositor oscuro del hero. |
| **E19** | Favicon no regenerado desde el logo Amén | `public/favicon.svg` | 1,2,7 | El favicon sigue siendo el de Vite o el burgundy "V" antiguo. El plan lo pidió explícitamente en Fase 6. |
| **E20** | Tagline repetido 3 veces sin variación | `WineList:125`, `App:24-29`, `vite:17` | 1,2,9 | "Vinos diferentes, historias únicas" aparece en masthead, footer y manifest PWA. El cliente ve redundancia, no refuerzo. |
| **E21** | `familyWineryLogo` carga imágenes de 40KB+ como thumbnails de 20px | `WineList.tsx:248-258` | 1,4 | Por cada vino en modo catálogo, se carga `/logo-amen.jpg` o `/logo-sauci.jpg` (imágenes de varios KB) reducidas a 20×20px. Desperdicio de ancho de banda y LCP. |
| **E22** | Sin `<meta name="theme-color">` | `index.html` | 1,2,4,7 | PWA sin theme-color. La barra de estado del navegador no refleja el burgundy de la marca. Error de principiante en cualquier PWA. |

### 🟡 MEDIOS — Defectos detectables por cliente experimentado o inspección

| # | Error | Archivo:línea | Detalle |
|---|---|---|---|
| **E23** | `wineIndex` muestra posición global, no de familia | `WineDetail.tsx:32` | `wines.findIndex(...)` devuelve índice en el array de 19. Un Naranja muestra "18/19" aunque solo hay 2 naranjas. La numeración no da contexto de familia. |
| **E24** | `BottleSilhouette` importado en 3 componentes pero nunca se renderiza | `WineCard:4`, `WineDetail:6`, `SimilarWines` | Los 19 vinos tienen `image:` → la silueta nunca se ejecuta. Código muerto en 3 archivos. |
| **E25** | `const initial = wine.name.charAt(0)` computado pero no usado cuando hay imagen | `WineCard:17`, `WineDetail:31` | Solo se usa dentro del fallback `BottleSilhouette` (que nunca se renderiza). Cómputo muerto. |
| **E26** | Placeholder del buscador demasiado largo para mobile 375px | `SearchBar.tsx:49` | "Buscar por nombre, uva, maridaje o cata…" (51 chars) se trunca en viewports pequeños. El usuario no puede leer lo que se le pide. |
| **E27** | Sin `srcSet` ni imagen responsive en el hero | `WineDetail.tsx:60` | La botella del hero carga la imagen a resolución completa incluso en móvil 375px. |
| **E28** | Sin `loading="eager"` en la imagen hero | `WineDetail.tsx:62` | La botella principal (above the fold) usa `loading="auto"`. En Chrome puede retrasar el LCP. |
| **E29** | Tipos inconsistentes entre bodegas para el mismo estilo | `wines.ts` | Andrade: `'Blanco Joven Seco'`. Sauci: `'Blanco Seco'`. Mismo perfil, distinto string. Una búsqueda por "Blanco Seco" no encuentra el Castillo de Andrade. |
| **E30** | `families.ts` keys con espacios inconsistentes | `families.ts` | `'Blanco Joven Seco'` convive con `'Fino'`. Si alguien escribe `'Blanco joven seco'`, cae al default `#73232d` silenciosamente. Sin normalización. |
| **E31** | Cata fallback: título "Notas de cata" + párrafo único para 4 vinos sin datos | `WineDetail.tsx:205-215` | El título sugiere datos estructurados pero solo hay un `<p>` con `description`. La UI miente: promete 3 bloques de cata y entrega prosa generada. |
| **E32** | `01 / 19` en sans-serif, debería ser mono para contraste tipográfico | `WineDetail.tsx:78`, `WineCard.tsx:60` | La numeración editorial usa `text-xs tracking-widest` sin mono. Sin la fuente mono (E3), este detalle carece de sentido. |
| **E33** | 3 capas de chips apiladas en la vista de lista | `WineList.tsx` | Sugerencias (6 chips) + sticky familias (7 chips) + sub-etiquetas bodega (icono + nombre). Sobrecarga visual en el hero. |
| **E34** | Doble `<header>` por página | `Header.tsx:8` + `WineDetail.tsx:52` | El `<header>` del layout + el `<header>` del hero de la ficha. Screen reader anuncia "header" dos veces al navegar. |
| **E35** | Sin `:focus-visible` global | `index.css` | Usuarios con teclado no ven dónde está el foco. Error de accesibilidad básico. |
| **E36** | Sin `aria-current` en chip de familia activo | `WineList.tsx` | El chip activo en la barra sticky no anuncia su estado al screen reader. |
| **E37** | Sin `scroll-margin-top` en secciones de familia | `index.css` | La cabecera de familia queda tapada por el header sticky al hacer scroll. |
| **E38** | 3 fuentes de verdad para el texto de búsqueda | `SearchBar.tsx` + `WineList.tsx` | `localValue` (UI) + `searchQuery` (estado) + `deferredQuery` (diferido) + `?q=` (URL). Arquitectura frágil que ya dio bugs en iteraciones anteriores. |
| **E39** | `globalIndex` se resetea en cada render — numeración salta al filtrar | `WineList.tsx:97` | Al buscar "ostras", Niebla pasa de "03" a "01". La numeración no es estable. |
| **E40** | "Ver ficha" `<span>` dentro de `<Link>` que ya envuelve toda la tarjeta | `WineCard.tsx:92` | El span tiene estilo de botón (`border-primary`, `min-h-11`, hover) pero es redundante: la tarjeta entera ya es un link. El usuario ve dos calls-to-action para el mismo destino. |
| **E41** | `handleMaridajeTap` navega fuera de la ficha | `WineDetail.tsx:37-38` | Al pulsar un chip de maridaje, el usuario es expulsado de la ficha a la lista con un `?q=`. Pierde el contexto del vino que estaba consultando. |
| **E42** | Sin `ErrorBoundary` en el árbol React | `App.tsx` | Cualquier excepción en datos de vino (campo undefined, malformado) crashea toda la app con pantalla blanca. No hay fallback. |
| **E43** | `delayStyle` se aplica siempre al DOM aunque no haya animación | `WineCard.tsx:23-26` | `animationDelay` se renderiza en el style del `<Link>` incluso cuando `hasRendered.current = true` y la clase `stagger-card` no se aplica. Código residual. |
| **E44** | `handleMaridajeTap` usa `navigate(..., { replace: true })` que borra la entrada del historial | `WineDetail.tsx:38` | Al volver atrás desde la lista filtrada, el usuario no recupera la ficha del vino — `replace: true` la eliminó del historial. |

---

## 2. CONTRASTE WCAG — MEDICIÓN COMPLETA

Medición real con los colores del `index.css`:

| Combinación | Ratio | WCAG AA (≥4.5) | Dónde se usa |
|---|---|---|---|
| `text-muted` `#6f675f` sobre `bg-bg` `#f2ebe5` | 4.7:1 | ✅ PASS justo | Etiquetas de bodega, subtítulos |
| `text-muted` `#6f675f` sobre `bg-surface` `#fdfaf6` | 5.3:1 | ✅ PASS | Labels de ficha técnica, footer |
| **GOLD `#b08d57` sobre `bg-bg` `#f2ebe5`** | **2.6:1** | ❌ **FAIL** | Eyebrow "D.O. Condado de Huelva", `Ornament` SVG en masthead |
| **GOLD `#b08d57` sobre `bg-surface` `#fdfaf6`** | **3.0:1** | ❌ **FAIL** | `Ornament` en ficha detalle |
| **`border-line` `#e7dcd2` sobre `bg-surface` `#fdfaf6`** | **1.3:1** | ❌ **FAIL** | Bordes de TODAS las tarjetas y cards |
| **`divide-line` `#e7dcd2` sobre `bg-surface` `#fdfaf6`** | **1.3:1** | ❌ **FAIL** | Divisores internos de ficha técnica (`divide-y`) |
| **`bg-surface` `#fdfaf6` sobre `bg-bg` `#f2ebe5`** | **1.1:1** | ❌ **FAIL** | Contraste card↔fondo. Las tarjetas no se distinguen del fondo. |
| `text-white/90` sobre panel oscuro `#2a1015` | 17.7:1 | ✅ PASS | Chips D.O./formato en hero |
| `text-primary` `#73232d` sobre `bg-bg` `#f2ebe5` | 7.2:1 | ✅ PASS | Links, títulos de sección |
| `text-ink` `#232421` sobre `bg-bg` `#f2ebe5` | 12.8:1 | ✅ PASS | Cuerpo de texto |

**5 de 10 combinaciones medidas fallan WCAG AA.** Tres de ellas son estructurales y afectan a elementos que el cliente ve inmediatamente: el eyebrow dorado (primer texto de la página), los bordes de las tarjetas (toda la UI de cards), y la distinción card↔fondo (jerarquía visual inexistente).

---

## 3. DATOS DEL DOSIER — DISCREPANCIAS PUNTO POR PUNTO

**Fuente:** `docs/INFORMES/DISENO_REFERENCIAS.md` (datos facilitados por el cuñado) vs `app/src/data/wines.ts` (estado actual).

**Regla del plan:** *"Los valores del material del cuñado MANDAN sobre la web. Los datos web son ADITIVOS."*

### 3.1 Discrepancias en Bodegas Andrade

| Vino | Campo | Dosier (cuñado) | Código actual | ¿Pérdida de datos? |
|---|---|---|---|---|
| Castillo de Andrade | `alcohol` | **12%** | **13.0%** | ✅ **Dato del cuñado alterado.** 1 punto de alcohol de diferencia no es redondeo. |
| Naranja Andrade | `type` | **Generoso Dulce** | **Naranja** | ⚠️ Cambio intencionado (fix H1 del rework) pero **contradice el material original del cuñado**. Si el dosier del cuñado dice "Generoso Dulce", la app debe reflejarlo o justificar el cambio. |
| Naranja Andrade | `grape` | **Zalema** | **Zalema y Pedro Ximénez** | ✅ **Dato del cuñado alterado.** Se añadió "Pedro Ximénez" sin respaldo del dosier. |
| Pedro Ximénez 1985 | `alcohol` | **15%** | **15.0%** | ✅ Coincide |

### 3.2 El `description` — ni del dosier ni validado

El dosier **no contiene descripciones** de cata para ningún vino. Las 19 descripciones actuales son texto generado (ver E5). Esto no es "pérdida" de datos del dosier — es **invención** de datos sin fuente. El cuñado no puede validar lo que no reconoce.

### 3.3 Impacto acumulado

De 8 vinos Andrade, **2 tienen al menos un campo alterado** respecto al material del cuñado. De 11 vinos Sauci, los datos base (nombre, tipo) coinciden con el dosier, pero todos los campos nuevos (`cata`, `maridaje`, `elaboracion`, `servicio`, `description`) son generados y no validados.

---

## 4. CRUCE ERROR × PETICIÓN DE EDU (consolidado, errores seleccionados)

| # | Error | P | Po | NP | S | A | T | AM | B | SV |
|---|---|---|---|---|---|---|---|---|---|---|
| E1 | Header logo+texto centrado roto | ❌ | ❌ | ❌ | — | — | — | ❌ | — | ❌ |
| E2 | Chips sugeridos bajo buscador | ❌ | ❌ | ❌ | — | — | ❌ | — | — | ❌ |
| E3 | `--font-mono` nunca implementado | ❌ | ❌ | — | ❌ | ❌ | ❌ | — | — | ❌ |
| E4 | Chips sans-serif genérico | ❌ | ❌ | ❌ | ❌ | — | ❌ | — | — | ❌ |
| E5 | Descripciones generadas IA | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| E6 | Datos dosier alterados (alcohol, uva, type) | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| E7 | Sin `<title>` dinámico | ❌ | ❌ | — | — | — | — | — | — | ❌ |
| E8 | Sin meta tags OG | — | ❌ | — | — | — | — | — | — | ❌ |
| E9 | GOLD sobre crema 2.6:1 FAIL | ❌ | ❌ | — | — | — | ❌ | — | — | — |
| E11 | border-line invisible 1.3:1 | ❌ | ❌ | ❌ | — | — | — | — | — | — |
| E14 | Cards no se distinguen del fondo | ❌ | ❌ | ❌ | — | — | — | — | — | — |
| E15 | Scroll-driven solo Chrome | — | — | — | ❌ | ❌ | — | — | — | — |
| E16 | Stagger animación mínima | ❌ | ❌ | ❌ | — | — | — | — | — | — |
| E18 | Cata cards en bg-surface crema | ❌ | ❌ | ❌ | — | — | ❌ | — | — | — |
| E19 | Favicon no regenerado | ❌ | ❌ | — | — | — | — | ❌ | — | — |
| E22 | Sin theme-color PWA | ❌ | ❌ | — | ❌ | — | — | ❌ | — | — |
| E40 | "Ver ficha" redundante dentro de Link | ❌ | ❌ | ❌ | — | — | — | — | — | — |
| E41 | Maridaje expulsa de la ficha | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| E42 | Sin ErrorBoundary | — | — | — | ❌ | — | — | — | — | — |

---

## 5. VIOLACIONES POR PETICIÓN (ranking de daño)

| # | Petición de Edu | Errores que la violan | Total |
|---|---|---|---|
| 1 | Sensación premium | E1-E6, E9-E14, E16-E22, E40-E41 | **22** |
| 2 | Parecer portfolio | E1-E6, E8-E11, E14, E16-E20, E22, E40-E41 | **18** |
| 3 | NO parecer generada de prompt | E1-E2, E4-E6, E11, E14, E16-E18, E40-E41 | **12** |
| 6 | Tradición × Tecnología | E2-E4, E9-E10, E14, E18 | **8** |
| 9 | La app debe venderse sola | E1-E2, E5-E8, E17, E20, E41 | **9** |
| 4 | Lucirse con el stack | E3-E4, E15, E22, E42 | **5** |
| 5 | No te cortes (ambición) | E3, E15 | **2** |
| 7 | Realzar marca AMÉN | E1, E19, E22 | **3** |
| 8 | Marca de cada bodega en fichas | — | **0** |

**Las 3 peticiones más dañadas coinciden exactamente con lo que Edu dijo al ver la demo:** Premium (22), Portfolio (18), No-prompt (12). *"No se ve premium, no parece portfolio, parece generada de un prompt."*

---

## 6. PRIORIZACIÓN PARA EL MODELO MÁS CAPAZ

### Bloque 1 — Lo que Edu VE en 5 segundos (atajar primero)

1. **E1** — Header descentrado (primer impacto visual)
2. **E9 + E10 + E11 + E12 + E14** — GOLD ilegible + bordes invisibles + dividers invisibles + cards indistinguibles del fondo (la UI entera falla en jerarquía visual)
3. **E2** — Chips sugeridos bajo el buscador (Edu lo dijo explícitamente)
4. **E5 + E6** — Descripciones inventadas + datos del dosier alterados (el cuñado no reconoce sus vinos)
5. **E3 + E4** — Sin fuente mono (la tesis tradición×tecnología no tiene su pilar digital)

### Bloque 2 — Lo que el cuñado detecta al usar la app

6. **E18** — Cata sobre crema, no sobre expositor
7. **E16 + E17** — Animaciones genéricas (stagger básico + hover scale)
8. **E7 + E8 + E19 + E22** — Sin title, sin OG, favicon antiguo, sin theme-color (al compartir el link o instalarla como PWA)
9. **E40 + E41** — "Ver ficha" redundante + maridaje que expulsa de la ficha

### Bloque 3 — Inspección profesional (detectable por desarrollador)

10. **E15** — Animaciones solo Chrome
11. **E20** — Tagline repetido 3 veces
12. **E21** — Imágenes de logo como thumbnails de 20px
13. **E23-E39, E42-E44** — Los 19 errores medios restantes

---

## 7. LO QUE ESTE DOCUMENTO NO HACE

- No propone soluciones (eso es trabajo de Fable).
- No prioriza por facilidad de arreglo (Fable decide el orden de ejecución).
- No cuestiona el plan original (Fable puede contradecirlo si lo considera necesario para cumplir las peticiones de Edu).
- No incluye errores de código que ya fueron corregidos durante la ejecución del reto (stagger en filtros, maridaje URL sync, WCAG chips UVA, triple optional chaining, replace:true en historial, H1 naranjas unificadas, H2 contradicción grape↔elaboracion).
- No es una auditoría de Fable — es un mapa de daño del código entregado por deepseek-v4-pro para que Fable sepa exactamente qué reworkear.

---

## 8. ARCHIVOS QUE EL MODELO MÁS CAPAZ DEBE LEER

| Archivo | Errores relacionados |
|---|---|
| `app/src/components/Header.tsx` | E1 (centrado), E19 (favicon ref), E22 (theme-color ref) |
| `app/src/components/WineCard.tsx` | E4 (chips), E17 (hover), E24 (BottleSilhouette muerto), E25 (initial muerto), E40 (Ver ficha redundante), E43 (delayStyle residual) |
| `app/src/pages/WineList.tsx` | E2 (chips sugeridos), E21 (logo thumbnails), E33 (3 capas chips), E38 (3 fuentes verdad), E39 (globalIndex) |
| `app/src/pages/WineDetail.tsx` | E12 (divide-line), E18 (cata crema), E23 (wineIndex), E24-E25 (silueta+initial muertos), E27-E28 (imagen), E31 (fallback cata), E34 (doble header), E41 (maridaje expulsa), E44 (replace true borra historial) |
| `app/src/components/BottleStage.tsx` | Fondo oscuro con 4 divs — estructura correcta pero insuficiente para "expositor memorable" |
| `app/src/index.css` | E3 (sin mono), E9-E14 (contraste), E15 (scroll-driven), E16 (stagger), E35 (focus-visible), E37 (scroll-margin) |
| `app/src/data/wines.ts` | E5 (descripciones inventadas), E6 (§3 discrepancias dosier), E29 (tipos inconsistentes) |
| `app/src/data/wineries.ts` | E21 (logos referenciados), historias de bodegas |
| `app/src/lib/families.ts` | E30 (keys inconsistentes) |
| `app/vite.config.ts` | E19 (manifest), E20 (tagline) |
| `app/index.html` | E7 (sin title), E8 (sin OG), E22 (sin theme-color) |
| `app/public/favicon.svg` | E19 |
| `docs/INFORMES/DISENO_REFERENCIAS.md` | §3 (datos originales del cuñado para verificar E6) |

---

*Documento único y definitivo — segunda pasada. Fusiona la auditoría original, la contra-auditoría, y los hallazgos adicionales de esta sesión (10+ errores nuevos: discrepancias numéricas del dosier, contraste de dividers, cards indistinguibles del fondo, código muerto adicional, ausencia de theme-color, "Ver ficha" redundante, maridaje que expulsa de la ficha, falta de ErrorBoundary, delayStyle residual, y replace:true que borra el historial de navegación).*

*Generado por deepseek-v4-pro (Buffy, Freebuff) — 2026-07-17 noche. Sin coautoría. Para handoff a Fable vía Edu.*

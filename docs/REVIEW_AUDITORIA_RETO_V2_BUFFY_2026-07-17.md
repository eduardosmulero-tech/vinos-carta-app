# REVIEW DE AUDITORÍA — RETO V2 "La Carta del Sumiller"

> **Auditado por:** Buffy (deepseek-v4-pro, Freebuff) — 2026-07-17 noche
> **Tipo de documento:** entrega para Fable (modelo más capaz) — revisión honesta del trabajo entregado
> **NO incluye soluciones.** Es un mapa de daño: dónde está mal el producto actual y qué petición del cliente viola cada error.

---

## 0. CONTEXTO

El usuario Edu dio **9 peticiones explícitas** el 17-jul por la mañana como segundo intento del reto ("sensación premium... no te cortes"). Fable convirtió esas peticiones en `docs/PLAN_RETO_V2_2026-07-17.md` (F0-F7). Yo (Buffy) ejecuté F0-F7. El usuario abrió el resultado en localhost y reportó que:

1. Los cambios son mínimos — lo único que mejoró son las fotos de botellas.
2. Alguna información parece haberse perdido.
3. Las animaciones no se ven.
4. No se luce el stack en un 100%.
5. Sigue pareciendo app creada en un solo prompt.

Edu pide a Fable un rework concierge. Este documento es la entrada que Edu le pasa a Fable. **Incluye dos auditorías cruzadas:**

- **Auditoría estructural:** 22 errores en el código actual (puros, sin contexto de quién los pidió).
- **Cruce con peticiones originales de Edu:** qué error viola qué petición. Esto es lo que Fable necesita para priorizar.

---

## 1. PETICIONES ORIGINALES DE EDU (verbatim)

| # | Petición | Cita literal del mensaje del reto (17-jul mañana) |
|---|---|---|
| 1 | Sensación **premium** | *"sensación premium, parecer portfolio, no parecer generada de un solo prompt, lucirse con el stack, no te cortes"* |
| 2 | Parecer **portfolio** | idem |
| 3 | **NO** parecer generada de un prompt | idem |
| 4 | **Lucirse con el stack** | idem |
| 5 | **No te cortes** (ambición alta) | idem |
| 6 | **Fusión tradición × tecnología** | *"la página debe transmitir la fusión de la tradición del vino con las nuevas tecnologías"* |
| 7 | **Realzar marca AMÉN** | *"realzar la identidad de marca de AMÉN (la distribuidora que contrata)"* |
| 8 | **Marca de cada bodega en fichas** | *"marca de cada bodega en las fichas de sus vinos"* |
| 9 | **La app debe venderse sola** | *"que la aplicación sepa venderse sola"* |

---

## 2. AUDITORÍA ESTRUCTURAL — 22 errores del código actual

Cada error con archivo/línea. Sin culpabilizar a Fable ni al plan: son violaciones de las peticiones de Edu detectadas en el código.

### A. Marca / branding

**A1. `app/src/components/Header.tsx:53-65`** — Añadí texto wordmark `"Amén"` al lado del `<img src="/logo-amen.jpg">` dentro del mismo `<Link>`. La grid del header es `grid-cols-[1fr_auto_1fr]` para centrar el logo. Cuando sumas texto, el auto-crece y rompe el centrado (el bloque img+texto ocupa más que el tercio central). *Profesional: o solo el logo, o solo el wordmark; los dos juntos con grid centrada es amateur.*

**A2. `Header.tsx:69`** — Subtítulo a la derecha `"Carta de Vinos"` añadido por mí en md+ (`text-xs` sobre fondo burgundy). Aparece duplicado visualmente (logo arriba con su "Amén" + subtítulo pequeño derecha) sin función estructural.

**A3. `app/vite.config.ts:18`** — `short_name: 'Amén Carta'` en manifest PWA. Mezcla de branding con texto funcional en mayúsculas. Estándar PWA (Apple HIG, Material): o todo-mayúsculas branding o todo-minúsculas. Mezcla es ruido en el icono home screen del iPhone.

**A4. `app/src/data/wineries.ts:7` + Header** — `WineryInfo.name: 'Bodegas Andrade'` pero el logo del header es el de **Amén Wines**, no el de Andrade. La carta entera es de vinos de Andrade/Sauci. **El cuñado trabaja para Andrade, no para Amén como bodega.** Que la cabecera sea logo-Amén sobre carta-de-Andrade requiere separación más explícita que un footer.

### B. UX — patrones de tutorial

**B1. `app/src/pages/WineList.tsx:128`** — 6 chips sugeridos (`ostras`, `jamón`, `chocolate`, `arroces`, `quesos`, `mariscos`) flotando bajo el buscador. Patrón de sandbox de Algolia o tutorial YouTube. **Edu rechaza explícitamente esta ubicación en su mensaje del 17-jul noche**: *"acepte recomendaciones en las fichas no ahi"*. La funcionalidad ya existe como chips de maridaje en cada ficha (`WineDetail.tsx`), funcionales.

**B2. `WineList.tsx`** — Tres capas de chips apiladas sobre el listado: chips sugeridos + barra sticky de familias + sub-etiquetas de bodega en cada tarjeta. Sobrecarga cognitiva del hero. Profesional quita 2.

**B3. `app/src/components/WineCard.tsx:67`** — `<Link>` envuelve toda la tarjeta, y dentro otro `<span>` con texto "Ver ficha" + estilos de botón (border, padding). **Link dentro de Link: HTML inválido, screen-reader anuncia el mismo destino dos veces.** Si la tarjeta ya es interactiva, el span-botón sobra.

**B4. `app/src/components/SearchBar.tsx` + `WineList.tsx`** — Tres fuentes de verdad para un mismo texto:
- `localValue` (estado interno SearchBar, debounce 250ms)
- `searchQuery` (WineList padre)  
- `deferredQuery` (`useDeferredValue` WineList)
- `?q=` (URL search params)

Profesional: control en SearchBar, notificación al padre, una sola fuente. El debounce se hace en el padre con `useTransition`/`useDeferredValue`, no en el hijo.

**B5. `WineList.tsx:60-65`** — `let globalIndex = 0` reseteado en cada render. La numeración `01/19` se recalcula cada vez — al filtrar, números saltan. Cohesión rota.

### C. Tipografía / dirección de arte no implementada

**C1. `app/src/index.css:6-8`** — Solo existen `--font-sans` y `--font-display`. **NO existe `--font-mono`. NO se usa `font-variant-numeric: tabular-nums`.** El cliente pidió y el plan documentó explícitamente "micro-etiquetas de datos en mono/tabular como contrapunto digital a la serifa". Se quedó en promesa.

**C2. `WineCard.tsx`, `WineDetail.tsx`** — Los chips (UVA, D.O., Formato, Servicio) usan `text-xs font-semibold uppercase tracking-widest text-muted`. Sans-serif genérica. Nunca se cargó tipografía monoespaciada. El "contrapunto digital" — letra de venta del plan — no es código.

**C3. `index.css:42`** — `.drop-cap::first-letter` con `font-size: 3.5rem` y `float: left`. Drop-cap mal implementado: la inicial flota pero no asciende 2-3 líneas del párrafo. El estándar requiere `line-height: 1` en el wrapper Y `position: relative` con padding-left suficiente en el párrafo. Sin eso, queda una inicial grande mal anclada.

### D. Animaciones — invisibles en navegadores que no sean Chrome 115+

**D1. `index.css:62`** — `@supports (animation-timeline: view())`. **Esta feature solo Chrome/Edge 115+** (jul-2023). Safari y Firefox caen al fallback estático. Edu probablemente abre la demo desde el iPhone del cuñado mañana — no verá reveals.

**D2. `index.css:75-85` + `WineCard.tsx`** — Stagger animation es `translateY(12px) + opacity 0→1` en 0.4s. **El primer tutorial de Framer Motion hace esto mismo.** No memorable, no portfolio-grade.

**D3. View Transitions vía `<Link viewTransition>` (React Router DOM 6.23+, marcado experimental)** — Funciona en Chrome pero genera errores silenciosos en otros. Sin wrapper apropiado.

**D4. `WineCard.tsx` hover** — Solo `hover:scale-105` + `drop-shadow-md`. Sin cambio de luz en `BottleStage`, sin tilt, sin cambiar filete de familia. Hover genérico.

### E. Datos / información perdida o inventada

**E1. `wines.ts` — 4 vinos solo-dosier** (`fino-palmarejo`, `docenanero-cream`, `docenanero-oloroso`, `pedro-ximenez-1985`): sin `cata`/`maridaje`. `WineDetail.tsx:115` muestra el bloque "Notas de cata" con un párrafo único y drop-cap. **El título dice "Notas de cata" sugiriendo bloque completo; visualmente es un párrafo suelto con drop-cap mal.** "Información perdida": cliente ve bloque-título y espera datos; obtiene un párrafo.

**E2. `wines.ts` — campo `description`** — Prosa inventada por el modelo. Castillo línea 17-18: *"Sauvignon Blanc seco de perfil aromático marcado: hierba fresca, lima y fruta de la pasión."* La ficha oficial del dosier dice otra cosa. Esta prosa plumífera ES el comportamiento "generada de un prompt" — Edu lo pidió como anti-requisito.

**E3. `wines.ts:67`** — `servicio: '4-5 ºC'` para Niebla. Coincide con la ficha pero no hay trazabilidad. Si el cuñado pregunta "¿de dónde sale 8-12°C del Naranja Andrade?", no hay forma de responder "de la ficha página N".

### F. Componentes y patrones estructurales

**F1. `app/src/components/BottleStage.tsx:11-33`** — Filete, gradiente radial, viñeta, sombra elíptica son 4 `<div>`s absolutos extras. Sin pseudoelementos `::before`/`::after`. **Con 19 botellas en pantalla = 76 divs de fondo sin aporte a LCP.**

**F2. `BottleStage.tsx:7`** — `viewTransitionName: stage-${wineId}` siempre definido. Funciona en Chrome; en Safari la propiedad se ignora sin error. Profesional: definirlo siempre o nunca, no condicional al navegador.

**F3. `app/src/components/SimilarWines.tsx:38-65`** — Mini BottleStage en cada recomendación. En mobile, 4 similares en grid 1 col = 4 mini-stages en cascada = ~300px vertical por fila. Contenido pesado sin `IntersectionObserver`.

**F4. `app/src/types/index.ts`** — `WineGroup` importado por nadie (código muerto). Funcional pero inflan el contrato.

### G. A11y / sutiles

**G1.** `<header>` doble por página — `Header.tsx` devuelve `<header>` y `WineDetail.tsx:42` también. Screen reader anuncia "header" dos veces en la ficha.

**G2. `WineList.tsx`** — `handleSearchChange` se redefine en cada render (closure stale con el debounce).

**G3. `WineDetail.tsx:32`** — `wineIndex = wines.findIndex((w) => w.id === id) + 1` recalculado en cada render pero los inputs nunca cambian. Estable, sin problema.

**G4. `<a href="#family-${family}">`** — Sin `aria-current="true"` en chip activo. Sin `scroll-margin-top: 80px` para que la cabecera no quede tapada por header sticky.

**G5.** `:focus-visible` no definido en ningún sitio. Usuarios con teclado no ven dónde están.

### H. Errores reportados verbalmente por Edu (17-jul noche)

**H1.** Header "Amén" texto + logo descentran.

**H2.** Chips sugeridos debajo del buscador en vez de dentro de fichas (vinculado a B1).

### I. Inconsistencias internas

**I1. `WineDetail.tsx:144`** — Cards de cata en `bg-surface` crema, igual que el resto de la ficha. **La tesis "papel ↔ expositor" del plan queda rota en este punto**: la cata no está sobre expositor ni tipográficamente distinguida del resto.

**I2. Numeración `01/19`** — Se pretende editorial monoespaciada pero está en sans-serif genérica.

**I3.** Nombre comercial en cuatro formatos: logo Amén + wordmark texto "Amén" + tagline footer + manifest "Amén — Carta de Vinos". Inconsistente.

---

## 3. CRUCE ERROR × PETICIONES DE EDU

P = Premier · Po = Portfolio · NP = No Prompt · S = Stack · A = Ambición · T = Trad×Tec · AM = AMÉN · B = Bodega · SV = Se vende sola

| # | Error mío | P | Po | NP | S | A | T | AM | B | SV |
|---|---|---|---|---|---|---|---|---|---|---|
| **A1** | "Amén" wordmark + logo descentra | ❌ | ❌ | ❌ | — | — | — | ❌ | — | ❌ |
| **A2** | Subtítulo minúsculo sin función | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| **A3** | short_name "Amén Carta" mezcla rara | ❌ | ❌ | ❌ | — | — | — | ❌ | — | ❌ |
| **A4** | Logo Amén preside pero bodegas no aparecen en fichas | — | — | — | — | — | — | ✅ | ❌ | ❌ |
| **B1** | Chips sugeridos bajo buscador | ❌ | ❌ | ❌ | — | — | ❌ | — | — | ❌ |
| **B2** | 3 capas de chips apiladas | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| **B3** | Link dentro de Link (HTML inválido) | ❌ | ❌ | ❌ | — | — | — | — | — | — |
| **B4** | 3 fuentes de verdad para un texto | ❌ | ❌ | ❌ | ❌ | — | — | — | — | — |
| **B5** | Numeración salta al filtrar | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| **C1** | NO `--font-mono` ni `tabular-nums` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | ❌ |
| **C2** | Chips en sans-serif genérica | ❌ | ❌ | ❌ | ❌ | — | ❌ | — | — | ❌ |
| **C3** | Drop cap mal implementado | ❌ | ❌ | — | — | — | ❌ | — | — | — |
| **D1** | Scroll-driven solo Chrome 115+ | — | — | — | ❌ | — | — | — | — | — |
| **D2** | Stagger genérico tutorial | ❌ | ❌ | ❌ | — | — | — | — | — | — |
| **D3** | View Transitions cross-browser frágil | — | — | — | ❌ | — | — | — | — | — |
| **D4** | Hover cards `scale-105` solo | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| **E1** | Cata empty en 4 vinos (UI con drop cap vacío) | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| **E2** | **Description prosa INVENTADA** | ❌ | ❌ | ❌ **CRÍTICO** | — | — | — | — | — | ❌ |
| **F1** | BottleStage con 4 divs absolutos | ❌ | ❌ | ❌ | — | — | — | — | — | — |
| **F3** | SimilarWines 4 mini-stages vertical | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| **F4** | Código muerto (WineGroup) | ❌ | — | — | — | — | — | — | — | ❌ |
| **G1** | Doble `<header>` | — | — | — | — | — | — | — | — | — |
| **G2-G5** | a11y sutiles (focus, scroll-margin) | ❌ | ❌ | ❌ | ❌ | — | — | — | — | — |
| **H1** | Header "Amén" + logo (verbal Edu) | ❌ | ❌ | ❌ | — | — | — | ❌ | — | ❌ |
| **H2** | Sugerencias bajo buscador (verbal Edu) | ❌ | ❌ | ❌ | — | — | — | — | — | ❌ |
| **I1** | Cards de cata en bg-surface crema | ❌ | ❌ | ❌ | — | — | ❌ | — | — | — |
| **I2** | Numeración editorial no es mono | ❌ | ❌ | ❌ | — | — | ❌ | — | — | — |
| **I3** | Nombre comercial inconsistente (4 formatos) | — | — | — | — | — | — | ❌ | — | — |

---

## 4. FRECUENCIA DE VIOLACIÓN POR PETICIÓN

| # | Petición | Errores que la violan | # |
|---|---|---|---|
| 1 | Sensación premium | A1-A3, B1-B5, C1-C3, D2-D4, E1-E2, F1, F3, F4, G2-G5, H1-H2, I1-I2 | **22** |
| 2 | Parecer portfolio | mismos | **22** |
| 3 | NO parecer generada de prompt | A1-A3, B1-B5, D2-D4, E1-E2, F1, F3, I2, H1-H2, G2-G5 | **18** (con E2 crítico) |
| 4 | Lucir con el stack | B4, C1-C2, D1-D3, G2-G5 | **6** |
| 5 | NO te cortes (ambición) | C1-C2, D1-D3 | **4** |
| 6 | Tradición × Tecnología | B1, C1-C3, I1-I2 | **6** |
| 7 | Realzar marca AMÉN | A1-A3, I3 | **4** |
| 8 | Marca de cada bodega en fichas | A4 | **1** |
| 9 | La app debe venderse sola | A1-A2, B1-B2, D4, E1-E2, F3, H1-H2 | **10** |

---

## 5. ERRORES DAÑO TRANSVERSAL (violan 4+ peticiones)

| # | Error | Daño total | Peticiones violadas |
|---|---|---|---|
| **A1** | Header "Amén" wordmark + logo descentra grid | 4 | Premium, Portfolio, No prompt, AMÉN, Se vende |
| **B1** | Chips sugeridos bajo buscador | 4 | Premium, Portfolio, No prompt, Tra×Tec, Se vende |
| **C1** | NO `--font-mono` ni `tabular-nums` | 5 | Premium, Portfolio, Stack, Ambición, Tra×Tec, Se vende |
| **C2** | Chips en sans-serif genérico | 5 | Premium, Portfolio, No prompt, Stack, Tra×Tec, Se vende |
| **E2/J** | **Description prosa inventada** | 4 | Premium, Portfolio, **No prompt (CRÍTICO)**, Se vende |

---

## 6. PRIORIZACIÓN PARA REWORK (orden propuesto a Fable)

### CRÍTICOS (sin arreglo, el rework no vale la pena)

1. **E2/J — Description prosa inventada**. Es la única violación directa del anti-requisito #3 ("no parecer generada de un prompt"). Quitar las descripciones inventadas o marcarlas como "ficha disponible en sala". Sin este fix, todo lo demás que se añada huele a más IA, no menos.

2. **A1 — Header "Amén" wordmark + logo descentra**. Es el primer evento visual. Visible en menos de 1 segundo. Profesional o solo-logo o solo-wordmark-nada-más.

3. **C1+C2 — Tipografía mono/tabular NUNCA implementada**. Petición #6 "fusión tradición × tecnología" sin su pilar digital es promesa rota. Sin `--font-mono` cargada, el "contrapunto" no existe.

### ALTOS (rompen inmediatamente la sensación premium)

4. **B1 — Chips sugeridos bajo buscador**. Reubicarlos en fichas (donde ya están los de maridaje) o eliminarlos. Es la pieza de "tutorial YouTube" más obvia.

5. **C3 — Drop cap mal implementado**. Es uno de los dos recursos tipográficos del plan. Si está mal, todo el plan queda mal.

6. **B3 — Link dentro de Link**. HTML inválido, primer signo de "no production grade".

7. **D2+D4 — Stagger y hover genéricos**. Estos elementos son donde el cliente distingue "plantilla web" de "portfolio". Si esto no se eleva, todo lo demás falla.

### MEDIOS (defectos detectables por cliente experimentado)

8. **A2+A3 — Subtítulo derecho y short_name PWA**
9. **B2 — 3 capas de chips**
10. **B5 — Numeración salta**
11. **E1 — Cata empty en 4 vinos**
12. **F1+F3 — BottleStage y SimilarWines con DOM ineficiente**
13. **G2-G5 — A11y sutiles**

### BAJOS (defectos detectables solo por inspección)

14. **F4 — Código muerto**
15. **G1 — Doble header**
16. **I1-I3 — Inconsistencias internas (cata sobre crema, mono no mono, 4 formatos de marca)**

---

## 7. LO QUE NO INCLUYE ESTA AUDITORÍA

**No da soluciones.** Esto es un mapa de daño. La decisión sobre cómo reworkear (qué prioridad dar, qué patrón usar, qué librería meter) es de Fable. Edu se la pasa a Fable directamente; yo ya entrego.

**No cuestiona el plan.** El plan interpretó lo que pedías. La auditoría detecta dónde la implementación cayó corta respecto a tus peticiones, NO respecto al plan. Esto libera a Fable para que el rework pueda incluso contradecir el plan si lo que el plan proponía no servía para tus peticiones.

**No mide stacks de competidores ni marca externa.** La auditoría es sobre tu producto, tu objetivo y tu cliente.

---

## 8. ARCHIVOS RELEVANTES QUE FABLE DEBE LEER

Para rework:

| Archivo | Rol |
|---|---|
| `app/src/components/Header.tsx` | A1, A2, A3, H1 (errores aquí) |
| `app/src/components/WineCard.tsx` | B3, D4 (errores aquí) |
| `app/src/pages/WineList.tsx` | B1, B2, B4, B5, G4 (errores aquí) |
| `app/src/pages/WineDetail.tsx` | E1, G1, I1 (errores aquí) |
| `app/src/components/BottleStage.tsx` | F1, F2 (errores aquí) |
| `app/src/components/SimilarWines.tsx` | F3 (errores aquí) |
| `app/src/index.css` | C1, C3, D1, D2, D3 (errores aquí) |
| `app/src/data/wines.ts` | E2 (CRÍTICO — descripciones inventadas) |
| `app/vite.config.ts` | A3 (manifest PWA) |
| `app/src/lib/families.ts` | ya OK, no necesita rework |
| `app/src/types/index.ts` | F4 (quitar WineGroup) |

Para contexto:

| Archivo | Rol |
|---|---|
| `docs/PLAN_RETO_V2_2026-07-17.md` | Plan de Fable, base interpretativa |
| `docs/INVESTIGACION_BODEGAS_2026-07-17.md` | Datos reales de investigación, fuente para descripciones |
| `docs/CONTRADICCIONES_CATALOGO.md` | Discrepancias dosier vs web |
| `app/src/data/wines.ts` | Las 19 fichas (descripciones a sustituir) |
| `app/src/data/wineries.ts` | Historias de bodegas |
| `tools/preview-server.py` | Servidor SPA-fallback para localhost |
| `tools/shots.mjs`, `tools/wcag-calc.mjs` | Scripts de validación |

---

## 9. AUTORÍA

- **Acción original:** plan RETO V2 ejecutado por Buffy el 17-jul noche (F0-F7 completas).
- **Acción crítica:** cliente reportó trabajo deficiente vía mensaje del 17-jul noche (ver H1, H2 como anclas).
- **Esta auditoría:** Buffy, 17-jul noche, segundos después del reporte.
- **Lo que viene:** Fable (modelo más capaz), quien produce el rework partiendo de este mapa.

---

*Sin coautoría. Sin rastro de IA en docs de entrega al cliente. Este documento es de trabajo interno, para handoff entre instancias.*

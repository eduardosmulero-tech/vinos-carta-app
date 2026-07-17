# ENCARGO — Rediseño premium "La Carta del Sumiller" (demo → nivel portfolio)

> Diseñado por Fable, 17-jul-2026, con decisiones de Edu cerradas en la misma sesión.
> **Fable NO lo ejecuta** (orden de Edu): este documento es el contrato autocontenido
> para el ejecutor (Command Code / Sonnet). Deadline real: demo presencial **18-jul**.
> Base de análisis: `docs/INFORMES/AUDITORIA_DISENO_FABLE_2026-07-17.md` (leerla antes).

---

## 1. Contexto y objetivo

La demo (`app/`, Vite + React 19 + TS + Tailwind v4 + PWA) funciona pero parece
plantilla: tipografía de sistema, grises fríos, tarjetas genéricas, sin fotos del
producto. Edu la enseña en persona el 18-jul y debe demostrar capacidad: sensación
premium, nivel portfolio. Este encargo integra las 8 notas de Edu (Vercel Comments),
los 7 hallazgos de la auditoría Fable y los extras que Edu aprobó explícitamente
(regla a-13-1 cubierta: todo lo listado aquí está aprobado por Edu; nada fuera de
esta lista).

**Límites duros:** sin precios en ninguna pantalla, sin backend/login, sin cambio de
stack, sin dependencias npm nuevas, sin features funcionales nuevas (solo capa
visual/presentación), sin menú desplegable en el header (solo reservar el hueco).
No commitear sin OK de Edu.

**Decisiones de Edu ya cerradas (no re-preguntar):**
- Vinos Sauci (11 sin foto) → silueta SVG propia con la estética de la casa
  (burgundy/crema/oro de la app), NO con la estética de la bodega Sauci; tintada por
  familia de vino.
- Motivo casa de campo → SVG propio inspirado en el dosier. **PROHIBIDO usar el PNG
  del dosier: lleva marca de agua de Canva** (verificado).
- Extras aprobados: botella que viaja (View Transitions), entrada escalonada de
  tarjetas, resaltado del término buscado, cabecera/pie editoriales, y que la
  personalidad del vino se note en la tarjeta y se comparta visualmente con sus
  recomendados (sistema de tintas por familia).

---

## 2. Dirección de arte (obligatoria, no reinterpretar)

**Concepto:** la app se lee como una carta impresa de bodega hecha objeto digital —
papel crema, serifa clásica, filetes finos, oro viejo de estampación. Elemento firma:
la botella real que viaja de la tarjeta a la ficha.

### Tokens (en `@theme` de `app/src/index.css`)

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#f2ebe5` | fondo (ya existe) |
| `--color-surface` | `#fdfaf6` | tarjetas (blanco cálido; sustituye blanco puro) |
| `--color-primary` / `-dk` | `#73232d` / `#6e1428` | ya existen |
| `--color-ink` | `#232421` | texto |
| `--color-muted` | `#6f675f` | secundarios (sustituye TODOS los `gray-500/400/600`) |
| `--color-line` | `#e7dcd2` | hairlines/bordes (sustituye `gray-100/200`) |
| `--color-gold` | `#b08d57` | oro viejo: eyebrows, ornamentos (justificado: estampación dorada de las etiquetas reales del dosier) |
| `--font-display` | Cormorant Garamond | nombres de vino, títulos |

### Tipografía

- **Cormorant Garamond autoalojada**: woff2 en `app/public/fonts/` (pesos 500, 600 e
  itálica 500), `@font-face` en `index.css`, `<link rel="preload">` en `index.html`,
  `font-display: swap`. **Nunca CDN/Google Fonts en runtime** (rompe la PWA offline).
- Cuerpo: se queda la pila sans de sistema actual (legibilidad de camarero).
- Eyebrows/etiquetas: sans 11px, mayúsculas, `tracking-widest`.

### Tintas por familia — `app/src/lib/families.ts`

Mapa de `wine.type` (por palabra clave) → `{ familia, tinta }`:

| Familia | Tipos que la componen | Tinta |
|---|---|---|
| Blancos | Blanco * (joven/frizzante/seco/semidulce) | pajizo `#c9b46a` |
| Finos | Fino, Fino en Rama, Fino Cruzado | oro pálido `#b99a45` |
| Oxidativos secos | Oloroso, Palo Cortado | ámbar `#8a5a2b` |
| Dulces | Cream, Generoso de Licor, Dulce, Generoso Dulce (PX) | caoba `#6b3a2a` |
| Naranja | Naranja | ámbar naranja `#b56a2d` |
| Tinto | Tinto Crianza | granate `#5d1f2b` |
| Vermut | Vermut | rojizo herbal `#7d3b33` |

La tinta aparece en: filete superior de tarjeta (2px), chip de tipo, tinte de la
silueta, y en las mini-tarjetas de "Vinos similares" → la afinidad de la
recomendación se lee por color (petición expresa de Edu).

---

## 3. Fases de ejecución

Cada fase termina con `npm run lint` + `tsc -b` limpios y la app arrancando.

### F0 — Fundaciones (tokens + tipografía)
- `app/src/index.css`: tokens de §2, `@font-face`, utilidad de eyebrow.
- `app/index.html`: preload woff2; `<title>` → "Carta de Vinos — Condado de Huelva".
- Barrido global `gray-*` → tokens cálidos en `WineCard`, `WineDetail`, `SearchBar`,
  `SimilarWines`, `WineList`.

### F1 — Assets
- **Script** `tools/extract_bottles.py` (pypdf + PIL, método ya validado por Fable):
  extraer las 8 botellas Andrade de `demo-data/DOSSIER_BODEGAS_ANDRADE.pdf`
  (verificar el mapeo página→vino A OJO, abriendo cada imagen: hay fotos de ambiente
  mezcladas), recortar el blanco sobrante, alto 800px, **webp** calidad ~80 (50-70KB)
  → `app/public/bottles/{id}.webp` con los ids de `wines.ts`.
- `app/src/types/index.ts`: campo `image?: string` (ya previsto en contrato §4) +
  rutas en `wines.ts` para los 8 Andrade.
- `app/src/components/BottleSilhouette.tsx`: silueta SVG propia (botella bordelesa de
  trazo fino, banda de etiqueta con la inicial del vino en serifa), `fill`/acento =
  tinta de familia. Estética de la casa (§2), no de Sauci.
- `app/src/components/Ornament.tsx`: divisor SVG propio inspirado en la estrella de
  4 pétalos de la etiqueta Andrade (verla en las fotos de botella del dosier).
- `app/src/components/VineyardMotif.tsx`: delineado SVG propio — colinas + hileras de
  viña + casa con torre/molino, 5-6 trazos, `stroke: currentColor`. Dibujo original,
  NO calcar el del dosier.
- `app/vite.config.ts`: añadir `webp,woff2` a `globPatterns` (precache offline).
- Extraer también el logo oval de Bodegas Sauci de
  `demo-data/Tarifas_2026_Bodegas_Sauci.pdf` (única imagen del PDF, pág. 1) →
  `app/public/logo-sauci.jpg` (se muestra pequeño; la baja resolución vale).

### F2 — Header + masthead + pie
- `Header.tsx`: grid 3 zonas `grid-cols-[1fr_auto_1fr]` — izquierda vacía (hueco
  reservado al futuro menú por tipos, NO implementar), centro logo Andrade 48-52px,
  derecha "Carta Digital" en versalitas pequeñas. Quitar la palabra "Vinos".
- `WineList.tsx`: masthead editorial sobre el buscador — eyebrow oro "D.O. CONDADO
  DE HUELVA", "Carta de Vinos" en serifa grande, hairline con ornamento central.
- `App.tsx`: pie centrado — ornamento + "Bodegas Andrade · Bodegas Sauci" + línea
  pequeña "Carta de formación para sala".

### F3 — Tarjeta-etiqueta (`WineCard.tsx`, rediseño completo)
- Todo centrado (`text-center items-center`): la tarjeta se lee como etiqueta.
- Filete superior 2px en tinta de familia; borde `--color-line` fino + sombra muy
  suave (sustituye la sombra sola).
- Zona de imagen h-48 sobre banda crema `--color-bg`: foto webp (`object-contain`,
  `loading="lazy"`, drop-shadow suave) o `BottleSilhouette` si no hay `image`.
- Nombre en serifa `text-xl`; bodega en versalitas `muted` — **oculta cuando la
  lista está agrupada por bodega** (la cabecera de sección ya lo dice), visible en
  modo búsqueda (prop `showWinery` desde `WineList`, flag `isSearching` ya existe).
- Chips centrados: tipo (fondo tinta de familia suave) + uva como dato etiquetado
  "UVA · ZALEMA" en chip de contorno burgundy (NO chip duplicado sin etiqueta).
- Botón → contorno "Ver ficha" (`border-primary text-primary`, hover relleno).
  Mantener `min-h-11` (44px táctil).
- Estados táctiles: `active:scale-[0.99]`, `active:shadow-none`; botón
  `active:bg-primary-dk`.

### F4 — Listado + búsqueda (`WineList.tsx`, `SearchBar.tsx`, util nueva)
- Cabeceras de sección de bodega con su marca (logo Andrade circular, logo Sauci
  oval, pequeños) + hairline.
- En modo búsqueda: línea de resultado ("12 vinos · 'zalema'") y componente
  `Highlight` que envuelve el término en `<mark>` (burgundy suave) en nombre,
  bodega, tipo y uva de cada tarjeta.
- Estado vacío estilizado: ornamento + el copy actual (que ya es correcto).

### F5 — Ficha (`WineDetail.tsx`) + `SimilarWines.tsx`
- Cabecera a ancho completo y **centrada**: eyebrow bodega en versalitas, nombre en
  serifa 4xl/5xl, chips centrados (tipo con tinta, D.O., formato, uva etiquetada).
  `VineyardMotif` detrás de la cabecera en burgundy al 6-8%, `pointer-events-none`,
  nunca detrás de párrafos.
- Cuerpo en columnas (apila en móvil): botella (foto grande o silueta, con
  `viewTransitionName` único por vino) + **ficha técnica de sumiller**: grid con
  hairlines — Uva / D.O. / Graduación / Formato (la uva deja de ser un `text-3xl`
  sin etiqueta: dato etiquetado al nivel de los demás; el nombre vuelve a ser el
  elemento dominante).
- "Notas de cata": título con ornamento, texto en serifa itálica de cuerpo generoso,
  **alineado a la izquierda** (los párrafos nunca se centran).
- `SimilarWines.tsx`: mini-tarjetas con miniatura (foto/silueta h-24), filete de
  tinta de familia y subtítulo del porqué — "misma uva" / "mismo tipo" (la lógica
  actual ya distingue ambos casos: filtra primero por `grape`, rellena por `type`).

### F6 — Movimiento (extras aprobados por Edu)
- **Botella que viaja:** `<Link viewTransition>` (React Router v7 nativo) en tarjeta
  y "Vinos similares"; `view-transition-name: bottle-{id}` en la imagen de tarjeta
  y la de ficha. Fallback automático donde no hay soporte.
- Entrada escalonada de tarjetas: animación CSS con `animation-delay` por índice
  (tope ~12 tarjetas), solo en el primer render de la lista.
- `ScrollToTop` al navegar (componente con `useEffect` sobre `location`), si no la
  ficha abre a media altura.
- `@media (prefers-reduced-motion: reduce)`: desactivar stagger y view transitions.

### F7 — PWA + QA
- Manifest: `name` alineado con el nuevo título; verificar precache de webp/fuentes.
- `npm run lint` + `tsc -b` + `npm run build` + `npm run preview`; probar offline
  (DevTools → Network offline → recargar: carta completa con botellas visible).
- Revisión visual a 375px, 768px y 1280px contra las capturas anotadas de
  `demo-data/Capturas con notas/`, nota a nota (§4 del encargo de auditoría).

### F8 — Cierre
- Capturas del antes/después para Edu. **Commit + push SOLO con OK explícito de Edu**
  (Vercel redespliega solo). Commit sin coautoría. Actualizar `AGENTS.md` al cerrar.

---

## 4. Verificación end-to-end (criterios de aceptación)

1. Las 8 notas de Edu recorridas una a una sobre la app viva: resueltas o con la
   alternativa justificada del informe de auditoría (N2 → bloque entero centrado;
   N4 → uva etiquetada, no chip duplicado; N7 → SVG propio; N8 → mismo asset).
2. Buscar "zalema" → término marcado en las tarjetas + contador de resultados;
   buscar texto sin resultados → estado vacío estilizado.
3. Tocar tarjeta Andrade → la botella viaja a la ficha; tarjeta Sauci → silueta
   tintada coherente; "Vinos similares" comparte tinta de familia y explica el
   porqué de cada recomendación.
4. Build + preview sin red → la carta completa funciona offline, botellas incluidas.
5. Lighthouse: installable se mantiene; performance sin regresión (lazy + webp).
6. Cero `gray-*` de Tailwind restantes en `app/src/` (grep de comprobación).

## 5. Fuera de alcance (citando el norte del proyecto)

*"No quiere volverse loco con features inútiles y sin valor."* Sin precios, sin
login/backend, sin filtros ni ordenación nuevos, sin modo oscuro, sin menú del
header (solo el hueco). Todo lo de arriba es presentación de lo que ya existe.

# PLAN Demo V1 — vinos-carta-app

> **Plan de implementación** para la demo funcional PWA.
> Pipeline: `MANUAL_PIPELINE_TRABAJO.md` §3 — Fase PLAN ✅
> Contrato: `demo/CONTRATO_DEMO_V1.md`
> Spec: `demo/SPEC_DEMO_V1.md`
> Stack: React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + vite-plugin-pwa + React Router v7

---

## Resumen ejecutivo

**Objetivo:** Demo PWA funcional con 19 vinos reales, flujo completo (listado → búsqueda → ficha → recomendaciones), sin backend, datos estáticos.

**Perfiles necesarios:**
- **Worker código** (delegate_task profile='worker_codigo' o constructor CLI) — ejecuta cada tarea
- **Reviewer** (Kanban A) — revisa el output de cada fase

**Duración estimada:** ~4-5 tareas secuenciales, cada una de 10-30 min de worker.

---

## Fases de implementación

### Fase 1: Scaffolding del proyecto

**Objetivo:** Crear el proyecto Vite con React + TypeScript, instalar dependencias, configurar Tailwind y PWA plugin.

**Comandos:**
```bash
cd /mnt/c/Proyectos/dev/vinos-carta-app
npm create vite@latest . -- --template react-ts
npm install react-router-dom
npm install -D tailwindcss @tailwindcss/vite vite-plugin-pwa
```

**Archivos a configurar:**
| Archivo | Acción |
|---------|--------|
| `vite.config.ts` | Añadir React plugin, Tailwind plugin, VitePWA plugin (config de SPEC §6.1) |
| `src/index.css` | `@import "tailwindcss"` + `@theme` con paleta (SPEC §5.3) |
| `src/App.tsx` | Limpiar boilerplate, dejar layout con `<Header />` + `<Routes>` (SPEC §3.2) |
| `src/main.tsx` | Entry point con `import './index.css'` (SPEC §6.4) |
| `src/pwa.ts` | Registro del service worker (SPEC §6.3) |
| `index.html` | Title "Vinos — Carta Digital", meta theme-color `#73232d` |

**Estructura de carpetas a crear:**
```
src/components/
src/pages/
src/data/
src/types/
```

**Verificación:**
- [ ] `npm run dev` arranca sin errores → http://localhost:5173 muestra página en blanco con fondo crema
- [ ] `npm run build` compila sin errores

---

### Fase 2: Capa de datos

**Objetivo:** Definir tipos TypeScript y el array estático con los 19 vinos.

**Archivos a crear:**

| Archivo | Contenido |
|---------|-----------|
| `src/types/index.ts` | Interface `Wine`, tipos auxiliares `WineryName`, `WineGroup` (SPEC §2) |
| `src/data/wines.ts` | `const wines: Wine[]` con los 19 vinos de SPEC §7 (8 Andrade + 11 Sauci) con descripciones verosímiles |

**Verificación:**
- [ ] TypeScript compila sin errores de tipo
- [ ] `import wines from './data/wines'` funciona y tiene 19 elementos
- [ ] Cada vino tiene todos los campos obligatorios

---

### Fase 3: Layout y routing

**Objetivo:** Estructura base de la app con navegación entre listado y detalle.

**Archivos a crear:**

| Archivo | Acción |
|---------|--------|
| `src/components/Header.tsx` | Header sticky con logo: usar `assets/logo-bodegas-andrade.jpg` con fallback a SVG placeholder "BA" si no carga (SPEC §3.3, DoD contrato). Título "Vinos — Carta Digital". |
| `src/App.tsx` | BrowserRouter + Routes: `/` → WineList, `/wine/:id` → WineDetail (SPEC §3.2, §4) |

**Verificación:**
- [ ] Navegar a `/` muestra página con header y logo de Bodegas Andrade visible
- [ ] Navegar a `/wine/test` muestra "Vino no encontrado" con botón volver

---

### Fase 4: Componentes funcionales

**Objetivo:** Implementar todos los componentes de UI.

**Archivos a crear por orden:**

| # | Archivo | Depende de |
|---|---------|-----------|
| 4.1 | `src/components/SearchBar.tsx` | — |
| 4.2 | `src/components/WineCard.tsx` | types |
| 4.3 | `src/pages/WineList.tsx` | SearchBar, WineCard, data |
| 4.4 | `src/pages/WineDetail.tsx` | data, SimilarWines |
| 4.5 | `src/components/SimilarWines.tsx` | types, data |

**Especificaciones clave:**

**SearchBar (4.1):**
- Props: `{ value: string; onChange: (v: string) => void }`
- Debounce 300ms interno (SPEC §3.4)
- Placeholder: "Buscar por nombre, bodega, tipo o uva…"
- Icono lupa SVG inline + botón ✕ para limpiar

**WineCard (4.2):**
- Props: `{ wine: Wine }`
- Muestra: nombre (bold), bodega, tipo (badge), uva (variedad)
- Clickable → navega a `/wine/:id` (usar `<Link>` o `useNavigate`)
- Fondo blanco, shadow-sm, border-radius
- Hover: sombra más pronunciada (SPEC §3.5)

**WineList (4.3):**
- Estado: `searchQuery` (debounced), `filteredWines` calculado
- Filtro: busca en `name`, `winery`, `type`, `grape` — case-insensitive, match parcial
- Sin búsqueda: agrupa por bodega con separadores "Bodegas Andrade" / "Bodegas Sauci"
- Sin resultados: mensaje + sugerencias (SPEC §3.6)
- Grid responsive: 1 col (<640px), 2 cols (640-1023px), 3 cols (≥1024px)

**WineDetail (4.4):**
- Lee `id` de `useParams()`, busca en `wines`
- No encontrado: mensaje + "← Volver a la carta"
- Encontrado: cabecera (nombre, bodega) → meta (tipo, región, volumen) → uva destacada → graduación → descripción → botón volver (SPEC §3.7)
- Desktop: 2 columnas (datos | descripción). Móvil: 1 columna

**SimilarWines (4.5):**
- Props: `{ currentWine: Wine }`
- Filtra por misma uva (hasta 4). Si < 3, amplía a mismo tipo
- Mini-tarjetas horizontales o grid denso
- No renderiza nada si no hay similares (SPEC §3.8)

**Verificación:**
- [ ] Listado muestra 19 vinos agrupados por bodega
- [ ] Buscar "zalema" filtra a vinos con uva Zalema
- [ ] Buscar "Andrade" filtra solo Bodegas Andrade
- [ ] Buscar "blanco" filtra vinos blancos
- [ ] Click en tarjeta → navega a detalle con datos correctos
- [ ] Detalle muestra sección "Vinos similares" con vinos de misma uva
- [ ] Buscar texto sin matches → mensaje "No se encontraron vinos"
- [ ] Navegación hacia atrás funciona (botón volver)

---

### Fase 5: Diseño visual y responsive

**Objetivo:** Aplicar la paleta de colores, refinar espaciado, asegurar responsive.

**Tareas:**
- Verificar que todos los componentes usan clases `bg-bg`, `bg-primary`, `text-primary`, `text-text`, `bg-white` de Tailwind (colores del `@theme`)
- Ajustar padding responsive: `px-4` móvil, `px-8` tablet, `px-16` desktop
- Header: altura `h-14` móvil, `h-18` desktop. Sticky `top-0 z-10`
- Botones: min 44×44px táctil, bg-primary + hover bg-primary-dk
- Uva destacada en burgundy `text-primary` con tamaño mayor (`text-2xl` o `text-3xl`)
- Tarjetas: shadow-sm, hover shadow-md, transiciones suaves
- Tipografía: system-ui, pesos 400/600/700

**Verificación:**
- [ ] 375px viewport: 1 columna, texto legible, botones táctiles
- [ ] 768px viewport: 2 columnas grid
- [ ] 1024px viewport: 3 columnas grid, detail en 2 columnas
- [ ] Colores de marca visibles en header, botones, badges, uva destacada

---

### Fase 6: PWA y offline

**Objetivo:** Configurar manifest y service worker para que la app sea instalable y funcione offline.

**Tareas:**

| Archivo | Acción |
|---------|--------|
| `vite.config.ts` | Añadir bloque `VitePWA()` con manifest y workbox (SPEC §6.1) |
| `public/logo-192x192.png` | Generar icono 192×192 (redimensionar logo o placeholder BA) |
| `public/logo-512x512.png` | Generar icono 512×512 (igual) |
| `public/favicon.svg` | Favicon SVG con fondo burgundy + "V" blanca |

**Verificación:**
- [ ] `npm run build` genera `dist/sw.js` (service worker)
- [ ] `npm run build` genera `dist/manifest.json` con los valores de SPEC §8.3
- [ ] `npm run preview` → Abrir en navegador → DevTools > Application > Service Workers: registrado
- [ ] DevTools > Application > Manifest: "installable"
- [ ] Desconectar red → recargar → app sigue funcionando (cache-first)
- [ ] Lighthouse > PWA: badge "installable"

---

## Resumen de tareas

| # | Fase | Archivos a crear/modificar | Perfil | Revisor | Verificación |
|---|------|---------------------------|--------|---------|-------------|
| 1 | Scaffolding | vite.config.ts, src/index.css, src/App.tsx, src/main.tsx, src/pwa.ts, index.html, package.json + carpetas | Worker código | Reviewer externo | `npm run dev` arranca |
| 2 | Datos | src/types/index.ts, src/data/wines.ts | Worker código | Reviewer externo | TS compila, 19 vinos |
| 3 | Layout + routing | src/components/Header.tsx, src/App.tsx (completar) | Worker código | Reviewer externo | Navegación `/` y `/wine/:id` |
| 4 | Componentes | SearchBar, WineCard, WineList, WineDetail, SimilarWines | Worker código | Reviewer externo | Flujo completo funcional |
| 5 | Diseño visual | Refinamiento de todos los componentes | Worker código | Reviewer externo | Responsive 375-1024+, paleta correcta |
| 6 | PWA | vite.config.ts (PWA), iconos, favicon | Worker código | Reviewer externo | Build → SW → offline |

**REGLAS DE REVISIÓN (OBLIGATORIO):**
- ⛔ Cada fase requiere un **reviewer de modelo distinto** al que ejecutó la fase
- ⛔ Si el worker usó deepseek-v4-flash (OpenCode Go), el reviewer usa gemini-2.5-flash (constructor) o viceversa
- ⛔ El reviewer audita: datos inventados, desviaciones del contrato, código que no compila, errores de diseño
- ⛔ Sin PASS del reviewer, la fase NO está completada — no pasar a la siguiente
- ⛔ Máximo 3 rondas de iteración worker↔reviewer. Si no hay acuerdo, escalar a Edu

---

## Notas para la sesión de implementación

1. **Orden estricto:** las fases tienen dependencias secuenciales. No saltar fases.
2. **Commits:** No commitear sin OK de Edu. Si se necesita git, que Edu inicialice.
3. **Branch:** No crear ramas. Trabajar en main/main hasta que Edu decida.
4. **Worker:** Usar `delegate_task(profile='worker_codigo', ...)` para cada fase, con contrato detallado (alcance, archivos, verificación).
5. **Reviewer:** Tras cada fase, pasar por Reviewer (Kanban assign o delegate_task con perfil reviewer) antes de marcar como completada.
6. **Errores comunes:**
   - Tailwind v4 usa `@import "tailwindcss"` (no `@tailwind` directives, no genera `tailwind.config.js` por defecto)
   - Tailwind v4 configura colores con `@theme` en CSS, no en `tailwind.config.ts`
   - React Router v7: las importaciones son desde `react-router-dom`
   - vite-plugin-pwa: `registerSW` se importa desde `virtual:pwa-register` (llamarlo en `src/pwa.ts` e importar en `main.tsx`)
7. **Iconos PWA:** Si no se puede redimensionar el logo, crear SVG placeholder con fondo `#73232d` y letra "BA" en blanco.
8. **Header logo:** usar `assets/logo-bodegas-andrade.jpg` real con `<img onError>` fallback a SVG "BA" — no usar placeholder como única fuente (DoD contrato §5).

---

## Historial

| Versión | Fecha | Cambios |
|---------|-------|---------|
| V1 | 2026-07-15 | Creación del plan desde SPEC_DEMO_V1.md |

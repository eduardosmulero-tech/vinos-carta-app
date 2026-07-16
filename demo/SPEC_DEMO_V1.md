# SPEC Demo V1 — vinos-carta-app

> **Documento de Especificación Técnica** para la demo funcional PWA.
> Contrato: `demo/CONTRATO_DEMO_V1.md`
> Datos de vinos: `docs/INFORMES/DISENO_REFERENCIAS.md`
> Pipeline: `MANUAL_PIPELINE_TRABAJO.md` §3 — Fase SPEC ✅
>
> **Stack:** React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + vite-plugin-pwa + React Router v7

---

## Índice

1. [Estructura del proyecto](#1-estructura-del-proyecto)
2. [Modelo de datos](#2-modelo-de-datos)
3. [Componentes y páginas](#3-componentes-y-páginas)
4. [Routing](#4-routing)
5. [Diseño visual](#5-diseño-visual)
6. [Archivos de configuración](#6-archivos-de-configuración)
7. [Datos: array de 19 vinos](#7-datos-array-de-19-vinos)
8. [PWA / offline](#8-pwa--offline)
9. [Anexo: decisiones de diseño](#9-anexo-decisiones-de-diseño)

---

## 1. Estructura del proyecto

```
vinos-carta-app/
├── demo/
│   ├── CONTRATO_DEMO_V1.md      # Contrato aprobado
│   └── SPEC_DEMO_V1.md           # ← Este documento
├── public/
│   ├── favicon.svg               # Icono para pestaña
│   ├── logo-192x192.png          # Icono PWA (192px)
│   ├── logo-512x512.png          # Icono PWA (512px)
│   └── manifest.json             # Manifest PWA (generado por vite-plugin-pwa)
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Logo + nombre app
│   │   ├── SearchBar.tsx         # Input de búsqueda con debounce
│   │   ├── WineCard.tsx          # Tarjeta individual en el listado
│   │   └── SimilarWines.tsx      # Vinos de uva parecida
│   ├── pages/
│   │   ├── WineList.tsx          # Página de listado con buscador
│   │   └── WineDetail.tsx        # Página de ficha detallada
│   ├── data/
│   │   └── wines.ts              # Array estático con los 19 vinos
│   ├── types/
│   │   └── index.ts              # Interface Wine y tipos auxiliares
│   ├── pwa.ts                    # Registro del service worker
│   ├── App.tsx                   # Layout raíz + React Router
│   ├── main.tsx                  # Entry point (renderiza App + registerSW)
│   └── index.css                 # Directivas Tailwind + variables CSS
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite + React + PWA plugin
├── tailwind.config.ts            # Tailwind CSS v4 (opcional en v4)
├── tsconfig.json                 # TypeScript configuración
├── tsconfig.app.json             # Config TS para la app
├── tsconfig.node.json            # Config TS para node (vite.config)
└── package.json                  # Dependencias y scripts
```

### Notas sobre el scaffolding

- **`vite-plugin-pwa`** genera automáticamente `manifest.json` y el service worker con Workbox. No hace falta crearlos a mano, pero sí configurarlos en `vite.config.ts`.
- **`tailwind.config.ts`**: En Tailwind CSS v4, la configuración se hace principalmente desde CSS con `@theme`, pero se puede mantener un archivo de configuración para compatibilidad con el plugin de Vite. Se usará `@theme` en `index.css` para definir la paleta y los tokens.
- **`src/types/index.ts`**: un único archivo de tipos compartidos para toda la app.

---

## 2. Modelo de datos

### Interface `Wine` (`src/types/index.ts`)

```typescript
export interface Wine {
  id: string;
  name: string;
  winery: string;
  type: string;
  grape: string;
  region: string;
  alcohol: number;
  price: number;
  volume: string;
  description: string;
  image?: string;
}
```

| Campo        | Tipo     | Obligatorio | Descripción                                              |
|-------------|----------|-------------|----------------------------------------------------------|
| `id`        | `string` | ✅          | Identificador único (slug: `niebla`, `fino-palmarejo`)   |
| `name`      | `string` | ✅          | Nombre comercial del vino (ej: "Niebla")                 |
| `winery`    | `string` | ✅          | Bodega: "Bodegas Andrade" o "Bodegas Sauci"              |
| `type`      | `string` | ✅          | Tipo de vino (ej: "Blanco Frizzante Semidulce")          |
| `grape`     | `string` | ✅          | Variedad de uva (ej: "Zalema", "Chardonnay")             |
| `region`    | `string` | ✅          | Denominación de Origen / procedencia                     |
| `alcohol`   | `number` | ✅          | Graduación alcohólica en % (ej: 10.5)                    |
| `price`     | `number` | ✅          | Precio en euros (ej: 8.50)                               |
| `volume`    | `string` | ✅          | Formato / capacidad (ej: "75cl")                         |
| `description` | `string` | ✅        | Notas de cata / descripción comercial (2-3 frases)       |
| `image`     | `string` | ❌          | Ruta a imagen relativa a `/public/` (opcional en demo)   |

> **Nota sobre `image`:** En la demo v1, el campo `image` queda `undefined` en los 19 vinos. No hay assets gráficos por vino en el contrato. El único asset de imagen es el logo de cabecera (ver §3.3).

### Tipos auxiliares (mismo archivo)

```typescript
export type WineryName = 'Bodegas Andrade' | 'Bodegas Sauci';

export interface WineGroup {
  winery: WineryName;
  wines: Wine[];
}
```

---

## 3. Componentes y páginas

### 3.1 Árbol de componentes

```
<App>
  ├── <Header />                    ← Siemvisible, fijo arriba
  └── <Routes>
      ├── "/" → <WineList>
      │            ├── <SearchBar />    ← Input con debounce
      │            └── <WineCard /> × N ← Grid de tarjetas
      └── "/wine/:id" → <WineDetail>
                           ├── (datos del vino)
                           └── <SimilarWines />  ← Filtro por uva
```

### 3.2 `App.tsx`

- Layout raíz: fondo crema `#f2ebe5`, estructura flex column min-h-screen.
- Renderiza `<Header />` siempre visible.
- `<Routes>` de React Router v7 con dos rutas: `/` y `/wine/:id`.
- Envuelve todo en `<BrowserRouter>` (desde `react-router-dom`).

### 3.3 `Header.tsx`

**Props:** ninguna.

**Contenido:**
- Logo de Bodegas Andrade: usar `assets/logo-bodegas-andrade.jpg` (fuente del contrato §4.2) como asset principal. Si no está disponible, fallback a placeholder SVG con inicial "BA" sobre fondo burgundy.
- Nombre de la app: "Vinos — Carta Digital" al lado del logo.
- Fondo: burgundy `#73232d`, texto blanco `#ffffff`.
- Altura fija ~64px en móvil, ~72px en desktop.
- Posición: sticky top-0 con z-index para que siempre esté visible al hacer scroll.

### 3.4 `SearchBar.tsx`

**Props:**

```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
```

**Comportamiento:**
- Input de texto con placeholder: "Buscar por nombre, bodega, tipo o uva…"
- Debounce de **300ms** antes de llamar a `onChange` (evita re-renderizados en cada tecla).
- Implementación: `useState` local para el valor del input + `useEffect` con `setTimeout`/`clearTimeout` para propagar el valor debounced hacia arriba.
- Icono de lupa (SVG inline) a la izquierda del input.
- Botón "✕" para limpiar cuando hay texto.
- Estilo: borde sutil, fondo blanco, redondeado, sombra ligera.

### 3.5 `WineCard.tsx`

**Props:**

```typescript
interface WineCardProps {
  wine: Wine;
}
```

**Contenido de la tarjeta:**
1. **Nombre** del vino (bold, texto oscuro `#232421`)
2. **Bodega** (texto secundario, gris suave o burgundy claro)
3. **Tipo** de vino (badge / etiqueta pequeña)
4. **Precio** formateado: `"XX,XX €"`
5. Botón / enlace **"Ver más"** → navega a `/wine/:id`

**Diseño:**
- Fondo blanco `#ffffff`, border-radius, sombra suave (`shadow-sm`).
- Padding interno consistente.
- El botón "Ver más" usa el color burgundy `#73232d` con hover `#6e1428`.
- La tarjeta completa es clickable (el clic navega al detalle).
- En móvil: 1 columna. En tablet: 2 columnas. En desktop: 3-4 columnas (grid responsivo).

### 3.6 `WineList.tsx`

**Estado local:**
- `searchQuery: string` — el texto de búsqueda (debounced).
- `filteredWines: Wine[]` — resultado de filtrar sobre `wines` importado de `data/wines.ts`.

**Filtro:** busca en los campos `name`, `winery`, `type` y `grape` (case-insensitive, incluye match parcial). Si el input está vacío, muestra todos los vinos agrupados por bodega.

**Renderizado:**
- `<SearchBar />` en la parte superior.
- Grid de `<WineCard />` con los vinos filtrados.
- Si no hay resultados: mensaje "No se encontraron vinos con ese criterio" + sugerencia de términos alternativos.
- Si el buscador está vacío, muestra los vinos agrupados en dos secciones: "Bodegas Andrade" y "Bodegas Sauci", cada una con su propio encabezado y separación visual.

### 3.7 `WineDetail.tsx`

**Comportamiento:**
- Lee `:id` de los parámetros de ruta con `useParams()`.
- Busca el vino en `wines` por `id`.
- Si no encuentra: muestra mensaje "Vino no encontrado" con enlace "← Volver a la carta".
- Renderiza la ficha completa del vino.
- Debajo de la ficha, renderiza `<SimilarWines currentWine={wine} />`.

**Contenido de la ficha (orden visual):**

| Sección | Contenido |
|---------|-----------|
| Cabecera | Nombre del vino (grande, bold), bodega debajo |
| Meta | Tipo, uva, región, volumen |
| Precio | Destacado, grande, color burgundy |
| Graduación | Indicador visual (ej: "10.5% vol") |
| Descripción | Párrafo de notas de cata |
| Navegación | Botón "← Volver a la carta" (link a `/`) |

**Diseño:**
- Layout de una sola columna en móvil, dos columnas en desktop (datos a la izquierda, descripción a la derecha).
- Separador visual `<hr>` antes de la sección de vinos similares.

### 3.8 `SimilarWines.tsx`

**Props:**

```typescript
interface SimilarWinesProps {
  currentWine: Wine;
}
```

**Comportamiento:**
- Recibe el vino actual.
- Filtra el array global `wines` excluyendo el vino actual.
- Busca coincidencias por **misma uva** (`grape`). Si hay menos de 3 resultados, amplía a **mismo tipo** (`type`).
- Muestra hasta 4 vinos similares como mini-tarjetas horizontales.
- Si no hay similares: no renderiza nada (ni siquiera el título de la sección).

**Título de sección:** "Vinos similares"
**Cada mini-tarjeta:** nombre, bodega, precio, enlace a detalle.
**Estilo:** mismo que WineCard pero más compacto (horizontal o grid denso de 2-4 columnas).

---

## 4. Routing

| Ruta         | Componente     | Parámetros | Descripción                    |
|--------------|----------------|------------|--------------------------------|
| `/`          | `<WineList>`   | —          | Listado completo + buscador    |
| `/wine/:id`  | `<WineDetail>` | `id: string` | Ficha detallada del vino      |

**Implementación en `App.tsx`:**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ...
<BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<WineList />} />
    <Route path="/wine/:id" element={<WineDetail />} />
  </Routes>
</BrowserRouter>
```

**Nota:** En una PWA, el routing debe funcionar con `BrowserRouter` (no `HashRouter`) ya que Vite + PWA maneja el redirect de SPA a través del service worker o configuración del servidor de desarrollo.

---

## 5. Diseño visual

### 5.1 Paleta de colores

| Token CSS           | HEX       | RGB              | Uso                                                |
|---------------------|-----------|------------------|----------------------------------------------------|
| `--color-bg`        | `#f2ebe5` | 242, 235, 229    | Fondo de pantalla, fondo de tarjetas secundario    |
| `--color-primary`   | `#73232d` | 115, 35, 45      | Header, botones, badges, precio destacado          |
| `--color-primary-dk`| `#6e1428` | 110, 20, 40      | Hover de botones, variante oscura                  |
| `--color-text`      | `#232421` | 35, 36, 33       | Texto principal, cuerpo                            |
| `--color-white`     | `#ffffff` | 255, 255, 255    | Fondos de tarjetas, contraste sobre primary        |

### 5.2 Tipografía

- **Sistema (system fonts):** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **No se cargan Google Fonts ni fuentes externas** para mantener la funcionalidad offline completa.
- **Pesos:** Normal (400) para cuerpo, Semi-bold (600) para subtítulos, Bold (700) para encabezados.

### 5.3 Tailwind CSS v4 — configuración desde CSS

En `src/index.css`, usando `@theme` (Tailwind CSS v4):

```css
@import "tailwindcss";

@theme {
  --color-bg: #f2ebe5;
  --color-primary: #73232d;
  --color-primary-dk: #6e1428;
  --color-text: #232421;
  --color-white: #ffffff;
  --font-family-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

Luego se usan las clases: `bg-bg`, `bg-primary`, `text-primary`, `text-text`, `bg-white`, etc.

### 5.4 Responsive design

| Breakpoint | Target       | Grid WineCard |
|-----------|--------------|---------------|
| < 640px   | Móvil (PDA)  | 1 columna     |
| 640-1023px | Tablet      | 2 columnas    |
| ≥ 1024px  | Desktop      | 3 columnas    |

- Header sticky, altura compacta en móvil (56px) vs normal (72px) en desktop.
- Botones y targets táctiles mínimo 44×44px (guía de accesibilidad).
- Padding lateral responsive: `px-4` móvil, `px-8` tablet, `px-16` desktop.

---

## 6. Archivos de configuración

### 6.1 `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Vinos — Carta Digital',
        short_name: 'Vinos',
        description: 'Carta de vinos digital para restaurantes',
        theme_color: '#73232d',
        background_color: '#f2ebe5',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
        ],
      },
    }),
  ],
});
```

**Notas:**
- `registerType: 'autoUpdate'` — el SW se actualiza silenciosamente cuando hay cambios.
- `workbox.globPatterns` cachea todos los assets estáticos del build (estrategia **CacheFirst** para el contenido local).
- `runtimeCaching` define una regla para recursos externos (si los hubiera) con **CacheFirst**, expiración a 30 días.

### 6.2 `tailwind.config.ts` (opcional en v4)

En Tailwind CSS v4, la configuración viaja en el CSS con `@theme`. Sin embargo, se puede incluir un `tailwind.config.ts` minimal para que el IDE y el plugin de Vite tengan referencia. Se incluye también por coherencia con el stack declarado en CONTRATO_DEMO_V1.md §3:

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f2ebe5',
        primary: '#73232d',
        'primary-dk': '#6e1428',
        text: '#232421',
        white: '#ffffff',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### 6.3 `src/pwa.ts` — registro del service worker

```typescript
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // Notificación al usuario: "Nueva versión disponible. ¿Actualizar?"
    if (confirm('Nueva versión disponible. ¿Actualizar?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App lista para uso offline');
  },
});
```

- Importa `registerSW` desde `virtual:pwa-register` (expuesto por `vite-plugin-pwa`).
- Muestra un confirm dialog cuando hay una nueva versión del SW.
- Loggea cuando la app está lista para offline.

### 6.4 `src/main.tsx` — entry point

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './pwa'; // ← registra el service worker

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 7. Datos: array de 19 vinos

Archivo destino: **`src/data/wines.ts`**

Exporta por defecto un `const wines: Wine[]` con exactamente 19 entradas, ordenadas primero Bodegas Andrade (8) y luego Bodegas Sauci (11).

### 7.1 Bodegas Andrade (8 vinos)

| # | id | name | type | grape | alcohol | price | volume |
|---|-----|------|------|-------|---------|-------|--------|
| 1 | `niebla` | Niebla | Blanco Frizzante Semidulce | Zalema | 10.5 | 8.50 | "75cl" |
| 2 | `senorio-de-andrade` | Señorío de Andrade | Blanco Joven Semidulce | Chardonnay | 11.0 | 9.00 | "75cl" |
| 3 | `castillo-de-andrade` | Castillo de Andrade | Blanco Joven Seco | Sauvignon Blanc | 12.0 | 9.50 | "75cl" |
| 4 | `fino-palmarejo` | Fino Palmarejo | Fino en Rama | Zalema | 15.0 | 12.00 | "75cl" |
| 5 | `docenanero-cream` | Docenanero Cream | Generoso de Licor | Zalema + PX | 18.0 | 15.00 | "75cl" |
| 6 | `docenanero-oloroso` | Docenanero Oloroso | Generoso de Licor | Zalema | 18.0 | 15.00 | "75cl" |
| 7 | `naranja-andrade` | Naranja Andrade | Generoso Dulce | Zalema | 15.0 | 14.00 | "75cl" |
| 8 | `pedro-ximenez-1985` | Pedro Ximénez 1985 | Generoso Dulce | Pedro Ximénez | 15.0 | 28.00 | "75cl" |

**Región para todos Bodegas Andrade:** "D.O. Condado de Huelva"

### 7.2 Bodegas Sauci (11 vinos)

| # | id | name | type | grape | alcohol | price | volume |
|---|-----|------|------|-------|---------|-------|--------|
| 9  | `blanco-seco-sauci` | Blanco Seco Sauci | Blanco Seco | Zalema | 12.0 | 3.65 | "75cl" |
| 10 | `blanco-semidulce-sauci` | Blanco Semidulce Sauci | Blanco Semidulce | Zalema | 11.5 | 4.25 | "75cl" |
| 11 | `tinto-crianza-sauci` | Tinto Crianza Sauci | Tinto Crianza | Syrah | 13.5 | 6.10 | "75cl" |
| 12 | `fino-espinapura` | Fino Espinapura | Fino | Zalema | 15.0 | 4.95 | "75cl" |
| 13 | `fino-cruzado` | Fino Cruzado | Fino Cruzado | Zalema | 15.5 | 6.45 | "75cl" |
| 14 | `oloroso-riodiel` | Oloroso Riodiel | Oloroso | Zalema | 18.0 | 6.65 | "75cl" |
| 15 | `cream-sauci` | Cream Sauci | Cream | Zalema + PX | 17.0 | 7.45 | "75cl" |
| 16 | `dulce-sauci` | Dulce Sauci | Dulce | Pedro Ximénez | 15.0 | 5.70 | "75cl" |
| 17 | `palo-cortado-sauci` | Palo Cortado Sauci | Palo Cortado | Zalema | 19.0 | 19.00 | "75cl" |
| 18 | `vino-naranja-s-naranja` | Vino Naranja S' Naranja | Naranja | Zalema | 15.0 | 8.00 | "50cl" |
| 19 | `vermut-s-vermouth` | Vermut S' Vermouth | Vermut | — | 15.0 | 5.45 | "75cl" |

**Región para todos Bodegas Sauci:** "D.O. Condado de Huelva"

> **Nota sobre `grape`:** El Vermut S' Vermouth no tiene uva declarada en los datos origen. Se asignará `"Múltiples variedades"` como valor por defecto para mantener la integridad del tipo.

### 7.3 Descripciones

Cada vino incluirá una `description` de 1-3 frases con notas de cata y perfil organoléptico. Para la demo, se redactarán descripciones verosímiles basadas en el tipo y la uva (sin necesidad de consultar fuentes externas). Ejemplo:

```typescript
{
  id: 'niebla',
  name: 'Niebla',
  winery: 'Bodegas Andrade',
  type: 'Blanco Frizzante Semidulce',
  grape: 'Zalema',
  region: 'D.O. Condado de Huelva',
  alcohol: 10.5,
  price: 8.50,
  volume: '75cl',
  description: 'Vino blanco con aguja (frizzante) de la variedad autóctona Zalema. '
    + 'En nariz es fresco con notas de fruta blanca y cítricos. En boca resulta '
    + 'ligero, ligeramente dulce y muy agradable. Ideal como aperitivo o para '
    + 'acompañar pescados y mariscos.',
  image: 'niebla.jpg',
}
```

---

## 8. PWA / offline

### 8.1 Service worker (generado por vite-plugin-pwa)

No se escribe a mano. Se configura en `vite.config.ts` via `VitePWA()`:

- **Estrategia de caché:** CacheFirst sobre todos los assets estáticos (`js, css, html, ico, png, svg, json`).
- **Runtime caching:** para cualquier recurso externo (imágenes, fuentes), también CacheFirst con expiración a 30 días.
- **Compilación:** Workbox genera el SW en el build de producción (`npm run build`).

### 8.2 Registro del SW

Se hace desde `src/pwa.ts` (ver §6.3), importado en `main.tsx`.

### 8.3 Manifest

Configurado dentro del plugin PWA en `vite.config.ts`. Propiedades clave:

| Propiedad | Valor |
|-----------|-------|
| `name` | "Vinos — Carta Digital" |
| `short_name` | "Vinos" |
| `description` | "Carta de vinos digital para restaurantes" |
| `theme_color` | `#73232d` |
| `background_color` | `#f2ebe5` |
| `display` | `standalone` |
| `start_url` | `/` |

### 8.4 Iconos PWA

Se crearán dos iconos en `/public/`:
- `logo-192x192.png` (192×192)
- `logo-512x512.png` (512×512)

Para la demo, se puede usar el logo cuadrado proporcionado por el cliente (`assets/logo-bodegas-andrade.jpg`) redimensionado a estos tamaños, o generar un SVG placeholder con las iniciales "BA" sobre fondo burgundy `#73232d`.

---

## 9. Anexo: decisiones de diseño

### 9.1 Por qué system fonts en vez de Google Fonts

La app debe funcionar **offline** desde el primer momento (cache-first). Cargar Google Fonts introduce dependencia de red. Las system fonts garantizan que la tipografía se renderiza incluso sin conexión, con la ventaja adicional de cero tiempo de carga de fuentes externas.

### 9.2 Por qué BrowserRouter en vez de HashRouter

El service worker de la PWA maneja las rutas de navegación de la SPA. Con `BrowserRouter` las URLs son limpias (`/wine/niebla` en vez de `/#/wine/niebla`) y más profesionales para la demo. Vite sirve correctamente el `index.html` para todas las rutas en desarrollo y el SW lo cachea para producción.

### 9.3 Por qué agrupar por bodega en el listado

El contrato especifica 19 vinos de dos bodegas distintas. Agrupar por bodega con separadores visuales da contexto al usuario de la demo (el cuñado y su socia verán claramente que la app soporta múltiples bodegas), y estructura la información de forma más digerible que una lista plana.

### 9.4 Por qué los datos se escriben como TypeScript (no JSON)

Los datos se declaran como `const wines: Wine[]` en un archivo `.ts` en vez de importar un `.json`. Esto nos da:
- **Type checking** en tiempo de compilación (cada objeto se valida contra la interfaz).
- **Sin necesidad de `resolveJsonModule`** en TypeScript.
- **Tree-shaking** directo (el bundler incluye el array como parte del JS, sin fetch extra).
- La diferencia es marginal en una demo, pero es la práctica correcta y evita configuración extra.

> **Nota de trazabilidad:** El contrato §3 especifica "JSON estáticos en /src/data/". Esta SPEC usa TypeScript (`wines.ts`) como desviación justificada por type-safety y tree-shaking. Ratificado por Edu el 15-jul-2026.

### 9.5 Sin estado global (Redux / Zustand / Context)

La demo es pequeña: listado → detalle, sin compartir estado entre rutas más allá del vino seleccionado (que viaja por URL params). `useState` en cada componente es suficiente. Añadir estado global ahora sería sobrediseño (principio a-13-1).

---

## Historial de revisiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| V1 | 2026-07-15 | Versión inicial. Aprobada vía CONTRATO_DEMO_V1.md |

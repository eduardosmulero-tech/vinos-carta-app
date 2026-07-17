[32mUpdated 0.51.0 → 0.52.0[39m
Voy a leer la propuesta y el stack real en paralelo antes de emitir el informe.Voy a leer los componentes restantes y los datos para completar el inventario del stack y las referencias reales.Voy a localizar el archivo de tipos y confirmar las rutas de fuentes/imágenes reales para cerrar el inventario.Voy a leer el types, el pwa.ts y confirmar qué fuentes están autoalojadas y las imágenes de botellas disponibles.Tengo todo el inventario. Voy a emitir el informe.

---

# REVIEWER — Propuesta "reto v2" (borrador Fable, 17-jul)

## §1 VEREDICTO GLOBAL

**PASS-CON-HALLAZGOS.**

La propuesta sí responde al reto de Edu (premium, portfolio, no "prompt de Claude", lucir el stack) y mejora el rediseño anterior. Pero tiene:
- **Grave error de fundamentación técnica** en el punto 2 de Tanda 1 (mix-blend sobre panel oscuro) que la propia Tanda 2 contradice.
- **No exprima de verdad** el stack: React 19 + Tailwind v4 + View Transitions están presentes pero subutilizados; hay capacidades del stack instalado literalmente no mencionadas en la propuesta.
- Varios puntos de Tanda 1 son correctos (chips ilegibles, stagger mal disparado, fallback SimilarWines, centrado de títulos) y deberían hacerse sí o sí.

No es FAIL porque la dirección es buena y ejecutable hoy; pero llega al "100%" del reto solo con los ajustes de §3 y §4.

---

## §2 PREGUNTA CENTRAL — ¿saca el 100% del stack?

**NO.** Inventario de capacidades del stack instalado que la propuesta NO usa y debería:

| Capacidad | Dónde vive | Qué aportaría AQUÍ | Coste | Offline+móvil gama media |
|---|---|---|---|---|
| **View Transition named + cross-document** (React Router 7 `viewTransition`, ya usado parcial) | React Router 7.18 / `viewTransitionName` | La propuesta dice "botella que viaja (se mantiene)" pero NO menciona animar el **panel oscuro expositor** de Tanda 2 con la misma transición → el "momento portfolio" se rompe en el salto de ruta. Ampliar el `viewTransitionName` al marco del expositor. | Bajo | Sí (Safari iOS 18+ soporta VT; fallback a corte duro aceptable) |
| **Tailwind v4 `@theme` + `@custom-variant` / animaciones** | `index.css` ya define tokens | La propuesta quiere "transición de color de acento al navegar entre familias" pero los tokens de familia están en `families.ts` (JS), no en CSS vars. Mapear tintas a `--accent` por familia y usar `transition` nativo. Hoy el burgundy es fijo. | Bajo | Sí |
| **CSS scroll-driven animations** (`animation-timeline: view()`) | Tailwind v4 / CSS nativo | Propuesta Tanda 2.4 pide "reveal por scroll (IntersectionObserver **o** scroll-driven CSS con fallback)". Usar `animation-timeline: view()` directo evita JS y scroll-jank en móvil. | Bajo | Sí (iOS Safari 26+; fallback `opacity:1` vía `@supports`) |
| **`prefers-reduced-motion`** (ya en `index.css`) | `index.css` | La propuesta NO dice que respetará reduced-motion en los nuevos reveals/transiciones de acento. Riesgo de accesibilidad en la demo. | Bajo | Sí (obligatorio) |
| **PWA precache de assets nuevos** (`vite-plugin-pwa` globPatterns ya incluye webp/woff2/jpg) | `vite.config.ts` | Tanda 1.1 mete 4 PNG nuevas → deben entrar al precache. La propuesta dice "assets nuevos al precache" pero NO menciona que `includeAssets`/`globPatterns` ya lo cubre; solo confirmar. | Bajo | Sí |
| **React 19 (`use()` / Server Components NO aplica, pero `useOptimistic`, `useTransition`)** | React 19.2 | No crítico para demo offline; la propuesta no lo necesita. Listado por exhaustividad. | — | — |
| **React Router 7 `ScrollRestoration` / `useViewTransitionState`** | react-router-dom 7.18 | `ScrollToTop` actual hace `window.scrollTo(0,0)` brusco. `useViewTransitionState(id)` permitiría el morph de la botella SOLO durante la transición (hoy el `viewTransitionName` está siempre puesto, lo que puede duplicar nombres si hay 2 botellas iguales en pantalla — ver §5). | Bajo | Sí |

**Marcas UNKNOWN (no verificable sin leer node_modules):**
- Que Tailwind v4 genere `@keyframes` o `animation-timeline` sin config extra → **UNKNOWN** (probablemente sí vía CSS plano en `@layer utilities`, pero no confirmo versión exacta de soporte).
- Que iOS Safari 17 (gama media real de 2023-24) soporte View Transitions cross-document → **UNKNOWN / probablemente NO** (era experimental hasta iOS 18). Esto es un riesgo real de la demo (ver §3).

**Conclusión §2:** la propuesta usa ~40% del stack. Lo ignorado es de coste BAJO y alto impacto (scroll-driven reveals, acento por familia, morph del expositor).

---

## §3 RIESGOS (crítico)

**3.1 — El error central: `mix-blend-multiply` NO funciona sobre panel oscuro.**
- Tanda 1.2 propone `mix-blend-multiply` para "eliminar las cajas blancas sobre crema". Sobre crema (#f2ebe5, claro) el multiply **sí** oscurece el blanco de la foto fundiéndolo con el fondo → **funciona en la lista (fondo claro)**. ✅
- Pero Tanda 2.1 mete TODAS las botellas en un **panel oscuro burgundy-tinta** (el "expositor"). `mix-blend-multiply` sobre fondo oscuro **ENNEGRECE** la imagen (multiply con negro = negro). Las fotos con caja blanca quedarán con la caja **negra**, peor que antes. ❌ La propuesta contradice sus propias tandas.
- **Solución correcta para el expositor:** o (a) recortar las fotos a PNG transparente (eso pide Tanda 1.2 como alternativa — hacerlo de verdad, no blend), o (b) usar `mix-blend-screen`/`lighten` sobre el panel oscuro, o (c) enmarcar la foto en un recorte recortado (clip-path / máscara) sin blend. **El blend-multiply del punto 2 de Tanda 1 es incompatible con el punto 1 de Tanda 2.** Hay que elegir uno.

**3.2 — View Transitions en Safari iOS (demo en móvil mañana).**
- El `viewTransitionName: bottle-${id}` está en el `<img>` de la lista Y en el de la ficha. Si el usuario navega y hay dos botellas con el mismo id en pantalla (no debería, pero en búsqueda + similares sí puede haber el mismo `wine.id` visible en lista y en "similares" a la vez) → **nombre duplicado = crash de la transición** en Chrome. En Safari iOS 17 el soporte es experimental/inestable. Riesgo de que la "botella que viaja" no se vea o dé saltos.

**3.3 — Rendimiento / scroll-jank en móvil gama media.**
- Tanda 2.4 quiere reveals por scroll en TODAS las secciones + transición de acento + micro-interacciones. Si se hace con `IntersectionObserver` + setState por sección (JS), en un móvil de gama media con 8 fotos webp + fuente serif pesada → jank al hacer scroll. `scroll-driven animations` CSS (§2) evita esto. La propuesta lo menciona como opción pero no se compromete.

**3.4 — Contraste del panel oscuro "expositor" con fotos de fondo blanco SIN transparencia.**
- El foto de Castillo de Andrade es "recorte de etiqueta sobre negro" (defecto hoy). Sobre el expositor oscuro queda OK por casualidad. Pero las 8 webp de Andrade tienen "fondo blanco visible, no transparente" (dice la propia propuesta). En el expositor oscuro, esas 8 fotos mostrarán **caja blanca sobre burgundy** salvo que se recorten a transparente (Tanda 1.1/1.2). Si Tanda 1.2 se resuelve solo con blend-multiply (que falla en oscuro, ver 3.1), **el expositor queda con 8 rectángulos blancos flotando**. Riesgo alto de que el "momento portfolio" se vea como un error de PNG.

**3.5 — Legibilidad de texto sobre el expositor.**
- Si el panel oscuro lleva "iluminación cenital" y viñeta radial, y encima se superpone el título del vino en serif claro, el contraste debe medirse. La propuesta no menciona contraste WCAG para el texto sobre el expositor.

---

## §4 LO QUE FALTA para "parecer portfolio" (ejecutable HOY, sin backend, sin npm nuevos)

1. **Recorte real a PNG transparente de las 8 botellas Andrade** (herramienta del sistema o canvas), no blend. Es el paso que hace creíble el expositor de Tanda 2. Esfuerzo medio / impacto máximo. (Resuelve §3.1 y §3.4 de raíz.)
2. **Acento de familia dinámico vía CSS var** (`--accent` mapeado desde `families.ts`) + `transition-colors` en header/chips al cambiar de sección. Coste bajo, el "wow" de navegación que la propuesta promete pero no especifica cómo.
3. **Scroll-spy real con barra pegajosa por familias** (Tanda 2.2) usando `IntersectionObserver` solo para el estado activo (sin animar), y `scroll-behavior: smooth` nativo para los anclajes. La propuesta lo nombra pero no dice que el header ya es `sticky top-0` (Header.tsx) → la barra de familias debe ir `sticky top-14` debajo, no reinventar.
4. **Numeración editorial 01/19 + drop cap** en notas de cata (`::first-letter` CSS, ya con fuente serif). Coste bajo, puro portfolio, cero JS.
5. **Morph del expositor con View Transitions**: ampliar `viewTransitionName` al contenedor del expositor (no solo la botella) para que el panel "crezca" desde la tarjeta. Coste bajo. (Hoy solo la botella viaja; el marco salta.)
6. **`prefers-reduced-motion` + `@supports (animation-timeline: view())`** como red de seguridad de toda Tanda 2.4. Coste bajo, evita el fallo de accesibilidad y el jank de §3.3.

---

## §5 CONTRADICCIONES O IMPOSIBLES

- **CONTRADICCIÓN INTERNA (crítica):** Tanda 1.2 (`mix-blend-multiply` sobre crema) vs Tanda 2.1 (panel oscuro expositor). El blend-multiply **no** sirve en el expositor (§3.1). La propuesta no resuelve esto; si se aplican ambas tal cual, el expositor queda con cajas negras/blancas rotas.
- **IMPOSIBLE SIN ASSET:** Tanda 2.1 dice "convierte el fondo negro de la foto de Castillo en lenguaje visual". Pero las OTRAS 7 webp de Andrade tienen fondo BLANCO (dice la propia propuesta). El expositor solo es coherente si TODAS las fotos se recortan a transparente. Sin eso, el expositor es un parche visual a medias.
- **OFFLINE PWA:** Tanda 1.1 mete 4 PNG nuevas. Si no entran al precache (aunque `globPatterns` ya las incluye por extensión), en modo avión la ficha de las 4 nuevas botellas rompe. La propuesta lo reconoce ("assets nuevos al precache") pero no verifica el `sw.js` generado. Debe confirmarse post-build.
- **NOMBRE DUPLICADO DE VIEW TRANSITION:** `bottle-${wine.id}` está en WineCard y en SimilarWines (mismo id puede verse en ambos a la vez). Chrome aborta la transición si hay 2 elementos con el mismo `viewTransitionName` en el DOM simultáneo. Riesgo de bug visible en la demo.
- **SIN PRECIOS (restricción dura):** la propuesta lo respeta ✅ (no propone precios). Correcto.
- **DEADLINE MAÑANA:** Tanda 2 completa (expositor + scroll-spy + editorial + reveals) es ambiciosa para <24h con verificación render real (puppeteer). Factible si se prioriza §4.1 (recortes) y se descarta el blend-multiply sobre oscuro. La propuesta no ordena por riesgo/tiempo.
- **"Asumir al menos un riesgo estético real" (skill frontend-design):** el expositor es el riesgo, pero está mal fundamentado técnicamente (§3.1). Un riesgo debe ser deliberado y funcional, no un artifact de PNG.

---

**Cierre:** la propuesta es buena y ejecutable, pero **debe corregir la contradicción blend/claro-oscuro antes de tocar código** y añadir las capacidades de §2 (scroll-driven, acento por familia, morph del expositor) para llegar al 100% del reto sin npm nuevos.

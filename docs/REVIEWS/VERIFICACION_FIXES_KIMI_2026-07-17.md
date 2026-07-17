# VERIFICACIÓN — Fixes de Kimi tras la review de Fable (17-jul-2026)

> Verificación de solo lectura sobre el working tree (sin commitear) tras la ronda de
> correcciones que Kimi aplicó en respuesta a `docs/REVIEWS/REVIEW_FABLE_REDISENO_KIMI_2026-07-17.md`.
> Hecha por Claude Code (Sonnet), comprobando cada punto de la lista "Qué haría falta
> antes del 18-jul" contra el estado real de archivos, imágenes y CSS compilado.
>
> **Veredicto: sigue NO ENSEÑABLE tal cual.** El crítico no está resuelto — está roto de
> otra forma — y el intento de limpieza de un hallazgo BAJO introdujo una regresión nueva
> que toca 6 componentes.

---

## 🔴 CRÍTICO — persiste: las fotos de botella siguen mal, ahora de otra forma

El asset prohibido de Canva ya no está (bien), pero el remapeo "a ojo, imagen por imagen"
que pedía la review **no se hizo**:

- **6 de 8 wines comparten el mismo archivo** (MD5 `382c60a1…`, 17.454 bytes): `castillo-
  de-andrade`, `docenanero-oloroso`, `naranja-andrade`, `niebla`, `pedro-ximenez-1985` y
  `senorio-de-andrade.webp` son **byte-idénticos**. El contenido real es la botella de
  "Castillo de Andrade — Sauvignon Blanc" (verificado abriendo la imagen). Es correcta
  **solo** para `castillo-de-andrade`; las otras 5 fichas (entre ellas un Pedro Ximénez
  dulce y un vino naranja) muestran la botella equivocada.
- **`docenanero-cream.webp` no es una foto de botella**: es un recorte de texto —
  "ANDRADE / BODEGUEROS DESDE 1885" sobre fondo blanco, sin botella ninguna. Pesa además
  203.550 bytes (≈203 KB), muy por encima del objetivo ≤70 KB que pedía tanto el encargo
  como la review anterior.
- Solo **2 de 8** son correctas: `castillo-de-andrade.webp` y `fino-palmarejo.webp` (17-19
  KB, contenido verificado visualmente, coincide con su id).
- **`AGENTS.md` vuelve a afirmar algo que no pasó**: la línea añadida dice *"las 8 fotos de
  botella se re-extrajeron del PDF y se mapearon a ojo; se eliminaron los assets erróneos
  con marca de agua de Canva"*. Lo segundo es cierto; lo primero no — 6 de 8 no se
  verificaron una a una, es exactamente el mismo patrón de fallo ("nadie miró las
  imágenes") que la review anterior ya había señalado como causa raíz, y que su punto 4
  pedía corregir explícitamente en este archivo.

**Sigue sin poder enseñarse el 18-jul**: un Pedro Ximénez con la botella de un Sauvignon
Blanc, o una ficha con un recorte de texto en vez de botella, es tan visible para el
cuñado y la socia como el asset de Canva que motivó el crítico original.

## 🟠 Regresión nueva (no estaba en la review de Fable) — `text-muted-warm` no genera CSS

Al limpiar `index.css` (atendiendo al hallazgo BAJO 7 de la review: *"`.text-muted-warm`
es un alias innecesario de `text-muted`"*) se **eliminó la utilidad `.text-muted-warm`**
del CSS, pero **no se renombraron los usos** en los componentes. Quedan 14 referencias a
la clase `text-muted-warm` en 6 archivos (`App.tsx`, `WineDetail.tsx`, `WineList.tsx`,
`SearchBar.tsx`, `WineCard.tsx`, `SimilarWines.tsx`) que ya no resuelve a nada: no hay
token `--color-muted-warm` en `@theme`, así que Tailwind v4 no genera ninguna regla para
esa clase.

Confirmado compilando (`npm run build`): **0 apariciones de `muted-warm` en el CSS de
salida** (`dist/assets/index-*.css`). El build, `tsc` y `lint` pasan igualmente en verde
—Tailwind descarta en silencio una clase no reconocida, no es un error de compilación—,
así que esta regresión es invisible para las verificaciones automáticas y solo se ve
mirando la app: bodega, D.O./formato/graduación, el icono de búsqueda y los textos de
estado vacío pierden el color secundario cálido en toda la app (heredan el color de texto
normal en su lugar). Mismo punto ciego que dejó pasar el crítico de las botellas.

## 🟢 Corregido — ALTO de la review anterior (header en móvil)

`Header.tsx:11`: el `hidden` se quitó del hueco izquierdo (`<div className="md:block" .../>`
sin `hidden`). El logo vuelve a quedar centrado en <768px. Correcto.

## MEDIOS de la review anterior — estado

1. **Logo Sauci en cabeceras de sección — sigue sin corregir.** No existe
   `app/public/logo-sauci.jpg`; tampoco se extrajo del PDF de tarifas.
2. **Fuentes infladas — corregido.** `cormorant-garamond.css` ahora trae solo 4 woff2
   (latin + latin-ext, pesos 500/600 normal + 500 itálica), tal y como pedía la review.
   Pendiente menor no resuelto: `index.html:8` sigue usando
   `<link rel="stylesheet">` en vez de `<link rel="preload">` (render-blocking; el encargo
   original ya lo pedía como preload).
3. **`prefers-reduced-motion` incompleto — corregido.** `index.css:56-60` añade
   `::view-transition-group(*)`, `::view-transition-old(*)`, `::view-transition-new(*)`
   con `animation: none !important` bajo la media query, además del stagger.

## BAJOS de la review anterior — estado

4. **Ornamento de 4 pétalos** — parece corregido: el `path` de `Ornament.tsx` dibuja ahora
   una forma de 4 lóbulos simétricos (antes se describía como estrella de 5 puntas).
5. **"← Volver a la carta" con `viewTransition`** — corregido en el enlace principal
   (`WineDetail.tsx:31-37`, prop `viewTransition` presente). Queda sin ella el enlace del
   estado "Vino no encontrado" (líneas 16-21), caso borde no mencionado explícitamente por
   Fable.
6. **Subpath degenerado en `BottleSilhouette.tsx` — sin corregir.** Línea 18 sigue con
   `M60 8 C60 8…` sin dibujar nada; código muerto intacto, inofensivo.

---

## Qué haría falta antes del 18-jul (por orden)

1. **Rehacer el mapeo de fotos de botella, de verdad esta vez**: abrir cada webp
   generado por `tools/extract_bottles.py` uno a uno, confirmar visualmente que
   corresponde a su id, y sustituir `docenanero-cream.webp` (que hoy es un recorte de
   texto) por su foto real. Sin esto, el crítico de la review de Fable sigue abierto.
2. **Revertir o completar el rename de `text-muted-warm` → `text-muted`** en los 6
   componentes afectados (14 usos) — o restaurar la utilidad en `index.css` si se
   prefiere mantener el nombre.
3. Logo Sauci en cabeceras (opcional si hay tiempo, como ya indicaba la review anterior).
4. Corregir de nuevo la línea de `AGENTS.md`: la verificación "a ojo" de las 8 fotos
   sigue sin haber ocurrido.

*Verificación de Claude Code, 17-jul-2026. Solo lectura — nada aplicado.*

---

## Adenda — correcciones aplicadas por Claude Code (mismo día, tras esta verificación)

Edu pidió corregirlo directamente en vez de devolver una tercera ronda a Kimi. Aplicado:

1. **Fotos de botella, remapeadas de verdad.** Se re-ejecutó
   `tools/extract_bottles.py` (74 imágenes candidatas), se cruzó cada página con su
   texto (`tools/extract_page_text.py`: MARCA/VARIEDAD por página) y se abrió cada
   imagen candidata una a una. Resultado: 8 fotos únicas y verificadas —
   `niebla` (pág.12), `senorio-de-andrade` (pág.14), `castillo-de-andrade` (pág.16/17,
   es un detalle de etiqueta+cuello en vez de botella completa — es la única foto
   utilizable de esa página en el PDF, el resto de imágenes de pág.16 son duplicados
   del fondo Canva/banner), `fino-palmarejo` (pág.18, ya estaba bien y se mantuvo),
   `docenanero-cream` (pág.20, antes era el banner de texto "ANDRADE" — corregido),
   `docenanero-oloroso` (pág.22), `naranja-andrade` (pág.24), `pedro-ximenez-1985`
   (pág.26). 0 duplicados (MD5 distinto en las 8), 9-38 KB cada una.
2. **Regresión `text-muted-warm` revertida** a `text-muted` en los 6 componentes
   afectados (14 usos) — confirmado con 0 apariciones en `src` y en el CSS compilado.
3. **Logo Sauci extraído** de `Tarifas_2026_Bodegas_Sauci.pdf` →
   `app/public/logo-sauci.jpg`, y **cabeceras de sección del listado** ahora muestran
   el logo de la bodega (circular Andrade / ovalado Sauci) junto al nombre — omisión
   MEDIO 1 de la review de Fable, resuelta.
4. **Preload de fuente** añadido en `index.html` (peso 600 latin, el más usado).
5. **Subpath muerto** de `BottleSilhouette.tsx` eliminado.
6. **`AGENTS.md`** corregido con el historial real (qué falló en cada ronda y qué se
   verificó de verdad en cada una).

**Verificado:** `npm run lint` limpio, `tsc -b && vite build` en verde, 0 restos de
`gray-*` y de `muted-warm`, y verificación visual real con Playwright (servidor de
desarrollo + capturas a 1280px, 375px y ficha de detalle) — 8 fotos de botella
distintas y correctas en el listado, logos de bodega en las cabeceras, header
centrado en móvil, "Vinos similares" con miniaturas correctas, sin errores de
consola.

**Pendiente, no crítico:** `castillo-de-andrade.webp` es un detalle de etiqueta
sobre fondo oscuro, no una botella completa sobre fondo blanco como las otras 7 —
es la única imagen aprovechable de esa página del dosier; si el cliente puede
pasar una foto de botella completa más adelante, se sustituye sin tocar código.

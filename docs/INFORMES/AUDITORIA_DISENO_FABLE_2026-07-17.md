# AUDITORÍA DE DISEÑO VISUAL — demo v1 (Fable, 17-jul-2026)

> Respuesta al encargo `docs/ENCARGO_AUDITORIA_DISENO_FABLE_2026-07-17.md`.
> Material revisado: las 8 capturas de `demo-data/Capturas con notas/`, el código real
> (`Header.tsx`, `WineCard.tsx`, `WineList.tsx`, `WineDetail.tsx`, `SimilarWines.tsx`,
> `index.css`) y el dosier `DOSSIER_BODEGAS_ANDRADE.pdf` (29 págs., imágenes extraídas
> y verificadas una a una).
>
> **Nada de esto se implementa solo** (regla a-13-1): son propuestas para que Edu decida.
> Ningún hallazgo propone precio, backend, login ni cambio de stack.

---

## 0. Dos descubrimientos previos que condicionan varias notas

**D1 — Las fotos de botella del dosier SÍ son utilizables.** Verificado extrayéndolas
con `pypdf`: cada vino tiene su foto de botella completa, fondo blanco limpio,
~500×800 px, JPG (p. ej. Niebla en pág. 12, Castillo de Andrade en pág. 12/16). Es
resolución suficiente para tarjeta Y para ficha. Las notas 3 y 8 de Edu son viables
tal cual.

**D2 — Los gráficos decorativos del dosier son elementos de Canva CON MARCA DE AGUA.**
Al componer los PNG transparentes sobre fondo oscuro, el delineado de la casa de campo
con viña (usado en cada página de vino del dosier) muestra la trama de aspas diagonales
de previsualización de Canva, y otro elemento decorativo muestra el logotipo "Canva"
legible. Es decir: **el propio dosier del cliente está montado con assets de stock sin
licenciar** (versión preview). Esto condiciona la nota 7 (ver veredicto) y es un dato
que Edu puede querer trasladar con tacto al cuñado: si la app reutiliza ese delineado,
reutiliza también la marca de agua.

---

## 1. Veredictos sobre las 8 notas de Edu

Formato: `qué hay ahora (pro/contra) → veredicto → propuesta → esfuerzo`.

### N1 — Header: centrar logo, quitar "Vinos", "Carta Digital" a la derecha

- **Ahora** (`Header.tsx:8-41`): logo 36 px + texto "Vinos — Carta Digital" juntos a la
  izquierda. Pro: patrón estándar, funciona. Contra: la marca real (el logo) queda
  minúscula, el texto es genérico, y el conjunto parece plantilla de admin, no carta
  de bodega.
- **Veredicto: ACERTADA con matiz.** Centrar el logo es exactamente el gesto de carta
  clásica (los membretes de bodega centran el escudo), y reservar la izquierda para el
  futuro menú por tipos es previsor sin implementar nada aún.
- **Matiz 1:** que sea un **grid de 3 zonas** (`grid-cols-[1fr_auto_1fr]`), no un
  centrado "a ojo" con flex: izquierda vacía (hueco reservado al menú), centro logo,
  derecha "Carta Digital". Así el logo queda óptico-centrado de verdad y el día que
  llegue el menú no hay que rehacer el layout.
- **Matiz 2:** ya que el logo pasa a ser el protagonista central, subirlo de 36 px a
  ~48-52 px (ahora es ilegible; el anillo `ring-white/60` puede quedarse). Y
  "Carta Digital" a la derecha en cuerpo pequeño, mejor en versalitas/tracking ancho
  (`text-sm uppercase tracking-widest`) que en bold 18 px — como subtítulo, no como
  título que compite con el logo.
- **Esfuerzo: bajo** (un componente, solo clases).

### N2 — Tarjeta: centrar el nombre de la bodega

- **Ahora** (`WineCard.tsx:15-16`): todo el contenido de la tarjeta alineado a la
  izquierda; la línea de bodega no está "descentrada" por error, está en un layout
  100 % izquierda coherente. Pro: coherencia. Contra: con foto de botella (N3) el
  layout izquierda se queda corto de elegancia.
- **Veredicto: ACERTADA con matiz.** Centrar SOLO la línea de bodega dejando el resto
  a la izquierda quedaría peor que lo actual (un elemento suelto descolgado). Lo que
  pide el ojo de Edu, bien leído, es **centrar el bloque entero de la tarjeta** —
  y eso sí es lo correcto en cuanto entre la botella (N3): botella centrada arriba,
  nombre centrado, bodega centrada debajo, chips centrados. Es el patrón de carta
  de vinos premium (la tarjeta se lee como una etiqueta).
- **Propuesta:** aplicar `text-center` + `items-center` a toda la tarjeta EN EL MISMO
  cambio que N3, no como retoque suelto antes.
- **Esfuerzo: bajo** (si se hace junto a N3).

### N3 — Tarjeta: foto de botella completa del dosier

- **Ahora**: no hay imagen ninguna en la tarjeta. Contra claro: en un producto cuyo
  objeto ES la botella, la tarjeta no enseña el producto. Es el mayor déficit visual
  de la demo.
- **Veredicto: ACERTADA — es la corrección de más impacto de toda la lista.**
  Verificado (D1): las fotos existen, fondo blanco, ~500×800, una por vino, calidad
  sobrada para tarjeta. Nada que objetar al fondo; solo ejecución:
  - Zona de imagen de **altura fija** (`h-44`/`h-48`, `object-contain`) para que las
    botellas de las 8+ tarjetas queden alineadas entre sí aunque las fotos varíen.
  - Fondo de la zona de imagen en **crema `#f2ebe5`**, no blanco: separa la botella
    del bloque de texto blanco y ata la tarjeta a la paleta (las fotos con fondo
    blanco integran mal directamente sobre tarjeta blanca).
  - `loading="lazy"` en la lista; el peso (~70-200 KB/foto) es asumible para la PWA,
    pero conviene recomprimir a ~60-80 KB al extraerlas.
- **Esfuerzo: medio** — no por el CSS (bajo) sino por el trabajo de extraer, recortar,
  renombrar y mapear ~10-29 fotos a los vinos de `wines.ts`. Es trabajo mecánico
  delegable (Command Code) con contrato claro.

### N4 — Tarjeta: "no se ve el tag de uva, no puedes confirmar que el filtro funciona"

- **Ahora** (`WineCard.tsx:22`): **la uva SÍ está en la tarjeta** — es la línea burgundy
  grande ("Zalema", "Chardonnay") bajo el chip de tipo. El problema real no es
  ausencia de dato, es que **no está etiquetado**: se muestra como un subtítulo
  decorativo y nadie que no sepa vinos identifica "Zalema" como la uva.
- **Veredicto: CUESTIONABLE en el diagnóstico, ACERTADA en el problema de fondo.**
  Añadir OTRO chip de uva duplicaría el dato. La solución no es añadir, es etiquetar
  lo que ya hay.
- **Propuesta:** convertir la línea de uva en dato etiquetado — o bien un chip junto
  al de tipo con estilo propio (p. ej. contorno burgundy en vez de relleno:
  `border border-primary/40 text-primary` con texto "Uva · Zalema"), o bien mantener
  la línea grande pero con un eyebrow encima en gris cálido pequeño ("UVA"). Con eso,
  quien busca "zalema" ve la palabra resaltable en cada resultado y confirma el filtro
  a simple vista — que es exactamente lo que Edu quiere comprobar.
- **Esfuerzo: bajo.**

### N5 — Tarjeta demasiado simple, necesita revisión de diseño

- **Ahora**: caja blanca redondeada + sombra + texto + botón relleno. Pro: limpia,
  legible, táctil. Contra: es la tarjeta por defecto de cualquier plantilla SaaS; no
  hay nada en ella que diga "vino" ni "Andrade" salvo el color del botón.
- **Veredicto: ACERTADA.** Pero "revisar el diseño" sin dirección concreta es como
  Edu lo dejó — apunto la dirección: la tarjeta debe leerse como **etiqueta de
  botella**, no como card de dashboard. Receta concreta (suma de N2+N3+N4 más dos
  toques):
  1. Botella centrada sobre banda crema (N3).
  2. Nombre del vino centrado y **en serifa** (ver hallazgo propio H1) — este es el
     cambio que más "des-simplifica" la tarjeta por céntimo invertido.
  3. Bodega debajo en versalitas pequeñas grises cálidas.
  4. Chips de tipo y uva centrados (N4).
  5. Sustituir la sombra pura por **borde fino cálido** (`border border-primary/15`)
     + sombra muy suave: el borde definido es más "impreso/clásico", la sombra sola
     es más "app genérica".
- **Esfuerzo: medio** (junto con N3; aislado sería bajo).

### N6 — Ficha: centrar todo el bloque (nombre, bodega, etiquetas)

- **Ahora** (`WineDetail.tsx:32-55`): dos columnas en desktop (datos izquierda, notas
  de cata derecha), todo alineado a la izquierda. Pro: estructura clara. Contra: la
  cabecera izquierda con la mitad derecha vacía hasta las notas se percibe coja —
  la sensación de "descentrado" de Edu es correcta.
- **Veredicto: ACERTADA con matiz.** Centrar TODO (incluidas las notas de cata) sería
  un error: párrafos de 3-4 líneas centrados se leen mal. Lo correcto es centrar la
  **cabecera** y dejar el cuerpo alineado.
- **Propuesta:** cabecera a ancho completo y centrada — nombre (en serifa, H1),
  bodega, fila de chips —, y debajo el contenido: botella (N8) + datos a un lado,
  notas de cata a otro, texto de párrafo siempre alineado a la izquierda. En móvil
  todo apila centrado-natural sin cambios extra.
- **Esfuerzo: bajo** (reordenar el JSX existente + clases).

### N7 — Ficha: delineado de la casa de campo del dosier como fondo

- **Ahora**: fondo crema plano. La intención (motivo de la casa con viña como fondo
  decorativo, marca de la bodega) es buena y muy del sector.
- **Veredicto: ACERTADA con matiz GRAVE (D2).** El delineado extraído del dosier
  lleva **marca de agua de Canva** (trama de aspas por toda la imagen). Usarlo tal
  cual en la app = enseñar una marca de agua de stock en la demo del 18-jul y un
  posible problema de licencia del cliente. No usarlo tal cual.
- **Propuesta, en orden de preferencia:**
  1. **Para la demo del 18-jul: no ponerlo.** El fondo crema limpio no resta; una
     marca de agua sí. Enseñar la intención con palabras ("aquí irá el motivo de la
     casa del dosier cuando tengamos el archivo original").
  2. Pedir al cliente **el archivo original licenciado** (si tienen Canva Pro, la
     descarga sin marca de agua es un clic — probablemente ni saben que exportaron
     la preview). Entonces sí: aplicarlo con opacidad muy baja (5-8 %), tintado
     burgundy sobre crema, solo detrás de la cabecera de la ficha, nunca detrás de
     las notas de cata (legibilidad).
  3. Si el original no llega y el motivo se considera imprescindible: se rehace como
     SVG propio simplificado (colinas + casa + hileras de viña, 4-5 trazos) — pero
     esto ya es trabajo de la diseñadora pendiente, no de la demo (norte: "no
     volverse loco con features sin valor").
- **Esfuerzo: bajo** (opción 1), **bajo** (opción 2 cuando exista el archivo).

### N8 — Ficha: misma foto de botella, en más calidad

- **Ahora**: la ficha no tiene foto ninguna (hueco más notorio aún que en la tarjeta).
- **Veredicto: ACERTADA con matiz.** "Más calidad" no existe: la única fuente es el
  dosier y sus fotos son ~500×800. La buena noticia es que **esa resolución basta**
  para la ficha si se muestra a ~400-450 px de alto (no a pantalla completa). Mismo
  asset para tarjeta y ficha = un solo trabajo de extracción (N3) y consistencia
  visual gratis.
- **Propuesta:** en desktop, botella a la izquierda de los datos (columna ~1/3,
  `object-contain`, fondo crema); en móvil, botella bajo la cabecera centrada. Si el
  cliente puede pasar fotos de prensa originales más adelante, se sustituyen sin
  tocar código.
- **Esfuerzo: bajo** (una vez hecho N3).

---

## 2. Auditoría propia (independiente de las notas)

Contra estándar de carta digital premium / app de sumillería. Priorizado por impacto
visual percibido en una demo presencial el 18-jul. Máximo señalado en el encargo: 5-8.

### H1 — No hay tipografía de marca: todo es sans de sistema **(el hallazgo nº 1)**

- **Ahora** (`index.css:9-10`): una sola familia (system-ui) para todo. El logo real
  y todo el dosier del cliente son **serifa clásica** ("ANDRADE — Bodegueros desde
  1885"). La app no hereda nada de eso: es la razón principal por la que la demo se
  siente "plantilla" aunque los colores sean los correctos. Ninguna carta premium
  compone los nombres de vino en Segoe UI.
- **Propuesta:** serifa de display SOLO para nombres de vino, títulos de sección y el
  "Carta Digital" del header; el cuerpo se queda en sans (legibilidad en móvil de
  camarero). Dos vías:
  - **Coste cero, sin dependencias:** pila local `Georgia, 'Times New Roman', serif`
    — ya da el 70 % del efecto y respeta la PWA offline sin añadir un solo byte.
  - **Mejor resultado:** una serifa española de época tipo Playfair Display o
    Cormorant Garamond **autoalojada** (woff2 en `public/fonts/`, `@font-face` —
    nunca Google Fonts por CDN: rompería offline y mete dependencia externa).
- **Esfuerzo: bajo** (pila Georgia) / **medio** (woff2 autoalojada, ~1 h).

### H2 — Grises fríos de Tailwind sobre paleta cálida

- **Ahora**: `text-gray-500`, `bg-gray-100`, `border-gray-200` por todas partes
  (tarjetas, chips de D.O./formato, hr, textos secundarios). Son grises azulados de
  serie que chocan con el crema `#f2ebe5` y el burgundy: el conjunto queda mitad
  bodega, mitad panel de administración.
- **Propuesta:** sustitución mecánica `gray-*` → `stone-*` (la gama cálida de
  Tailwind) o, mejor, dos tokens propios en `@theme` derivados de `#232421`
  (p. ej. `--color-muted: #6b6560`, `--color-line: #e5dcd3`). Un solo
  buscar-y-reemplazar que recalienta toda la app.
- **Esfuerzo: bajo.**

### H3 — Redundancia: "Bodegas Andrade" impreso 9 veces en una pantalla

- **Ahora** (`WineList.tsx:54-62` + `WineCard.tsx:16`): la lista agrupa por bodega con
  cabecera de sección "Bodegas Andrade" y CADA tarjeta debajo repite "Bodegas
  Andrade". Ruido puro que compite con los nombres de vino (densidad de información).
- **Propuesta:** en modo agrupado, quitar la línea de bodega de la tarjeta (la
  cabecera de sección ya lo dice); mantenerla SOLO en modo búsqueda (donde la lista
  es plana y el dato sí orienta) — el flag `isSearching` ya existe, es pasar un prop.
- **Esfuerzo: bajo.**

### H4 — Jerarquía invertida en la ficha: "Zalema" es lo más grande de la página

- **Ahora** (`WineDetail.tsx:49`): la uva se muestra a `text-3xl font-bold` burgundy —
  igual o más peso que el nombre del vino, y sin etiqueta. La socia del cliente
  abrirá la ficha de Niebla y lo que más grita es "Zalema" sin saber qué es.
- **Propuesta:** uva como dato etiquetado al nivel de Graduación (eyebrow "Uva" +
  valor en `text-xl` burgundy). El nombre del vino (en serifa, H1) debe ser
  inequívocamente el rey de la página. Coordinar con N4 para que tarjeta y ficha
  etiqueten la uva igual (consistencia listado↔ficha).
- **Esfuerzo: bajo.**

### H5 — Afordancia del botón: 8 botones burgundy rellenos gritando a la vez

- **Ahora** (`WineCard.tsx:24-26`): cada tarjeta lleva un "Ver más" relleno burgundy.
  Con 6-8 tarjetas en pantalla, el elemento más llamativo de la vista es un botón
  repetido, no los vinos. Además es un falso botón (la tarjeta entera ya es el
  enlace), aunque como diana táctil de 44 px para camareros tiene sentido conservarlo.
- **Propuesta:** rebajarlo a **botón contorno** (`border border-primary text-primary`,
  hover relleno) o a enlace con flecha "Ver ficha →". Mantener el `min-h-11` (44 px
  táctiles, bien resuelto). El burgundy relleno queda reservado a UNA cosa por vista
  (el header), que es como una marca premium usa su color.
- **Esfuerzo: bajo.**

### H6 — Sin estado de pulsación: la app se usa en tablet y solo hay hover

- **Ahora**: tarjetas y botones solo tienen `hover:` (sombra/color). Los camareros
  usarán dedo, no ratón: al tocar una tarjeta no hay respuesta visual ninguna hasta
  que carga la ruta — en demo presencial sobre tablet se percibe como "no responde".
- **Propuesta:** añadir `active:` a tarjetas y botones (`active:scale-[0.99]`
  `active:shadow-none` en tarjeta, `active:bg-primary-dk` en botón). Dos clases por
  componente.
- **Esfuerzo: bajo.**

### H7 — "Vinos similares" quedará desincronizado en cuanto N3 aterrice

- **Ahora** (`SimilarWines.tsx:35-43`): mini-tarjetas solo-texto, clon reducido de la
  tarjeta actual. Pro: correctas hoy. Contra: si la tarjeta del listado pasa a llevar
  botella y centrado, estas quedan como restos del diseño viejo en la misma pantalla
  (inconsistencia listado↔ficha, justo lo que el encargo pide vigilar).
- **Propuesta:** aplicarles la misma plantilla en pequeño (botella `h-24` centrada +
  nombre serifa + uva etiquetada) en el mismo cambio que N3/N5, no después.
- **Esfuerzo: bajo-medio** (va a rebufo de N3).

**Descartes conscientes** (citando el norte: *"no quiere volverse loco con features
inútiles y sin valor"*): animaciones de entrada, modo oscuro, filtros por chips
clicables, ordenación — todo ello añade complejidad sin servir a la demo del 18-jul.
No se proponen.

---

## 3. Si solo hay tiempo para tres cosas antes del 18-jul

1. **N3+N2+N5+H7 (paquete botella):** foto de botella en tarjeta y ficha con bloque
   centrado — transforma la demo de "lista de texto" a "carta de vinos". *(medio)*
2. **H1 (serifa en títulos)** aunque sea con la pila Georgia de coste cero. *(bajo)*
3. **H2 (grises cálidos) + N1 (header 3 zonas):** dos retoques baratos que rematan
   la sensación de marca. *(bajo)*

Y una **advertencia que vale más que cualquier retoque:** no usar el delineado del
dosier tal cual (N7/D2) — lleva marca de agua de Canva. Pedir el original al cliente.

---

*Auditoría de Fable, 17-jul-2026. Assets del dosier verificados en disco (extracción
pypdf, páginas 1-29). Nada implementado; decisión de cada punto: Edu.*

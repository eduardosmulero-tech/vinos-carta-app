# AGENTS.md — vinos-carta-app

> **App de carta de vinos para camareros de restaurante** — encargo a Edu a traves de su
> cunado, que trabaja en una empresa de vinos. Sustituye en parte los cursos de formacion
> presenciales que la empresa da hoy a sus restaurantes clientes. El camarero consulta la
> carta de *su* restaurante (no el catalogo general), con ficha detallada y recomendaciones
> por uva parecida.
>
> **Modelo de negocio:** la app no genera ingresos directos. Es parte de un paquete de
> servicios que la empresa de vinos ya vende a los restaurantes.
>
> **Norte del proyecto (literal del cliente, `a-13-1`):**
> *"No quiere volverse loco con features inutiles y sin valor. Quiere una app util para
> los camareros y facil de usar para los restaurantes. Todo lo demas llegara mas adelante."*
> Citalo en cualquier propuesta como principio rector.

---
---
## MAPA DE DOCS DEL PROYECTO

| Documento | Contenido |
|-----------|-----------|
| `docs/INFORME_APP_CARTA_VINOS.md` | Informe nivel cliente entregado al cunado (referencia historica) |
| `docs/AUDITORIA_INFORME_FABLE_2026-07-12.md` | Auditoria de Fable: veredictos B.1-B.4, hallazgos H1-H5 |
| `docs/INFORME_DESCUBRIMIENTO_2026-07-12.md` + `respuestas-entrevista.json` | Analisis completo de la entrevista inicial |
| `docs/DISENO_REFERENCIAS.md` | **Paleta de colores extraida del logo, datos de vinos para demo, assets recibidos** |
| `CLAUDE.md` (archivado) | Contexto legacy sustituido por este AGENTS.md |

---

## ESTADO DEL PROYECTO

**Fase:** demo v3 COMPLETA — **RETO V3 "La Bodega"** ejecutado entero por Fable
(18-jul madrugada, sesión autónoma con permiso de límite completo), tras el rechazo de
la V2 por Edu (strike 2/3, "penoso, apenas cambió"). Commit de cierre hecho, **SIN push**.
Siguiente paso: **Edu mira capturas/preview en su móvil → si OK, `git push` (redespliega
Vercel) ANTES de la visita al cuñado de HOY sábado 18-jul.**

### Cerrado (ratificado por Edu + Fable + cunado 15-jul)

| Aspecto | Resolucion |
|---------|-----------|
| Quien decide en el cliente | Cunado de Edu + su socia |
| Origen de datos | Catalogo se crea de CERO dentro de la app (sin migracion) |
| Terminales (PDA) | Heterogeneas por restaurante -> PWA confirmada |
| Wifi | Contar con que siempre hay + plan B (lectura offline cacheada) |
| Interlocutores confirmados | Cunado + socia |
| **Gestion de cartas (Pregunta D)** | **CERRADA: la empresa de vinos gestiona** el catalogo y asigna las cartas a cada restaurante. Los restaurantes solo consultan. Coincide con recomendacion Fable C.2. |
| **Inventario (Pregunta A)** | **CERRADA: MVP sin stock** — el informe de inventario es listado de la carta (sin cantidades). La version con stock queda para fase posterior si la app funciona. |
| **Precios en la app (16-jul, Edu)** | **CERRADA: la app NO muestra precios en ninguna pantalla.** El cliente es distribuidor — sus tarifas son precio de compra B2B confidencial y cada restaurante vende al precio que quiere. La app sustituye los cursos de sumiller a camareros, NO es una carta comercial. Carta con precios/vinos propios del restaurante = fase futura. Aplicado en: entregable, DESGLOSE §2bis, demo (contrato/spec/plan — campo `price` eliminado, la UVA pasa a ser el dato destacado de la ficha). |

### Contexto relacional (aclarado por Edu, 16-jul — mandatorio para tono y enfoque)

- El **cunado NO es un cliente adversarial**: quiere ayudar a Edu a arrancar. Trabaja
  para **la socia, que es quien pone el dinero y decide**. La venta real es
  cunado -> socia: el es el *champion interno*, no el comprador.
- **Enfoque:** honesto y cercano con el cunado (Edu puede admitir que es su primer
  encargo real y que en lo legal va con gestoria). El guion de defensa (§7 de
  DESGLOSE_PRECIOS_D1.md) se le entrega como **municion para que el justifique el
  precio ante su socia**, no como escudo contra sus preguntas.
- **Limite:** el modelo interno de horas y la ganancia de productividad por IA no se
  comparten ni con el (criterio de pricing cerrado — es margen, no escandallo).
  Documentos escritos = voz profesional, porque llegan a la socia.
- **No bajar precio por cercania:** la horquilla sale de partidas reales con suelos.
  La proteccion honesta al cliente ya esta en la garantia de 30 dias y el soporte de
  la Opcion B, no en descuentos.

### Aclaracion del cunado sobre diseno

- Quiere saber el **rango de precio primero** antes de invertir en diseno (mockups de la disenadora, etc.)
- Ha facilitado: **logo** (extraida paleta: crema #f2ebe5 + burgundy #73232d), **dosier corporativo** con historia y vinos, y **tarifas 2026** con productos y precios reales
- Identidad corporativa: dice que es "muy generica" — habra que trabajarla

### Abierto — pendiente de resolver

1. **Presupuesto:** sin rango del cliente — lo destraba nuestra horquilla (proximo paso)
2. **Perfil real del camarero-usuario** (edad, comodidad con tecnologia)
3. **Mantenimiento vs cambios futuros:** contradiccion sin resolver (quieren "sin mantenimiento" pero "cambios mas adelante")
4. **Mockups:** el cunado los pedira a la disenadora si el presupuesto le cuadra
5. **Proxima fecha de contacto / forma de entrega de la propuesta**

---

## DECISIONES TECNICAS CERRADAS (auditadas por Fable 12-jul)

| Decision | Veredicto | Tripwire de reapertura |
|----------|-----------|----------------------|
| **PWA responsive** en vez de nativa | MANTENER | Si las PDA no tienen navegador moderno (Chrome/WebView), se reabre y evalua nativa/hibrida |
| **Offline: lectura cacheada de la carta** (cache-first con service worker) | CAMBIADO: offline descartado -> lectura offline | El offline de escritura queda fuera de v1 completamente |
| **Mini-admin catalogo maestro** | MANTENER y AMPLIADO | Depende de C.2: potencialmente 2 superficies de admin (empresa + restaurante); cuantas en v1 lo decide la respuesta a Pregunta D |
| **v1: empresa gestiona todo** (catalogo + asignacion de cartas), restaurantes solo consultan | RECOMENDACION FABLE (C.2) | Si el cunado confirma que restaurantes exigen autonomia desde dia 1, se reabre y el admin crece |
| **Arquitectura multi-tenant** desde el minuto uno | CIERRE | — |
| **Horquilla** -> **CIFRA CERRADA con opciones transparentes** (decision Edu 16-jul: A 4.600 / B 5.050, opciones −200/−200 en papel) | CAMBIADO por Edu | Si el alcance crece antes de firmar, se recalcula la cifra, no se vuelve al rango |

---

## MVP — 4 funciones

| # | Funcion | Estado |
|---|---------|--------|
| 1 | Busqueda de vinos en la carta del restaurante | Definida |
| 2 | Ficha detallada de cada vino (uva, bodega, notas de cata) | Definida |
| 3 | Recomendaciones por uva parecida (alternativa con criterio) | Definida. No necesita ML: es matching por atributos si el catalogo lleva variedad de uva estructurada |
| 4 | Informe de inventario | **ALCANCE SIN DEFINIR** — ver Pregunta A |

### Fase 2 identificada (fuera de v1, no presupuestar)
- Datos de coleccion / historico del restaurante
- Motor de recomendacion inverso: empresa ofrece vinos al restaurante para cubrir huecos de sabor (venta cruzada B2B)

---

## CRITERIOS DE PRICING (NO re-litigar)

- ~~Horquilla con supuestos explicitos y exclusiones, nunca cifra cerrada~~ **SUPERSEDIDO
  16-jul por decision de Edu: CIFRA CERRADA con opciones transparentes.** A = 4.600 e ·
  B = 5.050 e; dos opciones que restan nombradas en el papel (−200 disenadora, −200 CSV
  aplazado; minimo 4.200, sobre el suelo de 3.900). La cifra final la decide Edu.
- La ganancia de productividad por IA es **margen de Edu, no descuento del cliente** — no revelar multiplicadores tipo "2 semanas con IA vs 4 meses solo".
- Sub de Claude (si aplica) va como overhead dentro de la horquilla y/o dentro de la cuota mensual de soporte, sin linea propia.
- Arquitectura barata de operar (sin coste recurrente alto), coherente con "sin mantenimiento".
- Carga inicial de fichas de vino (datos estructurados con variedad de uva, de la que vive el motor de recomendaciones) es coste de proyecto a dimensionar explicitamente.
- **Transparencia de precio (regla de Edu, 16-jul):** nada de rangos. Precio = cifra
  cerrada; todo factor que la mueva Y dependa de una decision del cliente va NOMBRADO
  en el papel con su efecto en euros (hoy: −200 disenadora, −200 CSV). Si alguna vez
  hiciera falta un rango, lleva su porque escrito al lado. Durante el proyecto rige
  "sin sorpresas": cualquier coste extra se comunica ANTES con su importe y lo decide
  el cliente (clausula en Condiciones del presupuesto .md y .html). Los drivers
  internos de estimacion (DESGLOSE §5) son municion verbal, no papel — no son
  decisiones del cliente.

---

## RETOMAR AQUI

### 🚦 EMPIEZA POR AQUI (18-jul madrugada · RETO V3 "La Bodega" EJECUTADO — falta el OK de Edu y push)

**Qué pasó esta noche:** Edu rechazó la V2 (strike 2/3) y dejó a Fable la noche entera con
permiso de límite completo: "genera el reto v3 y ejecuta hasta terminar". Hecho.

**El concepto (docs/RETO_V3_2026-07-18.md):** la app entera es ahora **la bodega** — entorno
oscuro tinta-burgundy donde cada botella vive en su nicho iluminado con número de lucernario,
y la información va en **paneles de papel crema** (la carta impresa: serifa, filetes,
capitulares). El contraste papel↔bodega ES la tesis tradición⨯tecnología de Edu, visible en
cada pantalla. Tercera voz tipográfica real: **IBM Plex Mono autoalojada** con cifras
tabulares para todos los datos (graduación, numeración, etiquetas). Contradice a propósito el
guardarraíl "sin modo oscuro global" del plan V2 — justificación en el doc §2 (ese guardarraíl
produjo dos strikes; lo único que Edu validó en V2 fueron las botellas sobre fondo oscuro).

**Cobertura:** los 44 errores de `docs/AUDITORIA_UNICA_RETO_V2_2026-07-17.md` están cubiertos
(mapa en RETO_V3 §5). Claves: cero prosa inventada (campo `description` ELIMINADO del modelo;
los 4 vinos solo-dosier muestran ficha técnica honesta, sin cata fingida); datos del dosier
restaurados (Castillo 12%, Señorío 11%, Naranja Andrade = Generoso Dulce/Zalema con override
visual de familia); **tarifas Sauci verificadas contra el PDF real: NO publican ni uva ni
graduación** → las 9 graduaciones Sauci inventadas se retiraron, uvas Sauci = las de la web
(aditivas), y `docs/CONTRADICCIONES_CATALOGO.md` reescrito (sus filas "tarifa: Zalema" eran
falsas); chips sugeridos del buscador ELIMINADOS (orden verbal de Edu); header solo-sello
centrado; reveals por IntersectionObserver (funcionan en Safari/Firefox, no solo Chrome);
title dinámico React 19 + OG tags + theme-color + favicon sello Amén; ErrorBoundary;
numeración estable por familia; maridaje→búsqueda sin `replace` (atrás vuelve a la ficha).

**Verificación (método del strike, sin greps a ciegas):** `lint` 0 · `tsc -b` 0 · build verde
(40 entradas precache, botellas+mono incluidas) · **render real puppeteer 7 vistas × 2
viewports revisadas A OJO** (capturas en `tools/shots-v2/`) · **WCAG medido en vivo sobre la
ficha: 36/36 PASS ≥4.5:1** (en V2 fallaban 5 de 10 combinaciones). El fondo crema-sobre-crema
que causaba los fallos ya no existe: el oro vive sobre oscuro (8.1:1), el papel sobre bodega
(16.2:1).

**▶ PRIMER PASO DE EDU AL DESPERTAR:**
1. Mirar las capturas de `tools/shots-v2/` (o `npm run preview` + móvil).
2. Si OK → `git push` (redespliega Vercel; la URL pública AÚN sirve la V2 rechazada).
3. Si no OK → strike 3; el mapa de daño está en los docs de auditoría y el concepto en RETO_V3.

---

### 🚦 Historial RETO V2 (17-jul, superseded por V3)

**El rediseño `657980a` fue RECHAZADO por Edu (17-jul): no supera su reto** ("sensación
premium, parecer portfolio, no parecer generada de un prompt, lucirse con el stack, no te
cortes"). Strike 1/3 activo. Auditoría de esta sesión CON RENDER REAL: 4 de sus 8 notas
quedaron a medias/mal (la de centrar títulos de bodega se reinterpretó sin preguntarle),
~40% del stack aprovechado, verificación anterior fue por greps sin ojos. Lección
persistida en memoria (`feedback_ui_render_real`).

**▶ SIGUIENTE PASO: ejecutar `docs/PLAN_RETO_V2_2026-07-17.md` (aprobado por Edu), fase
a fase F0→F7.** Review previa del concepto por hy3:
`docs/REVIEWS/REVIEW_HY3_PROPUESTA_RETO_2026-07-17.md` (clave: NADA de mix-blend-multiply
sobre el expositor oscuro — transparencia real en assets).

**Decisiones de Edu cerradas HOY (no re-litigar):**
1. Catálogo = SOLO dosier Andrade + tarifas Sauci = **los 19 vinos actuales**. Amontillado
   Sauci y Rosario Andrade (solo web) FUERA — no sabemos si Amén los distribuye.
2. Buscador por maridaje/cata ("ostras" → vinos): **APROBADO**.
3. Directrices de marca: tesis **tradición ⨯ tecnología**; realzar marca **AMÉN**
   (¡hallazgo!: `app/public/logo-bodegas-andrade.jpg` es en realidad el logo AMEN WINES,
   tagline "Vinos diferentes, historias únicas" → renombrar a `logo-amen.jpg`); marca de
   cada bodega en las fichas de sus vinos; la app debe "saber venderse".
4. Datos: material del cuñado MANDA sobre la web; datos web solo ADITIVOS; contradicciones
   a `docs/CONTRADICCIONES_CATALOGO.md` (crear en F1), NUNCA a la UI.

**Material nuevo:** `docs/INVESTIGACION_BODEGAS_2026-07-17.md` (catas/maridajes/historia
reales de las webs oficiales, por Hermes) + 16 fotos en `demo-data/Imagenes aportadas por
edu/` (12 Sauci + 4 Andrade HQ) → **los 19 vinos llevan botella real** tras F0. Los
`*_check.py` sueltos en `demo-data/` son scripts de análisis de otra sesión (sin valor,
ignorar).

**Método OBLIGATORIO de esta ejecución (por el strike):** render real por fase
(puppeteer-core + Edge headless, patrón validado; OJO: `msedge --screenshot` con ventana
alta recorta el ancho — usar puppeteer), review hy3 read-only por fase (gratis, Fable lo
lanza sin preguntar), assets verificados A OJO uno a uno, contraste WCAG medido, y capturas
a Edu ANTES de dar nada por hecho. Edu pone la sesión en modo manual: escrituras de hy3
(ej. transcripción wines.ts) las lanza él con `!`; commit solo con su OK.

**La visita al cuñado sigue siendo MAÑANA sábado 18-jul** — la URL de Vercel redespliega
al pushear. Presupuesto y resto de pendientes: sin cambios (ver Pendientes).

**Nota de exposicion:** la app muestra el logo/nombre real de Bodegas Andrade y datos de
vino derivados de tarifas reales de Bodegas Sauci (`demo-data/`). La URL de Vercel es
publica (no indexada, pero accesible por cualquiera con el link) — aceptable para un demo
de estudiante mostrado en privado; si se quisiera cerrar del todo habria que meter password
(plan Vercel Pro) o `noindex`, no hecho por no ser necesario ahora mismo.

---

### 🚦 Historial de construccion (17-jul, Fases 1-6)

**Construir la demo. Directamente. Sin pipeline de Hermes.**

- **La app vive en `app/`** (subcarpeta, NO en la raiz — decision 16-jul para no mezclar
  codigo con docs). Stack real instalado: Vite 8 (spec decia 6, sin impacto) + React 19 +
  TS + Tailwind v4 + vite-plugin-pwa + React Router 7.
- **Fase 1 ✅ (16-jul, Fable):** scaffolding completo, build verde, sw.js + manifest OK.
  Hallazgos aplicados a la SPEC: plugin `@tailwindcss/vite` y `src/vite-env.d.ts` faltaban.
- **Fase 2 ✅ (17-jul, Fable + revisor hy3 OK):** tipos (SPEC §2) + 19 vinos (SPEC §7) en
  `app/src/types/` y `app/src/data/`. Verificada: build + tsc + greps (19 ids, 0 `price`) +
  revisor hy3 campo a campo → cero discrepancias. Criterio sobre la SPEC: tildes de
  "Docenañero" y `grape: 'Múltiples variedades'` en el Vermut.
- **Fase 3 ✅ HECHA Y VERIFICADA (17-jul, Fable):** layout y routing. Logo real copiado a
  `app/public/logo-bodegas-andrade.jpg` y usado en `Header.tsx` con fallback SVG "BA" sobre
  burgundy via `onError` (SPEC §3.3); `App.tsx` ya cumplia §3.2 de Fase 1 (sin cambios);
  `WineDetail.tsx` ahora resuelve `:id` contra los datos y muestra "Vino no encontrado" +
  boton volver si no existe (lo exigia la verificacion de Fase 3 del PLAN; la ficha completa
  sigue siendo Fase 4). **Triple verificacion:** (a) `npm run build` verde; (b) revisor hy3
  read-only vs SPEC §3.2/§3.3 + PLAN Fase 3 → **VEREDICTO OK, 6/6 PASS**; (c) preview smoke:
  `/`, `/wine/test` y el logo responden 200 (logo `image/jpeg`).
- **Fase 4 ✅ HECHA (16-jul, CommandCode + revisor code-action-reviewer):** 5 componentes
  funcionales (SearchBar, WineCard, WineList, WineDetail, SimilarWines). Todos pasados por
  code-action-reviewer con correcciones aplicadas en cada uno. Verificacion: `tsc --noEmit`
  cero errores + `npm run build` verde + smoke test 200 en `/`, `/wine/niebla`, `/wine/test`.
  Log detallado: `docs/LOG_FASE4_COMMANDCODE_2026-07-16.md`. **La Fase 4 la ejecuto
  CommandCode (Claude Sonnet) sustituyendo a Sonnet directo mientras el limite de Pro de Edu
  reseteaba** — el log diferencia quien hizo que.
- **Revision Fable de Fase 4 ✅ (17-jul):** codigo contrastado contra SPEC §3.4-§3.8 componente
  a componente. Veredicto: correcto salvo **1 defecto corregido — doble debounce** (SearchBar
  ya debouncea 300ms segun SPEC §3.4; el reviewer de CommandCode añadio OTRO `useDebounce` en
  `WineList` malinterpretando §3.6 → busqueda y boton limpiar tardaban ~600ms). Fix: eliminado
  el hook de WineList, `searchQuery` se usa directo. Re-verificado: tsc 0 errores + build verde
  + preview 200 en `/` y `/wine/niebla`. Ademas: `.commandcode/` (estado interno de la
  herramienta, `taste/taste.md`) añadido a un `.gitignore` nuevo en la raiz.
- **Fase 5 ✅ HECHA Y REVISADA (17-jul, Fable + revisor hy3 8/8 PASS):** diseño visual y
  responsive. La Fase 4 ya cumplía casi toda la SPEC §5; gaps corregidos por Fable (edits
  pequeños, <10 archivos): (1) `--font-family-sans` → `--font-sans` en `index.css` — la SPEC
  usa el namespace de Tailwind v3, en v4 el correcto es `--font-sans` (criterio sobre la SPEC,
  ratificado por el revisor); (2) `lg:px-16` añadido al Header; (3) botón "Ver más" de
  WineCard a `min-h-11` (44px táctil, antes ~36px); (4) botón limpiar de SearchBar a
  `h-11 w-11`; (5) padding responsive en "Vino no encontrado" + `transition-colors` en
  botones. Verificación: tsc 0 errores + build verde + CSS generado contiene `--font-sans`
  custom + preview 200 en `/`, `/wine/niebla`, `/wine/test` + revisor hy3 read-only contra
  SPEC §5 y PLAN Fase 5 → VEREDICTO OK. Los checks visuales de viewport (375/768/1024) van
  por auditoría de clases, no render real — si algo se ve raro en la demo, mirar ahí primero.
- **Fase 6 ✅ IMPLEMENTADA, VERIFICADA Y REVISADA (17-jul, Fable · revisor hy3 8/8 PASS):**
  PWA y offline. La config `VitePWA` completa ya estaba desde Fase 1; lo hecho ahora:
  (1) `public/logo-192x192.png` y `logo-512x512.png` generados desde el logo real (1254×1254
  cuadrado, System.Drawing bicúbico HQ; el 192 comprobado visualmente); (2) `favicon.svg`
  REEMPLAZADO — el que había era el icono default de Vite (rayo morado), ahora burgundy
  #73232d + "V" blanca según PLAN Fase 6; (3) criterio sobre la SPEC: `jpg,jpeg` añadidos a
  `workbox.globPatterns` (sin eso el logo real NO se precacheaba para offline) y `lang: 'es'`
  en el manifest (el plugin metía `"lang":"en"`). **Verificación Fable:** build verde
  (`tsc -b` incluido) → `dist/sw.js` + `dist/manifest.webmanifest` con 12 entradas precacheadas
  (logo jpg incluido) y todos los valores de SPEC §8.3; smoke preview 200 + MIME correcto en
  `/`, `/wine/niebla`, manifest, sw.js, 2 iconos, favicon y logo jpg; registro del SW confirmado
  en el bundle (`sw.js` + confirm de actualización + log offline). **Nota:** el plugin genera
  `manifest.webmanifest`, no `manifest.json` como dice SPEC §1 — comportamiento estándar de
  vite-plugin-pwa, no es defecto. Los checks de navegador del PLAN (installable en DevTools,
  recarga offline real, Lighthouse) van por auditoría de artefactos, no browser real — si Edu
  quiere el check visual, abrir preview y DevTools > Application. **Revisor hy3: OK (17-jul,
  tras reintento por rate limit de Novita)** — C1-C8 los 8 PASS y las 3 desviaciones sobre
  la SPEC ratificadas (`jpg,jpeg` en globPatterns, `lang: 'es'` en manifest,
  `manifest.webmanifest` en vez de `manifest.json`). Salvedad del revisor: no pudo leer
  `demo/SPEC_DEMO_V1.md`/`PLAN_DEMO_V1.md` (fuera de su workspace) — verificó contra los
  requisitos citados en el prompt-contrato.
- **Leccion delegacion (16-jul, ampliada 17-jul):** command-code sin `--yolo` NO escribe
  archivos; con `--yolo` desde Fable lo bloquea el clasificador → escrituras de hy3 =
  lanzarlas Edu con `!`, o Fable escribe directo si son <10 archivos pequeños ya
  especificados. **PERO los revisores read-only NO tienen este problema**: no escriben, no
  necesitan `--yolo`, y Fable los lanza sin friccion. Revisar con hy3 es gratis → hacerlo
  siempre que haya que comparar codigo contra una spec.
- **Skill `command-code`: ARREGLADA (17-jul).** Vivia solo en
  `Promethe-os\.claude\skills\command-code\` → desde este proyecto daba "Unknown skill"
  siempre. Ahora hay una **junction** en `C:\Users\eduar\.claude\skills\command-code`
  apuntando ahi: se carga en TODOS los proyectos y sigue habiendo una sola fuente. Si algun
  dia se mueve/renombra `Promethe-os`, la junction se rompe → recrearla.
- **Enmienda de iniciativa (Edu, 17-jul):** **hy3 es gratis → Fable lo lanza a voluntad**,
  sin preguntar, si la tarea es mecanica y verificable. **deepseek-v4-pro (4x, gasto real)
  → Fable lo PROPONE de oficio** cuando vea oportunidad de ahorrar limite de Pro, con los $
  reales delante. Detalle en la propia skill. **`command-code` NO se allowlista**: la
  allowlist filtra por prefijo de comando, no por modelo, y allowlistarla desbloquearia
  tambien deepseek sin gate — el clic de aprobacion es el precio de mantener cerrado el
  gate del gasto real.

  | Fase | Estado |
  |---|---|
  | 1 · Scaffolding — Vite + React + TS + Tailwind v4 + PWA | ✅ **HECHA** (16-jul) |
  | 2 · Capa de datos — tipos + 19 vinos | ✅ **HECHA** (17-jul, Fable + revisor hy3 OK) |
  | 3 · Layout y routing — Header + React Router | ✅ **HECHA** (17-jul, Fable + revisor hy3 6/6 PASS + preview 200) |
  | 4 · Componentes — SearchBar, WineCard, WineList, WineDetail, SimilarWines | ✅ **HECHA Y REVISADA** (16-jul CommandCode · 17-jul revision Fable: 1 fix doble-debounce) |
  | 5 · Diseno visual y responsive — paleta, espaciado | ✅ **HECHA** (17-jul, Fable + revisor hy3 8/8 PASS) |
  | 6 · PWA y offline — service worker, manifest, iconos | ✅ **HECHA** (17-jul, Fable + revisor hy3 8/8 PASS) |
  | 7 · Rediseño premium "La Carta del Sumiller" | ✅ **HECHA** (17-jul): tokens cálidos, Cormorant Garamond autoalojada, fotos de botellas extraídas del dosier, siluetas/ornamentos/motivo de viña SVG propios, tarjeta-etiqueta con tintas por familia, ficha técnica, View Transitions, entrada escalonada, ScrollToTop. Validado: lint + tsc + build verdes, preview 200. **Dos rondas de revisión (17-jul, Fable + Claude Code):** 1ª pasada de Kimi dejó el asset de Canva puesto en las 8 fichas (crítico) y el header descentrado en móvil (alto) — detectado por review de Fable. Corrección de Kimi solo arregló el header; las fotos quedaron con 6/8 ids compartiendo por error la misma foto (Castillo de Andrade) y 1/8 con un recorte de texto sin botella — detectado por Claude Code comparando texto de página (`extract_page_text.py`) contra cada imagen una a una. **Estado final tras la 2ª corrección (Claude Code):** las 8 fotos verificadas visualmente y mapeadas a su vino real; logo Sauci extraído y añadido a las cabeceras de sección; regresión de `text-muted-warm` (clase sin CSS generado, introducida al limpiar `index.css`) revertida a `text-muted` en 6 componentes; preload de fuente añadido; subpath muerto de `BottleSilhouette` eliminado. **Auditoria final de Fable (17-jul, 3ª ronda): PASS** — 8 fotos abiertas y verificadas una a una por el auditor, cobertura completa del mapa de familias, build verde; detalle de desviaciones menores aceptadas en el 🚦 de RETOMAR. Commit `657980a` pusheado con OK de Edu. |
  | **RETO V3 · "La Bodega"** | ✅ **EJECUTADO (18-jul madrugada, Fable):** rediseño completo al entorno bodega-oscura + papel; datos veraces sin invención; mono autoalojada; 44 errores de auditoría cubiertos; WCAG 36/36 medido en render real. Detalle: `docs/RETO_V3_2026-07-18.md` y 🚦 de RETOMAR. **Pendiente: OK de Edu + push.** |
  | RETO V2 · "La Carta del Sumiller" v2 (RECHAZADA por Edu — strike 2) | ✅ **HECHA (17-jul noche, Fable · F0-F7 completas):** ejecución completa de `docs/PLAN_RETO_V2_2026-07-17.md`. **F0:** 19 botellas con transparencia real (PIL flood-fill + crop + resize a 900px, webp RGBA), 16 fotos nuevas de Edu + 4 re-procesadas del dosier; logo renombrado a `logo-amen.jpg`; SVGs de marca (`AndradeEmblem` estrella 4 pétalos, `SauciMotif` velo de flor). **F1:** tipo `Wine` ampliado con `cata` (vista/nariz/boca), `maridaje`, `elaboracion`, `servicio`; `wineries.ts` con historia de ambas bodegas; `wines.ts` con 15 vinos enriquecidos desde `docs/INVESTIGACION_BODEGAS_2026-07-17.md` (los 4 solo-dosier conservan su ficha); `docs/CONTRADICCIONES_CATALOGO.md` con 6 discrepancias como munición para Edu. **F2:** `BottleStage.tsx` — panel oscuro con gradiente radial tinta→burgundy, viñeta, luz cenital, sombra elíptica, filete en tinta de familia, `viewTransitionName` para morph tarjeta→ficha. **F3:** navegación por familias — CSS `scroll-behavior: smooth`, barra sticky de chips con tintas, `IntersectionObserver` scroll-spy, lista reagrupada por familia con cabeceras centradas y sub-etiquetas de bodega. **F4:** ficha de sumiller — hero con `BottleStage` grande + nombre serifa + chips; ficha técnica ampliada (servicio, elaboración); cata en 3 bloques editoriales Vista·Nariz·Boca con drop cap; maridaje como chips navegables (tap → vuelve a la carta con `?q=`); franja de marca de bodega con emblema/logo, lema, historia y motivo de fondo; `SimilarWines` con fallback por familia (≥3 siempre) y mini-expositor. **F5:** buscador de sumiller — índice ampliado (nombre, bodega, tipo, uva, maridaje, cata); `useDeferredValue` (React 19) para teclear sin jank; chips de sugerencia ("ostras", "jamón", "chocolate"…); URL sync (`?q=`) para entrada desde maridaje; stagger SOLO en primer render (bug corregido). **F6:** editorial Amén — masthead con tagline "Vinos diferentes, historias únicas"; pie con Amén + "Selección de Bodegas Andrade y Bodegas Sauci"; PWA manifest "Amén — Carta de Vinos"; `reveal-up`/`reveal-fade` con `@supports (animation-timeline: view())` + fallback estático + `prefers-reduced-motion`; favicon y numeración editorial `01/19`. **F7:** PWA verificada — precache de webp/woff2 en `sw.js`; `lint` 0/0; `tsc -b` 0 errores; `npm run build` verde. **Bugs corregidos tras review:** maridaje chips rotos (WineList no leía `?q=`), stagger en cada filtro (no solo primer render), campos `imagenMarca`/`WineGroup`/`--accent` muertos eliminados. **Pendiente para F7 completo:** render real (puppeteer/Edge), contraste WCAG en expositor, capturas antes/después, OK de Edu en su móvil. |

  ```bash
  wsl -d Ubuntu -- bash -lc 'hermes kanban --board vinos-carta-app list'
  ```
  Reasignar a `fable` la fase que se trabaje (`hermes kanban assign <id> fable`) — ver skill
  `second-brain` en `promethe-os/.claude/skills/`.

- **Paleta y datos de vinos:** `docs/DISENO_REFERENCIAS.md`. **Spec:** `demo/SPEC_DEMO_V1.md` (24 KB,
  seria). **Sin campo `price` en la app** (decision cerrada: son tarifas B2B confidenciales).

> ### ⛔ NO uses la pipeline de Hermes. El `[SIGUIENTE]` de mas abajo esta OBSOLETO.
> El punto 4 de "Proximos pasos" dice *"migrar PLAN_DEMO_V1 a pipeline Kanban con 7 campos +
> `advance_workflow_phase` → `confirm_advance` → reviewer"*. **Eso esta roto y congelado**
> (16-jul): el plugin `dev-workflow` espera 7 columnas custom que la DB real no tiene, y el plan que
> lo guiaba es inejecutable (4 defectos, 3 silenciosos). Detalle:
> `promethe-os/docs/06_loop/contratos/AUDITORIA_FABLE_PLAN_PIPELINE_2026-07-16.md`.
> **Usa el Kanban nativo y punto.** La demo no depende de nada de Hermes.

- **Delegar trabajo mecanico:** skill `command-code` (hy3 gratis, verificada 16-jul). **El tool
  `Agent` esta PROHIBIDO** — consume el limite de Pro de Edu.
- **[EDU] pendiente:** rellenar placeholders nombre/empresa/fecha del presupuesto + leer §6-§7 de
  `DESGLOSE_PRECIOS_D1.md` antes de la reunion con el cunado.

---

**Historial de sesiones: vive en `git log` y en los docs de referencia, no aqui.**
Claves aun operativas de sesiones pasadas:

- **Sabado 18-jul (MAÑANA):** Edu ve al cunado en persona. **RESUELTO (17-jul noche):** demo
  desplegada online en Vercel (ver 🚦 arriba) — Edu la enseña por link/movil, no hace falta
  `npm run preview` local. Queda a Edu decidir si ademas enseña el presupuesto en esa visita.
- **D.1-D.6 cerradas** (detalle: tabla Cerrado arriba + `DESGLOSE_PRECIOS_D1.md` +
  `AUDITORIA_FABLE_RESPUESTA_2026-07-16.md`). Gestoria: semana del 20-jul (no bloquea).
- Precio vigente: **cifra cerrada A 4.600 / B 5.050** (opciones −200 disenadora / −200 CSV
  en papel). HORQUILLA.md = historico supersedido.
- Antecedente: Sonnet a esfuerzo medio fallo aritmetica precio+horas — no reabrir cifras
  con Sonnet sin verificacion explicita.
- Demo: CONTRATO/SPEC/PLAN aprobados y revisados (hy3, 15-jul). La maquinaria
  worker↔reviewer del PLAN quedo sustituida por el flujo del 🚦 de arriba.

### Pendientes

1. **RETO V3 ✅ EJECUTADO Y COMMITEADO (18-jul madrugada):** ver 🚦 de arriba — queda OK de Edu + `git push` a Vercel (la URL pública aún sirve la V2 rechazada)
2. Consulta gestoria con `docs/SPECS/CONSULTA_GESTORIA.md` (semana del 20-jul, antes de la 1ª factura) → **[EDU, en marcha]**
3. Correcciones mecanicas de la auditoria (lista al final de AUDITORIA_FABLE_RESPUESTA) → **[delegable, desbloqueado]**
4. [EDU] Presupuesto: rellenar nombre/empresa/fecha e imprimir a PDF + leer §6-§7 de DESGLOSE_PRECIOS_D1.md antes de presentar
5. Presentar al cunado: presupuesto + demo + Opcion B (+ preguntas B.3 de la auditoria; la 1 ya no hace falta por D.5; precios resuelto: SIN precios)
6. Decidir que hacer con la visita del sabado 18-jul → **[EDU, abierto]**

### Documentos de referencia

| Documento | Contenido |
|-----------|-----------|
| `docs/INFORMES/INFORME_TECNICO_PROFESIONAL.md` | ✅ **Completado.** 27 decisiones documentadas. 950 líneas, tono profesional, sin refs a Claude/IA. |
| `docs/INFORMES/INFORME_AUDITABLE_v4.md` | **Cerrado (v4).** Informe para auditoria externa con 3 rondas de correcciones aplicadas. Contiene las 25 decisiones en formato tabla. |
| `docs/SPECS/DECISIONES.md` | Registro de 25 decisiones con contexto, alternativas, tripwires (523 lineas). Algunas desactualizadas respecto a v4. |
| `docs/SPECS/HORQUILLA.md` | ⚠️ Supersedido (D.1). Historico de las 3 opciones originales. Vigente: DESGLOSE_PRECIOS_D1.md |
| `docs/SPECS/DESGLOSE_PRECIOS_D1.md` | ✅ Cifras ratificadas por Edu (A 3.900-5.200 · B 4.350-5.650), modelo interno de horas, suelos, palancas de recorte, guion de defensa (FAQ §7) |
| `docs/ENTREGABLES/PRESUPUESTO_APP_CARTA_VINOS.md` + `.html` | ✅ **Presupuesto final entregable al cliente** (cero rastro IA, voz de Edu). Pendiente: rellenar nombre/empresa/fecha |
| `docs/SPECS/MARCO_LEGAL.md` | Analisis legal: 036, IRPF 7%, tripwire RETA. ⚠️ Su §4 (N2→RETA) es regla de negocio heredada de Pepito, no norma — ver auditoria Fable 16-jul |
| `docs/REVIEWS/AUDITORIA_FABLE_RESPUESTA_2026-07-16.md` | ✅ Auditoria Fable: veredictos idea/planes/legal, cola D.1-D.6 para Edu, preguntas para el cunado |
| `docs/SPECS/CONSULTA_GESTORIA.md` | Notas limpias (voz de Edu, regla 4bis) para la consulta con la gestoria |
| `docs/INFORME_DESCUBRIMIENTO_2026-07-12.md` | Analisis completo de la entrevista inicial |
| `docs/DISENO_REFERENCIAS.md` | Paleta de colores (#f2ebe5, #73232d), 19 vinos para demo, assets |
| `docs/LOG_FASE4_COMMANDCODE_2026-07-16.md` | ✅ Log de Fase 4: 5 componentes creados por CommandCode con revisiones y correcciones |
| `demo/CONTRATO_DEMO_V1.md` | ✅ Contrato de la demo (alcance, stack, exclusiones) |
| `demo/SPEC_DEMO_V1.md` | ✅ Revisada y corregida (4 hallazgos: logo real, image?, TS ratificado, tailwind.config nota) |
| `demo/PLAN_DEMO_V1.md` | ✅ Revisado y corregido (3 hallazgos: tailwind init v3 eliminado, logo real, pwa.ts explicitado) |
| | ⚠️ Pendiente de migrar a pipeline Kanban (actualmente usa delegate_task directo) |

### Decisiones clave cerradas en v4

| Decision | Resolucion |
|----------|-----------|
| E.3 Mantenimiento vs cambios | Opcion B (proyecto + 3 meses cambios menores) como recomendada |
| D.2 Login | Codigo de acceso unico por restaurante, gestionado desde mini-admin |
| P6 Idioma | Español solo v1. Version cliente con QR como futura ampliacion |
| B.2 PDF inventario | Admin-side (informes de empresa), NO funcion de PDA |
| Anticipo | 30% al firmar, 70% contra entrega |
| Hosting Opcion C | Cloudflare Pages + Supabase, 0-10 €/mes |

### Lección sobre Principal como coordinador

**15-jul, corrección de Edu:** Principal NO ejecuta trabajo mecánico. No escribe
archivos, no crea MEMORY.md ni SOUL.md directamente. Su trabajo es:
1. Descomponer la tarea en encargos para perfiles especializados
2. Delegar vía `delegate_task` (perfiles delegate) o constructor CLI (mode: cli-only)
3. El Reviewer audita cada entrega antes de integrar
4. Coordinar, no hacer

Violar esto quema tokens de Pro en trabajo que un Worker barato haría mejor.

### Nota de workflow

Para mantener el turno abierto y evitar recarga del system prompt al responder,
usar la herramienta `clarify` (con choices) para preguntar, no texto plano
al final del mensaje.

### Restricciones vigentes

- Alta censal 036 (sin autonomo) para Opciones A y B. Opcion C exige RETA.
- Cifra final la decide Edu (vigente: cifra cerrada A 4.600 / B 5.050).
- Sin features por iniciativa propia (regla a-13-1).

---

## RESTRICCIONES DEL PROYECTO

- **Repo git activo con remote en GitHub** (17-jul): `https://github.com/eduardosmulero-tech/vinos-carta-app`
  (publico). `gh` CLI instalado via winget y logueado como `eduardosmulero-tech`. **Commits:
  siempre SIN coautoria (sin Co-Authored-By ni trailer de sesion) y con OK de Edu salvo el
  commit de cierre de sesion (protocolo 17-jul).**
- **Codigo en `app/`** — demo en construccion (Fase 1 ✅). Docs y analisis en `docs/` y `demo/`.
- **No anadir features por iniciativa propia** sin confirmacion del cliente (regla `a-13-1`).
- **Toda decision de dinero = Edu.** La cifra final la pone el.
- **No escribir propuesta con precio hasta tener A y D respondidas.**
- **CERO rastro de IA en cualquier documento final/de entrega** (cliente, cuñado, socia,
  gestoria, o cualquier tercero fuera del equipo de trabajo Edu+IA) — ni menciones
  explicitas ("generado con IA", "Claude", "Hermes"), ni estilo de escritura reconocible
  como IA (coletillas, disclaimers, exceso de estructura tipo informe generado). El
  documento final se entrega y se presenta como si lo hubiera escrito Edu enteramente,
  sin excepcion. Esto incluye lo que se lleve a la gestoria: si Edu consulta con un gestor,
  lo presenta como suyo, no como "esto me lo genero una IA, ¿esta bien?". Aplica a
  informes, presupuestos, contratos, y cualquier documento con destinatario fuera del
  proyecto. Los documentos de trabajo interno (DECISIONES.md, AGENTS.md, auditorias,
  encargos) no llevan esta restriccion — son para el equipo, no para entrega.

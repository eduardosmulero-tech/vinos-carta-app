# Auditoría Fable — `INFORME_PARA_FABLE_2026-07-12.md`

> Auditor: Fable 5, 12-jul-2026. Fuentes contrastadas: `respuestas-entrevista.json`,
> `INFORME_DESCUBRIMIENTO_2026-07-12.md`, `CLAUDE.md` del proyecto.
> Alcance: fidelidad del informe a sus fuentes + veredicto sobre los 4 puntos de su §B
> + respuesta a su §C. El precio NO se fija aquí (decisión de dinero = Edu).

---

## Veredicto global

El informe es **fiel a las fuentes en todo lo citable** (todas las citas `a-XX-X` cotejadas
contra el JSON: correctas) y separa bien hecho/propuesta. Tiene **una omisión grave** (H2:
el impacto del inventario en MVP no está analizado) y **una petición improcedente** (su §C.3
pide horquilla de precio ya, contradiciendo el "Próximo paso" del CLAUDE.md con gaps de
coste aún abiertos). Los 4 puntos de §B: 2 se mantienen, 1 se mantiene con condición, 1 se
cambia.

---

## H — Hallazgos sobre el informe

**H1 — §C.3 contradice el CLAUDE.md y es prematuro.** El CLAUDE.md dice "No escribir
propuesta con precio" hasta cerrar gaps; siguen abiertos los que más mueven el coste
(PDA, offline físico, alcance real del inventario, quién carga datos). Que la primera
oferta la hagamos nosotros (B.1) es correcto; que se pueda cifrar *hoy* no. Ver cola final.

**H2 — La subida del "informe de inventario" a MVP entra sin análisis de impacto (lo más
grave).** Un informe de inventario con **cantidades/stock** exige que alguien mantenga el
stock al día por restaurante: o carga manual continua (contradice "sin mantenimiento" y
"fácil para los restaurantes", `a-11-1`/`a-13-1`) o integración con TPV (contradice
`a-08-2`). Si "inventario" solo significa "listado de vinos de la carta", es casi gratis.
Esta única palabra puede duplicar la complejidad del MVP. Pregunta obligatoria al cuñado
antes de cerrar alcance: **¿el informe lleva cantidades de botellas o es el listado de la
carta?**

**H3 — "El catálogo se crea de cero" cierra el gap 4 pero abre un coste nuevo sin
dimensionar.** Si no hay migración, alguien de la empresa de vinos teclea N fichas
completas (con variedad de uva estructurada — de eso vive el motor de recomendaciones).
Ese esfuerzo de carga inicial y el diseño del mini-admin para hacerlo bien no aparecen
como coste en ningún doc.

**H4 — Hechos nuevos de §A solo existen en el informe; el CLAUDE.md quedó desfasado.**
Inventario→MVP, "catálogo de cero / sin integración", e "interlocutores = cuñado + socia"
no están en el JSON de la entrevista — vienen de lo que Edu transmitió en la conversación
con Sonnet (el informe lo declara, correcto). Tras el OK de Edu a esta auditoría hay que
actualizar el CLAUDE.md (gaps 2, 4 y 9 pasan a cerrados/transformados) para que la próxima
sesión no arranque con gaps muertos.

**H5 — Gaps vivos que el informe no menciona y siguen condicionando la oferta:** perfil
real del camarero (gap 3), `a-03-3`, `a-13-2`/`a-13-3` (bloqueadores, qué se sacrifica),
y todo el checklist del bloque 16 (forma/fecha de entrega de la propuesta). No invalidan
el informe, pero que nadie los dé por cerrados por omisión.

---

## B — Veredicto sobre los 4 puntos propuestos por Sonnet

**B.1 Primera oferta la hacemos nosotros → MANTENER.** Práctica estándar cuando el cliente
no da ni rango: ancla la conversación. Condición: la oferta se presenta como **horquilla
con supuestos explícitos y exclusiones** (qué pasa si el inventario lleva stock, si hace
falta offline, etc.), nunca cifra cerrada. La cifra la decide Edu.

**B.2 PWA en vez de nativa → MANTENER con tripwire.** Es la cobertura correcta contra la
incógnita de las PDA, y además deja el camino barato hacia offline (service worker), lo
que refuerza B.3-corregido. **Tripwire de reversión:** si las PDA resultan ser terminales
capados sin navegador moderno (Chrome/WebView actualizable), se reabre y se evalúa
nativa/híbrida. Verificación barata: pedir al cuñado marca/modelo o una foto de la PDA
**antes de firmar nada**.

**B.3 Offline descartado para v1 → CAMBIAR.** Decisión prematura tomada sobre una
contradicción sin resolver (`a-06-2` vs escenario físico, gap 6). El caso de uso es un
camarero delante del cliente respondiendo en segundos: un punto muerto de wifi en sala o
bodega hace fallar la app exactamente en su momento de valor. Sustituto que propongo:
**lectura offline de la carta cacheada** (cache-first con service worker sobre la PWA) —
la carta de un restaurante es un dataset pequeño y estático, el coste es bajo y no
necesita sync compleja. Lo que sí queda fuera de v1 es cualquier offline de escritura.
La pregunta del escenario físico al cuñado sigue en pie, pero con esto la respuesta deja
de ser bloqueante.

**B.4 Mini-admin para el catálogo maestro → MANTENER y AMPLIAR.** La inferencia es
correcta (sin admin no hay contenido) pero corta: `a-08-3` implica **dos superficies de
carga** — la empresa de vinos (catálogo maestro) y los restaurantes (su carta). Cuántas
superficies tiene la v1 depende de la decisión pendiente del punto final de §A, ver C.2.

---

## C — Respuesta a lo que el informe pide a Fable

**C.2 (catálogo maestro → carta de restaurante): adelanto recomendación, decide el
cuñado.** Para v1: **la empresa de vinos gestiona todo** — su catálogo y la asignación de
la carta de cada restaurante; los restaurantes solo consultan. Por qué: encaja con "fácil
de usar para los restaurantes" (`a-13-1`), elimina el gap 7 (carga inicial), reduce B.4 a
una sola superficie de admin y recorta alcance/precio. La autogestión por restaurante
puede ser fase 2 sin tirar nada. Tripwire: si el cuñado dice que los restaurantes exigen
autonomía desde el día uno, se reabre y B.4 crece.

**C.3 (alcance final + horquilla): NO todavía.** Motivo en H1. Queda listo en cuanto se
respondan las 4 preguntas de abajo; la horquilla la construye la siguiente sesión con Edu
y la cifra la decide Edu.

---

## Cola para Edu (en orden)

1. **Ratificar los 3 hechos de H4** (inventario→MVP, catálogo de cero, interlocutores) —
   son cosas que tú mismo transmitiste; con tu OK se actualiza el CLAUDE.md.
2. **4 preguntas al cuñado** (todas baratas, todas mueven precio):
   a. ¿El informe de inventario lleva **cantidades/stock** o es el listado de la carta? (H2)
   b. **Marca/modelo de las PDA** (o una foto). (tripwire B.2)
   c. ¿Cobertura wifi real en sala/terraza/bodega? (cierra gap 6 del todo)
   d. ¿OK a que en v1 la empresa de vinos gestione las cartas y los restaurantes solo
      consulten? (C.2)
3. Con esas respuestas: sesión de alcance final + horquilla (C.3), decisión de cifra tuya.

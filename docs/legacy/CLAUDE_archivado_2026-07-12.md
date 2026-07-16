# CLAUDE.md — Proyecto "App carta de vinos" (nombre provisional)

> Archivo de contexto para arrancar cualquier chat ya alineado. Léelo entero antes de responder.
> Manda `C:\proyectos\CLAUDE.md` (raíz) para reglas del workspace en general.

---

## Quién es el cliente

- Empresa de vinos. El encargo llega a Edu a través de su **cuñado**, que trabaja allí — no es un cliente directo de Edu, hay un intermediario.
- **Quién decide por parte del cliente: el cuñado de Edu y su socia** (transmitido por Edu, ratificado 12-jul).
- **No es proyecto Pepito** (ese es otro cliente, en `GapTecnologicoUtrera`). Este es un encargo nuevo, distinto, para una empresa real de vinos con restaurantes como clientes propios.

## Qué es el proyecto

App biblioteca de vinos para camareros de restaurante: consultan al momento la carta de vinos *de ese restaurante* (no el catálogo general de la empresa de vinos), con ficha detallada de cada vino y recomendaciones por uva parecida. Sustituye, en parte, a los cursos de formación de vinos presenciales que la empresa da hoy — la rotación de camareros (cada 2-3 meses) hace que formar en persona no escale.

**Modelo de negocio**: la app no genera ingresos directos. Forma parte de un paquete de servicios que la empresa de vinos ya vende a los restaurantes.

**Arquitectura implícita desde el minuto uno**: multi-tenant. Un catálogo maestro (empresa de vinos) + N restaurantes, cada uno viendo solo su propia carta.

**Datos**: el catálogo de vinos de esta app **se crea de cero dentro de la app** — la BD/programas internos de la empresa de vinos son cosa aparte, no hay migración ni integración (ratificado 12-jul). Consecuencia: la carga inicial de fichas (con variedad de uva estructurada, de la que vive el motor de recomendaciones) es un coste de proyecto a dimensionar, no un import.

## Estado del proyecto

**Fase: descubrimiento auditado, pendiente de 4 respuestas del cuñado antes de horquilla.**

Documentos, en orden de vigencia:
1. `docs/INFORME_CLIENTE_2026-07-12.md` — informe nivel usuario para el cuñado, YA ENTREGADO
   a Edu 12-jul para pasar al cliente. Resume lo diseñado (MVP 4 funciones, catálogo maestro +
   carta por restaurante, PWA sin instalación, lectura offline de la carta, panel de gestión)
   y cierra con las preguntas A y D redactadas para copiapegar. Sin precio ni alcance cerrado.
2. `docs/AUDITORIA_INFORME_FABLE_2026-07-12.md` — auditoría de Fable (VIGENTE: veredictos B.1–B.4, hallazgos H1–H5, cola de preguntas).
3. `docs/INFORME_PARA_FABLE_2026-07-12.md` — elevación de Sonnet a Fable (ya auditado; leer con la auditoría al lado).
4. `docs/INFORME_DESCUBRIMIENTO_2026-07-12.md` + `docs/respuestas-entrevista.json` — análisis de la entrevista inicial y datos crudos.

**No se ha escrito ninguna propuesta con precio ni alcance cerrado todavía.** La primera oferta la haremos nosotros (B.1, auditado: MANTENER) como **horquilla con supuestos explícitos y exclusiones** — nunca cifra cerrada; la cifra la decide Edu.

**MVP declarado por el cliente — ahora 4 funciones** (el cliente subió el inventario a MVP, ratificado 12-jul):
1. Búsqueda de vinos en la carta.
2. Ficha detallada de cada vino.
3. Recomendaciones de uvas parecidas.
4. Informe de inventario — ⚠ **alcance sin definir**: si lleva cantidades/stock puede duplicar la complejidad (¿quién mantiene el stock?); si es solo el listado de la carta, es casi gratis. Pregunta obligatoria al cuñado (H2 de la auditoría).

**Restricción explícita del cliente, cítala en cualquier propuesta**: *"No quiere volverse loco con features inútiles y sin valor. Quiere una app útil para los camareros y fácil de usar para los restaurantes. Todo lo demás llegará más adelante."*

## Decisiones técnicas auditadas (12-jul, Fable)

- **PWA responsive** en vez de nativa — MANTENIDA. Tripwire: si las PDA no tienen navegador moderno (Chrome/WebView), se reabre y se evalúa nativa/híbrida.
- **Offline**: NO descartado. v1 lleva **lectura offline de la carta cacheada** (cache-first con service worker; dataset pequeño y estático, coste bajo). Fuera de v1: cualquier offline de escritura.
- **Mini-admin** para el catálogo maestro — MANTENIDO y ampliado: `a-08-3` implica potencialmente dos superficies de carga (empresa + restaurante); cuántas tiene la v1 depende de la decisión C.2 (abajo).
- **Recomendación C.2 adelantada por Fable, decide el cuñado**: en v1 la empresa de vinos gestiona todo (catálogo + asignación de cartas), los restaurantes solo consultan. Recorta alcance, elimina el gap de carga inicial y encaja con la restricción del cliente. Autogestión por restaurante = fase 2. Tripwire: si los restaurantes exigen autonomía desde el día uno, se reabre y el admin crece.

## Gaps abiertos antes de poder presupuestar

Cerrados 12-jul (ratificados por Edu): quién decide (cuñado + socia), origen de datos (catálogo de cero, sin migración), estatus del inventario (es MVP, falta su alcance).

Cerrados 12-jul noche (respuestas del cuñado vía Edu):
- **PDA**: cada restaurante tendrá sus propios modelos, heterogéneos → se confirma PWA "lo más general posible". Tripwire de la PWA sigue vivo solo para el caso raro de terminal sin navegador. Adaptaciones a modelos concretos de restaurantes concretos = posible ingreso futuro facturable (**upside, no contar en el pricing base**).
- **Wifi**: contar con que siempre hay (hoy es muy raro que no) + plan B sencillo → exactamente la carta cacheada ya decidida. Cerrado del todo.

Siguen abiertos:
1. Presupuesto — sin rango del cliente; lo destraba nuestra horquilla (B.1), tras las preguntas de abajo.
2. Perfil real del camarero-usuario (edad, comodidad con tecnología) — condiciona UI.
3. **Inventario: ¿cantidades/stock o listado de la carta?** — la pregunta que más mueve el precio. (Pregunta A, redactada para el cuñado 12-jul, pendiente de respuesta.)
4. ¿Quién gestiona las cartas: empresa de vinos o cada restaurante? (Pregunta D / recomendación C.2, redactada para el cuñado 12-jul, pendiente de respuesta.)
5. Contradicción mantenimiento: quieren "sin mantenimiento" pero "cambios futuros" sin presupuesto reservado — se resuelve en la propuesta con una **cuota mensual pequeña** (hosting + soporte + cambios menores).
6. Próxima fecha de contacto / forma de recibir la propuesta (checklist bloque 16, todo sin marcar).

## Criterios de pricing ya decididos (no re-litigar)

- Horquilla con supuestos, nunca cifra cerrada. La cifra final la decide Edu.
- La ganancia de productividad por IA es **margen de Edu, no descuento del cliente**: no revelar multiplicadores tipo "2 semanas con Claude vs 4 meses solo" (además, no son datos medidos). Se cobra el entregable, no las horas ni las herramientas.
- La sub de Claude (Pro 18 €/mes) va como overhead dentro de la horquilla y/o dentro de la cuota mensual de soporte junto al hosting — sin línea propia. El proyecto cobrado es el "ingreso real" que, por la regla propia de Edu, justifica mantener la sub.
- Arquitectura barata de operar (sin coste recurrente alto), coherente con "sin mantenimiento".

## ▶ Próximo paso

De las 4 preguntas al cuñado, b (PDA) y c (wifi) ya respondidas (ver gaps cerrados). Quedan
**A (inventario) y D (gestión de cartas)** — redactadas nivel usuario dentro de
`docs/INFORME_CLIENTE_2026-07-12.md`, entregado a Edu el 12-jul para pasar al cuñado.
**Esperando las respuestas del cuñado — próxima sesión arranca leyendo A y D ya contestadas.**
Con esas 2 respuestas → sesión de alcance final + horquilla (documento de propuesta). No
escribir propuesta con precio antes de eso.

## Reglas de trabajo

- Español siempre.
- No commitear sin OK de Edu (este proyecto de momento ni siquiera es un repo git).
- Sonnet no decide arquitectura ni cierra alcance/precio por su cuenta — presenta análisis y gaps, las decisiones de cliente/negocio las cierra Edu (y su cuñado como interlocutor del cliente). Las decisiones técnicas ya auditadas por Fable (sección de arriba) no se re-litigan sin dato nuevo que dispare su tripwire.

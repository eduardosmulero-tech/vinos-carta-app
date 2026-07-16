# AUDITORÍA — INFORME_TECNICO_PROFESIONAL.md

> **Documento auditado:** `docs/INFORMES/INFORME_TECNICO_PROFESIONAL.md` (1371 líneas)
> **Fuentes de cotejo:** `DECISIONES.md` (523 líneas), `INFORME_AUDITABLE_v4.md` (778 líneas), `AGENTS.md` (165 líneas)
> **Fecha de auditoría:** 15 de julio de 2026
> **Auditor:** Hermes Agent

---

## RESUMEN

| Tipo | Cantidad |
|------|----------|
| 🔴 Errores graves | 7 |
| 🟡 Mejoras necesarias | 12 |
| ⚪ Sugerencias | 8 |
| **Total** | **27 hallazgos** |

---

## 🔴 ERRORES GRAVES

### E01 — Toda la sección 1 (Introducción) es un alegato anti-Claude, no una introducción profesional

**Ubicación:** Líneas 58–131 (sección completa)
**Descripción:** La sección se titula «Introducción: por qué esto no es preguntarle a Claude». En lugar de presentar el proyecto, el cliente, el problema de negocio y el contexto profesional, dedica ~74 líneas a argumentar por qué una IA no puede hacer el trabajo. Subsecciones 1.1 a 1.6 son todas variantes del mismo argumento. En un informe técnico profesional, la introducción debe presentar el proyecto, no defenderse de una pregunta que el cliente ni siquiera ha formulado aún.
**Propuesta:** Reescribir completamente la sección 1 con:
- Descripción del proyecto y cliente
- Problema de negocio a resolver
- Principio rector del cliente (a-13-1)
- Mapa del documento
- El tono «defensivo» debe desaparecer por completo. Si se quiere incluir un párrafo breve explicando el valor del trabajo profesional frente a IA, debe ser un sidebar o nota al pie, no el mensaje principal de la introducción.

---

### E02 — Las 27 secciones «Por qué no vale preguntárselo a Claude» son redundantes y restan profesionalidad

**Ubicación:** A.1 (l.185), A.2 (l.233), A.3 (l.280), A.4 (l.322), B.1 (l.372), B.2 (l.429), B.3 (l.517), B.4 (l.579), B.5 (l.621), B.6 (l.658), C.1 (l.709), C.2 (l.763), D.1 (l.808), D.2 (l.851), D.3 (l.893), E.1 (l.931), E.2 (l.965), E.3 (l.1004), E.4 (l.1050), E.5 (l.1089), F.1 (l.1131), F.2 (l.1164), F.3 (l.1199), G.1 (l.1243), G.2 (l.1279), H.1 (l.1314) — 26 de 27 decisiones la tienen.
**Descripción:** Cada decisión incluye una sección «Por qué no vale preguntárselo a Claude» con 2–4 puntos numerados. El contenido es siempre el mismo patrón: «una IA no puede porque no hizo la entrevista / no conoce el negocio / no sabe poner tripwires / no asume responsabilidad». Esto ocupa ~350 líneas de contenido altamente repetitivo. La argumentación profesional ya está completa en las tablas de «Por qué se ha elegido esta opción» + «Impacto en el precio». La sección Claude no añade información técnica — solo defensa.
**Propuesta:** Eliminar todas las secciones «Por qué no vale preguntárselo a Claude». Opcionalmente, crear una ÚNICA sección al inicio (tipo nota al margen, sin numerar) titulada «Criterio profesional aplicado» donde se explique el enfoque de trabajo, sin mencionar IAs por nombre. Pero la recomendación fuerte es eliminarlas por completo.

---

### E03 — El índice no tiene anchors funcionales

**Ubicación:** Líneas 17–54
**Descripción:** El índice usa sintaxis de Markdown `[texto](#ancla)` pero las anclas contienen caracteres especiales (tildes, ñ, «») y no se corresponden con los anchors que genera el renderizador de Markdown. Por ejemplo `(#2-metodología-cómo-se-ha-llegado-a-las-25-decisiones)` — la `í` y la `ó` no se renderizan igual en todos los motores. El índice es puramente decorativo y los links no funcionan en la mayoría de visores.
**Propuesta:** Corregir los anchors utilizando solo caracteres ASCII seguros (a-z, 0-9, guiones). Alternativa: eliminar los links y usar un índice plano. O usar un generador automático de TOC que calcule los anchors correctos para el renderizador destino.

---

### E04 — Error de conteo: el documento dice «25 decisiones» pero hay 27

**Ubicación:** Líneas 75, 151, 161 (y heredado de fuentes)
**Descripción:** El documento afirma «25 decisiones» en tres ocasiones. Sin embargo, el índice y el contenido del documento enumeran 27 secciones de decisión: A.1–4 (4), B.1–6 (6), C.1–2 (2), D.1–3 (3), E.1–5 (5), F.1–3 (3), G.1–2 (2), H.1–2 (2) = 27. El error está presente también en INFORME_AUDITABLE_v4.md (l.41) y DECISIONES.md (tiene 27 secciones pero nunca afirma un número). Es un error factual que se ha propagado de las fuentes.
**Propuesta:** Verificar el conteo real de decisiones. Si son 27, actualizar todas las referencias de «25» a «27» en las líneas 75, 151, 161 y en el título de la sección 2. Si se decide que G.1–2 y H.1–2 no son «decisiones de diseño» sino «decisiones de proceso», aclararlo explícitamente.

---

### E05 — Se menciona un informe de riesgos que no existe en el documento

**Ubicación:** Líneas 104–109
**Descripción:** La sección 1.4 dice «El informe de riesgos identifica 6 riesgos principales (R1–R5 y R9) con probabilidades e impactos» y describe R9 y R4 en detalle. Sin embargo, el documento INFORME_TECNICO_PROFESIONAL.md NO incluye una sección de riesgos. Los riesgos se mencionan de pasada pero nunca se presentan en una tabla formal como sí hace INFORME_AUDITABLE_v4.md (§6). Esto es engañoso: el lector cree que existe un análisis de riesgos completo pero no puede consultarlo.
**Propuesta:** Añadir una sección de riesgos completa (tabla con #, riesgo, probabilidad, impacto, mitigación) tomada de INFORME_AUDITABLE_v4.md §6. O eliminar las referencias a riesgos si no se va a incluir la tabla.

---

### E06 — No hay sección de presupuesto ni costes

**Ubicación:** Ausencia en todo el documento
**Descripción:** INFORME_AUDITABLE_v4.md dedica una sección completa (§4) al presupuesto con alcance común, 3 opciones detalladas, exclusiones y comparativa de mercado. INFORME_TECNICO_PROFESIONAL.md, pese a llamarse «Informe técnico-profesional» y venir con una propuesta de presupuesto, no incluye ninguna tabla de costes ni opciones de presupuesto. La única información de precio está dispersa en los «Impacto en el precio» de cada decisión. Un informe profesional debe incluir al menos un resumen de costes.
**Propuesta:** Añadir una sección de presupuesto con:
- Resumen de alcance común
- 3 opciones con rangos (A: 3.150–5.300€, B: 3.450–5.900€, C: 2.650–4.300€ + 25–50€/mes)
- Exclusiones documentadas

---

### E07 — Afirmación potencialmente incorrecta sobre la capacidad de migración

**Ubicación:** Línea 663
**Descripción:** La sección B.6 dice: «Una IA sugeriría 'conéctate a la base de datos existente y extrae los datos'. Pero cuando el cliente no sabe ni qué programa es, esa opción no existe.»
**Cotejo:** Es cierto que el cliente no sabe qué programa es (a-08-1). Sin embargo, la afirmación textual atribuida a la IA («conéctate a la base de datos existente») es un straw man. Una IA competente también preguntaría primero o propondría alternativas. La sección está forzando el contraste. Más allá del tono, se afirma como hecho que la migración es «inviable porque no se conoce el sistema origen» lo cual es correcto. El error no es de contenido técnico sino de presentación sesgada.
**Propuesta:** Al eliminar la sección anti-Claude, este punto desaparece. Si se mantuviera algún resumen, reformular como «Riesgo documentado: sistema origen desconocido → creación desde cero como mitigación».

---

## 🟡 MEJORAS NECESARIAS

### M01 — Tono del documento: parece un argumentario contra IA, no un informe profesional

**Ubicación:** General, especialmente sección 1 completa y las 26 secciones anti-Claude
**Descripción:** El título dice «INFORME TÉCNICO-PROFESIONAL» pero el contenido se lee como una defensa contra una pregunta que el cliente no ha hecho. La introducción entera (sección 1) no habla del proyecto, sino de por qué la IA no es suficiente. Cada decisión dedica ~30% de su espacio a lo mismo. Un informe profesional transmite autoridad presentando el trabajo, no explicando por qué no se lo ha pedido a una máquina.
**Propuesta:** Reenfocar todo el documento desde «por qué esto es profesional» a «cómo se ha resuelto cada problema». La sección «Por qué se ha elegido esta opción» ya hace eso. Eliminar las secciones anti-Claude y el tono defensivo de la introducción.

---

### M02 — H.2 no sigue la misma estructura que el resto de decisiones

**Ubicación:** Líneas 1327–1351
**Descripción:** Es la única sección que:
- No tiene la tabla estándar «Aspecto | Decisión tomada | Alternativa descartada»
- Usa «Por qué estamos aquí» en lugar de «Por qué no vale preguntárselo a Claude»
- No lleva la estructura completa (Decisión → Por qué se ha elegido → ¿Por qué no Claude? → Impacto en precio)
**Propuesta:** Uniformar H.2 al formato del resto de decisiones, o justificar por qué es diferente (por ejemplo, renombrarla como «decisión interna» y darle un formato distinto intencionadamente).

---

### M03 — Se menciona «Pregunta A» sin explicación

**Ubicación:** Líneas 415, 416, 432, 448, 452
**Descripción:** La sección B.2 usa repetidamente «la investigación con el cliente (Pregunta A)» y «Pregunta A» sin definir qué es. El lector que no tenga acceso a las fuentes no sabe si «Pregunta A» es una encuesta, una entrevista de seguimiento o un formulario.
**Propuesta:** En la primera mención, explicar qué es: «Pregunta A = entrevista de seguimiento con el cuñado para resolver el alcance del informe de inventario». O usar una nota al pie.

---

### M04 — Faltan datos de contacto y contexto del documento

**Ubicación:** Líneas 4–11 (encabezado)
**Descripción:** El encabezado tiene cliente, desarrollador y fecha, pero no incluye:
- Versión del documento
- Estado (borrador / revisión / final)
- Información de contacto de Edu
- Propósito del documento (¿para quién es?)
**Propuesta:** Añadir metadatos: versión, estado, propósito, contacto. El propio AGENTS.md dice que este documento está «en elaboración» — debería reflejarse aquí.

---

### M05 — No hay tabla de fuentes completa

**Ubicación:** Líneas 1354–1367 (Anexo)
**Descripción:** El anexo de fuentes tiene una tabla con 10 entradas, pero INFORME_AUDITABLE_v4.md referencia 13+ fuentes. Faltan:
- DISENO_REFERENCIAS.md (paleta de colores)
- HORQUILLA.md (opciones de presupuesto)
- AUDITORIA_FABLE.md (veredictos de auditoría)
- investigación en `/home/edu/.hermes/cache/investigacion-vinos.md`
**Propuesta:** Completar la tabla de fuentes con todas las fuentes reales, incluyendo rutas de archivo.

---

### M06 — Se usa «cuñado» como única designación del interlocutor

**Ubicación:** Líneas 8, 82–84, 138, 311, 326, 375, 406, 452, 565, 609, 665, 917–918, 928, 935, 1109, 1111, 1146, 1151, 1186, 1230, 1266, 1358
**Descripción:** En todo el documento se refiere al interlocutor como «el cuñado» o «el cuñado de Edu». Si bien es factualmente correcto, en un informe profesional que será leído por TERCEROS (la socia, el amigo auditor, posiblemente el propio cuñado) resulta informal y puede resultar incómodo. Aparece en ~20 ubicaciones.
**Propuesta:** Usar «el contacto principal» o «el interlocutor» en lugar de «el cuñado» en el cuerpo del documento. Mantener «cuñado de Edu» solo en la identificación inicial del cliente (línea 8).

---

### M07 — La referencia «Fable» aparece sin explicación

**Ubicación:** Líneas 1038, 1303
**Descripción:** Se menciona «la auditoría externa (Fable)» sin explicar qué o quién es Fable. El lector no sabe si es una persona, una empresa o una IA.
**Propuesta:** En la primera mención, añadir contexto breve: «Fable (herramienta de auditoría de proyectos)» o «Fable (auditor externo)».

---

### M08 — La sección 1.5 («Responder ante Hacienda») es innecesaria en el cuerpo principal

**Ubicación:** Líneas 112–115
**Descripción:** La sección 1.5 explica que «cuando el cliente pide una factura, Edu emite una con su nombre, NIF...». Esto es información legal/fiscal que debería estar en un anexo o sección separada, no en la introducción argumentativa. Actualmente suena a «la IA no puede facturar» como argumento anti-Claude.
**Propuesta:** Mover a una sección de aspectos legales (siguiendo el modelo de INFORME_AUDITABLE_v4.md §5) o eliminar si no se va a incluir análisis legal completo.

---

### M09 — Las tablas de decisión no siguen todas el mismo formato

**Ubicación:** A.1 (l.177–184) vs. el resto de decisiones
**Descripción:** La tabla de A.1 usa el encabezado «Criterio | PWA responsive | App nativa (alternativa descartada)». Pero todas las demás decisiones usan «Aspecto | Decisión tomada | Alternativa descartada». A.1 es la única que no sigue esta convención.
**Propuesta:** Uniformar la tabla de A.1 al formato estándar usado en el resto del documento.

---

### M10 — La sección E.3 mezcla el contexto y las alternativas en una tabla de 3 opciones

**Ubicación:** Líneas 997–1001
**Descripción:** La tabla de E.3 tiene una fila vacía en la primera celda (`| | Opción A | Opción B | Opción C |`). Todas las demás decisiones tienen tablas de 2 columnas (Decisión tomada vs Alternativa descartada). E.3 introduce una tabla de 4 columnas que no sigue el patrón.
**Propuesta:** Mantener la tabla de 3 opciones (es la única decisión que realmente evalúa 3 alternativas vivas), pero añadir una fila de encabezado explícita: `| Criterio | Opción A | ✅ Opción B | Opción C |`.

---

### M11 — Errores ortotipográficos detectados

**Ubicación:** Varias
**Descripción:**
- Línea 69: «Una IA sugiere opciones.» — Correcto
- Línea 94: «Una tarifa 2026 de Bodegas Sauci con productos y precios» — Correcto
- Línea 148: «Análisis de los dosieres y tarifas del cliente (19 vinos documentados)» — Correcto
- Línea 686: «Sin ABM (Altas, Bajas, Modificaciones) completo de restaurantes.» — Estilo: debería ser «Altas, Bajas y Modificaciones» o «ABM (altas, bajas, modificaciones)»
- Línea 997: Tabla con primera celda vacía: `| | Opción A (descartada) | ✅ Opción B (elegida) | Opción C (descartada) |` — falta encabezado de fila
- Línea 126: «**En resumen:**» — Correcto
- En general no se detectan tildes faltantes ni errores ortográficos graves. La ortografía es buena.

**Propuesta:** Revisar la tabla de E.3 y la redacción de ABM.

---

### M12 — No hay un resumen ejecutivo

**Ubicación:** Ausencia
**Descripción:** Un informe técnico profesional de 1371 líneas debería comenzar con un resumen ejecutivo de 1–2 párrafos que sintetice: qué proyecto, para quién, qué incluye, cuánto cuesta y en qué plazo. INFORME_AUDITABLE_v4.md tiene un resumen ejecutivo (§1). INFORME_TECNICO_PROFESIONAL.md salta directamente a la introducción anti-Claude.
**Propuesta:** Añadir un resumen ejecutivo antes de la sección 1.

---

## ⚪ SUGERENCIAS

### S01 — La sección 2 (Metodología) debería ser más visual

**Ubicación:** Líneas 133–165
**Descripción:** Describe 5 fases del proceso con texto plano. Sería más profesional presentarlas como un timeline, diagrama o tabla con hitos y entregables de cada fase.
**Propuesta:** Convertir a tabla o usar iconos/emojis de fase (🔍 → 📋 → 🎯 → ✅ → 📄).

### S02 — Faltan referencias cruzadas entre decisiones

**Descripción:** Varias decisiones dependen unas de otras (ej: A.2 offline cacheado sirve a G.2 conectividad). Sería profesional añadir notas del tipo «Ver también: [A.2](#a2-offline)».
**Propuesta:** Añadir referencias cruzadas donde corresponda (al menos: A.2↔G.2, C.1↔C.2, B.3↔B.4, D.1↔D.2).

### S03 — Unificar el criterio de nomenclatura de alternativas

**Descripción:** Algunas tablas usan «Alternativa descartada» como columna, otras usan nombres más descriptivos. Unificar ayudaría a la legibilidad.
**Propuesta:** Usar siempre «Decisión tomada | Alternativa descartada» como en el resto del documento.

### S04 — Considerar convertir el documento a dos caras: ejecutiva y técnica

**Descripción:** El documento intenta ser dos cosas a la vez: (1) justificación profesional para el cliente y (2) documento técnico. Esto genera tensión: demasiado técnico para un cliente no técnico, demasiado argumentativo para un informe técnico.
**Propuesta:** Separar en dos documentos:
- **Informe ejecutivo** (2–3 páginas): qué se hace, por qué, cuánto cuesta, para el cliente
- **Anexo técnico** (este documento, depurado): decisiones detalladas para otros profesionales

### S05 — Incluir diagrama de arquitectura

**Descripción:** El documento describe decisiones de arquitectura (PWA, multi-tenant, offline) pero no incluye ningún diagrama. Un esquema visual de la arquitectura mejoraría la comprensión.
**Propuesta:** Añadir diagrama de arquitectura simplificado (caja del frontend PWA → backend multi-tenant → bases de datos → integraciones externas).

### S06 — Las secciones de «Impacto en el precio» son redundantes entre sí

**Descripción:** Cada decisión termina con «Impacto en el precio». Muchos dicen lo mismo: «está incluido en el desarrollo base» (A.2, A.3, B.1, B.3, C.1, D.2, D.3, F.1, F.2, F.3, G.2). Esto es informativo pero repetitivo.
**Propuesta:** Consolidar en una tabla única de impacto de decisiones en el precio, y en cada decisión solo poner una nota breve con el impacto específico si es distinto de cero.

### S07 — Revisar la extensión del documento

**Descripción:** 1371 líneas es muy extenso para un informe técnico profesional. INFORME_AUDITABLE_v4.md cubre el mismo contenido en 778 líneas siendo más completo (incluye presupuesto, riesgos, legal, preguntas para auditor). La diferencia está en las ~500 líneas de secciones anti-Claude y en tablas más prolijas.
**Propuesta:** Tras eliminar las secciones anti-Claude y añadir presupuesto/riesgos, apuntar a ~800–900 líneas.

### S08 — Añadir un glosario de referencias (a-XX-XX)

**Descripción:** El documento usa referencias como a-06-2, a-08-1, a-13-1 etc. sin explicar el formato. Un lector externo no sabe qué significa «a-06-2».
**Propuesta:** Añadir nota al pie o glosario: «Las referencias tipo a-XX-XX corresponden a preguntas y respuestas codificadas de la entrevista estructurada con el cliente (ver Anexo: fuentes documentales)».

---

## ANÁLISIS TRANSVERSAL DEL PROBLEMA ANTI-CLAUDE

### Diagnóstico

Las secciones «Por qué no vale preguntárselo a Claude» representan **~400 líneas** del documento (~29% del total). Aparecen en **26 de 27** decisiones. El contenido sigue un patrón constante:

```
La IA [hace/sugiere] X. Un profesional sabe Y.
```

Ejemplos literales:
- «Una IA sugiere opciones. Un profesional elige una y responde por ella.»
- «Una IA de seguridad recomendaría autenticación de dos factores. Un profesional sabe que el nivel de seguridad debe calibrarse al riesgo.»
- «Una IA sugeriría offline total. Un profesional sabe dónde parar.»

### Impacto

1. **Resta credibilidad profesional** — Un informe que dedica el 29% de su espacio a decir «esto no lo hace una IA» transmite inseguridad, no autoridad.
2. **Repite el mismo argumento 26 veces** — Cada sección essencialmente dice lo mismo con distintas palabras.
3. **Hace el documento innecesariamente largo** — Sin estas secciones, el documento pasaría de ~1371 líneas a ~950.
4. **Desvía la atención del contenido técnico** — El lector se centra en el debate IA vs humano en lugar de en las decisiones.

### Recomendación general

**Eliminar todas las secciones «Por qué no vale preguntárselo a Claude».** La argumentación profesional está completa en:
- La tabla «Por qué se ha elegido esta opción» (contexto + criterios)
- El tripwire documentado
- El «Impacto en el precio»

Como alternativa, si se desea mantener el espíritu de «profesionalismo frente a automatización», crear una **única sección al principio del documento** (no numerada, tipo nota destacada) titulada, por ejemplo, *«Nota sobre el uso de IA en este proyecto»*, de ~1 párrafo, donde se indique que la IA se usó como herramienta bajo supervisión profesional (como una calculadora), sin mencionar a Claude por nombre. Esto queda profesional y elimina el tono defensivo.

---

## TABLA RESUMEN DE HALLAZGOS

| # | Tipo | Sección | Línea(s) | Descripción breve | Prioridad |
|---|------|---------|----------|-------------------|-----------|
| E01 | 🔴 | §1 | 58–131 | Intro completa es alegato anti-Claude, no introducción profesional | Alta |
| E02 | 🔴 | Todas las secciones anti-Claude | ~185–1318 | 26 secciones redundantes, ~400 líneas, mismas ideas repetidas | Alta |
| E03 | 🔴 | Índice | 17–54 | Anchors de TOC no funcionales (tildes, caracteres especiales) | Alta |
| E04 | 🔴 | §1, §2 | 75,151,161 | Afirma «25 decisiones» pero hay 27 secciones | Alta |
| E05 | 🔴 | §1.4 | 104–109 | Menciona informe de riesgos que no existe en el documento | Alta |
| E06 | 🔴 | Ausente | — | Falta sección de presupuesto (alcance común + opciones + exclusiones) | Alta |
| E07 | 🔴 | B.6 | 663 | Straw man sobre capacidad de IA para migrar datos | Media |
| M01 | 🟡 | General | — | Tono defensivo contra IA, no profesional | Alta |
| M02 | 🟡 | H.2 | 1327–1351 | Rompe el formato estándar de decisiones | Media |
| M03 | 🟡 | B.2 | 415+ | «Pregunta A» sin explicación | Media |
| M04 | 🟡 | Encabezado | 4–11 | Faltan versión, estado, propósito, contacto | Media |
| M05 | 🟡 | §11 | 1354–1367 | Fuentes incompletas (faltan 4+ documentos) | Baja |
| M06 | 🟡 | General | ~20 ubi. | «El cuñado» como única designación — informal para terceros | Media |
| M07 | 🟡 | E.4, H.1 | 1038,1303 | «Fable» sin explicación de qué es | Baja |
| M08 | 🟡 | §1.5 | 112–115 | Información fiscal fuera de lugar en la introducción | Baja |
| M09 | 🟡 | A.1 | 177–184 | Tabla con formato distinto al resto de decisiones | Baja |
| M10 | 🟡 | E.3 | 997 | Tabla de 3 opciones sin encabezado de fila | Baja |
| M11 | 🟡 | E.3, C.1 | 686,997 | ABM sin conjunción «y»; tabla sin encabezado | Baja |
| M12 | 🟡 | Ausente | — | Falta resumen ejecutivo al inicio | Media |
| S01 | ⚪ | §2 | 133–165 | Metodología en texto plano, mejorable con tabla/visual | Baja |
| S02 | ⚪ | Varias | — | Faltan referencias cruzadas entre decisiones | Baja |
| S03 | ⚪ | Varias | — | Nomenclatura de alternativas no unificada | Baja |
| S04 | ⚪ | General | — | El documento mezcla dos audiencias distintas | Media |
| S05 | ⚪ | §3 | — | Falta diagrama de arquitectura | Baja |
| S06 | ⚪ | Varias | — | «Impacto en el precio» repetitivo, consolidable | Baja |
| S07 | ⚪ | General | — | Documento demasiado extenso (1371 lns vs 778 lns de INFORME_AUDITABLE_v4) | Baja |
| S08 | ⚪ | General | — | Referencias a-XX-XX sin glosario | Baja |

---

## CONCLUSIÓN

El documento **INFORME_TECNICO_PROFESIONAL.md** en su estado actual no está a la altura de su título. Las 4 acciones críticas para profesionalizarlo son:

1. **Eliminar las 26 secciones anti-Claude** (~400 líneas) — es el cambio más importante y el que el cliente (Edu) ha solicitado explícitamente.
2. **Reescribir la introducción** — que presente el proyecto, no que se defienda de la IA.
3. **Añadir las secciones ausentes** — presupuesto consolidado, tabla de riesgos, resumen ejecutivo.
4. **Corregir errores factuales** — contar las decisiones correctamente y hacer funcional el índice.

Tras estos cambios, el documento pasaría de ser un argumentario defensivo a un verdadero informe técnico profesional, comparable en rigor y completitud a INFORME_AUDITABLE_v4.md pero con el formato narrativo que este proyecto requiere para presentación al cliente.

---

*Auditoría generada el 15 de julio de 2026 por Hermes Agent.*
*Documento auditado: `docs/INFORMES/INFORME_TECNICO_PROFESIONAL.md`*

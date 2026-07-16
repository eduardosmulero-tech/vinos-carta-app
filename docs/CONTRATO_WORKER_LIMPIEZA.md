# CONTRATO WORKER — Limpieza INFORME_TECNICO_PROFESIONAL.md
## Generado el 15-jul-2026 tras auditoría deleg_62453d7b

## Objetivo
Convertir INFORME_TECNICO_PROFESIONAL.md de documento argumentativo anti-Claude a informe técnico profesional estándar de industria.

## Archivo destino
`/mnt/c/Proyectos/dev/vinos-carta-app/docs/INFORMES/INFORME_TECNICO_PROFESIONAL.md`

## Cambios a realizar (por orden)

### 1. Sección 1 (Introducción) — REESCRIBIR COMPLETAMENTE
Actualmente es un alegato anti-Claude de 6 subsecciones. Reescribir como:
- 1.1 Propósito del documento
- 1.2 Cómo leer este informe
- 1.3 Estructura de cada decisión (contexto → opción elegida → impacto en precio → tripwire)
Máx 1 párrafo por subsección. Tono profesional, neutral. Sin mencionar Claude, IA, ChatGPT ni ningún otro modelo.
Cualquier referencia al uso de IA como herramienta va en una nota al pie o en metodología (§2), nunca en la introducción.

### 2. Eliminar las secciones «Por qué no vale preguntárselo a Claude»
Aplicar a TODAS las decisiones del documento. La auditoría identificó 26 de 27 decisiones con esta sección.
- A.1, A.2, A.3, A.4, B.1, B.2, B.3, B.4, B.5, B.6, C.1, C.2, D.1, D.2, D.3, E.1, E.2, E.3, E.4, E.5, F.1, F.2, F.3, G.1, G.2, H.1

**Regla de eliminación:**
- Borrar el título «#### Por qué no vale «preguntárselo a Claude»»
- Borrar todos los puntos numerados (1., 2., 3., 4.) y sus contenidos
- Borrar cualquier párrafo de transición anterior o posterior que solo exista para enlazar esta sección
- Mantener el `---` separador entre decisiones intacto
- NO tocar las secciones «Contexto», ni las tablas «Por qué se ha elegido esta opción», ni «Impacto en el precio»
- Si alguna decisión se queda sin contenido tras eliminar (ej. D.3, E.5, H.1 que eran muy cortas), añadir una línea descriptiva adicional en «Contexto» para que no parezca vacía

### 3. Corregir el índice (anclas)
Los anchors del índice actual están rotos porque contienen tildes y caracteres especiales.
Solución: convertir todos los anchors a formato slug (solo ASCII, guiones en lugar de espacios).
Ej: `#a1-pwa-responsive-vs-nativa` en vez de `#a1-pwa-responsive-vs-nativa`
Asegurar que cada anchor coincide exactamente con el título de su sección.

### 4. Corregir afirmación «25 decisiones»
El documento dice «25 decisiones» pero tiene 27 secciones de decisión. Cambiar a «27» en:
- Sección 1 (línea de apertura y bullet "Cada una de las 27 decisiones...")
- Sección 2 (Fase 3 y Fase 5)
- Cualquier otra referencia a 25

### 5. Eliminar referencias a informe de riesgos inexistente
En 1.4 se menciona «6 riesgos principales (R1–R5 y R9)» pero el documento no contiene esa sección.
- Borrar 1.4 completo o reemplazar por un párrafo genérico sobre toma de decisiones
- Ajustar la numeración de subsecciones de §1

### 6. Añadir sección de presupuesto
Insertar una sección «7. Opciones de presupuesto» entre las decisiones de pricing (E) y las de identidad visual (F), o al final del documento antes del anexo.
Contenido mínimo:
- Tabla con alcance común a las 3 opciones
- 3 subsecciones (Opción A, B, C) con rangos de precio (extraer de HORQUILLA.md)
- Exclusiones comunes

### 7. Errores menores detectados en la auditoría
- 🔴 B.6 argumento «Una IA sugeriría...» — straw man, eliminar con el punto 2
- 🟡 D.2: afirmación «Sin registro público» — decir «Sin autoregistro público»
- 🟡 E.3: «Opción B (recomendada)» en el título — la recomendación debe estar en el texto, no en el título de la tabla
- 🟡 H.2: usa formato de tabla distinto al resto (2 columnas vs 3 columnas) — unificar
- 🟡 Varias referencias a «Pregunta A» sin explicar qué es — añadir aclaración primera vez
- 🟡 Primera mención de «Fable» sin contexto — añadir «(auditoría externa)» la primera vez
- 🟡 Se usa «el cuñado» como única designación — cambiar a «interlocutor del cliente» o similar en contexto formal
- ⚪ Mencionar que las tablas de las secciones C, D, E, F, H no incluyen «tripwire» como fila, a diferencia de A y B — unificar formato añadiendo tripwire donde falte

## Prohibiciones explícitas
- NO cambiar el contenido de las tablas de decisión
- NO alterar los «Impacto en el precio»
- NO reordenar las secciones del documento
- NO añadir nuevo contenido no especificado aquí
- NO cambiar el título del documento

## Verificación
Tras los cambios, ejecutar:
1. `grep -c "Claude\|preguntárselo a Claude\|ChatGPT\|una IA" INFORME_TECNICO_PROFESIONAL.md` — debe dar 0
2. `grep -c "^#### Por qué no vale" INFORME_TECNICO_PROFESIONAL.md` — debe dar 0
3. El documento debe tener secciones numeradas correlativas sin saltos
4. El índice debe apuntar a anchors que existen en el documento (grep cada uno)

## Estado
⏳ Pendiente — Edu da OK para ejecutar.

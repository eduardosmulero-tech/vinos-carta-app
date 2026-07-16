# Instrucciones de corrección — INFORME_AUDITABLE.md (v1 → v2)

> **Para quien reciba este encargo (DeepSeek u otra IA):** adjunta este documento junto con `INFORME_AUDITABLE.md` original y aplica exactamente las correcciones descritas abajo. No hace falta reescribir el informe entero.
>
> **Origen:** auditoría externa del informe original, con verificación de fuentes externas reales (BOE, guías de mercado 2026) en los dos puntos de mayor riesgo económico/legal: precios y fiscalidad.
>
> **Salida esperada:** `INFORME_AUDITABLE_v2.md`

---

## Reglas para quien haga la corrección (leer antes de tocar nada)

1. **No reescribas ni resumas** ninguna sección que no aparezca en esta lista. Mantén estructura, tablas y formato del original tal cual.
2. **No cambies ninguna cifra** de las tablas de presupuesto (sección 4) salvo donde se indique explícitamente abajo. Esas cifras ya se verificaron contra mercado real y la aritmética (sumas de cada opción) ya está comprobada y es correcta.
3. **No inventes** citas legales, artículos, cifras de mercado ni fuentes nuevas que no estén en este documento. Si falta un dato, márcalo literalmente como `[PENDIENTE — Edu debe confirmar]` en vez de rellenarlo con una suposición razonable-pero-no-verificada.
4. Añade justo debajo del título del informe una sección nueva `## CHANGELOG v1 → v2` con una línea por cada cambio aplicado, indicando a qué corrección de este documento corresponde (ej. "Corrección #1: cita legal actualizada a art. 1.1").
5. Cuando una corrección diga **"decisión de Edu, no inventar"**, tu trabajo es dejar la pregunta planteada de forma clara en el documento, no responderla tú.

---

## BLOQUE A — Correcciones bloqueantes (antes de enviar la propuesta al cliente)

### Corrección #1 — Cita legal incorrecta (sección 5.2)

**Texto actual a sustituir:**
> "El artículo 3.1 de la Ley 20/2007 del Estatuto del Trabajo Autónomo establece que estarás excluido de la obligación de alta en el RETA si la actividad se realiza de forma esporádica y no habitual."

**Texto nuevo:**
> "El artículo 1.1 de la Ley 20/2007 del Estatuto del Trabajo Autónomo define al trabajador autónomo como quien realiza la actividad económica **de forma habitual**, personal, directa, por cuenta propia y fuera del ámbito de organización de otra persona. Es la ausencia de ese requisito de habitualidad lo que excluye de la obligación de alta en el RETA para actividades esporádicas — criterio consolidado por jurisprudencia (STS de 29 de octubre de 2019, Sala Tercera, entre otras)."

**Motivo:** el artículo 3 de esa ley regula las "fuentes del régimen profesional", no la habitualidad. Verificado contra el texto oficial en boe.es.

---

### Corrección #2 — Falta forma de pago / anticipo en las 3 opciones (sección 4.2)

Ninguna de las 3 opciones (A, B, C) menciona un pago inicial. Añadir una fila **"Forma de pago"** a cada una de las tres tablas de opción, con este texto:

> **Forma de pago:** `[PENDIENTE — Edu debe decidir el % de anticipo]`. Práctica habitual para un primer proyecto sin autónomos dado de alta ni referencia previa de presupuesto del cliente: 30–50% al aceptar la propuesta / firmar el encargo, resto contra entrega.

**No fijes tú el porcentaje exacto — es una decisión de Edu, no inventarla.**

---

### Corrección #3 — Mecanismo de login pendiente pero ya incluido en el precio (decisión D.2)

**Texto actual:**
> "✅ La app requiere login. Pendiente de definir mecanismo exacto. Opción más probable: código de acceso por restaurante (compartido entre camareros)."

**Texto nuevo (cerrar la decisión, quitar el "pendiente"):**
> "✅ **Código de acceso único por restaurante**, generado y gestionado por la empresa de vinos desde el mini-admin. Sin contraseñas individuales por camarero (coherente con D.1)."

**Motivo:** el presupuesto ya está cerrado con este alcance incluido; no puede quedar una pieza de arquitectura sin decidir. Si Edu prefiere otro mecanismo, que lo indique, pero debe quedar cerrado, no "pendiente".

---

### Corrección #4 — Riesgo R8 sin cifra concreta (sección 6, riesgos secundarios)

**Texto actual:**
> "R8: Problemas fiscales si Edu repite el esquema 036 con más clientes. Ver sección 5.2. El primer proyecto no tiene riesgo, pero hay que tenerlo en cuenta si surgen más."

**Texto nuevo:**
> "R8: Problemas fiscales si Edu repite el esquema 036 con más clientes. Riesgo bajo mientras la suma de ingresos por actividades esporádicas en el año natural no se acerque al Salario Mínimo Interprofesional (SMI) anual — referencia orientativa usada por los tribunales para valorar habitualidad, aproximadamente 15.000–17.000 €/año en 2026 (cifra que se revisa cada año, no confundir con límite legal exacto). El presupuesto de este proyecto (2.650–5.900 €) está muy por debajo de ese umbral como caso aislado. Si Edu factura a otros clientes bajo el mismo esquema en el mismo año y la suma se acerca a esa cifra, consultar con gestor **antes** de emitir la siguiente factura, no después."

---

## BLOQUE B — Correcciones recomendadas (mejoran el documento, no bloquean el envío)

### Corrección #5 — Riesgo de relación familiar no documentado (sección 6)

Añadir una fila nueva a la tabla de riesgos principales:

> **R9 — Relación familiar con el interlocutor.** El contacto principal es el cuñado de Edu. Riesgo: mayor dificultad para poner límites firmes de alcance y facturar cambios "de favor"; en caso de fricción por precio o plazos, el impacto no es solo profesional sino también personal/familiar. **Mitigación:** encargo por escrito firmado por ambas partes (alcance, exclusiones, precio, forma de pago) exactamente igual que con un cliente no familiar — no relajar este punto por ser el cuñado.

---

### Corrección #6 — Idioma / clientela extranjera no contemplado

Añadir como pregunta abierta nueva en la sección 7 (Preguntas para el auditor) o como fila nueva en la tabla de exclusiones (4.3):

> `[DECISIÓN DE EDU]` ¿Hay clientela extranjera relevante en los restaurantes del cliente? Si la hay, valorar si una versión en inglés de la carta es necesaria en v1 o se documenta como exclusión explícita para fase 2.

---

### Corrección #7 — Uso real del informe de inventario en PDF no aclarado

Añadir una nota a la decisión B.2:

> `[PENDIENTE — confirmar con el cliente]` ¿Cómo se usa el PDF exportado en la práctica? (¿se imprime desde la PDA, se envía por email, se guarda?). Muchas PDA de sala no tienen impresora conectada; conviene validar el flujo real antes de darlo por cerrado.

---

### Corrección #8 — Opción C sin desglose de coste real (sección 4.2)

Bajo la tabla de Opción C, añadir:

> **Desglose de la cuota mensual (25–50 €/mes):** `[PENDIENTE — Edu debe confirmar coste real de hosting según proveedor elegido]`. La cuota debe cubrir hosting + tiempo de soporte de Edu; sin ese desglose no se puede garantizar que el precio sea sostenible. No ofrecer esta opción al cliente hasta tener esta cifra confirmada.

---

### Corrección #9 — Plazo sin comunicar de forma orientativa (decisión E.5)

**Texto actual:**
> "✅ Sin plazo definido. Se acordará al presentar la horquilla."
> "Estimación interna: 4-6 semanas de trabajo con apoyo de IA."

**Texto nuevo:**
> "✅ Sin fecha de entrega cerrada, pero se comunica al cliente un rango orientativo: **4–8 semanas desde la aprobación de la propuesta y la recepción de todos los datos necesarios** (catálogo completo, accesos, confirmaciones pendientes). El rango interno de trabajo real (4-6 semanas) se mantiene como estimación interna, no como promesa al cliente."

**Motivo:** dar cero información de plazo a un cliente es peor que dar un rango con margen; evita expectativas sin gestionar.

---

## BLOQUE C — Datos de referencia externa (usar tal cual, no reinventar ni volver a buscar)

Estos datos ya fueron verificados contra fuentes reales y respaldan las correcciones de arriba. Si necesitas citarlos en el documento, usa estos números, no otros:

| Referencia (mercado español, 2026) | Rango |
|---|---|
| Freelance senior, desarrollo web — tarifa/hora | 35–60 €/hora |
| Freelance junior — tarifa/hora | ~20–25 €/hora |
| PWA / web-app instalable, MVP básico | 3.000–6.000 € |
| App móvil sencilla con backend + panel admin | 8.000–25.000 € |
| Web corporativa freelance sencilla | 1.200–4.000 € |

**Fiscal:** SMI anual como referencia orientativa de habitualidad ≈ 15.000–17.000 €/año en 2026 (cifra revisable cada año). Sanciones AEAT por falta de alta censal: 400–20.000 € según Ley General Tributaria art. 198. Recargo del 20% sobre cuotas si la Seguridad Social reclama alta retroactiva en RETA.

---

## Qué hacer al terminar

Cuando tengas `INFORME_AUDITABLE_v2.md`, tráemelo de vuelta (a Claude) antes de enseñárselo a tu cuñado. Reviso que las correcciones se aplicaron bien, que no se coló ninguna cifra nueva sin verificar, y cerramos esto en una segunda pasada.

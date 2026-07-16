# Instrucciones de corrección — INFORME_AUDITABLE_v3.md (v3 → v4)

> **Para quien reciba este encargo:** adjunta este documento junto con `INFORME_AUDITABLE_v3.md`. Estas son decisiones ya tomadas por Edu (con recomendación de Claude) — no hay que inventar nada, solo insertar los valores.
>
> **Salida esperada:** `INFORME_AUDITABLE_v4.md`

## Reglas (las mismas de siempre)

1. No reescribas nada fuera de esta lista.
2. No inventes datos nuevos más allá de los que se dan aquí.
3. Añade al `## CHANGELOG` un bloque `### v3 → v4` con una línea por corrección.

---

### Corrección #1 — Título de cabecera desactualizado

**Texto actual:** `# INFORME AUDITABLE v2 — Proyecto vinos-carta-app`
**Texto nuevo:** `# INFORME AUDITABLE v4 — Proyecto vinos-carta-app`

---

### Corrección #2 — Anticipo (rellenar placeholder en las 3 opciones, sección 4.2)

En las 3 filas **"Forma de pago"** (Opción A, B y C), sustituir:

**Texto actual:**
> `[PENDIENTE — Edu debe decidir el % de anticipo]`. Práctica habitual para un primer proyecto sin autónomos dado de alta ni referencia previa de presupuesto del cliente: 30–50% al aceptar la propuesta / firmar el encargo, resto contra entrega.

**Texto nuevo:**
> **30% al aceptar la propuesta / firmar el encargo, 70% restante contra entrega.**

---

### Corrección #3 — Cerrar decisión E.3 (mantenimiento vs. cambios futuros)

**Texto actual (fila "Decisión"):**
> ⏳ **PENDIENTE de resolver.** La propuesta debe dejar explícito el modelo. Tres opciones identificadas:

**Texto nuevo (fila "Decisión"):**
> ✅ **Opción B — Proyecto + 3 meses de cambios menores incluidos.** Es la que Edu presentará como recomendada. Resuelve directamente el riesgo R1 (contradicción "sin mantenimiento" vs. cambios futuros): el cliente tiene cobertura pactada desde el minuto uno, sin negociación caso por caso.

Añadir debajo de la tabla de E.3, después de la fila "Pendiente":

> **Nota (corrección #3, v4):** Se cierra con Opción B por ser la que mejor mitiga R1 (el riesgo de mayor probabilidad del proyecto, 80%). Esto **no elimina** las Opciones A y C de la sección 4.2 — el cliente sigue viendo las 3 en la horquilla (per E.4, "el cliente negocia consigo mismo"). Lo que se cierra aquí es cuál es el modelo por defecto que Edu recomienda y hacia el que orienta la conversación.

Cambiar también la fila **"Pendiente"** de:
> Edu elige modelo antes de presentar la propuesta.

a:
> Cerrado (v4): Opción B.

---

### Corrección #4 — Desglose de hosting para Opción C (sección 4.2)

**Texto actual:**
> **Desglose de la cuota mensual (25–50 €/mes) — corrección #8:** `[PENDIENTE — Edu debe confirmar coste real de hosting según proveedor elegido]`. La cuota debe cubrir hosting + tiempo de soporte de Edu; sin ese desglose no se puede garantizar que el precio sea sostenible. No ofrecer esta opción al cliente hasta tener esta cifra confirmada.

**Texto nuevo:**
> **Desglose de la cuota mensual (25–50 €/mes) — actualizado v4:** Stack recomendado: Cloudflare Pages (frontend, gratis, sin restricción de uso comercial) + Supabase (backend/DB/auth, capa gratuita para esta escala). Coste de hosting estimado: **0–10 €/mes**. Nota técnica: los proyectos gratuitos de Supabase se pausan tras inactividad prolongada; mitigación de coste cero: un ping programado periódico (GitHub Action o servicio cron gratuito) para mantener el proyecto activo. Con esta estimación, el margen restante de la cuota (15–50 €/mes) queda disponible para el tiempo de soporte de Edu, lo que hace la Opción C sostenible. **Esta es una recomendación genérica de Claude sin acceso al código real del proyecto — Edu debe confirmarla contra el stack técnico que finalmente implemente antes de ofrecer esta opción al cliente.**

---

## Qué queda pendiente de verdad (no son correcciones de documento)

Esto ya no depende de Claude ni de DeepSeek — son cosas que solo resuelve Edu con personas reales:

1. Consulta de 10 min con un gestor antes de la primera factura.
2. Preguntarle al cuñado: ¿clientela extranjera / inglés en v1? (P6)
3. Preguntarle al cuñado: ¿cómo se usa realmente el PDF de inventario? (nota en B.2)

## Qué hacer al terminar

Con v4, el documento queda funcionalmente cerrado en todo lo que se puede decidir sin hablar con el cliente. Tráemela para una última revisión rápida, y si no hay sorpresas, está lista para tu cuñado.

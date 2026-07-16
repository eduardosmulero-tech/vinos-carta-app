# Instrucciones de corrección — INFORME_AUDITABLE_v2.md (v2 → v3)

> **Para quien reciba este encargo:** adjunta este documento junto con `INFORME_AUDITABLE_v2.md` y aplica solo las correcciones de abajo. Son 4 arreglos menores, ninguno afecta a precios ni a la sustancia legal — esa parte ya quedó bien en la v2.
>
> **Salida esperada:** `INFORME_AUDITABLE_v3.md`

## Reglas (las mismas de la ronda anterior)

1. No reescribas ni resumas nada que no esté en esta lista.
2. No inventes fechas, cifras ni datos nuevos. Si falta un dato, usa `[PENDIENTE]`.
3. Añade una línea nueva al `## CHANGELOG` existente por cada corrección aplicada (no borres el changelog de v1→v2, añade debajo un bloque `### v2 → v3`).

---

### Corrección #1 — Separador Markdown roto (cerca de la sección B.2)

**Texto actual:**
```
|---
```
(aparece justo después de la nota de auditoría añadida tras B.2, antes de "#### B.3 Recomendaciones...")

**Texto nuevo:**
```
---
```

---

### Corrección #2 — Contador de riesgos desactualizado (sección 6)

**Texto actual:**
> "Los 5 riesgos principales del proyecto, ordenados por criticidad:"

**Texto nuevo:**
> "Los 6 riesgos principales del proyecto (R1–R5 y R9), ordenados por criticidad:"

**Motivo:** la tabla principal ya tiene 6 filas desde que se añadió R9 en la v2; el texto de cabecera no se actualizó.

---

### Corrección #3 — Fecha inventada en la cabecera

**Texto actual:**
> "**Fecha:** 15 de julio de 2026 (v2: 16 de julio de 2026)"

**Texto nuevo:**
> "**Fecha:** 15 de julio de 2026 (v2 y v3: misma fecha, revisión same-day)"

**Motivo:** no había ningún dato que respaldara el "16 de julio" — es una fecha añadida sin que nadie la diera. Si Edu genera esta v3 en una fecha distinta, que ponga la fecha real, no una supuesta.

---

### Corrección #4 — Inconsistencia entre secciones 4.4 y 7 (P1)

La sección 4.4 ya usa el dato verificado ("Web corporativa freelance sencilla: 1.200–4.000 €"), pero la sección 7, pregunta P1, sigue citando el dato antiguo sin verificar.

**Texto actual (dentro de P1, sección 7):**
> "Como referencia: una web corporativa simple de freelance cuesta 800-2.000 € en el mercado."

**Texto nuevo:**
> "Como referencia (dato verificado, ver también sección 4.4): una web corporativa simple de freelance cuesta 1.200-4.000 € en el mercado."

---

## Qué hacer al terminar

Con estas 4 correcciones el documento queda cerrado en lo sustancial. Tráeme la v3 y hago una última pasada rápida — si no aparece nada nuevo, está listo para enseñárselo a tu cuñado.

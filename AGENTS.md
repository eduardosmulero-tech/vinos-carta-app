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

**Fase:** descubrimiento completado — respuestas del cunado recibidas.
Siguiente paso: **sesion de alcance final + horquilla de precio + demo con datos reales.**

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
| **Horquilla con supuestos explicitos y exclusiones** (nunca cifra cerrada) | MANTENER | La cifra final la decide Edu |

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

- Horquilla con supuestos explicitos y exclusiones, nunca cifra cerrada. La cifra final la decide Edu.
- La ganancia de productividad por IA es **margen de Edu, no descuento del cliente** — no revelar multiplicadores tipo "2 semanas con IA vs 4 meses solo".
- Sub de Claude (si aplica) va como overhead dentro de la horquilla y/o dentro de la cuota mensual de soporte, sin linea propia.
- Arquitectura barata de operar (sin coste recurrente alto), coherente con "sin mantenimiento".
- Carga inicial de fichas de vino (datos estructurados con variedad de uva, de la que vive el motor de recomendaciones) es coste de proyecto a dimensionar explicitamente.

---

## RETOMAR AQUI

**Ultima sesion:** 16-jul (Fable). **Auditoría completa del encargo de Sonnet ENTREGADA:**
`docs/REVIEWS/AUDITORIA_FABLE_RESPUESTA_2026-07-16.md` (veredictos idea/planes/legal +
**cola de decisiones D.1–D.6 para Edu** — leer eso primero) y
`docs/SPECS/CONSULTA_GESTORIA.md` (notas limpias para la gestoría, regla 4bis, listas
para llevar). Claves: la contradicción 036-vs-RETA queda diagnosticada (MARCO_LEGAL §4
aplicaba una regla de negocio de Pepito, no una norma; recomendación = Opción B + 036 +
hosting a nombre del cliente, **CONDICIONADA a gestoría antes de la primera factura**);
retirar Opción C de la propuesta; horquilla MANTENER; hallazgo nuevo: cita STS 29-10-2019
de v4 sin verificar. Correcciones mecánicas delegables listadas al final de la auditoría.

Antecedente: 15-jul 23:14 (Principal) corrección de AGENTS.md y verificación de la demo;
15-jul 22:41 revisión externa de SPEC + PLAN via Documentador (hy3).
Session `20260715_224924_7e1ab3` sobre pipeline Kanban + subagentes sigue abierta (sin cerrar).

### Sobre la demo — estado real tras verificar sesiones anteriores

| Documento | Estado real |
|-----------|-------------|
| `demo/CONTRATO_DEMO_V1.md` | ✅ Aprobado por Edu |
| `demo/SPEC_DEMO_V1.md` | ✅ Revisado por hy3 (VEREDICTO: RETURN → 4 hallazgos corregidos) |
| `demo/PLAN_DEMO_V1.md` | ✅ Revisado por hy3 (VEREDICTO: RETURN → 3 hallazgos corregidos) |
| | ⚠️ El PLAN NO usa la pipeline Kanban — escrito con delegate_task directo, sin state machine, sin tarjetas Kanban. **Pendiente de migrar** |

La review externa se hizo en sesion `20260715_224156_f96415` el 15-jul 22:41. SPEC y PLAN corregidos y listos para implementacion, pero el PLAN actual no contempla el flujo Kanban con `create_dev_kanban_task`, `advance_workflow_phase` ni `confirm_advance` (el pipeline Kanban de Promethe-os se diseno el 14-jul, un dia antes del PLAN).

### Informe profesional y presupuesto

Documento INFORME_TECNICO_PROFESIONAL.md: 950 lineas, 0 refs Claude, tono profesional.
Decisiones cerradas anteriores: E.3 (B), D.2 (codigo), P6 (espanol), B.2 (PDF admin-side), anticipo 30/70, hosting Opcion C.
Horquilla en docs/SPECS/HORQUILLA.md (A: 3.150-5.300€ · B: 3.450-5.900€ · C: 2.650-4.300€ + 25-50€/mes). Edu decide cifras.

### Pendientes

1. ~~**Ejecutar limpieza del INFORME_TECNICO_PROFESIONAL.md**~~ ✅ Completado
2. ~~**REVISAR demo SPEC + PLAN con reviewer externo**~~ ✅ Completado (sesion 22:41, hy3)
3. **Responder cola de decisiones D.1–D.6** de `docs/REVIEWS/AUDITORIA_FABLE_RESPUESTA_2026-07-16.md` → **[EDU — SIGUIENTE]**
4. Migrar PLAN_DEMO_V1.md a pipeline Kanban (crear tarjetas Kanban con 7 campos, ciclo `advance_workflow_phase` → `confirm_advance` → worker → reviewer con `estado_reviewer`)
5. Ejecutar implementacion de la demo (6 fases via Kanban, worker + reviewer) → **[TRAS #4]**
6. Consulta con gestor llevando `docs/SPECS/CONSULTA_GESTORIA.md` (D.6 — antes de la propuesta, obligatoria antes de la 1ª factura) → **[EDU]**
7. Correcciones mecanicas de la auditoria (lista al final de AUDITORIA_FABLE_RESPUESTA) → **[SONNET/HERMES, tras D.2-D.3]**
8. Generar presupuesto final con cifras cerradas → **[EDU]**
9. Presentar al cunado: horquilla + demo + Opcion B (+ preguntas B.3 de la auditoria)

### Documentos de referencia

| Documento | Contenido |
|-----------|-----------|
| `docs/INFORMES/INFORME_TECNICO_PROFESIONAL.md` | ✅ **Completado.** 27 decisiones documentadas. 950 líneas, tono profesional, sin refs a Claude/IA. |
| `docs/INFORMES/INFORME_AUDITABLE_v4.md` | **Cerrado (v4).** Informe para auditoria externa con 3 rondas de correcciones aplicadas. Contiene las 25 decisiones en formato tabla. |
| `docs/SPECS/DECISIONES.md` | Registro de 25 decisiones con contexto, alternativas, tripwires (523 lineas). Algunas desactualizadas respecto a v4. |
| `docs/SPECS/HORQUILLA.md` | 3 opciones de presupuesto con rangos sugeridos (A: 3.150-5.300€ · B: 3.450-5.900€ · C: 2.650-4.300€ + 25-50€/mes). Edu pone cifras definitivas. |
| `docs/SPECS/MARCO_LEGAL.md` | Analisis legal: 036, IRPF 7%, tripwire RETA. ⚠️ Su §4 (N2→RETA) es regla de negocio heredada de Pepito, no norma — ver auditoria Fable 16-jul |
| `docs/REVIEWS/AUDITORIA_FABLE_RESPUESTA_2026-07-16.md` | ✅ Auditoria Fable: veredictos idea/planes/legal, cola D.1-D.6 para Edu, preguntas para el cunado |
| `docs/SPECS/CONSULTA_GESTORIA.md` | Notas limpias (voz de Edu, regla 4bis) para la consulta con la gestoria |
| `docs/INFORME_DESCUBRIMIENTO_2026-07-12.md` | Analisis completo de la entrevista inicial |
| `docs/DISENO_REFERENCIAS.md` | Paleta de colores (#f2ebe5, #73232d), 19 vinos para demo, assets |
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
- Cifra final la decide Edu. Los rangos en HORQUILLA.md son sugerencias.
- Sin repo git hasta implementacion.
- Sin features por iniciativa propia (regla a-13-1).

---

## RESTRICCIONES DEL PROYECTO

- **No hay repo git — no versionado.** Inicializar repo cuando se llegue a implementacion.
- **No hay codigo escrito — fase pre-code pura.** Todo es documentacion y analisis.
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

# Auditoría del rol Principal — Proyecto vinos-carta-app

> **Fecha:** 16 de julio de 2026  
> **Auditado:** Principal (IA coordinadora)  
> **Auditor:** Edu (proyecto)  
> **Propósito:** Documentar errores sistemáticos del rol Principal para que el perfil Reviewer pueda auditarlos y evitar su repetición.

---

## Resumen ejecutivo

El rol Principal actuó como **Worker** en lugar de como **coordinador** en la mayoría de las sesiones de vinos-carta-app. De 12 errores identificados, el 80% derivan de una misma causa raíz: **confundir mi rol (coordinar, mentorizar, descomponer tareas, delegar) con el de un Worker que ejecuta trabajo mecánico directamente.**

---

## Errores documentados

### Error #1 — Cerrar sesiones sin skill `cerrar-sesion` (sistemático)

**Evidencia:** Sesión `20260715_221734_471667`. Después de terminar limpieza del INFORME_TECNICO, cerré sin skill. Edu corrigió literalmente: *"no cerraste con skill, ponte el recordatorio en memoria porque cometes este error sistematicamente si no te lo digo"*.

**Sesiones afectadas:** 3 de 5 sesiones del proyecto.

**Impacto:** Sesiones archivadas sin resumen estructurado ni pendientes visibles. Pérdida de contexto entre sesiones.

---

### Error #2 — Trabajo mecánico directo (patch/write_file) desde Principal

**Evidencia:** Decenas de patches directos al INFORME_AUDITABLE.md (v2→v3→v4), INFORME_TECNICO_PROFESIONAL.md, SPEC_DEMO_V1.md, PLAN_DEMO_V1.md y AGENTS.md desde el rol Principal.

**Mi propia regla violada:** *"Principal NUNCA ejecuta trabajo mecánico (escribir archivos, editar código). Su trabajo es descomponer tareas y delegar a Documentador/Worker."*

**Impacto:** Tokens de Pro/Flash quemados en trabajo que un Worker barato (hy3 gratis) podría haber hecho. Violación directa del rol.

---

### Error #3 — No cargar `metodo-fable` al inicio de sesiones

**Evidencia:** En sesión `20260715_221734_471667`, Edu pidió explícitamente *"Revisa el manual sobre la recién instalada pipeline de travajo y hazlo todo con el metodo favle"*. No lo había cargado por defecto.

**Sesiones afectadas:** 3 de 5 no cargaron metodo-fable al inicio.

---

### Error #4 — No cargar skills relevantes proactivamente

**Evidencia:** Salvo petición explícita de Edu, nunca cargué `dev-workflow`, `mentor-decisiones`, `constructor` antes de arrancar tareas.

---

### Error #5 — No crear Kanban del proyecto

**Evidencia:** El rol dice *"Orquestar flujo F1 (entrevista → esqueleto → research → specs → Kanban)"*. No hay Kanban creado para vinos-carta-app.

---

### Error #6 — Delegación inconsistente (contrato→gate→ejecuta→reviewer)

**Evidencia:** Bien en creación inicial de MARCO_LEGAL.md e INFORME_AUDITABLE.md (delegate_task). Mal en correcciones v2→v3→v4 y limpieza INFORME_TECNICO (patches directos).

---

### Error #7 — Perfil Documentador incorrecto inicialmente

**Evidencia:** En sesión `20260715_224156_f96415`, hubo que corregir el perfil usado para Documentador.

---

### Error #8 — AGENTS.md desactualizado entre sesiones

**Evidencia:** Sesión `20260715_201933_813296` cerró INFORME AUDITABLE v4 sin actualizar AGENTS.md. El RETOMAR quedó stale hasta la sesión siguiente.

---

### Error #9 — Texto plano en vez de `clarify` tool

**Evidencia:** Múltiples preguntas de cierre en texto plano ("¿OK? ¿Añadir o quitar algo?") en lugar de usar la herramienta `clarify`, cerrando el turno y forzando recarga del system prompt.

---

### Error #10 — No seguir flujo F1 completo

**Evidencia:** El proyecto avanzó por "vamos haciendo" sin entrevista formal, esqueleto, research, specs ni Kanban estructurados.

---

### Error #11 — [RAÍZ] Confundir rol Principal con Worker

**Evidencia transversal:** Todos los errores #1-#10 convergen aquí. Actué como asistente que "hace cosas" en lugar de coordinador que "orquesta que se hagan cosas".

**Ejemplo crítico:** Cuando llegaron correcciones v2→v3 del INFORME_AUDITABLE (4 cambios), la respuesta correcta como Principal habría sido:
1. Analizar los cambios y crear contrato de delegación
2. Despachar a Worker con ese contrato
3. Reviewer audita
4. Integrar resultado

En lugar de eso: 4 patches manuales secuenciales.

---

### Error #12 — Basura temporal en repo

**Evidencia:** Archivos `_prompt_documentador.txt`, `_prompt_reviewer.txt` dejados en el directorio del proyecto.

---

## Nota adicional: Pipeline de subagentes NO implementada realmente

Edu señaló que en la sesión "Testing de pipeline 1 - Traduccion de plan", desperdicié tokens haciendo web research directamente en lugar de delegar a un subagente. Además, aunque afirmé que la pipeline con subagentes estaba implementada, **no lo está realmente**. La orquestación sigue recayendo en mí (Principal) sin que los subagentes operen autónomamente con la cadena contrato→gate→ejecuta→reviewer→itera→integra.

Esto contradice mis afirmaciones anteriores y es posiblemente el error más grave: **asegurar que algo funciona cuando no está implementado**.

---

## Acciones correctivas propuestas

1. Delegar TODO trabajo mecánico a subagentes, incluso correcciones de 1 línea
2. Cargar `metodo-fable` y `cerrar-sesion` al inicio y cierre de cada sesión
3. Implementar la pipeline de subagentes real (no simulada) antes de más trabajo en vinos-carta-app
4. No prometer funcionalidad no implementada
5. Usar `clarify` tool en lugar de texto plano para preguntas

---

*Documento generado para el perfil Reviewer. Próxima revisión: al finalizar cada sesión del proyecto.*

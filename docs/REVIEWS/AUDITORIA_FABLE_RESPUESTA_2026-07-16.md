# AUDITORÍA FABLE — respuesta al encargo de Sonnet (16-jul-2026)

> Responde a `docs/REVIEWS/ENCARGO_AUDITORIA_FABLE_2026-07-16.md`. Fuentes leídas en esta
> sesión (solo las citadas por el encargo): AGENTS.md, MARCO_LEGAL.md completo,
> HORQUILLA.md completo, INFORME_AUDITABLE_v4.md §5-§7 (l.625-734), INFORME_DESCUBRIMIENTO
> §10. Documento interno — sin restricción de estilo. El documento limpio para la gestoría
> está aparte: `docs/SPECS/CONSULTA_GESTORIA.md` (regla 4bis: cero rastro de IA).
>
> **Criterio de éxito de esta auditoría:** veredicto razonado en los 3 bloques del encargo
> (A idea, B planes, C legal), cola de decisiones para Edu con opciones concretas, preguntas
> para el cuñado redactadas, y la decisión fiscal dejada explícitamente CONDICIONADA a
> gestoría real — nunca cerrada por una IA.

---

## C. LEGAL Y FISCAL (lo que más preocupa a Edu — va primero)

### C.1 La "contradicción" 036-vs-RETA: diagnóstico

**Los dos documentos no responden a la misma pregunta, y por eso no coinciden.**

- `INFORME_AUDITABLE_v4.md §5.2/R8` hace un análisis **jurídico** de la habitualidad:
  art. 1.1 Ley 20/2007 (verificado contra boe.es en la corrección v1→v2) + criterio
  jurisprudencial del SMI como referencia orientativa. Conclusión: proyecto único, sin
  recurrencia, muy por debajo del SMI anual → 036 defendible.
- `MARCO_LEGAL.md §4` no aplica una norma legal: aplica la **regla de negocio "N2 → RETA"
  del WORKFLOW.md de Pepito**, que es una regla prudencial que Hermes se autoimpuso para
  OTRO proyecto (cuándo escalar un negocio de servicios), no doctrina fiscal. **"Tener
  backend y base de datos" no es criterio de habitualidad en ninguna norma española** —
  la habitualidad se mide por recurrencia y por que sea la actividad principal, no por
  la complejidad técnica de lo entregado.

**Dónde SÍ tiene razón MARCO_LEGAL.md, indirectamente:** un proyecto con backend crea
riesgo de **continuidad operativa** — si Edu paga el hosting de su bolsillo cada mes, o
cobra una cuota mensual (Opción C), eso sí es recurrencia real y sí apunta a RETA. El
factor de riesgo no es el backend en sí: es **quién opera y paga la infraestructura
después de la entrega**.

### C.2 Recomendación (CONDICIONADA — no cerrada)

**Con qué presentarse: Opción B facturada como proyecto único + alta censal 036, con dos
condiciones de diseño que eliminan la continuidad:**

1. **Hosting y cuentas (Cloudflare Pages + Supabase) a nombre del cliente desde el día 1.**
   El cliente paga sus 0-10 €/mes directamente. Edu entrega y no opera nada de forma
   recurrente. Esto ya es coherente con la cláusula 4 de "primer trabajo" ("En ningún caso
   Edu asume costes recurrentes") — solo hay que hacerlo explícito en la propuesta.
2. **Sin cuota mensual de ningún tipo** (ver C.3 sobre la Opción C).

**⚠️ CONDICIÓN OBLIGATORIA E INNEGOCIABLE: esta recomendación NO es válida hasta que un
gestor real la confirme, ANTES de emitir la primera factura.** Es el pendiente #1 que el
propio proyecto arrastra desde `CORRECCIONES_INFORME_v3_a_v4.md` y sigue sin hacerse.
Ninguna IA (Fable incluido) cierra esto. Las notas para llevar a esa consulta están
preparadas en `docs/SPECS/CONSULTA_GESTORIA.md`, redactadas limpias (regla 4bis).

**Por qué no "RETA por si acaso":** darse de alta en RETA sin necesidad tiene coste real
(cuota mensual, obligaciones formales) para un proyecto de 4-6 semanas que probablemente
califica como esporádico. Y si el gestor dice que sí hace falta RETA, el sobrecoste
probable es pequeño (tarifa plana estatal, y posible Cuota Cero de Andalucía — vigencia
2026 a confirmar con el gestor): no destruye la economía del proyecto ni obliga a subir
la horquilla (ver B.1).

### C.3 La Opción C debe salir de la propuesta al cliente

Es la única opción donde **ambos** documentos legales coinciden en que dispara RETA sin
discusión. Además:
- 25-50 €/mes no cubre ni de lejos la cuota de RETA que provoca → economía negativa para Edu.
- Contradice lo que el propio cliente dijo querer ("sin mantenimiento", `a-11-1`).
- Ata a Edu a soporte continuo en su primer proyecto (el propio HORQUILLA.md ya lo avisa).

**Recomendación:** presentar solo A y B (con B como recomendada). Si el cliente pide
soporte continuado más adelante, ofrecer **bolsa de horas prepagada puntual** (se factura
como encargo suelto cuando se consume, sin mensualidad) — y validar también esa figura en
la consulta de gestoría. *Decisión de dinero → Edu (cola D.2).*

### C.4 Cita jurisprudencial SIN VERIFICAR en v4 (hallazgo nuevo)

`INFORME_AUDITABLE_v4.md §5.2` cita "STS de 29 de octubre de 2019, Sala Tercera" como
apoyo del criterio de habitualidad/SMI. La corrección v1→v2 verificó el **artículo de ley**
contra boe.es, pero **no consta que esa sentencia concreta se verificara contra fuente
primaria** (la jurisprudencia clásica del SMI que se suele citar es de la Sala de lo
Social y de fecha distinta). Tras el precedente del art. 3.1→1.1, esta cita se trata como
sospechosa por defecto: **no usarla en ningún documento de entrega hasta verificarla**
(CENDOJ) o, mejor, dejar que sea el gestor quien ponga la base legal. La consulta de
gestoría ya está redactada sin citar sentencia alguna.

### C.5 Cláusula "primer trabajo" (MARCO_LEGAL §5)

Revisada cláusula a cláusula. Veredicto: **utilizable como base, no bloquea**, con estos
ajustes antes de entregarla:

- **Falta una garantía de corrección de defectos para la Opción A** (en B la cubren los
  3 meses). Estándar razonable: "corrección de errores de funcionamiento sin coste durante
  30 días desde la entrega". Sin esto, con un familiar, cualquier bug post-entrega se
  convierte en fricción. → propuesta en cola D.3.
- Cláusula 7 (propiedad intelectual) y 2-5 (sin permanencia/recurrencia): correctas y
  alineadas con la estrategia fiscal (refuerzan la no-continuidad).
- Cláusula 8 (sumisión a juzgados de Utrera): válida entre empresarios en principio;
  confirmarla en la misma consulta de gestoría (pregunta incluida en las notas).
- Cosmético: sustituir "Edu" por nombre legal completo en el documento final, y quitar
  la línea meta en cursiva ("*Esta cláusula protege...*") — huele a plantilla.

---

## A. IDEA Y ENCAJE DE NEGOCIO

### A.1 ¿Sigue teniendo sentido el MVP? — SÍ, con el riesgo bien nombrado

El MVP de 4 funciones está bien acotado y alineado con `a-13-1`; nada de lo hallado
invalida las 25 decisiones del §2 del encargo. El razonamiento:

- **El riesgo real no es la idea, es la disposición a pagar.** Que la app "no genere
  ingresos directos" a la empresa (INFORME_DESCUBRIMIENTO §10) acota lo que el cliente
  está dispuesto a pagar por valor añadido de su paquete. Combinado con R4 (cliente sin
  cifra en la cabeza, posible ancla mental de 500-1.000 €), la probabilidad de que la
  horquilla le parezca cara no es menor. **Eso no se resuelve con más análisis: se
  descubre presentando horquilla + demo**, que es exactamente el siguiente paso ya
  planificado. No hay que hacer nada nuevo — solo no sorprenderse si la respuesta es
  regatear, y tener decidido de antemano el suelo (cola D.1).
- **Para Edu el proyecto vale la pena incluso con ese riesgo**, porque el retorno es
  doble: 3-6 k€ + primer caso de éxito complejo (PWA multi-tenant con backend) que
  revaloriza todo proyecto futuro (MARCO_LEGAL §6.4 lo argumenta bien). La exposición
  está acotada si se mantienen las mitigaciones ya escritas: encargo firmado (R9),
  anticipo 30/70, alcance con exclusiones explícitas.
- **Condición de no-avance:** no escribir código de producción (más allá de la demo)
  hasta tener el sí del cliente a una cifra. La demo es la inversión máxima a riesgo.

### A.2 ¿"Opción B recomendada" es de verdad la mejor para Edu? — SÍ, y ahora con motivo auditado

No es solo "lo que quedó escrito". B es la única opción que resuelve simultáneamente los
dos riesgos de mayor probabilidad del propio informe v4:

- **R1 (80%, contradicción mantenimiento):** el cliente VA a pedir cambios post-entrega
  (`a-11-3`). Con A, cada petición es una negociación de dinero con un familiar. Con B,
  los 3 primeros meses están pagados por adelantado y acotados por escrito (la definición
  de "cambio menor" de HORQUILLA.md es buena y hay que meterla en el contrato).
- **R9 (relación familiar):** B compra 3 meses de paz post-entrega por 300-600 €.

**Matiz de precio detectado:** el soporte de B está barato — ~2h/semana × 13 semanas ≈ 26h
por 300-600 € sale a 11-23 €/h, por debajo de la tarifa implícita del resto del proyecto.
Opciones: subir el tramo a 450-600 €, o acotar por horas ("hasta 3h/mes") en vez de por
semanas. → cola D.1 (Edu pone cifras, como siempre).

**Pendiente formal:** Edu nunca confirmó explícitamente la elección de B (§3.4.2 del
encargo). → cola D.2.

---

## B. PLANES (alcance, precio, proceso)

### B.1 Horquilla — MANTENER, sin recargo por riesgo legal

- El posicionamiento (banda alta freelance / suelo de agencia, por debajo de lo que
  costaría esta complejidad real en agencia) es correcto para primer proyecto grande y
  está bien argumentado contra fuentes de mercado con nombre (MARCO_LEGAL §6).
- **No subir la horquilla para "cubrir el riesgo legal"**: el coste legal realista
  (consulta de gestoría + peor caso RETA con tarifa plana durante 2-3 meses) es marginal
  frente a 3-6 k€. Inflar el precio por eso sería resolver con dinero del cliente un
  trabajo pendiente de Edu (la consulta).
- **Error aritmético en MARCO_LEGAL §6.1 (corregir antes de reutilizar el dato):**
  "4-6 semanas ≈ 400-840 h" es falso — 4-6 semanas son 160-240 h. La cifra coherente es
  la del §6.2 (200-300 h → 5.000-10.500 € a tarifa freelance). La conclusión comparativa
  no cambia, pero el dato malo no debe migrar a ningún documento de entrega.

### B.2 Repo git (H.2) — recomendación: SÍ, ya

La documentación es hoy el único activo del proyecto y ya ha sufrido 4 versiones de
informe con 3 rondas de correcciones sin historial. Recomendación: `git init` local, sin
remoto, commit inicial de `docs/` + `demo/` + `AGENTS.md`. Coste: minutos. Riesgo: cero.
Regla del workspace: sin OK de Edu no se commitea → **queda en cola D.4, listo para
ejecutar en cuanto diga sí.**

### B.3 Preguntas para el cuñado — redactadas (gaps §3.4.1/3/4/5 + §3.2)

Para la próxima conversación (idealmente con la socia delante — mitiga R5):

1. **Quién carga los datos (verificación §3.2 — la más importante):** "Para que quede
   cerrado: las cartas las gestionáis vosotros desde vuestro panel y los restaurantes
   solo consultan, ¿verdad? ¿O hay algún restaurante que vaya a querer tocar su carta
   él mismo?" — Si la respuesta es "la tocan ellos", el mini-admin (C.1) está mal
   dimensionado y se reabre ANTES de presupuestar. *(Antes de gastar esta pregunta:
   Edu debe confirmar si la ratificación del 15-jul fue conversación real con el cuñado
   — cola D.5. Si lo fue, la pregunta sobra.)*
2. **Perfil del camarero:** "¿Qué edad media y qué soltura con el móvil tienen los
   camareros que van a usar esto? ¿Hay alguno que ya use la PDA para algo más que el TPV?"
   — condiciona tamaño de letra, simplicidad y si hace falta formación.
3. **Clientela extranjera:** "¿Vuestros restaurantes tienen mucho turista? ¿Le enseñarían
   la ficha del vino al cliente, o es solo para consumo del camarero?" — valida P6
   (español solo en v1) o lo reabre.
4. **Uso real del informe de inventario:** "El listado de la carta en PDF, ¿quién lo usa
   y cómo — lo imprimís vosotros, se lo mandáis al restaurante por email, o se consulta
   en pantalla?" — valida B.2 (PDF admin-side).
5. **Logística de la propuesta:** "¿Cuándo os viene bien a tu socia y a ti que os enseñe
   la demo y la propuesta, y cómo la preferís — reunión, PDF por delante, o ambas?"

---

## COLA DE DECISIONES PARA EDU

| # | Decisión | Recomendación Fable | Bloquea |
|---|----------|--------------------|---------| 
| D.1 | Cifras finales de horquilla + suelo de negociación + precio del soporte de B (subir a 450-600 € o acotar por horas) | Decidir suelo ANTES de presentar, para no negociar en caliente con un familiar | Presentación al cuñado |
| D.2 | Confirmar Opción B como recomendada y **retirar la Opción C** de la propuesta (sustituible por bolsa de horas futura) | Sí a ambas (motivos en A.2 y C.3) | Propuesta final |
| D.3 | Añadir garantía de 30 días de corrección de errores a la Opción A (si A se mantiene en la propuesta) | Sí (C.5) | Propuesta final |
| D.4 | Abrir repo git local ya (H.2) | Sí (B.2) | Nada — higiene |
| D.5 | ¿La ratificación de la Pregunta D del 15-jul fue conversación real con el cuñado, o cierre interno de Hermes? | Si fue interna → pregunta 1 de B.3 es obligatoria antes de presupuestar | Dimensionado del mini-admin |
| D.6 | **Pedir cita con gestoría** (o consulta de 10 min) antes de la primera factura, llevando `docs/SPECS/CONSULTA_GESTORIA.md` | Hacerlo ANTES de presentar la propuesta, no después — si el gestor obliga a RETA, cambia el texto fiscal de la propuesta | Primera factura; idealmente también la propuesta |

## Correcciones puntuales a aplicar (trabajo mecánico, delegable a Sonnet/Hermes)

1. MARCO_LEGAL §6.1: corregir "400-840 h" → "200-300 h" (B.1).
2. INFORME_AUDITABLE_v4 §5.2: marcar la cita "STS 29-10-2019 Sala Tercera" como
   pendiente de verificación en CENDOJ o retirarla (C.4). No tocar la v4 "cerrada" sin
   OK de Edu — puede bastar una nota al margen en DECISIONES.md.
3. Cláusula primer trabajo: los ajustes cosméticos y la garantía 30 días (C.5), tras D.3.
4. Propuesta al cliente: hacer explícito "hosting y cuentas a nombre del cliente" (C.2.1).

---

*Auditoría Fable, 16-jul-2026. Ninguna decisión de dinero ni la fiscal quedan cerradas
aquí: fiscal → gestoría real (D.6); dinero → Edu (D.1-D.3).*

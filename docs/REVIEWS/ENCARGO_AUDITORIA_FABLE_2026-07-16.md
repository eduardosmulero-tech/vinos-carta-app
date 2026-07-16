# ENCARGO — Auditoría completa (idea + plan + legal) — vinos-carta-app

> Preparado por Sonnet el 16-jul-2026, tras leer TODO el proyecto (AGENTS.md, CLAUDE.md,
> DECISIONES.md 523 líneas, HORQUILLA.md, MARCO_LEGAL.md, los 3 INFORME_AUDITABLE +
> sus 3 rondas de correcciones, INFORME_DESCUBRIMIENTO, respuestas-entrevista.json,
> demo/CONTRATO_DEMO_V1.md, AUDITORIA_PRINCIPAL_2026-07-16.md, y los documentos fuente
> de GapTecnologicoUtrera de los que MARCO_LEGAL.md deriva — PLAN.md, WORKFLOW.md,
> presupuesto.md). Objetivo: que Fable no gaste tokens re-leyendo ni re-derivando lo que
> ya está mapeado abajo, y audite con criterio lo que de verdad hace falta decidir.
>
> **Sonnet no cierra ninguna decisión aquí — solo mapea hechos, contradicciones y fuentes.**
> Las conclusiones de arquitectura/negocio/legal las cierra Fable + Edu.

---

## 0. Por qué existe este encargo

Edu estuvo sin Pro/Fable del 12 al 16-jul. En ese hueco, Hermes (rol "Principal") llevó
solo el proyecto de principio a fin: descubrimiento, decisiones técnicas, horquilla de
precio, informe de 950 líneas para el cliente, y una demo en curso. Es un encargo real
de su cuñado (empresa de vinos) — dinero real (3.000-6.900 €) y relación familiar de por
medio. Edu teme que, sin supervisión, la idea, el alcance o sobre todo el marco legal no
estén bien fundamentados. **La propia documentación del proyecto le da la razón en parte**
(ver §3).

---

## 1. El proyecto en una frase

PWA para camareros de restaurantes clientes de una distribuidora de vinos (empresa del
cuñado): buscar un vino de la carta *de ese restaurante*, ver ficha detallada, y recibir
recomendaciones por uva parecida. No genera ingresos directos — es valor añadido dentro
de un paquete de servicios que la empresa ya vende. Principio rector citado en todos los
documentos: *"No quiere volverse loco con features inútiles [...] Todo lo demás llegará
más adelante"* (`a-13-1`, respuesta literal del cuñado).

**Estado real (16-jul):** fase 100% pre-código. Sin repo git. Sin presupuesto presentado
al cliente. Demo (React+Vite+Tailwind, solo 1 pantalla de datos reales, sin backend) en
implementación, contrato/spec/plan de la demo ya revisados por un reviewer externo.

---

## 2. Mapa de decisiones cerradas (para no reabrir sin motivo)

Fuente: `docs/SPECS/DECISIONES.md` (25 decisiones, secciones A-H). Resumen por bloque:

| Bloque | Cerrado | Quién confirmó |
|---|---|---|
| A. Arquitectura | PWA responsive (no nativa), lectura offline cacheada, multi-tenant desde el día 1, sin integraciones TPV | Edu + Fable + cuñado |
| B. Producto | MVP de 4 funciones (búsqueda, ficha, recomendación por uva, inventario sin stock), algoritmo de recomendación por atributos (tipo→dulzor→cuerpo→uva→precio, sin ML), catálogo se crea de cero | Edu + Fable + cuñado + investigación externa sobre criterios de sumiller |
| C. Admin | Mini-admin "Opción C" (CRUD + asignación por buscador + import CSV) | Edu |
| D. Usuarios | Sin perfiles por camarero, login único por restaurante (código de acceso) | Edu / cuñado |
| E. Negocio | Horquilla (no cifra cerrada), app sin retorno directo | Edu + Fable |
| F. Visual | Paleta extraída del logo, demo con 19 vinos reales (8 Andrade + 11 Sauci) | Cuñado + Edu |
| G. Entorno | PDA/wifi asumidos "problema del restaurante", no condicionan precio | Edu |
| H. Proceso | Formato de oferta = horquilla; **sin repo git — pendiente decisión de Edu (H.2)** | — |

**No hace falta reabrir estas 25 decisiones una por una** salvo que la auditoría de idea/
negocio (§4) encuentre algo que las invalide de raíz.

---

## 3. Lo que NO está fiable tal cual — hallazgos verificados por Sonnet

### 3.1 Contradicción real sin resolver: ¿036 o RETA desde el día 1?

Hay **dos documentos legales del propio proyecto que no coinciden**:

- **`docs/INFORMES/INFORME_AUDITABLE_v4.md` (sección 5.2 / riesgo R8):** sostiene que
  036 (sin RETA) es viable **mientras el proyecto sea aislado** y la suma de ingresos por
  actividad esporádica en el año no se acerque al SMI anual (~15.000-17.000 €/año 2026).
  El presupuesto de vinos (2.650-5.900 €) queda "muy por debajo de ese umbral como caso
  aislado".
- **`docs/SPECS/MARCO_LEGAL.md` (§4, posterior, 15-jul):** concluye lo contrario — que
  por tener backend + datos de terceros (nivel "N2" del modelo heredado de
  GapTecnologicoUtrera), el proyecto **dispara RETA desde el día 1**, independientemente
  del importe o de que sea un cliente único.

**Ninguno de los dos es una fuente legal primaria verificada para este caso concreto.**
Sonnet comprobó que `MARCO_LEGAL.md` cita fielmente sus fuentes internas (`PLAN.md`,
`WORKFLOW.md`, `presupuesto.md` de GapTecnologicoUtrera existen y dicen lo que dice que
dicen) — pero esas fuentes son un **modelo fiscal genérico que Hermes diseñó para OTRO
proyecto** (Pepito, un catálogo estático sin backend ni login), luego adaptado por
analogía a vinos-carta-app. Es una extrapolación razonada, no una consulta fiscal real.

**Dato adicional que refuerza la cautela:** en la primera versión del informe auditable
(`INFORME_AUDITABLE.md`, v1), había una **cita legal incorrecta** — invocaba el art. 3.1
de la Ley 20/2007 cuando el artículo relevante sobre habitualidad es el art. 1.1 (corregido
en v1→v2 tras verificación externa contra boe.es, ver
`.hermes/desktop-attachments/CORRECCIONES_INFORME_v1_a_v2.md`, corrección #1). Es decir:
**ya hubo un error legal real en este proyecto**, que solo se detectó porque alguien
verificó contra la fuente primaria. No hay garantía de que no queden más.

**Hasta el propio proyecto lo reconoce como pendiente sin resolver:** el archivo
`CORRECCIONES_INFORME_v3_a_v4.md` (el último, que cierra la v4 "definitiva") termina
con una lista de "qué queda pendiente de verdad — ya no depende de Claude ni de DeepSeek":
el punto #1 es literalmente **"Consulta de 10 min con un gestor antes de la primera
factura"**. A fecha de este encargo, **esa consulta no se ha hecho.**

### 3.2 Posible contradicción entre lo que dijo el cliente y lo que se cerró

`respuestas-entrevista.json` (`a-08-3`, primera toma de contacto, sin fecha exacta) dice
textualmente: *"La empresa de vinos en su app para mostrar a los clientes y sus clientes
[los restaurantes] inyectarán sus datos para crear su carta"* — es decir, en la entrevista
inicial el cuñado dio a entender que **los restaurantes cargarían sus propios datos**.

`AGENTS.md` y `DECISIONES.md` (Pregunta D, sesión 15-jul) cierran justo lo contrario:
*"la empresa de vinos gestiona el catálogo y asigna las cartas [...] Los restaurantes solo
consultan"*, presentado como coincidente con la recomendación de Fable (C.2) y
"ratificado por Edu + Fable + cuñado 15-jul".

Puede que el 15-jul se re-confirmara esto directamente con el cuñado y sea una corrección
legítima de la respuesta ambigua inicial — pero **no hay registro explícito en los
documentos de esa reconfirmación**, solo la afirmación de que se ratificó. Vale la pena
que Fable verifique con Edu si ese "ratificado 15-jul" fue una conversación real con el
cuñado o una decisión tomada por el propio Hermes/Fable y solo comunicada como cerrada.
Si el modelo de datos real es "restaurantes cargan su carta", el mini-admin (decisión C.1,
"empresa asigna por buscador") estaría mal dimensionado.

### 3.3 Fiabilidad de proceso — la autoauditoría que ya existe

`docs/REVIEWS/AUDITORIA_PRINCIPAL_2026-07-16.md` (16-jul, el propio rol Principal
auditándose) documenta 12 errores sistemáticos: patches directos a los informes sin
pipeline contrato→gate→reviewer, sesiones cerradas sin skill de cierre, Kanban nunca
creado, y — el más relevante para este encargo — afirmó tener una pipeline de subagentes
funcionando cuando **no lo estaba realmente**. Esto no invalida el contenido, pero baja
la confianza por defecto en cualquier afirmación de "esto ya está verificado" dentro de
los documentos del proyecto si no lleva una fuente externa citada (como sí la lleva, por
ejemplo, la corrección del art. 1.1 contra boe.es).

### 3.4 Gaps que el propio proyecto reconoce como abiertos y siguen sin cerrar

De `AGENTS.md` (sección "Abierto — pendiente de resolver") + `CORRECCIONES_INFORME_v3_a_v4.md`:

1. Perfil real del camarero-usuario (edad, comodidad tecnológica) — nunca se preguntó.
2. Contradicción "sin mantenimiento" vs. "cambios más adelante" (`a-11-1` vs `a-11-3`) —
   Hermes/Fable cerró de facto con "Opción B recomendada" en la v4 del informe auditable,
   pero **Edu no ha confirmado explícitamente** que esa sea su elección, según el propio
   AGENTS.md ("Cifra final la decide Edu").
3. ¿Clientela extranjera en los restaurantes? (afecta si hace falta versión en inglés) —
   pregunta pendiente de hacer al cuñado, nunca se hizo.
4. ¿Cómo se usa en la práctica el PDF de inventario? (muchas PDA no tienen impresora) —
   pregunta pendiente de hacer al cuñado, nunca se hizo.
5. Próxima fecha de contacto / forma de entrega de la propuesta — sin definir.
6. `H.2` (control de versiones): sin repo git — Edu no ha decidido si versionar ya la
   documentación.

### 3.5 Cosas que SÍ están bien fundamentadas (para no auditar de más)

- El algoritmo de recomendación por uva (tipo→dulzor→cuerpo→uva→precio) viene de una
  investigación real sobre estándares de sumillería (OIV, clasificaciones de vino), no es
  una ocurrencia — está documentado y resuelve un caso real de los datos (la uva Zalema
  aparece en vinos radicalmente distintos).
- La comparativa de precio contra mercado (`MARCO_LEGAL.md` §6, basada en
  `research3-mercado-precios.md`) cita fuentes de mercado con nombre (tarifaautonomo.com,
  Hostinger, raiolanetworks.com) — no son cifras inventadas, aunque no se ha vuelto a
  verificar si siguen vigentes en julio 2026.
- Los datos de la demo (19 vinos, 2 bodegas) son reales, facilitados por el cuñado —
  no hay datos ficticios en el material que se enseñará.

---

## 4. Lo que se le pide a Fable

**No es una auditoría técnica de código** (no hay código aún). Es una auditoría de:

### A. Idea y encaje de negocio
- ¿El MVP de 4 funciones sigue teniendo sentido dado que la app "no genera ingresos
  directos" y depende de que el negocio de vino le vaya bien a la empresa (riesgo de
  negocio ya señalado en `INFORME_DESCUBRIMIENTO §10`)? ¿Vale la pena para Edu en tiempo/
  riesgo/dinero, siendo su primer proyecto grande y con un cliente familiar?
- Revisar si el "Opción B recomendada" (3 meses de cambios incluidos) para resolver la
  contradicción mantenimiento-sí/no es de verdad la mejor opción para Edu, no solo la que
  quedó escrita — Edu nunca la confirmó explícitamente (§3.4.2).

### B. Planes (alcance, precio, proceso)
- Validar la horquilla (`HORQUILLA.md`) y si el ancla de "primer proyecto grande, precio
  algo por debajo de agencia" sigue siendo la estrategia correcta, o si el riesgo legal
  (§4.C) debería subir el precio para cubrir el coste de una gestoría real.
- Decidir si Edu abre repo git ya (H.2) antes de seguir generando documentación sin
  versionar.
- Cerrar los gaps de §3.4 (puntos 1, 3, 4, 5) con preguntas concretas para llevar al
  cuñado — no inventarlas.

### C. Legal y fiscal — la parte que más preocupa a Edu
- **Resolver o dejar explícitamente sin resolver (no elegir a ciegas) la contradicción
  036-vs-RETA del §3.1.** Ninguna IA (ni Fable, ni Sonnet, ni Hermes) tiene autoridad para
  cerrar esto por sí sola: es exactamente el tipo de decisión que el propio proyecto ya
  identificó que necesita una gestoría real (§3.1, "consulta de 10 min con un gestor").
  El entregable de esta parte de la auditoría debería ser: una recomendación clara de con
  qué opción presentarse (036 u RETA) **condicionada explícitamente a validación
  profesional antes de la primera factura**, no una afirmación cerrada.
- Revisar si vale la pena verificar con el cuñado el punto §3.2 (quién carga los datos)
  antes de dar la arquitectura del mini-admin por cerrada.
- Revisar la cláusula "primer trabajo" (`MARCO_LEGAL.md` §5) — también es texto generado
  por IA por analogía, nunca revisado por un profesional. Aunque no es tan sensible como
  lo fiscal (es una cláusula contractual entre privados, no una obligación ante Hacienda),
  merece la misma cautela antes de presentarla como definitiva a un familiar.

---

## 4bis. Regla del proyecto — cero rastro de IA en documentos de entrega

**Añadida a `AGENTS.md` el 16-jul, a petición explícita de Edu, tras este mismo encargo.**
Cualquier documento final con destinatario fuera del equipo de trabajo (cuñado, socia,
gestoría, o cualquier tercero) se entrega y se presenta como si lo hubiera escrito Edu
enteramente — cero menciones a IA, cero estilo reconocible como generado por IA. Esto
incluye explícitamente lo que se lleve a la consulta con la gestoría real (§4.C): Edu no
la presenta como "esto me lo generó una IA, ¿está bien?", la presenta como su propio
análisis. Los documentos internos de trabajo (DECISIONES.md, este mismo encargo, la
auditoría) no llevan esta restricción.

**Implicación práctica para esta auditoría:** cuando Fable prepare la síntesis de la
consulta a gestoría (o cualquier otro documento con destino fuera del equipo), debe
producir directamente la versión limpia sin rastro de IA — no un borrador "tipo informe
de IA" que luego haya que limpiar aparte.

## 5. Restricción para esta auditoría

- No volver a leer todo el proyecto desde cero: este documento ya cita línea/sección de
  cada fuente relevante. Si Fable necesita un documento no citado aquí, es señal de que
  este encargo tiene un hueco — mejor decírselo a Edu que improvisar.
- No cerrar la decisión legal fiscal en firme sin dejar constancia de que sigue
  pendiente de gestoría real — sería repetir exactamente el problema que motivó esta
  auditoría.
- Cualquier hallazgo nuevo de esta auditoría que contradiga una decisión de la tabla del
  §2 debe citar el motivo, igual que hace `DECISIONES.md` con las suyas.

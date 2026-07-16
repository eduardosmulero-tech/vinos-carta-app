# Informe de descubrimiento — App carta de vinos (cliente: empresa de vinos, vía cuñado de Edu)

> Fecha entrevista: no registrada en el formulario (campos de metadatos vacíos).
> Fecha de este informe: 12-jul-2026.
> Fuente: `respuestas-entrevista.json` (guion "Entrevista al cliente — Descubrimiento de proyecto"), adjunto en `docs/respuestas-entrevista.json`.

---

## 1. Resumen en una frase

Una **app biblioteca de vinos** para que los camareros de un restaurante consulten al momento la carta de vinos de *ese* restaurante (no el catálogo general de la empresa de vinos), con ficha detallada de cada vino y recomendaciones por uva parecida — pensada para que el restaurante no dependa de formar a cada camarero nuevo.

---

## 2. Contexto y origen (bloque 02)

- La empresa de vinos quiere dar a los restaurantes una herramienta para que sus camareros nunca se queden sin saber qué responder ante peticiones de vino.
- Sustituye, en parte, a los **cursos de vinos presenciales** que la empresa imparte hoy: con rotación de camareros cada 2-3 meses, formar a cada uno en persona no escala. La app es la alternativa escalable.
- Proceso actual (sin la app): cursos de vinos en persona. Esto es la "regla de negocio implícita" a digitalizar — el contenido de esos cursos es, probablemente, la base del contenido de las fichas de vino.

**Lectura:** el valor de negocio real no es "vender una app", es **sustituir formación recurrente por una herramienta de autoservicio**. Esto debería marcar el tono del contenido de cada ficha de vino: no es una simple descripción de producto, es una chuleta rápida pensada para resolver una pregunta de un cliente del restaurante en segundos.

---

## 3. Usuarios (bloque 03)

- **Usuario final de la app**: camareros de restaurante. Perfil no detallado (edad, comodidad con tecnología) — **no se completó `a-03-1` en profundidad**, solo "Restaurantes" como respuesta genérica. Falta perfil de persona real (ver §7, gaps).
- **Dos tipos de cliente/actor distintos, no confundir:**
  1. La **empresa de vinos** (gestiona el catálogo maestro, es quien encarga y paga).
  2. Los **restaurantes** (consumidores finales de la app; cada uno ve *solo* su propia carta, no el catálogo completo de la empresa de vinos).
- Esto es un **requisito de arquitectura multi-tenant** desde el minuto uno: la app necesita separar los datos por restaurante aunque la fuente de datos maestra sea única (la empresa de vinos).
- No se completó `a-03-3` (frustración actual del usuario) — gap a cerrar en próxima conversación.

---

## 4. Objetivos de negocio y éxito (bloque 04)

- **No genera ingresos directos.** Forma parte de un paquete de servicios que la empresa de vinos ya vende a los restaurantes (junto a otros servicios, presumiblemente suministro de vino).
- Éxito = que los camareros no se queden nunca sin saber responder ante una petición de vino (`a-04-1`), pero **no hay ninguna métrica numérica** dada (ni "menos llamadas de soporte", ni "X restaurantes usándola", ni "Y consultas/día"). Esto es la señal de alerta que la propia plantilla anticipa en el bloque 04: sin número, no hay forma objetiva de medir éxito al final.
- No se completó `a-04-3` (quién más en la organización debe quedar contento) — gap.

---

## 5. Alcance — MVP y fases (bloque 05)

**MVP explícito, en palabras del cliente (`a-05-1`):**
1. Búsqueda de vinos en la carta.
2. Descripción completa de cada vino.
3. Recomendaciones de uvas parecidas.

**Fase posterior, ya insinuada pero fuera del MVP (`a-05-2`):**
- Datos de colección (aclarar qué significa "colección" — ¿histórico de compras del restaurante? ¿fondo de bodega?).
- Motor de recomendación **inverso**: que la empresa de vinos ofrezca vinos al restaurante que cubran huecos de sabor/tipo que no tiene en su carta actual. Esto es venta cruzada B2B disfrazada de feature — tiene sentido de negocio (vender más vino) pero es una pieza bastante más compleja que el MVP (necesita analizar la carta existente y comparar contra catálogo maestro).

**No se completó `a-05-3`** (qué NO debe hacer nunca la app) — gap, pero hay una señal fuerte en el bloque 13 (ver §9): el cliente pide explícitamente evitar features inútiles.

---

## 6. Plataforma y entorno técnico (bloques 06, 08, 09)

- **Plataforma: móvil**, para las **PDA** que ya usan los camareros (`a-06-1`). Esto es un dato técnico importante: hay que confirmar qué son exactamente esas PDA (¿Android dedicado tipo Sunmi/Zebra? ¿terminales TPV con Android embebido?) antes de asumir "cualquier móvil". Puede condicionar la resolución de pantalla, versión de Android mínima, y si hace falta modo kiosko.
- **Offline: contradictorio.**
  - `a-06-2`: "No tiene por qué" (no offline).
  - `a-06-3` (usuarios concurrentes): "Según clientela y el tamaño de su plantilla" — no es una cifra, es una función de variables que aún no conocemos.
  - **Gap a cerrar**: si el restaurante está en una zona con mal wifi/cobertura (sala, terraza, sótano de bodega), offline puede pasar de "no hace falta" a "imprescindible" en la práctica. Vale la pena preguntar directamente por el escenario físico de uso, no solo por la intención declarada.
- **Datos**: hoy viven "en otro programa y su base de datos" (`a-08-1`) — no se especifica cuál programa. Sin esto, no se puede estimar el trabajo de integración/migración.
- **Integraciones con terceros**: "no, de momento no" (`a-08-2`).
- **Quién inyecta los datos**: la empresa de vinos alimenta su propia app maestra, y sus restaurantes clientes inyectan sus propios datos para construir su carta (`a-08-3`). Esto confirma el modelo multi-tenant de arriba, pero abre una pregunta operativa importante: **¿quién en el restaurante hace esa carga inicial de datos, y con qué herramienta?** (¿un panel de admin? ¿un import desde Excel? ¿lo hace la propia empresa de vinos por ellos?) — no está respondido.
- **Roles/accesos**: de primeras, sin distinguir entre tipos de usuario dentro del restaurante (`a-09-1`) — simplifica el MVP, no hace falta sistema de permisos complejo todavía.
- **Login**: sin decidir, pero **no será público** (`a-09-2`) — hay que proponer opciones (código de acceso por restaurante es lo más simple y encaja con el modelo B2B2B).
- **Baja de usuario**: se elimina la cuenta (`a-09-3`) — sencillo, sin necesidad de proceso de exportación de datos personales complejo (coherente con que no hay datos sensibles, ver §8).

---

## 7. Identidad visual (bloque 07)

- Ya existe un planteamiento previo de marca — el cliente pasará esos datos (`a-07-1`).
- **`a-07-2` y `a-07-3` sin responder** ("no lo sabe, me toca a mí buscar" / "igual que antes, no lo sabe"). Esto significa que **la investigación de referencias visuales y de competencia recae en el equipo de desarrollo**, no en el cliente. Hay que reservar tiempo para esto explícitamente en cualquier propuesta — no es gratis y normalmente el cliente lo aporta él mismo.

---

## 8. Legal y datos sensibles (bloque 12)

- Los únicos datos reales del sistema son **datos de vinos** (`a-12-1`) — no hay datos personales sensibles, salud, pagos ni menores. Esto simplifica mucho el cumplimiento normativo.
- Sector: hostelería (`a-12-2`), sin regulación especial adicional más allá de la genérica.
- **Requisito nuevo, no estaba en el MVP original**: la app debe poder generar un **informe de inventario** (`a-12-3`). Esto es scope adicional — encaja mejor como fase 2 que como parte del MVP de 3 funciones, pero conviene confirmarlo explícitamente con el cliente para que no se cuele como "ya estaba incluido".

---

## 9. Restricción explícita de alcance (bloque 13) — la más importante del documento

> *"No quiere volverse loco con features inútiles y sin valor. Quiere una app útil para los camareros y fácil de usar para los restaurantes. Todo lo demás llegará más adelante."* (`a-13-1`)

Esta es, en la práctica, la respuesta a la pregunta 3 del bloque 05 que quedó vacía ("¿qué NO debe hacer nunca la app?"). Es un mandato claro de **mantener el MVP mínimo y no añadir nada por iniciativa propia** sin confirmarlo. Cualquier propuesta técnica debería citar esta frase literalmente como principio rector.

`a-13-2` y `a-13-3` (bloqueadores internos, qué se sacrifica si hay que recortar) — **sin responder**, gap a cerrar antes de comprometer alcance.

---

## 10. Presupuesto, plazo y mantenimiento (bloques 10-11) — zona de riesgo

- **Presupuesto: "a investigar"** (`a-10-1`), sin rango ni siquiera aproximado. El propio guion de entrevista avisa de esto en su recuadro de "señal de alerta": sin cifra, ni siquiera un rango cerrado, **el proyecto no está maduro para presupuestarse con precisión** todavía.
- **Plazo: sin plazo** (`b-plazo`) — no hay presión de fecha, lo cual es una ventaja para validar bien el alcance antes de comprometerse.
- **Intentos previos**: no respondido (`a-10-3`) — gap, vale la pena preguntar si ya se intentó este proyecto antes.
- **Mantenimiento** (`a-11-1`): "De primeras no, buscan aplicación sin mantenimiento básica. Si venden [el vino, ingreso real de la empresa] irán mejorándola." Es decir: **quieren un producto V1 barato y estático**, y solo invertirán en iterar si el negocio de vino (no la app) genera más ingresos. Esto es una señal de riesgo de negocio, no técnica: la app depende presupuestariamente del éxito comercial de otra cosa.
- Sin presupuesto aparte para mantenimiento (`a-11-2`: "No").
- Pero sí esperan pedir cambios o funciones nuevas más adelante (`a-11-3`: "Sí") — **contradicción a resolver**: quieren evolución sin presupuesto de mantenimiento reservado. Hay que dejar esto explícito en la propuesta: "sin mantenimiento" y "cambios futuros" no son compatibles sin un acuerdo económico claro, aunque sea mínimo.

---

## 11. Blueprint resumen (bloque 15, tal como lo dejó el cliente)

| Campo | Valor |
|---|---|
| Nombre del proyecto | Por decidir |
| Usuario principal | Restaurantes |
| Frase resumen | App biblioteca de vinos |
| MVP | Búsqueda profunda de vinos, página de exposición detallada de cada ejemplar, recomendaciones parecidas |
| Plataforma | Móvil |
| Complejidad estimada | Baja-Media |
| Presupuesto | A investigar |
| Plazo | Sin plazo |

**Checklist de salida (bloque 16): ninguna casilla marcada** (`c1`–`c7` todas en `false`). Es decir, según el propio checklist de la plantilla, **no se cerró** ni el rango de presupuesto, ni la fecha límite, ni quién decide, ni la forma de contacto, ni cuándo llega la propuesta, ni si quieren resumen por email. Esto no significa que la reunión fuera mala — es la primera toma de contacto vía el cuñado de Edu, no necesariamente la entrevista formal completa — pero **hay que cerrar estos puntos antes de escribir cualquier propuesta con precio**.

---

## 12. Gaps a cerrar antes de presupuestar (lista accionable)

1. **Presupuesto**: ni siquiera un rango cerrado (ofrecer opciones tipo "¿cientos, miles, decenas de miles?" como sugiere el propio guion).
2. **Quién decide** dentro de la empresa de vinos (interlocutor final, más allá del cuñado de Edu como puente).
3. **Perfil real del camarero-usuario** (edad aprox., comodidad con tecnología) — condiciona diseño de UI.
4. **Qué programa/base de datos** alberga hoy los datos de vinos, y en qué formato se podrían exportar/migrar.
5. **Qué son exactamente las PDA** (marca/modelo, SO) que usarán los camareros.
6. **Offline real**: preguntar por el escenario físico de uso (cobertura wifi en sala/bodega), no solo por la intención declarada — hay contradicción entre `a-06-2` y `a-06-3`.
7. **Cómo se carga la carta inicial de cada restaurante** — ¿panel propio, import, lo hace la empresa de vinos por ellos?
8. **Mantenimiento vs. cambios futuros**: contradicción a resolver explícitamente (quieren "sin mantenimiento" pero también "cambios más adelante").
9. **Informe de inventario** (`a-12-3`): confirmar si es MVP o fase 2 — no encaja con las 3 funciones declaradas como MVP.
10. Confirmar **próxima fecha de contacto** y forma de recibir la propuesta (checklist bloque 16, todo pendiente).

---

## 13. Recomendación de enfoque técnico (borrador, sujeto a los gaps de arriba)

- **Complejidad real esperada: Media**, no Baja-Media como estimó el cliente — el multi-tenant (una empresa de vinos, N restaurantes, cada uno viendo solo su carta) y la carga inicial de datos por restaurante ya son más que un CRUD simple, aunque el MVP funcional (búsqueda + ficha + recomendación por uva) sea sencillo en sí mismo.
- Dado presupuesto no definido y mantenimiento "no querido", conviene proponer una **arquitectura barata de operar** (evitar infraestructura con coste recurrente alto, priorizar algo que se pueda dejar funcionando con mínima supervisión).
- El motor de "recomendación por uva parecida" (MVP) es lógica de negocio simple si el catálogo de vinos incluye metadatos de variedad de uva — no necesita ML, es un filtro/matching por atributos.
- El motor de "huecos de sabor" (fase 2, `a-05-2`) sí es más elaborado — dejarlo fuera del primer contrato/presupuesto.

---

## 14. Próximo paso sugerido

No escribir propuesta con precio todavía. Antes:
1. Cerrar con el cuñado de Edu (o directamente con la empresa de vinos) los 10 gaps de §12, especialmente presupuesto, PDA/offline, y origen de datos.
2. Con eso, generar un documento de alcance (MVP cerrado + fases) y una **horquilla** de presupuesto, no una cifra cerrada, dado que el propio cliente no tiene aún claro el rango.

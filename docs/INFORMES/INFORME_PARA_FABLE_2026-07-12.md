# Informe para Fable — App carta de vinos (elevación de decisión)

> Preparado por Sonnet a petición de Edu. Sonnet no propone ni decide arquitectura/alcance/precio — las secciones de abajo separan explícitamente qué viene dado por la empresa cliente y qué es propuesta de trabajo de Sonnet en esta conversación, para que **Fable audite específicamente lo segundo** y decida qué queda, qué cambia y qué falta.

---

## 0. Qué es el proyecto (hecho, no decisión)

App biblioteca de vinos, encargo de una empresa de vinos (cliente llega vía el cuñado de Edu). Sirve a camareros de restaurante para consultar la carta de vinos de su propio restaurante. Es un servicio que la empresa de vinos ofrece a sus restaurantes clientes, no una herramienta interna de la empresa de vinos.

Detalle completo del descubrimiento: `docs/INFORME_DESCUBRIMIENTO_2026-07-12.md`. Respuestas originales: `docs/respuestas-entrevista.json`.

---

## A. Decisiones 100% de la empresa cliente

Vienen directamente de la entrevista o de lo que Edu ha transmitido de su cuñado. No son propuesta de nadie del lado de desarrollo — son datos de entrada.

- **MVP original en 3 funciones** (`a-05-1`): búsqueda de vinos en la carta, ficha detallada de cada vino, recomendaciones de uvas parecidas.
- **El cliente añade una 4ª función al MVP**: informe de inventario. Antes estaba fuera del MVP declarado (`a-12-3` lo mencionaba como capacidad deseada, no como una de las 3 funciones); Edu confirma en esta conversación que el cliente la sube a MVP.
- **No genera ingresos directos**: la app es parte de un paquete de servicios que la empresa de vinos ya vende a sus restaurantes.
- **No hay integración con sistemas externos**: la empresa de vinos tiene su propia BD/programas internos, pero son cosa aparte — no hay "otro programa parecido" al que conectarse. El catálogo de vinos para esta app se crea de cero, dentro de la nueva app.
- **Restricción de alcance explícita del cliente** (`a-13-1`): *"No quiere volverse loco con features inútiles y sin valor. Quiere una app útil para los camareros y fácil de usar para los restaurantes. Todo lo demás llegará más adelante."*
- **Sin presupuesto de mantenimiento reservado**, pero esperan poder pedir cambios/funciones nuevas más adelante (`a-11-1`, `a-11-2`, `a-11-3`) — contradicción que viene tal cual del cliente, sin resolver.
- **Sin datos personales sensibles**, solo datos de vinos (`a-12-1`, `a-12-2`).
- **Sin plazo/fecha límite** (`b-plazo`).
- **Interlocutores que deciden por parte del cliente**: el cuñado de Edu y su socia.
- **Pendiente de decidir por el cliente, no por nosotros**: cómo pasa un vino del catálogo maestro a la carta de un restaurante concreto — si la empresa de vinos asigna directamente qué ve cada restaurante, o si el restaurante elige/gestiona su propia carta desde lo que le ofrece la empresa de vinos. Edu confirma que esto lo decide su cuñado, sin fecha.

---

## B. Propuesta de trabajo de Sonnet en esta conversación — PARA AUDITAR

Esto **no** lo ha pedido ni decidido el cliente. Son llamadas técnicas que Sonnet hizo para poder avanzar, y Edu las aceptó en el momento, pero según la regla del proyecto (Sonnet no decide arquitectura) deben pasar por auditoría de Fable antes de darlas por buenas.

1. **Primera oferta de presupuesto la hacemos nosotros, no el cliente.** El cliente no dio ni rango. Sonnet lo planteó como forma de destrabar el gap de presupuesto; Edu lo confirmó como cierto en general para este tipo de encargo, no es algo que dijera el cliente.
2. **Plataforma: app web responsive (PWA) en vez de nativa.** Propuesta de Sonnet para evitar depender del modelo/SO exacto de las PDA de los camareros (dato que no se tiene). Alternativas no evaluadas por Fable: app nativa, o app híbrida.
3. **Offline descartado para v1** (se asume conexión). Propuesta de Sonnet por simplicidad; el propio dato de origen tiene una contradicción sin resolver (`a-06-2` dice que no hace falta, `a-06-3` lo condiciona al tamaño de plantilla) — nadie ha confirmado el escenario físico real (cobertura wifi en sala/bodega).
4. **Necesidad de un panel/mini-admin para que la empresa de vinos cargue su catálogo maestro.** Inferencia de Sonnet ("sin esto no hay contenido que mostrar"), no una función pedida explícitamente por el cliente como tal — es una pieza de desarrollo que Sonnet considera necesaria de forma implícita al MVP.

**Nada de esta sección debe tratarse como cerrado.** Es el material que Fable debe auditar: confirmar, corregir o sustituir cada punto, y proponer lo que considere mejor para el caso (incluida la decisión pendiente de la empresa en el punto A final, si Fable prefiere adelantar una recomendación en vez de esperar al cuñado).

---

## C. Qué necesita hacer Fable

1. Auditar los 4 puntos de la sección B — decidir si se mantienen, se cambian, o se abre alguno a más opciones.
2. Decidir si propone algo para el punto pendiente de la empresa (catálogo maestro → carta de restaurante) o si se espera a que lo cierre el cuñado.
3. Con eso, definir alcance final documentado y horquilla de precio de la primera oferta.

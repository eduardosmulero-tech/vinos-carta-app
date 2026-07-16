# App de carta de vinos para camareros — resumen de lo diseñado

> Recoge lo que hemos entendido de la entrevista inicial
> y las decisiones de diseño que ya podemos dar por buenas. Al final van las dos preguntas
> que nos faltan para poder pasaros una propuesta con precio.

---

## 1. Qué va a hacer la app

Una aplicación para que los camareros de cada restaurante consulten, en el momento, la carta
de vinos de **ese restaurante concreto** — no el catálogo completo de la empresa, solo lo que
ese restaurante tiene disponible. Sustituye en parte a la formación presencial de vinos: como
los camareros rotan cada 2-3 meses, formar a cada uno en persona no es sostenible.

Las 4 funciones que forman la primera versión (MVP):

1. **Buscador de vinos** dentro de la carta del restaurante.
2. **Ficha detallada** de cada vino.
3. **Recomendaciones** de vinos con uvas parecidas — para cuando un cliente pide algo que no
   hay, poder ofrecer una alternativa con criterio.
4. **Informe de inventario** de la carta — el alcance exacto de esto es una de las dos
   preguntas pendientes (ver punto 4 más abajo).

## 2. Cómo funciona por dentro

- Hay **un catálogo maestro**, gestionado por la empresa de vinos, con todos los vinos que
  maneja.
- Cada restaurante tiene **su propia carta**, que es un subconjunto de ese catálogo maestro.
- Un camarero de un restaurante solo ve la carta de su restaurante, nunca el catálogo entero.
- El contenido (fichas de cada vino, con su uva, bodega, notas de cata, etc.) se **crea desde
  cero dentro de la nueva app** — no se reutiliza nada de los sistemas internos actuales de la
  empresa de vinos, porque son cosas distintas.

## 3. Decisiones de diseño ya cerradas

- **Funciona en cualquier móvil o tablet con navegador**, sin necesidad de instalar nada desde
  una tienda de aplicaciones (esto se llama "app web"). Es la opción más flexible porque cada
  restaurante puede tener dispositivos distintos.
  - Único caso que nos haría cambiar de idea: si algún restaurante usa terminales muy antiguos
    sin navegador actualizado. Si sabéis de alguno así, decídnoslo.
- **Funciona sin wifi para consultar la carta.** Aunque hoy es raro no tener cobertura, la
  carta de cada restaurante se guarda en el propio dispositivo, así que si hay un punto muerto
  de wifi en sala o bodega, el camarero puede seguir consultando sin cortes. Lo único que
  requiere conexión son los cambios que se hagan a la carta (nuevas altas, precios, etc.).
- **Panel de gestión** para que la empresa de vinos mantenga el catálogo maestro y arme la
  carta de cada restaurante. Aquí queda una decisión abierta sobre quién gestiona qué (ver
  pregunta D).

## 4. Restricción que tenemos muy presente

Nos habéis pedido explícitamente: *"No queremos volvernos locos con features inútiles y sin
valor. Queremos una app útil para los camareros y fácil de usar para los restaurantes. Todo lo
demás llegará más adelante."* Todo el diseño de arriba está pensado para cumplir justo eso:
lo mínimo que hace falta para que funcione bien, sin añadir nada de más.

## 5. Lo que todavía no hemos hecho

No hemos puesto todavía ningún precio ni cerrado el alcance final. Nos faltan dos respuestas
vuestras para poder hacerlo con criterio — están abajo.

---

## Dos preguntas que nos faltan

### Pregunta A — El informe de inventario

Sobre el informe de inventario que queréis que saque la app, necesito que me concretéis cuál de estas dos cosas es, porque cambia bastante el trabajo:

Opción 1: Un listado de la carta. El informe saca qué vinos tiene el restaurante en su carta (nombre, bodega, tipo, uva, precio...), pero sin cantidades.
- A favor: no hay que mantener nada al día, la app sigue siendo "sin mantenimiento" como queréis, y entra sin problema en el presupuesto base.
- En contra: no dice cuántas botellas quedan, así que no sirve para controlar stock ni para pedidos.

Opción 2: Un inventario de verdad, con cantidades. El informe dice cuántas botellas hay de cada vino.
- A favor: sirve para reposición y pedidos, tiene más valor para el restaurante.
- En contra: alguien del restaurante tendría que actualizar las cantidades cada vez que se vende o entra una botella (o habría que conectar la app con la caja del restaurante, que dijisteis que de momento no). Si nadie lo actualiza, el informe miente y la gente deja de fiarse de él. Y encarece la app, chocando con lo de "fácil y sin complicaciones".

Mi sugerencia: empezar con la opción 1, y si más adelante veis que hace falta la 2, se añade entonces.

### Pregunta D — Quién gestiona la carta de cada restaurante

Cuando un camarero abre la app, ve la carta de su restaurante. Lo que necesito saber es quién decide y carga qué vinos aparecen en la carta de cada restaurante. Hay dos maneras:

Opción 1: Lo gestionáis vosotros (la empresa de vinos). Vosotros dais de alta los vinos con toda su información y le asignáis a cada restaurante su carta. El restaurante solo entra y consulta, no toca nada.
- A favor: para el restaurante es cero trabajo (que es justo lo que pedíais: fácil para ellos), la información siempre está bien puesta porque la controláis vosotros, y la app sale más barata y está lista antes.
- En contra: cada cambio de carta pasa por vosotros. Si un restaurante cambia de vinos muy a menudo, ese trabajo os cae a vosotros.

Opción 2: Cada restaurante gestiona su propia carta. Vosotros mantenéis el catálogo general de vinos, y cada restaurante elige de ahí cuáles tiene y los quita o pone él mismo.
- A favor: los restaurantes son autónomos y no os dan trabajo con los cambios.
- En contra: la app necesita una parte de gestión para los restaurantes (más cara y más lenta de hacer), habría que enseñar a alguien de cada restaurante a usarla, y si no la tocan las cartas se quedan desactualizadas.

Se puede empezar perfectamente con la opción 1 y añadir la 2 más adelante sin tirar nada de lo hecho.

---

Con estas dos respuestas ya podemos pasaros una propuesta con un rango de precio y alcance
concreto.

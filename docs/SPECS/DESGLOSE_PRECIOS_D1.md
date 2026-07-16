# Desglose de precios y guión de defensa — D.1 (propuesta Fable, 16-jul-2026)

> **Documento interno de trabajo** (Edu + IA). No se entrega al cliente tal cual.
> Cifras propuestas por Fable con aritmética verificada. **La cifra final la decide Edu.**
> Sustituye los rangos de HORQUILLA.md cuando Edu los ratifique.

> ⚠️ **ACTUALIZACIÓN 16-jul (posterior, ratificada por Edu): la propuesta ya NO se
> presenta como rango.** Edu decidió cifra cerrada con opciones transparentes:
> **A = 4.600 €** (bloques: 1.250 / 1.150 / 950 con CSV / 300 / 550 / 400) ·
> **B = 5.050 €** (A + 450 de soporte). Dos opciones que restan, nombradas en el papel:
> −200 € si la diseñadora aporta diseños (bloque 5 → 350), −200 € si el CSV se aplaza
> (bloque 3 → 750). Mínimo configurable: 4.200 € — por encima del suelo A (3.900 ✓).
> Campos de ficha: cerrados por alcance ("los listados; adicionales aparte"), ya no son
> driver de precio. Los rangos de este documento quedan como **modelo interno** (drivers
> §5 = munición verbal); los suelos de §6 siguen vigentes para negociar.

---

## 1. Principio del desglose: partidas, no horas

El presupuesto se presenta al cliente **desglosado por bloques de entrega (partidas)**,
nunca por horas. Razones:

1. Las horas invitan a negociar la tarifa ("¿y si le dedicas menos horas?").
2. El cliente compra resultados (una app que funciona en sus PDA), no tiempo de teclado.
3. La ganancia de productividad por IA es margen de Edu (criterio cerrado en AGENTS.md);
   un desglose por horas la expondría.

Internamente sí hay un modelo de horas (§4) para que Edu pueda razonar la cifra si le
aprietan — pero no se enseña.

---

## 2. Desglose por partidas (alcance común A y B)

| # | Partida | Qué ve el cliente | Rango |
|---|---------|-------------------|-------|
| 1 | **Base de la aplicación** | App instalable en cualquier PDA/móvil (PWA), un acceso por restaurante, cada restaurante ve solo su carta, la carta se puede consultar sin wifi | 1.100 – 1.400 € |
| 2 | **Funciones de camarero** | Buscador de vinos, ficha completa (bodega, uva, D.O., graduación, notas de cata — SIN precio, decisión 16-jul), recomendaciones de vinos parecidos por uva y tipo | 1.000 – 1.300 € |
| 3 | **Panel de administración (empresa)** | Alta/edición de vinos, asignación de cartas a cada restaurante, importación desde Excel/CSV | 800 – 1.100 € |
| 4 | **Informe de inventario** | Listado de la carta de cada restaurante exportable a PDF | 250 – 350 € |
| 5 | **Diseño y adaptación visual** | Aplicación de la identidad de la empresa (logo, colores), interfaz pensada para uso rápido en sala | 400 – 600 € |
| 6 | **Puesta en marcha** | Carga inicial de las 19 fichas (Andrade + Sauci), despliegue en producción, pruebas en PDA reales de un restaurante | 350 – 450 € |
| | **Total Opción A** | | **3.900 – 5.200 €** |

Verificación de sumas: mínimos 1.100+1.000+800+250+400+350 = **3.900** ✓ ·
máximos 1.400+1.300+1.100+350+600+450 = **5.200** ✓

Cambios respecto a HORQUILLA.md: el suelo sube de 3.150 a 3.900 (el suelo anterior
implicaba tarifa de becario, ver §4); el techo baja de 5.300 a 5.200 (redondeo de
partidas). La "carga inicial de fichas" deja de ser línea suelta y se integra en
"Puesta en marcha" (una línea de 150-300 € invita a regatearla; dentro de un bloque
de puesta en marcha no).

**Qué mueve la cifra dentro del rango** (supuestos explícitos, se dicen al cliente):
- Si la diseñadora entrega mockups, la partida 5 va al mínimo.
- Número final de campos de la ficha de vino (lista cerrada = mínimo).
- Si la importación CSV se pospone a fase 2, la partida 3 baja ~200 €.

La propuesta se presenta con el rango; **la cifra se cierra en el contrato**, cuando
esos tres supuestos estén resueltos.

### 2bis. Qué activa el mínimo y el máximo de CADA partida (justificación interna)

Un rango sin drivers nombrados es colchón arbitrario y se nota al defenderlo. Cada
partida tiene los suyos; si al cerrar contrato todos caen en mínimo, la cifra ES el
mínimo — eso es lo que hace la horquilla honesta y defendible.

| Partida | Va al MÍNIMO si… | Va al MÁXIMO si… |
|---------|------------------|------------------|
| **1. Base (1.100-1.400)** | Las PDA reales llevan navegador moderno y homogéneo; offline = cachear la carta en texto | Varios modelos de PDA distintos que probar/ajustar; offline con imágenes y actualización automática de la cache |
| **2. Camarero (1.000-1.300)** | Lista de campos de ficha cerrada; búsqueda por nombre/bodega; recomendación solo por uva+tipo (criterio ya definido) | Campos que crecen sobre la marcha; búsqueda con filtros (tipo, uva, D.O.); recomendaciones con ajustes finos o explicación del porqué |
| **3. Admin (800-1.100)** | Sin import CSV en v1 (−200) o con los datos de catálogo en formato limpio y estable | Hay que limpiar/mapear formatos de Excel variados; asignación con extras (duplicar carta entre restaurantes, etc.) |
| **4. Inventario (250-350)** | PDF = listado simple | PDF maquetado con logo/formato + filtros (por tipo, bodega, restaurante) |
| **5. Diseño (400-600)** | La diseñadora entrega mockups y Edu solo implementa | Sin mockups: Edu diseña las pantallas además de construirlas |
| **6. Puesta en marcha (350-450)** | Las 19 fichas llegan con datos completos y estructurados (uva, notas de cata); pruebas en 1 restaurante piloto | Hay que completar/redactar notas de cata o estructurar datos sueltos; pruebas en varios modelos de PDA o varias visitas |

✅ **Driver de precios — RESUELTO por Edu (16-jul): la app NO lleva precios.** El
cliente es distribuidor: sus tarifas son precio de compra B2B (confidencial) y cada
restaurante vende al precio que quiere. La app es herramienta de formación del
camarero (sustituye cursos de sumiller), no carta comercial. Si algún día los
restaurantes quieren su carta con precios y vinos propios, es fase futura a
presupuestar aparte. Consecuencias aplicadas: campo precio eliminado de ficha,
entregable, demo (contrato/spec/plan) y de estos drivers. En la ficha el dato
destacado pasa a ser la UVA (de la que vive la recomendación).

**Por qué esta tabla NO va en el entregable:** el documento del cliente enseña solo
los 3 drivers globales (mockups, campos, CSV) — los que ellos controlan. Poner los
12 drivers en el papel invita a negociar partida a partida ("pues el offline sin
imágenes, y el PDF simple, y…") y convierte el presupuesto en un menú. La tabla es
munición verbal: si preguntan por una partida concreta, Edu responde con sus drivers
de memoria y queda como lo que es — alguien que sabe exactamente qué está cobrando.
Si piden algo al mínimo en la reunión, la respuesta es: *"perfecto, lo anoto como
supuesto y va reflejado en la cifra del contrato"* — nunca recalcular en la mesa.

---

## 3. Opción B — soporte reparado (corrige el error detectado por Edu)

Historial: HORQUILLA.md ponía el soporte a 300-600 € por ~26 h (2 h/semana × 13
semanas) = **11,5 – 23 €/h, por debajo de la tarifa del propio proyecto** (regalado).
El intento de Sonnet de arreglarlo (450-600 € por 9 h = 50-67 €/h) se pasaba de frenada
por el otro lado sin justificarlo. La solución no es tocar solo el precio, sino **acotar
el compromiso de horas y ponerle tarifa coherente**:

| Concepto | Valor |
|----------|-------|
| Compromiso | **Hasta 4 h/mes de cambios menores, 3 meses desde la entrega** (12 h máximo, no acumulables) |
| Precio | **450 € (150 €/mes)** |
| Tarifa implícita | 450 / 12 = **37,5 €/h** ✓ (verificado) |

**Por qué 37,5 €/h es correcto siendo el proyecto ~28-30 €/h implícitos:** las
intervenciones sueltas se cobran MÁS caras que el proyecto, no más baratas — cada una
arranca con coste de contexto (recordar el código, desplegar, probar). Es la norma del
sector: tarifa de mantenimiento > tarifa de proyecto. Esto le da a Edu una respuesta
si el cuñado compara: *"la hora suelta siempre es más cara que la hora dentro de un
proyecto; por eso os conviene la Opción B frente a pedirme cambios a demanda"*.

La definición de "cambio menor" / "no menor" de HORQUILLA.md se mantiene tal cual y va
al contrato.

| | Opción A | Opción B (recomendada) |
|---|---------|------------------------|
| MVP completo | 3.900 – 5.200 € | 3.900 – 5.200 € |
| Garantía 30 días (corrección de errores) | ✅ incluida | ✅ incluida |
| Cambios menores 3 meses (hasta 4 h/mes) | — | + 450 € |
| **Total** | **3.900 – 5.200 €** | **4.350 – 5.650 €** |

Verificación: 3.900+450 = 4.350 ✓ · 5.200+450 = 5.650 ✓

**Garantía ≠ soporte** (distinción que Edu debe saber explicar): la garantía de 30 días
cubre *errores* (algo que debía funcionar y no funciona) y va incluida en ambas opciones
sin coste. El soporte de B cubre *cambios* (algo que funciona pero lo quieren distinto).
Confundirlos es el error clásico; separarlos protege a las dos partes.

---

## 4. Modelo interno de horas (NO se enseña al cliente)

Esfuerzo de mercado para este alcance hecho por un desarrollador solo, sin IA:
**130 – 170 h** (PWA multi-tenant + offline + admin + informes + carga + pruebas).

| Referencia | Cálculo | Tarifa implícita |
|-----------|---------|------------------|
| Suelo A (3.900 €) sobre 170 h | 3.900/170 | ≈ 23 €/h |
| Medio (4.500 €) sobre 150 h | 4.500/150 | 30 €/h |
| Techo A (5.200 €) sobre 130 h | 5.200/130 | 40 €/h |

(Verificado: 3.900/170 = 22,9 · 4.500/150 = 30,0 · 5.200/130 = 40,0)

Es tarifa de freelance junior-media en España (mercado: junior 20-30, media 30-45,
senior 50-80 €/h). **Una agencia presupuestaría este mismo alcance en 8.000-15.000 €;
un freelance con cartera, en 6.000-9.000 €.** Esa comparación sí se puede decir en voz
alta: es la mejor defensa del precio y además es verdad.

Las horas reales de Edu con IA serán menos: esa diferencia es su margen (criterio
cerrado, no se revela ni se usa como descuento).

---

## 5. Condiciones (van en la propuesta escrita)

- **Pago:** 30 % a la firma, 70 % contra entrega (ya cerrado).
- **IVA:** todos los precios son **sin IVA (21 % aparte)**. ⚠️ Decirlo SIEMPRE — es el
  error nº 1 del primerizo: dar una cifra, que el cliente la entienda "con todo", y
  comerse el 21 %.
- **IRPF:** al facturar a empresa con alta 036 nueva, la factura lleva retención del 7 %
  (lo ingresa el cliente a Hacienda por Edu). Detalles → gestoría (D.6), pero la
  propuesta no cambia por esto.
- **Hosting:** a nombre del cliente (Cloudflare + Supabase, 0-10 €/mes que pagan ellos
  directamente). Punto de confianza: *"el código y el hosting son vuestros desde el
  día uno; no dependéis de mí para que la app siga viva"*.
- **Plazo:** 4-6 semanas desde el OK a la propuesta + entrega de materiales (tarifas,
  fichas, logo definitivo). Nunca prometer menos aunque se pueda: el colchón absorbe
  imprevistos y sorprender entregando antes es mejor que disculparse por tardar.
- **Exclusiones:** la lista de HORQUILLA.md (stock con cantidades, autogestión de
  restaurantes, recomendador inverso, TPV/ERP, mockups de diseñadora…) va íntegra en
  la propuesta. Las exclusiones son las que evitan el "ya que estás…".

---

## 6. Suelo de negociación (decidir ANTES de la reunión — cola D.1)

- **Suelo Opción B: 4.350 €. Suelo Opción A: 3.900 €.** Por debajo de eso, no se baja
  el precio: **se quita alcance.**
- Palancas de recorte preparadas (en este orden): (1) importación CSV fuera de v1
  (−200 €, los vinos se cargan a mano desde el admin); (2) informe PDF fuera de v1
  (−300 €, el listado se ve en pantalla); (3) carga inicial la hace el cliente con el
  admin (−250 €).
- Regla de oro con familia: **nunca "te lo dejo en X"** (regalo invisible que se olvida);
  siempre *"puedo ajustar el precio quitando esto"* (intercambio visible que se recuerda).
- El descuento familiar YA está aplicado: 3.900-5.200 € contra 6.000-9.000 € de mercado
  freelance. Si preguntan por descuento, la respuesta es esa — no bajar más.

---

## 7. Guión de defensa — las preguntas que caerán y sus respuestas

**«¿Por qué cuesta 4.000 y pico?»**
> "Por lo que incluye: no es una web, son tres piezas — la app de los camareros, el panel
> desde el que vosotros gestionáis todas las cartas, y la puesta en marcha con vuestros
> vinos reales y pruebas en las PDA de un restaurante. Un desarrollo así en agencia son
> 8.000-15.000 €. Os paso el desglose por partidas para que veáis qué cuesta cada pieza."

**«¿Cuánto tardarás?»**
> "Cuatro a seis semanas desde que me deis el OK y los materiales."

**«¿Y si sale algo mal después de entregar?»**
> "Treinta días de garantía: cualquier error lo corrijo sin coste. Y con la Opción B
> tenéis además tres meses de cambios menores incluidos."

**«¿Qué pagamos cada mes?»**
> "A mí, nada (salvo la Opción B, 150 €/mes solo los 3 primeros meses). El hosting va a
> vuestro nombre y son 0-10 €/mes que pagáis directamente al proveedor. La app es vuestra."

**«Mi sobrino / una plantilla / ChatGPT lo hace gratis»**
> "Para una web de escaparate, sí. Esto es un sistema multi-restaurante donde cada uno ve
> solo su carta, funciona sin wifi en sala y vosotros lo gestionáis desde un panel. Y
> sobre todo: aquí hay alguien que responde — garantía, soporte y una cara a la que llamar."

**«¿Usas inteligencia artificial?» (la que teme Edu — respuesta honesta y cerrada)**
> "Claro, como todo el sector — igual que uso frameworks y herramientas modernas en vez
> de programar desde cero. Lo que me pagáis no son horas de teclear: es que la app haga
> lo que necesitáis, decidir bien qué construir y qué no, y responder yo si algo falla.
> El precio está por debajo de mercado precisamente porque trabajo eficiente."
>
> Reglas: (1) nunca mentir ni esquivar — huele a inseguridad; (2) nunca dar
> multiplicadores ("esto sin IA serían 4 meses"); (3) pivotar siempre de herramienta →
> responsabilidad. El fontanero no desglosa su taladro.

**«¿Por qué 30 % por adelantado?»**
> "Es el estándar del sector: compromete a las dos partes. Vosotros reserváis mi
> dedicación y yo empiezo a trabajar con el proyecto confirmado."

**«¿Nos lo dejas más barato?»**
> "El precio ya tiene el ajuste por ser vosotros — un freelance con cartera os pediría
> 6.000-9.000. Lo que sí puedo hacer es ajustar el alcance: si quitamos [palanca §6],
> baja a X." — y NUNCA bajar sin quitar.

**Regla anti-quedarse-en-blanco (la más importante):**
> Ante CUALQUIER pregunta cuya respuesta Edu no tenga clara:
> *"Buena pregunta — no os quiero contestar a ojo. Lo confirmo y os lo mando por escrito
> con la propuesta."*
> Es la respuesta más senior que existe. Los profesionales con 20 años de oficio la usan
> constantemente; el que improvisa cifras en caliente es el amateur. Con esta frase en el
> bolsillo, quedarse en blanco es literalmente imposible.

**Regla del silencio:** al decir la cifra, callarse. El primero que habla después del
precio, cede. No rellenar el silencio con "…pero se puede negociar, eh".

---

## 8. Qué falta para cerrar D.1

1. Edu ratifica (o ajusta) estas cifras: rango A 3.900-5.200, soporte B 450 €,
   suelos 3.900/4.350.
2. Con su OK: actualizar HORQUILLA.md, actualizar AGENTS.md (D.1 cerrada) y generar el
   presupuesto final (pendiente #8), con IVA explícito y las exclusiones.
3. La propuesta al cliente = rango + supuestos que lo mueven + demo. La cifra única se
   firma en contrato.

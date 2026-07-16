# DECISIONES — vinos-carta-app

> Registro de todas las decisiones de diseño cerradas para el proyecto.
> Cada decisión incluye contexto, opciones consideradas, resolución y tripwire
> de reapertura.
>
> **Principio rector (cliente, a-13-1):** *"No quiere volverse loco con
> features inútiles y sin valor. Quiere una app útil para los camareros y
> fácil de usar para los restaurantes. Todo lo demás llegará más adelante."*

---

## A. Arquitectura y plataforma

---

### A.1 Plataforma — PWA responsive vs nativa

**Contexto:** los camareros usan PDA (terminales portátiles) en sala. Los restaurantes tienen equipos heterogéneos. El cuñado no sabe marcas/modelos concretos.

**Fuente:** AGENTS.md (l.42, 68), AUDITORIA (B.2), INFORME_DESCUBRIMIENTO (§6)

**Decisión:** PWA responsive en vez de nativa.

**Alternativas descartadas:**
- Nativa (Android/iOS): se descarta porque requiere desarrollo por plataforma y no cubre la heterogeneidad de terminales.

**Tripwire de reapertura:** si las PDA no tienen navegador moderno (Chrome/WebView), se reabre y evalúa nativa/híbrida. Esto no es decisión nuestra: la app es PWA, si un restaurante tiene terminales incompatibles es problema del restaurante.

**Confirmado por:** Edu + Fable (B.2 - MANTENER) + cuñado

---

### A.2 Offline — modo de funcionamiento sin conexión

**Contexto:** el cuñado dijo que la app "no tiene por qué" funcionar offline (a-06-2), pero el escenario físico (camarero en sala/terraza/bodega atendiendo a un cliente) puede requerirlo.

**Fuente:** AGENTS.md (l.69), AUDITORIA (B.3 - CAMBIADO), INFORME_DESCUBRIMIENTO (§6, gap 6)

**Decisión:** Lectura offline de la carta cacheada (cache-first con service worker). La carta de un restaurante es un dataset pequeño y estático; el coste es bajo y no necesita sincronización compleja. Queda fuera de v1: cualquier offline de escritura.

**Alternativas descartadas:**
- Offline total descartado: era la decisión inicial, Fable la revocó porque un punto muerto de wifi en sala hace fallar la app en su momento de valor.

**Tripwire:** si el wifi real resulta ser universalmente bueno en todos los restaurantes, se puede simplificar. Pero se asume que el wifi irregular es problema del restaurante, no de la app. El service worker es plan B gratuito.

**Confirmado por:** Fable (B.3 - CAMBIADO), Edu, cuñado

---

### A.3 Arquitectura multi-tenant

**Contexto:** la empresa de vinos gestiona un catálogo maestro; cada restaurante cliente ve solo su propia carta, no el catálogo completo.

**Fuente:** AGENTS.md (l.72), INFORME_DESCUBRIMIENTO (§3, §13)

**Decisión:** Arquitectura multi-tenant desde el minuto uno.

**Alternativas descartadas:**
- Mono-tenant con filtro por restaurante: haría que cada restaurante viese datos de otros, rompiendo el requisito de aislamiento.
- Reescribir después sin multi-tenant sería prohibitivo.

**Tripwire:** ninguno (CIERRE — Fable veredicto). No se reabre.

**Confirmado por:** Edu + Fable (CIERRE)

---

### A.4 Integraciones con terceros

**Contextón:** el cuñado preguntó sobre integraciones con TPV, ERPs, etc.

**Fuente:** INFORME_DESCUBRIMIENTO (§6, a-08-2)

**Decisión:** Sin integraciones con terceros. "No, de momento no" (a-08-2).

**Tripwire:** si el cliente pide integrar con TPV en el futuro, requiere nuevo presupuesto y fase aparte. El MVP sin stock es viable sin esto.

**Confirmado por:** Cuñado (a-08-2)

---

## B. Producto y alcance (MVP)

---

### B.1 MVP — 4 funciones

**Contexto:** el cliente definió inicialmente 3 funciones; el informe de inventario (a-12-3) se añadió después como requisito nuevo.

**Fuente:** AGENTS.md (l.77-84), INFORME_DESCUBRIMIENTO (§5, §8)

**Decisión:** El MVP tiene 4 funciones:
1. Búsqueda de vinos en la carta del restaurante
2. Ficha detallada de cada vino (uva, bodega, notas de cata)
3. Recomendaciones por uva parecida
4. Informe de inventario (listado de la carta, sin cantidades)

**Alternativas descartadas:**
- MVP de 3 funciones sin inventario: era el planteamiento original, pero el cliente lo pidió y se incluyó al confirmar que es "sin stock" (coste bajo).
- Inventario con cantidades: se descarta para v1 porque obligaría a mantener stock al día (contradice "sin mantenimiento") o integrar con TPV (contradice a-08-2).

**Tripwire:** si el cliente pide stock con cantidades en el futuro, es fase 2 con nuevo presupuesto — requeriría sí o sí un flujo de carga manual o integración TPV.

**Confirmado por:** Cuñado (respuesta a Pregunta A) + Edu + Fable (H2)

---

### B.2 Informe de inventario — definición de la función #4

**Contexto:** el cliente pidió "informe de inventario" (a-12-3) sin especificar formato ni alcance.

**Fuente:** AGENTS.md (l.46, 80-84), INFORME_DESCUBRIMIENTO (§8)

**Decisión:** El informe de inventario es el listado de la carta del restaurante — sin cantidades, sin stock. Pendiente de definir el formato exacto: ¿pantalla dentro de la app, PDF exportable, o ambos?

**Alternativas descartadas:**
- Inventario con cantidades y control de stock: se descarta para v1 (ver B.1).

**Tripwire:** ninguno para v1. Si en fase 2 se quiere stock con cantidades, requiere análisis de viabilidad (la integración TPV fue descartada por el cliente).

**Decisión de formato:** Pantalla dentro de la app + botón de exportación a PDF (Opción B). El coste marginal del PDF es bajo y añade el caso de uso real de imprimir el listado para bodega o inventario físico.

**Alternativas descartadas:**
- Solo pantalla sin exportar: se descarta porque limita al camarero a consultar en la PDA sin poder llevar el listado a otro sitio.
- Filtros y agrupaciones: se descarta como sobreingeniería preventiva para el volumen actual.

**Confirmado por:** Cuñado (Pregunta A) + Edu

---

### B.3 Recomendaciones — criterio de parecido entre vinos

**Contexto:** el MVP incluye "recomendaciones de uvas parecidas" (a-05-1). La calidad de la recomendación depende del criterio de parecido. Se realizó una investigación específica sobre criterios profesionales de sumilleres (fuentes: Wikipedia - Classification of wine, Wine and food pairing, Wine tasting descriptors, Sweetness of wine; estándar OIV; apps Vivino, Delectable, Wine-Searcher).

**Fuente:** AGENTS.md (l.83), INFORME_DESCUBRIMIENTO (§5, §13), DISENO_REFERENCIAS.md, docs/SPECS/DECISIONES.md, investigación en `/home/edu/.hermes/cache/investigacion-vinos.md`

**Decisión:** Algoritmo de matching por atributos estructurados, sin ML, con 5 pasos en orden de prioridad:

1. **Tipo base** (blanco seco / blanco semidulce / tinto / generoso seco / generoso dulce / vermut) — filtro excluyente. Si el cliente pide un blanco seco, no se recomiendan tintos ni generosos dulces.
2. **Dulzor** (seco → semiseco → semidulce → dulce, según estándar OIV) — se permite ±1 nivel.
3. **Cuerpo** inferido por graduación: ligero (<11.5%), medio (11.5-13.5%), completo (>13.5%). Coincidencia por ±1 nivel o ±2% de alcohol.
4. **Variedad de uva** — bonus si coincide dentro del mismo perfil. No es filtro excluyente.
5. **Precio** — desempate final entre candidatos equivalentes.

**Resolución del problema Zalema:** en los datos reales del proyecto, la uva Zalema aparece en 5 vinos de perfiles radicalmente distintos (Niebla frizzante 10.5% vs Doceañero Oloroso 18%). El algoritmo resuelve esto agrupando primero por perfil (tipo + dulzor + cuerpo) y usando la uva como refinamiento, no como criterio principal. Si la uva coincide dentro del mismo perfil, se prioriza; si no, se ofrecen alternativas de perfil equivalente explicando "uva diferente, mismo estilo".

**Estructura de datos implementable** (del informe de investigación):

```javascript
{
  "baseType": "blanco" | "tinto" | "generoso" | "vermut",
  "sweetness": "seco" | "semiseco" | "semidulce" | "dulce",
  "body": 1 | 2 | 3,  // 1=ligero, 2=medio, 3=completo
  "alcohol": 10.5,
  "grapeVariety": "Zalema",
  "style": "joven" | "crianza" | "fino" | "oloroso" | "cream" | "px" | "naranja" | "vermut",
  "price": 6.10
}
```

**Alternativas descartadas:**
- Motor de recomendación con ML: sobreingeniería para el volumen actual (19 vinos documentados). La investigación confirma que un matching determinista es suficiente y profesionalmente correcto.
- Solo misma uva: insuficiente. La investigación demuestra que la uva es el 4º criterio en importancia, no el 1º.
- Uva + tipo (decisión previa): se actualiza tras la investigación. Con los datos de Bodegas Andrade, misma uva+mismo tipo aún daba falsos positivos (ej: Niebla "blanco" y Fino Palmarejo "blanco" son ambos tipo blanco pero radicalmente distintos en cuerpo y dulzor).

**Reglas de negocio adicionales** (del informe):
- Máximo 5 sugerencias (pantalla de PDA pequeña)
- Si no hay coincidencias en tipo base, mostrar "No hay alternativas exactas" + sugerir perfil más cercano
- Destacar coincidencias de uva con badge "Misma uva"
- Mostrar siempre precio

**Tripwire:** si el catálogo crece a 200+ vinos, se puede evaluar ML, pero no antes.

**Confirmado por:** Edu (15-jul-2026) + investigación externa

---

### B.4 Motor de recomendación inverso (fase 2)

**Contexto:** el cliente mencionó que la empresa de vinos pueda ofrecer al restaurante vinos que cubran huecos de sabor/tipo que no tiene en su carta (a-05-2). Es venta cruzada B2B.

**Fuente:** AGENTS.md (l.87-88), INFORME_DESCUBRIMIENTO (§5)

**Decisión:** Fuera de MVP. Se documenta como fase 2 y como exclusión explícita en la propuesta de precio.

**Alternativas descartadas:** incluirlo en v1: se descarta porque es bastante más complejo que el MVP (necesita analizar carta existente contra catálogo maestro) y no justifica el coste hasta que el MVP demuestre tracción.

**Tripwire:** cuando el cliente lo pida formalmente, se presupuesta como proyecto aparte.

**Confirmado por:** Cuñado (a-05-2) + Edu

---

### B.5 Datos de colección / histórico (fase 2)

**Contexto:** el cliente mencionó "datos de colección" como posible feature futuro (a-05-2).

**Fuente:** INFORME_DESCUBRIMIENTO (§5), AGENTS.md (l.87)

**Decisión:** Fuera de MVP. No se ha definido qué significa "colección". Se documenta como fase 2 y exclusión.

**Tripwire:** cuando el cliente lo defina y pida, se presupuesta.

**Confirmado por:** Cuñado + Edu

---

### B.6 Catálogo — origen de datos

**Contexto:** los datos de vinos viven hoy en "otro programa y su base de datos" (a-08-1), no especificado.

**Fuente:** AGENTS.md (l.41), INFORME_DESCUBRIMIENTO (§6, §12 gap 4), AUDITORIA (H3)

**Decisión:** Catálogo se crea de CERO dentro de la app. Sin migración desde sistemas existentes.

**Alternativas descartadas:**
- Migración desde el programa actual: inviable porque no se sabe qué programa es ni cómo exporta los datos.

**Tripwire:** si el cliente revela el programa actual y se puede exportar, se evalúa si compensa migrar vs. crear desde cero. Pero la decisión cerrada es que se crea de cero.

**Impacto en precio:** la carga inicial de fichas es coste explícito del proyecto (ver H3). Se mitiga con la importación CSV del mini-admin.

**Confirmado por:** Cuñado + Edu + Fable (H3)

---

## C. Gestión de contenido (admin)

---

### C.1 Mini-admin del catálogo maestro — alcance funcional

**Contexto:** la empresa de vinos gestiona el catálogo y asigna cartas a restaurantes. Necesita un panel para hacerlo.

**Fuente:** AGENTS.md (l.70-71), AUDITORIA (B.4, C.2), INFORME_DESCUBRIMIENTO (§6, a-08-3). Datos reales disponibles: 19 vinos documentados entre dos dosieres (8 Andrade con datos completos, 11 Sauci con nombre y precio).

**Decisión:** Panel medio (Opción C):
- CRUD (Crear, Leer, Actualizar, Eliminar — o ABM, Altas, Bajas, Modificaciones) de vinos: formulario para dar de alta y editar cada vino con sus campos (nombre, bodega, tipo, variedad de uva, graduación, precio, descripción, notas de cata).
- Asignación de vinos a restaurantes mediante buscador (autocomplete / campo de búsqueda donde escribes el nombre del vino y lo asignas).
- Importación desde archivo (CSV — un formato de tabla simple) para cargar muchos vinos de golpe, pensado para la carga inicial.
- Sin ABM completo de restaurantes.

**Alternativas descartadas:**
- Opción A (solo CRUD, sin asignación desde interfaz, sin CSV): se descarta porque la carga manual de fichas tiene un coste impredecible y la asignación requeriría a un técnico para cada cambio.
- Opción B (CRUD + asignación visual + ABM restaurantes): se descarta por ser más caro de lo necesario para el volumen actual de 19 vinos documentados.

**Tripwire de reapertura:** si el catálogo real supera los ~100 vinos o hay más de 10 restaurantes, valorar migrar a asignación visual (Opción B).

**Confirmado por:** Edu (15-jul-2026)

---

### C.2 Carga inicial de fichas de vino

**Contexto:** alguien tiene que teclear N fichas de vino con datos estructurados (variedad de uva incluida, de ahí vive el motor de recomendaciones).

**Fuente:** AGENTS.md (l.98), AUDITORIA (H3), DISENO_REFERENCIAS.md

**Decisión:** La carga inicial de fichas es coste explícito del proyecto, a dimensionar en la horquilla de precio. Incluye:
- Cargar los vinos de los dosieres disponibles (19 vinos entre Bodegas Andrade y Bodegas Sauci)
- Completar datos faltantes (ej. los vinos de Sauci no tienen variedad de uva en la tarifa actual)
- Usar la importación CSV del mini-admin (Decisión C.1) para acelerar el proceso

**Tripwire:** cuando se conozca el catálogo real del cliente, se ajusta el coste de carga.

**Confirmado por:** Edu + Fable (H3 corregido)

---

## D. Usuarios y acceso

---

### D.1 Perfil de usuarios dentro del restaurante

**Contexto:** la pregunta era si los camareros necesitan usuarios individuales con distintos permisos.

**Fuente:** INFORME_DESCUBRIMIENTO (§6, a-09-1), decisión de Edu en sesión 15-jul

**Decisión:** Sin distinción de usuarios dentro del restaurante. La app es un escaparate de información — no necesita saber quién es cada camarero. Login único para todo el restaurante.

**Alternativas descartadas:**
- Usuarios individuales por camarero: la información que muestra la app es la misma para todos. No hay datos personales ni acciones que requieran trazabilidad por usuario.

**Tripwire:** si en el futuro la app permite funciones por camarero (ej. comisiones, recomendaciones personalizadas, historial), se reabre. No antes.

**Confirmado por:** Edu (15-jul-2026)

---

### D.2 Login — acceso a la app

**Contexto:** la app no es pública (a-09-2) pero no se decidió el mecanismo de acceso.

**Fuente:** INFORME_DESCUBRIMIENTO (§6, a-09-2)

**Decisión:** La app requiere login. Pendiente de definir el mecanismo exacto: código de acceso por restaurante es la opción más simple y encaja con el modelo B2B (la empresa de vinos da de alta al restaurante y le asigna un código o credencial).

**Alternativas descartadas:**
- App pública sin login: descartado por a-09-2 ("no será público").
- Login con usuario/contraseña individual por camarero: contradictorio con D.1.

**Tripwire:** cuando se defina, se documenta aquí.

**Pendiente:** elegir mecanismo concreto (código compartido, usuario/contraseña única por restaurante, etc.)

**Confirmado por:** Cuñado (a-09-2)

---

### D.3 Baja de usuario (restaurante)

**Contexto:** qué pasa cuando un restaurante deja de usar la app.

**Fuente:** INFORME_DESCUBRIMIENTO (§6, a-09-3)

**Decisión:** Se elimina la cuenta del restaurante y su carta asociada. Sin proceso complejo de exportación — coherente con que no hay datos sensibles.

**Confirmado por:** Cuñado (a-09-3)

---

## E. Modelo de negocio y pricing

---

### E.1 Quién paga y quién decide

**Contexto:** el proyecto llega por el cuñado de Edu, pero hay que identificar al cliente real.

**Fuente:** AGENTS.md (l.40, 44), INFORME_DESCUBRIMIENTO (§12 gap 2)

**Decisión:** El cliente es la empresa de vinos. Interlocutores confirmados: cuñado de Edu + su socia. Quien decide en el cliente: ambos.

**Tripwire:** si la socia delega en otra persona, se actualiza.

**Confirmado por:** Cuñado + Edu + Fable

---

### E.2 Modelo de ingresos de la app

**Contexto:** la app no genera ingresos directos para la empresa de vinos. Es parte de un paquete de servicios que ya venden a los restaurantes.

**Fuente:** AGENTS.md (l.9-10), INFORME_DESCUBRIMIENTO (§4)

**Decisión:** La app es un servicio de valor añadido incluido en el paquete comercial de la empresa de vinos. No se presupuesta con expectativa de retorno directo por venta de la app.

**Confirmado por:** Cuñado (a-04-1) + Edu

---

### E.3 Mantenimiento vs cambios futuros

**Contexto:** el cliente quiere "sin mantenimiento" (a-11-1) pero admite que pedirá cambios más adelante (a-11-3). Es una contradicción documentada.

**Fuente:** AGENTS.md (l.56), INFORME_DESCUBRIMIENTO (§10)

**Decisión:** Pendiente de resolver. La propuesta debe dejar explícito el modelo:
- **Opción A (recomendada):** proyecto llave en mano con precio cerrado. Cambios futuros se facturan aparte (por hora o por presupuesto).
- **Opción B:** precio del proyecto + cuota mensual de soporte que incluye X cambios menores/mes.
- **Opción C:** X meses de cambios menores incluidos en el precio, luego facturación aparte.

**Tripwire:** no aplicar — la contradicción explotará en la primera petición de cambio si no se resuelve ahora.

**Pendiente:** Edu elige modelo antes de presentar la propuesta.

---

### E.4 Horquilla de precio, no cifra cerrada

**Contexto:** el cliente no dio rango de presupuesto (a-10-1: "a investigar"). Fable recomendó no dar cifra cerrada sino horquilla con supuestos.

**Fuente:** AGENTS.md (l.73-74, 94-98), AUDITORIA (B.1, H1)

**Decisión:** La oferta se presenta como horquilla de precio con supuestos explícitos y exclusiones documentadas. La cifra final la decide Edu. La ganancia de productividad por IA es margen de Edu, no descuento para el cliente.

**Exclusiones a documentar:**
- Stock/inventario con cantidades
- Autogestión por restaurantes
- Motor de recomendación inverso
- Datos de colección/histórico
- Integraciones con TPV
- Mockups de la diseñadora (los paga el cliente si los encarga)

**Confirmado por:** Edu + Fable (B.1 + H1)

---

### E.5 Plazo

**Contexto:** el cliente no dio plazo (b-plazo).

**Fuente:** INFORME_DESCUBRIMIENTO (§10)

**Decisión:** Sin plazo definido. Se acordará al presentar la horquilla.

**Confirmado por:** Cuñado

---

## F. Identidad visual y demo

---

### F.1 Paleta de colores

**Contexto:** el cuñado facilitó el logo de Bodegas Andrade. La identidad corporativa de la empresa de vinos es "muy genérica" según él.

**Fuente:** AGENTS.md (l.50-52), DISENO_REFERENCIAS.md

**Decisión:** Paleta extraída del logo:
- Fondo/crema: #f2ebe5
- Burgundy vino (color principal): #73232d
- Burgundy oscuro (hovers): #6e1428
- Texto oscuro: #232421
- Blanco: #ffffff

Pendiente de mockups de la diseñadora (los pedirá el cuñado si el presupuesto le cuadra). No se incluye el coste de esos mockups en el proyecto.

**Confirmado por:** Cuñado (logo facilitado)

---

### F.2 Datos para demo

**Contexto:** el cuñado no tiene portfolio que enseñar — la demo es el único material visual para presentar junto al presupuesto.

**Fuente:** AGENTS.md (l.123-126), DISENO_REFERENCIAS.md

**Decisión:** La demo se puebla con datos reales de los dosieres facilitados:
- **Bodegas Andrade (8 vinos):** Niebla, Señorío de Andrade, Castillo de Andrade, Fino Palmarejo, Doceañero Cream, Doceañero Oloroso, Naranja Andrade, Pedro Ximénez 1985. Todos con variedad de uva, tipo, graduación y notas de cata.
- **Bodegas Sauci (11 productos):** Blanco Seco, Blanco Semidulce, Tinto Crianza, Fino Espinapura, Fino Cruzado, Oloroso Riodiel, Cream Sauci, Dulce Sauci, Palo Cortado Sauci, Vino Naranja S' Naranja, Vermut S' Vermouth. Con nombre, formato y precio — FALTAN variedad de uva, tipo detallado y notas de cata (completar durante la carga inicial).

**Confirmado por:** Cuñado (dosieres facilitados) + Edu

---

### F.3 Demo para la propuesta — formato y alcance

**Contexto:** hay que entregar algo visual con la propuesta de presupuesto porque el cuñado no tiene portfolio que enseñar a su socia.

**Fuente:** Decisión de Edu (15-jul-2026)

**Decisión:** La demo es un prototipo funcional de una sola pantalla: la ficha detallada de un vino con datos reales, paleta de colores aplicada, y simulación de recomendación. Accesible desde móvil. No incluye la app completa ni el mini-admin.

**Alternativas descartadas:**
- Mockups estáticos (Opción A): se descartan porque no son interactivos y el cuñado necesita algo tangible al no tener portfolio.
- Demo funcional completa (Opción C): se descarta porque es casi hacer el producto antes del presupuesto aprobado — riesgo de regalar el trabajo o que el cliente negocie a la baja.

**Columnas futuras (cuerpo, dulzor):** se incluyen en el diseño de datos del entregable final, NO en la demo. No retrasan el desarrollo pero quedan contempladas en la arquitectura para evitar migraciones en fase 2.

**Tripwire:** si el cuñado pide ver más funcionalidad antes de decidir, se evalúa ampliar la demo con presupuesto adicional o como parte del proyecto si ya está aprobado.

**Confirmado por:** Edu (15-jul-2026)

---

## G. Decisiones sobre el entorno del cliente (no técnicas)

---

### G.1 Terminales (PDA) de los camareros

**Contexto:** los camareros usan PDA para tomar comandas. No sabemos marcas/modelos.

**Fuente:** AGENTS.md (l.42-43)

**Decisión:** La app es PWA. Asumimos navegador moderno (Chrome/WebView). Si un restaurante tiene terminales sin navegador compatible, es problema del restaurante (o futura ampliación). No condiciona el precio ni el alcance.

**Alternativas descartadas:**
- Pedir marca/modelo al cuñado y condicionar el presupuesto a la respuesta: se descarta porque la app se ofrece como servicio añadido en distribución — la empresa no puede controlar el hardware de cada restaurante.

**Confirmado por:** Edu (15-jul-2026)

---

### G.2 Conectividad wifi en los restaurantes

**Contexto:** la app necesita internet para cargar la carta. El cuñado dijo que "no tiene por qué" necesitar offline.

**Fuente:** INFORME_DESCUBRIMIENTO (§6, a-06-2), AUDITORIA (B.3)

**Decisión:** Asumimos que hay conexión wifi en sala. El offline cacheado (Decisión A.2) es plan B gratuito. Si un restaurante tiene mala cobertura, es problema de su infraestructura. No condiciona el precio ni el alcance.

**Alternativas descartadas:**
- Condicionar el presupuesto a la cobertura wifi real del restaurante: inviable porque la app se distribuye a N restaurantes distintos.

**Confirmado por:** Edu (15-jul-2026)

---

## H. Proceso y gobernanza

---

### H.1 Formato de presentación de la oferta

**Contexto:** el checklist de la entrevista (bloque 16) quedó sin marcar.

**Fuente:** INFORME_DESCUBRIMIENTO (§11, §12 gap 10), AUDITORIA (B.1)

**Decisión:** La primera oferta la hacemos nosotros (B.1). Se presenta como horquilla con supuestos, no cifra cerrada. Pendiente de definir:
- Fecha de presentación
- Formato (documento escrito, reunión presencial, email)
- Necesidad de factura / datos fiscales

**Confirmado por:** Fable (B.1)

---

### H.2 Control de versiones de la documentación

**Contexto:** no hay repo git. La documentación crítica (AGENTS.md, decisiones) no está versionada.

**Fuente:** AGENTS.md (l.141), recomendación del revisor (15-jul)

**Decisión:** Pendiente de decisión de Edu. Opciones:
- Iniciar repo git ahora para versionar documentación
- Mantener sin git hasta implementación (como indica AGENTS.md)

**Pendiente:** Edu decide.

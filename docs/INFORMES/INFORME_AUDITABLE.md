# INFORME AUDITABLE v2 — Proyecto vinos-carta-app

> **Propósito:** Documento de auditoría para que un profesional del sector (amigo de Edu) y su IA personal puedan revisar y validar las decisiones, presupuestos y viabilidad del proyecto.
> **Fecha:** 15 de julio de 2026 (v2: 16 de julio de 2026)
> **Auditor:** Amigo de Edu (sector) + su IA personal
> **Proyecto:** vinos-carta-app — Aplicación PWA de carta de vinos digital para camareros
> **Cliente:** Empresa de vinos (distribuidora B2B) → sus restaurantes clientes

## CHANGELOG v1 → v2

- Corrección #1: Cita legal actualizada de art. 3.1 a art. 1.1 (sección 5.2)
- Corrección #2: Añadida forma de pago / anticipo a las 3 opciones (sección 4.2)
- Corrección #3: Decisión D.2 cerrada — código de acceso único por restaurante
- Corrección #4: Riesgo R8 expandido con referencia SMI (sección 6)
- Corrección #5: Añadido riesgo R9 — relación familiar (sección 6)
- Corrección #6: Añadida pregunta sobre clientela extranjera / inglés (sección 7)
- Corrección #7: Añadida nota a B.2 sobre uso real del PDF de inventario
- Corrección #8: Añadido desglose de cuota mensual Opción C (sección 4.2)
- Corrección #9: Plazo E.5 actualizado con rango orientativo 4-8 semanas

---

## 1. RESUMEN EJECUTIVO

**vinos-carta-app** es una aplicación web progresiva (PWA) que digitaliza la carta de vinos de restaurantes, ofreciendo búsqueda, fichas detalladas, recomendaciones inteligentes por perfil de vino (sin ML) e informe de inventario exportable a PDF. El proyecto lo encarga una empresa distribuidora de vinos (contacto: cuñado de Edu + su socia) como servicio de valor añadido para sus restaurantes clientes. Es el **primer trabajo profesional de Edu**, que sustituye al proyecto anterior de Pepito (GapTecnologicoUtrera). Edu no es autónomo; emitirá factura con alta censal en el modelo 036 por actividad esporádica. La oferta se presenta como **3 opciones de presupuesto en horquilla** (2.650–5.900 €) con exclusiones documentadas, basadas en 25 decisiones de diseño cerradas tras un proceso de descubrimiento que incluyó entrevista con el cliente (cuñado), investigación de mercado y auditoría Fable. Este informe permite a un profesional externo auditar la solidez de la idea, el alcance y los números antes de presentar al cliente.

---

## 2. CONTEXTO

### 2.1 El cliente

| Dato | Valor |
|------|-------|
| **Quién es** | Empresa distribuidora de vinos (contacto: cuñado de Edu + su socia) |
| **Actividad** | Venta de vinos a restaurantes (B2B) |
| **Contacto directo** | Cuñado de Edu (interlocutor principal) + su socia |
| **Ubicación** | Provincia de Sevilla / Bajo Guadalquivir (no especificada exactamente) |
| **Productos** | Distribuyen vinos de Bodegas Andrade (Jerez) y Bodegas Sauci (uva Zalema, Sanlúcar) |
| **Documentación aportada** | Logo corporativo (Bodegas Andrade), dosier corporativo Andrade (29 páginas), tarifas 2026 Sauci |

### 2.2 Modelo de negocio

La empresa de vinos **ya vende un paquete de servicios** a sus restaurantes clientes. La carta digital es un servicio de valor añadido que incluyen en ese paquete comercial. **La app no genera ingresos directos** para la empresa de vinos — es un plus que ofrecen a sus restaurantes para fidelizarlos y diferenciarse.

**Flujo:**
```
Empresa de vinos (cliente de Edu)
    ↓ contrata desarrollo
vinos-carta-app (PWA multi-tenant)
    ↓ ofrece como servicio incluido
Restaurantes clientes (usuarios finales)
    ↓ usan en sala
Camareros con PDA (usuarios de la app)
```

### 2.3 Por qué se hace

1. **Necesidad real:** Los camareros no tienen acceso rápido a información detallada de los vinos (variedad de uva, notas de cata, maridaje) mientras atienden en sala. Las cartas en papel están desactualizadas, se pierden, y no permiten buscar por criterios.
2. **Diferenciación comercial:** La empresa de vinos quiere ofrecer algo que sus competidores no tienen.
3. **Sin alternativa existente:** La investigación de mercado confirmó que apps como Vivino o Delectable no cubren este nicho (carta de restaurante concreta para camareros no sumilleres).
4. **Proyecto sustituye a Pepito:** Edu venía de negociar con Supermercado Pepito (GapTecnologicoUtrera, presupuesto 250 € + IVA), que habría sido su primer trabajo. Este proyecto lo sustituye al ser de mayor entidad y mejor encaje profesional.

### 2.4 Principio rector (cliente)

> *"No quiere volverse loco con features inútiles y sin valor. Quiere una app útil para los camareros y fácil de usar para los restaurantes. Todo lo demás llegará más adelante."*

---

## 3. ANÁLISIS DE DECISIONES

A continuación se detallan todas las decisiones cerradas del proyecto. Cada una incluye: contexto, decisión tomada, justificación, alternativas descartadas, tripwire de reapertura y fuentes documentales.

---

### A. ARQUITECTURA Y PLATAFORMA

---

#### A.1 Plataforma: PWA responsive vs. nativa

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | Los camareros usan PDA (terminales portátiles) en sala. Los restaurantes tienen equipos heterogéneos. El cuñado no sabe marcas/modelos concretos. |
| **Decisión** | ✅ **PWA responsive** — App web progresiva accesible desde cualquier navegador moderno. Sin versión nativa. |
| **Justificación** | Una sola base de código sirve para todo tipo de terminales. No requiere pasar por tiendas de apps. Coste de desarrollo menor que nativa. |
| **Alternativas descartadas** | ❌ Nativa Android/iOS: requiere desarrollo por plataforma, no cubre heterogeneidad de terminales, coste mucho mayor. |
| **Pros** | Una sola base de código; despliegue instantáneo (sin tiendas); coste menor; accesible desde cualquier dispositivo con navegador |
| **Contras** | Depende del navegador de la PDA; sin acceso a APIs nativas del dispositivo (cámara, NFC, etc.) |
| **Tripwire** | Si las PDA no tienen navegador moderno (Chrome/WebView), se reabre y evalúa nativa/híbrida. Pero no es decisión nuestra: la app es PWA, si un restaurante tiene terminales incompatibles es problema suyo. |
| **Fuentes** | AGENTS.md (l.42, 68), AUDITORIA (B.2), INFORME_DESCUBRIMIENTO (§6) |
| **Confirmado por** | Edu + Fable (B.2 - MANTENER) + cuñado |

---

#### A.2 Offline: modo de funcionamiento sin conexión

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cuñado dijo que la app "no tiene por qué" funcionar offline (a-06-2), pero el escenario físico (camarero en sala/terraza/bodega atendiendo a un cliente) puede requerirlo. |
| **Decisión** | ✅ **Lectura offline cacheada** — Cache-first con service worker. La carta (dataset pequeño y estático) se ve sin conexión. Queda fuera de v1 cualquier offline de escritura. |
| **Justificación** | El coste de implementar cache-first es bajísimo (service worker estándar). La carta de un restaurante cabe en pocos KB. No necesita sincronización compleja. |
| **Alternativas descartadas** | ❌ Offline total: era la decisión inicial, Fable la revocó porque un punto muerto de wifi en sala hace fallar la app en su momento de valor. ❌ Sin offline: asumir wifi universal es irrealista. |
| **Pros** | Plan B gratuito; experiencia de usuario robusta; bajo coste de implementación |
| **Contras** | Solo lectura offline (cache-first), no escritura; si el wifi es malo de forma sistemática, puede ser insuficiente |
| **Tripwire** | Si el wifi real resulta ser universalmente bueno en todos los restaurantes, se puede simplificar. Pero se asume que wifi irregular es problema del restaurante, no de la app. |
| **Fuentes** | AGENTS.md (l.69), AUDITORIA (B.3 - CAMBIADO), INFORME_DESCUBRIMIENTO (§6, gap 6) |
| **Confirmado por** | Fable (B.3 - CAMBIADO), Edu, cuñado |

---

#### A.3 Arquitectura multi-tenant

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | La empresa de vinos gestiona un catálogo maestro; cada restaurante cliente ve solo su propia carta, no el catálogo completo. |
| **Decisión** | ✅ **Arquitectura multi-tenant desde el minuto uno.** |
| **Justificación** | Cada restaurante debe ver exclusivamente su carta. Si no se diseña así desde el inicio, reescribir después sería prohibitivo. |
| **Alternativas descartadas** | ❌ Mono-tenant con filtro por restaurante: haría que cada restaurante viese datos de otros, rompiendo el requisito de aislamiento. ❌ Reescribir después sin multi-tenant: prohibitivo. |
| **Pros** | Aislamiento correcto de datos; escalable a N restaurantes; arquitectura limpia |
| **Contras** | Mayor complejidad inicial que un monorepo simple |
| **Tripwire** | Ninguno (CIERRE — Fable veredicto). No se reabre. |
| **Fuentes** | AGENTS.md (l.72), INFORME_DESCUBRIMIENTO (§3, §13) |
| **Confirmado por** | Edu + Fable (CIERRE) |

---

#### A.4 Integraciones con terceros

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cuñado preguntó sobre integraciones con TPV, ERPs, etc. |
| **Decisión** | ✅ **Sin integraciones con terceros.** "No, de momento no" (a-08-2). |
| **Justificación** | El MVP es viable sin stock ni TPV. Añadir integraciones ahora es sobreingeniería y coste innecesario. |
| **Alternativas descartadas** | ❌ Integración con TPV: se descarta porque el cliente lo dijo explícitamente y añade complejidad (API propietaria, permisos, soporte). |
| **Pros** | Simplicidad; sin dependencias externas; sin riesgos de APIs de terceros |
| **Contras** | Si en el futuro se necesita TPV, toca desde cero con nuevo presupuesto |
| **Tripwire** | Si el cliente pide integrar con TPV en el futuro, requiere nuevo presupuesto y fase aparte. |
| **Fuentes** | INFORME_DESCUBRIMIENTO (§6, a-08-2) |
| **Confirmado por** | Cuñado (a-08-2) |

---

### B. PRODUCTO Y ALCANCE (MVP)

---

#### B.1 MVP: 4 funciones

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cliente definió inicialmente 3 funciones; el informe de inventario (a-12-3) se añadió después como requisito nuevo. |
| **Decisión** | ✅ **El MVP tiene 4 funciones:** 1) Búsqueda de vinos en la carta del restaurante, 2) Ficha detallada de cada vino (uva, bodega, notas de cata), 3) Recomendaciones por uva parecida, 4) Informe de inventario (listado de la carta, sin cantidades). |
| **Justificación** | Las 4 funciones cubren el caso de uso completo del camarero en sala: buscar, informarse, recomendar e inventariar. |
| **Alternativas descartadas** | ❌ MVP de 3 funciones sin inventario: era el planteamiento original, pero el cliente lo pidió y se incluyó al confirmar que es "sin stock" (coste bajo). ❌ Inventario con cantidades: obligaría a mantener stock al día o integrar con TPV, ambas cosas descartadas. |
| **Pros** | Alcance acotado y viable; coste predecible; cubre necesidades reales |
| **Contras** | Sin stock, el informe de inventario es solo el listado de la carta (útiles para bodega pero no para control de existencias) |
| **Tripwire** | Si el cliente pide stock con cantidades en el futuro, es fase 2 con nuevo presupuesto |
| **Fuentes** | AGENTS.md (l.77-84), INFORME_DESCUBRIMIENTO (§5, §8) |
| **Confirmado por** | Cuñado (respuesta a Pregunta A) + Edu + Fable (H2) |

---

#### B.2 Informe de inventario: definición de la función #4

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cliente pidió "informe de inventario" (a-12-3) sin especificar formato ni alcance. |
| **Decisión** | ✅ **Pantalla dentro de la app + botón de exportación a PDF.** Sin cantidades, sin stock, sin filtros ni agrupaciones. |
| **Justificación** | El coste marginal del PDF es bajo y añade el caso de uso real de imprimir el listado para bodega o inventario físico. |
| **Alternativas descartadas** | ❌ Solo pantalla sin exportar: limita al camarero a consultar en la PDA sin poder llevar el listado a otro sitio. ❌ Filtros y agrupaciones: sobreingeniería preventiva para el volumen actual (19 vinos). ❌ Inventario con cantidades: se descarta para v1. |
| **Pros** | Bajo coste; cubre el caso de uso; formato PDF portable |
| **Contras** | Sin filtros ni agrupaciones; sin control de existencias |
| **Tripwire** | Si en fase 2 se quiere stock con cantidades, requiere análisis de viabilidad |
| **Fuentes** | AGENTS.md (l.46, 80-84), INFORME_DESCUBRIMIENTO (§8) |
| **Confirmado por** | Cuñado (Pregunta A) + Edu |

> **Nota de auditoría (corrección #7):** `[PENDIENTE — confirmar con el cliente]` ¿Cómo se usa el PDF exportado en la práctica? (¿se imprime desde la PDA, se envía por email, se guarda?). Muchas PDA de sala no tienen impresora conectada; conviene validar el flujo real antes de darlo por cerrado.

|---

#### B.3 Recomendaciones: criterio de parecido entre vinos

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El MVP incluye "recomendaciones de uvas parecidas" (a-05-1). Se realizó una investigación específica sobre criterios profesionales de sumilleres (Wikipedia: Classification of wine, Wine and food pairing, Wine tasting descriptors, Sweetness of wine; estándar OIV; apps Vivino, Delectable, Wine-Searcher). |
| **Decisión** | ✅ **Algoritmo de matching determinista por atributos estructurados, SIN ML.** 5 criterios en orden: (1) Tipo base — filtro excluyente, (2) Dulzor ±1 nivel (estándar OIV), (3) Cuerpo inferido por graduación (±1 nivel o ±2% alcohol), (4) Variedad de uva — bonus, no filtro, (5) Precio — desempate. |
| **Justificación** | Un matching determinista es suficiente y profesionalmente correcto para el volumen actual (19 vinos documentados). La investigación confirma que los sumilleres usan estos mismos criterios en orden similar. La uva es el 4º criterio, no el 1º. |
| **Alternativas descartadas** | ❌ Motor de recomendación con ML: sobreingeniería para 19 vinos. ❌ Solo misma uva: insuficiente (el problema Zalema demuestra que misma uva = perfil muy diferente). ❌ Uva + tipo (decisión previa): actualizada tras investigación porque aún daba falsos positivos. |
| **Resolución problema Zalema** | La uva Zalema aparece en 5 vinos de perfiles radicalmente distintos (Niebla frizzante 10.5% vs. Doceañero Oloroso 18%). El algoritmo resuelve agrupando primero por perfil (tipo + dulzor + cuerpo) y usando uva como refinamiento. |
| **Reglas de negocio** | Máx. 5 sugerencias (pantalla PDA pequeña); si no hay coincidencias, mostrar mensaje y sugerir perfil más cercano; badge "Misma uva" cuando proceda; mostrar siempre precio. |
| **Pros** | Sin coste de ML; interpretable y auditable; profesionalmente correcto (basado en criterios de sumiller) |
| **Contras** | No aprende de datos; no mejora con el uso; requiere datos estructurados completos |
| **Tripwire** | Si el catálogo crece a 200+ vinos, evaluar ML, pero no antes. |
| **Fuentes** | Wikipedia (5 artículos), estándar OIV, apps Vivino/Delectable/Wine-Searcher, DISENO_REFERENCIAS.md, investigación `/home/edu/.hermes/cache/investigacion-vinos.md` |
| **Confirmado por** | Edu (15-jul-2026) + investigación externa |

---

#### B.4 Motor de recomendación inverso (fase 2)

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cliente mencionó que la empresa de vinos pueda ofrecer al restaurante vinos que cubran huecos de sabor/tipo (venta cruzada B2B). |
| **Decisión** | ✅ **Fuera de MVP.** Se documenta como fase 2 y exclusión explícita en la propuesta. |
| **Justificación** | Es considerablemente más complejo que el MVP (analizar carta existente contra catálogo maestro). No justifica el coste hasta que el MVP demuestre tracción. |
| **Pros** | Reduce riesgo y coste inicial; permite iterar |
| **Contras** | El cliente tendrá que esperar a fase 2 para esta funcionalidad |
| **Tripwire** | Cuando el cliente lo pida formalmente, se presupuesta como proyecto aparte. |
| **Fuentes** | AGENTS.md (l.87-88), INFORME_DESCUBRIMIENTO (§5) |
| **Confirmado por** | Cuñado (a-05-2) + Edu |

---

#### B.5 Datos de colección / histórico (fase 2)

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cliente mencionó "datos de colección" como posible feature futuro (a-05-2). |
| **Decisión** | ✅ **Fuera de MVP.** No se ha definido qué significa "colección". Se documenta como fase 2 y exclusión. |
| **Justificación** | Sin especificación del cliente, no se puede presupuestar ni implementar. |
| **Pros** | Evita comprometerse con un requisito difuso |
| **Contras** | El cliente puede pensar que "está incluido" si no se aclara |
| **Tripwire** | Cuando el cliente lo defina y pida, se presupuesta. |
| **Fuentes** | INFORME_DESCUBRIMIENTO (§5), AGENTS.md (l.87) |
| **Confirmado por** | Cuñado + Edu |

---

#### B.6 Catálogo: origen de datos

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | Los datos de vinos viven hoy en "otro programa y su base de datos" (a-08-1), no especificado. |
| **Decisión** | ✅ **Catálogo se crea de CERO dentro de la app.** Sin migración desde sistemas existentes. Se mitiga con importación CSV del mini-admin. |
| **Justificación** | Es inviable migrar desde un programa que no se sabe cuál es ni cómo exporta los datos. |
| **Alternativas descartadas** | ❌ Migración desde el programa actual: no se sabe qué programa es ni cómo exporta. |
| **Pros** | Control total sobre la estructura de datos; sin dependencias externas | 
| **Contras** | Coste explícito de carga inicial (19 vinos); el cliente puede pensar que es "automágico" |
| **Impacto en precio** | La carga inicial de fichas (19 vinos) se incluye como coste explícito en las 3 opciones de presupuesto (150–300 €). |
| **Fuentes** | AGENTS.md (l.41), INFORME_DESCUBRIMIENTO (§6, §12 gap 4), AUDITORIA (H3) |
| **Confirmado por** | Cuñado + Edu + Fable (H3) |

---

### C. GESTIÓN DE CONTENIDO (ADMIN)

---

#### C.1 Mini-admin del catálogo maestro: alcance funcional

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | La empresa de vinos gestiona el catálogo y asigna cartas a restaurantes. Necesita un panel para hacerlo. |
| **Decisión** | ✅ **Panel medio (Opción C):** CRUD de vinos (formulario con todos los campos), asignación de vinos a restaurantes mediante buscador (autocomplete), importación CSV para carga inicial. Sin ABM completo de restaurantes. |
| **Justificación** | Es el punto óptimo entre funcionalidad y coste. La asignación por buscador evita que cada cambio requiera a un técnico. El CSV permite cargar los 19 vinos de golpe. |
| **Alternativas descartadas** | ❌ Opción A (solo CRUD, sin asignación desde interfaz, sin CSV): coste impredecible de carga manual. ❌ Opción B (CRUD + asignación visual + ABM restaurantes): más caro de lo necesario para 19 vinos. |
| **Pros** | Suficiente para el volumen actual; escalable hasta ~100 vinos y ~10 restaurantes; importación CSV agiliza carga |
| **Contras** | Sin ABM completo de restaurantes; sin asignación visual (drag & drop) |
| **Tripwire** | Si el catálogo real supera ~100 vinos o hay más de 10 restaurantes, valorar migrar a asignación visual (Opción B). |
| **Fuentes** | AGENTS.md (l.70-71), AUDITORIA (B.4, C.2), INFORME_DESCUBRIMIENTO (§6, a-08-3) |
| **Confirmado por** | Edu (15-jul-2026) |

---

#### C.2 Carga inicial de fichas de vino

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | Alguien tiene que teclear N fichas de vino con datos estructurados. |
| **Decisión** | ✅ **La carga inicial es coste explícito del proyecto.** Incluye: cargar 19 vinos de los dosieres (Andrade 8 + Sauci 11), completar datos faltantes (Sauci no tiene variedad de uva en la tarifa actual), usando la importación CSV del mini-admin. |
| **Justificación** | Es mano de obra necesaria para que la app tenga datos reales. La alternativa (que lo haga el cliente) no es viable porque los datos no están estructurados como requiere el motor de recomendaciones. |
| **Pros** | Datos de calidad asegurada; estructura completa para el motor de recomendaciones |
| **Contras** | Coste adicional; el cliente puede pensar que debería estar incluido |
| **Tripwire** | Cuando se conozca el catálogo real del cliente, se ajusta el coste de carga. |
| **Fuentes** | AGENTS.md (l.98), AUDITORIA (H3), DISENO_REFERENCIAS.md |
| **Confirmado por** | Edu + Fable (H3 corregido) |

---

### D. USUARIOS Y ACCESO

---

#### D.1 Perfil de usuarios dentro del restaurante

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | La pregunta era si los camareros necesitan usuarios individuales con distintos permisos. |
| **Decisión** | ✅ **Sin distinción de usuarios dentro del restaurante.** Login único para todo el restaurante. |
| **Justificación** | La app es un escaparate de información — no necesita saber quién es cada camarero. No hay datos personales ni acciones que requieran trazabilidad. |
| **Alternativas descartadas** | ❌ Usuarios individuales por camarero: la información es la misma para todos; no hay acciones trazables que lo justifiquen. |
| **Pros** | Simplicidad máxima; cero fricción para los camareros; sin gestión de contraseñas |
| **Contras** | No permite personalización por camarero; no hay auditoría de quién usó la app |
| **Tripwire** | Si la app permite funciones por camarero (comisiones, recomendaciones personalizadas, historial), se reabre. |
| **Fuentes** | INFORME_DESCUBRIMIENTO (§6, a-09-1) |
| **Confirmado por** | Edu (15-jul-2026) |

---

#### D.2 Login: acceso a la app

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | La app no es pública (a-09-2). Se acordó usar un código de acceso único por restaurante. |
| **Decisión** | ✅ **Código de acceso único por restaurante**, generado y gestionado por la empresa de vinos desde el mini-admin. Sin contraseñas individuales por camarero (coherente con D.1). |
| **Justificación** | El cliente dijo que "no será pública" (a-09-2). El mecanismo más simple es un código compartido por restaurante, que encaja con el modelo B2B (la empresa de vinos da de alta al restaurante y le asigna una credencial). |
| **Alternativas descartadas** | ❌ App pública sin login: contradice a-09-2. ❌ Login con usuario/contraseña individual por camarero: contradictorio con D.1. |
| **Pros** | Seguridad básica; alineado con modelo B2B |
| **Contras** | Código compartido: sin trazabilidad individual. Riesgo bajo de que el cuñado quiera algo más complejo |
| **Tripwire** | Si la empresa necesita trazabilidad por camarero (comisiones, auditoría), se reabre con nuevo presupuesto |
| **Fuentes** | INFORME_DESCUBRIMIENTO (§6, a-09-2) |
| **Confirmado por** | Cuñado (a-09-2) + Edu (corrección #3) |

---

#### D.3 Baja de usuario (restaurante)

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | Qué pasa cuando un restaurante deja de usar la app. |
| **Decisión** | ✅ **Se elimina la cuenta del restaurante y su carta asociada.** Sin proceso complejo de exportación. |
| **Justificación** | No hay datos sensibles del restaurante que requieran exportación. La carta es un subconjunto del catálogo maestro que ya existe en la base de datos de la empresa. |
| **Fuentes** | INFORME_DESCUBRIMIENTO (§6, a-09-3) |
| **Confirmado por** | Cuñado (a-09-3) |

---

### E. MODELO DE NEGOCIO Y PRICING

---

#### E.1 Quién paga y quién decide

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El proyecto llega por el cuñado de Edu, pero hay que identificar al cliente real. |
| **Decisión** | ✅ **El cliente es la empresa de vinos.** Interlocutores: cuñado de Edu + su socia. Deciden ambos. |
| **Justificación** | Identificar al cliente real es crucial para saber a quién facturar, quién da el visto bueno y quién paga. |
| **Tripwire** | Si la socia delega en otra persona, se actualiza. |
| **Fuentes** | AGENTS.md (l.40, 44), INFORME_DESCUBRIMIENTO (§12 gap 2) |
| **Confirmado por** | Cuñado + Edu + Fable |

---

#### E.2 Modelo de ingresos de la app

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | La app no genera ingresos directos para la empresa de vinos. Es parte de un paquete de servicios que ya venden a los restaurantes. |
| **Decisión** | ✅ **La app es un servicio de valor añadido incluido en el paquete comercial.** No se presupuesta con expectativa de retorno directo. |
| **Implicación** | El criterio del cliente para aprobar el presupuesto no es "esto me va a generar X ingresos" sino "esto me ayuda a fidelizar/vender más a mis restaurantes". Es un argumento de retención y diferenciación, no de ROI directo. |
| **Fuentes** | AGENTS.md (l.9-10), INFORME_DESCUBRIMIENTO (§4) |
| **Confirmado por** | Cuñado (a-04-1) + Edu |

---

#### E.3 Mantenimiento vs. cambios futuros

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cliente quiere "sin mantenimiento" (a-11-1) pero admite que pedirá cambios más adelante (a-11-3). Es una contradicción documentada. |
| **Decisión** | ⏳ **PENDIENTE de resolver.** La propuesta debe dejar explícito el modelo. Tres opciones identificadas: |
| **Opción A (recomendada)** | Proyecto llave en mano con precio cerrado. Cambios futuros se facturan aparte (por hora o por presupuesto). |
| **Opción B** | Precio del proyecto + cuota mensual de soporte que incluye X cambios menores/mes. |
| **Opción C** | X meses de cambios menores incluidos en el precio, luego facturación aparte. |
| **⚠️ Riesgo** | Si no se resuelve esta contradicción AHORA, explotará en la primera petición de cambio post-entrega. El cliente dirá "pero si esto es mantenimiento" y Edu dirá "esto es un cambio nuevo". |
| **Fuentes** | AGENTS.md (l.56), INFORME_DESCUBRIMIENTO (§10) |
| **Pendiente** | Edu elige modelo antes de presentar la propuesta. |

---

#### E.4 Horquilla de precio, no cifra cerrada

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cliente no dio rango de presupuesto (a-10-1). Fable recomendó no dar cifra cerrada sino horquilla con supuestos. |
| **Decisión** | ✅ **La oferta se presenta como horquilla de precio con supuestos explícitos y exclusiones documentadas.** La cifra final la decide Edu. La ganancia de productividad por IA es margen de Edu, no descuento para el cliente. |
| **Justificación** | Una horquilla permite al cliente elegir nivel de servicio sin que Edu se tire un farol. Si Edu dice 4.000 € y el cliente esperaba 1.500 €, se acabó. Con 3 opciones el cliente negocia consigo mismo. |
| **Exclusiones documentadas** | Ver sección 4.3 de este informe. |
| **Fuentes** | AGENTS.md (l.73-74, 94-98), AUDITORIA (B.1, H1) |
| **Confirmado por** | Edu + Fable (B.1 + H1) |

---

#### E.5 Plazo

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cliente no dio plazo (b-plazo). Se decide comunicar un rango orientativo con margen para imprevistos. |
| **Decisión** | ✅ **Sin fecha de entrega cerrada, pero se comunica al cliente un rango orientativo: 4–8 semanas desde la aprobación de la propuesta y la recepción de todos los datos necesarios** (catálogo completo, accesos, confirmaciones pendientes). |
| **Estimación interna** | 4-6 semanas de trabajo con apoyo de IA. El rango comunicado al cliente (4-8 semanas) añade margen para imprevistos y esperas del cliente. |
| **Fuentes** | INFORME_DESCUBRIMIENTO (§10) |
| **Confirmado por** | Cuñado + Edu (corrección #9) |

---

### F. IDENTIDAD VISUAL Y DEMO

---

#### F.1 Paleta de colores

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cuñado facilitó el logo de Bodegas Andrade. La identidad corporativa es "muy genérica" según él. |
| **Decisión** | ✅ **Paleta extraída del logo:** Fondo/crema #f2ebe5, Burgundy vino #73232d (principal), Burgundy oscuro #6e1428 (hovers), Texto oscuro #232421, Blanco #ffffff. |
| **Pendiente** | Mockups de la diseñadora (los pedirá el cuñado si el presupuesto le cuadra). No se incluye el coste de esos mockups en el proyecto. |
| **Fuentes** | AGENTS.md (l.50-52), DISENO_REFERENCIAS.md |
| **Confirmado por** | Cuñado (logo facilitado) |

---

#### F.2 Datos para demo

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | El cuñado no tiene portfolio que enseñar — la demo es el único material visual. |
| **Decisión** | ✅ **La demo se puebla con datos reales de los dosieres:** Bodegas Andrade (8 vinos con datos completos) + Bodegas Sauci (11 productos con nombre y precio; faltan variedad de uva, tipo detallado y notas de cata — completar durante la carga inicial). |
| **Fuentes** | AGENTS.md (l.123-126), DISENO_REFERENCIAS.md |
| **Confirmado por** | Cuñado (dosieres facilitados) + Edu |

---

#### F.3 Demo para la propuesta: formato y alcance

| Aspecto | Detalle |
|---------|---------|
| **Contexto** | Hay que entregar algo visual con la propuesta de presupuesto porque el cuñado no tiene portfolio. |
| **Decisión** | ✅ **Demo = prototipo funcional de una sola pantalla:** ficha detallada de un vino con datos reales, paleta aplicada y simulación de recomendación. Accesible desde móvil. Sin app completa ni mini-admin. |
| **Alternativas descartadas** | ❌ Mockups estáticos: no son interactivos y el cuñado necesita algo tangible. ❌ Demo funcional completa: casi hacer el producto antes del presupuesto — riesgo de regalar el trabajo. |
| **Columnas futuras (cuerpo, dulzor)** | Se incluyen en el diseño de datos del entregable final, NO en la demo. Quedan contempladas en la arquitectura para evitar migraciones en fase 2. |
| **Tripwire** | Si el cuñado pide ver más funcionalidad antes de decidir, se evalúa ampliar la demo con presupuesto adicional. |
| **Fuentes** | Decisión de Edu (15-jul-2026) |
| **Confirmado por** | Edu (15-jul-2026) |

---

### G. DECISIONES SOBRE EL ENTORNO DEL CLIENTE (NO TÉCNICAS)

---

#### G.1 Terminales (PDA) de los camareros

| Aspecto | Detalle |
|---------|---------|
| **Decisión** | ✅ Asumimos navegador moderno (Chrome/WebView). Si un restaurante tiene terminales sin navegador compatible, es problema suyo. No condiciona el precio ni el alcance. |
| **Justificación** | La app se ofrece como servicio añadido en distribución — la empresa no puede controlar el hardware de cada restaurante. |
| **Alternativas descartadas** | ❌ Pedir marca/modelo al cuñado y condicionar el presupuesto: inviable porque la app se distribuye a N restaurantes distintos. |
| **Fuentes** | AGENTS.md (l.42-43) |
| **Confirmado por** | Edu (15-jul-2026) |

---

#### G.2 Conectividad wifi en los restaurantes

| Aspecto | Detalle |
|---------|---------|
| **Decisión** | ✅ Asumimos conexión wifi en sala. El offline cacheado (A.2) es plan B gratuito. No condiciona el precio ni el alcance. |
| **Alternativas descartadas** | ❌ Condicionar el presupuesto a la cobertura wifi real: inviable porque la app se distribuye a N restaurantes. |
| **Fuentes** | INFORME_DESCUBRIMIENTO (§6, a-06-2), AUDITORIA (B.3) |
| **Confirmado por** | Edu (15-jul-2026) |

---

### H. PROCESO Y GOBERNANZA

---

#### H.1 Formato de presentación de la oferta

| Aspecto | Detalle |
|---------|---------|
| **Decisión** | ✅ La primera oferta la hacemos nosotros. Se presenta como horquilla con supuestos, no cifra cerrada. Pendiente de definir: fecha de presentación, formato (documento/reunión/email), necesidad de factura/datos fiscales. |
| **Fuentes** | INFORME_DESCUBRIMIENTO (§11, §12 gap 10), AUDITORIA (B.1) |
| **Confirmado por** | Fable (B.1) |

---

#### H.2 Control de versiones de la documentación

| Aspecto | Detalle |
|---------|---------|
| **Decisión** | ⏳ **PENDIENTE.** Opciones: iniciar repo git ahora para versionar documentación, o mantener sin git hasta implementación. |
| **Fuentes** | AGENTS.md (l.141), recomendación del revisor (15-jul) |
| **Pendiente** | Edu decide. |

---

## 4. PRESUPUESTO

### 4.1 Alcance común (las 3 opciones)

Todas las opciones incluyen el mismo alcance funcional:

| Pieza | Descripción |
|-------|-------------|
| **PWA responsive** | App web progresiva para PDA / cualquier navegador moderno. Sin versión nativa. |
| **Lectura offline cacheada** | Service worker con cache-first. La carta se ve sin conexión. |
| **Arquitectura multi-tenant** | Catálogo maestro + cartas separadas por restaurante. |
| **Login único por restaurante** | Una credencial por restaurante, sin perfiles de camarero. |
| **Búsqueda de vinos (#1)** | Buscador en la carta del restaurante. |
| **Ficha detallada (#2)** | Datos del vino: nombre, bodega, tipo, variedad de uva, graduación, precio, notas de cata. |
| **Recomendaciones (#3)** | Algoritmo determinista por tipo + dulzor + cuerpo + uva + precio, sin ML. |
| **Informe inventario (#4)** | Listado de la carta + exportación a PDF. |
| **Mini-admin (panel empresa)** | CRUD de vinos + asignación por buscador + importación CSV. Sin ABM de restaurantes. |
| **Demo con datos reales** | Carga inicial de 19 vinos (8 Andrade + 11 Sauci). |

### 4.2 Las 3 opciones de presupuesto

---

#### Opción A — Proyecto llave en mano

> **Precio único por el MVP completo.** Cambios futuros se presupuestan y facturan aparte.

| Concepto | Rango |
|----------|-------|
| Desarrollo MVP completo (alcance común) | 3.000 – 5.000 € |
| Carga inicial de fichas (19 vinos) | 150 – 300 € |
| **Total Opción A** | **3.150 – 5.300 €** |
| **Forma de pago** | `[PENDIENTE — Edu debe decidir el % de anticipo]`. Práctica habitual para un primer proyecto sin autónomos dado de alta ni referencia previa de presupuesto del cliente: 30–50% al aceptar la propuesta / firmar el encargo, resto contra entrega. |

**Para el cliente:** Paga una vez y recibe la app funcionando. Si luego quiere cambios, se acuerda precio en ese momento.

**Para Edu:** Riesgo bajo de discusiones sobre qué es "mantenimiento". El cliente sabe que todo cambio futuro cuesta. Contrapartida: puede que el cliente sienta que no tiene red de seguridad post-entrega.

---

#### Opción B — Proyecto + 3 meses de cambios menores

> **Incluye el MVP completo + 3 meses de ajustes post-entrega** desde la fecha de entrega.

**¿Qué se considera "cambio menor"?** (definir en contrato):
- Ajustes de contenido en fichas de vino existentes
- Cambios de texto, colores o estilos menores
- Corrección de bugs o errores de maquetación
- Añadir/eliminar campos simples en fichas de vino
- Añadir algún vino nuevo (si el cliente lo provee)
- Hasta 2 revisiones por mes

| Concepto | Rango |
|----------|-------|
| Desarrollo MVP completo | 3.000 – 5.000 € |
| Carga inicial de fichas | 150 – 300 € |
| Soporte 3 meses post-entrega (~2h/semana) | 300 – 600 € |
| **Total Opción B** | **3.450 – 5.900 €** |
| **Forma de pago** | `[PENDIENTE — Edu debe decidir el % de anticipo]`. Práctica habitual para un primer proyecto sin autónomos dado de alta ni referencia previa de presupuesto del cliente: 30–50% al aceptar la propuesta / firmar el encargo, resto contra entrega. |

**Para el cliente:** Paga algo más pero tiene margen para retoques sin coste extra.

**Para Edu:** Recomendado para una primera colaboración — cubre los inevitables "uy, esto lo quería diferente" post-entrega. El sobrecoste es pequeño y la tranquilidad, grande.

---

#### Opción C — Proyecto + cuota mensual de soporte

> **Precio base más bajo por el MVP** + cuota mensual recurrente.

| Concepto | Rango |
|----------|-------|
| Desarrollo MVP completo | 2.500 – 4.000 € |
| Carga inicial de fichas | 150 – 300 € |
| **Pago único total** | **2.650 – 4.300 €** |
| **Cuota mensual** (soporte + hosting + cambios menores) | **25 – 50 €/mes** |
| **Forma de pago** | `[PENDIENTE — Edu debe decidir el % de anticipo]`. Práctica habitual para un primer proyecto sin autónomos dado de alta ni referencia previa de presupuesto del cliente: 30–50% al aceptar la propuesta / firmar el encargo, resto contra entrega. |

**Para el cliente:** Paga menos al inicio pero asume coste recurrente.

**Para Edu:** Genera ingresos pasivos pero te ata a soporte continuo — valorar con cuidado por ser el primer proyecto.

> **Desglose de la cuota mensual (25–50 €/mes) — corrección #8:** `[PENDIENTE — Edu debe confirmar coste real de hosting según proveedor elegido]`. La cuota debe cubrir hosting + tiempo de soporte de Edu; sin ese desglose no se puede garantizar que el precio sea sostenible. No ofrecer esta opción al cliente hasta tener esta cifra confirmada.

---

### 4.3 Exclusiones comunes (las 3 opciones)

Ninguna de las 3 opciones incluye:

| Exclusión | Motivo |
|-----------|--------|
| Stock / inventario con cantidades | Requiere integración TPV o carga manual contradictoria con "sin mantenimiento" |
| Autogestión por restaurantes | El cliente no lo pidió; añadiría complejidad de permisos y perfiles |
| ABM completo de restaurantes en el admin | No necesario para el volumen actual |
| Motor de recomendación inverso | Es fase 2 (decisión B.4) |
| Datos de colección / histórico | No definido por el cliente (decisión B.5) |
| Integraciones con TPV, ERPs o terceros | Descartado por el cliente (decisión A.4) |
| Mockups de diseñadora | Los paga el cliente por separado si los encarga |
| Identidad corporativa completa | El cliente dijo que es "muy genérica" |

### 4.4 Comparativa de mercado

Según la investigación de mercado (`research3-mercado-precios.md`), los rangos del proyecto están alineados con el mercado freelance:

| Referencia | Rango |
|------------|-------|
| Web corporativa freelance sencilla | 1.200 – 4.000 € |
| PWA / web-app instalable, MVP básico | 3.000 – 6.000 € |
| App móvil sencilla con backend + panel admin | 8.000 – 25.000 € |
| **vinos-carta-app (Opción A)** | **3.150 – 5.300 €** |
| **vinos-carta-app (Opción B)** | **3.450 – 5.900 €** |
| **vinos-carta-app (Opción C)** | **2.650 – 4.300 € + 25-50 €/mes** |

> **Nota:** Este proyecto es significativamente más complejo que una web corporativa (app multi-tenant con motor de recomendaciones, offline, mini-admin, 4 funciones). El rango es razonable para el alcance.

---

## 5. ASPECTO LEGAL

### 5.1 Situación de Edu

Edu **no es autónomo** (no está dado de alta en el RETA). Este es su primer trabajo profesional.

### 5.2 Mecanismo legal: Alta censal modelo 036

Para este proyecto, Edu puede emitir factura legalmente **sin ser autónomo** mediante el **alta censal en el modelo 036** por actividad esporádica (también llamado "alta en Hacienda sin alta en Seguridad Social").

**Base legal:** El artículo 1.1 de la Ley 20/2007 del Estatuto del Trabajo Autónomo define al trabajador autónomo como quien realiza la actividad económica **de forma habitual**, personal, directa, por cuenta propia y fuera del ámbito de organización de otra persona. Es la ausencia de ese requisito de habitualidad lo que excluye de la obligación de alta en el RETA para actividades esporádicas — criterio consolidado por jurisprudencia (STS de 29 de octubre de 2019, Sala Tercera, entre otras). Para un primer proyecto de duración limitada (4-6 semanas), esto aplica siempre que:
1. No sea la actividad principal de la que se obtengan ingresos recurrentes.
2. No se ejerza de forma habitual, personal y directa.
3. Se limite a proyectos concretos sin continuidad temporal.

**Proceso:**
1. **Modelo 036:** Presentar declaración censal de inicio de actividad (epígrafe IAE correspondiente a desarrollo de software, ej. 763 — Servicios de programación).
2. **Facturación:** Emitir factura con IVA 21% y retención IRPF 7%.
3. **IRPF:** El cliente retiene el 7% del IRPF y lo ingresa en Hacienda (modelo 111). Luego, en la declaración de la renta de Edu, esa retención se resta del impuesto a pagar.
4. **IVA:** Edu repercute IVA 21%, lo declara trimestralmente en el modelo 303, y lo ingresa en Hacienda (si no hay IVA soportado que restar).

**⚠️ Limitación:** Si Edu repite este esquema con varios clientes en un mismo año fiscal, Hacienda podría considerar que la actividad es habitual y exigir el alta en autónomos (RETA). Para el primer proyecto es seguro; para el segundo, consultar con gestor.

### 5.3 Comparativa con el precedente Pepito

El presupuesto de Pepito (GapTecnologicoUtrera, 250 € + IVA) usaba exactamente el mismo esquema legal:

> *"Facturación: se emite factura con alta censal (modelo 036, actividad esporádica), con IVA 21% y retención IRPF 7%, según la normativa vigente para profesionales que empiezan actividad. Tu gestoría la ingresa con el modelo 111 como cualquier otra."*

Ambos proyectos seguirán el mismo patrón legal. vinos-carta-app lo sustituye como primer trabajo profesional real.

### 5.4 Recomendación para la factura

Incluir en la propuesta (o en la factura) el siguiente texto o similar:

> *"Facturación con IVA 21% y retención IRPF 7% (actividad esporádica, modelo 036). Como profesional en inicio de actividad, no estoy dado de alta en autónomos para este proyecto concreto, de acuerdo con la normativa para actividades esporádicas no habituales."*

---

## 6. RIESGOS

Los 5 riesgos principales del proyecto, ordenados por criticidad:

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| **R1** | **Contradicción mantenimiento (E.3).** El cliente dice "sin mantenimiento" pero admite que pedirá cambios. Si no se resuelve ahora, la primera petición post-entrega generará conflicto sobre qué está incluido y qué no. | **Alta** (80%) | **Alto** | Edu debe elegir modelo (A/B/C) y documentarlo explícitamente en la propuesta antes de firmar. La Opción B (3 meses incluidos) es la más segura para un primer proyecto. |
| **R2** | **Catálogo real mucho mayor de lo esperado.** Los datos actuales son 19 vinos, pero el cliente podría tener 100+ vinos en su sistema real. Esto impactaría en el coste de carga inicial y en la usabilidad del mini-admin (diseñado para ~100 como máximo). | **Media** (50%) | **Medio** | Incluir en la propuesta una nota de dimensionamiento: "hasta X vinos incluidos en el precio; por encima se presupuesta aparte". El tripwire de C.1 ya cubre esto (~100 vinos). |
| **R3** | **Las PDA no soportan navegador moderno.** Si los terminales de los restaurantes son PDA antiguas con navegadores obsoletos o sistemas propietarios, la PWA no funcionará. | **Baja-Media** (30%) | **Alto** | La decisión G.1 ya asume que es problema del restaurante, no de la app. Pero si el cuñado no lo aclara a sus restaurantes, la culpa recaerá en Edu. Incluir en la propuesta: "Requiere navegador moderno (Chrome 80+ o equivalente)". |
| **R4** | **El cuñado espera un precio muy inferior.** Si el cliente tiene en mente 500-1.000 € (lo que costaría una web simple) y Edu presenta 3.000-5.000 €, el impacto puede ser un rechazo o una negociación a la baja que deje el proyecto en pérdida para Edu. | **Media** (40%) | **Alto** | La demo funcional (F.3) es clave: al ver una app interactiva, el cliente percibe el valor. La horquilla con 3 opciones también ayuda (el cliente negocia consigo mismo). No hay precio de referencia de cliente (a-10-1: "a investigar"). |
| **R5** | **Dependencia del cuñado como único interlocutor.** Si el cuñado se desentiende, la socia no está alineada, o hay cambios en la empresa, el proyecto puede quedarse sin aprobación o sin dirección clara. | **Media** (35%) | **Medio** | Asegurar que la socia también vea la demo y participe en la decisión. Tener ambos interlocutores alineados desde el principio (E.1). |
| **R9** | **Relación familiar con el interlocutor.** El contacto principal es el cuñado de Edu. Riesgo: mayor dificultad para poner límites firmes de alcance y facturar cambios "de favor"; en caso de fricción por precio o plazos, el impacto no es solo profesional sino también personal/familiar. | **Media** (40%) | **Medio** | **Mitigación:** encargo por escrito firmado por ambas partes (alcance, exclusiones, precio, forma de pago) exactamente igual que con un cliente no familiar — no relajar este punto por ser el cuñado. |

### Riesgos secundarios

| # | Riesgo | Nota |
|---|--------|------|
| R6 | **El cliente revela el programa actual y quiere migración.** La decisión B.6 dice "catálogo desde cero", pero esto puede cambiar si sale a la luz un programa exportable. El coste de migración puede ser significativo. |
| R7 | **Crecimiento a 200+ vinos hace el motor determinista insuficiente.** El tripwire de B.3 lo cubre, pero para entonces el sistema de recomendación tendría que rediseñarse. |
| R8 | **Problemas fiscales si Edu repite el esquema 036 con más clientes.** Riesgo bajo mientras la suma de ingresos por actividades esporádicas en el año natural no se acerque al Salario Mínimo Interprofesional (SMI) anual — referencia orientativa usada por los tribunales para valorar habitualidad, aproximadamente 15.000–17.000 €/año en 2026 (cifra que se revisa cada año, no confundir con límite legal exacto). El presupuesto de este proyecto (2.650–5.900 €) está muy por debajo de ese umbral como caso aislado. Si Edu factura a otros clientes bajo el mismo esquema en el mismo año y la suma se acerca a esa cifra, consultar con gestor **antes** de emitir la siguiente factura, no después. |

---

## 7. PREGUNTAS PARA EL AUDITOR

A continuación, preguntas específicas para que el amigo de Edu (profesional del sector) y su IA personal se centren en lo importante durante la auditoría:

---

### P1. ¿Los rangos de precio son realistas para el alcance descrito?

**Contexto:** El desarrollo completo (PWA + multi-tenant + offline + 4 funciones + mini-admin) está presupuestado entre 2.500 y 5.000 € para el MVP (según opción), más carga de datos. Como referencia: una web corporativa simple de freelance cuesta 800-2.000 € en el mercado. Esta app es significativamente más compleja (app multi-tenant con lógica de negocio, no una web informativa).

**Lo que pedimos al auditor:** Validar si la horquilla es adecuada, baja, o alta para una primera colaboración de un profesional novel. En concreto:
- ¿El desarrollo de una PWA multi-tenant con estas características está en el rango correcto?
- ¿El coste de carga de datos (150-300 € para 19 fichas) es razonable o debería incluirse en el desarrollo?
- ¿La Opción C con cuota mensual tiene sentido para un primer proyecto o es mejor evitarla?

---

### P2. ¿Es correcta la estrategia legal (alta 036 sin autónomos) para este proyecto?

**Contexto:** La facturación se realiza con alta censal en el modelo 036 (actividad esporádica), IVA 21% y retención IRPF 7%. Edu no está dado de alta en autónomos. El precedente Pepito (250 € + IVA) usaba el mismo esquema.

**Lo que pedimos al auditor:** 
- ¿Es segura esta vía para un proyecto de 3.000-5.000 € (no 250 €)?
- ¿Hay algún umbral cuantitativo (facturación anual, duración del proyecto) a partir del cual Hacienda puede exigir el alta en autónomos con carácter retroactivo?
- ¿Conviene que Edu consulte con un gestor antes de emitir la primera factura?

---

### P3. El alcance del MVP (4 funciones, sin integraciones, sin autogestión, sin stock): ¿es suficiente para que el proyecto sea útil o se queda corto?

**Contexto:** El principio rector del cliente es "no quiero volverme loco con features inútiles". Se ha primado la simplicidad: buscar vinos, ver ficha, recomendar e inventariar. Sin integración con TPV (decision A.4), sin stock (B.1), sin autogestión del restaurante (C.1), sin perfiles de camarero (D.1).

**Lo que pedimos al auditor:** 
- ¿Cubren estas 4 funciones el caso de uso mínimo del camarero en sala?
- ¿Hay alguna función obvia que se haya omitido y pueda hacer que el cliente (o los restaurantes) rechacen la app por incompleta?
- ¿Tiene sentido que el login único por restaurante (sin usuarios individuales) sea funcionalmente suficiente?

---

### P4. ¿El criterio de recomendación (determinista, 5 atributos, sin ML) es defendible profesionalmente frente a un cliente no técnico?

**Contexto:** Las recomendaciones usan un algoritmo determinista: tipo base (filtro) → dulzor (±1 nivel) → cuerpo (graduación ±2%) → uva (bonus) → precio (desempate). Se ha investigado y está basado en criterios profesionales de sumiller (Wikipedia, OIV). Sin embargo, el cliente puede pensar que "recomendaciones" implica ML o IA.

**Lo que pedimos al auditor:** 
- ¿Es aceptable profesionalmente este enfoque? ¿O debería Edu plantear algún componente de ML aunque sea mínimo para justificar la palabra "recomendación"?
- ¿Cómo explicar al cliente que el algoritmo es mejor que Vivino para su caso concreto (recomendaciones contextuales a la carta, no basadas en popularidad global)?
- ¿El problema Zalema (misma uva, perfiles radicalmente distintos) queda bien resuelto con el enfoque de agrupar por perfil primero?

---

### P5. ¿Qué habría que vigilar especialmente en la negociación con el cliente?

**Contexto:** El cuñado es el contacto directo, pero la socia también decide. El cliente pide "sin mantenimiento" pero admite cambios futuros. No ha dado precio de referencia. Edu es novel.

**Lo que pedimos al auditor:** 
- ¿Hay algún punto débil en la propuesta que el cliente pueda explotar para negociar a la baja?
- ¿Cómo manejar la contradicción "sin mantenimiento" vs. "cambios futuros" en la conversación?
- ¿Debe Edu presentar las 3 opciones juntas o solo una (la recomendada)?
- Cualquier consejo de un profesional con más experiencia que haya negociado proyectos similares.

---

### P6. ¿Es necesario contemplar clientela / idioma extranjero?

**Contexto:** La app está pensada para restaurantes españoles, pero no se ha confirmado si los restaurantes del cliente tienen clientela extranjera relevante que justifique una versión en inglés de la carta.

**Lo que pedimos al auditor:**
- ¿Debe Edu preguntar explícitamente al cliente si necesita inglés en v1?
- Si se necesita, ¿debería incluirse en el presupuesto actual o documentarse como exclusión para fase 2?
- Experiencia en proyectos similares: ¿el inglés en cartas de vino es un requisito frecuente o una excepción?

---

## A. ANEXO: Fuentes documentales

| Documento | Ruta | Contenido |
|-----------|------|-----------|
| DECISIONES.md | `docs/SPECS/DECISIONES.md` | Registro completo de 25 decisiones cerradas (523 líneas) |
| HORQUILLA.md | `docs/SPECS/HORQUILLA.md` | 3 opciones de presupuesto con rangos y exclusiones |
| DISENO_REFERENCIAS.md | `docs/DISENO_REFERENCIAS.md` | Paleta de colores, datos demo (19 vinos) |
| Investigación recomendaciones | `/home/edu/.hermes/cache/investigacion-vinos.md` | Criterios profesionales de sumiller, algoritmo propuesto (309 líneas) |
| Presupuesto Pepito | `.../GapTecnologicoUtrera/clientes/pepito/presupuesto.md` | Modelo legal de primer trabajo (modelo 036, IVA 21%, IRPF 7%) |
| Investigación mercado | `.../GapTecnologicoUtrera/research3-mercado-precios.md` | Precios de mercado freelance y agencias (106 líneas) |

---

*Documento generado el 15 de julio de 2026 para auditoría externa.*
*Cualquier discrepancia entre este informe y las fuentes originales prevalece lo documentado en las fuentes.*

# INFORME TÉCNICO-PROFESIONAL
## Proyecto vinos-carta-app — Justificación de arquitectura, decisiones y valor

> **Documento de acompañamiento a la propuesta de presupuesto.**
> Explica qué hay detrás de cada decisión de diseño, por qué se ha tomado,
> y cómo encaja en el contexto del cliente y del proyecto.
>
> **Cliente:** Empresa distribuidora de vinos (interlocutor del cliente + socia)
> **Desarrollador:** Edu — profesional del software
> **Fecha:** Julio 2026
> **Versión:** 1 — en elaboración

---

## ÍNDICE

1. [Introducción](#1-introduccion)
2. [Metodología: cómo se ha llegado a las 27 decisiones](#2-metodologia-como-se-ha-llegado-a-las-27-decisiones)
3. [Decisiones de arquitectura y plataforma](#3-decisiones-de-arquitectura-y-plataforma)
   - [A.1 PWA responsive vs nativa](#a1-pwa-responsive-vs-nativa)
   - [A.2 Offline — modo de funcionamiento sin conexión](#a2-offline--modo-de-funcionamiento-sin-conexion)
   - [A.3 Arquitectura multi-tenant](#a3-arquitectura-multi-tenant)
   - [A.4 Integraciones con terceros](#a4-integraciones-con-terceros)
4. [Decisiones de producto y alcance](#4-decisiones-de-producto-y-alcance)
   - [B.1 MVP — 4 funciones](#b1-mvp--4-funciones)
   - [B.2 Informe de inventario — función #4](#b2-informe-de-inventario--funcion-4)
   - [B.3 Recomendaciones — criterio de parecido entre vinos](#b3-recomendaciones--criterio-de-parecido-entre-vinos)
   - [B.4 Motor de recomendación inverso (fase 2)](#b4-motor-de-recomendacion-inverso-fase-2)
   - [B.5 Datos de colección / histórico (fase 2)](#b5-datos-de-coleccion--historico-fase-2)
   - [B.6 Catálogo — origen de datos](#b6-catalogo--origen-de-datos)
5. [Decisiones de gestión de contenido](#5-decisiones-de-gestion-de-contenido)
   - [C.1 Mini-admin del catálogo maestro](#c1-mini-admin-del-catalogo-maestro)
   - [C.2 Carga inicial de fichas de vino](#c2-carga-inicial-de-fichas-de-vino)
6. [Decisiones de usuarios y acceso](#6-decisiones-de-usuarios-y-acceso)
   - [D.1 Perfil de usuarios dentro del restaurante](#d1-perfil-de-usuarios-dentro-del-restaurante)
   - [D.2 Login — acceso a la app](#d2-login--acceso-a-la-app)
   - [D.3 Baja de usuario (restaurante)](#d3-baja-de-usuario-restaurante)
7. [Decisiones de modelo de negocio y pricing](#7-decisiones-de-modelo-de-negocio-y-pricing)
   - [E.1 Quién paga y quién decide](#e1-quien-paga-y-quien-decide)
   - [E.2 Modelo de ingresos de la app](#e2-modelo-de-ingresos-de-la-app)
   - [E.3 Mantenimiento vs cambios futuros](#e3-mantenimiento-vs-cambios-futuros)
   - [E.4 Horquilla de precio, no cifra cerrada](#e4-horquilla-de-precio-no-cifra-cerrada)
   - [E.5 Plazo](#e5-plazo)
8. [Decisiones de identidad visual y demo](#8-decisiones-de-identidad-visual-y-demo)
   - [F.1 Paleta de colores](#f1-paleta-de-colores)
   - [F.2 Datos para demo](#f2-datos-para-demo)
   - [F.3 Demo para la propuesta — formato y alcance](#f3-demo-para-la-propuesta--formato-y-alcance)
9. [Decisiones sobre el entorno del cliente](#9-decisiones-sobre-el-entorno-del-cliente)
   - [G.1 Terminales (PDA) de los camareros](#g1-terminales-pda-de-los-camareros)
   - [G.2 Conectividad wifi](#g2-conectividad-wifi)
10. [Proceso y gobernanza](#10-proceso-y-gobernanza)
    - [H.1 Formato de presentación de la oferta](#h1-formato-de-presentacion-de-la-oferta)
    - [H.2 Control de versiones de la documentación](#h2-control-de-versiones-de-la-documentacion)
11. [Anexo: fuentes documentales](#11-anexo-fuentes-documentales)

---

## 1. Introducción

### 1.1 Propósito del documento

Este informe recoge las 27 decisiones técnicas y de negocio que definen el proyecto. Cada una se justifica con datos concretos —entrevistas, tarifas, dosieres corporativos, legislación aplicable— y tiene un responsable asignado. Sirve como contrato técnico entre el desarrollador y el cliente, y como documentación viva para consultar durante el desarrollo y el mantenimiento.

### 1.2 Cómo leer este informe

La sección 2 describe el proceso de descubrimiento y metodología seguida. Las secciones 3 a 10 contienen las 27 decisiones documentadas, organizadas por categoría (arquitectura, producto, gestión de contenido, usuarios, modelo de negocio, identidad visual, entorno del cliente y gobernanza). La sección 11 recoge las fuentes documentales. Puede leerlo de principio a fin o saltar directamente a la categoría que le interese.

### 1.3 Estructura de cada decisión

Cada decisión sigue el mismo esquema: contexto del problema, opciones evaluadas, opción elegida con su justificación, impacto en el precio y tripwire —la condición que, de cumplirse, obligaría a reabrir la decisión. Este formato permite saber no solo qué se eligió, sino por qué y cuándo habría que cambiarlo.

---

## 2. Metodología: cómo se ha llegado a las 27 decisiones

El proyecto ha seguido un proceso estructurado de descubrimiento y diseño compuesto por:

### Fase 1 — Entrevista con el cliente (interlocutor del cliente)
- 12 preguntas sobre alcance, usuarios, terminales, offline, logística, competencia,
  integraciones, datos, mantenimiento y presupuesto
- Respuestas documentadas y codificadas (ej: `a-06-2` = respuesta 2 a pregunta 6)
- Identificación de contradicciones: «sin mantenimiento» pero «cambios más adelante»

### Fase 2 — Investigación de dominio
- Criterios profesionales de recomendación de vinos (estándar OIV, apps Vivino/Delectable)
- Precios de mercado para desarrollo freelance en España 2026
- Legislación aplicable (Ley 20/2007, jurisprudencia, BOE)
- Análisis de los dosieres y tarifas del cliente (19 vinos documentados)

### Fase 3 — Diseño de decisiones
- Cada decisión se presenta con: contexto, opciones, pros/contras, tripwire
- 27 decisiones en 8 categorías (arquitectura, producto, admin, usuarios, pricing,
  identidad visual, entorno, gobernanza)

### Fase 4 — Revisión y validación cruzada
- Verificación de fuentes legales contra BOE
- Validación de precios contra datos reales de mercado
- Corrección de inconsistencias entre decisiones
- 3 iteraciones de revisión hasta documento final

### Fase 5 — Documentación y cierre
- Las 27 decisiones documentadas con trazabilidad completa
- 3 opciones de presupuesto en horquilla
- Exclusiones documentadas
- Riesgos identificados y mitigados

---

## 3. Decisiones de arquitectura y plataforma

### A.1 PWA responsive vs nativa

**Decisión:** ✅ PWA responsive — una sola aplicación web que funciona en cualquier
dispositivo con navegador moderno. Sin versión nativa para Android ni iOS.

#### Por qué se ha elegido esta opción

| Criterio | PWA responsive | App nativa (alternativa descartada) |
|----------|----------------|--------------------------------------|
| **Cobertura de terminales** | Todos con navegador moderno | Solo un sistema operativo por versión |
| **Coste de desarrollo** | Una sola base de código | 2-3x (Android + iOS) |
| **Instalación** | Sin tienda, desde el navegador | Google Play / App Store |
| **Actualizaciones** | Instantáneas (al cargar la web) | Revisión en tienda (días) |
| **Funciona en PDA** | Sí (Chrome/WebView) | Depende del SO de la PDA |

#### Impacto en el precio

Elegir PWA en vez de apps nativas **reduce el coste entre un 40% y un 60%** para el
cliente. Si hubiera que hacer una app nativa (Android + iOS), el presupuesto mínimo
estaría más cerca de 8.000–12.000 € que de los rangos actuales. La PWA ofrece el
mismo resultado funcional a la mitad de coste.

---

### A.2 Offline — modo de funcionamiento sin conexión

**Decisión:** ✅ Lectura offline cacheada con service worker (cache-first).
La carta del restaurante se ve sin conexión. Queda fuera de v1 cualquier
escenario de escritura offline (modificar datos sin conexión).

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Lectura** | ✅ Cache-first: la carta se sirve desde caché aunque no haya red | ❌ Sin offline: si el wifi falla, la app no sirve |
| **Escritura** | ❌ Fuera de v1 (requiere sincronización bidireccional) | ❌ Offline total: coste 10x para beneficio marginal |
| **Complejidad** | Service worker estándar (Workbox), ~50 líneas de código | Sincronización offline (IndexedDB + conflictos) = ~500+ líneas |
| **Coste** | Prácticamente cero (incluido en el desarrollo) | Multiplica el coste del backend |

#### Impacto en el precio

El cache-first está **incluido en el precio sin coste adicional** porque es
parte del desarrollo estándar de la PWA. Si hubiera que implementar offline
total con escritura, el coste del backend se multiplicaría (sincronización,
resolución de conflictos, control de versiones). Se ha descartado
explícitamente porque para este caso de uso no aporta valor suficiente.

---

### A.3 Arquitectura multi-tenant

**Decisión:** ✅ Arquitectura multi-tenant desde el minuto uno. Un solo
catálogo maestro con aislamiento por restaurante. Cada restaurante ve
exclusivamente su carta.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Modelo de datos** | Un catálogo maestro + asignación por restaurante | ❌ Copia separada por restaurante: insostenible al crecer |
| **Aislamiento** | Garantizado por arquitectura (tenant_id en cada registro) | ❌ Filtro lógico sin aislamiento real: riesgo de fuga de datos |
| **Escalabilidad** | De 1 a N restaurantes sin cambiar la arquitectura | ❌ Reescribir después: prohibitivo |
| **Coste inicial** | Ligeramente mayor | ❌ Deuda técnica que se paga con intereses |

#### Impacto en el precio

El coste de hacer multi-tenant desde el inicio es mínimo (está incluido en el
desarrollo base). El coste de **no** hacerlo y tener que migrar después sería
equivalente a rehacer el 50% del backend. La decisión protege la inversión
del cliente a largo plazo sin coste adicional hoy.

---

### A.4 Integraciones con terceros

**Decisión:** ✅ Sin integraciones con terceros (TPV, ERPs, etc.) en v1.
«No, de momento no» — respuesta textual del cuñado (a-08-2).

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **TPV / datáfono** | ❌ No en v1 | ❌ Integrar ahora: añade complejidad, dependencias, coste de soporte |
| **ERP del restaurante** | ❌ No en v1 | ❌ Cada restaurante usa un ERP distinto: integrar con todos es inviable |
| **Exportación de datos** | Manual desde el mini-admin (PDF) | Automática: requeriría API de cada tercero |

#### Impacto en el precio

No incluir integraciones **reduce el coste entre un 20% y un 40%** respecto a
un proyecto que las incluyera. Si en el futuro se necesita integrar con un TPV
concreto (porque un restaurante importante lo exige), se presupuesta como
proyecto aparte. Pero no tiene sentido pagar hoy por una funcionalidad que el
cliente ha dicho que no necesita.

---

## 4. Decisiones de producto y alcance

### B.1 MVP — 4 funciones

**Decisión:** ✅ El MVP tiene 4 funciones que cubren el caso de uso completo
del camarero en sala y las necesidades administrativas de la empresa:

1. **Búsqueda de vinos** en la carta del restaurante
2. **Ficha detallada** de cada vino (uva, bodega, notas de cata, precio, graduación)
3. **Recomendaciones** por perfil de vino (criterio determinista, sin ML)
4. **Informe de inventario** exportable a PDF (desde el mini-admin, sin cantidades)

#### Por qué se ha elegido este alcance

| Función | Qué resuelve | Coste relativo |
|---------|-------------|----------------|
| **#1 Búsqueda** | El camarero encuentra cualquier vino en segundos, sin hojear una carta en papel | Bajo (frontend base) |
| **#2 Ficha detallada** | El camarero tiene la información del vino sin memorizar ni buscar en tablas | Medio (diseño + maquetación) |
| **#3 Recomendaciones** | El camarero puede sugerir alternativas con criterio aunque no sea sumiller | Medio (algoritmo + UI) |
| **#4 Informe inventario** | La empresa sabe qué vinos tiene cada restaurante sin llamarles | Bajo (PDF desde admin) |

#### Impacto en el precio

Las 4 funciones están incluidas en el desarrollo base de todas las opciones.
Si se elimina alguna, el precio baja muy poco (el coste está en la arquitectura,
no en las funciones individuales). Si se añade alguna (stock, integraciones),
el precio sube significativamente — por eso se documentan como exclusiones.

---

### B.2 Informe de inventario — función #4

**Decisión:** ✅ Informe exportable a PDF desde el mini-admin (lado empresa). El
camarero ve su carta desde la app (función #1 de búsqueda); el PDF es un reporte
administrativo que la empresa genera para consultar qué vinos tiene cada restaurante
en su carta. Sin cantidades, sin stock, sin filtros ni agrupaciones.

#### Contexto

El cliente pidió «informe de inventario» (a-12-3) sin especificar formato, ni
alcance, ni quién lo usa. La primera tentación es pensar en una pantalla dentro de
la app del camarero — pero el análisis del caso de uso real reveló que:

- El camarero ya **ve** su carta desde la app (búsqueda + fichas)
- La empresa de vinos necesita saber qué vinos tiene **cada restaurante** en su
  carta (visión consolidada, no detalle de sala)
- «Inventario» no implica control de existencias en este contexto

La investigación con el cliente (Pregunta A de la entrevista inicial) confirmó que no hay stock, ni
cantidades, ni necesidad de que el camarero genere informes. El PDF es una
herramienta administrativa para la empresa, no para la PDA.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Quién lo usa** | ✅ Empresa de vinos (mini-admin) | ❌ Camarero en PDA: el camarero ya ve la carta en la app |
| **Formato** | ✅ PDF exportable | ❌ Solo pantalla sin exportar: no se puede llevar el listado a bodega o adjuntar a un pedido |
| **Contenido** | ✅ Listado de la carta (sin cantidades) | ❌ Stock con cantidades: contradice «sin mantenimiento» (B.1) |
| **Complejidad** | ✅ Bajo coste (generación de PDF simple) | ❌ Filtros y agrupaciones: sobreingeniería para 19 vinos |
| **Frecuencia de uso** | Baja (bajo demanda, desde el admin) | — |

#### Impacto en el precio

El PDF desde el mini-admin está **incluido en el desarrollo base** sin coste
adicional significativo (es una librería estándar de generación de PDF, ~1 día
de trabajo). Si se hubiera optado por un sistema completo de inventario con
cantidades y control de existencias, el coste se habría multiplicado por 3-4x
y habría requerido mantenimiento continuo — contradiciendo el requisito del
cliente.

---

### B.3 Recomendaciones — criterio de parecido entre vinos

**Decisión:** ✅ Algoritmo de matching determinista por atributos estructurados,
sin Machine Learning (ML — aprendizaje automático). 5 criterios en orden de
prioridad. Máximo 5 sugerencias por consulta.

#### Contexto

El MVP incluye «recomendaciones de uvas parecidas» (a-05-1). La pregunta clave
es: **¿qué significa «parecido»?** Si el camarero pregunta «¿qué otro vino
recomiendas parecido a este?», el algoritmo debe responder con criterio.

Se realizó una **investigación específica** sobre criterios profesionales de
sumilleres (estándar OIV — Organización Internacional de la Viña y el Vino —,
artículos de Wikipedia, apps Vivino/Delectable/Wine-Searcher). La investigación
reveló que:

- La **uva** no es el criterio principal de parecido. Es el 4º en importancia.
- Los sumilleres agrupan primero por **tipo base** (blanco/tinto/generoso),
  luego **dulzor** (estándar OIV), luego **cuerpo** (inferido de la graduación).
- La uva es un refinamiento: «misma uva, mismo perfil» es la mejor recomendación;
  «uva diferente, mismo perfil» es aceptable; «misma uva, perfil diferente» es un
  falso positivo (ejemplo real del proyecto: la uva Zalema produce vinos tan
  distintos como un Niebla frizzante de 10.5% y un Doceañero Oloroso de 18%).

El algoritmo resultante es el fruto de esta investigación aplicada a los datos
reales del proyecto.

#### Por qué se ha elegido esta opción

El algoritmo de matching tiene 5 criterios evaluados en orden:

| Paso | Criterio | Qué hace |
|------|----------|----------|
| **1** | **Tipo base** | Filtro excluyente: blanco seco, blanco semidulce, tinto, generoso seco, generoso dulce, vermut. Si pides un tinto, no se recomiendan blancos. |
| **2** | **Dulzor** | ±1 nivel sobre el estándar OIV (seco → semiseco → semidulce → dulce) |
| **3** | **Cuerpo por graduación** | Ligero (<11.5%), medio (11.5-13.5%), completo (>13.5%). Coincidencia por ±1 nivel o ±2% de alcohol. |
| **4** | **Variedad de uva** | Bonus si coincide dentro del mismo perfil. No es filtro excluyente. Si coincide: badge «Misma uva». |
| **5** | **Precio** | Desempate entre candidatos equivalentes. |

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Complejidad** | Matching determinista: sin entrenar, sin datos históricos, sin servidor de inferencia | ❌ Motor de recomendación con ML: sobreingeniería para 19 vinos documentados |
| **Calidad** | Basado en criterios reales de sumilleres (OIV + investigación) | ❌ Solo misma uva: insuficiente (problema Zalema lo demuestra) |
| **Interpretabilidad** | Total: se puede explicar por qué se recomendó cada vino | ❌ ML: caja negra, difícil de auditar y mantener |
| **Coste** | Incluido en el desarrollo base | ❌ ML: coste de infraestructura (servidor, inferencia) |
| **Tripwire** | Si el catálogo crece a 200+ vinos, evaluar ML | — |

#### Impacto en el precio

El algoritmo de matching está **incluido en el desarrollo base** sin coste
adicional. Es código del lado del servidor que ejecuta 5 comparaciones en orden
— menos de 200 líneas de código. Si se hubiera optado por ML, el coste incluiría:
entrenamiento de modelo, servidor de inferencia, mantenimiento de datos de
entrenamiento, y un coste recurrente de infraestructura. Para el volumen actual,
multiplicaría el coste de esta función por 5-10x sin mejora perceptible en la
calidad de las recomendaciones.

---

### B.4 Motor de recomendación inverso (fase 2)

**Decisión:** ✅ Fuera de MVP. Se documenta como fase 2 y como exclusión
explícita en la propuesta de precio.

#### Contexto

El cliente mencionó que la empresa de vinos pueda ofrecer al restaurante vinos
que cubran huecos de sabor/tipo que no tiene en su carta (a-05-2). Es venta
cruzada B2B: la empresa analiza la carta del restaurante, detecta perfiles de
vino que faltan, y sugiere productos de su catálogo para cubrirlos.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Alcance v1** | ❌ Fase 2 | ❌ Incluirlo en v1: duplica la complejidad del proyecto |
| **Complejidad** | Alta (analizar carta existente contra catálogo maestro + generar sugerencias) | — |
| **Dependencia** | Requiere que el MVP funcione y tenga adopción real | — |
| **Coste** | Se presupuesta cuando el cliente lo pida formalmente | — |

#### Impacto en el precio

Excluirlo del MVP **reduce el coste del proyecto base entre un 20% y un 30%**.
Si se incluyera ahora, habría que diseñar e implementar el análisis de carta,
la lógica de detección de huecos, la interfaz de sugerencias en el admin, y
las notificaciones. Al dejarlo para fase 2, el cliente paga solo si la app
demuestra tracción.

---

### B.5 Datos de colección / histórico (fase 2)

**Decisión:** ✅ Fuera de MVP. No se ha definido qué significa «colección».
Se documenta como fase 2 y exclusión.

#### Contexto

El cliente mencionó «datos de colección» como posible funcionalidad futura
(a-05-2), sin especificar qué implica. Podría referirse a: historial de vinos
que ha tenido el restaurante, vinos agotados que ya no se sirven, colecciones
por añada, o cualquier otra interpretación.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Definición** | Pendiente de que el cliente la concrete | ❌ Implementar sobre una definición supuesta: riesgo de hacer algo que no sirve |
| **Prioridad** | Fase 2, después de validar el MVP | ❌ Incluirlo sin definir: añade complejidad sin valor claro |

#### Impacto en el precio

Excluirlo no afecta al precio del MVP porque nunca se presupuestó. Si el
cliente lo define y lo pide en el futuro, se presupuesta como proyecto aparte
sin relación con el coste actual.

---

### B.6 Catálogo — origen de datos

**Decisión:** ✅ Catálogo se crea de CERO dentro de la app. Sin migración
desde sistemas existentes.

#### Contexto

Los datos de vinos viven hoy en «otro programa y su base de datos» (a-08-1),
sin especificar qué programa es, cómo exporta los datos ni si tiene API. La
alternativa de migrar los datos existentes requeriría acceso a ese sistema,
ingeniería inversa del formato, y mapeo de campos — todo sobre un blanco móvil.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Origen** | ✅ Creación desde cero en la app | ❌ Migración: inviable porque no se conoce el sistema origen |
| **Riesgo** | Bajo: el cliente provee los datos en CSV o los introduce manualmente | ❌ Alto: depender de un sistema externo desconocido |
| **Coste** | Predecible (carga manual o CSV) | Impredecible (ingeniería inversa + mapeo + validación) |
| **Mitigación** | Importación CSV en el mini-admin (decisión C.1) | — |

#### Impacto en el precio

Crear el catálogo desde cero tiene un coste de carga inicial de fichas
dimensionado explícitamente (~150-300 € para 19 vinos). Si hubiera que
migrar desde un sistema desconocido, el coste sería impredecible pero
probablemente superior (ingeniería inversa + desarrollo de migración +
validación). La decisión protege al cliente de un sobrecoste por
investigación.

---

## 5. Decisiones de gestión de contenido

### C.1 Mini-admin del catálogo maestro

**Decisión:** ✅ Panel medio (Opción C): CRUD (Crear, Leer, Actualizar,
Eliminar) de vinos + asignación por buscador + importación CSV.
Sin ABM (Altas, Bajas, Modificaciones) completo de restaurantes.

#### Contexto

La empresa de vinos gestiona el catálogo y asigna cartas a restaurantes.
Necesita un panel administrativo para hacerlo. La pregunta clave es: ¿cuánta
funcionalidad admin necesita para operar con ~19 vinos y ~5 restaurantes?

La investigación con los datos reales (19 vinos documentados entre Bodegas
Andrade y Bodegas Sauci) muestra que el volumen es manejable con una interfaz
simple: un formulario para dar de alta/editar vinos, un buscador para
asignarlos a restaurantes, y una importación CSV para la carga inicial.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **CRUD de vinos** | ✅ Formulario completo (nombre, bodega, tipo, uva, graduación, precio, descripción, notas) | ❌ Sin CRUD (Opción A): obligaría a carga manual con coste impredecible |
| **Asignación a restaurantes** | ✅ Buscador con autocomplete | ❌ Asignación visual por drag & drop (Opción B): sobreingeniería para el volumen |
| **Importación CSV** | ✅ Para carga inicial de fichas | ❌ Sin CSV (Opción A): cada ficha habría que teclearla una a una |
| **ABM de restaurantes** | ❌ No incluido (se da de alta desde código o script) | ❌ ABM completo (Opción B): no justifica el coste para ~5 restaurantes |

#### Impacto en el precio

El mini-admin (Opción C) está **incluido en el desarrollo base**. La
importación CSV añade ~1 día de trabajo. Si se hubiera optado por la Opción B
(asignación visual + ABM restaurantes), el coste del admin se habría duplicado.
Si se hubiera optado por la Opción A (solo CRUD sin CSV), la carga inicial
habría sido más lenta y costosa, encareciendo el proyecto sin dar más valor
al cliente.

---

### C.2 Carga inicial de fichas de vino

**Decisión:** ✅ La carga inicial de fichas es coste explícito del proyecto.
Incluye 19 vinos documentados de los dosieres del cliente, completando los
datos faltantes mediante la importación CSV del mini-admin.

#### Contexto

Alguien tiene que introducir N fichas de vino con datos estructurados
(variedad de uva incluida, de ahí vive el motor de recomendaciones). El
cliente ha facilitado dos dosieres: Bodegas Andrade (8 vinos con datos
completos) y Bodegas Sauci (11 productos con nombre y precio, pero sin
variedad de uva ni notas de cata).

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Quién carga** | Edu (incluido en el proyecto) | ❌ El cliente: no tiene los datos estructurados ni sabe cómo introducirlos |
| **Formato** | CSV desde el mini-admin | ❌ Manual uno a uno: más lento y propenso a errores |
| **Alcance** | 19 vinos documentados | ❌ Catálogo completo del cliente: no se conoce su tamaño real |
| **Coste** | 150-300 € (dimensionado) | ❌ Gratis pero lento: alargaría el proyecto sin valor añadido |

#### Impacto en el precio

La carga inicial está presupuestada en 150-300 € para 19 vinos. Si el
catálogo real del cliente resulta ser mayor (ej. 50+ vinos), el coste
se ajusta proporcionalmente. Está incluida en las 3 opciones de horquilla
como partida separada, no enterrada en el desarrollo.

---

## 6. Decisiones de usuarios y acceso

### D.1 Perfil de usuarios dentro del restaurante

**Decisión:** ✅ Sin distinción de usuarios dentro del restaurante.
Login único para todo el restaurante. Sin perfiles individuales de camarero.

#### Contexto

La pregunta era si los camareros necesitan usuarios individuales con distintos
permisos. La app es un escaparate de información: muestra la carta del
restaurante. No hay datos personales, ni acciones por camarero, ni
trazabilidad individual necesaria.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Usuarios** | Uno por restaurante (compartido) | ❌ Usuarios individuales: complejidad sin beneficio |
| **Permisos** | Todos ven lo mismo | ❌ Roles (admin/visor): no hay acciones que restringir |
| **Trazabilidad** | No necesaria en v1 | ❌ Quién consultó qué: sin caso de uso definido |
| **Coste** | Mínimo (login básico) | ❌ Sistema de usuarios: backend + BD + gestión de contraseñas |

#### Impacto en el precio

Mantener un único login por restaurante **reduce el coste del backend de
autenticación**. La diferencia es pequeña en términos absolutos (~1-2 días),
pero evita complejidades operativas (gestión de contraseñas olvidadas, bajas
de camareros, etc.) que generarían coste de soporte recurrente.

---

### D.2 Login — acceso a la app

**Decisión:** ✅ Código de acceso único por restaurante, gestionado desde
el mini-admin por la empresa de vinos. Sin autoregistro público, sin
usuario/contraseña individual por camarero.

#### Contexto

La app no es pública (a-09-2): solo los restaurantes clientes de la empresa
de vinos deben poder acceder. El mecanismo de acceso debe ser simple, sin
coste de gestión recurrente, y coherente con «sin mantenimiento».

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Mecanismo** | Código alfanumérico por restaurante (tipo código de reserva) | ❌ Email + contraseña: requiere gestión de recuperación y verificación |
| **Quién gestiona** | Empresa de vinos (desde el mini-admin) | ❌ Registro público: la app no es pública |
| **Seguridad** | Baja-media (el código es secreto compartido) | ❌ 2FA/SSO: sobreingeniería para el perfil de uso |
| **Coste operativo** | Cero: el código se genera una vez | ❌ Soporte de recuperación de contraseña: coste recurrente |

#### Impacto en el precio

El login por código único está **incluido en el desarrollo base**.
Implementar autenticación por email+contraseña habría añadido ~2 días de
trabajo (registro, verificación, recuperación). No es un coste enorme, pero
es innecesario para el nivel de seguridad requerido y genera coste de soporte
futuro.

---

### D.3 Baja de usuario (restaurante)

**Decisión:** ✅ Cuando un restaurante deja el servicio, se elimina su cuenta
y su carta asociada. Sin proceso complejo de exportación.

#### Contexto

Qué pasa cuando un restaurante deja de usar la app. Dado que no hay datos
sensibles ni históricos que conservar, la baja es simple.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Proceso** | Eliminación directa desde el admin | ❌ Exportación de datos previa: sin caso de uso que lo justifique |
| **Datos** | Se eliminan con la cuenta | ❌ Archivado: requeriría infraestructura de almacenamiento |

#### Impacto en el precio

Incluido en el desarrollo base. Un proceso de baja complejo (exportación +
archivado + notificaciones) habría añadido ~1 día sin aportar valor real.

---

## 7. Decisiones de modelo de negocio y pricing

### E.1 Quién paga y quién decide

**Decisión:** ✅ El cliente es la empresa de vinos. Interlocutores
confirmados: cuñado de Edu + su socia. Ambos deciden.

#### Contexto

El proyecto llega por el cuñado de Edu, pero hay que identificar al cliente
real: ¿la empresa de vinos o el cuñado a título personal? La respuesta
determina quién firma, quién paga y quién tiene autoridad para aprobar
cambios.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Cliente** | Empresa de vinos (no el cuñado a título personal) | ❌ Cuñado como particular: cambiaría la estructura fiscal |
| **Interlocutores** | Cuñado + socia | ❌ Solo el cuñado: la socia también decide y debe estar alineada desde el principio |
| **Autoridad** | Ambos firman/aprueban | ❌ Uno solo: riesgo de que el otro bloquee después |

#### Impacto en el precio

Que el cliente sea una empresa y no un particular cambia la estructura fiscal
(factura con IVA, retención de IRPF, modelo 036). No afecta al importe, pero
sí a cómo se presenta y documenta.

---

### E.2 Modelo de ingresos de la app

**Decisión:** ✅ La app es un servicio de valor añadido incluido en el
paquete comercial de la empresa de vinos. No genera ingresos directos.

#### Contexto

La app no se vende como producto independiente. La empresa de vinos ya vende
un paquete de servicios a restaurantes; la carta digital es un plus que
ofrecen para fidelizar y diferenciarse.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Modelo** | Valor añadido al paquete existente | ❌ App como producto independiente: la empresa no vende software |
| **Expectativa** | El cliente no espera retorno directo de la app | ❌ ROI medible: la app no está diseñada para generar ingresos por sí misma |
| **Estrategia** | Fidelización y diferenciación frente a competidores | ❌ Fuente de ingresos: requeriría otro modelo de negocio |

#### Impacto en el precio

El modelo de negocio del cliente no afecta al precio del desarrollo, pero
sí a cómo se justifica: el presupuesto no compite con «lo que la app va a
generar», sino con «lo que cuesta tener un empleado haciendo formaciones
presenciales» (el coste que sustituye).

---

### E.3 Mantenimiento vs cambios futuros

**Decisión:** ✅ Opción B (recomendada): proyecto + 3 meses de cambios
menores incluidos. Pasado ese plazo, cualquier cambio va a presupuesto
aparte.

#### Contexto

El cliente quiere «sin mantenimiento» (a-11-1) pero admite que «seguro que
pediremos cambios más adelante» (a-11-3). Es una contradicción documentada
que hay que resolver en la propuesta.

#### Por qué se ha elegido esta opción

| Aspecto | Opción A (descartada) | ✅ Opción B (elegida) | Opción C (descartada) |
|---------|----------------------|----------------------|----------------------|
| **Modelo** | Llave en mano, sin recurrencia | Proyecto + 3 meses de cambios | Cuota mensual recurrente |
| **Pros** | Paga una vez, sin ataduras | Cubre retoques post-entrega sin renegociar | Precio inicial más bajo |
| **Contras** | Cambios a las 2 semanas = negociar desde cero | Sube el precio inicial (~300-600€ extra) | Ata a soporte continuo; exige RETA |
| **Riesgo** | Que el «sin mantenimiento» se convierta en trabajo gratis | Que el cliente pague por algo que no usa | Primer proyecto + RETA para 25-50€/mes no justifica |

#### Impacto en el precio

La Opción B añade ~300-600 € sobre el precio base del MVP. Si se hubiera
optado por la Opción A (sin cambios incluidos), el precio inicial sería
menor pero el riesgo de trabajo gratis post-entrega sería alto. Si se
hubiera optado por la Opción C (cuota mensual), el precio inicial bajaría
pero Edu asumiría coste fiscal (RETA — Régimen Especial de Trabajadores
Autónomos) para un ingreso mensual de 25-50 € que no lo justifica.

---

### E.4 Horquilla de precio, no cifra cerrada

**Decisión:** ✅ La oferta se presenta como horquilla de precio con
supuestos explícitos y exclusiones documentadas. La cifra final la
decide Edu. La ganancia de productividad del equipo se refleja en el margen del desarrollador, no como descuento en la oferta.

#### Contexto

El cliente no dio rango de presupuesto (a-10-1: «a investigar»). La
Fable (auditoría externa) recomendó no dar cifra cerrada sino horquilla
con supuestos, para evitar que el cliente compare contra un número único
sin entender lo que incluye.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Formato** | Horquilla (ej: 3.150 – 5.300 €) | ❌ Cifra cerrada: el cliente compararía sin entender el alcance |
| **Supuestos** | Documentados (alcance, tecnologías, exclusiones) | ❌ Sin supuestos: cualquier desviación sería renegociación |
| **Margen de eficiencia** | No se revela al cliente | ❌ Revelar multiplicadores: devalúa el trabajo profesional |

#### Impacto en el precio

Este es el marco de presentación, no una decisión que afecte al importe.
Pero determina cómo se percibe el precio: una horquilla bien explicada
se negocia; una cifra cerrada sin contexto se rechaza.

---

### E.5 Plazo

**Decisión:** ✅ Sin plazo definido. Se acordará al presentar la
horquilla. Rango orientativo: 4-8 semanas.

#### Contexto

El cliente no dio plazo (b-plazo). El plazo depende del alcance final
que elija (Opción A, B o C) y de la disponibilidad de Edu.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Plazo** | A acordar con el cliente | ❌ Fijarlo ahora: sin saber qué opción elige, el plazo sería un número al aire |
| **Rango** | 4-8 semanas orientativo | ❌ Plazo cerrado: cualquier imprevisto sería incumplimiento |

#### Impacto en el precio

El plazo no afecta al precio, pero sí a las expectativas. Un rango de 4-8
semanas da margen para imprevistos sin comprometer una fecha concreta.

---

## 8. Decisiones de identidad visual y demo

### F.1 Paleta de colores

**Decisión:** ✅ Paleta extraída del logo de Bodegas Andrade.
Pendiente de mockups de la diseñadora (los pedirá el cuñado si el
presupuesto le cuadra).

#### Contexto

El cuñado facilitó el logo de Bodegas Andrade. La identidad corporativa
de la empresa es «muy genérica» según sus propias palabras. En vez de
inventar una paleta, se extrajo del logo existente.

#### Por qué se ha elegido esta opción

| Color | Código | Uso |
|-------|--------|-----|
| Fondo / crema | #f2ebe5 | Fondos de pantalla, tarjetas |
| Burgundy vino | #73232d | Color principal (botones, header, acentos) |
| Burgundy oscuro | #6e1428 | Hovers, estados activos |
| Texto oscuro | #232421 | Texto principal |
| Blanco | #ffffff | Fondos de contraste |

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Origen** | Extraída del logo existente | ❌ Paleta inventada: riesgo de no gustar al cliente |
| **Mockups** | Los paga el cliente si los encarga a su diseñadora | ❌ Incluirlos en el proyecto: coste no presupuestado |

#### Impacto en el precio

La extracción de la paleta está incluida en el desarrollo base. Los mockups
de la diseñadora son coste aparte del cliente (no incluido en ninguna opción).

---

### F.2 Datos para demo

**Decisión:** ✅ La demo se puebla con datos reales de los dosieres
facilitados: 8 vinos de Bodegas Andrade y 11 de Bodegas Sauci.

#### Contexto

El cuñado ha facilitado dosier corporativo de Bodegas Andrade (29 páginas
con vinos, bodega, historia) y tarifa 2026 de Bodegas Sauci (11 productos
con nombre y precio). Son los únicos datos reales disponibles para la demo.

#### Por qué se ha elegido esta opción

| Fuente | Vinos | Datos disponibles | Datos faltantes |
|--------|-------|-------------------|-----------------|
| Bodegas Andrade | 8 | Variedad de uva, tipo, graduación, notas de cata ✅ | — |
| Bodegas Sauci | 11 | Nombre, formato, precio ✅ | Variedad de uva, tipo, notas de cata ❌ |

#### Impacto en el precio

La carga de datos para la demo está incluida en el desarrollo base. La
completación de datos faltantes (variedad de uva de Sauci) se hará durante
la carga inicial del proyecto (decisión C.2).

---

### F.3 Demo para la propuesta — formato y alcance

**Decisión:** ✅ Prototipo funcional de una sola pantalla: la ficha
detallada de un vino con datos reales, paleta aplicada y simulación
de recomendación. Accesible desde móvil. Sin app completa ni mini-admin.

#### Contexto

Hay que entregar algo visual con la propuesta de presupuesto porque el
cuñado no tiene portfolio que enseñar a su socia. El prototipo debe
ser suficiente para que el cliente entienda el producto, pero no tanto
como para regalar el trabajo antes del presupuesto aprobado.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Formato** | Prototipo funcional (HTML/CSS/JS real) | ❌ Mockups estáticos: no son interactivos, no demuestran el producto |
| **Alcance** | Una sola pantalla (ficha de vino) | ❌ Demo funcional completa: regalar el trabajo antes del presupuesto |
| **Datos** | Reales (Bodegas Andrade) | ❌ Datos ficticios: no demuestran que el proyecto usa sus vinos |

#### Impacto en el precio

La demo está incluida en el desarrollo base de todas las opciones. Si el
cliente pidiera ver más funcionalidad antes de decidir, se evaluaría como
coste adicional o parte del proyecto si ya está aprobado.

---

## 9. Decisiones sobre el entorno del cliente

### G.1 Terminales (PDA) de los camareros

**Decisión:** ✅ La app es PWA. Asumimos navegador moderno (Chrome/WebView).
Si un restaurante tiene terminales sin navegador compatible, es problema
del restaurante, no de la app.

#### Contexto

Los camareros usan PDA para tomar comandas. No sabemos marcas ni modelos
concretos (el cuñado no lo sabe). La empresa de vinos no controla el
hardware de sus restaurantes clientes.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Supuesto** | Navegador moderno en todas las PDA | ❌ Pedir marcas al cuñado: no lo sabe, y aunque lo supiera, cada restaurante es distinto |
| **Riesgo** | Si una PDA no tiene navegador moderno, la app no funciona en ese terminal | ❌ Adaptarse a cada terminal: inviable técnica y económicamente |
| **Responsabilidad** | Del restaurante (su hardware) | ❌ De Edu (no puede controlar el hardware de terceros) |

#### Impacto en el precio

Ninguno. La decisión no cuesta nada porque la PWA se desarrolla igual
independientemente de las PDA. Si en el futuro hubiera que hacer una app
nativa para un terminal concreto, se presupuesta aparte.

---

### G.2 Conectividad wifi

**Decisión:** ✅ Asumimos que hay conexión wifi en sala. El offline
cacheado (decisión A.2) es plan B gratuito.

#### Contexto

La app necesita internet para cargar la carta. El cuñado dijo que «no
tiene por qué» necesitar offline. Pero la experiencia real de un camarero
en sala (terraza, bodega, sótano) puede tener puntos muertos de cobertura.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Supuesto** | Wifi disponible | ❌ Condicionar el presupuesto a la cobertura real de cada restaurante: inviable |
| **Plan B** | Cache-first (decisión A.2) | ❌ Offline total: sobreingeniería para el caso de uso |
| **Responsabilidad** | Si un restaurante tiene mala cobertura, es su infraestructura | ❌ De Edu: no puede controlar el wifi de cada restaurante |

#### Impacto en el precio

El cache-first está incluido en el desarrollo base (decisión A.2). No hay
coste adicional.

---

## 10. Proceso y gobernanza

### H.1 Formato de presentación de la oferta

**Decisión:** ✅ Pendiente de definir. Se presenta como horquilla con
supuestos, no cifra cerrada. Queda por definir: fecha, formato (documento
/ reunión / email), y necesidad de factura / datos fiscales.

#### Contexto

El checklist de la entrevista (bloque 16) quedó sin marcar. La auditoría
(Fable B.1) confirmó que la primera oferta la hacemos nosotros.

#### Por qué se ha elegido esta opción

| Aspecto | Decisión tomada | Alternativa descartada |
|---------|----------------|----------------------|
| **Iniciativa** | Nosotros presentamos la oferta primero | ❌ Esperar a que el cliente pida presupuesto: pérdida de control comercial |
| **Formato** | Pendiente (Edu decide) | — |
| **Horquilla** | Sí, con supuestos y exclusiones | ❌ Cifra cerrada: no hay suficiente información del cliente |

#### Impacto en el precio

Ninguno. El formato de presentación no afecta al importe, pero sí a la
percepción del precio por parte del cliente.

---

### H.2 Control de versiones de la documentación

**Decisión:** ✅ Pendiente de decisión de Edu. Opciones: iniciar repo
git ahora para versionar documentación, o mantener sin git hasta la
implementación.

#### Contexto

No hay repo git. La documentación crítica (AGENTS.md, decisiones, informes)
no está versionada. Hasta ahora se ha gestionado manualmente (sufijos _v2,
_v3, _v4 en los archivos).

#### Por qué estamos aquí

| Opción | Pros | Contras |
|--------|------|---------|
| **A: Git ahora** | Trazabilidad completa, diffs, ramas, respaldo | Añadir git a documentación requiere disciplina de commits |
| **B: Sin git hasta implementación** | Menos fricción ahora, se añade cuando haya código | Riesgo de perder cambios si no hay backup manual |

#### Impacto en el precio

Ninguno directamente. Pero iniciar git ahora añade una capa de
profesionalismo que el cliente puede apreciar si se comparte el repo
(no es el caso, el repo es interno). Se recomienda iniciarlo.

---

## 11. Anexo: fuentes documentales

| Fuente | Tipo | Contenido | Cómo se usó |
|--------|------|-----------|-------------|
| Entrevista con cuñado (12 preguntas) | Primaria | Respuestas a alcance, offline, TPV, datos, mantenimiento, precio | Base de todas las decisiones |
| Dosier corporativo Bodegas Andrade (29 pág.) | Primaria | Historia, vinos, bodega | Datos demo, paleta de colores |
| Tarifa 2026 Bodegas Sauci | Primaria | 11 productos con nombre y precio | Catálogo demo |
| Logo Bodegas Andrade | Primaria | Imagen corporativa | Paleta de colores |
| Estándar OIV (Organización Internacional de la Viña y el Vino) | Externa | Clasificación de vinos por dulzor | Criterio de recomendación (decisión B.3) |
| Wikipedia — Classification of wine, Wine tasting descriptors, etc. | Externa | Criterios de sumiller | Algoritmo de matching |
| Ley 20/2007 (Estatuto del Trabajo Autónomo) — BOE | Legal | Definición de habitualidad | Modelo 036 vs RETA |
| Jurisprudencia — STS 29 oct 2019 | Legal | Criterio de habitualidad | Soporte legal modelo 036 |
| Investigación mercado freelance 2026 | Externa | Tarifas de desarrollo en España | Validación de precios |

---

*Documento completo — todas las 27 decisiones documentadas.*
*Última actualización: 15 de julio de 2026.*

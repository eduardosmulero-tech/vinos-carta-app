# MARCO LEGAL Y FISCAL — vinos-carta-app

> Documento adaptado del análisis fiscal del proyecto **GapTecnologicoUtrera (cliente Pepito)**.
> Fuente base: `PLAN.md`, `WORKFLOW.md`, `clientes/pepito/presupuesto.md`, `AUDITORIA_TRANSVERSAL_FABLE_2026-07.md`, `research3-mercado-precios.md` del proyecto GapTecnologicoUtrera.
> Adaptado a las decisiones y horquilla de `docs/SPECS/DECISIONES.md` y `docs/SPECS/HORQUILLA.md` de vinos-carta-app.

---

## Índice

1. [Comparativa: Pepito vs vinos-carta-app](#1-comparativa-pepito-vs-vinos-carta-app)
2. [Régimen 036 (actividad esporádica): ¿aplica a este proyecto?](#2-régimen-036-actividad-esporádica-aplica-a-este-proyecto)
3. [Las 3 opciones de presupuesto con tratamiento fiscal](#3-las-3-opciones-de-presupuesto-con-tratamiento-fiscal)
4. [Tripwire: cuándo este proyecto exigiría RETA](#4-tripwire-cuándo-este-proyecto-exigiría-reta)
5. [Cláusula "primer trabajo" para presentar al cliente](#5-cláusula-primer-trabajo-para-presentar-al-cliente)
6. [Comparativa contra el mercado real](#6-comparativa-contra-el-mercado-real)

---

## 1. Comparativa: Pepito vs vinos-carta-app

| Dimensión | Pepito (GapTecnologicoUtrera) | vinos-carta-app |
|---|---|---|
| **Cliente** | Supermercado de barrio (persona física / autónomo) | Empresa distribuidora de vinos (socia + cuñado) |
| **Precio orientativo** | 250 € (+IVA) pago único | 3.000–6.000 € (+IVA) según opción |
| **Tipo de proyecto** | Web estática (HTML/CSS/JS) + pedidos wa.me | PWA multi-tenant con backend, mini-admin, arquitectura multi-restaurante |
| **Complejidad técnica** | Baja. Sin backend, sin BBDD, sin login | Alta. Backend, base de datos, login multi-tenant, recomendaciones, PDF |
| **Nivel de servicio** | N1 del workflow (*presencia digital*) | N1 + N2 (*operativa ligera*: backend + datos) |
| **Destinatarios** | Clientes del súper (vecinos, presencial) | Camareros de restaurantes (PDA en sala) |
| **Datos manejados** | Ninguno. Catálogo estático en JSON. Sin registro de usuarios. | Catálogo de vinos + cartas por restaurante + login. Datos B2B. |
| **Costes recurrentes para Edu** | 0 € (Cloudflare Pages, gratis) | Potencialmente sí: servidor/VPS, dominio, BD |
| **Recurrencia** | No. Pago único, cero compromisos. | Depende de la opción. Opción C sí crea mensualidad. |
| **Relación** | Vecino-conocido (enganche personal) | Familiar política (cuñado + socia) |
| **Estrategia de precio** | Cliente 0: por debajo del suelo de mercado (400–1.000 € freelance) para conseguir el primer caso de éxito. | Horquilla con supuestos. Aún así, por debajo de agencia (1.500–5.000 €) pero en la banda alta del freelance. |

**Fuente:** PLAN.md (l.46–52, 56–68), presupuesto.md (l.28), HORQUILLA.md (l.27–81), research3-mercado-precios.md (l.13–16, 20–21), DECISIONES.md (A.3, A.2, C.1).

---

## 2. Régimen 036 (actividad esporádica): ¿aplica a este proyecto?

### 2.1 Qué dice el modelo Pepito

En el proyecto Pepito se definió un régimen fiscal claro:

> **FASE 1.D — La factura y el alta 036 (cobrar legal)**
> "El puente legal: alta censal en Hacienda SIN autónomo, para el pago único."
> (PLAN.md, l.56–58)

Las condiciones que aplicaban a Pepito:
- Trabajo **único y puntual**
- Sin recurrencia ni mensualidad
- Sin publicidad ni captación activa de clientes
- Ingresos muy por debajo del SMI anual
- Epígrafe 763 (Servicios de asistencia y asesoramiento informático)

> **Regla de la fase (PLAN.md, l.52):**
> "el presupuesto separa claramente el PAGO ÚNICO (facturable ahora con 036) del mantenimiento mensual (que NO ofrezco todavía como recurrente — llega en Fase 2 con el RETA)."

### 2.2 Aplicabilidad a vinos-carta-app

| Factor | ¿Favorable para 036? | Notas |
|---|---|---|
| **Es un solo cliente** | ✅ Sí | Un único proyecto para una empresa |
| **Es pago único** (Ops. A y B) | ✅ Sí | Si se elige Opción A o B, no hay recurrencia |
| **Importe elevado (3.000–6.000 €)** | ⚠️ Cautela | El importe NO es determinante por sí solo para Hacienda. El criterio de *habitualidad* (art. 4 LIRPF) se basa en que sea la **actividad principal** o haya **recurrencia**, no en una cifra concreta. Un pago único de 5.000 € puede facturarse con 036 si no hay más clientes ni continuidad. |
| **Complejidad técnica: backend + datos** | ⚠️ Cautela | El proyecto requiere backend, base de datos y posible hosting mensual. Si Edu paga hosting/VPS de su bolsillo mensualmente, eso es un **gasto recurrente** vinculado a una actividad económica, lo que Hacienda podría interpretar como habitualidad. |
| **Opción C: cuota mensual** | ❌ NO aplica | La cuota mensual recurrente (25–50 €/mes) es el disparador fiscal más claro. Ver §4. |
| **Datos de terceros (restaurantes)** | ✅ No es factor fiscal | Los datos de restaurantes son B2B, no datos personales de consumo. Pero sí afectan a RGPD (ver §2.3). |

### 2.3 Consideración adicional: RGPD

A diferencia de Pepito (web estática sin datos de usuarios), vinos-carta-app:
- Almacena datos de restaurantes (nombre, posiblemente contacto)
- Asigna cartas personalizadas a cada restaurante
- Tiene login (una credencial por restaurante)

Dato B2B, no datos personales de cliente final. Pero si en el futuro se almacenan datos de contacto de personas físicas en los restaurantes (camareros, gerentes), habría que revisar RGPD y registro de actividades de tratamiento. No es un bloqueo para el proyecto actual, pero conviene documentarlo como nota para fases futuras.

**Fuente:** DECISIONES.md (D.1, D.2), WORKFLOW.md (l.105: "El día que ofrezca N2 → RETA + revisar RGPD").

### 2.4 Veredicto

| Opción | ¿036 aplicable? | Condiciones |
|---|---|---|
| **Opción A** (pago único, 3.150–5.300 €) | **Sí, con cautela** | Aplica 036 si es trabajo único, sin recurrencia, sin publicidad activa. El importe es alto pero no determina habitualidad por sí solo. |
| **Opción B** (pago único + 3 meses cambios) | **Sí, con cautela** | Misma base que A. Los 3 meses de cambios se consideran parte del mismo proyecto, no recurrencia independiente. |
| **Opción C** (pago único + cuota mensual) | **NO** | La cuota mensual recurrente exige RETA. Ver §4. |

---

## 3. Las 3 opciones de presupuesto con tratamiento fiscal

### 3.1 Datos fiscales comunes

| Concepto | Valor |
|---|---|
| **Epígrafe IAE** | **763** — Servicios de asistencia y asesoramiento informático (incluye desarrollo web) |
| **IVA aplicable** | 21% (régimen general) |
| **IRPF (retención)** | 7% (profesional que inicia actividad, emite factura a empresa) |
| **Modelo trimestral** | 303 (IVA) + 130 (IRPF estimado, si procede) |

**Fuente:** PLAN.md (l.60–62, 64), presupuesto.md (l.58).

### 3.2 Mecánica de facturación

La factura se emite con el siguiente esquema (precios "más IVA"):

```
Base Imponible:          B
+ IVA 21%:              B × 0,21
= Total factura:        B × 1,21
- IRPF 7% (retención):  B × 0,07
= Total a cobrar:       B × 1,14
```

**El cliente paga el total con IVA pero descuenta el 7% de IRPF.** Ese 7% lo ingresa la empresa cliente mediante el **modelo 111** (retenciones de IRPF). Para el cliente es un trámite estándar que su gestoría ya conoce.

> **Nota textual del presupuesto de Pepito (presupuesto.md, l.58):**
> "Tu gestoría la ingresa con el modelo 111 como cualquier otra."

### 3.3 Opción A — Llave en mano (pago único)

**Descripción:** Proyecto completo, sin compromiso posterior. Cambios futuros se presupuestan aparte.

| Concepto | Importe (midpoint) | Cálculo |
|---|---|---|
| Base Imponible | 3.500,00 € | Honorarios de desarrollo |
| IVA 21% | 735,00 € | 3.500 × 0,21 |
| Total factura | 4.235,00 € | 3.500 × 1,21 |
| IRPF 7% (retención) | –245,00 € | 3.500 × 0,07 |
| **Líquido a cobrar** | **3.990,00 €** | 4.235 – 245 |

**Rango completo (desde HORQUILLA.md, l.27–35):**

| Concepto | Mínimo | Máximo |
|---|---|---|
| Desarrollo MVP | 3.000 € | 5.000 € |
| Carga inicial fichas | 150 € | 300 € |
| Base Imponible total | 3.150 € | 5.300 € |
| IVA 21% | 661,50 € | 1.113,00 € |
| Total factura | 3.811,50 € | 6.413,00 € |
| IRPF 7% | –220,50 € | –371,00 € |
| **Líquido a cobrar** | **3.591,00 €** | **6.042,00 €** |

### 3.4 Opción B — Llave en mano + 3 meses de cambios menores

**Descripción:** Incluye el MVP + 3 meses de soporte post-entrega para ajustes menores.

| Concepto | Importe (midpoint) | Cálculo |
|---|---|---|
| Base Imponible (desarrollo) | 3.850,00 € | 3.500 + 350 (3 meses soporte) |
| IVA 21% | 808,50 € | 3.850 × 0,21 |
| Total factura | 4.658,50 € | 3.850 × 1,21 |
| IRPF 7% (retención) | –269,50 € | 3.850 × 0,07 |
| **Líquido a cobrar** | **4.389,00 €** | 4.658,50 – 269,50 |

**Fiscalmente:** Los 3 meses de cambios se facturan como **un único proyecto**, no como recurrentes. Se emite una sola factura al inicio. Esto mantiene el proyecto dentro del régimen 036 (siempre que no se renueven los 3 meses).

**Rango completo (desde HORQUILLA.md, l.61–66):**

| Concepto | Mínimo | Máximo |
|---|---|---|
| Desarrollo MVP | 3.000 € | 5.000 € |
| Carga inicial fichas | 150 € | 300 € |
| Soporte 3 meses | 300 € | 600 € |
| Base Imponible total | 3.450 € | 5.900 € |
| IVA 21% | 724,50 € | 1.239,00 € |
| Total factura | 4.174,50 € | 7.139,00 € |
| IRPF 7% | –241,50 € | –413,00 € |
| **Líquido a cobrar** | **3.933,00 €** | **6.726,00 €** |

### 3.5 Opción C — Proyecto + cuota mensual de soporte

**Descripción:** Precio base reducido + cuota mensual recurrente de 25–50 €/mes.

| Concepto | Importe (midpoint) | Cálculo |
|---|---|---|
| Base Imponible (pago único) | 3.400,00 € | 3.000 + 400 (carga fichas) |
| IVA 21% | 714,00 € | 3.400 × 0,21 |
| Total factura inicial | 4.114,00 € | 3.400 × 1,21 |
| IRPF 7% | –238,00 € | 3.400 × 0,07 |
| **Líquido a cobrar (inicial)** | **3.876,00 €** | 4.114 – 238 |
| **Cuota mensual** | **25–50 €/mes** | Factura mensual con IVA 21% e IRPF 7% |

**Rango completo (desde HORQUILLA.md, l.78–81):**

| Concepto | Mínimo | Máximo |
|---|---|---|
| Desarrollo MVP | 2.500 € | 4.000 € |
| Carga inicial fichas | 150 € | 300 € |
| Base Imponible (pago único) | 2.650 € | 4.300 € |
| IVA 21% | 556,50 € | 903,00 € |
| Total factura inicial | 3.206,50 € | 5.203,00 € |
| IRPF 7% | –185,50 € | –301,00 € |
| **Líquido inicial** | **3.021,00 €** | **4.902,00 €** |
| **Cuota mensual (BC + IVA – IRPF)** | **28,50–57,00 €/mes** | Ver nota |

**⚠️ LA OPCIÓN C DISPARA RETA.** Ver §4.

---

## 4. Tripwire: cuándo este proyecto exigiría RETA

### 4.1 Los disparadores según el workflow original

El proyecto Pepito definió en WORKFLOW.md (l.101–105) tres disparadores de cambio de régimen fiscal:

> **Disparadores de fase fiscal (no negociables):**
> 1. 1 trabajo puntual, sin publicidad, bajo SMI anual → 036 sin RETA vale.
> 2. 2º cliente, mantenimiento mensual o captación pública → **RETA antes de cerrar**.
> 3. El día que ofrezca N2 (backend, datos de clientes) → RETA + revisar RGPD.

### 4.2 Mapa de disparadores para vinos-carta-app

| Disparador | ¿Se da en vinos? | ¿Cuándo? |
|---|---|---|
| **Importe alto pero único** | ⚠️ Borde | El importe (3.000–6.000 €) supera el SMI mensual pero no el anual. No es disparador en sí mismo. |
| **Recurrencia mensual** | ❌ Opción C: SÍ | **La cuota mensual (25–50 €/mes) ES recurrencia.** Según WORKFLOW.md, "mantenimiento mensual" es disparador de RETA. |
| **Continuidad del proyecto** | ⚠️ Potencial | Si tras el MVP el cliente pide más funcionalidades (fase 2: recomendación inversa, stock, integración TPV), se alarga la relación y se consolida la habitualidad. |
| **Captación pública** | ❌ No | No hay publicidad ni captación activa de más clientes por ahora. |
| **2º cliente** | ⚠️ Potencial | Si mientras se desarrolla vinos aparece otro proyecto, ese segundo cliente dispara RETA. |
| **N2: backend + datos de clientes** | ✅ SÍ | Vinos-carta-app es intrínsecamente N2 (backend, base de datos, multi-tenant). El WORKFLOW.md es claro: "El día que ofrezca N2 → RETA". Aunque para el proyecto Pepito esto era un disparador futuro, para vinos es **desde el día 1**. |

### 4.3 Conclusión del tripwire

| Escenario | ¿RETA? | Acción |
|---|---|---|
| Opción A (pago único, sin más clientes) | **Sí, por N2** | El proyecto tiene backend y datos → WORKFLOW.md lo marca como N2 → dispara RETA. Dicho esto, si es el **único proyecto del año** y no hay recurrencia, la AEAT difícilmente lo perseguiría como habitualidad, pero la **doctrina segura** es: proyecto con backend = RETA. |
| Opción B (pago único + 3 meses) | **Sí, por N2** | Misma conclusión. Los 3 meses no cambian el análisis. |
| Opción C (cuota mensual) | **RETA OBLIGATORIO** | Recurrencia + N2 = RETA sin discusión. Si se elige esta opción, Edu debe darse de alta en RETA **antes de emitir la primera factura mensual**, con tarifa plana + Cuota Cero Andalucía si aplica. |

> **Nota práctica (heredada del modelo Pepito):** El 036 para actividad esporádica está pensado para profesionales que facturan **ocasionalmente** (un trabajo al año, bajo importe). Un proyecto de 3.000–6.000 € con backend, base de datos y mantenimiento potencial está en la zona gris. La recomendación fiscal segura es: **alta en RETA desde el momento en que el proyecto implique backend, datos de terceros, o cualquier recurrencia.**

**Fuente:** WORKFLOW.md (l.59, 101–105), PLAN.md (l.68: "En cuanto sea recurrente → RETA — no estirar el 036"), DECISIONES.md (A.3, A.2).

---

## 5. Cláusula "primer trabajo" para presentar al cliente

### 5.1 Contexto

Así como Pepito era el "cliente 0" de Edu (primer trabajo profesional como desarrollador), vinos-carta-app también lo es en la práctica: es el **primer proyecto con backend, con empresa, con facturación significativa**. Aunque el cliente es familiar política, el marco legal debe proteger a Edu frente a expectativas de soporte eterno, mantenimiento gratuito o disponibilidad ilimitada.

### 5.2 Texto propuesto para incluir en la propuesta

> **Cláusula de primer proyecto — vinos-carta-app**
>
> *Esta cláusula protege tanto al cliente como al desarrollador, estableciendo expectativas claras desde el inicio.*
>
> 1. **Naturaleza del proyecto:** Este es un proyecto de desarrollo a medida. Se entrega un producto funcional según el alcance acordado. No es una suscripción ni un servicio gestionado.
>
> 2. **Sin permanencia:** El cliente no adquiere ninguna obligación de continuidad más allá del pago único acordado. No hay cláusulas de permanencia, penalización por cancelación ni renovación automática.
>
> 3. **Sin recurrencia implícita:** La entrega del proyecto no genera ninguna obligación de soporte continuado, hosting, mantenimiento ni actualizaciones futuras a menos que se acuerde explícitamente por escrito en un nuevo acuerdo.
>
> 4. **Hosting y costes recurrentes:** Si el proyecto requiere servidor, dominio o cualquier coste recurrente para su funcionamiento, se especificará quién asume cada coste y cómo se gestiona. En ningún caso Edu asume costes recurrentes sin un acuerdo de contraprestación.
>
> 5. **Cambios futuros:** Cualquier modificación, ampliación o mejora no incluida en el alcance inicial se presupuesta y factura como un servicio nuevo. El precio del proyecto original no incluye cambios posteriores.
>
> 6. **Disponibilidad del desarrollador:** Edu desarrolla este proyecto como profesional independiente en sus primeros proyectos. No hay garantía de disponibilidad inmediata para incidencias o cambios fuera de los plazos acordados. El contacto será por los canales y horarios que se acuerden mutuamente.
>
> 7. **Propiedad intelectual:** Una vez cobrado el pago íntegro, el código fuente del proyecto se entrega al cliente. Edu se reserva el derecho a reutilizar componentes genéricos (patrones de arquitectura, utilidades, herramientas internas) en proyectos futuros, pero no los datos del cliente ni la personalización específica de su marca.
>
> 8. **Ley aplicable:** Este acuerdo se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados de Utrera (Sevilla).

### 5.3 Adaptación desde el modelo Pepito

| Elemento Pepito | Adaptación a vinos |
|---|---|
| "Esto es un pago único, no una suscripción" (presupuesto.md, §1) | Se mantiene igual para Opciones A y B. Para Opción C, se cambia a: "El pago inicial es único; la cuota mensual es opcional y se factura aparte." |
| "Sin permanencia" (presupuesto.md, §5) | Se mantiene. Añadir: "Ni siquiera en Opción C hay permanencia mínima; el cliente puede cancelar la cuota mensual con preaviso de 15 días." |
| "Facturación con 036, actividad esporádica" (presupuesto.md, §3) | Se cambia a: "Facturación con alta censal en Hacienda (epígrafe 763), con IVA 21% e IRPF 7%." Se omite la mención a "esporádica" para no crear expectativas sobre el régimen fiscal. |
| Plazo de entrega 3–5 días laborables | Se cambia a 4–6 semanas (coherente con la complejidad y HORQUILLA.md). |

---

## 6. Comparativa contra el mercado real

### 6.1 Los tres niveles del mercado

Según `research3-mercado-precios.md` (julio 2026):

| Nivel | Rango de precio | Referencia |
|---|---|---|
| **Freelance individual** (web básica–corporativa) | **400–1.000 €** por proyecto | tarifaautonomo.com, Hostinger, creasitios.com |
| **Freelance especializado** (PWA, apps) | **1.500–3.000 €** por proyecto | Estimación sobre la base de tarifa/hora (25–35 €/h junior, 4–6 semanas ≈ 400–840 h → proyectado) |
| **Agencia** (proyecto comparable) | **1.500–5.000 €** | raiolanetworks.com |
| **Kit Digital** (bono público, categoría web) | **2.000 €** (techo de referencia) | research3 (l.21) |
| **SaaS catálogo + WhatsApp** (Whataform, Pedi.app) | **15–99 €/mes** (suscripción eterna) | whataform.com/pricing, pedi.app |

### 6.2 Dónde se sitúa vinos-carta-app

| Opción vinos | Precio | vs Freelance | vs Agencia | vs SaaS (2 años) |
|---|---|---|---|---|
| **Opción A** | 3.150–5.300 € | **Por encima** del rango de web básica, pero **por debajo** de lo que costaría una PWA multi-tenant con backend a tarifa freelance (25–35 €/h × 200–300 h = 5.000–10.500 €). | Dentro del rango de agencia (1.500–5.000 €) ligeramente por encima del techo de agencia para proyectos simples, pero **por debajo** de lo que una agencia cobraría por una PWA multi-tenant real (6.000–15.000 €). | 0 € (pago único). El cliente NO paga suscripción mensual. |
| **Opción B** | 3.450–5.900 € | Misma comparativa. El extra de 300–600 € por 3 meses de soporte está por debajo de lo que costaría contratar un mantenimiento freelance (19–39 €/mes × 12 = 228–468 €/año, research3 l.26). | Comparable a un contrato de mantenimiento de agencia (49–79 €/mes). | 0 € (no hay suscripción, el soporte se factura en el pago único). |
| **Opción C** | 2.650–4.300 € + 25–50 €/mes | Precio inicial más bajo. La cuota mensual (25–50 €) está **dentro del rango de mantenimiento freelance** (19–39 €/mes) y **por debajo del de agencia** (49–79 €/mes). | Notable: el coste a 2 años sería 2.650 + (50×12×2) = 3.850 € ≈ Opción A. A 4 años sería 5.050 €, superando el techo de pago único. | Frente al SaaS (Whataform 15 €/mes = 360 €/2 años), la cuota es más cara individualmente, pero el producto es **propietario y personalizado**, no un SaaS genérico. |

**Fuente:** research3-mercado-precios.md (l.10–21, 25–31, 35–42).

### 6.3 El argumento de valor para el cliente

El mismo ángulo que se usó con Pepito se adapta a vinos-carta-app:

> **"Esto que te desarrollo es una aplicación a medida, tuya, sin depender de una plataforma externa ni pagar cada mes de por vida a un SaaS. Pagas una vez por el desarrollo y el producto es tuyo."**

Para el distribuidor de vinos, el valor añadido respecto al SaaS genérico es:
- **Personalización total:** La app lleva sus vinos, sus bodegas, su marca.
- **Multi-tenant nativo:** Cada restaurante ve solo su carta. El SaaS genérico (Whataform, Pedi.app) es mono-negocio.
- **Sin dependencia externa:** Si el SaaS cierra, sube precios o cambia condiciones, el cliente no pierde su inversión.
- **Profesionalidad B2B:** Una PWA con login y multi-tenant presenta una imagen mucho más profesional a los restaurantes que un catálogo en página web genérica.

### 6.4 Nota sobre el precio de "primer proyecto"

Al igual que Pepito (250 € por debajo del suelo freelance de 400–1.000 €), el precio de vinos-carta-app también está influido por ser un proyecto temprano de Edu. Pero a diferencia de Pepito:

- El descuento no es tan agresivo (no se está 5× por debajo del mercado, sino dentro del rango o ligeramente por debajo de lo que costaría en agencia).
- La ventaja para Edu no es solo el ingreso directo, sino **tener un caso de éxito complejo** (PWA multi-tenant con backend) que multiplique el valor de sus proyectos futuros.
- A partir del siguiente proyecto similar, el precio debería subir a la banda alta de freelance (5.000–8.000 €) o directamente a precios de agencia especializada (8.000–15.000 € para una PWA multi-tenant completa).

---

## Anexo: Resumen de obligaciones fiscales

| Obligación | Periodicidad | Modelo | ¿Aplica con 036? | ¿Aplica con RETA? |
|---|---|---|---|---|
| Alta censal (inicio actividad) | Una vez | 036 | ✅ Antes de facturar | ✅ Antes de facturar |
| IVA repercutido | Trimestral | 303 | ✅ | ✅ |
| IRPF estimado | Trimestral | 130 | Solo si hay beneficios | ✅ |
| Retenciones IRPF en factura | Cada factura | 111 (lo declara el cliente) | ✅ (7%) | ✅ (7%) |
| Cuota autónomos | Mensual | RETA | ❌ | ✅ (Tarifa plana + Cuota Cero si aplica) |
| Declaración renta | Anual | Renta web | ✅ | ✅ |
| Libro registro (Verifactu) | Continuo | — | Pendiente de normativa para 2027 | Pendiente de normativa para 2027 |

> **Nota para Edu:** Aunque este proyecto pueda hacerse con 036 (especialmente Opción A o B si es el único trabajo del año), el hecho de que tenga **backend + base de datos + N2** hace que la postura conservadora sea darse de alta en RETA desde el inicio, especialmente si hay expectativa de continuidad (más funciones, más restaurantes, cuota mensual). Consulta con una gestoría antes de emitir la primera factura.

---

*Documento generado el 15 de julio de 2026. Basado en los archivos de GapTecnologicoUtrera (PLAN.md, WORKFLOW.md, presupuesto.md, AUDITORIA_TRANSVERSAL, research3) y de vinos-carta-app (DECISIONES.md, HORQUILLA.md).*

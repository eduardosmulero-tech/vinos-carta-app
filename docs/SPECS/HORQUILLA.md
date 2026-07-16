# Propuesta de presupuesto — vinos-carta-app

> Documento interno para que Edu fije las cifras de cada opción.
> Exclusiones comunes a las 3 opciones al final.

---

## Alcance común (las 3 opciones)

Basado en decisiones cerradas (docs/SPECS/DECISIONES.md):

| Pieza | Qué incluye |
|-------|-------------|
| **PWA responsive** | App web progresiva para PDA/cualquier navegador moderno. Sin versión nativa. |
| **Lectura offline cacheada** | Service worker con cache-first. La carta se ve sin conexión. |
| **Arquitectura multi-tenant** | Catálogo maestro + cartas separadas por restaurante. |
| **Login único por restaurante** | Una credencial por restaurante, sin perfiles de camarero. |
| **Búsqueda de vinos (#1)** | Buscador en la carta del restaurante. |
| **Ficha detallada (#2)** | Datos del vino: nombre, bodega, tipo, variedad de uva, graduación, precio, notas de cata. |
| **Recomendaciones (#3)** | Por uva + tipo (criterio definido en investigación). |
| **Informe inventario (#4)** | Listado de la carta + exportación a PDF. |
| **Mini-admin (panel empresa)** | CRUD de vinos + asignación por buscador + import CSV. Sin ABM de restaurantes. |
| **Demo con datos reales** | Carga inicial de vinos de Bodegas Andrade (8) y Bodegas Sauci (11). |

---

## Opción A — Proyecto llave en mano

**Precio único por el MVP completo.** Cambios o añadidos futuros se presupuestan y facturan aparte (por hora o por proyecto). Sin compromiso de soporte recurrente.

| Concepto | Coste estimado |
|----------|---------------|
| Desarrollo MVP completo (alcance común) | 3.000 – 5.000 € |
| Carga inicial de fichas (19 vinos) | 150 – 300 € |
| **Total Opción A (sugerido)** | **3.150 – 5.300 €** |

**Para el cliente:** paga una vez y recibe la app funcionando. Si luego quiere cambios, se acuerda precio en ese momento.

**Nota para Edu:** estos rangos asumen 4-6 semanas de trabajo con apoyo de IA. Si tu tarifa día es distinta o quieres ajustar, los números los pones tú. Esto es orientativo para que el cliente vea 3 niveles y elija.

---

## Opción B — Proyecto + 3 meses de cambios menores

**Incluye el MVP completo + 3 meses de ajustes post-entrega** desde la fecha de entrega (no desde la firma). Pasados los 3 meses, cualquier cambio va a presupuesto aparte.

**¿Qué se considera "cambio menor"?** (definirlo en el contrato)
- Ajustes de contenido en fichas de vino existentes
- Cambios de texto, colores o estilos menores
- Corrección de bugs o errores de maquetación
- Añadir/eliminar campos simples en fichas de vino
- Añadir algún vino nuevo al catálogo (si el cliente lo provee)
- Hasta 2 revisiones por mes (para acotar el alcance)

**¿Qué NO se considera cambio menor?**
- Nuevas funciones (ej. integración con TPV, stock con cantidades)
- Cambios en la arquitectura o base de datos
- Rediseño de pantallas completas
- Motor de recomendación inverso

| Concepto | Coste estimado |
|----------|---------------|
| Desarrollo MVP completo | 3.000 – 5.000 € |
| Carga inicial de fichas | 150 – 300 € |
| Soporte 3 meses post-entrega (cambios menores, ~2h/semana) | 300 – 600 € |
| **Total Opción B (sugerido)** | **3.450 – 5.900 €** |

**Para el cliente:** paga algo más pero tiene margen para retoques sin coste extra durante los primeros meses. Recomendado para una primera colaboración — cubre los inevitables "uy, esto lo quería diferente" post-entrega.

---

## Opción C — Proyecto + cuota mensual de soporte

**Precio base más bajo por el MVP** + cuota mensual recurrente que cubre soporte técnico, hosting (si aplica) y cambios menores.

| Concepto | Coste estimado |
|----------|---------------|
| Desarrollo MVP completo (alcance común) | 2.500 – 4.000 € |
| Carga inicial de fichas | 150 – 300 € |
| **Pago único total** | **2.650 – 4.300 €** |
| **Cuota mensual** (soporte + hosting + cambios menores) | **25 – 50 €/mes** |

**Para el cliente:** paga menos al inicio pero asume un coste recurrente. Interesante si quiere "algo barato ahora y ya veremos". Para Edu: genera ingresos pasivos pero te ata a soporte continuo. Valorarlo bien por ser tu primer proyecto.

---

## Exclusiones comunes (a documentar en las 3 opciones)

Lo siguiente NO está incluido en ninguna de las opciones. Si el cliente lo pide en el futuro, se presupuesta aparte:

- Stock/inventario con cantidades (requiere integración con TPV o carga manual)
- Autogestión por restaurantes (que el restaurante modifique su propia carta)
- ABM completo de restaurantes en el admin
- Motor de recomendación inverso (empresa ofrece vinos al restaurante)
- Datos de colección / histórico del restaurante
- Integraciones con TPV, ERPs o cualquier tercero
- Mockups de diseñadora (los pagará el cliente por separado si los encarga)
- Identidad corporativa completa (el cliente dijo que es "muy genérica")

---

## Siguiente paso

Edu pone las cifras en los espacios marcados como `[Edu]` y decidimos cómo presentarlo al cuñado.

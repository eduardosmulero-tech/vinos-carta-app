# CONTRATO — Demo funcional vinos-carta-app V1

> Contrato para la fase CONTRATO → SPEC → PLAN → IMPLEMENTACIÓN de la demo.
> Pipeline: MANUAL_PIPELINE_TRABAJO.md §3 (7 fases).
> Stack: React 19 + TypeScript + Vite + Tailwind CSS v4.

---

## 1. Objetivo

Construir una demo funcional PWA que muestre el **flujo completo** de la app al cliente (cuñado de Edu + su socia): búsqueda de vinos en la carta, ficha detallada de cada vino, y recomendaciones por uva parecida.

Si no se acepta el presupuesto, la demo queda como pieza de portfolio de Edu — por eso usamos el stack consistente (React+Vite+Tailwind).

---

## 2. Alcance exacto

### Funcionalidades incluidas (MVP completo)

| # | Funcionalidad | Descripción |
|---|--------------|-------------|
| 1 | **Listado de vinos** | Carta completa del restaurante con los 19 vinos reales (8 Andrade + 11 Sauci) |
| 2 | **Búsqueda** | Buscador en la carta por nombre, tipo, bodega o uva |
| 3 | **Ficha detallada** | Vista detalle de cada vino: nombre, bodega, tipo, variedad de uva, graduación, notas de cata, D.O. (sin precio — ver exclusiones) |
| 4 | **Recomendaciones** | En ficha detallada: vinos de uva parecida (matching por atributo de variedad de uva + tipo) |

### Requisitos técnicos

- **PWA:** manifest.json + service worker con cache-first (lectura offline de la carta)
- **Responsive:** adaptable a PDA / móvil / tablet
- **Paleta de marca:** colores extraídos del logo — crema `#f2ebe5`, burgundy `#73232d`, etc.
- **Datos estáticos:** JSON embebidos (sin backend, sin API)
- **Sin login:** la demo muestra una carta precargada de ejemplo

### Lo que NO incluye este contrato (exclusiones explícitas)

- ❌ Multi-tenant / separación por restaurante
- ❌ Login / autenticación
- ❌ Admin panel (CRUD de vinos)
- ❌ Informe de inventario / PDF
- ❌ Backend / API server
- ❌ Carga de datos desde fuentes externas
- ❌ Despliegue a producción
- ❌ **Precios** (decisión Edu 16-jul: la app NO muestra precios en ninguna pantalla — el cliente es distribuidor, sus tarifas son precio de compra B2B confidencial y cada restaurante vende al precio que quiere; la app es herramienta de formación de camareros, no carta comercial. Carta con precios del restaurante = posible fase futura)

---

## 3. Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 |
| Lenguaje | TypeScript |
| Bundler | Vite 6 |
| CSS | Tailwind CSS v4 |
| PWA | vite-plugin-pwa |
| Estado | useState / props (demo, no necesita estado global) |
| Routing | React Router v7 |
| Datos | JSON estáticos en `/src/data/` |

---

## 4. Datos para la demo

### Fuentes

1. **`docs/INFORMES/DISENO_REFERENCIAS.md`** — 19 vinos con marca, tipo, uva, graduación
2. **`assets/`** — logo (`logo-bodegas-andrade.jpg`)
3. **`demo-data/Tarifas_2026_Bodegas_Sauci.pdf`** — solo como referencia de nombres/formatos de los vinos. ⚠️ Los precios NO se extraen ni se usan: son tarifa B2B del distribuidor (confidencial) y la app no muestra precios

### Estructura de datos (vino)

```typescript
interface Wine {
  id: string;
  name: string;
  winery: string;
  type: string;        // "Blanco Joven Seco", "Fino en Rama", etc.
  grape: string;       // "Zalema", "Chardonnay", etc.
  region: string;      // D.O. o procedencia
  alcohol: number;     // graduación
  volume: string;      // "75cl"
  description: string; // notas de cata / descripción
  image?: string;      // ruta a imagen (si existe)
}
```

---

## 5. Criterios de éxito (DoD)

- [ ] `npm run dev` arranca y se ve en `http://localhost:5173`
- [ ] Pantalla de listado de vinos con buscador funcional (filtra en tiempo real)
- [ ] Click en un vino → navega a ficha detallada con datos reales
- [ ] En ficha detallada, sección "Vinos similares" con recomendaciones por uva
- [ ] Diseño responsive: se ve bien en 375px (móvil) y 768px+ (tablet/desktop)
- [ ] Paleta de colores aplicada: fondo crema, burgundy en headers/botones, texto oscuro
- [ ] PWA manifest configurado → Lighthouse muestra "installable"
- [ ] Service worker registrado → app funciona offline (cache-first)
- [ ] Logo de Bodegas Andrade visible en header

---

## 6. Fases de implementación

| Fase | Tarea | Perfil | Depende de |
|------|-------|--------|-----------|
| **SPEC** | Documento de especificación: componentes, routing, modelo datos, mockups textuales | Worker código | CONTRATO ✅ |
| **PLAN** | Plan de implementación con tareas atómicas | Principal | SPEC |
| **IMP.1** | Scaffolding: Vite + React + TS + Tailwind + PWA plugin | Worker código | PLAN |
| **IMP.2** | Datos: JSON de 19 vinos desde las fuentes | Worker código | IMP.1 |
| **IMP.3** | Componentes: Listado + Buscador + Ficha + Recomendaciones | Worker código | IMP.2 |
| **IMP.4** | Diseño visual: paleta de colores, responsive, refinamiento UI | Worker código | IMP.3 |
| **IMP.5** | PWA: manifest + service worker + test offline | Worker código | IMP.4 |
| **REVIEW** | Revisión de código y funcionalidad | Reviewer | IMP.5 |
| **VALIDACIÓN** | Edu prueba y da OK | Edu | REVIEW |

---

## 7. Prohibiciones

- No instalar dependencias no listadas en el stack
- No crear backend / API — datos 100% estáticos
- No añadir features no contempladas en el alcance (principio a-13-1)
- No deployar a producción
- No refactorizar el stack una vez arrancado

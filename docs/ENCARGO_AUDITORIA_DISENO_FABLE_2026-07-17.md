# ENCARGO — Auditoría de diseño visual (demo v1) — para Fable

> Preparado por Sonnet (Claude Code), 17-jul-2026. **No lanzado** — Edu decide cuándo
> y cómo entregárselo a Fable. Este documento es el contrato/brief completo, autocontenido.

---

## 1. Objetivo

Fable debe auditar el diseño visual de las **2 vistas existentes** de la demo
(listado de vinos y ficha de vino) desde dos ángulos, no uno solo:

1. **Las 6 correcciones que Edu ya anotó** sobre capturas reales (vía Vercel Comments) —
   validarlas, no darlas por buenas sin más: decir si cada una es acertada, si falta
   matizarla, o si hay una forma mejor de resolver el problema que señala.
2. **Una auditoría propia, independiente de las notas de Edu**, comparando ambas vistas
   contra el estándar de apps de hostelería/carta digital premium (ej. referencias tipo
   apps de sumillería, cartas de restaurantes de gama alta, apps de bodega). Fable debe
   **proponer sus propios hallazgos** aunque no coincidan con nada de lo que Edu señaló.

Entregable esperado: lista de hallazgos con **pros / contras** de cada elemento actual,
y para cada contra, una propuesta concreta de solución (no solo "esto está mal").

---

## 2. Contexto del proyecto (resumen — detalle completo en `AGENTS.md`)

- App de carta de vinos digital para camareros de restaurante (PWA, sin login en la demo).
- Cliente: cuñado de Edu (empresa distribuidora de vinos) + su socia, quien decide.
- Norte del proyecto (cítalo si aplica): *"No quiere volverse loco con features inútiles
  y sin valor. Quiere una app útil para los camareros y fácil de usar para los
  restaurantes."*
- Demo ya construida y desplegada online (Vite + React 19 + TS + Tailwind v4 + PWA).
  Repo: `https://github.com/eduardosmulero-tech/vinos-carta-app`, app en `app/`.
- **Regla dura del proyecto (a-13-1): sin features por iniciativa propia.** Esto aplica
  también a Fable aquí — los hallazgos son propuestas para que Edu decida, NO se
  implementan solos ni se dan por aprobados.
- **Sin precios en ninguna pantalla** (decisión cerrada 16-jul) — no proponer mostrar
  precio en ningún hallazgo.
- Mockups profesionales de una diseñadora están pendientes de que el cliente los pida
  (solo si el presupuesto le cuadra) — esta demo es lo único visual que existe por ahora.

### Paleta y marca (de `docs/INFORMES/DISENO_REFERENCIAS.md`)

| Color | HEX | Uso |
|---|---|---|
| Fondo/crema | `#f2ebe5` | Fondos de pantalla, tarjetas |
| Burgundy vino | `#73232d` | Marca, headers, botones destacados |
| Burgundy oscuro | `#6e1428` | Hovers |
| Texto oscuro | `#232421` | Cuerpo de texto |
| Blanco | `#ffffff` | Tarjetas, contraste |

Estética objetivo: **clásica de vino andaluz** — fondo crema/papel envejecido + burgundy
profundo, identidad premium/tradicional. Logo real: `app/public/logo-bodegas-andrade.jpg`
(círculo sobre crema, tipografía serifa clásica).

---

## 3. Material a revisar

Las 8 capturas están en `demo-data/Capturas con notas/` (mismo repo). Muestran las 2
vistas reales de la demo desplegada, con las anotaciones de Vercel Comments visibles
superpuestas (burbuja negra "Bananasoviet"). Fable debe mirar tanto las capturas como,
si tiene acceso, la demo online desplegada para juzgar el diseño real sin las burbujas
tapando contenido.

**Vista 1 — Listado (`Header.JPG`, `TitulosNoCentradosPreview.JPG`, `Tarjetas1...JPG`,
`Tarjetas2...JPG`, `Tarjeta3...JPG`):** header con logo+buscador, grid de tarjetas de vino
(nombre, bodega, tipo, uva, botón "Ver más").

**Vista 2 — Ficha de vino (`InfoVino 1/2/3...JPG`):** nombre, bodega, etiquetas
(tipo/D.O./formato), uva, graduación, notas de cata, sección "Vinos similares".

---

## 4. Las 6 notas de Edu (transcritas, en orden de captura)

1. **Header:** centrar el logo; quitar la palabra "Vinos" y dejar "Carta Digital" fijado
   a la derecha del todo. El hueco que deje el logo se reserva para un futuro menú
   desplegable de navegación por tipos (pendiente de revisar más adelante — no
   implementar aún, solo tenerlo en cuenta al proponer el layout).
2. **Tarjeta (listado):** centrar el nombre de la bodega — actualmente descentrado.
3. **Tarjeta (listado):** sustituir el hueco de imagen por la foto de botella completa,
   extraída del dosier corporativo (`demo-data/DOSSIER_BODEGAS_ANDRADE.pdf`).
4. **Tarjeta (listado):** el buscador filtra por uva pero la tarjeta no muestra la
   etiqueta de uva — sin ese dato visible, no se puede confirmar a simple vista que el
   filtro está funcionando correctamente.
5. **Tarjeta (listado), valoración general:** el diseño de tarjeta es demasiado simple,
   necesita revisión visual.
6. **Ficha de vino:** centrar todo el bloque de texto (nombre, bodega, etiquetas) —
   actualmente descentrado.
7. **Ficha de vino:** añadir de fondo el delineado de la casa de campo con viña que
   aparece en cada página del dosier (motivo específico por bodega, decorativo).
8. **Ficha de vino:** usar la misma foto de botella que en la tarjeta del listado, pero
   en mayor calidad/resolución.

(8 notas, agrupables en 6 temas de corrección — número real de anotaciones de Vercel.)

---

## 5. Tarea concreta para Fable

Para cada nota de Edu (§4):
- Verdicto: acertada / acertada con matiz / cuestionable — con el porqué.
- Si "acertada con matiz" o "cuestionable": propuesta alternativa concreta.

Además, de forma independiente (no derivada de las notas de Edu):
- Auditoría de las 2 vistas contra estándar premium del sector (jerarquía visual,
  tipografía, espaciado, uso del color de marca, densidad de información, affordance
  de los botones, consistencia entre vista listado/ficha).
- Máximo 5-8 hallazgos propios nuevos, priorizados por impacto visual percibido en una
  demo que se enseña en persona el 18-jul. No proponer nada que implique backend,
  login, o features fuera del alcance del contrato de demo
  (`demo/CONTRATO_DEMO_V1.md` §2).

## 6. Formato de entrega esperado

Tabla o lista con: `elemento | qué hay ahora (pro/contra) | propuesta | esfuerzo estimado
(bajo/medio/alto para un ajuste de CSS/componente ya existente)`. Nada de mockups
gráficos nuevos — la diseñadora aún no está contratada; son ajustes sobre el código
React/Tailwind ya escrito.

---

## 7. Restricciones

- No implementar nada — esto es auditoría y propuesta, la decisión final es de Edu.
- No añadir precio en ningún hallazgo.
- No proponer cambios de stack.
- Citar el norte del proyecto (§2) si algún hallazgo tienta a añadir complejidad
  innecesaria — descartarlo en ese caso, no proponerlo "por si acaso".

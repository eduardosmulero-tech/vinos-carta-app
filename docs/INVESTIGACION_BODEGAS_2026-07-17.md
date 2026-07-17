# Investigación webs oficiales — Bodegas Andrade y Bodegas Sauci

> **Generado por Hermes** (agente Principal + perfiles explorar/ejecutor) — 2026-07-17
> Proyecto: vinos-carta-app · App de carta de vinos para camareros
> Fuente: webs oficiales `bodegasandrade.net` y `www.bodegassauci.es`
> Ambas bodegas: D.O. Condado de Huelva · Bollullos Par del Condado (Huelva) · NO Utrera

---

## Resumen

Se extrajeron datos REALES de las webs oficiales de ambas bodegas para enriquecer las
fichas de vino de la demo. Catálogo resultante: **Andrade 5 vinos + Sauci 13 vinos = 18 vinos**.

- Andrade: 5 vinos confirmados en la web (no 8 — ver sección "Conteo").
- Sauci: 13 vinos en catálogo. La web NO publica graduación alcohólica ni añada
  en la mayoría de fichas; esos campos quedan vacíos en origen.
- 3 contradicciones internas en las webs (marcar "a confirmar con bodega").

Método: DuckDuckGo Lite (sembrar) + `curl` + `browser_navigate` + `browser_console`
extracción de DOM renderizado. Sin `web_search` (no disponible). Sin datos inventados (R5).

---

## BODEGAS ANDRADE — https://bodegasandrade.net

**Historia:** Bodegueros desde 1885, empresa familiar, +130 años, legado de 6 generaciones.
Dos sedes en Bollullos Par del Condado (Huelva): Bodega Principal (s. XIX) y Bodega Museo
(restaurada 2008). Filosofía: "El vino es nuestra filosofía de vida".

### 1. Castillo de Andrade
- Tipo: Blanco seco · Uva: **Sauvignon Blanc** · DO: Condado de Huelva · **13% Vol.**
- Elaboración: acero inox temp. controlada, vendimia temprana. Servicio 4 ºC.
- Cata — Vista: amarillo pálido, limpio y brillante, matices dorados y verdosos. Nariz:
  flores y frutos tropicales (maracuyá), limón, pomelo, manzana verde. Boca: redondo y
  equilibrado, persistente, acidez marcada.
- Maridaje: mariscos frescos (ostras, almejas, gamba blanca de Huelva), pescados blancos
  (lubina al horno, merluza a la gallega), quesos suaves (fresco, brie).
- Fuente: https://bodegasandrade.net/project/castillo-de-andrade

### 2. Señorío de Andrade
- Tipo: Blanco semidulce · Uva: **Zalema** · DO: Condado de Huelva · **12% Vol.**
- Elaboración: acero inox temp. controlada, vendimia temprana. Servicio 6-8 ºC.
- Cata — Vista: amarillo pálido con reflejos verdosos, limpio y brillante. Nariz: fresco y
  frutal, melocotón maduro, manzana, flores blancas. Boca: entrada suave y delicadamente
  dulce, acidez moderada, final persistente frutal.
- Maridaje: pescados a la plancha (dorada, lenguado), mariscos (mejillones, gambas),
  ensaladas frescas, quesos suaves (cabra fresco), postres ligeros (tarta frutas, mousse limón).
- Fuente: https://bodegasandrade.net/project/senorio-de-andrade

### 3. Niebla Frizzante
- Tipo: Blanco Frizzante semidulce · Uva: ❓ **CONTRADICTORIO** (texto web: Zalema ·
  ficha técnica: Sauvignon Blanc) · Servicio 4-5 ºC.
- Elaboración: fermentación en acero inox temp. controlada (carbónico de la fermentación).
- Cata — Vista: amarillo con reflejos dorados, limpio y brillante. Nariz: afrutado, matices
  florales, notas amieladas. Boca: abocado y refrescante, cuerpo ligero y glicérico.
- Maridaje: aperitivos, recetas orientales, ahumados (salmón, bacalao), risottos, ensaladas
  templadas.
- Fuente: https://bodegasandrade.net/project/niebla-frizzante
- ⚠️ El botón "DESCARGAR FICHA" apunta a /espacios (enoturismo), NO a un PDF. No hay
  fuente jerárquica que dirima la contradicción de uva → marcar "a confirmar con bodega".

### 4. Vino Naranja
- Tipo: Vino aromatizado dulce (DOP Vino Naranja del Condado de Huelva) · Uvas: **Zalema y
  Pedro Ximénez** · **15% Vol.**
- Elaboración: maceración de vino blanco con cáscaras de naranja amarga + envejecimiento en
  barricas roble mín. 2 años (criaderas y soleras). Servicio 8-12 ºC.
- Cata — Vista: teja a caoba, limpio y brillante. Nariz: cítricos (naranja amarga), frutos
  secos, canela, higos, notas de crianza. Boca: dulce y equilibrado, cítricos, final
  ligeramente amargo.
- Maridaje: aperitivos (aceitunas, frutos secos, quesos curados); postres (chocolate negro,
  tartas fruta); cócteles.
- Nota: mencionado por Juan Ramón Jiménez en *Platero y yo* (1908).
- Fuente: https://bodegasandrade.net/project/vino-naranja

### 5. Rosario (Vermut)
- Tipo: **Vermut** · Base: vino dulce de uva **Pedro Ximénez** pasificada · **13% Vol.**
- Cata — Vista: caoba oscuro con reflejos ámbar. Nariz: frutos secos (pasas, higos),
  caramelo, miel, hierbas aromáticas del vermut. Boca: entrada dulce y sedosa, textura
  viscosa, fruta pasificada/miel/especias, amargura final.
- Maridaje: solo con hielo o en cócteles; aperitivos (aceitunas rellenas, queso azul,
  embutidos ibéricos); postres (chocolate negro, tarta queso con mermelada frutos rojos).
- Fuente: https://bodegasandrade.net/project/rosario

### Conteo de botellas en la web de Andrade
- **5 vinos reales** en el menú "Vinos" y en la home (slug grep confirma solo esas 5).
- "Vermut" no es una 6ª botella: es el nombre del producto **Rosario** (su ficha dice
  TIPO Vermut).
- Badge "Vinos 3" del tema es un contador genérico (igual que "Bonos Regalo 3"), no conteo real.
- Página "Minibotellas" (`/minibotellas/`) está **vacía** — no hay formatos de 37,5cl.
- Conclusión: la web lista **5 referencias**. El usuario vio 4 (falta Rosario) y la demo
  tiene 8 (externo a la web).

---

## BODEGAS SAUCI — https://www.bodegassauci.es

**Historia:** "Vinos del Condado de Huelva desde 1925". 3ª generación dirigida por las
hermanas Sauci (Montserrat y Begoña). Única bodega acogida a D.O. Condado de Huelva que
saca toda su producción embotellada. Referente en crianza biológica bajo velo de flor.
Bollullos Par del Condado (puerta de Doñana). Manuel Sauci fue pionero en embotellado.

> ⚠️ Sauci NO publica graduación ni añada en las fichas de producto (salvo Tinto Crianza).
> Campos `grado` vacíos donde no aparezcan.

### Blancos
- **Sauci Blanco Joven** (`/sauci-blanco-joven/`): blanco seco joven, **Zalema 100%**,
  vendimia temprana, acero inox. Cata: amarillo pajizo brillante reflejos verdosos; manzana
  verde, floral, hierbas frescas; acidez muy viva. Maridaje: arroces, pescados, mariscos,
  fritos, mojama, jamón.
- **Sauci Blanco Semidulce** (`/sauci-blanco-semidulce/`): blanco semidulce, **Zalema 100%**,
  vendimia tardía, acero inox. Cata: amarillo pajizo; manzanas maduras, piña, herbáceo; boca
  envolvente ligeramente dulce. Maridaje: pastas, ahumados, ensaladas, arroces, mariscos,
  foies, quesos suaves, pescados grasos.

### Generosos
- **Fino eSpinapura** (`/fino-espinapura/`): Fino, **Listán del Condado**, crianza biológica
  bajo velo de flor ~4 años en botas roble americano (Soleras y Criaderas). Cata: dorado
  pajizo claro; almendra, mineral, salino, masa de pan; seco punzante ligeramente amargo.
  Maridaje: aperitivo, jamón, quesos, aceitunas, mojama; mariscos, alcachofas, espárragos,
  ceviches. (Estandarte de la bodega, creado por Manuel Sauci.)
- **Fino Cruzado eSpinapura** (`/fino-cruzado-espinapura-cruzado/`): Fino ed. limitada,
  botellas numeradas, **Listán del Condado**, cruce de 2 criaderas, 2 sacas/año. Cata: dorado
  pálido toques verdosos; salino a mar/algas, levadura, almendra; ligero, fresco, final
  salino-amargo. Maridaje: muy versátil, idóneo para cocina de fusión; muy frío.
- **Amontillado Sauci** (`/amontillado-sauci/`): Amontillado (generoso), **Zalema 100%**.
  Crianza: bota roble americano, criaderas y solera; doble (biológica + oxidativa). Cata:
  topacio ambarino brillante; levadura, flor, panadería, frutos secos (avellanas, nueces),
  tabaco, tostados, roble; envolvente y seco, amargo típico, salinidad, postgusto prolongado.
  Maridaje: alcachofas, espárragos, vinagre; sopas, carnes blancas braceadas, caza, pescados
  grasos, ahumados, quesos azules/curados; chocolate/cacao puro. Servicio 12-14 ºC.
- **Palo Cortado** (`/palo-cortado/`): Palo Cortado (generoso). Uva: ⚠️ NO indicada en web.
  Crianza: inicio biológica que no se desarrolla, se encabeza y pasa a oxidativa; roble
  americano, criaderas y solera. Cata: castaño con toques dorados/cobrizos; levaduras de pan,
  tabaco, maderas nobles, avellana; contundente y potente pero elegante, seco, amargo,
  chocolate negro, untuoso, persistente. Maridaje: atún rojo, ahumados, condimentados,
  quesos curados/cabrales; meditación. Servicio 12-14 ºC.
- **Oloroso Riodiel** (`/oloroso-riodiel/`): Oloroso (generoso) seco, **Listán de Huelva**.
  Crianza oxidativa, solera de 1980, botas roble americano. Cata: caoba con destellos
  yodo/ámbar/oliváceo; espirituoso/brandy, frutos secos (nuez), regaliz, tostados, café,
  vainilla; seco, potente, sabroso, chocolate negro, regaliz, nueces, larga persistencia.
  Maridaje: quesos muy curados, jamón, chacinas, frutos secos; carnes rojas y caza (jabalí,
  ciervo), guisos especiados (rabo de toro, caldereta, carrillada ibérica); meditación.
- **Cream Sauci** (`/oloroso-cream-sauci/`): Cream (generoso de licor) dulce. Uva: Oloroso
  **Listán de Huelva** + vino dulce **Pedro Ximénez**. Crianza: mezcla Oloroso+PX, ambos
  oxidativa en botas/bocoyes roble americano. Cata: caoba oscuro brillante; fruta madura
  intensa (higos, dátiles, pasas), maderas ahumadas, cacao, frutos secos (nueces); entrada
  suave aterciopelada, denso, sabroso, retrogusto limpio y largo. Maridaje: aperitivo con
  quesos o foie, postres y hojaldres; cocina de fusión, asiática, especiada; cóctel con
  hielo y naranja.

### Tinto
- **Sauci Tinto Crianza** (`/sauci-tinto-crianza/`): tinto crianza. **Grado 13% Vol.**
  **Añada 2019** (ficha técnica; el texto narrativo dice "2018" como nombre del proyecto —
  usar 2019). **Uva: 50% Syrah – 50% Tempranillo**. 12 meses barrica roble americano +
  afinado en botella hasta 2 años totales; sin filtrar/clarificar. Cata: capa media-alta
  cereza ribete violáceo; frutos bosque maduros, mermelada, coco, vainilla, especias,
  tostados; cuerpo, vigoroso pero suave, tanino sublime, salinidad atlántica, postgusto largo.
  PVP 12,90 €.

### Dulce / Naranja / Vermut
- **Vino Dulce (S' Vino Dulce)** (`/vino-dulce/`): vino dulce. Uva: ⚠️ NO especificada (mosto
  de vendimia tardía). Elaboración: fermentación paralizada con alcohol vínico; crianza
  oxidativa en botas roble americano, media de 10 años. Cata: caoba, lágrima amplia y densa;
  frutal, higos y dátiles; sabroso sin empalagar, aterciopelado. Maridaje: postres, pastas,
  helados, pastelería; aperitivo frío con frutos secos o quesos; solomillo al vino dulce.
- **Vino S' Naranja** (`/vino-naranja/`): Vino Naranja DOP. ❓ Uva: **Pedro Ximénez y Listán
  del Condado / Palomino Fino** (la web duplica el panel Ficha y discrepa: Listán vs Palomino
  como segunda uva → marcar "a confirmar con bodega"). **15% Vol.** Elaboración: maceración
  con piel de naranjas amargas; envejecido >10 años en botas roble americano, criaderas y
  soleras. Cata: ámbar brillante, reflejos miel/naranja/ocre, lágrima lenta y densa; fruta
  escarchada, orejones, ciruelas pasas (PX), cítrico naranja amarga, salino, frutos secos;
  suave, sedoso, fresco, sin empalagar. Maridaje: aperitivo frío con foie, jamón de pato,
  ensaladas agridulces, quesos; chocolates y postres; carnes/pescados con naranja. Siempre frío.
- **S' Vermouth** (`/vermut-s-vermouth/`): Vermut andaluz. Base: **olorosos + Pedro Ximénez**
  + botánicos andaluces/Doñana (romero, mejorana, salvia, clavo, canela, nuez moscada, naranja
  amarga, ajenjo). Crianza por criaderas y soleras. Cata: caoba con reflejos rojizos/naranjas;
  fruta madura dulce + especiado/herbáceo; textura aterciopelada, equilibrio oloroso+PX+ajenjo.
  Maridaje: aperitivo/after-work con hielo y piel de naranja; frutos secos, encurtidos,
  ahumados, berberechos, mejillones.

---

## Contradicciones a consultar a la bodega

| Vino | Campo | Discrepancia en la web | Acción |
|---|---|---|---|
| Niebla Frizzante (Andrade) | Uva | Texto: Zalema · Ficha: Sauvignon Blanc | Confirmar con bodega |
| Vino S' Naranja (Sauci) | Uva (2ª) | Listán del Condado vs Palomino Fino | Confirmar con bodega |
| Sauci Tinto Crianza | Añada | Texto: 2018 · Ficha: 2019 | Usar 2019 (ficha); notar |
| Palo Cortado (Sauci) | Uva | No indicada en web | Dato ausente; consultar si se quiere completar |

---

## Estado de extracción (validado por revisor, 2 iteraciones)

| Hueco original | Estado |
|---|---|
| 7 fichas Sauci sin cata/maridaje | ✅ CERRADO |
| Niebla Frizzante — uva | ❌ ABIERTO (contradictorio; marcar "a confirmar") |
| Tinto Crianza — grado/añada/uva | ✅ CERRADO (grado 13%, uva 50/50 Syrah-Tempranillo, añada 2019) |
| Fino Cruzado — maridaje | ✅ CERRADO |
| Uvas generosos Sauci | ✅ CERRADO + 1 ausente (Palo Cortado sin uva) |
| Nº real vinos Andrade | ✅ CERRADO (5 reales) |

**Veredicto revisor:** el catálogo (Andrade 5 + Sauci 13 = 18 vinos) está listo para cargar
a `app/src/data/` con la condición de marcar las 3 contradicciones como "a confirmar con
bodega" y dejar vacíos los `grado` de las 7 fichas Sauci (no publicados en origen).

---

*Generado por Hermes (Principal + explorar/ejecutor) — 2026-07-17. Sin rastro de IA en
documentos de entrega al cliente; este informe es de trabajo interno.*

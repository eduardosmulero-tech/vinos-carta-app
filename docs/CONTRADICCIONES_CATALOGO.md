# Contradicciones del catálogo — vinos-carta-app

> **Documento de trabajo interno** para que Edu comente con el cuñado.
> Estos datos NO aparecen como "a confirmar" en la UI de la demo.
> Regla aplicada en la app: **manda el material del cuñado** (dosier Andrade +
> tarifas Sauci 2026); los datos de las webs oficiales son solo aditivos.
>
> Reescrito 18-jul tras verificar el PDF real de las tarifas Sauci: **las
> tarifas solo contienen producto, EAN, formato y precio** — no publican ni
> uva ni graduación. Las versiones anteriores de este doc atribuían uvas
> ("Zalema") a las tarifas por error; esas filas se han corregido.

---

## A. Discrepancias dosier Andrade ↔ web bodegasandrade.net

| # | Vino | Campo | Dosier (cuñado) — **lo que muestra la app** | Web oficial |
|---|------|-------|----------------------------------------------|-------------|
| A1 | Castillo de Andrade | Graduación | **12%** | 13% |
| A2 | Señorío de Andrade | Uva | **Chardonnay** | Zalema |
| A3 | Señorío de Andrade | Graduación | **11%** | 12% |
| A4 | Niebla | Uva | **Zalema** | La propia web se contradice: texto "Zalema", ficha técnica "Sauvignon Blanc" |
| A5 | Naranja Andrade | Tipo | **Generoso Dulce** (en la carta se agrupa visualmente con los naranjas por su D.O.P.) | "Vino aromatizado dulce" (DOP Vino Naranja) |
| A6 | Naranja Andrade | Uva | **Zalema** | Zalema y Pedro Ximénez |

## B. Datos Sauci que las tarifas NO publican (la web es la única fuente)

| # | Vino | Campo | Web oficial — **lo que muestra la app** |
|---|------|-------|------------------------------------------|
| B1 | Fino Espinapura | Uva | Listán del Condado |
| B2 | Fino Cruzado | Uva | Listán del Condado |
| B3 | Oloroso Riodiel | Uva | Listán de Huelva |
| B4 | Cream Sauci | Uva | Listán de Huelva y Pedro Ximénez |
| B5 | Tinto Crianza | Graduación / añada | 13% · añada 2019 (el texto de la web dice "2018"; su ficha técnica, 2019) |
| B6 | S' Naranja | Graduación | 15% |

## C. Datos que NINGUNA fuente publica → la app no los muestra

| # | Vino | Campo ausente |
|---|------|----------------|
| C1 | Dulce Sauci | Uva (la web solo dice "mosto de vendimia tardía") |
| C2 | Palo Cortado Sauci | Uva |
| C3 | Vermut S' Vermouth | Uva (la web describe la base: olorosos + PX; va en "Elaboración") |
| C4 | Blanco Seco, Blanco Semidulce, Espinapura, Cruzado, Riodiel, Cream, Dulce, Palo Cortado, Vermut (Sauci) | Graduación (la web no la publica; en V2 estas cifras estaban inventadas y se han retirado) |
| C5 | S' Naranja | Segunda uva: la web duplica el panel de ficha y discrepa (Listán del Condado vs Palomino Fino). La app muestra solo Pedro Ximénez |
| C6 | Fino Palmarejo, Docenañero Cream, Docenañero Oloroso, Pedro Ximénez 1985 (Andrade) | Cata/maridaje (no están en la web; el dosier no trae notas de cata). La app muestra solo su ficha técnica |

---

*Notas para Edu: las discrepancias A1-A6 son esperables entre material comercial
impreso y webs (lo habitual es que la web esté más al día que un PDF). Las C
son la razón de que algunas fichas de la demo tengan menos campos: preferimos
un hueco honesto a un dato inventado que el cuñado no reconocería. Pregunta
útil para la visita: ¿qué fuente manda para cada dato y pueden pasarnos las
fichas técnicas oficiales (PDF) de los vinos que faltan?*

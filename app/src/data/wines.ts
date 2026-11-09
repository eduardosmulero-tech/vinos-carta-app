import type { Wine } from '../types';

/**
 * Fuentes de datos (regla: el material del cuñado MANDA, la web es aditiva):
 * - Andrade: dosier corporativo (tipo, uva, graduación) + web oficial
 *   bodegasandrade.net (cata, maridaje, elaboración, servicio).
 * - Sauci: tarifas 2026 (nombre, tipo, formato) + web oficial
 *   bodegassauci.es (uva, cata, maridaje, elaboración; la web NO publica
 *   graduación salvo Tinto Crianza y S' Naranja).
 * Campos ausentes = la fuente no los publica. No se inventa ninguno.
 * Discrepancias entre fuentes: docs/CONTRADICCIONES_CATALOGO.md
 */
export const wines: Wine[] = [
  // ═══════════════════════════════════════════════════════
  // Bodegas Andrade (8) — dosier corporativo
  // ═══════════════════════════════════════════════════════

  {
    id: 'castillo-de-andrade',
    name: 'Castillo de Andrade',
    winery: 'Bodegas Andrade',
    type: 'Blanco Joven Seco',
    image: '/bottles/castillo-de-andrade.webp',
    grape: 'Sauvignon Blanc',
    region: 'D.O. Condado de Huelva',
    alcohol: 12,
    volume: '75cl',
    cata: {
      vista: 'Amarillo pálido, limpio y brillante, con matices dorados y verdosos.',
      nariz: 'Flores y frutos tropicales (maracuyá), limón, pomelo y manzana verde.',
      boca: 'Redondo y equilibrado, persistente, con acidez marcada.',
    },
    maridaje: [
      'Mariscos frescos (ostras, almejas, gamba blanca de Huelva)',
      'Pescados blancos (lubina al horno, merluza a la gallega)',
      'Quesos suaves (fresco, brie)',
    ],
    elaboracion: 'Acero inoxidable con temperatura controlada, vendimia temprana.',
    servicio: '4 ºC',
  },
  {
    id: 'senorio-de-andrade',
    name: 'Señorío de Andrade',
    winery: 'Bodegas Andrade',
    type: 'Blanco Joven Semidulce',
    image: '/bottles/senorio-de-andrade.webp',
    grape: 'Chardonnay',
    region: 'D.O. Condado de Huelva',
    alcohol: 11,
    volume: '75cl',
    cata: {
      vista: 'Amarillo pálido con reflejos verdosos, limpio y brillante.',
      nariz: 'Fresco y frutal, melocotón maduro, manzana y flores blancas.',
      boca: 'Entrada suave y delicadamente dulce, acidez moderada, final persistente frutal.',
    },
    maridaje: [
      'Pescados a la plancha (dorada, lenguado)',
      'Mariscos (mejillones, gambas)',
      'Ensaladas frescas y quesos suaves (cabra fresco)',
      'Postres ligeros (tarta de frutas, mousse de limón)',
    ],
    elaboracion: 'Acero inoxidable con temperatura controlada, vendimia temprana.',
    servicio: '6-8 ºC',
  },
  {
    id: 'niebla',
    name: 'Niebla',
    winery: 'Bodegas Andrade',
    type: 'Blanco Frizzante Semidulce',
    image: '/bottles/niebla.webp',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 10.5,
    volume: '75cl',
    cata: {
      vista: 'Amarillo con reflejos dorados, limpio y brillante.',
      nariz: 'Afrutado, con matices florales y notas amieladas.',
      boca: 'Abocado y refrescante, cuerpo ligero y glicérico.',
    },
    maridaje: [
      'Aperitivos',
      'Recetas orientales',
      'Ahumados (salmón, bacalao)',
      'Risottos y ensaladas templadas',
    ],
    elaboracion:
      'Fermentación en acero inoxidable con temperatura controlada (carbónico natural de la fermentación).',
    servicio: '4-5 ºC',
  },
  {
    id: 'fino-palmarejo',
    name: 'Fino Palmarejo',
    winery: 'Bodegas Andrade',
    type: 'Fino en Rama',
    image: '/bottles/fino-palmarejo.webp',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 15,
    volume: '75cl',
  },
  {
    id: 'docenanero-cream',
    name: 'Docenañero Cream',
    winery: 'Bodegas Andrade',
    type: 'Generoso de Licor',
    image: '/bottles/docenanero-cream.webp',
    grape: 'Zalema y Pedro Ximénez',
    region: 'D.O. Condado de Huelva',
    alcohol: 18,
    volume: '75cl',
  },
  {
    id: 'docenanero-oloroso',
    name: 'Docenañero Oloroso',
    winery: 'Bodegas Andrade',
    type: 'Generoso de Licor',
    image: '/bottles/docenanero-oloroso.webp',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 18,
    volume: '75cl',
  },
  {
    id: 'naranja-andrade',
    name: 'Naranja Andrade',
    winery: 'Bodegas Andrade',
    type: 'Generoso Dulce',
    family: 'Naranja',
    image: '/bottles/naranja-andrade.webp',
    grape: 'Zalema',
    region: 'D.O.P. Vino Naranja del Condado de Huelva',
    alcohol: 15,
    volume: '75cl',
    cata: {
      vista: 'De teja a caoba, limpio y brillante.',
      nariz: 'Cítricos (naranja amarga), frutos secos, canela, higos y notas de crianza.',
      boca: 'Dulce y equilibrado, cítricos, con un final ligeramente amargo.',
    },
    maridaje: [
      'Aperitivos (aceitunas, frutos secos, quesos curados)',
      'Postres (chocolate negro, tartas de fruta)',
      'Cócteles',
    ],
    elaboracion:
      'Maceración de vino blanco con cáscaras de naranja amarga y envejecimiento en barricas de roble un mínimo de 2 años por criaderas y soleras. Mencionado por Juan Ramón Jiménez en Platero y yo (1908).',
    servicio: '8-12 ºC',
  },
  {
    id: 'pedro-ximenez-1985',
    name: 'Pedro Ximénez 1985',
    winery: 'Bodegas Andrade',
    type: 'Generoso Dulce',
    image: '/bottles/pedro-ximenez-1985.webp',
    grape: 'Pedro Ximénez',
    region: 'D.O. Condado de Huelva',
    alcohol: 15,
    volume: '75cl',
  },

  // ═══════════════════════════════════════════════════════
  // Bodegas Sauci (11) — tarifas 2026
  // ═══════════════════════════════════════════════════════

  {
    id: 'blanco-seco-sauci',
    name: 'Blanco Seco Sauci',
    winery: 'Bodegas Sauci',
    type: 'Blanco Seco',
    image: '/bottles/blanco-seco-sauci.webp',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Amarillo pajizo brillante con reflejos verdosos.',
      nariz: 'Manzana verde, floral y hierbas frescas.',
      boca: 'Acidez muy viva, fresco y equilibrado.',
    },
    maridaje: ['Arroces', 'Pescados y mariscos', 'Fritos, mojama y jamón'],
    elaboracion: 'Vendimia temprana, acero inoxidable.',
  },
  {
    id: 'blanco-semidulce-sauci',
    name: 'Blanco Semidulce Sauci',
    winery: 'Bodegas Sauci',
    type: 'Blanco Semidulce',
    image: '/bottles/blanco-semidulce-sauci.webp',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Amarillo pajizo.',
      nariz: 'Manzanas maduras, piña y herbáceo.',
      boca: 'Boca envolvente, ligeramente dulce.',
    },
    maridaje: [
      'Pastas',
      'Ahumados y ensaladas',
      'Arroces y mariscos',
      'Foies y quesos suaves',
      'Pescados grasos',
    ],
    elaboracion: 'Vendimia tardía, acero inoxidable.',
  },
  {
    id: 'tinto-crianza-sauci',
    name: 'Tinto Crianza Sauci',
    winery: 'Bodegas Sauci',
    type: 'Tinto Crianza',
    image: '/bottles/tinto-crianza-sauci.webp',
    grape: 'Syrah y Tempranillo',
    region: 'D.O. Condado de Huelva',
    alcohol: 13,
    volume: '75cl',
    cata: {
      vista: 'Capa media-alta, cereza con ribete violáceo.',
      nariz: 'Frutos del bosque maduros, mermelada, coco, vainilla, especias y tostados.',
      boca: 'Con cuerpo, vigoroso pero suave, tanino sublime, salinidad atlántica y postgusto largo.',
    },
    maridaje: ['Carnes a la brasa', 'Guisos especiados', 'Quesos semicurados'],
    elaboracion:
      '50% Syrah – 50% Tempranillo. 12 meses en barrica de roble americano y afinado en botella hasta 2 años. Sin filtrar ni clarificar. Añada 2019.',
  },
  {
    id: 'fino-espinapura',
    name: 'Fino Espinapura',
    winery: 'Bodegas Sauci',
    type: 'Fino',
    image: '/bottles/fino-espinapura.webp',
    grape: 'Listán del Condado',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Dorado pajizo claro.',
      nariz: 'Almendra, mineral, salino y masa de pan.',
      boca: 'Seco, punzante, ligeramente amargo.',
    },
    maridaje: [
      'Aperitivo con jamón, quesos, aceitunas y mojama',
      'Mariscos, alcachofas, espárragos y ceviches',
    ],
    elaboracion:
      'Crianza biológica bajo velo de flor ~4 años en botas de roble americano (soleras y criaderas). Estandarte de la bodega, creado por Manuel Sauci.',
  },
  {
    id: 'fino-cruzado',
    name: 'Fino Cruzado',
    winery: 'Bodegas Sauci',
    type: 'Fino Cruzado',
    image: '/bottles/fino-cruzado.webp',
    grape: 'Listán del Condado',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Dorado pálido con toques verdosos.',
      nariz: 'Salino a mar y algas, levadura y almendra.',
      boca: 'Ligero, fresco, con final salino-amargo.',
    },
    maridaje: ['Muy versátil, idóneo para cocina de fusión'],
    elaboracion:
      'Edición limitada con botellas numeradas. Cruce de 2 criaderas, 2 sacas al año.',
    servicio: 'Muy frío',
  },
  {
    id: 'oloroso-riodiel',
    name: 'Oloroso Riodiel',
    winery: 'Bodegas Sauci',
    type: 'Oloroso',
    image: '/bottles/oloroso-riodiel.webp',
    grape: 'Listán de Huelva',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Caoba con destellos yodo, ámbar y oliváceo.',
      nariz: 'Espirituoso, brandy, frutos secos (nuez), regaliz, tostados, café y vainilla.',
      boca: 'Seco, potente, sabroso, chocolate negro, regaliz, nueces y larga persistencia.',
    },
    maridaje: [
      'Quesos muy curados, jamón, chacinas y frutos secos',
      'Carnes rojas y caza (jabalí, ciervo)',
      'Guisos especiados (rabo de toro, caldereta, carrillada ibérica)',
      'Vino de meditación',
    ],
    elaboracion: 'Crianza oxidativa, solera de 1980, botas de roble americano.',
  },
  {
    id: 'cream-sauci',
    name: 'Cream Sauci',
    winery: 'Bodegas Sauci',
    type: 'Cream',
    image: '/bottles/cream-sauci.webp',
    grape: 'Listán de Huelva y Pedro Ximénez',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Caoba oscuro brillante.',
      nariz: 'Fruta madura intensa (higos, dátiles, pasas), maderas ahumadas, cacao y frutos secos (nueces).',
      boca: 'Entrada suave y aterciopelada, denso, sabroso, con retrogusto limpio y largo.',
    },
    maridaje: [
      'Aperitivo con quesos o foie',
      'Postres y hojaldres',
      'Cocina de fusión, asiática y especiada',
      'Cóctel con hielo y naranja',
    ],
    elaboracion:
      'Mezcla de Oloroso Listán de Huelva + vino dulce Pedro Ximénez, ambos con crianza oxidativa en botas y bocoyes de roble americano.',
  },
  {
    id: 'dulce-sauci',
    name: 'Dulce Sauci',
    winery: 'Bodegas Sauci',
    type: 'Dulce',
    image: '/bottles/dulce-sauci.webp',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Caoba, con lágrima amplia y densa.',
      nariz: 'Frutal, higos y dátiles.',
      boca: 'Sabroso sin empalagar, aterciopelado.',
    },
    maridaje: [
      'Postres, pastas, helados y pastelería',
      'Aperitivo frío con frutos secos o quesos',
      'Solomillo al vino dulce',
    ],
    elaboracion:
      'Mosto de vendimia tardía, fermentación paralizada con alcohol vínico. Crianza oxidativa en botas de roble americano, media de 10 años.',
  },
  {
    id: 'palo-cortado-sauci',
    name: 'Palo Cortado Sauci',
    winery: 'Bodegas Sauci',
    type: 'Palo Cortado',
    image: '/bottles/palo-cortado-sauci.webp',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Castaño con toques dorados y cobrizos.',
      nariz: 'Levaduras de pan, tabaco, maderas nobles y avellana.',
      boca: 'Contundente y potente pero elegante, seco, amargo, chocolate negro, untuoso y persistente.',
    },
    maridaje: [
      'Atún rojo',
      'Ahumados y condimentados',
      'Quesos curados y cabrales',
      'Vino de meditación',
    ],
    elaboracion:
      'Crianza inicial biológica que no se desarrolla, se encabeza y pasa a oxidativa. Roble americano, criaderas y solera.',
    servicio: '12-14 ºC',
  },
  {
    id: 'vino-naranja-s-naranja',
    name: "Vino Naranja S' Naranja",
    winery: 'Bodegas Sauci',
    type: 'Naranja',
    image: '/bottles/vino-naranja-s-naranja.webp',
    grape: 'Pedro Ximénez',
    region: 'D.O.P. Vino Naranja del Condado de Huelva',
    alcohol: 15,
    volume: '50cl',
    cata: {
      vista: 'Ámbar brillante, reflejos miel, naranja y ocre, lágrima lenta y densa.',
      nariz: 'Fruta escarchada, orejones, ciruelas pasas (PX), cítrico de naranja amarga, salino y frutos secos.',
      boca: 'Suave, sedoso, fresco, sin empalagar.',
    },
    maridaje: [
      'Aperitivo frío con foie, jamón de pato y ensaladas agridulces',
      'Quesos',
      'Chocolates y postres',
      'Carnes y pescados con naranja',
    ],
    elaboracion:
      'Maceración con piel de naranjas amargas, envejecido más de 10 años en botas de roble americano, criaderas y soleras.',
    servicio: 'Siempre frío',
  },
  {
    id: 'vermut-s-vermouth',
    name: "Vermut S' Vermouth",
    winery: 'Bodegas Sauci',
    type: 'Vermut',
    image: '/bottles/vermut-s-vermouth.webp',
    region: 'D.O. Condado de Huelva',
    volume: '75cl',
    cata: {
      vista: 'Caoba con reflejos rojizos y naranjas.',
      nariz: 'Fruta madura dulce más especiado y herbáceo.',
      boca: 'Textura aterciopelada, equilibrio oloroso + PX + ajenjo.',
    },
    maridaje: [
      'Aperitivo / after-work con hielo y piel de naranja',
      'Frutos secos y encurtidos',
      'Ahumados, berberechos y mejillones',
    ],
    elaboracion:
      'Base de olorosos + Pedro Ximénez + botánicos andaluces y de Doñana (romero, mejorana, salvia, clavo, canela, nuez moscada, naranja amarga, ajenjo). Crianza por criaderas y soleras.',
  },
];

export default wines;

import type { Wine } from '../types';

export const wines: Wine[] = [
  // --- Bodegas Andrade (8) ---
  {
    id: 'niebla',
    name: 'Niebla',
    winery: 'Bodegas Andrade',
    type: 'Blanco Frizzante Semidulce',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 10.5,
    volume: '75cl',
    description:
      'Blanco con aguja elaborado con la variedad autóctona Zalema. En nariz es fresco, ' +
      'con notas de fruta blanca y un fondo cítrico. En boca resulta ligero y ligeramente ' +
      'dulce, muy fácil de beber como aperitivo o con pescados y mariscos.',
  },
  {
    id: 'senorio-de-andrade',
    name: 'Señorío de Andrade',
    winery: 'Bodegas Andrade',
    type: 'Blanco Joven Semidulce',
    grape: 'Chardonnay',
    region: 'D.O. Condado de Huelva',
    alcohol: 11.0,
    volume: '75cl',
    description:
      'Blanco joven de Chardonnay con un punto de dulzor bien integrado. Aromas de manzana ' +
      'madura y flor blanca, con paso de boca suave y untuoso. Buen compañero de arroces, ' +
      'ensaladas y quesos frescos.',
  },
  {
    id: 'castillo-de-andrade',
    name: 'Castillo de Andrade',
    winery: 'Bodegas Andrade',
    type: 'Blanco Joven Seco',
    grape: 'Sauvignon Blanc',
    region: 'D.O. Condado de Huelva',
    alcohol: 12.0,
    volume: '75cl',
    description:
      'Sauvignon Blanc seco de perfil aromático marcado: hierba fresca, lima y fruta de la ' +
      'pasión. En boca es vivo, con acidez bien definida y final limpio. Recomendado con ' +
      'pescado blanco, verduras a la plancha y aperitivos salados.',
  },
  {
    id: 'fino-palmarejo',
    name: 'Fino Palmarejo',
    winery: 'Bodegas Andrade',
    type: 'Fino en Rama',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 15.0,
    volume: '75cl',
    description:
      'Fino en rama criado bajo velo de flor, embotellado sin apenas clarificar para ' +
      'conservar toda su expresión. Punzante en nariz, con recuerdos de almendra y masa ' +
      'de pan. Seco y salino en boca, ideal con jamón ibérico, aceitunas y frituras de pescado.',
  },
  {
    id: 'docenanero-cream',
    name: 'Docenañero Cream',
    winery: 'Bodegas Andrade',
    type: 'Generoso de Licor',
    grape: 'Zalema + PX',
    region: 'D.O. Condado de Huelva',
    alcohol: 18.0,
    volume: '75cl',
    description:
      'Generoso de licor que combina la crianza oxidativa de la Zalema con la dulzura del ' +
      'Pedro Ximénez. Color caoba y aromas de pasas, nuez y caramelo. Dulce y envolvente, ' +
      'perfecto con postres, foie o quesos azules.',
  },
  {
    id: 'docenanero-oloroso',
    name: 'Docenañero Oloroso',
    winery: 'Bodegas Andrade',
    type: 'Generoso de Licor',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 18.0,
    volume: '75cl',
    description:
      'Oloroso de larga crianza oxidativa, con color ámbar oscuro y aromas de fruto seco ' +
      'tostado, madera noble y especias. Seco y potente en boca, con final largo. Marida ' +
      'con carnes rojas, caza y quesos curados.',
  },
  {
    id: 'naranja-andrade',
    name: 'Naranja Andrade',
    winery: 'Bodegas Andrade',
    type: 'Generoso Dulce',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 15.0,
    volume: '75cl',
    description:
      'Vino naranja tradicional del Condado, macerado con cortezas de naranja amarga. ' +
      'Aromas cítricos intensos sobre un fondo de crianza. Dulce y aromático, se sirve ' +
      'muy frío como aperitivo o con postres de chocolate.',
  },
  {
    id: 'pedro-ximenez-1985',
    name: 'Pedro Ximénez 1985',
    winery: 'Bodegas Andrade',
    type: 'Generoso Dulce',
    grape: 'Pedro Ximénez',
    region: 'D.O. Condado de Huelva',
    alcohol: 15.0,
    volume: '75cl',
    description:
      'Pedro Ximénez de uva asoleada y crianza prolongada en bota. Color ébano y aromas ' +
      'concentrados de higo, pasa y café. Muy dulce y denso, con final interminable. ' +
      'Clásico con helado de vainilla, chocolate negro o simplemente solo.',
  },

  // --- Bodegas Sauci (11) ---
  {
    id: 'blanco-seco-sauci',
    name: 'Blanco Seco Sauci',
    winery: 'Bodegas Sauci',
    type: 'Blanco Seco',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 12.0,
    volume: '75cl',
    description:
      'Blanco joven de Zalema vinificado en seco. Nariz limpia, con fruta blanca y un ' +
      'toque floral. En boca es fresco y equilibrado, con final ligeramente amargo muy ' +
      'propio de la variedad. Para aperitivo, pescados y arroces.',
  },
  {
    id: 'blanco-semidulce-sauci',
    name: 'Blanco Semidulce Sauci',
    winery: 'Bodegas Sauci',
    type: 'Blanco Semidulce',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 11.5,
    volume: '75cl',
    description:
      'Zalema con azúcar residual que le da un perfil goloso y accesible. Aromas de ' +
      'melocotón y cítricos maduros. Suave en boca, muy agradable frío con arroces, ' +
      'cocina asiática o como copa de bienvenida.',
  },
  {
    id: 'tinto-crianza-sauci',
    name: 'Tinto Crianza Sauci',
    winery: 'Bodegas Sauci',
    type: 'Tinto Crianza',
    grape: 'Syrah',
    region: 'D.O. Condado de Huelva',
    alcohol: 13.5,
    volume: '75cl',
    description:
      'Syrah con crianza en barrica de roble. Color cereza intenso y aromas de fruta ' +
      'roja madura, pimienta negra y vainilla. Taninos pulidos y final especiado. ' +
      'Acompaña carnes a la brasa, guisos y quesos semicurados.',
  },
  {
    id: 'fino-espinapura',
    name: 'Fino Espinapura',
    winery: 'Bodegas Sauci',
    type: 'Fino',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 15.0,
    volume: '75cl',
    description:
      'Fino clásico criado bajo velo de flor en el Condado. Nariz punzante con almendra ' +
      'amarga y levadura. Seco, ligero y con recuerdo salino en el final. Se sirve frío ' +
      'con jamón, embutido ibérico y pescaíto frito.',
  },
  {
    id: 'fino-cruzado',
    name: 'Fino Cruzado',
    winery: 'Bodegas Sauci',
    type: 'Fino Cruzado',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 15.5,
    volume: '75cl',
    description:
      'Fino que ha perdido parte del velo de flor y sigue crianza oxidativa, a medio ' +
      'camino entre el fino y el amontillado. Aromas de avellana y madera vieja sobre ' +
      'fondo punzante. Seco y con más cuerpo que un fino joven; ideal con caldos, ' +
      'quesos curados y setas.',
  },
  {
    id: 'oloroso-riodiel',
    name: 'Oloroso Riodiel',
    winery: 'Bodegas Sauci',
    type: 'Oloroso',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 18.0,
    volume: '75cl',
    description:
      'Oloroso de crianza oxidativa, color ámbar y aromas de nuez, cuero y especias ' +
      'dulces. Seco, amplio y persistente en boca. Buen acompañante de carnes de caza, ' +
      'estofados y quesos añejos.',
  },
  {
    id: 'cream-sauci',
    name: 'Cream Sauci',
    winery: 'Bodegas Sauci',
    type: 'Cream',
    grape: 'Zalema + PX',
    region: 'D.O. Condado de Huelva',
    alcohol: 17.0,
    volume: '75cl',
    description:
      'Cabeceo de oloroso con Pedro Ximénez que da un generoso dulce y untuoso. Notas de ' +
      'pasa, toffee y frutos secos tostados. Dulce pero con el punto amargo de la crianza; ' +
      'se disfruta con postres, foie o quesos azules.',
  },
  {
    id: 'dulce-sauci',
    name: 'Dulce Sauci',
    winery: 'Bodegas Sauci',
    type: 'Dulce',
    grape: 'Pedro Ximénez',
    region: 'D.O. Condado de Huelva',
    alcohol: 15.0,
    volume: '75cl',
    description:
      'Pedro Ximénez de uva soleada, con aromas intensos de higo seco, dátil y miel. ' +
      'Denso y muy dulce en boca, con final largo. Combina con repostería, helados y ' +
      'chocolate negro.',
  },
  {
    id: 'palo-cortado-sauci',
    name: 'Palo Cortado Sauci',
    winery: 'Bodegas Sauci',
    type: 'Palo Cortado',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 19.0,
    volume: '75cl',
    description:
      'Vino singular y escaso: reúne la finura aromática del amontillado con el cuerpo ' +
      'del oloroso. Aromas complejos de avellana, barniz y cáscara de naranja. Seco, ' +
      'elegante y muy persistente. Para carnes curadas, consomés y quesos viejos.',
  },
  {
    id: 'vino-naranja-s-naranja',
    name: "Vino Naranja S' Naranja",
    winery: 'Bodegas Sauci',
    type: 'Naranja',
    grape: 'Zalema',
    region: 'D.O. Condado de Huelva',
    alcohol: 15.0,
    volume: '50cl',
    description:
      'Vino de licor macerado con piel de naranja, especialidad del Condado de Huelva. ' +
      'Aroma cítrico y goloso, con fondo de crianza. Dulce y refrescante servido muy frío, ' +
      'solo o con postres de chocolate y cítricos.',
  },
  {
    id: 'vermut-s-vermouth',
    name: "Vermut S' Vermouth",
    winery: 'Bodegas Sauci',
    type: 'Vermut',
    grape: 'Múltiples variedades',
    region: 'D.O. Condado de Huelva',
    alcohol: 15.0,
    volume: '75cl',
    description:
      'Vermut elaborado sobre base de vino del Condado, macerado con ajenjo, cítricos y ' +
      'una selección de plantas aromáticas. Dulce y balsámico, con el amargor característico ' +
      'en el final. Se sirve con hielo y naranja como aperitivo.',
  },
];

export default wines;

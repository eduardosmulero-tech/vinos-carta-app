import type { WineryInfo } from '../types';

export const wineries: WineryInfo[] = [
  {
    id: 'andrade',
    name: 'Bodegas Andrade',
    lema: 'Bodegueros desde 1885',
    historia:
      'Empresa familiar con más de 130 años de historia y 6 generaciones dedicadas ' +
      'a la elaboración de vinos en Bollullos Par del Condado, corazón de la ' +
      'D.O. Condado de Huelva. Dos sedes: la Bodega Principal del siglo XIX y la ' +
      'Bodega Museo, restaurada en 2008. «El vino es nuestra filosofía de vida».',
    fundacion: 1885,
  },
  {
    id: 'sauci',
    name: 'Bodegas Sauci',
    logo: '/logo-sauci.jpg',
    lema: 'Vinos del Condado desde 1925',
    historia:
      'Tercera generación, dirigida hoy por las hermanas Montserrat y Begoña Sauci. ' +
      'Única bodega acogida a la D.O. Condado de Huelva que saca toda su producción ' +
      'embotellada. Referente en crianza biológica bajo velo de flor. Manuel Sauci fue ' +
      'pionero en el embotellado de los vinos del Condado.',
    fundacion: 1925,
  },
];

export function getWinery(id: string): WineryInfo | undefined {
  return wineries.find((w) => w.id === id);
}

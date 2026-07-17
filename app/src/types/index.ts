export interface WineTasting {
  vista: string;
  nariz: string;
  boca: string;
}

export type WineryName = 'Bodegas Andrade' | 'Bodegas Sauci';

/**
 * Regla de datos: cada campo existe SOLO si su fuente lo publica
 * (dosier/tarifas del cuñado mandan; webs oficiales son aditivas).
 * Nada de valores inventados: por eso grape y alcohol son opcionales.
 */
export interface Wine {
  id: string;
  name: string;
  winery: WineryName;
  /** Tipo literal de la fuente (dosier Andrade / tarifa Sauci) */
  type: string;
  /** Override de familia visual cuando el tipo de la fuente no coincide
   *  con la agrupación de la carta (ej. "Generoso Dulce" → Naranja) */
  family?: string;
  grape?: string;
  region: string;
  alcohol?: number;
  volume: string;
  image: string;
  cata?: WineTasting;
  maridaje?: string[];
  elaboracion?: string;
  servicio?: string;
}

export interface WineryInfo {
  id: string;
  name: WineryName;
  logo?: string;
  lema: string;
  historia: string;
  fundacion: number;
}

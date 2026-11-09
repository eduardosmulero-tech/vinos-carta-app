export interface FamilyStyle {
  family: string;
  tint: string;
}

/**
 * Tintas por familia, calibradas para el entorno oscuro de la bodega:
 * todas ≥6.6:1 como texto sobre #160d10 y ≥5.4:1 con texto ink como relleno
 * (medido en tools/shots-v2/wcag-calculado.json y docs/RETO_V3_2026-07-18.md §3).
 */
export const FAMILY_TINTS: Record<string, string> = {
  Blancos: '#d9c47e',
  Finos: '#d4af5c',
  'Oxidativos secos': '#cf9455',
  Dulces: '#c98a6e',
  Naranja: '#d98e4a',
  Tinto: '#d4808f',
  Vermut: '#d09077',
};

/** Tipos literales de las fuentes → familia de la carta (claves normalizadas) */
const TYPE_TO_FAMILY: Record<string, string> = {
  'blanco joven seco': 'Blancos',
  'blanco frizzante semidulce': 'Blancos',
  'blanco joven semidulce': 'Blancos',
  'blanco seco': 'Blancos',
  'blanco semidulce': 'Blancos',
  fino: 'Finos',
  'fino en rama': 'Finos',
  'fino cruzado': 'Finos',
  oloroso: 'Oxidativos secos',
  'palo cortado': 'Oxidativos secos',
  cream: 'Dulces',
  'generoso de licor': 'Dulces',
  dulce: 'Dulces',
  'generoso dulce': 'Dulces',
  naranja: 'Naranja',
  'tinto crianza': 'Tinto',
  vermut: 'Vermut',
};

const FALLBACK_TINT = '#d09077';

/**
 * Resuelve la familia visual de un vino. `familyOverride` permite que un
 * vino cuyo tipo de fuente no coincide con su familia de carta (ej.
 * Naranja Andrade, "Generoso Dulce" en el dosier) se agrupe donde toca
 * sin alterar el dato original.
 */
export function getFamilyStyle(type: string, familyOverride?: string): FamilyStyle {
  const family =
    familyOverride ?? TYPE_TO_FAMILY[type.trim().toLowerCase()] ?? 'Otros';
  return { family, tint: FAMILY_TINTS[family] ?? FALLBACK_TINT };
}

/**
 * Determina si un color hexadecimal es claro (luminancia > 0.3).
 * Los tints claros necesitan texto oscuro para cumplir WCAG AA.
 */
export function isLightTint(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const linearize = (v: number) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  const L = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  return L > 0.3;
}

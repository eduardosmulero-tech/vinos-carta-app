export interface FamilyStyle {
  family: string;
  tint: string;
}

const FAMILY_MAP: Record<string, FamilyStyle> = {
  // Blancos
  'Blanco Joven Seco': { family: 'Blancos', tint: '#c9b46a' },
  'Blanco Frizzante Semidulce': { family: 'Blancos', tint: '#c9b46a' },
  'Blanco Joven Semidulce': { family: 'Blancos', tint: '#c9b46a' },
  'Blanco Seco': { family: 'Blancos', tint: '#c9b46a' },
  'Blanco Semidulce': { family: 'Blancos', tint: '#c9b46a' },
  // Finos
  Fino: { family: 'Finos', tint: '#b99a45' },
  'Fino en Rama': { family: 'Finos', tint: '#b99a45' },
  'Fino Cruzado': { family: 'Finos', tint: '#b99a45' },
  // Oxidativos secos
  Oloroso: { family: 'Oxidativos secos', tint: '#8a5a2b' },
  'Palo Cortado': { family: 'Oxidativos secos', tint: '#8a5a2b' },
  // Dulces
  Cream: { family: 'Dulces', tint: '#6b3a2a' },
  'Generoso de Licor': { family: 'Dulces', tint: '#6b3a2a' },
  Dulce: { family: 'Dulces', tint: '#6b3a2a' },
  'Generoso Dulce': { family: 'Dulces', tint: '#6b3a2a' },
  // Naranja
  Naranja: { family: 'Naranja', tint: '#b56a2d' },
  // Tinto
  'Tinto Crianza': { family: 'Tinto', tint: '#5d1f2b' },
  // Vermut
  Vermut: { family: 'Vermut', tint: '#7d3b33' },
};

export function getFamilyStyle(type: string): FamilyStyle {
  return (
    FAMILY_MAP[type] ?? {
      family: 'Otros',
      tint: '#73232d',
    }
  );
}

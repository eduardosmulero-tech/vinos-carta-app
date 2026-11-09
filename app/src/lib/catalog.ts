import wines from '../data/wines';
import { getFamilyStyle } from './families';

export interface WinePosition {
  family: string;
  tint: string;
  /** Posición 1-based dentro de su familia en el catálogo completo */
  index: number;
  /** Total de vinos de su familia */
  total: number;
}

/**
 * Numeración editorial estable: posición de cada vino DENTRO de su familia,
 * calculada una sola vez sobre el catálogo completo. No cambia al filtrar
 * ni depende del orden de render (corrige E23/E39 de la auditoría).
 */
const positions = new Map<string, WinePosition>();

{
  const counters = new Map<string, number>();
  for (const w of wines) {
    const { family, tint } = getFamilyStyle(w.type, w.family);
    const next = (counters.get(family) ?? 0) + 1;
    counters.set(family, next);
    positions.set(w.id, { family, tint, index: next, total: 0 });
  }
  for (const pos of positions.values()) {
    pos.total = counters.get(pos.family) ?? 0;
  }
}

export function getWinePosition(id: string): WinePosition | undefined {
  return positions.get(id);
}

/** "01 / 03" con cifras tabulares (se pinta en mono) */
export function formatPosition(pos: WinePosition): string {
  return `${String(pos.index).padStart(2, '0')} / ${String(pos.total).padStart(2, '0')}`;
}

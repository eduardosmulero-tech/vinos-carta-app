import type { ReactNode, CSSProperties } from 'react';

interface BottleStageProps {
  wineId: string;
  /** Tinta de familia para el filete superior del nicho */
  tint: string;
  /** Número de nicho ("Nº 03 · FINOS"), como en una bodega real */
  binLabel?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Expositor de botella — nicho iluminado de la bodega. Toda la escena
 * (panel, viñeta, luz cenital, filete de familia, sombra) vive en la
 * clase CSS `.stage` (un elemento + pseudoelementos, sin divs extra).
 * viewTransitionName hace el morph tarjeta → ficha en Chromium.
 */
function BottleStage({ wineId, tint, binLabel, children, className = '' }: BottleStageProps) {
  return (
    <div
      className={`stage ${className}`}
      style={
        {
          viewTransitionName: `stage-${wineId}`,
          '--stage-tint': tint,
        } as CSSProperties
      }
    >
      {binLabel && (
        <span className="bin-number" aria-hidden="true">
          {binLabel}
        </span>
      )}
      {children}
    </div>
  );
}

export default BottleStage;

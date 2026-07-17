import { Link } from 'react-router-dom';
import type { Wine } from '../types';
import wines from '../data/wines';
import { getFamilyStyle } from '../lib/families';
import BottleStage from './BottleStage';
import Reveal from './Reveal';

interface SimilarWinesProps {
  currentWine: Wine;
}

/**
 * "En la misma estantería": recomendaciones con el porqué visible.
 * En móvil es un estante horizontal con scroll (no una torre de nichos);
 * en pantallas grandes, grid.
 */
function SimilarWines({ currentWine }: SimilarWinesProps) {
  const currentFamily = getFamilyStyle(currentWine.type, currentWine.family);

  /* 1º misma uva, 2º mismo tipo, 3º misma familia — nunca menos de 3 */
  let similar = wines.filter(
    (w) =>
      w.id !== currentWine.id &&
      w.grape !== undefined &&
      w.grape === currentWine.grape
  );

  if (similar.length < 3) {
    const byType = wines.filter(
      (w) =>
        w.id !== currentWine.id &&
        w.type === currentWine.type &&
        !similar.some((s) => s.id === w.id)
    );
    similar = [...similar, ...byType];
  }

  if (similar.length < 3) {
    const byFamily = wines.filter(
      (w) =>
        w.id !== currentWine.id &&
        getFamilyStyle(w.type, w.family).family === currentFamily.family &&
        !similar.some((s) => s.id === w.id)
    );
    similar = [...similar, ...byFamily];
  }

  const displayed = similar.slice(0, 4);
  if (displayed.length === 0) return null;

  return (
    <Reveal as="section" className="mx-auto mt-14 max-w-5xl border-t border-gold/20 pt-10">
      <h2 className="text-center font-display text-2xl font-semibold text-cream">
        En la misma estantería
      </h2>

      <div className="shelf -mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {displayed.map((wine) => {
          const { tint } = getFamilyStyle(wine.type, wine.family);
          const reason =
            wine.grape !== undefined && wine.grape === currentWine.grape
              ? 'misma uva'
              : wine.type === currentWine.type
                ? 'mismo tipo'
                : 'misma familia';

          return (
            <Link
              key={wine.id}
              to={`/wine/${wine.id}`}
              viewTransition
              className="group w-40 flex-shrink-0 snap-start overflow-hidden rounded-[4px] ring-1 ring-white/5 transition-shadow hover:ring-gold/40 active:scale-[0.99] sm:w-auto"
            >
              <BottleStage wineId={wine.id} tint={tint} className="h-36">
                <img
                  src={wine.image}
                  alt={`Botella de ${wine.name}`}
                  loading="lazy"
                  className="stage-bottle h-28 w-auto object-contain"
                />
              </BottleStage>
              <div className="paper px-3 py-3 text-center">
                <p className="truncate font-display text-base font-semibold leading-tight text-ink">
                  {wine.name}
                </p>
                <p className="data-label mt-1.5 truncate text-[9px] text-muted">
                  {wine.winery.toUpperCase()}
                </p>
                <p className="data-label mt-1 text-[9px] text-primary">{reason}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Reveal>
  );
}

export default SimilarWines;

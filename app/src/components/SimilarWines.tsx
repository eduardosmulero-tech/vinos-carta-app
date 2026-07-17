import { Link } from 'react-router-dom';
import type { Wine } from '../types';
import wines from '../data/wines';
import { getFamilyStyle } from '../lib/families';
import BottleSilhouette from './BottleSilhouette';

interface SimilarWinesProps {
  currentWine: Wine;
}

function SimilarWines({ currentWine }: SimilarWinesProps) {
  let similar = wines.filter(
    (w) => w.id !== currentWine.id && w.grape === currentWine.grape
  );

  if (similar.length < 3) {
    const byType = wines.filter(
      (w) =>
        w.id !== currentWine.id &&
        w.type === currentWine.type &&
        !similar.find((s) => s.id === w.id)
    );
    similar = [...similar, ...byType];
  }

  const displayed = similar.slice(0, 4);

  if (displayed.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-line pt-8">
      <h2 className="mb-4 font-display text-2xl font-semibold text-ink">Vinos similares</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayed.map((wine) => {
          const familyStyle = getFamilyStyle(wine.type);
          const reason =
            wine.grape === currentWine.grape ? 'misma uva' : 'mismo tipo';
          const initial = wine.name.charAt(0).toUpperCase();

          return (
            <Link
              key={wine.id}
              to={`/wine/${wine.id}`}
              viewTransition
              className="group flex items-center gap-3 overflow-hidden rounded-lg border border-line bg-surface p-3 transition-shadow hover:shadow-md active:scale-[0.99]"
            >
              <div
                className="h-24 w-16 flex-shrink-0 rounded bg-bg p-1"
                style={{ borderTop: `2px solid ${familyStyle.tint}` }}
              >
                {wine.image ? (
                  <img
                    src={wine.image}
                    alt={`Botella de ${wine.name}`}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <BottleSilhouette
                    tint={familyStyle.tint}
                    initial={initial}
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-ink">
                  {wine.name}
                </p>
                <p className="truncate text-xs text-muted">{wine.winery}</p>
                <p className="mt-1 text-xs font-semibold" style={{ color: familyStyle.tint }}>
                  {reason}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default SimilarWines;

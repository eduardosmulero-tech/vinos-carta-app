import { Link } from 'react-router-dom';
import type { Wine } from '../types';
import wines from '../data/wines';

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
    <section className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="mb-4 text-xl font-bold text-text">Vinos similares</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayed.map((wine) => (
          <Link
            key={wine.id}
            to={`/wine/${wine.id}`}
            className="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="font-bold text-text">{wine.name}</p>
            <p className="mt-1 text-sm text-gray-500">{wine.winery}</p>
            <p className="mt-1 text-sm font-semibold text-primary">{wine.grape}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SimilarWines;

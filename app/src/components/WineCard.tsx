import { Link } from 'react-router-dom';
import type { Wine } from '../types';

interface WineCardProps {
  wine: Wine;
}

function WineCard({ wine }: WineCardProps) {
  return (
    <Link
      to={`/wine/${wine.id}`}
      aria-labelledby={`wine-name-${wine.id}`}
      className="block rounded-lg bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 id={`wine-name-${wine.id}`} className="text-lg font-bold text-text">{wine.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{wine.winery}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {wine.type}
        </span>
      </div>
      <p className="mt-3 text-lg font-semibold text-primary">{wine.grape}</p>
      <div className="mt-4">
        <span className="inline-block rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dk">
          Ver más
        </span>
      </div>
    </Link>
  );
}

export default WineCard;

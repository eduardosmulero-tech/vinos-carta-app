import { Link } from 'react-router-dom';
import type { Wine } from '../types';
import { getFamilyStyle } from '../lib/families';
import BottleSilhouette from './BottleSilhouette';
import Highlight from './Highlight';

interface WineCardProps {
  wine: Wine;
  showWinery?: boolean;
  searchQuery?: string;
}

function WineCard({ wine, showWinery = true, searchQuery = '' }: WineCardProps) {
  const familyStyle = getFamilyStyle(wine.type);
  const initial = wine.name.charAt(0).toUpperCase();

  return (
    <Link
      to={`/wine/${wine.id}`}
      viewTransition
      aria-labelledby={`wine-name-${wine.id}`}
      className="group block overflow-hidden rounded-lg border border-line bg-surface text-center shadow-sm transition-shadow hover:shadow-md active:scale-[0.99] active:shadow-none"
    >
      {/* Filete superior en tinta de familia */}
      <div className="h-0.5" style={{ backgroundColor: familyStyle.tint }} />

      {/* Zona de imagen */}
      <div className="flex h-48 items-center justify-center bg-bg px-4 py-5">
        {wine.image ? (
          <img
            src={wine.image}
            alt={`Botella de ${wine.name}`}
            loading="lazy"
            className="h-full w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            style={{ viewTransitionName: `bottle-${wine.id}` }}
          />
        ) : (
          <BottleSilhouette
            tint={familyStyle.tint}
            initial={initial}
            className="h-36 w-auto"
          />
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3
          id={`wine-name-${wine.id}`}
          className="font-display text-xl font-semibold leading-tight text-ink"
        >
          <Highlight text={wine.name} query={searchQuery} />
        </h3>

        {showWinery && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
            <Highlight text={wine.winery} query={searchQuery} />
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span
            className="rounded px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: familyStyle.tint }}
          >
            <Highlight text={wine.type} query={searchQuery} />
          </span>
          <span className="rounded border border-primary/40 px-2.5 py-1 text-xs font-semibold text-primary">
            UVA · <Highlight text={wine.grape.toUpperCase()} query={searchQuery.toUpperCase()} />
          </span>
        </div>

        <div className="mt-5">
          <span className="inline-flex min-h-11 items-center rounded border border-primary px-4 text-sm font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-white active:bg-primary-dk">
            Ver ficha
          </span>
        </div>
      </div>
    </Link>
  );
}

export default WineCard;

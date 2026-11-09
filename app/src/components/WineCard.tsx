import { Link } from 'react-router-dom';
import type { Wine } from '../types';
import { getFamilyStyle } from '../lib/families';
import { getWinePosition } from '../lib/catalog';
import BottleStage from './BottleStage';
import Highlight from './Highlight';

interface WineCardProps {
  wine: Wine;
  searchQuery?: string;
}

const formatAlcohol = (a: number) => String(a).replace('.', ',');

/**
 * Nicho de bodega + etiqueta de papel. La tarjeta entera es el enlace
 * (sin botón "Ver ficha" redundante). Solo muestra datos con fuente real.
 */
function WineCard({ wine, searchQuery = '' }: WineCardProps) {
  const { tint } = getFamilyStyle(wine.type, wine.family);
  const pos = getWinePosition(wine.id);

  const dataRow = [
    wine.grape?.toUpperCase(),
    wine.alcohol !== undefined ? `${formatAlcohol(wine.alcohol)}% VOL` : undefined,
    wine.volume.toUpperCase(),
  ]
    .filter(Boolean)
    .join(' · ');

  const q = searchQuery.trim().toLowerCase();
  const maridajeMatch = q
    ? wine.maridaje?.find((m) => m.toLowerCase().includes(q))
    : undefined;

  return (
    <Link
      to={`/wine/${wine.id}`}
      viewTransition
      aria-labelledby={`wine-name-${wine.id}`}
      className="group block overflow-hidden rounded-[4px] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/5 transition-[box-shadow,ring-color] duration-300 hover:ring-gold/40 active:scale-[0.99]"
    >
      {/* Nicho iluminado */}
      <BottleStage
        wineId={wine.id}
        tint={tint}
        binLabel={pos ? `Nº ${String(pos.index).padStart(2, '0')}` : undefined}
        className="h-52"
      >
        <img
          src={wine.image}
          alt={`Botella de ${wine.name}`}
          loading="lazy"
          className="stage-bottle h-44 w-auto object-contain"
          style={{ viewTransitionName: `bottle-${wine.id}` }}
        />
      </BottleStage>

      {/* Etiqueta de papel */}
      <div className="paper px-4 pb-5 pt-4 text-center">
        <p className="data-label text-[10px] text-muted">
          <Highlight text={wine.winery.toUpperCase()} query={searchQuery.toUpperCase()} />
        </p>
        <h3
          id={`wine-name-${wine.id}`}
          className="mt-1 font-display text-[1.4rem] font-semibold leading-tight text-ink"
        >
          <Highlight text={wine.name} query={searchQuery} />
        </h3>
        <p className="mt-0.5 font-display text-sm italic text-muted">
          <Highlight text={wine.type} query={searchQuery} />
        </p>

        <div className="mx-auto mt-3 h-px w-12 bg-line/70" />

        {dataRow && (
          <p className="data-label mt-3 text-[11px] text-ink/80">
            <Highlight text={dataRow} query={searchQuery.toUpperCase()} />
          </p>
        )}

        {maridajeMatch && (
          <p className="data-label mt-2 text-[10px] text-primary">
            Marida con:{' '}
            <Highlight text={maridajeMatch.toUpperCase()} query={searchQuery.toUpperCase()} />
          </p>
        )}
      </div>
    </Link>
  );
}

export default WineCard;

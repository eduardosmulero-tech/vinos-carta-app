import { Link, useParams } from 'react-router-dom';
import wines from '../data/wines';
import SimilarWines from '../components/SimilarWines';
import VineyardMotif from '../components/VineyardMotif';
import BottleSilhouette from '../components/BottleSilhouette';
import { getFamilyStyle } from '../lib/families';

function WineDetail() {
  const { id } = useParams();
  const wine = wines.find((w) => w.id === id);

  if (!wine) {
    return (
      <div className="px-4 py-16 text-center md:px-8 lg:px-16">
        <p className="mb-6 text-lg">Vino no encontrado</p>
        <Link
          to="/"
          className="inline-block rounded border border-primary px-5 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          ← Volver a la carta
        </Link>
      </div>
    );
  }

  const familyStyle = getFamilyStyle(wine.type);
  const initial = wine.name.charAt(0).toUpperCase();

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16">
      <Link
        to="/"
        viewTransition
        className="mb-6 inline-block text-sm font-semibold text-primary transition-colors hover:text-primary-dk"
      >
        ← Volver a la carta
      </Link>

      {/* Cabecera a ancho completo y centrada */}
      <header className="relative overflow-hidden rounded-lg bg-surface py-10 text-center md:py-14">
        <VineyardMotif className="pointer-events-none absolute inset-0 h-full w-full text-primary opacity-[0.07]" />
        <div className="relative z-10">
          <p className="eyebrow">{wine.winery}</p>
          <h1 className="mx-auto mt-3 max-w-4xl font-display text-4xl font-semibold text-ink md:text-5xl">
            {wine.name}
          </h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span
              className="rounded px-3 py-1 text-sm font-semibold text-white"
              style={{ backgroundColor: familyStyle.tint }}
            >
              {wine.type}
            </span>
            <span className="rounded border border-line bg-bg px-3 py-1 text-sm text-muted">
              {wine.region}
            </span>
            <span className="rounded border border-line bg-bg px-3 py-1 text-sm text-muted">
              {wine.volume}
            </span>
            <span className="rounded border border-primary/40 px-3 py-1 text-sm font-semibold text-primary">
              UVA · {wine.grape.toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      {/* Cuerpo en columnas */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Botella */}
        <div className="flex items-center justify-center rounded-lg bg-bg py-8">
          {wine.image ? (
            <img
              src={wine.image}
              alt={`Botella de ${wine.name}`}
              className="h-80 w-auto object-contain drop-shadow-lg md:h-96"
              style={{ viewTransitionName: `bottle-${wine.id}` }}
            />
          ) : (
            <BottleSilhouette
              tint={familyStyle.tint}
              initial={initial}
              className="h-72 w-auto md:h-80"
            />
          )}
        </div>

        {/* Ficha técnica */}
        <div className="rounded-lg border border-line bg-surface p-6">
          <h2 className="mb-4 font-display text-2xl font-semibold text-ink">Ficha técnica</h2>
          <div className="divide-y divide-line">
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-muted">Uva</span>
              <span className="font-display text-xl font-semibold text-primary">{wine.grape}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-muted">D.O.</span>
              <span className="text-ink">{wine.region}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-muted">Graduación</span>
              <span className="text-ink">{wine.alcohol}% vol</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-muted">Formato</span>
              <span className="text-ink">{wine.volume}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notas de cata */}
      <section className="mt-10">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Notas de cata</h2>
          <div className="flex-1 border-t border-line" />
        </div>
        <p className="max-w-3xl font-display text-lg italic leading-relaxed text-ink md:text-xl">
          {wine.description}
        </p>
      </section>

      <SimilarWines currentWine={wine} />
    </div>
  );
}

export default WineDetail;

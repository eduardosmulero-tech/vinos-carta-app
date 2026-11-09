import { Link, useParams, useNavigate } from 'react-router-dom';
import wines from '../data/wines';
import SimilarWines from '../components/SimilarWines';
import AndradeEmblem from '../components/AndradeEmblem';
import SauciMotif from '../components/SauciMotif';
import BottleStage from '../components/BottleStage';
import Reveal from '../components/Reveal';
import { getFamilyStyle } from '../lib/families';
import { getWinePosition, formatPosition } from '../lib/catalog';
import { getWinery } from '../data/wineries';

const formatAlcohol = (a: number) => String(a).replace('.', ',');

function WineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const wine = wines.find((w) => w.id === id);

  if (!wine) {
    return (
      <div className="px-4 py-24 text-center md:px-8 lg:px-16">
        <title>Vino no encontrado — Amén · Carta de Vinos</title>
        <p className="font-display text-2xl text-cream">Vino no encontrado</p>
        <p className="mt-2 text-sm text-muted-dark">
          Puede que la referencia haya cambiado de carta.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-[4px] border border-gold/50 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-cellar"
        >
          ← Volver a la carta
        </Link>
      </div>
    );
  }

  const { tint } = getFamilyStyle(wine.type, wine.family);
  const pos = getWinePosition(wine.id);
  const winery =
    wine.winery === 'Bodegas Andrade' ? getWinery('andrade') : getWinery('sauci');
  const isAndrade = wine.winery === 'Bodegas Andrade';

  /* Navega a la carta filtrada SIN replace: atrás vuelve a esta ficha */
  const handleMaridajeTap = (term: string) => {
    navigate(`/?q=${encodeURIComponent(term)}`);
  };

  const fichaRows: Array<[string, React.ReactNode]> = [];
  if (wine.grape) {
    fichaRows.push([
      'Uva',
      <span key="v" className="font-display text-xl font-semibold text-primary">
        {wine.grape}
      </span>,
    ]);
  }
  fichaRows.push(['D.O.', wine.region]);
  if (wine.alcohol !== undefined) {
    fichaRows.push([
      'Graduación',
      <span key="v" className="tabular">{formatAlcohol(wine.alcohol)}% vol</span>,
    ]);
  }
  fichaRows.push(['Formato', wine.volume]);
  if (wine.servicio) fichaRows.push(['Servicio', wine.servicio]);

  return (
    <div className="px-4 pb-6 md:px-8 lg:px-16">
      <title>{`${wine.name} — Amén · Carta de Vinos`}</title>

      <Link
        to="/"
        viewTransition
        className="mb-4 mt-4 inline-block text-sm font-semibold text-gold transition-colors hover:text-cream"
      >
        ← Volver a la carta
      </Link>

      {/* ── Hero: el nicho de la bodega, a sangre ── */}
      <section className="-mx-4 md:-mx-8 lg:-mx-16">
        <BottleStage
          wineId={wine.id}
          tint={tint}
          binLabel={
            pos ? `Nº ${String(pos.index).padStart(2, '0')} · ${pos.family.toUpperCase()}` : undefined
          }
          className="h-96 md:h-[28rem]"
        >
          <img
            src={wine.image}
            alt={`Botella de ${wine.name}`}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 400px, 280px"
            className="stage-bottle h-80 w-auto object-contain md:h-96"
            style={{ viewTransitionName: `bottle-${wine.id}` }}
          />
        </BottleStage>
      </section>

      {/* ── Nombre sobre la bodega ── */}
      <div className="mt-7 text-center">
        <p className="data-label text-[11px]" style={{ color: tint }}>
          {wine.type}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-cream md:text-5xl">
          {wine.name}
        </h1>
        <p className="data-label mt-3 text-[10px] text-muted-dark">
          {wine.winery.toUpperCase()}
          {pos && <> · {formatPosition(pos)}</>}
        </p>
      </div>

      {/* ── La carta impresa: ficha técnica + cata + maridaje sobre papel ── */}
      <Reveal
        as="section"
        className="paper mx-auto mt-8 max-w-2xl rounded-[4px] px-6 py-8 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] md:px-10 md:py-10"
      >
        <h2 className="data-label text-center text-[11px] text-primary">
          Ficha técnica
        </h2>
        <div className="mx-auto mt-3 h-px w-16 bg-line" />

        <dl className="mt-4 divide-y divide-line/60">
          {fichaRows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-6 py-3"
            >
              <dt className="data-label shrink-0 text-[10px] text-muted">{label}</dt>
              <dd className="text-right text-[15px] leading-snug text-ink">{value}</dd>
            </div>
          ))}
          {wine.elaboracion && (
            <div className="py-3">
              <dt className="data-label text-[10px] text-muted">Elaboración</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink">
                {wine.elaboracion}
              </dd>
            </div>
          )}
        </dl>

        {wine.cata && (
          <>
            <h2 className="data-label mt-10 text-center text-[11px] text-primary">
              Notas de cata
            </h2>
            <div className="mx-auto mt-3 h-px w-16 bg-line" />
            <div className="mt-6 space-y-6">
              {(
                [
                  ['Vista', wine.cata.vista, true],
                  ['Nariz', wine.cata.nariz, false],
                  ['Boca', wine.cata.boca, false],
                ] as const
              ).map(([label, text, withCap]) => (
                <div
                  key={label}
                  className="grid grid-cols-[64px_1fr] gap-4 md:grid-cols-[88px_1fr]"
                >
                  <span className="data-label pt-1.5 text-[10px] text-muted">
                    {label}
                  </span>
                  <p
                    className={`font-display text-lg italic leading-relaxed text-ink ${
                      withCap ? 'drop-cap' : ''
                    }`}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {wine.maridaje && wine.maridaje.length > 0 && (
          <>
            <h2 className="data-label mt-10 text-center text-[11px] text-primary">
              Maridaje
            </h2>
            <div className="mx-auto mt-3 h-px w-16 bg-line" />
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {wine.maridaje.map((m) => (
                <button
                  key={m}
                  onClick={() => handleMaridajeTap(m)}
                  title={`Buscar vinos que maridan con ${m}`}
                  className="rounded-full border border-primary/35 px-3.5 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-white active:bg-primary-dk"
                >
                  {m}
                </button>
              ))}
            </div>
          </>
        )}
      </Reveal>

      {/* ── La bodega firma su vino ── */}
      {winery && (
        <Reveal as="section" className="relative mx-auto mt-14 max-w-2xl overflow-hidden text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]">
            {isAndrade ? (
              <AndradeEmblem className="h-56 w-56" />
            ) : (
              <SauciMotif className="h-56 w-56" />
            )}
          </div>

          <div className="relative">
            {isAndrade ? (
              <AndradeEmblem className="mx-auto h-16 w-16" color="#c9a26a" />
            ) : winery.logo ? (
              <img
                src={winery.logo}
                alt=""
                aria-hidden="true"
                className="mx-auto h-14 w-14 rounded-full object-cover ring-1 ring-gold/50"
              />
            ) : (
              <SauciMotif className="mx-auto h-16 w-16" color="#c9a26a" />
            )}

            <p className="mt-4 font-display text-2xl font-semibold text-cream">
              {winery.name}
            </p>
            <p className="data-label mt-2 text-[10px] text-gold">
              {winery.lema}
            </p>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-dark">
              {winery.historia}
            </p>
          </div>
        </Reveal>
      )}

      <SimilarWines currentWine={wine} />
    </div>
  );
}

export default WineDetail;

import { Link, useParams } from 'react-router-dom';
import wines from '../data/wines';
import SimilarWines from '../components/SimilarWines';

function WineDetail() {
  const { id } = useParams();
  const wine = wines.find((w) => w.id === id);

  if (!wine) {
    return (
      <div className="px-4 py-16 text-center md:px-8 lg:px-16">
        <p className="mb-6 text-lg">Vino no encontrado</p>
        <Link
          to="/"
          className="inline-block rounded bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-dk"
        >
          ← Volver a la carta
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16">
      <Link
        to="/"
        className="mb-6 inline-block text-sm font-semibold text-primary hover:text-primary-dk"
      >
        ← Volver a la carta
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-text">{wine.name}</h1>
          <p className="mt-2 text-lg text-gray-500">{wine.winery}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {wine.type}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {wine.region}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {wine.volume}
            </span>
          </div>

          <p className="mt-6 text-3xl font-bold text-primary">{wine.grape}</p>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500">Graduación</span>
            <span className="text-lg font-bold text-text">{wine.alcohol}% vol</span>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="mb-3 text-lg font-bold text-text">Notas de cata</h2>
          <p className="leading-relaxed text-text">{wine.description}</p>
        </div>
      </div>

      <hr className="mt-8 border-gray-200" />

      <SimilarWines currentWine={wine} />
    </div>
  );
}

export default WineDetail;

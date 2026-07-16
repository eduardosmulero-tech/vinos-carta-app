import { Link, useParams } from 'react-router-dom';
import wines from '../data/wines';

function WineDetail() {
  const { id } = useParams();
  const wine = wines.find((w) => w.id === id);

  if (!wine) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="mb-6 text-lg">Vino no encontrado.</p>
        <Link
          to="/"
          className="inline-block rounded bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dk"
        >
          ← Volver a la carta
        </Link>
      </div>
    );
  }

  return <div className="px-4 py-8">{wine.name} — ficha pendiente (Fase 4)</div>;
}

export default WineDetail;

import { useState, useMemo } from 'react';
import wines from '../data/wines';
import type { Wine } from '../types';
import SearchBar from '../components/SearchBar';
import WineCard from '../components/WineCard';
import Ornament from '../components/Ornament';

function WineList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWines = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return wines;
    return wines.filter(
      (w) =>
        w.name.toLowerCase().includes(query) ||
        w.winery.toLowerCase().includes(query) ||
        w.type.toLowerCase().includes(query) ||
        w.grape.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const wineryLogo = (winery: string) =>
    winery === 'Bodegas Sauci'
      ? { src: '/logo-sauci.jpg', shape: 'h-9 w-7 rounded-full' }
      : { src: '/logo-bodegas-andrade.jpg', shape: 'h-8 w-8 rounded-full' };

  const groupedWines = useMemo(() => {
    const groups = new Map<string, Wine[]>();
    for (const w of filteredWines) {
      const list = groups.get(w.winery) || [];
      list.push(w);
      groups.set(w.winery, list);
    }
    return groups;
  }, [filteredWines]);

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16">
      {/* Masthead editorial */}
      <div className="mb-8 text-center">
        <p className="eyebrow">D.O. Condado de Huelva</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink md:text-5xl">
          Carta de Vinos
        </h1>
        <div className="mx-auto mt-4 max-w-md">
          <Ornament className="w-full" />
        </div>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {isSearching && (
        <p className="mt-4 text-center text-sm text-muted">
          {filteredWines.length} {filteredWines.length === 1 ? 'resultado' : 'resultados'} · “{searchQuery}”
        </p>
      )}

      {filteredWines.length === 0 ? (
        <div className="mt-12 text-center">
          <div className="mx-auto mb-4 max-w-xs">
            <Ornament className="w-full" />
          </div>
          <p className="text-lg text-ink">No se encontraron vinos con ese criterio.</p>
          <p className="mt-2 text-sm text-muted">
            Prueba con otro término o revisa la ortografía.
          </p>
        </div>
      ) : isSearching ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWines.map((wine, index) => (
            <div
              key={wine.id}
              className="stagger-card"
              style={{ animationDelay: `${Math.min(index, 11) * 60}ms` }}
            >
              <WineCard wine={wine} searchQuery={searchQuery} showWinery />
            </div>
          ))}
        </div>
      ) : (
        <>
          {[...groupedWines.entries()].map(([winery, list]) => (
            <section key={winery} className="mt-8">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={wineryLogo(winery).src}
                  alt=""
                  aria-hidden="true"
                  className={`shrink-0 object-cover ring-1 ring-line ${wineryLogo(winery).shape}`}
                />
                <h2 className="font-display text-2xl font-semibold text-ink">{winery}</h2>
                <div className="flex-1 border-t border-line" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((wine, index) => (
                  <div
                    key={wine.id}
                    className="stagger-card"
                    style={{ animationDelay: `${Math.min(index, 11) * 60}ms` }}
                  >
                    <WineCard wine={wine} showWinery={false} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}

export default WineList;

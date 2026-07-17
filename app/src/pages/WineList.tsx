import { useState, useMemo } from 'react';
import wines from '../data/wines';
import type { Wine } from '../types';
import SearchBar from '../components/SearchBar';
import WineCard from '../components/WineCard';

function WineList() {
  // searchQuery llega ya debounced (300ms): el debounce vive en SearchBar (SPEC §3.4)
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
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {filteredWines.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-lg text-text">No se encontraron vinos con ese criterio.</p>
          <p className="mt-2 text-sm text-gray-500">
            Prueba con otro término o revisa la ortografía.
          </p>
        </div>
      ) : isSearching ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>
      ) : (
        <>
          {[...groupedWines.entries()].map(([winery, list]) => (
            <section key={winery} className="mt-6">
              <h2 className="mb-4 text-xl font-bold text-text">{winery}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((wine) => (
                  <WineCard key={wine.id} wine={wine} />
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

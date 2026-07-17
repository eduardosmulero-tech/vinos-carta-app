import { useState, useMemo, useDeferredValue, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import wines from '../data/wines';
import type { Wine } from '../types';
import { getFamilyStyle } from '../lib/families';
import SearchBar from '../components/SearchBar';
import WineCard from '../components/WineCard';
import Ornament from '../components/Ornament';
import Reveal from '../components/Reveal';

/* Familias en orden editorial */
const FAMILY_ORDER = [
  'Blancos',
  'Tinto',
  'Finos',
  'Oxidativos secos',
  'Dulces',
  'Naranja',
  'Vermut',
] as const;

const WINERY_COUNT = new Set(wines.map((w) => w.winery)).size;
const FAMILY_COUNT = new Set(
  wines.map((w) => getFamilyStyle(w.type, w.family).family)
).size;

function WineList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(urlQuery);
  const deferredQuery = useDeferredValue(query);
  const [activeFamily, setActiveFamily] = useState<string>('');

  /* Entrada externa (chip de maridaje desde una ficha, atrás/adelante) */
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  /* Única fuente de verdad → URL (sobre el valor diferido, sin bucles) */
  useEffect(() => {
    const current = searchParams.get('q') ?? '';
    const next = deferredQuery.trim();
    if (next === current) return;
    setSearchParams(next ? { q: next } : {}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery]);

  /* Índice de búsqueda: nombre, bodega, tipo, uva, maridaje, cata */
  const filteredWines = useMemo(() => {
    const q = deferredQuery.toLowerCase().trim();
    if (!q) return wines;
    return wines.filter((w) => {
      if (
        w.name.toLowerCase().includes(q) ||
        w.winery.toLowerCase().includes(q) ||
        w.type.toLowerCase().includes(q) ||
        w.grape?.toLowerCase().includes(q)
      )
        return true;
      if (w.maridaje?.some((m) => m.toLowerCase().includes(q))) return true;
      if (
        w.cata?.vista.toLowerCase().includes(q) ||
        w.cata?.nariz.toLowerCase().includes(q) ||
        w.cata?.boca.toLowerCase().includes(q)
      )
        return true;
      return false;
    });
  }, [deferredQuery]);

  const isSearching = deferredQuery.trim().length > 0;

  /* Agrupar por familia */
  const groupedByFamily = useMemo(() => {
    const groups = new Map<string, Wine[]>();
    for (const w of filteredWines) {
      const family = getFamilyStyle(w.type, w.family).family;
      const list = groups.get(family) ?? [];
      list.push(w);
      groups.set(family, list);
    }
    return FAMILY_ORDER.filter((f) => groups.has(f)).map((f) => {
      const list = groups.get(f)!;
      return {
        family: f,
        wines: list,
        tint: getFamilyStyle(list[0].type, list[0].family).tint,
      };
    });
  }, [filteredWines]);

  /* Scroll-spy */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveFamily(entry.target.id.replace('family-', ''));
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px' }
    );
    for (const { family } of groupedByFamily) {
      const el = document.getElementById(`family-${family}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [groupedByFamily]);

  return (
    <div className="px-4 pb-6 md:px-8 lg:px-16">
      <title>Amén · Carta de Vinos — D.O. Condado de Huelva</title>

      {/* ── Masthead: la portada de la carta ── */}
      <Reveal className="mb-10 pt-10 text-center">
        <p className="data-label text-[11px] text-gold">D.O. Condado de Huelva</p>
        <h1 className="mt-3 font-display text-5xl font-semibold text-cream md:text-6xl">
          Carta de Vinos
        </h1>
        <p className="mt-3 font-display text-lg italic text-muted-dark">
          &laquo;Vinos diferentes, historias únicas&raquo;
        </p>
        <div className="mx-auto mt-5 max-w-[180px]">
          <Ornament className="w-full" />
        </div>
        <p className="data-label mt-5 text-[10px] text-muted-dark">
          {wines.length} vinos · {WINERY_COUNT} bodegas · {FAMILY_COUNT} familias
        </p>
      </Reveal>

      {/* ── Buscador de sumiller ── */}
      <SearchBar value={query} onChange={setQuery} />

      {isSearching && (
        <p className="mt-4 text-center text-sm text-muted-dark" role="status">
          {filteredWines.length}{' '}
          {filteredWines.length === 1 ? 'resultado' : 'resultados'} ·{' '}
          &laquo;{deferredQuery}&raquo;
        </p>
      )}

      {/* ── Barra sticky de familias ── */}
      {!isSearching && groupedByFamily.length > 1 && (
        <nav
          className="sticky top-14 z-20 -mx-4 mt-6 overflow-x-auto bg-cellar/92 px-4 py-3 backdrop-blur-sm md:top-16 md:px-8 lg:px-16"
          aria-label="Navegación por familias de vino"
        >
          <div className="flex justify-start gap-2 md:justify-center">
            {groupedByFamily.map(({ family, tint }) => {
              const isActive = activeFamily === family;
              return (
                <a
                  key={family}
                  href={`#family-${family}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(`family-${family}`)
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="data-label whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] transition-colors"
                  style={{
                    borderColor: tint,
                    color: isActive ? '#160d10' : tint,
                    backgroundColor: isActive ? tint : 'transparent',
                  }}
                >
                  {family}
                </a>
              );
            })}
          </div>
        </nav>
      )}

      {/* ── Resultados ── */}
      {filteredWines.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="mx-auto mb-5 max-w-[180px]">
            <Ornament className="w-full" />
          </div>
          <p className="font-display text-xl text-cream">
            Ningún vino coincide con &laquo;{deferredQuery}&raquo;.
          </p>
          <p className="mt-2 text-sm text-muted-dark">
            Prueba con una uva (Zalema), un plato (ostras) o un nombre.
          </p>
        </div>
      ) : isSearching ? (
        /* Modo búsqueda: grid plano */
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} searchQuery={deferredQuery} />
          ))}
        </div>
      ) : (
        /* Modo carta: agrupado por familia */
        <>
          {groupedByFamily.map(({ family, wines: list, tint }) => (
            <Reveal
              as="section"
              key={family}
              id={`family-${family}`}
              className="mt-12"
            >
              <div className="mb-7 text-center">
                <h2
                  className="font-display text-3xl font-semibold md:text-4xl"
                  style={{ color: tint }}
                >
                  {family}
                </h2>
                <div
                  className="mx-auto mt-3 h-px max-w-xs"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${tint} 50%, transparent 100%)`,
                  }}
                />
                <p className="data-label mt-2 text-[10px] text-muted-dark">
                  {list.length} {list.length === 1 ? 'vino' : 'vinos'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((wine, i) => (
                  <Reveal key={wine.id} delay={(i % 3) * 80}>
                    <WineCard wine={wine} />
                  </Reveal>
                ))}
              </div>
            </Reveal>
          ))}
        </>
      )}
    </div>
  );
}

export default WineList;

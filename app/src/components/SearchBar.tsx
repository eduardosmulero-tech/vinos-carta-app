interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Input totalmente controlado por el padre: UNA sola fuente de verdad.
 * La fluidez al teclear la da useDeferredValue en WineList (React 19),
 * no un debounce interno duplicado.
 */
function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mx-auto max-w-xl">
      <svg
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-dark"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
      <input
        type="search"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar vino, uva o maridaje…"
        aria-label="Buscar en la carta"
        className="w-full rounded-[4px] border border-gold/30 bg-cellar-2 py-3 pl-10 pr-12 text-cream shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] placeholder:text-muted-dark/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-muted-dark transition-colors hover:text-cream"
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;

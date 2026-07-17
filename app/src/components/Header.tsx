import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-primary text-white">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-4 md:h-18 md:px-8 lg:px-16">
        {/* Hueco reservado al futuro menú por tipos */}
        <div className="md:block" aria-hidden="true" />

        {/* Logo centrado */}
        <Link to="/" className="flex justify-center">
          {logoFailed ? (
            <svg
              viewBox="0 0 40 40"
              className="h-12 w-12 rounded-full ring-2 ring-white/60 md:h-13 md:w-13"
              role="img"
              aria-label="Bodegas Andrade"
            >
              <rect width="40" height="40" rx="20" fill="#73232d" />
              <text
                x="20"
                y="25"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="14"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BA
              </text>
            </svg>
          ) : (
            <img
              src="/logo-bodegas-andrade.jpg"
              alt="Bodegas Andrade"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white/60 md:h-13 md:w-13"
              onError={() => setLogoFailed(true)}
            />
          )}
        </Link>

        {/* Subtítulo derecha */}
        <div className="flex justify-end">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
            Carta Digital
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;

import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-primary text-white">
      <div className="flex h-14 items-center px-4 md:h-18 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          {logoFailed ? (
            <svg
              viewBox="0 0 40 40"
              className="h-9 w-9 rounded-full ring-2 ring-white/60 md:h-10 md:w-10"
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
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white/60 md:h-10 md:w-10"
              onError={() => setLogoFailed(true)}
            />
          )}
          <span className="text-lg font-bold">Vinos — Carta Digital</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;

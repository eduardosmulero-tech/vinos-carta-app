import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Cabecera de la bodega: solo el sello de Amén, centrado de verdad
 * (nada más dentro del tramo central — corrige E1 de la auditoría).
 * El hueco izquierdo queda reservado para un futuro menú (petición de Edu).
 */
function Header() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-gold/25 bg-cellar/95 backdrop-blur-sm">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-4 md:h-16 md:px-8 lg:px-16">
        {/* Hueco izquierdo — reservado para futuro menú */}
        <div aria-hidden="true" />

        <Link
          to="/"
          className="flex items-center justify-center"
          aria-label="Amén Wines — Inicio"
        >
          {logoFailed ? (
            <svg
              viewBox="0 0 40 40"
              className="h-10 w-10 rounded-full ring-1 ring-gold/60 md:h-11 md:w-11"
              role="img"
              aria-label="Amén Wines"
            >
              <rect width="40" height="40" rx="20" fill="#f2ebe5" />
              <text
                x="20"
                y="26"
                textAnchor="middle"
                fill="#73232d"
                fontSize="17"
                fontWeight="600"
                fontFamily="Georgia, serif"
              >
                A
              </text>
            </svg>
          ) : (
            <img
              src="/logo-amen.jpg"
              alt="Amén Wines"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/60 md:h-11 md:w-11"
              onError={() => setLogoFailed(true)}
            />
          )}
        </Link>

        <div aria-hidden="true" />
      </div>
    </header>
  );
}

export default Header;

interface AndradeEmblemProps {
  className?: string;
  color?: string;
}

/**
 * Emblema de Bodegas Andrade — estrella de 4 pétalos de trazo fino,
 * inspirada en el diseño de sus etiquetas.
 */
function AndradeEmblem({ className = '', color = '#b08d57' }: AndradeEmblemProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Círculo exterior de filete */}
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="1.2" />
      <circle cx="40" cy="40" r="36" stroke={color} strokeWidth="0.5" opacity="0.5" />

      {/* Estrella de 4 pétalos */}
      <path
        d="M40 8 C44 22, 54 28, 54 36 C54 46, 44 50, 40 64 C36 50, 26 46, 26 36 C26 28, 36 22, 40 8 Z"
        fill={color}
        opacity="0.15"
      />
      <path
        d="M40 8 C44 22, 54 28, 54 36 C54 46, 44 50, 40 64 C36 50, 26 46, 26 36 C26 28, 36 22, 40 8 Z"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />

      {/* Puntos centrales */}
      <circle cx="40" cy="34" r="2.5" fill={color} opacity="0.8" />
      <circle cx="40" cy="44" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

export default AndradeEmblem;

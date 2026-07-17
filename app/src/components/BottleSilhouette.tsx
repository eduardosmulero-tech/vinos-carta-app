interface BottleSilhouetteProps {
  tint: string;
  initial?: string;
  className?: string;
}

function BottleSilhouette({ tint, initial, className = '' }: BottleSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 120 240"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cuerpo de botella */}
      <path
        d="M40 40 L40 80 C40 100 20 110 20 140 L20 210 C20 226 36 236 60 236 C84 236 100 226 100 210 L100 140 C100 110 80 100 80 80 L80 40 L40 40 Z"
        fill={tint}
        fillOpacity={0.12}
        stroke={tint}
        strokeWidth={1.5}
      />
      {/* Cuello */}
      <path
        d="M44 40 L44 24 L76 24 L76 40"
        stroke={tint}
        strokeWidth={1.5}
        fill="none"
      />
      {/* Tapa/cápsula */}
      <rect x="44" y="12" width="32" height="12" rx="2" fill={tint} fillOpacity={0.25} />
      {/* Etiqueta */}
      <rect x="30" y="110" width="60" height="70" rx="2" fill={tint} fillOpacity={0.08} stroke={tint} strokeWidth={1} />
      {initial && (
        <text
          x="60"
          y="152"
          textAnchor="middle"
          fill={tint}
          fontSize="28"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontWeight="600"
        >
          {initial}
        </text>
      )}
    </svg>
  );
}

export default BottleSilhouette;

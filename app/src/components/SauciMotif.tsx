interface SauciMotifProps {
  className?: string;
  color?: string;
}

/**
 * Motivo de Bodegas Sauci — velo de flor y botas de crianza,
 * representando la tradición de crianza biológica bajo flor.
 */
function SauciMotif({ className = '', color = '#b08d57' }: SauciMotifProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Bota central — silueta de bota de roble */}
      <ellipse cx="40" cy="38" rx="18" ry="24" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      <ellipse cx="40" cy="38" rx="16" ry="22" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
      <line x1="32" y1="18" x2="32" y2="24" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="48" y1="18" x2="48" y2="24" stroke={color} strokeWidth="1" opacity="0.5" />

      {/* Velo de flor — líneas onduladas sobre la bota */}
      <path
        d="M26 30 Q32 26, 40 30 Q48 34, 54 30"
        stroke={color}
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M28 36 Q34 32, 40 36 Q46 40, 52 36"
        stroke={color}
        strokeWidth="0.6"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M30 42 Q35 39, 40 42 Q45 45, 50 42"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        opacity="0.25"
      />

      {/* Flor — símbolo del velo */}
      <circle cx="40" cy="50" r="3" fill={color} opacity="0.2" />
      <circle cx="40" cy="50" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

export default SauciMotif;

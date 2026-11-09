interface VineyardMotifProps {
  className?: string;
}

function VineyardMotif({ className = '' }: VineyardMotifProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Colinas */}
      <path
        d="M0 160 C60 130, 120 130, 180 150 C240 170, 320 120, 400 140 L400 200 L0 200 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.03"
      />
      {/* Hileras de viña */}
      <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.15">
        <line x1="20" y1="170" x2="380" y2="170" />
        <line x1="20" y1="180" x2="380" y2="180" />
        <line x1="20" y1="190" x2="380" y2="190" />
      </g>
      {/* Casa con torre */}
      <g stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.2">
        <rect x="260" y="110" width="60" height="50" />
        <polygon points="260,110 290,85 320,110" />
        <rect x="285" y="125" width="18" height="35" />
        <rect x="270" y="90" width="20" height="35" />
        <polygon points="270,90 280,70 290,90" />
      </g>
    </svg>
  );
}

export default VineyardMotif;

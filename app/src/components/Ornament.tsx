interface OrnamentProps {
  className?: string;
  color?: string;
}

function Ornament({ className = '', color = '#b08d57' }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 120 16"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="48" y2="8" stroke={color} strokeWidth="1" />
      <line x1="72" y1="8" x2="120" y2="8" stroke={color} strokeWidth="1" />
      <path
        d="M60 2 C62 6, 66 6, 66 8 C66 10, 62 10, 60 14 C58 10, 54 10, 54 8 C54 6, 58 6, 60 2 Z"
        fill={color}
      />
    </svg>
  );
}

export default Ornament;

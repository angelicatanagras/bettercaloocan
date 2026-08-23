interface MonumentoIconProps {
  className?: string;
}

/**
 * A stylized obelisk under a rising sun — Caloocan's own Bonifacio Monument
 * (Monumento) topped by the Katipunan sun motif, in place of a generic
 * checkmark badge. Drawn in the lucide-icon convention (24x24, currentColor
 * stroke) so it drops into the same spots.
 */
export function MonumentoIcon({ className }: MonumentoIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeWidth={1.25} opacity={0.35} />
      <line x1="7" y1="18" x2="17" y2="18" />
      <rect x="9" y="14.5" width="6" height="3.5" />
      <path d="M10.2 14.5 L11 8 L12 5.5 L13 8 L13.8 14.5 Z" />
      <line x1="12" y1="5.5" x2="12" y2="3" />
      <line x1="9.6" y1="6.6" x2="8.3" y2="4.6" />
      <line x1="14.4" y1="6.6" x2="15.7" y2="4.6" />
    </svg>
  );
}

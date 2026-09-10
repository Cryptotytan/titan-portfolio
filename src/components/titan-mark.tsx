export function TitanMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <circle cx="16" cy="16" r="2.4" fill="currentColor" />
      <circle cx="16" cy="16" r="6.2" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="4.6"
        stroke="currentColor"
        strokeWidth="1.1"
        transform="rotate(-22 16 16)"
      />
    </svg>
  );
}

export function TimerIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function PlayIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polygon points="5,3 19,12 5,21" fill={color} />
    </svg>
  );
}

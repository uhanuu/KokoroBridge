export const getScoreColor = (score: number) => {
  if (score >= 90) return "#4caf50";
  if (score >= 80) return "#8bc34a";
  if (score >= 70) return "#ff9800";
  return "#f44336";
};

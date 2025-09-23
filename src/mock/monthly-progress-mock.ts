export const achievementLevels = {
  perfect: { text: "Perfect", color: "#22c55e", threshold: 95 },
  excellent: { text: "Excellent", color: "#3b82f6", threshold: 90 },
  great: { text: "Great", color: "#f59e0b", threshold: 80 },
  good: { text: "Good", color: "#8b5cf6", threshold: 70 },
  keepGoing: { text: "Keep Going", color: "#6b7280", threshold: 0 },
};

export const monthlyProgressConfig = {
  cardWidth: 180,
  defaultVisibleCards: 3,
  achievementBadgeThreshold: 80,
};

export const getAchievementLevel = (score: number) => {
  if (score >= achievementLevels.perfect.threshold) return achievementLevels.perfect;
  if (score >= achievementLevels.excellent.threshold) return achievementLevels.excellent;
  if (score >= achievementLevels.great.threshold) return achievementLevels.great;
  if (score >= achievementLevels.good.threshold) return achievementLevels.good;
  return achievementLevels.keepGoing;
};
export const profileInfoStaticData = {
  mascotImages: {
    high: "/good-character.png",    // level >= 10
    medium: "/start-study-character.png",  // level >= 5
    low: "/home-character.png",     // default
  },
  statistics: {
    longestStreak: 18,
    completedLessons: 156,
    totalStudyTime: "48h",
  },
  levelThresholds: {
    high: 10,
    medium: 5,
  },
};

export const getMascotImage = (level: number): string => {
  const { mascotImages, levelThresholds } = profileInfoStaticData;

  if (level >= levelThresholds.high) return mascotImages.high;
  if (level >= levelThresholds.medium) return mascotImages.medium;
  return mascotImages.low;
};
interface UserProfile {
  name: string;
  email: string;
  level: string;
  joinDate: string;
  streak: number;
  avatar?: string;
}

export const mockUserProfile: UserProfile = {
  name: "유현우",
  email: "user@example.com",
  level: "중급",
  joinDate: "2023년 10월",
  streak: 12,
  avatar: "/profile-avatar.png"
};

export const mockLearningStats = {
  overview: {
    continuousDays: 12,
    totalHours: 48,
    completedLessons: 156,
    averageScore: 87,
  },
  skillProgress: [
    { skill: "히라가나", progress: 95, total: 46, completed: 44, color: "#22c55e" },
    { skill: "가타카나", progress: 65, total: 46, completed: 30, color: "#3b82f6" },
    { skill: "기초 한자", progress: 30, total: 100, completed: 30, color: "#f59e0b" },
    { skill: "일상 회화", progress: 45, total: 50, completed: 23, color: "#8b5cf6" },
  ],
  monthlyDetailedProgress: [
    {
      year: 2023,
      month: 10,
      monthName: "10월",
      hours: 25,
      lessons: 35,
      streak: 8,
      averageScore: 78,
    },
    {
      year: 2023,
      month: 11,
      monthName: "11월",
      hours: 30,
      lessons: 42,
      streak: 12,
      averageScore: 81,
    },
    {
      year: 2023,
      month: 12,
      monthName: "12월",
      hours: 28,
      lessons: 38,
      streak: 10,
      averageScore: 79,
    },
    {
      year: 2024,
      month: 1,
      monthName: "1월",
      hours: 32,
      lessons: 45,
      streak: 15,
      averageScore: 82,
    },
    {
      year: 2024,
      month: 2,
      monthName: "2월",
      hours: 41,
      lessons: 58,
      streak: 18,
      averageScore: 85,
    },
    {
      year: 2024,
      month: 3,
      monthName: "3월",
      hours: 48,
      lessons: 67,
      streak: 22,
      averageScore: 87,
    },
    {
      year: 2024,
      month: 4,
      monthName: "4월",
      hours: 38,
      lessons: 52,
      streak: 16,
      averageScore: 84,
    },
    {
      year: 2024,
      month: 5,
      monthName: "5월",
      hours: 45,
      lessons: 63,
      streak: 20,
      averageScore: 89,
    },
    {
      year: 2024,
      month: 6,
      monthName: "6월",
      hours: 52,
      lessons: 71,
      streak: 25,
      averageScore: 91,
    },
  ],
  studyStreak: {
    current: 12,
    longest: 18,
    thisMonth: 15,
    percentage: 67,
  },
  levelInfo: {
    currentLevel: "중급",
    currentXP: 2840,
    nextLevelXP: 3500,
    progress: 81,
  },
};

export const mockAchievements = [
  {
    id: 1,
    title: "첫 걸음",
    description: "첫 번째 레슨 완료",
    date: "2024년 1월 15일",
    isCompleted: true,
    icon: "🎯",
  },
  {
    id: 2,
    title: "일주일 연속",
    description: "7일 연속 학습 완료",
    date: "2024년 3월 1일",
    isCompleted: true,
    icon: "🔥",
  },
  {
    id: 3,
    title: "히라가나 마스터",
    description: "히라가나 완전 정복",
    date: "2024년 3월 10일",
    isCompleted: true,
    icon: "あ",
  },
  {
    id: 4,
    title: "가타카나 마스터",
    description: "가타카나 완전 정복",
    date: null,
    isCompleted: false,
    icon: "ア",
  },
];
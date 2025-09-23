interface UserProfile {
  name: string;
  email: string;
  level: number;
  joinDate: string;
  streak: number;
  avatar?: string;
  currentXP: number;
  nextLevelXP: number;
  progress: number;
}

export const mockUserProfile: UserProfile = {
  name: "김철수",
  email: "kimcs@example.com",
  level: 15,
  joinDate: "2024년 1월 15일",
  streak: 12,
  avatar: "/profile-avatar.png",
  currentXP: 2350,
  nextLevelXP: 3000,
  progress: 78
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
  {
    id: 5,
    title: "초보 탈출",
    description: "레벨 5 달성",
    date: "2024년 2월 5일",
    isCompleted: true,
    icon: "🌱",
  },
  {
    id: 6,
    title: "한 달 연속",
    description: "30일 연속 학습 완료",
    date: null,
    isCompleted: false,
    icon: "📅",
  },
  {
    id: 7,
    title: "중급자",
    description: "레벨 10 달성",
    date: "2024년 4월 12일",
    isCompleted: true,
    icon: "⭐",
  },
  {
    id: 8,
    title: "백문이 불여일견",
    description: "100개 문제 정답",
    date: "2024년 2월 20일",
    isCompleted: true,
    icon: "💯",
  },
  {
    id: 9,
    title: "기초 한자 마스터",
    description: "기초 한자 50개 학습",
    date: null,
    isCompleted: false,
    icon: "漢",
  },
  {
    id: 10,
    title: "완벽주의자",
    description: "10번 연속 만점",
    date: null,
    isCompleted: false,
    icon: "🏆",
  },
  {
    id: 11,
    title: "학습왕",
    description: "총 100시간 학습",
    date: null,
    isCompleted: false,
    icon: "👑",
  },
  {
    id: 12,
    title: "고수의 길",
    description: "레벨 20 달성",
    date: null,
    isCompleted: false,
    icon: "🥇",
  },
];
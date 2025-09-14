interface ActivityItem {
  id: string;
  type: "hiragana" | "katakana" | "kanji" | "conversation";
  character?: string;
  score: number;
  timestamp: string;
  duration: number; // 분 단위
}

interface StudyOption {
  id: string;
  title: LearnTitle;
  subtitle: string;
  progress: number;
  totalItems: number;
  completedItems: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number; // 분 단위
  isLocked?: boolean;
}

type LearnTitle = "히라가나" | "가타카나" | "한자" | "AI 대화";

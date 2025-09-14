export const getScoreColor = (score: number) => {
  if (score >= 90) return "#4caf50";
  if (score >= 80) return "#8bc34a";
  if (score >= 70) return "#ff9800";
  return "#f44336";
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "#4caf50";
    case "intermediate":
      return "#ff9800";
    case "advanced":
      return "#f44336";
    default:
      return "#4caf50";
  }
};

export const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "초급";
    case "intermediate":
      return "중급";
    case "advanced":
      return "고급";
    default:
      return "초급";
  }
};

export const getIconByLearningTitle = (title: LearnTitle) => {
  switch (title) {
    case "히라가나":
      return "あ";
    case "가타카나":
      return "ア";
    case "한자":
      return "漢";
    case "AI 대화":
      return "💬";
  }
};

export const getAllLearnTitle = (): LearnTitle[] => {
  return ["히라가나", "가타카나", "한자", "AI 대화"];
};

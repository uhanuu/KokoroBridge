interface ActivityItem {
  id: string;
  type: "hiragana" | "katakana" | "kanji" | "conversation";
  character?: string;
  score: number;
  timestamp: string;
  duration: number; // 분 단위
}

interface KanaData {
  char: string;
  romaji: string;
  type: "hiragana" | "katakana";
  strokes: string[];
}

interface DrawPoint {
  x: number;
  y: number;
}

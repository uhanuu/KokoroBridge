export interface StrokePoint {
  x: number;
  y: number;
}

export interface StrokeAnimationFrame {
  strokeIndex: number;
  progress: number; // 0-1
  points: StrokePoint[];
}

export interface CharacterStrokeData {
  char: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  completed: boolean;
  strokeCount: number;
  strokes: StrokePoint[][];
  animationFrames: StrokeAnimationFrame[];
  difficulty: 'easy' | 'medium' | 'hard';
  practiceCount: number;
  accuracy: number;
}

// 히라가나 획순 데이터 (제공된 이미지 기반)
export const hiraganaStrokeData: CharacterStrokeData[] = [
  // あ단
  {
    char: "あ",
    romaji: "a",
    type: "hiragana",
    completed: true,
    strokeCount: 3,
    difficulty: "medium",
    practiceCount: 15,
    accuracy: 85,
    strokes: [
      // 첫 번째 획: 가로선과 세로 곡선
      [
        { x: 25, y: 35 },
        { x: 35, y: 30 },
        { x: 50, y: 25 },
        { x: 65, y: 30 },
        { x: 75, y: 35 },
        { x: 82, y: 42 },
        { x: 85, y: 52 },
        { x: 82, y: 65 },
        { x: 75, y: 75 },
        { x: 65, y: 82 },
        { x: 52, y: 85 },
        { x: 38, y: 82 },
        { x: 28, y: 75 },
        { x: 22, y: 65 },
        { x: 20, y: 52 },
        { x: 25, y: 40 }
      ],
      // 두 번째 획: 중간 가로선
      [
        { x: 38, y: 45 },
        { x: 45, y: 42 },
        { x: 55, y: 45 },
        { x: 62, y: 50 },
        { x: 65, y: 55 },
        { x: 62, y: 62 },
        { x: 55, y: 68 },
        { x: 45, y: 70 },
        { x: 38, y: 65 }
      ],
      // 세 번째 획: 아래쪽 곡선
      [
        { x: 48, y: 75 },
        { x: 55, y: 72 },
        { x: 62, y: 75 },
        { x: 68, y: 80 },
        { x: 70, y: 85 },
        { x: 68, y: 90 },
        { x: 62, y: 92 },
        { x: 55, y: 90 },
        { x: 48, y: 85 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.33, points: [{ x: 25, y: 35 }, { x: 35, y: 30 }, { x: 50, y: 25 }] },
      { strokeIndex: 0, progress: 0.67, points: [{ x: 25, y: 35 }, { x: 35, y: 30 }, { x: 50, y: 25 }, { x: 65, y: 30 }, { x: 75, y: 35 }, { x: 82, y: 42 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 25, y: 35 }, { x: 35, y: 30 }, { x: 50, y: 25 }, { x: 65, y: 30 }, { x: 75, y: 35 }, { x: 82, y: 42 }, { x: 85, y: 52 }, { x: 82, y: 65 }, { x: 75, y: 75 }, { x: 65, y: 82 }, { x: 52, y: 85 }, { x: 38, y: 82 }, { x: 28, y: 75 }, { x: 22, y: 65 }, { x: 20, y: 52 }, { x: 25, y: 40 }] },
    ]
  },
  {
    char: "い",
    romaji: "i",
    type: "hiragana",
    completed: true,
    strokeCount: 2,
    difficulty: "easy",
    practiceCount: 8,
    accuracy: 92,
    strokes: [
      // 첫 번째 획: 왼쪽 세로선
      [
        { x: 35, y: 25 },
        { x: 35, y: 35 },
        { x: 35, y: 45 },
        { x: 35, y: 55 },
        { x: 35, y: 65 },
        { x: 35, y: 75 },
        { x: 35, y: 85 },
        { x: 35, y: 90 }
      ],
      // 두 번째 획: 오른쪽 곡선
      [
        { x: 65, y: 28 },
        { x: 68, y: 35 },
        { x: 70, y: 45 },
        { x: 68, y: 55 },
        { x: 65, y: 65 },
        { x: 62, y: 75 },
        { x: 58, y: 82 },
        { x: 52, y: 88 },
        { x: 45, y: 92 },
        { x: 38, y: 94 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.5, points: [{ x: 35, y: 25 }, { x: 35, y: 35 }, { x: 35, y: 45 }, { x: 35, y: 55 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 35, y: 25 }, { x: 35, y: 35 }, { x: 35, y: 45 }, { x: 35, y: 55 }, { x: 35, y: 65 }, { x: 35, y: 75 }, { x: 35, y: 85 }, { x: 35, y: 90 }] },
    ]
  },
  {
    char: "う",
    romaji: "u",
    type: "hiragana",
    completed: true,
    strokeCount: 2,
    difficulty: "medium",
    practiceCount: 12,
    accuracy: 78,
    strokes: [
      // 첫 번째 획: 위쪽 가로선
      [
        { x: 28, y: 35 },
        { x: 35, y: 32 },
        { x: 45, y: 28 },
        { x: 55, y: 28 },
        { x: 65, y: 32 },
        { x: 72, y: 35 }
      ],
      // 두 번째 획: 아래쪽 큰 곡선
      [
        { x: 62, y: 55 },
        { x: 68, y: 62 },
        { x: 75, y: 70 },
        { x: 78, y: 80 },
        { x: 75, y: 88 },
        { x: 68, y: 94 },
        { x: 58, y: 98 },
        { x: 45, y: 100 },
        { x: 32, y: 98 },
        { x: 22, y: 92 },
        { x: 18, y: 82 },
        { x: 20, y: 72 },
        { x: 25, y: 62 },
        { x: 32, y: 55 },
        { x: 42, y: 52 },
        { x: 52, y: 55 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.5, points: [{ x: 28, y: 35 }, { x: 35, y: 32 }, { x: 45, y: 28 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 28, y: 35 }, { x: 35, y: 32 }, { x: 45, y: 28 }, { x: 55, y: 28 }, { x: 65, y: 32 }, { x: 72, y: 35 }] },
    ]
  },
  {
    char: "え",
    romaji: "e",
    type: "hiragana",
    completed: true,
    strokeCount: 3,
    difficulty: "medium",
    practiceCount: 10,
    accuracy: 80,
    strokes: [
      // 첫 번째 획: 위쪽 가로선
      [
        { x: 25, y: 38 },
        { x: 35, y: 36 },
        { x: 45, y: 35 },
        { x: 55, y: 36 },
        { x: 65, y: 38 },
        { x: 75, y: 40 }
      ],
      // 두 번째 획: 왼쪽 세로선
      [
        { x: 38, y: 28 },
        { x: 38, y: 35 },
        { x: 38, y: 45 },
        { x: 38, y: 55 },
        { x: 36, y: 65 },
        { x: 34, y: 75 },
        { x: 32, y: 85 },
        { x: 28, y: 92 },
        { x: 25, y: 98 }
      ],
      // 세 번째 획: 오른쪽 곡선
      [
        { x: 48, y: 58 },
        { x: 55, y: 56 },
        { x: 62, y: 58 },
        { x: 68, y: 62 },
        { x: 72, y: 68 },
        { x: 74, y: 75 },
        { x: 72, y: 82 },
        { x: 68, y: 88 },
        { x: 62, y: 92 },
        { x: 55, y: 94 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.33, points: [{ x: 25, y: 38 }, { x: 35, y: 36 }] },
      { strokeIndex: 0, progress: 0.67, points: [{ x: 25, y: 38 }, { x: 35, y: 36 }, { x: 45, y: 35 }, { x: 55, y: 36 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 25, y: 38 }, { x: 35, y: 36 }, { x: 45, y: 35 }, { x: 55, y: 36 }, { x: 65, y: 38 }, { x: 75, y: 40 }] },
    ]
  },
  {
    char: "お",
    romaji: "o",
    type: "hiragana",
    completed: true,
    strokeCount: 4,
    difficulty: "hard",
    practiceCount: 18,
    accuracy: 72,
    strokes: [
      // 첫 번째 획: 위쪽 가로선
      [
        { x: 25, y: 32 },
        { x: 35, y: 30 },
        { x: 45, y: 29 },
        { x: 55, y: 30 },
        { x: 65, y: 32 },
        { x: 75, y: 34 }
      ],
      // 두 번째 획: 왼쪽 세로선
      [
        { x: 38, y: 22 },
        { x: 38, y: 32 },
        { x: 38, y: 42 },
        { x: 38, y: 52 },
        { x: 38, y: 62 },
        { x: 38, y: 72 },
        { x: 38, y: 82 },
        { x: 38, y: 92 }
      ],
      // 세 번째 획: 오른쪽 곡선 부분
      [
        { x: 52, y: 48 },
        { x: 58, y: 46 },
        { x: 64, y: 48 },
        { x: 68, y: 52 },
        { x: 70, y: 58 },
        { x: 68, y: 64 },
        { x: 64, y: 70 },
        { x: 58, y: 74 },
        { x: 52, y: 76 },
        { x: 46, y: 74 },
        { x: 42, y: 70 }
      ],
      // 네 번째 획: 아래쪽 가로선
      [
        { x: 22, y: 75 },
        { x: 32, y: 74 },
        { x: 42, y: 74 },
        { x: 52, y: 75 },
        { x: 62, y: 76 },
        { x: 72, y: 78 },
        { x: 80, y: 80 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.25, points: [{ x: 25, y: 32 }, { x: 35, y: 30 }] },
      { strokeIndex: 0, progress: 0.5, points: [{ x: 25, y: 32 }, { x: 35, y: 30 }, { x: 45, y: 29 }, { x: 55, y: 30 }] },
      { strokeIndex: 0, progress: 0.75, points: [{ x: 25, y: 32 }, { x: 35, y: 30 }, { x: 45, y: 29 }, { x: 55, y: 30 }, { x: 65, y: 32 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 25, y: 32 }, { x: 35, y: 30 }, { x: 45, y: 29 }, { x: 55, y: 30 }, { x: 65, y: 32 }, { x: 75, y: 34 }] },
    ]
  }
];

// 가타카나 획순 데이터 (제공된 이미지 기반)
export const katakanaStrokeData: CharacterStrokeData[] = [
  // ア단
  {
    char: "ア",
    romaji: "a",
    type: "katakana",
    completed: true,
    strokeCount: 3,
    difficulty: "medium",
    practiceCount: 14,
    accuracy: 88,
    strokes: [
      // 첫 번째 획: 왼쪽 세로선
      [
        { x: 35, y: 25 },
        { x: 35, y: 35 },
        { x: 35, y: 45 },
        { x: 35, y: 55 },
        { x: 35, y: 65 },
        { x: 35, y: 75 },
        { x: 35, y: 85 }
      ],
      // 두 번째 획: 오른쪽 대각선
      [
        { x: 65, y: 25 },
        { x: 62, y: 32 },
        { x: 58, y: 40 },
        { x: 54, y: 48 },
        { x: 48, y: 56 },
        { x: 42, y: 64 },
        { x: 35, y: 72 },
        { x: 28, y: 80 }
      ],
      // 세 번째 획: 가운데 가로선
      [
        { x: 25, y: 50 },
        { x: 32, y: 49 },
        { x: 40, y: 48 },
        { x: 48, y: 49 },
        { x: 56, y: 50 },
        { x: 64, y: 52 },
        { x: 70, y: 54 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.33, points: [{ x: 35, y: 25 }, { x: 35, y: 35 }, { x: 35, y: 45 }] },
      { strokeIndex: 0, progress: 0.67, points: [{ x: 35, y: 25 }, { x: 35, y: 35 }, { x: 35, y: 45 }, { x: 35, y: 55 }, { x: 35, y: 65 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 35, y: 25 }, { x: 35, y: 35 }, { x: 35, y: 45 }, { x: 35, y: 55 }, { x: 35, y: 65 }, { x: 35, y: 75 }, { x: 35, y: 85 }] },
    ]
  },
  {
    char: "イ",
    romaji: "i",
    type: "katakana",
    completed: true,
    strokeCount: 2,
    difficulty: "easy",
    practiceCount: 6,
    accuracy: 95,
    strokes: [
      // 첫 번째 획: 왼쪽 세로선
      [
        { x: 35, y: 25 },
        { x: 35, y: 35 },
        { x: 35, y: 45 },
        { x: 35, y: 55 },
        { x: 35, y: 65 },
        { x: 35, y: 75 },
        { x: 35, y: 85 }
      ],
      // 두 번째 획: 오른쪽 세로선
      [
        { x: 65, y: 30 },
        { x: 65, y: 40 },
        { x: 65, y: 50 },
        { x: 65, y: 60 },
        { x: 65, y: 70 },
        { x: 65, y: 80 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.5, points: [{ x: 35, y: 25 }, { x: 35, y: 35 }, { x: 35, y: 45 }, { x: 35, y: 55 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 35, y: 25 }, { x: 35, y: 35 }, { x: 35, y: 45 }, { x: 35, y: 55 }, { x: 35, y: 65 }, { x: 35, y: 75 }, { x: 35, y: 85 }] },
    ]
  },
  {
    char: "ウ",
    romaji: "u",
    type: "katakana",
    completed: true,
    strokeCount: 3,
    difficulty: "medium",
    practiceCount: 11,
    accuracy: 82,
    strokes: [
      // 첫 번째 획: 위쪽 가로선
      [
        { x: 25, y: 30 },
        { x: 35, y: 28 },
        { x: 45, y: 27 },
        { x: 55, y: 28 },
        { x: 65, y: 30 },
        { x: 75, y: 32 }
      ],
      // 두 번째 획: 왼쪽 세로선
      [
        { x: 35, y: 35 },
        { x: 35, y: 45 },
        { x: 35, y: 55 },
        { x: 35, y: 65 },
        { x: 35, y: 75 }
      ],
      // 세 번째 획: 오른쪽 세로선
      [
        { x: 65, y: 40 },
        { x: 65, y: 50 },
        { x: 65, y: 60 },
        { x: 65, y: 70 },
        { x: 62, y: 78 },
        { x: 58, y: 84 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.33, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }] },
      { strokeIndex: 0, progress: 0.67, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }, { x: 55, y: 28 }, { x: 65, y: 30 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }, { x: 55, y: 28 }, { x: 65, y: 30 }, { x: 75, y: 32 }] },
    ]
  },
  {
    char: "エ",
    romaji: "e",
    type: "katakana",
    completed: false,
    strokeCount: 3,
    difficulty: "easy",
    practiceCount: 0,
    accuracy: 0,
    strokes: [
      // 첫 번째 획: 위쪽 가로선
      [
        { x: 25, y: 30 },
        { x: 35, y: 28 },
        { x: 45, y: 27 },
        { x: 55, y: 28 },
        { x: 65, y: 30 },
        { x: 75, y: 32 }
      ],
      // 두 번째 획: 가운데 가로선
      [
        { x: 25, y: 50 },
        { x: 35, y: 49 },
        { x: 45, y: 48 },
        { x: 55, y: 49 },
        { x: 65, y: 50 },
        { x: 75, y: 52 }
      ],
      // 세 번째 획: 아래쪽 가로선
      [
        { x: 25, y: 70 },
        { x: 35, y: 69 },
        { x: 45, y: 68 },
        { x: 55, y: 69 },
        { x: 65, y: 70 },
        { x: 75, y: 72 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.33, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }] },
      { strokeIndex: 0, progress: 0.67, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }, { x: 55, y: 28 }, { x: 65, y: 30 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }, { x: 55, y: 28 }, { x: 65, y: 30 }, { x: 75, y: 32 }] },
    ]
  },
  {
    char: "オ",
    romaji: "o",
    type: "katakana",
    completed: false,
    strokeCount: 3,
    difficulty: "medium",
    practiceCount: 0,
    accuracy: 0,
    strokes: [
      // 첫 번째 획: 위쪽 가로선
      [
        { x: 25, y: 30 },
        { x: 35, y: 28 },
        { x: 45, y: 27 },
        { x: 55, y: 28 },
        { x: 65, y: 30 },
        { x: 75, y: 32 }
      ],
      // 두 번째 획: 세로선
      [
        { x: 50, y: 35 },
        { x: 50, y: 45 },
        { x: 50, y: 55 },
        { x: 50, y: 65 },
        { x: 50, y: 75 },
        { x: 50, y: 85 }
      ],
      // 세 번째 획: 대각선
      [
        { x: 25, y: 50 },
        { x: 32, y: 54 },
        { x: 40, y: 58 },
        { x: 48, y: 62 },
        { x: 56, y: 66 },
        { x: 64, y: 70 },
        { x: 72, y: 74 }
      ]
    ],
    animationFrames: [
      { strokeIndex: 0, progress: 0.33, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }] },
      { strokeIndex: 0, progress: 0.67, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }, { x: 55, y: 28 }, { x: 65, y: 30 }] },
      { strokeIndex: 0, progress: 1.0, points: [{ x: 25, y: 30 }, { x: 35, y: 28 }, { x: 45, y: 27 }, { x: 55, y: 28 }, { x: 65, y: 30 }, { x: 75, y: 32 }] },
    ]
  }
];

// 학습 진행도 데이터
export const learningProgress = {
  hiragana: {
    totalCharacters: 46,
    completedCharacters: 25,
    accuracy: 84,
    practiceTime: 1250, // 분
    currentStreak: 5,
    lastPracticeDate: "2024-01-15"
  },
  katakana: {
    totalCharacters: 46,
    completedCharacters: 12,
    accuracy: 76,
    practiceTime: 680,
    currentStreak: 2,
    lastPracticeDate: "2024-01-14"
  }
};

// 오디오 설정
export const audioConfig = {
  autoPlay: true,
  volume: 0.8,
  playbackRate: 1.0,
  pronunciationDelay: 500, // ms
  feedbackSounds: {
    correct: "/sounds/correct.mp3",
    incorrect: "/sounds/incorrect.mp3",
    complete: "/sounds/complete.mp3"
  }
};

// 캔버스 설정
export const canvasConfig = {
  strokeWidth: 5,
  guideOpacity: 0.2,
  animationDuration: 2000, // ms
  hintDelay: 500, // ms
  colors: {
    userStroke: "#1e40af",        // 더 진한 파란색
    correctStroke: "#059669",     // 더 진한 초록색
    incorrectStroke: "#dc2626",   // 더 진한 빨간색
    guide: "#64748b",             // 더 진한 회색
    hint: "#d97706",              // 더 진한 주황색
    background: "#ffffff"
  },
  touch: {
    enabled: true,
    preventDefault: true,
    minStrokeLength: 8
  }
};
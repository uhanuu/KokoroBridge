export const hiraganaGroups = [
  {
    id: 1,
    name: "あ단",
    romaji: "A-Dan",
    characters: [
      {
        char: "あ",
        romaji: "a",
        completed: true,
        strokeOrder: [
          "M50 30 Q80 40 90 70 Q85 90 70 95 Q50 100 30 90 Q20 70 30 50",
          "M35 45 Q50 35 65 45 Q70 55 60 65 Q45 70 35 60",
          "M45 75 Q60 70 70 80 Q65 90 55 85 Q45 80 45 75"
        ],
        strokePoints: [
          [{ x: 50, y: 30 }, { x: 80, y: 40 }, { x: 90, y: 70 }, { x: 85, y: 90 }, { x: 70, y: 95 }, { x: 50, y: 100 }, { x: 30, y: 90 }, { x: 20, y: 70 }, { x: 30, y: 50 }],
          [{ x: 35, y: 45 }, { x: 50, y: 35 }, { x: 65, y: 45 }, { x: 70, y: 55 }, { x: 60, y: 65 }, { x: 45, y: 70 }, { x: 35, y: 60 }],
          [{ x: 45, y: 75 }, { x: 60, y: 70 }, { x: 70, y: 80 }, { x: 65, y: 90 }, { x: 55, y: 85 }, { x: 45, y: 80 }, { x: 45, y: 75 }]
        ]
      },
      {
        char: "い",
        romaji: "i",
        completed: true,
        strokeOrder: [
          "M30 20 L30 95",
          "M70 25 Q75 50 70 75 Q65 95 60 100"
        ],
        strokePoints: [
          [{ x: 30, y: 20 }, { x: 30, y: 95 }],
          [{ x: 70, y: 25 }, { x: 75, y: 50 }, { x: 70, y: 75 }, { x: 65, y: 95 }, { x: 60, y: 100 }]
        ]
      },
      {
        char: "う",
        romaji: "u",
        completed: true,
        strokeOrder: [
          "M25 35 Q50 25 75 35",
          "M60 60 Q80 70 75 90 Q65 100 45 95 Q25 85 30 65 Q35 45 50 50"
        ],
        strokePoints: [
          [{ x: 25, y: 35 }, { x: 50, y: 25 }, { x: 75, y: 35 }],
          [{ x: 60, y: 60 }, { x: 80, y: 70 }, { x: 75, y: 90 }, { x: 65, y: 100 }, { x: 45, y: 95 }, { x: 25, y: 85 }, { x: 30, y: 65 }, { x: 35, y: 45 }, { x: 50, y: 50 }]
        ]
      },
      {
        char: "え",
        romaji: "e",
        completed: true,
        strokeOrder: [
          "M25 40 L75 40",
          "M35 25 Q40 45 35 65 Q30 85 25 100",
          "M45 60 Q65 55 75 65 Q70 85 60 90"
        ],
        strokePoints: [
          [{ x: 25, y: 40 }, { x: 75, y: 40 }],
          [{ x: 35, y: 25 }, { x: 40, y: 45 }, { x: 35, y: 65 }, { x: 30, y: 85 }, { x: 25, y: 100 }],
          [{ x: 45, y: 60 }, { x: 65, y: 55 }, { x: 75, y: 65 }, { x: 70, y: 85 }, { x: 60, y: 90 }]
        ]
      },
      {
        char: "お",
        romaji: "o",
        completed: true,
        strokeOrder: [
          "M25 30 L75 30",
          "M35 20 L35 95",
          "M50 50 Q70 45 75 65 Q70 85 55 90 Q40 85 45 70",
          "M20 75 L80 75"
        ],
        strokePoints: [
          [{ x: 25, y: 30 }, { x: 75, y: 30 }],
          [{ x: 35, y: 20 }, { x: 35, y: 95 }],
          [{ x: 50, y: 50 }, { x: 70, y: 45 }, { x: 75, y: 65 }, { x: 70, y: 85 }, { x: 55, y: 90 }, { x: 40, y: 85 }, { x: 45, y: 70 }],
          [{ x: 20, y: 75 }, { x: 80, y: 75 }]
        ]
      },
    ],
    color: "#22c55e",
    route: "/study/canvas/hiragana/a",
    progress: 100,
    completedCharacters: 5,
  },
  {
    id: 2,
    name: "か단",
    romaji: "Ka-Dan",
    characters: [
      {
        char: "か",
        romaji: "ka",
        completed: true,
        strokeOrder: [
          "M25 30 L75 30",
          "M35 20 L35 95",
          "M50 50 Q70 45 75 65 Q70 85 55 90 Q40 85 45 70"
        ],
        strokePoints: [
          [{ x: 25, y: 30 }, { x: 75, y: 30 }],
          [{ x: 35, y: 20 }, { x: 35, y: 95 }],
          [{ x: 50, y: 50 }, { x: 70, y: 45 }, { x: 75, y: 65 }, { x: 70, y: 85 }, { x: 55, y: 90 }, { x: 40, y: 85 }, { x: 45, y: 70 }]
        ]
      },
      {
        char: "き",
        romaji: "ki",
        completed: true,
        strokeOrder: [
          "M25 30 L75 30",
          "M35 20 L35 95",
          "M45 50 Q65 45 70 65"
        ],
        strokePoints: [
          [{ x: 25, y: 30 }, { x: 75, y: 30 }],
          [{ x: 35, y: 20 }, { x: 35, y: 95 }],
          [{ x: 45, y: 50 }, { x: 65, y: 45 }, { x: 70, y: 65 }]
        ]
      },
      {
        char: "く",
        romaji: "ku",
        completed: true,
        strokeOrder: [
          "M30 40 Q50 30 70 50 Q65 70 50 80"
        ],
        strokePoints: [
          [{ x: 30, y: 40 }, { x: 50, y: 30 }, { x: 70, y: 50 }, { x: 65, y: 70 }, { x: 50, y: 80 }]
        ]
      },
      {
        char: "け",
        romaji: "ke",
        completed: false,
        strokeOrder: [
          "M25 30 L75 30",
          "M35 20 L35 95",
          "M45 55 Q65 50 70 70"
        ],
        strokePoints: [
          [{ x: 25, y: 30 }, { x: 75, y: 30 }],
          [{ x: 35, y: 20 }, { x: 35, y: 95 }],
          [{ x: 45, y: 55 }, { x: 65, y: 50 }, { x: 70, y: 70 }]
        ]
      },
      {
        char: "こ",
        romaji: "ko",
        completed: false,
        strokeOrder: [
          "M25 40 Q50 30 75 40",
          "M30 70 Q50 60 70 70"
        ],
        strokePoints: [
          [{ x: 25, y: 40 }, { x: 50, y: 30 }, { x: 75, y: 40 }],
          [{ x: 30, y: 70 }, { x: 50, y: 60 }, { x: 70, y: 70 }]
        ]
      },
    ],
    color: "#3b82f6",
    route: "/study/canvas/hiragana/ka",
    progress: 60,
    completedCharacters: 3,
  },
  {
    id: 3,
    name: "さ단",
    romaji: "Sa-Dan",
    characters: [
      {
        char: "さ",
        romaji: "sa",
        completed: true,
        strokeOrder: ["M25 30 L75 30", "M35 20 L35 95", "M45 55 Q65 50 70 70"],
        strokePoints: [[{ x: 25, y: 30 }, { x: 75, y: 30 }], [{ x: 35, y: 20 }, { x: 35, y: 95 }], [{ x: 45, y: 55 }, { x: 65, y: 50 }, { x: 70, y: 70 }]]
      },
      {
        char: "し",
        romaji: "shi",
        completed: true,
        strokeOrder: ["M40 25 Q45 50 40 75 Q35 95 30 100"],
        strokePoints: [[{ x: 40, y: 25 }, { x: 45, y: 50 }, { x: 40, y: 75 }, { x: 35, y: 95 }, { x: 30, y: 100 }]]
      },
      {
        char: "す",
        romaji: "su",
        completed: false,
        strokeOrder: ["M25 35 Q50 25 75 35", "M60 60 Q80 70 75 90"],
        strokePoints: [[{ x: 25, y: 35 }, { x: 50, y: 25 }, { x: 75, y: 35 }], [{ x: 60, y: 60 }, { x: 80, y: 70 }, { x: 75, y: 90 }]]
      },
      {
        char: "せ",
        romaji: "se",
        completed: false,
        strokeOrder: ["M25 40 L75 40", "M35 25 L35 95", "M45 60 Q65 55 75 65"],
        strokePoints: [[{ x: 25, y: 40 }, { x: 75, y: 40 }], [{ x: 35, y: 25 }, { x: 35, y: 95 }], [{ x: 45, y: 60 }, { x: 65, y: 55 }, { x: 75, y: 65 }]]
      },
      {
        char: "そ",
        romaji: "so",
        completed: false,
        strokeOrder: ["M25 35 Q50 25 75 35", "M40 55 Q60 50 65 70"],
        strokePoints: [[{ x: 25, y: 35 }, { x: 50, y: 25 }, { x: 75, y: 35 }], [{ x: 40, y: 55 }, { x: 60, y: 50 }, { x: 65, y: 70 }]]
      },
    ],
    color: "#f59e0b",
    route: "/study/canvas/hiragana/sa",
    progress: 40,
    completedCharacters: 2,
  },
  {
    id: 4,
    name: "た단",
    romaji: "Ta-Dan",
    characters: [
      { char: "た", romaji: "ta", completed: true },
      { char: "ち", romaji: "chi", completed: false },
      { char: "つ", romaji: "tsu", completed: false },
      { char: "て", romaji: "te", completed: false },
      { char: "と", romaji: "to", completed: false },
    ],
    color: "#8b5cf6",
    route: "/study/canvas/hiragana/ta",
    progress: 20,
    completedCharacters: 1,
  },
  {
    id: 5,
    name: "な단",
    romaji: "Na-Dan",
    characters: [
      { char: "な", romaji: "na", completed: false },
      { char: "に", romaji: "ni", completed: false },
      { char: "ぬ", romaji: "nu", completed: false },
      { char: "ね", romaji: "ne", completed: false },
      { char: "の", romaji: "no", completed: false },
    ],
    color: "#ef4444",
    route: "/study/canvas/hiragana/na",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 6,
    name: "は단",
    romaji: "Ha-Dan",
    characters: [
      { char: "は", romaji: "ha", completed: false },
      { char: "ひ", romaji: "hi", completed: false },
      { char: "ふ", romaji: "fu", completed: false },
      { char: "へ", romaji: "he", completed: false },
      { char: "ほ", romaji: "ho", completed: false },
    ],
    color: "#06b6d4",
    route: "/study/canvas/hiragana/ha",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 7,
    name: "ま단",
    romaji: "Ma-Dan",
    characters: [
      { char: "ま", romaji: "ma", completed: false },
      { char: "み", romaji: "mi", completed: false },
      { char: "む", romaji: "mu", completed: false },
      { char: "め", romaji: "me", completed: false },
      { char: "も", romaji: "mo", completed: false },
    ],
    color: "#84cc16",
    route: "/study/canvas/hiragana/ma",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 8,
    name: "야행",
    romaji: "Ya-Gyou",
    characters: [
      { char: "や", romaji: "ya", completed: false },
      { char: "ゆ", romaji: "yu", completed: false },
      { char: "よ", romaji: "yo", completed: false },
    ],
    color: "#f97316",
    route: "/study/canvas/hiragana/ya",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 9,
    name: "ら단",
    romaji: "Ra-Dan",
    characters: [
      { char: "ら", romaji: "ra", completed: false },
      { char: "り", romaji: "ri", completed: false },
      { char: "る", romaji: "ru", completed: false },
      { char: "れ", romaji: "re", completed: false },
      { char: "ろ", romaji: "ro", completed: false },
    ],
    color: "#a855f7",
    route: "/study/canvas/hiragana/ra",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 10,
    name: "わ행",
    romaji: "Wa-Gyou",
    characters: [
      { char: "わ", romaji: "wa", completed: false },
      { char: "を", romaji: "wo", completed: false },
      { char: "ん", romaji: "n", completed: false },
    ],
    color: "#14b8a6",
    route: "/study/canvas/hiragana/wa",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 11,
    name: "탁음",
    romaji: "Dakuten",
    characters: [
      { char: "が", romaji: "ga", completed: false },
      { char: "ざ", romaji: "za", completed: false },
      { char: "だ", romaji: "da", completed: false },
      { char: "ば", romaji: "ba", completed: false },
      { char: "ぱ", romaji: "pa", completed: false },
    ],
    color: "#6366f1",
    route: "/study/canvas/hiragana/dakuten",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 12,
    name: "반탁음",
    romaji: "Handakuten",
    characters: [
      { char: "ぱ", romaji: "pa", completed: false },
      { char: "ぴ", romaji: "pi", completed: false },
      { char: "ぷ", romaji: "pu", completed: false },
      { char: "ぺ", romaji: "pe", completed: false },
      { char: "ぽ", romaji: "po", completed: false },
    ],
    color: "#ec4899",
    route: "/study/canvas/hiragana/handakuten",
    progress: 0,
    completedCharacters: 0,
  },
];
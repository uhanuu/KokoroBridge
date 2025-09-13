import { hiraganaData } from "./hiragana";
import { katakanaData } from "./katakana";

export const allKanaData = [...hiraganaData, ...katakanaData];

// 기본 50음 순서로 정렬된 데이터
export const hiraganaBasic50 = hiraganaData.slice(0, 46); // ん까지
export const katakanaBasic50 = katakanaData.slice(0, 46); // ン까지

// 탁음만 추출
export const hiraganaDakuten = hiraganaData.filter((kana) =>
  [
    "が",
    "ぎ",
    "ぐ",
    "げ",
    "ご",
    "ざ",
    "じ",
    "ず",
    "ぜ",
    "ぞ",
    "だ",
    "ぢ",
    "づ",
    "で",
    "ど",
    "ば",
    "び",
    "ぶ",
    "べ",
    "ぼ",
  ].includes(kana.char)
);

export const katakanaDakuten = katakanaData.filter((kana) =>
  [
    "ガ",
    "ギ",
    "グ",
    "ゲ",
    "ゴ",
    "ザ",
    "ジ",
    "ズ",
    "ゼ",
    "ゾ",
    "ダ",
    "ヂ",
    "ヅ",
    "デ",
    "ド",
    "バ",
    "ビ",
    "ブ",
    "ベ",
    "ボ",
  ].includes(kana.char)
);

// 반탁음만 추출
export const hiraganaHandakuten = hiraganaData.filter((kana) =>
  ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"].includes(kana.char)
);

export const katakanaHandakuten = katakanaData.filter((kana) =>
  ["パ", "ピ", "プ", "ペ", "ポ"].includes(kana.char)
);

// 행별로 분류
export const hiraganaByRow = {
  a: hiraganaData.filter((kana) => ["あ", "い", "う", "え", "お"].includes(kana.char)),
  ka: hiraganaData.filter((kana) =>
    ["か", "き", "く", "け", "こ", "が", "ぎ", "ぐ", "げ", "ご"].includes(kana.char)
  ),
  sa: hiraganaData.filter((kana) =>
    ["さ", "し", "す", "せ", "そ", "ざ", "じ", "ず", "ぜ", "ぞ"].includes(kana.char)
  ),
  ta: hiraganaData.filter((kana) =>
    ["た", "ち", "つ", "て", "と", "だ", "ぢ", "づ", "で", "ど"].includes(kana.char)
  ),
  na: hiraganaData.filter((kana) => ["な", "に", "ぬ", "ね", "の"].includes(kana.char)),
  ha: hiraganaData.filter((kana) =>
    [
      "は",
      "ひ",
      "ふ",
      "へ",
      "ほ",
      "ば",
      "び",
      "ぶ",
      "べ",
      "ぼ",
      "ぱ",
      "ぴ",
      "ぷ",
      "ぺ",
      "ぽ",
    ].includes(kana.char)
  ),
  ma: hiraganaData.filter((kana) => ["ま", "み", "む", "め", "も"].includes(kana.char)),
  ya: hiraganaData.filter((kana) => ["や", "ゆ", "よ"].includes(kana.char)),
  ra: hiraganaData.filter((kana) => ["ら", "り", "る", "れ", "ろ"].includes(kana.char)),
  wa: hiraganaData.filter((kana) => ["わ", "を", "ん"].includes(kana.char)),
};

export const katakanaByRow = {
  a: katakanaData.filter((kana) => ["ア", "イ", "ウ", "エ", "オ"].includes(kana.char)),
  ka: katakanaData.filter((kana) =>
    ["カ", "キ", "ク", "ケ", "コ", "ガ", "ギ", "グ", "ゲ", "ゴ"].includes(kana.char)
  ),
  sa: katakanaData.filter((kana) =>
    ["サ", "シ", "ス", "セ", "ソ", "ザ", "ジ", "ズ", "ゼ", "ゾ"].includes(kana.char)
  ),
  ta: katakanaData.filter((kana) =>
    ["タ", "チ", "ツ", "テ", "ト", "ダ", "ヂ", "ヅ", "デ", "ド"].includes(kana.char)
  ),
  na: katakanaData.filter((kana) => ["ナ", "ニ", "ヌ", "ネ", "ノ"].includes(kana.char)),
  ha: katakanaData.filter((kana) =>
    [
      "ハ",
      "ヒ",
      "フ",
      "ヘ",
      "ホ",
      "バ",
      "ビ",
      "ブ",
      "ベ",
      "ボ",
      "パ",
      "ピ",
      "プ",
      "ペ",
      "ポ",
    ].includes(kana.char)
  ),
  ma: katakanaData.filter((kana) => ["マ", "ミ", "ム", "メ", "モ"].includes(kana.char)),
  ya: katakanaData.filter((kana) => ["ヤ", "ユ", "ヨ"].includes(kana.char)),
  ra: katakanaData.filter((kana) => ["ラ", "リ", "ル", "レ", "ロ"].includes(kana.char)),
  wa: katakanaData.filter((kana) => ["ワ", "ヰ", "ヱ", "ヲ", "ン"].includes(kana.char)),
};

// 난이도별 분류
export const kanaByDifficulty = {
  beginner: {
    hiragana: hiraganaData.filter((kana) =>
      [
        "あ",
        "い",
        "う",
        "え",
        "お",
        "か",
        "き",
        "く",
        "け",
        "こ",
        "さ",
        "し",
        "す",
        "せ",
        "そ",
        "た",
        "ち",
        "つ",
        "て",
        "と",
        "な",
        "に",
        "ぬ",
        "ね",
        "の",
      ].includes(kana.char)
    ),
    katakana: katakanaData.filter((kana) =>
      [
        "ア",
        "イ",
        "ウ",
        "エ",
        "オ",
        "カ",
        "キ",
        "ク",
        "ケ",
        "コ",
        "サ",
        "シ",
        "ス",
        "セ",
        "ソ",
        "タ",
        "チ",
        "ツ",
        "テ",
        "ト",
        "ナ",
        "ニ",
        "ヌ",
        "ネ",
        "ノ",
      ].includes(kana.char)
    ),
  },
  intermediate: {
    hiragana: hiraganaData.filter((kana) =>
      [
        "は",
        "ひ",
        "ふ",
        "へ",
        "ほ",
        "ま",
        "み",
        "む",
        "め",
        "も",
        "や",
        "ゆ",
        "よ",
        "ら",
        "り",
        "る",
        "れ",
        "ろ",
        "わ",
        "を",
        "ん",
      ].includes(kana.char)
    ),
    katakana: katakanaData.filter((kana) =>
      [
        "ハ",
        "ヒ",
        "フ",
        "ヘ",
        "ホ",
        "マ",
        "ミ",
        "ム",
        "メ",
        "モ",
        "ヤ",
        "ユ",
        "ヨ",
        "ラ",
        "リ",
        "ル",
        "レ",
        "ロ",
        "ワ",
        "ヲ",
        "ン",
      ].includes(kana.char)
    ),
  },
  advanced: {
    hiragana: [...hiraganaDakuten, ...hiraganaHandakuten],
    katakana: [...katakanaDakuten, ...katakanaHandakuten],
  },
};

"use client";

import React from "react";

import StudyCharacterPage from "@/components/study-character-page";

const katakanaGroups = [
  {
    id: 1,
    name: "ア단",
    romaji: "A-Dan",
    characters: [
      { char: "ア", romaji: "a", completed: true },
      { char: "イ", romaji: "i", completed: true },
      { char: "ウ", romaji: "u", completed: true },
      { char: "エ", romaji: "e", completed: true },
      { char: "オ", romaji: "o", completed: false },
    ],
    color: "#22c55e",
    route: "/study/canvas/katakana/a",
    progress: 80,
    completedCharacters: 4,
  },
  {
    id: 2,
    name: "カ단",
    romaji: "Ka-Dan",
    characters: [
      { char: "カ", romaji: "ka", completed: true },
      { char: "キ", romaji: "ki", completed: true },
      { char: "ク", romaji: "ku", completed: false },
      { char: "ケ", romaji: "ke", completed: false },
      { char: "コ", romaji: "ko", completed: false },
    ],
    color: "#3b82f6",
    route: "/study/canvas/katakana/ka",
    progress: 40,
    completedCharacters: 2,
  },
  {
    id: 3,
    name: "サ단",
    romaji: "Sa-Dan",
    characters: [
      { char: "サ", romaji: "sa", completed: true },
      { char: "シ", romaji: "shi", completed: false },
      { char: "ス", romaji: "su", completed: false },
      { char: "セ", romaji: "se", completed: false },
      { char: "ソ", romaji: "so", completed: false },
    ],
    color: "#f59e0b",
    route: "/study/canvas/katakana/sa",
    progress: 20,
    completedCharacters: 1,
  },
  {
    id: 4,
    name: "タ단",
    romaji: "Ta-Dan",
    characters: [
      { char: "タ", romaji: "ta", completed: false },
      { char: "チ", romaji: "chi", completed: false },
      { char: "ツ", romaji: "tsu", completed: false },
      { char: "テ", romaji: "te", completed: false },
      { char: "ト", romaji: "to", completed: false },
    ],
    color: "#8b5cf6",
    route: "/study/canvas/katakana/ta",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 5,
    name: "ナ단",
    romaji: "Na-Dan",
    characters: [
      { char: "ナ", romaji: "na", completed: false },
      { char: "ニ", romaji: "ni", completed: false },
      { char: "ヌ", romaji: "nu", completed: false },
      { char: "ネ", romaji: "ne", completed: false },
      { char: "ノ", romaji: "no", completed: false },
    ],
    color: "#ef4444",
    route: "/study/canvas/katakana/na",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 6,
    name: "ハ단",
    romaji: "Ha-Dan",
    characters: [
      { char: "ハ", romaji: "ha", completed: false },
      { char: "ヒ", romaji: "hi", completed: false },
      { char: "フ", romaji: "fu", completed: false },
      { char: "ヘ", romaji: "he", completed: false },
      { char: "ホ", romaji: "ho", completed: false },
    ],
    color: "#06b6d4",
    route: "/study/canvas/katakana/ha",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 7,
    name: "マ단",
    romaji: "Ma-Dan",
    characters: [
      { char: "マ", romaji: "ma", completed: false },
      { char: "ミ", romaji: "mi", completed: false },
      { char: "ム", romaji: "mu", completed: false },
      { char: "メ", romaji: "me", completed: false },
      { char: "モ", romaji: "mo", completed: false },
    ],
    color: "#84cc16",
    route: "/study/canvas/katakana/ma",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 8,
    name: "ヤ행",
    romaji: "Ya-Gyou",
    characters: [
      { char: "ヤ", romaji: "ya", completed: false },
      { char: "ユ", romaji: "yu", completed: false },
      { char: "ヨ", romaji: "yo", completed: false },
    ],
    color: "#f97316",
    route: "/study/canvas/katakana/ya",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 9,
    name: "ラ단",
    romaji: "Ra-Dan",
    characters: [
      { char: "ラ", romaji: "ra", completed: false },
      { char: "リ", romaji: "ri", completed: false },
      { char: "ル", romaji: "ru", completed: false },
      { char: "レ", romaji: "re", completed: false },
      { char: "ロ", romaji: "ro", completed: false },
    ],
    color: "#a855f7",
    route: "/study/canvas/katakana/ra",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 10,
    name: "ワ행",
    romaji: "Wa-Gyou",
    characters: [
      { char: "ワ", romaji: "wa", completed: false },
      { char: "ヲ", romaji: "wo", completed: false },
      { char: "ン", romaji: "n", completed: false },
    ],
    color: "#14b8a6",
    route: "/study/canvas/katakana/wa",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 11,
    name: "탁음",
    romaji: "Dakuten",
    characters: [
      { char: "ガ", romaji: "ga", completed: false },
      { char: "ザ", romaji: "za", completed: false },
      { char: "ダ", romaji: "da", completed: false },
      { char: "バ", romaji: "ba", completed: false },
      { char: "パ", romaji: "pa", completed: false },
    ],
    color: "#6366f1",
    route: "/study/canvas/katakana/dakuten",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 12,
    name: "반탁음",
    romaji: "Handakuten",
    characters: [
      { char: "パ", romaji: "pa", completed: false },
      { char: "ピ", romaji: "pi", completed: false },
      { char: "プ", romaji: "pu", completed: false },
      { char: "ペ", romaji: "pe", completed: false },
      { char: "ポ", romaji: "po", completed: false },
    ],
    color: "#ec4899",
    route: "/study/canvas/katakana/handakuten",
    progress: 0,
    completedCharacters: 0,
  },
];

export default function KatakanaPage() {
  return (
    <StudyCharacterPage
      title="카타카나"
      subtitle="학습할 그룹을 선택하세요"
      swipeText="좌우로 드래그하여 그룹을 탐색하세요"
      groups={katakanaGroups}
      backRoute="/study"
    />
  );
}

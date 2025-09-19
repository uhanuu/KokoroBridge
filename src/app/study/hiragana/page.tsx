"use client";

import React from "react";

import StudyCharacterPage from "@/components/study-character-page";

const hiraganaGroups = [
  {
    id: 1,
    name: "あ단",
    romaji: "A-Dan",
    characters: [
      { char: "あ", romaji: "a", completed: true },
      { char: "い", romaji: "i", completed: true },
      { char: "う", romaji: "u", completed: true },
      { char: "え", romaji: "e", completed: true },
      { char: "お", romaji: "o", completed: true },
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
      { char: "か", romaji: "ka", completed: true },
      { char: "き", romaji: "ki", completed: true },
      { char: "く", romaji: "ku", completed: true },
      { char: "け", romaji: "ke", completed: false },
      { char: "こ", romaji: "ko", completed: false },
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
      { char: "さ", romaji: "sa", completed: true },
      { char: "し", romaji: "shi", completed: true },
      { char: "す", romaji: "su", completed: false },
      { char: "せ", romaji: "se", completed: false },
      { char: "そ", romaji: "so", completed: false },
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
    name: "や행",
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

export default function HiraganaPage() {
  return (
    <StudyCharacterPage
      title="히라가나"
      subtitle="학습할 그룹을 선택하세요"
      swipeText="좌우로 드래그하여 그룹을 탐색하세요"
      groups={hiraganaGroups}
      backRoute="/study"
    />
  );
}

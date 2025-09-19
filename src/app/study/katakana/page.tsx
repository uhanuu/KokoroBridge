"use client";

import { useRouter } from "next/navigation";
import React from "react";

import GroupSelector from "@/components/group-selector";

const katakanaGroups = [
  {
    id: 1,
    name: "ア단",
    romaji: "A-Dan",
    characters: ["ア", "イ", "ウ", "エ", "オ"],
    color: "#22c55e",
    route: "/study/canvas/katakana/a",
    progress: 80,
    completedCharacters: 4,
  },
  {
    id: 2,
    name: "カ단",
    romaji: "Ka-Dan",
    characters: ["カ", "キ", "ク", "ケ", "コ"],
    color: "#3b82f6",
    route: "/study/canvas/katakana/ka",
    progress: 40,
    completedCharacters: 2,
  },
  {
    id: 3,
    name: "サ단",
    romaji: "Sa-Dan",
    characters: ["サ", "シ", "ス", "セ", "ソ"],
    color: "#f59e0b",
    route: "/study/canvas/katakana/sa",
    progress: 20,
    completedCharacters: 1,
  },
  {
    id: 4,
    name: "タ단",
    romaji: "Ta-Dan",
    characters: ["タ", "チ", "ツ", "テ", "ト"],
    color: "#8b5cf6",
    route: "/study/canvas/katakana/ta",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 5,
    name: "ナ단",
    romaji: "Na-Dan",
    characters: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
    color: "#ef4444",
    route: "/study/canvas/katakana/na",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 6,
    name: "ハ단",
    romaji: "Ha-Dan",
    characters: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
    color: "#06b6d4",
    route: "/study/canvas/katakana/ha",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 7,
    name: "マ단",
    romaji: "Ma-Dan",
    characters: ["マ", "ミ", "ム", "メ", "モ"],
    color: "#84cc16",
    route: "/study/canvas/katakana/ma",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 8,
    name: "ヤ행",
    romaji: "Ya-Gyou",
    characters: ["ヤ", "ユ", "ヨ"],
    color: "#f97316",
    route: "/study/canvas/katakana/ya",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 9,
    name: "ラ단",
    romaji: "Ra-Dan",
    characters: ["ラ", "リ", "ル", "レ", "ロ"],
    color: "#a855f7",
    route: "/study/canvas/katakana/ra",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 10,
    name: "ワ행",
    romaji: "Wa-Gyou",
    characters: ["ワ", "ヲ", "ン"],
    color: "#14b8a6",
    route: "/study/canvas/katakana/wa",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 11,
    name: "탁음",
    romaji: "Dakuten",
    characters: ["ガ", "ザ", "ダ", "バ", "パ"],
    color: "#6366f1",
    route: "/study/canvas/katakana/dakuten",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 12,
    name: "반탁음",
    romaji: "Handakuten",
    characters: ["パ", "ピ", "プ", "ペ", "ポ"],
    color: "#ec4899",
    route: "/study/canvas/katakana/handakuten",
    progress: 0,
    completedCharacters: 0,
  },
];

export default function KatakanaPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/study");
  };

  return (
    <GroupSelector
      groups={katakanaGroups}
      title="가타카나"
      subtitle="학습할 그룹을 선택하세요"
      onBack={handleBack}
    />
  );
}
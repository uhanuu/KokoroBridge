"use client";

import { RecordVoiceOver, Lock } from "@mui/icons-material";
import { Typography, LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import ActionButton from "@/components/ui/button/action-button";
import Card from "@/components/ui/card";
import GroupSelector from "@/components/group-selector";

import styles from "./page.module.css";

const studyCategories = [
  {
    id: 1,
    title: "히라가나",
    subtitle: "あいうえお",
    color: "#22c55e",
    icon: "あ",
    description: "일본어의 기본 문자",
    route: "/study/hiragana",
    isLocked: false,
    progress: 45,
    totalCharacters: 60,
    completedCharacters: 27,
  },
  {
    id: 2,
    title: "가타카나",
    subtitle: "アイウエオ",
    color: "#3b82f6",
    icon: "ア",
    description: "외래어 표기 문자",
    route: "/study/katakana",
    isLocked: false,
    progress: 25,
    totalCharacters: 60,
    completedCharacters: 15,
  },
  {
    id: 3,
    title: "한자",
    subtitle: "漢字",
    color: "#f59e0b",
    icon: "漢",
    description: "일본 한자 학습",
    route: "/study/kanji",
    isLocked: true,
    progress: 0,
    totalCharacters: 100,
    completedCharacters: 0,
  },
  {
    id: 4,
    title: "AI 회화",
    subtitle: "会話練習",
    color: "#8b5cf6",
    icon: RecordVoiceOver,
    description: "AI와 대화 연습",
    route: "/study/conversation",
    isLocked: true,
    progress: 0,
    totalCharacters: 50,
    completedCharacters: 0,
  },
];

const hiraganaGroups = [
  {
    id: 1,
    name: "あ단",
    romaji: "A-Dan",
    characters: ["あ", "い", "う", "え", "お"],
    color: "#22c55e",
    route: "/study/canvas/hiragana/a",
    progress: 100,
    completedCharacters: 5,
  },
  {
    id: 2,
    name: "か단",
    romaji: "Ka-Dan",
    characters: ["か", "き", "く", "け", "こ"],
    color: "#3b82f6",
    route: "/study/canvas/hiragana/ka",
    progress: 60,
    completedCharacters: 3,
  },
  {
    id: 3,
    name: "さ단",
    romaji: "Sa-Dan",
    characters: ["さ", "し", "す", "せ", "そ"],
    color: "#f59e0b",
    route: "/study/canvas/hiragana/sa",
    progress: 40,
    completedCharacters: 2,
  },
  {
    id: 4,
    name: "た단",
    romaji: "Ta-Dan",
    characters: ["た", "ち", "つ", "て", "と"],
    color: "#8b5cf6",
    route: "/study/canvas/hiragana/ta",
    progress: 20,
    completedCharacters: 1,
  },
  {
    id: 5,
    name: "な단",
    romaji: "Na-Dan",
    characters: ["な", "に", "ぬ", "ね", "の"],
    color: "#ef4444",
    route: "/study/canvas/hiragana/na",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 6,
    name: "は단",
    romaji: "Ha-Dan",
    characters: ["は", "ひ", "ふ", "へ", "ほ"],
    color: "#06b6d4",
    route: "/study/canvas/hiragana/ha",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 7,
    name: "ま단",
    romaji: "Ma-Dan",
    characters: ["ま", "み", "む", "め", "も"],
    color: "#84cc16",
    route: "/study/canvas/hiragana/ma",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 8,
    name: "야행",
    romaji: "Ya-Gyou",
    characters: ["や", "ゆ", "よ"],
    color: "#f97316",
    route: "/study/canvas/hiragana/ya",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 9,
    name: "ら단",
    romaji: "Ra-Dan",
    characters: ["ら", "り", "る", "れ", "ろ"],
    color: "#a855f7",
    route: "/study/canvas/hiragana/ra",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 10,
    name: "わ행",
    romaji: "Wa-Gyou",
    characters: ["わ", "を", "ん"],
    color: "#14b8a6",
    route: "/study/canvas/hiragana/wa",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 11,
    name: "탁음",
    romaji: "Dakuten",
    characters: ["が", "ざ", "だ", "ば", "ぱ"],
    color: "#6366f1",
    route: "/study/canvas/hiragana/dakuten",
    progress: 0,
    completedCharacters: 0,
  },
  {
    id: 12,
    name: "반탁음",
    romaji: "Handakuten",
    characters: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
    color: "#ec4899",
    route: "/study/canvas/hiragana/handakuten",
    progress: 0,
    completedCharacters: 0,
  },
];

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

export default function StudyPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: typeof studyCategories[0]) => {
    if (category.isLocked) return;

    if (category.id === 1) { // 히라가나
      setSelectedCategory("hiragana");
    } else if (category.id === 2) { // 가타카나
      setSelectedCategory("katakana");
    } else {
      router.push(category.route);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  // 히라가나 그룹 선택 화면
  if (selectedCategory === "hiragana") {
    return (
      <GroupSelector
        groups={hiraganaGroups}
        title="히라가나"
        subtitle="학습할 그룹을 선택하세요"
        onBack={handleBackToCategories}
      />
    );
  }

  // 가타카나 그룹 선택 화면
  if (selectedCategory === "katakana") {
    return (
      <GroupSelector
        groups={katakanaGroups}
        title="가타카나"
        subtitle="학습할 그룹을 선택하세요"
        onBack={handleBackToCategories}
      />
    );
  }

  // 기본 카테고리 선택 화면
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          학습하기
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          원하는 학습 카테고리를 선택해주세요
        </Typography>
      </div>

      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.categoriesCard}
      >
        <div className={styles.categoriesGrid}>
            {studyCategories.map((category) => {
              return (
                <div
                  key={category.id}
                  className={`${styles.categoryItem} ${
                    category.isLocked ? styles.locked : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.isLocked && <div className={styles.lockOverlay} />}
                  <div className={styles.categoryHeader}>
                    <div
                      className={styles.categoryIcon}
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      {typeof category.icon === "string" ? (
                        <span
                          className={styles.iconText}
                          style={{ color: category.color, opacity: category.isLocked ? 0.3 : 1 }}
                        >
                          {category.icon}
                        </span>
                      ) : (
                        <category.icon
                          style={{ color: category.color, opacity: category.isLocked ? 0.3 : 1 }}
                        />
                      )}
                      {category.isLocked && (
                        <div className={styles.lockIconOverlay}>
                          <Lock className={styles.lockIcon} />
                        </div>
                      )}
                    </div>
                    <div className={styles.categoryInfo}>
                      <Typography variant="h6" className={styles.categoryTitle}>
                        {category.title}
                      </Typography>
                      <Typography variant="body2" className={styles.categorySubtitle}>
                        {category.subtitle}
                      </Typography>
                    </div>
                  </div>

                  <Typography variant="body2" className={styles.categoryDescription}>
                    {category.isLocked ? "곧 출시 예정" : category.description}
                  </Typography>

                  {/* 진행률 표시 */}
                  {!category.isLocked && (
                    <div className={styles.progressSection}>
                      <div className={styles.progressHeader}>
                        <Typography variant="caption" className={styles.progressLabel}>
                          학습 진행도
                        </Typography>
                        <Typography variant="caption" className={styles.progressStats}>
                          {category.completedCharacters}/{category.totalCharacters} ({category.progress}%)
                        </Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={category.progress}
                        className={styles.progressBar}
                        sx={{
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: category.color,
                          },
                        }}
                      />
                    </div>
                  )}

                  <ActionButton
                    text={category.isLocked ? "잠금됨" : "시작하기"}
                    variant={category.isLocked ? "locked" : "primary"}
                    disabled={category.isLocked}
                    onClick={() => handleCategoryClick(category)}
                  />
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
}
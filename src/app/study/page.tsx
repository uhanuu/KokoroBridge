"use client";

import { RecordVoiceOver, Lock } from "@mui/icons-material";
import { Typography, LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import ActionButton from "@/components/ui/button/action-button";
import Card from "@/components/ui/card";

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


export default function StudyPage() {
  const router = useRouter();

  const handleCategoryClick = (category: typeof studyCategories[0]) => {
    if (category.isLocked) return;
    router.push(category.route);
  };

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
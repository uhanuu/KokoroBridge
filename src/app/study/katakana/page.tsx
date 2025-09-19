"use client";

import { ArrowBack } from "@mui/icons-material";
import { Typography, IconButton, LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import ActionButton from "@/components/ui/button/action-button";
import Card from "@/components/ui/card";

import styles from "./page.module.css";

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

  const handleBackClick = () => {
    router.push("/study");
  };

  const handleGroupClick = (group: typeof katakanaGroups[0]) => {
    router.push(group.route);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <IconButton onClick={handleBackClick} className={styles.backButton}>
            <ArrowBack />
          </IconButton>
          <div className={styles.headerContent}>
            <Typography variant="h4" className={styles.title}>
              가타카나
            </Typography>
            <Typography variant="body1" className={styles.subtitle}>
              학습할 그룹을 선택해주세요
            </Typography>
          </div>
        </div>
      </div>

      <div className={styles.groupsGrid}>
        {katakanaGroups.map((group) => (
          <Card
            key={group.id}
            variant="default"
            size="lg"
            padding="xl"
            borderRadius="2xl"
            className={styles.groupCard}
          >
              <div className={styles.groupHeader}>
                <div
                  className={styles.groupIcon}
                  style={{ backgroundColor: `${group.color}20` }}
                >
                  <span className={styles.iconText} style={{ color: group.color }}>
                    {group.characters[0]}
                  </span>
                </div>
                <div className={styles.groupInfo}>
                  <Typography variant="h6" className={styles.groupName}>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" className={styles.groupRomaji}>
                    {group.romaji}
                  </Typography>
                </div>
              </div>

              <div className={styles.charactersGrid}>
                {group.characters.map((char, index) => (
                  <div key={index} className={styles.characterItem}>
                    <span className={styles.character}>{char}</span>
                  </div>
                ))}
              </div>

              {/* 진행률 표시 */}
              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <Typography variant="caption" className={styles.progressLabel}>
                    학습 진행도
                  </Typography>
                  <Typography variant="caption" className={styles.progressStats}>
                    {group.completedCharacters}/{group.characters.length} ({group.progress}%)
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={group.progress}
                  className={styles.progressBar}
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: group.color,
                    },
                  }}
                />
              </div>

              <ActionButton
                text={group.progress === 100 ? "복습하기" : "학습하기"}
                variant={group.progress === 100 ? "completed" : "primary"}
                onClick={() => handleGroupClick(group)}
              />
          </Card>
        ))}
      </div>
    </div>
  );
}
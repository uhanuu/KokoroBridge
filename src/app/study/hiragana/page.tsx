"use client";

import { ArrowBack } from "@mui/icons-material";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import ActionButton from "@/components/ui/button/action-button";

import styles from "./page.module.css";

const hiraganaGroups = [
  {
    id: 1,
    name: "あ단",
    romaji: "A-Dan",
    characters: ["あ", "い", "う", "え", "お"],
    color: "#22c55e",
    route: "/study/canvas/hiragana/a",
  },
  {
    id: 2,
    name: "か단",
    romaji: "Ka-Dan",
    characters: ["か", "き", "く", "け", "こ"],
    color: "#3b82f6",
    route: "/study/canvas/hiragana/ka",
  },
  {
    id: 3,
    name: "さ단",
    romaji: "Sa-Dan",
    characters: ["さ", "し", "す", "せ", "そ"],
    color: "#f59e0b",
    route: "/study/canvas/hiragana/sa",
  },
  {
    id: 4,
    name: "た단",
    romaji: "Ta-Dan",
    characters: ["た", "ち", "つ", "て", "と"],
    color: "#8b5cf6",
    route: "/study/canvas/hiragana/ta",
  },
  {
    id: 5,
    name: "な단",
    romaji: "Na-Dan",
    characters: ["な", "に", "ぬ", "ね", "の"],
    color: "#ef4444",
    route: "/study/canvas/hiragana/na",
  },
  {
    id: 6,
    name: "は단",
    romaji: "Ha-Dan",
    characters: ["は", "ひ", "ふ", "へ", "ほ"],
    color: "#06b6d4",
    route: "/study/canvas/hiragana/ha",
  },
  {
    id: 7,
    name: "ま단",
    romaji: "Ma-Dan",
    characters: ["ま", "み", "む", "め", "も"],
    color: "#84cc16",
    route: "/study/canvas/hiragana/ma",
  },
  {
    id: 8,
    name: "や행",
    romaji: "Ya-Gyou",
    characters: ["や", "ゆ", "よ"],
    color: "#f97316",
    route: "/study/canvas/hiragana/ya",
  },
  {
    id: 9,
    name: "ら단",
    romaji: "Ra-Dan",
    characters: ["ら", "り", "る", "れ", "ろ"],
    color: "#a855f7",
    route: "/study/canvas/hiragana/ra",
  },
  {
    id: 10,
    name: "わ행",
    romaji: "Wa-Gyou",
    characters: ["わ", "を", "ん"],
    color: "#14b8a6",
    route: "/study/canvas/hiragana/wa",
  },
  {
    id: 11,
    name: "탁음",
    romaji: "Dakuten",
    characters: ["が", "ざ", "だ", "ば", "ぱ"],
    color: "#6366f1",
    route: "/study/canvas/hiragana/dakuten",
  },
  {
    id: 12,
    name: "반탁음",
    romaji: "Handakuten",
    characters: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
    color: "#ec4899",
    route: "/study/canvas/hiragana/handakuten",
  },
];

export default function HiraganaPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/study");
  };

  const handleGroupClick = (group: typeof hiraganaGroups[0]) => {
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
              히라가나
            </Typography>
            <Typography variant="body1" className={styles.subtitle}>
              학습할 그룹을 선택해주세요
            </Typography>
          </div>
        </div>
      </div>

      <div className={styles.groupsGrid}>
        {hiraganaGroups.map((group) => (
          <Card key={group.id} className={`${styles.card} ${styles.groupCard}`}>
            <CardContent className={styles.groupContent}>
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

              <ActionButton
                text="학습하기"
                variant="primary"
                onClick={() => handleGroupClick(group)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
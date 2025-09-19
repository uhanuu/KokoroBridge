"use client";

import { TouchApp } from "@mui/icons-material";
import { Typography, LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

import ActionButton from "@/components/ui/button/action-button";
import BackButton from "@/components/ui/button/back-button";

import styles from "./study-character-page.module.css";

interface CharacterData {
  char: string;
  romaji: string;
  completed: boolean;
}

interface CharacterGroup {
  id: number;
  name: string;
  romaji: string;
  characters: CharacterData[];
  color: string;
  route: string;
  progress: number;
  completedCharacters: number;
}

interface StudyCharacterPageProps {
  title: string;
  subtitle: string;
  swipeText: string;
  groups: CharacterGroup[];
  backRoute: string;
}

export default function StudyCharacterPage({
  title,
  subtitle,
  swipeText,
  groups,
  backRoute,
}: StudyCharacterPageProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(backRoute);
  };

  const handleGroupClick = useCallback(
    (route: string) => {
      router.push(route);
    },
    [router]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <BackButton onClick={handleBack} size="medium" className={styles.backButton} />
          <div className={styles.headerContent}>
            <Typography variant="h4" className={styles.title}>
              {title}
            </Typography>
            <Typography variant="body1" className={styles.subtitle}>
              {subtitle}
            </Typography>
          </div>
          <div className={styles.headerSpacer}></div>
        </div>
      </div>

      <div className={styles.swipeHint}>
        <TouchApp className={styles.swipeIcon} />
        <Typography variant="body2" className={styles.swipeText}>
          {swipeText}
        </Typography>
      </div>

      <div className={styles.groupsContainer}>
        {groups.map((group, _index) => (
          <div key={group.id} className={styles.groupCard}>
            <div className={styles.cardContent}>
              <div className={styles.groupHeader}>
                <div
                  className={styles.groupIcon}
                  style={{ backgroundColor: `${group.color}20` }}
                >
                  <span className={styles.iconText} style={{ color: group.color }}>
                    {group.characters[0]?.char || ""}
                  </span>
                </div>
                <div className={styles.groupInfo}>
                  <Typography variant="h5" className={styles.groupName}>
                    {group.name}
                  </Typography>
                  <Typography variant="body1" className={styles.groupRomaji}>
                    {group.romaji}
                  </Typography>
                </div>
              </div>

              <div className={styles.charactersGrid}>
                {group.characters.map((charData, charIndex) => (
                  <div
                    key={charIndex}
                    className={`${styles.characterItem} ${
                      charData.completed ? styles.completed : styles.uncompleted
                    }`}
                  >
                    <span className={styles.character}>{charData.char}</span>
                    <span className={styles.romaji}>{charData.romaji}</span>
                  </div>
                ))}
              </div>

              {group.progress !== undefined && (
                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <Typography variant="caption" className={styles.progressLabel}>
                      학습 진행도
                    </Typography>
                    <Typography variant="caption" className={styles.progressStats}>
                      {group.completedCharacters || 0}/{group.characters.length} (
                      {group.progress}%)
                    </Typography>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={group.progress}
                    className={styles.progressBar}
                    sx={{
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#3b82f6",
                      },
                    }}
                  />
                </div>
              )}

              <ActionButton
                text={group.progress === 100 ? "복습하기" : "학습하기"}
                variant={group.progress === 100 ? "completed" : "primary"}
                onClick={() => handleGroupClick(group.route)}
                className={styles.startButton}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export type { CharacterData, CharacterGroup, StudyCharacterPageProps };
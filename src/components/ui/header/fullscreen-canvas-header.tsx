"use client";

import {
  VolumeUp,
  Refresh,
  PlayArrow,
  Pause,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";

import BackButton from "@/components/ui/button/back-button/back-button";

import styles from "./fullscreen-canvas-header.module.css";

interface FullscreenCanvasHeaderProps {
  romaji: string;
  currentIndex: number;
  totalCount: number;
  isAnimating: boolean;
  onBack?: () => void;
  onSpeak?: () => void;
  onToggleAnimation?: () => void;
  onReset?: () => void;
  className?: string;
}

export default function FullscreenCanvasHeader({
  romaji,
  currentIndex,
  totalCount,
  isAnimating,
  onBack,
  onSpeak,
  onToggleAnimation,
  onReset,
  className = "",
}: FullscreenCanvasHeaderProps) {
  return (
    <div className={`${styles.header} ${className}`}>
      {/* 왼쪽: 뒤로가기 버튼 */}
      <div className={styles.leftSection}>
        <BackButton onClick={onBack} size="large" />
      </div>

      {/* 중앙: 로마지와 진행도 */}
      <div className={styles.centerSection}>
        <Typography variant="h2" className={styles.romaji}>
          {romaji}
        </Typography>
        <Typography variant="caption" className={styles.progressText}>
          {currentIndex + 1} / {totalCount}
        </Typography>
      </div>

      {/* 오른쪽: 기능 버튼들 */}
      <div className={styles.rightSection}>
        <IconButton
          onClick={onSpeak}
          className={styles.controlButton}
          title="발음 듣기"
        >
          <VolumeUp />
        </IconButton>
        <IconButton
          onClick={onToggleAnimation}
          className={styles.controlButton}
          title={isAnimating ? "애니메이션 정지" : "획순 보기"}
        >
          {isAnimating ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton
          onClick={onReset}
          className={styles.controlButton}
          title="다시 시작"
        >
          <Refresh />
        </IconButton>
      </div>
    </div>
  );
}
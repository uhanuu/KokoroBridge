"use client";

import { ArrowForward, ArrowBackIos } from "@mui/icons-material";
import { Typography, IconButton, LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import BackButton from "@/components/ui/button/back-button";

import styles from "./study-canvas-header.module.css";

interface StudyCanvasHeaderProps {
  title: string;
  subtitle?: string;
  currentIndex: number;
  totalCount: number;
  progress?: number;
  backRoute: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  className?: string;
}

export default function StudyCanvasHeader({
  title,
  subtitle,
  currentIndex,
  totalCount,
  progress,
  backRoute,
  onPrevious,
  onNext,
  hasPrevious = true,
  hasNext = true,
  className = "",
}: StudyCanvasHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(backRoute);
  };

  const progressPercentage = progress ?? ((currentIndex / totalCount) * 100);

  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.headerTop}>
        {/* 뒤로가기 버튼 */}
        <BackButton
          onClick={handleBack}
          size="medium"
          className={styles.backButton}
        />

        {/* 제목 영역 */}
        <div className={styles.titleSection}>
          <Typography variant="h5" className={styles.title}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" className={styles.subtitle}>
              {subtitle}
            </Typography>
          )}
          <Typography variant="caption" className={styles.counter}>
            {currentIndex + 1} / {totalCount}
          </Typography>
        </div>

        {/* 네비게이션 버튼들 */}
        <div className={styles.navigation}>
          <IconButton
            onClick={onPrevious}
            disabled={!hasPrevious || currentIndex === 0}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="이전 문자"
            title="이전 문자"
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            onClick={onNext}
            disabled={!hasNext || currentIndex >= totalCount - 1}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="다음 문자"
            title="다음 문자"
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>

      {/* 진행도 바 */}
      <div className={styles.progressSection}>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          className={styles.progressBar}
          aria-label={`진행도 ${Math.round(progressPercentage)}%`}
        />
        <Typography variant="caption" className={styles.progressText}>
          {Math.round(progressPercentage)}% 완료
        </Typography>
      </div>
    </div>
  );
}
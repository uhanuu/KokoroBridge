"use client";

import React, { useEffect, useState, useRef } from "react";

import styles from "./score-feedback.module.css";

interface ScoreFeedbackProps {
  isOpen: boolean;
  accuracy: number;
  character: string;
  onClose: () => void;
  autoCloseDelay?: number;
}

export default function ScoreFeedback({
  isOpen,
  accuracy,
  character,
  onClose,
  autoCloseDelay = 2500,
}: ScoreFeedbackProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass(styles.slideIn || "");

      // 자동 닫기 타이머
      if (autoCloseDelay > 0) {
        autoCloseTimeoutRef.current = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);
      }
    } else {
      handleClose();
    }

    return () => {
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
        autoCloseTimeoutRef.current = null;
      }
    };
  }, [isOpen, autoCloseDelay]);

  const handleClose = () => {
    if (autoCloseTimeoutRef.current) {
      clearTimeout(autoCloseTimeoutRef.current);
      autoCloseTimeoutRef.current = null;
    }

    setAnimationClass(styles.slideOut || "");
    setTimeout(() => {
      setIsVisible(false);
      setAnimationClass("");
      onClose();
    }, 300);
  };

  const handleClick = () => {
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  };

  const getScoreMessage = (accuracy: number): string => {
    if (accuracy >= 95) return `${accuracy}점이에요! 완벽해요!`;
    if (accuracy >= 85) return `${accuracy}점이에요! 훌륭해요!`;
    if (accuracy >= 75) return `${accuracy}점이에요! 잘했어요!`;
    if (accuracy >= 65) return `${accuracy}점이에요! 좋아요!`;
    return `${accuracy}점이에요! 성공했어요!`;
  };

  const getMascotEmoji = (accuracy: number): string => {
    if (accuracy >= 95) return "🌟";
    if (accuracy >= 85) return "✨";
    if (accuracy >= 75) return "😊";
    return "👍";
  };

  const getScoreColor = (accuracy: number): string => {
    if (accuracy >= 95) return "#10b981";
    if (accuracy >= 85) return "#059669";
    if (accuracy >= 75) return "#3b82f6";
    return "#6366f1";
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.overlay} ${animationClass}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="점수 피드백 닫기"
    >
      <div className={styles.feedbackContainer}>
        {/* 마스코트 이모지 */}
        <div className={styles.mascotContainer}>
          <div className={styles.mascotEmoji}>
            {getMascotEmoji(accuracy)}
          </div>
        </div>

        {/* 완성한 문자 */}
        <div className={styles.characterDisplay}>
          <span className={styles.character}>{character}</span>
        </div>

        {/* 점수와 메시지 */}
        <div className={styles.scoreContainer}>
          <div
            className={styles.score}
            style={{ color: getScoreColor(accuracy) }}
          >
            {accuracy}점
          </div>
          <div className={styles.message}>
            {getScoreMessage(accuracy)}
          </div>
        </div>

        {/* 파티클 효과 */}
        {accuracy >= 85 && (
          <div className={styles.particles}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`${styles.particle} ${styles[`particle${i + 1}`]}`}
              >
                ✨
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
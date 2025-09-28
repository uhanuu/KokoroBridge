"use client";

import React, { useEffect, useState, useRef } from "react";

import styles from "./score-feedback.module.css";

interface ScoreFeedbackProps {
  isOpen: boolean;
  accuracy: number;
  character: string;
  onClose: () => void;
  onNext?: () => void;
  hasNext?: boolean;
  isLastCharacter?: boolean;
  autoCloseDelay?: number;
}

export default function ScoreFeedback({
  isOpen,
  accuracy,
  character,
  onClose,
  onNext,
  hasNext = false,
  isLastCharacter = false,
  autoCloseDelay = 2500,
}: ScoreFeedbackProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass(styles.slideIn || "");

      // 마지막 문자일 때는 1.5초 후 자동 닫기, 그 외에는 설정된 시간
      const delayTime = isLastCharacter ? 1500 : autoCloseDelay;

      if (delayTime > 0) {
        autoCloseTimeoutRef.current = setTimeout(() => {
          handleClose();
        }, delayTime);
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
  }, [isOpen, autoCloseDelay, isLastCharacter]);

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

  const handleOverlayClick = (e: React.MouseEvent) => {
    // 모달 외부 클릭을 막기 위해 아무 동작하지 않음
    e.stopPropagation();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    // 모달 내부 클릭 시 이벤트 전파 중단
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // ESC 키로만 닫을 수 있도록 수정 (Enter, Space는 버튼 동작과 충돌 방지)
    if (e.key === 'Escape') {
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
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="점수 피드백"
    >
      <div className={styles.feedbackContainer} onClick={handleModalClick}>
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

        {/* 액션 버튼들 - 마지막 문자가 아닐 때만 표시 */}
        {!isLastCharacter && (
          <div className={styles.actionButtons}>
            {hasNext ? (
              <>
                <button
                  className={`${styles.actionButton} ${styles.nextButton}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext?.();
                    handleClose();
                  }}
                >
                  다음 문자
                </button>
                <button
                  className={`${styles.actionButton} ${styles.closeButton}`}
                  onClick={handleClose}
                >
                  계속 연습
                </button>
              </>
            ) : (
              <button
                className={`${styles.actionButton} ${styles.closeButton}`}
                onClick={handleClose}
              >
                닫기
              </button>
            )}
          </div>
        )}

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
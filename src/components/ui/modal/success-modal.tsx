"use client";

import { CheckCircle, ArrowForward } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";

import styles from "./success-modal.module.css";

interface SuccessModalProps {
  isOpen: boolean;
  accuracy: number;
  character: string;
  romaji: string;
  onNext?: () => void;
  onClose: () => void;
  hasNext?: boolean;
  autoCloseDelay?: number;
}

export default function SuccessModal({
  isOpen,
  accuracy,
  character,
  romaji,
  onNext,
  onClose,
  hasNext = false,
  autoCloseDelay = 2500,
}: SuccessModalProps) {
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      // 자동 닫기 타이머 설정
      autoCloseTimeoutRef.current = setTimeout(() => {
        if (hasNext && onNext) {
          onNext();
        } else {
          onClose();
        }
      }, autoCloseDelay);
    }

    // 클린업
    return () => {
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
        autoCloseTimeoutRef.current = null;
      }
    };
  }, [isOpen, autoCloseDelay, hasNext, onNext, onClose]);

  // 사용자가 클릭하면 자동 닫기 취소하고 즉시 처리
  const handleUserAction = (action: () => void) => {
    if (autoCloseTimeoutRef.current) {
      clearTimeout(autoCloseTimeoutRef.current);
      autoCloseTimeoutRef.current = null;
    }
    action();
  };

  if (!isOpen) return null;

  const getAccuracyMessage = (accuracy: number): string => {
    if (accuracy >= 95) return "완벽해요!";
    if (accuracy >= 85) return "훌륭해요!";
    if (accuracy >= 75) return "잘했어요!";
    if (accuracy >= 65) return "좋아요!";
    return "성공했습니다!";
  };

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 95) return "#10b981";
    if (accuracy >= 85) return "#059669";
    if (accuracy >= 75) return "#3b82f6";
    if (accuracy >= 65) return "#8b5cf6";
    return "#6366f1";
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleUserAction(onClose);
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={() => handleUserAction(onClose)}
      onKeyDown={handleOverlayKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconContainer}>
          <CheckCircle
            className={styles.successIcon}
            style={{ color: getAccuracyColor(accuracy) }}
          />
        </div>

        <div className={styles.content}>
          <Typography variant="h4" className={styles.title}>
            {getAccuracyMessage(accuracy)}
          </Typography>

          <div className={styles.characterInfo}>
            <Typography variant="h1" className={styles.character}>
              {character}
            </Typography>
            <Typography variant="h6" className={styles.romaji}>
              {romaji}
            </Typography>
          </div>

          <div className={styles.accuracySection}>
            <Typography variant="body1" className={styles.accuracyLabel}>
              정확도
            </Typography>
            <Typography
              variant="h5"
              className={styles.accuracyValue}
              style={{ color: getAccuracyColor(accuracy) }}
            >
              {accuracy}%
            </Typography>
          </div>

          <div className={styles.actions}>
            {hasNext ? (
              <IconButton
                onClick={() => handleUserAction(onNext || (() => {}))}
                className={styles.nextButton}
                title="다음 문자"
              >
                <ArrowForward />
                <Typography variant="body2" className={styles.buttonText}>
                  다음
                </Typography>
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleUserAction(onClose)}
                className={styles.closeButton}
                title="닫기"
              >
                <Typography variant="body2" className={styles.buttonText}>
                  완료
                </Typography>
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
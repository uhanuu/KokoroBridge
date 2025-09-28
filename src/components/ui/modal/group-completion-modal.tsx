"use client";

import {
  CheckCircle
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

import ActionButton from "@/components/ui/button/action-button";

import styles from "./group-completion-modal.module.css";

interface GroupCompletionModalProps {
  isOpen: boolean;
  groupName: string;
  totalCharacters: number;
  averageAccuracy: number;
  hasNextGroup: boolean;
  characterType: "hiragana" | "katakana";
  onNextGroup?: () => void;
  onRestartGroup?: () => void;
  onBackToSelection?: () => void;
  onClose: () => void;
}

export default function GroupCompletionModal({
  isOpen,
  groupName,
  totalCharacters,
  averageAccuracy,
  hasNextGroup,
  characterType,
  onNextGroup,
  onRestartGroup,
  onBackToSelection,
  onClose,
}: GroupCompletionModalProps) {
  if (!isOpen) return null;

  const getCompletionMessage = (accuracy: number): string => {
    if (accuracy >= 95) return "완벽하게 완주했습니다!";
    if (accuracy >= 85) return "훌륭하게 완주했습니다!";
    if (accuracy >= 75) return "잘 완주했습니다!";
    return "그룹을 완주했습니다!";
  };

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 95) return "#10b981";
    if (accuracy >= 85) return "#059669";
    if (accuracy >= 75) return "#3b82f6";
    return "#6366f1";
  };

  const characterTypeName = characterType === "hiragana" ? "히라가나" : "가타카나";

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      onKeyDown={handleOverlayKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconContainer}>
          <CheckCircle
            className={styles.successIcon}
            style={{ color: getAccuracyColor(averageAccuracy) }}
          />
        </div>

        <div className={styles.content}>
          <Typography variant="h4" className={styles.title}>
            {getCompletionMessage(averageAccuracy)}
          </Typography>

          <div className={styles.groupInfo}>
            <Typography variant="h5" className={styles.groupName}>
              {groupName} 그룹
            </Typography>
            <Typography variant="body1" className={styles.stats}>
              {totalCharacters}개 문자 • 평균 정확도 {averageAccuracy}%
            </Typography>
          </div>

          <div className={styles.actions}>
            {hasNextGroup ? (
              <>
                <ActionButton
                  text="다음 그룹으로"
                  variant="primary"
                  onClick={onNextGroup}
                  className={styles.actionButton}
                />
                <ActionButton
                  text="이 그룹 다시하기"
                  variant="primary"
                  onClick={onRestartGroup}
                  className={styles.actionButton}
                />
              </>
            ) : (
              <>
                <ActionButton
                  text={`${characterTypeName} 선택으로`}
                  variant="primary"
                  onClick={onBackToSelection}
                  className={styles.actionButton}
                />
                <ActionButton
                  text="처음 그룹부터"
                  variant="primary"
                  onClick={onRestartGroup}
                  className={styles.actionButton}
                />
              </>
            )}

            <ActionButton
              text="학습하기로"
              variant="primary"
              onClick={() => window.location.href = '/study'}
              className={styles.actionButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
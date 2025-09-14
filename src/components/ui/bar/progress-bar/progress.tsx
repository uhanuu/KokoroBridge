"use client";

import React from "react";

import { getScoreColor } from "@/util/color-helper";

import styles from "./progress.module.css";

interface StudyProgressData {
  type: string;
  character: string;
  score: number;
  date: string;
  correctCount: number;
  totalCount: number;
}

interface StudyProgressProps {
  data: StudyProgressData;
  className?: string;
}

const StudyProgress: React.FC<StudyProgressProps> = ({ data, className }) => {
  const progressPercentage = (data.correctCount / data.totalCount) * 100;
  const scoreColor = getScoreColor(data.score);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* 학습 타입과 문자 */}
      <div className={styles.header}>
        <div className={styles.studyType}>
          <span className={styles.typeLabel}>{data.type}</span>
          <span className={styles.character}>{data.character}</span>
        </div>
        <div className={styles.scoreContainer}>
          <span className={styles.score} style={{ color: scoreColor }}>
            {data.score}점
          </span>
          <span className={styles.date}>
            {new Date(data.date).toLocaleDateString("ko-KR", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>
            {data.correctCount}/{data.totalCount} 문제 정답
          </span>
          <span className={styles.progressPercentage}>{Math.round(progressPercentage)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: scoreColor,
            }}
          />
        </div>
      </div>

      {/* 결과 표시 */}
      <div className={styles.resultSection}>
        {data.score >= 80 ? (
          <div className={styles.resultItem}>
            <div className={styles.resultIcon} style={{ backgroundColor: "#4caf50" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.resultText}>훌륭해요!</span>
          </div>
        ) : data.score >= 60 ? (
          <div className={styles.resultItem}>
            <div className={styles.resultIcon} style={{ backgroundColor: "#ff9800" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.resultText}>조금 더 연습해요</span>
          </div>
        ) : (
          <div className={styles.resultItem}>
            <div className={styles.resultIcon} style={{ backgroundColor: "#f44336" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.resultText}>다시 도전해보세요</span>
          </div>
        )}

        <button className={styles.continueButton}>
          <span>이어서 학습하기</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StudyProgress;

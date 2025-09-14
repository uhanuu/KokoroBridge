"use client";

import React from "react";

import styles from "./study-stats.module.css";

interface StudyStatsData {
  totalStudyDays: number;
  totalCharactersLearned: number;
  averageScore: number;
  streak: number;
}

interface StudyStatsProps {
  stats: StudyStatsData;
  className?: string;
}

const StudyStats: React.FC<StudyStatsProps> = ({ stats, className }) => {
  const statItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: "학습 일수",
      value: stats.totalStudyDays,
      unit: "일",
      color: "#4caf50",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
          <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: "학습한 글자",
      value: stats.totalCharactersLearned,
      unit: "자",
      color: "#66bb6a",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      label: "평균 점수",
      value: stats.averageScore,
      unit: "점",
      color: "#81c784",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: "연속 학습",
      value: stats.streak,
      unit: "일",
      color: "#a5d6a7",
    },
  ];

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.statsGrid}>
        {statItems.map((item, index) => (
          <div key={index} className={styles.statCard}>
            <div
              className={styles.iconContainer}
              style={{ backgroundColor: `${item.color}15`, color: item.color }}
            >
              {item.icon}
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                <span className={styles.number} style={{ color: item.color }}>
                  {item.value}
                </span>
                <span className={styles.unit}>{item.unit}</span>
              </div>
              <div className={styles.statLabel}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 주간 진행률 표시 */}
      <div className={styles.weeklyProgress}>
        <div className={styles.weeklyHeader}>
          <span className={styles.weeklyTitle}>이번 주 학습 현황</span>
          <span className={styles.weeklyPercentage}>
            {Math.round((stats.totalStudyDays / 7) * 100)}%
          </span>
        </div>
        <div className={styles.weeklyBar}>
          <div
            className={styles.weeklyFill}
            style={{ width: `${(stats.totalStudyDays / 7) * 100}%` }}
          />
        </div>
        <div className={styles.weekDays}>
          {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
            <div
              key={day}
              className={`${styles.dayDot} ${index < stats.totalStudyDays ? styles.completed : ""}`}
            >
              <span className={styles.dayLabel}>{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyStats;

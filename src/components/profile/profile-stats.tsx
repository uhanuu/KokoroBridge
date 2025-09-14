"use client";

import React from "react";

import styles from "./profile-stats.module.css";

interface UserData {
  studyStreak: number;
  totalStudyTime: number;
  completedLessons: number;
  averageScore: number;
}

interface ProfileStatsProps {
  userData: UserData;
  className?: string;
}

export default function ProfileStats({ userData, className }: ProfileStatsProps) {
  const statItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M8.5 14.5L4 19L2 17L6.5 12.5M15 5L9 11L11 13L17 7L15 5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 2L17 2C18.1046 2 19 2.89543 19 4V6M5 22L19 22C20.1046 22 21 21.1046 21 20V18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      label: "연속 학습",
      value: userData.studyStreak,
      unit: "일",
      color: "#ff5722",
      bgColor: "#fff3e0",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: "총 학습 시간",
      value: userData.totalStudyTime,
      unit: "시간",
      color: "#2196f3",
      bgColor: "#e3f2fd",
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
        </svg>
      ),
      label: "완료한 레슨",
      value: userData.completedLessons,
      unit: "개",
      color: "#4caf50",
      bgColor: "#e8f5e8",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
      label: "평균 점수",
      value: userData.averageScore,
      unit: "점",
      color: "#ff9800",
      bgColor: "#fff8e1",
    },
  ];

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <h2 className={styles.title}>학습 통계</h2>

      <div className={styles.statsGrid}>
        {statItems.map((item, index) => (
          <div key={index} className={styles.statCard}>
            <div
              className={styles.iconContainer}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
            >
              {item.icon}
            </div>

            <div className={styles.statInfo}>
              <div className={styles.statValue}>
                <span className={styles.number} style={{ color: item.color }}>
                  {item.value}
                </span>
                <span className={styles.unit}>{item.unit}</span>
              </div>
              <span className={styles.statLabel}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 주간 활동 그래프 */}
      <div className={styles.weeklyActivity}>
        <h3 className={styles.activityTitle}>이번 주 활동</h3>
        <div className={styles.activityChart}>
          {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => {
            // 고정된 임시 데이터 (SSR 불일치 방지)
            const fixedHeights = [45, 62, 38, 75, 52, 41, 68];
            const height = fixedHeights[index];
            const isToday = index === 3; // 목요일을 오늘로 가정

            return (
              <div key={day} className={styles.chartBar}>
                <div
                  className={`${styles.bar} ${isToday ? styles.today : ""}`}
                  style={{ height: `${height}px` }}
                />
                <span className={styles.dayLabel}>{day}</span>
              </div>
            );
          })}
        </div>
        <p className={styles.chartDescription}>일일 학습 시간 (분)</p>
      </div>
    </div>
  );
}

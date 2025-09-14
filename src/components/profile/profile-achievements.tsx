"use client";

import React from "react";

import styles from "./profile-achievements.module.css";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  date: string | null;
}

interface ProfileAchievementsProps {
  achievements: Achievement[];
  className?: string;
}

export default function ProfileAchievements({ achievements, className }: ProfileAchievementsProps) {
  const completedCount = achievements.filter((achievement) => achievement.completed).length;
  const totalCount = achievements.length;

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h2 className={styles.title}>업적</h2>
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>
            {completedCount}/{totalCount} 달성
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 업적 목록 */}
      <div className={styles.achievementsList}>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`${styles.achievementCard} ${
              achievement.completed ? styles.completed : styles.locked
            }`}
          >
            {/* 업적 아이콘 */}
            <div className={styles.iconContainer}>
              <span className={styles.icon}>{achievement.icon}</span>
              {achievement.completed && (
                <div className={styles.completedBadge}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              {!achievement.completed && (
                <div className={styles.lockedOverlay}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* 업적 정보 */}
            <div className={styles.achievementInfo}>
              <h3 className={styles.achievementTitle}>{achievement.title}</h3>
              <p className={styles.achievementDescription}>{achievement.description}</p>

              {achievement.completed && achievement.date && (
                <div className={styles.completedDate}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
                  <span>
                    {new Date(achievement.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* 상태 표시 */}
            <div className={styles.statusContainer}>
              {achievement.completed ? (
                <div className={styles.completedStatus}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>완료</span>
                </div>
              ) : (
                <div className={styles.lockedStatus}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>잠김</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 업적 요약 */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryNumber}>{completedCount}</span>
          <span className={styles.summaryLabel}>완료된 업적</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryNumber}>{totalCount - completedCount}</span>
          <span className={styles.summaryLabel}>남은 업적</span>
        </div>
      </div>
    </div>
  );
}

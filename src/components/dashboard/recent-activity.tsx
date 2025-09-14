"use client";

import React from "react";

import { getScoreColor } from "@/util/color-helper";

import styles from "./recent-activity.module.css";

interface ActivityItem {
  id: string;
  type: "hiragana" | "katakana" | "kanji" | "conversation";
  character?: string;
  score: number;
  timestamp: string;
  duration: number; // 분 단위
}

interface RecentActivityProps {
  className?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ className }) => {
  // 임시 데이터 (나중에 props나 API로 대체)
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "hiragana",
      character: "あ",
      score: 95,
      timestamp: "2024-03-15T10:30:00",
      duration: 15,
    },
    {
      id: "2",
      type: "katakana",
      character: "ア",
      score: 87,
      timestamp: "2024-03-15T09:15:00",
      duration: 12,
    },
    {
      id: "3",
      type: "conversation",
      score: 78,
      timestamp: "2024-03-14T16:45:00",
      duration: 25,
    },
    {
      id: "4",
      type: "kanji",
      character: "水",
      score: 92,
      timestamp: "2024-03-14T14:20:00",
      duration: 18,
    },
    {
      id: "5",
      type: "hiragana",
      character: "か",
      score: 88,
      timestamp: "2024-03-14T11:10:00",
      duration: 10,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "hiragana":
        return "あ";
      case "katakana":
        return "ア";
      case "kanji":
        return "漢";
      case "conversation":
        return "💬";
      default:
        return "📚";
    }
  };

  const getActivityTitle = (type: string) => {
    switch (type) {
      case "hiragana":
        return "히라가나";
      case "katakana":
        return "가타카나";
      case "kanji":
        return "한자";
      case "conversation":
        return "AI 대화";
      default:
        return "학습";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "방금 전";
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`;
    }
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.activityList}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            {/* 아이콘 */}
            <div className={styles.activityIcon}>
              <span className={styles.iconText}>
                {activity.character || getActivityIcon(activity.type)}
              </span>
            </div>

            {/* 내용 */}
            <div className={styles.activityContent}>
              <div className={styles.activityHeader}>
                <span className={styles.activityTitle}>
                  {getActivityTitle(activity.type)}
                  {activity.character && (
                    <span className={styles.characterBadge}>{activity.character}</span>
                  )}
                </span>
                <span className={styles.activityTime}>{formatTime(activity.timestamp)}</span>
              </div>

              <div className={styles.activityDetails}>
                <div className={styles.scoreSection}>
                  <span className={styles.score} style={{ color: getScoreColor(activity.score) }}>
                    {activity.score}점
                  </span>
                  <div className={styles.scoreBar}>
                    <div
                      className={styles.scoreFill}
                      style={{
                        width: `${activity.score}%`,
                        backgroundColor: getScoreColor(activity.score),
                      }}
                    />
                  </div>
                </div>

                <div className={styles.duration}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {activity.duration}분
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <button className={styles.retryButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 4V10H7M23 20V14H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.49 9C19.9828 7.56678 19.1209 6.28392 17.9845 5.27304C16.8482 4.26216 15.4745 3.55814 13.9917 3.22882C12.5089 2.8995 10.9652 2.95793 9.51105 3.39804C8.05689 3.83815 6.74204 4.6462 5.69 5.73L1 10M23 14L18.31 18.27C17.258 19.3538 15.9431 20.1619 14.4889 20.602C13.0348 21.0421 11.4911 21.1005 10.0083 20.7712C8.52547 20.4419 7.1518 19.7378 6.01547 18.727C4.87913 17.7161 4.01717 16.4332 3.51 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 더 보기 버튼 */}
      <button className={styles.showMoreButton}>
        <span>전체 학습 기록 보기</span>
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
  );
};

export default RecentActivity;

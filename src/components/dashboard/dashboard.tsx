"use client";

import React from "react";

import StudyProgress from "../ui/bar/progress-bar/progress";

import styles from "./Dashboard.module.css";
import RecentActivity from "./recent-activity";
import StudyStats from "./study-stats";

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  // 임시 데이터 (나중에 props나 API로 대체)
  const lastStudyData = {
    type: "히라가나",
    character: "あ",
    score: 85,
    date: "2024-03-15",
    correctCount: 17,
    totalCount: 20,
  };

  const weeklyStats = {
    totalStudyDays: 5,
    totalCharactersLearned: 42,
    averageScore: 88,
    streak: 3,
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* 헤더 섹션 */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1 className={styles.title}>안녕하세요!</h1>
          <p className={styles.subtitle}>오늘도 일본어 학습을 시작해볼까요?</p>
        </div>
        <div className={styles.todayDate}>
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
      </div>

      {/* 최근 학습 요약 */}
      <div className={styles.lastStudySection}>
        <h2 className={styles.sectionTitle}>최근 학습</h2>
        <StudyProgress data={lastStudyData} />
      </div>

      {/* 주간 통계 */}
      <div className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>이번 주 학습 현황</h2>
        <StudyStats stats={weeklyStats} />
      </div>

      {/* 최근 활동 */}
      <div className={styles.activitySection}>
        <h2 className={styles.sectionTitle}>최근 활동</h2>
        <RecentActivity />
      </div>

      {/* 빠른 학습 시작 */}
      <div className={styles.quickStartSection}>
        <h2 className={styles.sectionTitle}>빠른 시작</h2>
        <div className={styles.quickStartGrid}>
          <button className={styles.quickStartCard}>
            <div className={styles.quickStartIcon}>あ</div>
            <span className={styles.quickStartText}>히라가나</span>
          </button>
          <button className={styles.quickStartCard}>
            <div className={styles.quickStartIcon}>ア</div>
            <span className={styles.quickStartText}>가타카나</span>
          </button>
          <button className={styles.quickStartCard}>
            <div className={styles.quickStartIcon}>漢</div>
            <span className={styles.quickStartText}>한자</span>
          </button>
          <button className={styles.quickStartCard}>
            <div className={styles.quickStartIcon}>💬</div>
            <span className={styles.quickStartText}>AI 대화</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

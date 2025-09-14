import React from "react";

import RecentActivity from "@/components/dashboard/recent-activity";
import StudyStats from "@/components/dashboard/study-stats";
import StudyProgress from "@/components/ui/bar/progress-bar/progress";
import HomeHeader from "@/components/ui/header/home-header";
import QuickStartNavigation from "@/components/ui/navigation/study-navigation";
import { activities, lastStudyData, weeklyStats } from "@/mock/home-mock";

import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      {/* 헤더 섹션 */}
      <HomeHeader />

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
        <RecentActivity activities={activities} />
      </div>

      {/* 빠른 학습 시작 */}
      <div className={styles.quickStartSection}>
        <h2 className={styles.sectionTitle}>빠른 시작</h2>
        <QuickStartNavigation />
      </div>
    </div>
  );
}

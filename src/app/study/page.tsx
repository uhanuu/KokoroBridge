"use client";

import React from "react";

import LearningMenu from "@/components/study/learning-menu";
import LearningProgress from "@/components/study/learning-progress";
import LearningRecommendation from "@/components/study/learning-recommendation";
import StudyHeader from "@/components/ui/header/study-header";

import styles from "./page.module.css";

export default function StudyMenu() {
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <StudyHeader />

      {/* 전체 진행률 */}
      <LearningProgress />

      {/* 학습 옵션 목록 */}
      <LearningMenu />

      {/* 추천 학습 */}
      <LearningRecommendation />
    </div>
  );
}

"use client";

import React from "react";

import ProfileAchievements from "./profile-achievements";
import ProfileHeader from "./profile-header";
import ProfileSettings from "./profile-settings";
import ProfileStats from "./profile-stats";
import styles from "./profile.module.css";

interface ProfileProps {
  className?: string;
}

const Profile: React.FC<ProfileProps> = ({ className }) => {
  // 임시 사용자 데이터 (나중에 props나 API로 대체)
  const userData = {
    name: "김철수",
    email: "kimcs@example.com",
    level: 15,
    experience: 2350,
    nextLevelExp: 3000,
    joinDate: "2024-01-15",
    studyStreak: 12,
    totalStudyTime: 48,
    completedLessons: 156,
    averageScore: 87,
  };

  const achievements = [
    {
      id: "first_lesson",
      title: "첫 걸음",
      description: "첫 번째 레슨 완료",
      icon: "🎯",
      completed: true,
      date: "2024-01-15",
    },
    {
      id: "week_streak",
      title: "일주일 연속",
      description: "7일 연속 학습 완료",
      icon: "🔥",
      completed: true,
      date: "2024-03-01",
    },
    {
      id: "hiragana_master",
      title: "히라가나 마스터",
      description: "히라가나 완전 정복",
      icon: "あ",
      completed: true,
      date: "2024-03-10",
    },
    {
      id: "katakana_master",
      title: "가타카나 마스터",
      description: "가타카나 완전 정복",
      icon: "ア",
      completed: false,
      date: null,
    },
  ];

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* 프로필 헤더 */}
      <ProfileHeader userData={userData} />

      {/* 학습 통계 */}
      <ProfileStats userData={userData} />

      {/* 업적 */}
      <ProfileAchievements achievements={achievements} />

      {/* 설정 */}
      <ProfileSettings />
    </div>
  );
};

export default Profile;

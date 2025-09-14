"use client";

import { achievements, userData } from "@/mock/profile";

import styles from "./page.module.css";

import ProfileAchievements from "@/components/profile/profile-achievements";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileSettings from "@/components/profile/profile-settings";
import ProfileStats from "@/components/profile/profile-stats";

export default function Profile() {
  return (
    <div className={styles.container}>
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
}

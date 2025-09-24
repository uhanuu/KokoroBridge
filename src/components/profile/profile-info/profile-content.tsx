"use client";

import {
  LocalFireDepartment,
  Schedule,
  Book,
  EmojiEvents,
  Lock,
  CheckCircle
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

import SectionCard from "@/components/ui/section-card";
import { profileInfoStaticData } from "@/mock/profile-info-mock";
import { mockAchievements } from "@/mock/profile-mock";
import styles from "./profile-info.module.css";

interface UserProfile {
  streak: number;
  currentXP: number;
  nextLevelXP: number;
  progress: number;
  level: number;
}

interface ProfileContentProps {
  profile: UserProfile;
  achievementFilter: "all" | "completed" | "incomplete";
  filteredAchievements: typeof mockAchievements;
  onAchievementFilterChange: (filter: "all" | "completed" | "incomplete") => void;
}

export default function ProfileContent({
  profile,
  achievementFilter,
  filteredAchievements,
  onAchievementFilterChange
}: ProfileContentProps) {
  return (
    <>
      {/* 학습 통계 */}
      <SectionCard
        title="학습 통계"
        subtitle="나의 학습 현황을 확인하세요"
        className={styles.statsCard}
      >
        <div className={styles.statsButtonsSection}>
          <div className={styles.statsButton}>
            <div className={styles.statsIcon}>
              <LocalFireDepartment />
            </div>
            <div className={styles.statsInfo}>
              <Typography variant="caption" className={styles.statsLabel}>
                연속 학습일
              </Typography>
              <Typography variant="h6" className={styles.statsValue}>
                {profile.streak}
              </Typography>
            </div>
          </div>

          <div className={styles.statsButton}>
            <div className={styles.statsIcon}>
              <EmojiEvents />
            </div>
            <div className={styles.statsInfo}>
              <Typography variant="caption" className={styles.statsLabel}>
                최장 연속일
              </Typography>
              <Typography variant="h6" className={styles.statsValue}>
                {profileInfoStaticData.statistics.longestStreak}일
              </Typography>
            </div>
          </div>

          <div className={styles.statsButton}>
            <div className={styles.statsIcon}>
              <Book />
            </div>
            <div className={styles.statsInfo}>
              <Typography variant="caption" className={styles.statsLabel}>
                완료한 레슨
              </Typography>
              <Typography variant="h6" className={styles.statsValue}>
                {profileInfoStaticData.statistics.completedLessons}
              </Typography>
            </div>
          </div>

          <div className={styles.statsButton}>
            <div className={styles.statsIcon}>
              <Schedule />
            </div>
            <div className={styles.statsInfo}>
              <Typography variant="caption" className={styles.statsLabel}>
                총 학습 시간
              </Typography>
              <Typography variant="h6" className={styles.statsValue}>
                {profileInfoStaticData.statistics.totalStudyTime}
              </Typography>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 레벨 시스템 */}
      <SectionCard
        title="레벨"
        subtitle="학습을 통해 레벨을 올려보세요"
        className={styles.levelCard}
      >
        <div className={styles.levelContent}>
          <div className={styles.levelDisplay}>
            <div className={styles.levelBadge}>
              <div className={styles.levelNumber}>{profile.level}</div>
              <Typography variant="caption" className={styles.levelLabel}>
                LEVEL
              </Typography>
            </div>
          </div>

          <div className={styles.xpProgressSection}>
            <div className={styles.xpProgressHeader}>
              <Typography variant="body2" className={styles.xpLabel}>
                경험치 진행도
              </Typography>
            </div>

            <div className={styles.xpProgressBar}>
              <div
                className={styles.xpProgressFill}
                style={{ width: `${profile.progress}%` }}
              />
            </div>

            <Typography variant="caption" className={styles.xpText}>
              {profile.currentXP.toLocaleString()} /{" "}
              {profile.nextLevelXP.toLocaleString()} XP ({profile.progress}%)
            </Typography>
          </div>
        </div>
      </SectionCard>

      {/* 업적 */}
      <SectionCard
        title="업적"
        subtitle="학습 목표를 달성하여 특별한 업적을 잠금 해제하세요"
        className={styles.achievementsCard}
      >
        {/* 필터 탭 */}
        <div className={styles.achievementFilters}>
          <button
            className={`${styles.filterButton} ${achievementFilter === "all" ? styles.active : ""}`}
            onClick={() => onAchievementFilterChange("all")}
          >
            전체 ({mockAchievements.length})
          </button>
          <button
            className={`${styles.filterButton} ${
              achievementFilter === "completed" ? styles.active : ""
            }`}
            onClick={() => onAchievementFilterChange("completed")}
          >
            달성 ({mockAchievements.filter((a) => a.isCompleted).length})
          </button>
          <button
            className={`${styles.filterButton} ${
              achievementFilter === "incomplete" ? styles.active : ""
            }`}
            onClick={() => onAchievementFilterChange("incomplete")}
          >
            미달성 ({mockAchievements.filter((a) => !a.isCompleted).length})
          </button>
        </div>

        <div className={styles.achievementContainer}>
          <div className={styles.achievementGrid}>
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`${styles.achievementItem} ${
                  achievement.isCompleted ? styles.completed : styles.locked
                }`}
              >
                <div className={styles.achievementIconWrapper}>
                  <div className={styles.achievementIcon}>
                    {achievement.isCompleted ? (
                      <span className={styles.achievementEmoji}>{achievement.icon}</span>
                    ) : (
                      <Lock className={styles.lockIcon} />
                    )}
                  </div>
                </div>
                <div className={styles.achievementInfo}>
                  <Typography variant="body2" className={styles.achievementTitle}>
                    {achievement.title}
                  </Typography>
                  <Typography variant="caption" className={styles.achievementDescription}>
                    {achievement.description}
                  </Typography>
                  {achievement.isCompleted && achievement.date && (
                    <Typography variant="caption" className={styles.achievementDate}>
                      {achievement.date} 달성
                    </Typography>
                  )}
                </div>

                {achievement.isCompleted && <CheckCircle className={styles.completedCheckIcon} />}
              </div>
            ))}
          </div>
        </div>

        {filteredAchievements.length === 0 && (
          <div className={styles.noAchievements}>
            <Typography variant="body2" className={styles.noAchievementsText}>
              {achievementFilter === "completed"
                ? "아직 달성한 업적이 없습니다."
                : achievementFilter === "incomplete"
                ? "모든 업적을 달성했습니다! 🎉"
                : "업적이 없습니다."}
            </Typography>
          </div>
        )}
      </SectionCard>
    </>
  );
}
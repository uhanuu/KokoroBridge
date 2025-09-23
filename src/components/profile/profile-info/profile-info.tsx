"use client";

import {
  Settings,
  LocalFireDepartment,
  Schedule,
  Book,
  EmojiEvents,
  Lock,
  CheckCircle
} from "@mui/icons-material";
import { Typography, IconButton } from "@mui/material";
import React, { useState, useCallback } from "react";
import Image from "next/image";

import Card from "@/components/ui/card";
import SectionCard from "@/components/ui/section-card";
import { profileInfoStaticData, getMascotImage } from "@/mock/profile-info-mock";
import { mockAchievements } from "@/mock/profile-mock";
import styles from "./profile-info.module.css";

interface UserProfile {
  name: string;
  email: string;
  level: number;
  joinDate: string;
  streak: number;
  avatar?: string;
  currentXP: number;
  nextLevelXP: number;
  progress: number;
}

interface ProfileInfoProps {
  profile: UserProfile;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  const [achievementFilter, setAchievementFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const handleAchievementFilterChange = useCallback(
    (filter: "all" | "completed" | "incomplete") => {
      setAchievementFilter(filter);
    },
    []
  );

  const filteredAchievements = mockAchievements
    .filter((achievement) => {
      if (achievementFilter === "completed") return achievement.isCompleted;
      if (achievementFilter === "incomplete") return !achievement.isCompleted;
      return true;
    })
    .sort((a, b) => {
      if (achievementFilter === "all" || achievementFilter === "completed") {
        if (a.isCompleted && !b.isCompleted) return -1;
        if (!a.isCompleted && b.isCompleted) return 1;

        if (a.isCompleted && b.isCompleted) {
          if (a.date && !b.date) return -1;
          if (!a.date && b.date) return 1;
          if (a.date && b.date) {
            const parseKoreanDate = (dateStr: string) => {
              const match = dateStr.match(/(\d+)년\s*(\d+)월\s*(\d+)일/);
              if (match && match[1] && match[2] && match[3]) {
                const year = parseInt(match[1]);
                const month = parseInt(match[2]);
                const day = parseInt(match[3]);
                return new Date(year, month - 1, day);
              }
              return new Date(0);
            };

            const dateA = parseKoreanDate(a.date);
            const dateB = parseKoreanDate(b.date);
            return dateB.getTime() - dateA.getTime();
          }
        }
      }

      return a.id - b.id;
    });

  return (
    <Card
      variant="default"
      size="lg"
      padding="xl"
      borderRadius="xl"
      className={styles.profileCard}
    >
      <div className={styles.profileContent}>
        {/* 설정 버튼 */}
        <div className={styles.settingsButton}>
          <IconButton className={styles.settingsIcon}>
            <Settings className={styles.settingsIconSvg} />
          </IconButton>
        </div>

        {/* 프로필 정보 통합 섹션 */}
        <div className={styles.profileMainSection}>
          <div className={styles.profileInfoSection}>
            {/* 마스코트 이미지 */}
            <div className={styles.mascotImageWrapper}>
              <Image
                src={getMascotImage(profile.level)}
                alt="Mascot Character"
                width={80}
                height={80}
                className={styles.mascotImage}
              />
            </div>

            {/* 사용자 정보 */}
            <div className={styles.userInfoSection}>
              <Typography variant="h5" className={styles.userName}>
                {profile.name}
              </Typography>
              <Typography variant="body2" className={styles.userEmail}>
                {profile.email}
              </Typography>
              <Typography variant="caption" className={styles.userJoinDate}>
                {profile.joinDate} 가입
              </Typography>
            </div>
          </div>

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
              {/* 레벨 표시 */}
              <div className={styles.levelDisplay}>
                <div className={styles.levelBadge}>
                  <div className={styles.levelNumber}>{profile.level}</div>
                  <Typography variant="caption" className={styles.levelLabel}>
                    LEVEL
                  </Typography>
                </div>
              </div>

              {/* 경험치 진행도 */}
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
                onClick={() => handleAchievementFilterChange("all")}
              >
                전체 ({mockAchievements.length})
              </button>
              <button
                className={`${styles.filterButton} ${
                  achievementFilter === "completed" ? styles.active : ""
                }`}
                onClick={() => handleAchievementFilterChange("completed")}
              >
                달성 ({mockAchievements.filter((a) => a.isCompleted).length})
              </button>
              <button
                className={`${styles.filterButton} ${
                  achievementFilter === "incomplete" ? styles.active : ""
                }`}
                onClick={() => handleAchievementFilterChange("incomplete")}
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
        </div>
      </div>
    </Card>
  );
}
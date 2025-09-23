"use client";

import {
  Book,
  Star,
  EmojiEvents,
  Notifications,
  DarkMode,
  Edit,
  Support,
  Info,
  ExitToApp,
  Lock,
  CheckCircle,
  Face,
} from "@mui/icons-material";
import { Typography, Switch } from "@mui/material";
import React, { useState, useCallback } from "react";

import ProgressCard from "@/components/ui/progress-card";
import SectionCard from "@/components/ui/section-card";
import { mockUserProfile, mockAchievements } from "@/mock/profile-mock";

import ProfileInfo from "./profile-info/profile-info";
import styles from "./profile-page.module.css";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [achievementFilter, setAchievementFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const handleNotificationsToggle = useCallback(() => {
    setNotifications((prev) => !prev);
  }, []);

  const handleActionClick = useCallback((action: string) => {
    // console.log(`${action} clicked`);
  }, []);

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
      // 전체 또는 달성 필터일 때 최근 달성한 업적을 먼저 보여줌
      if (achievementFilter === "all" || achievementFilter === "completed") {
        // 달성된 업적을 먼저, 그 다음 미달성 업적
        if (a.isCompleted && !b.isCompleted) return -1;
        if (!a.isCompleted && b.isCompleted) return 1;

        // 둘 다 달성된 경우, 날짜가 있는 것을 우선하고 최근 날짜를 먼저
        if (a.isCompleted && b.isCompleted) {
          if (a.date && !b.date) return -1;
          if (!a.date && b.date) return 1;
          if (a.date && b.date) {
            // 한국어 날짜 형식을 간단히 비교 (예: "2024년 3월 1일" vs "2024년 1월 15일")
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

      // 기본적으로 ID 순서 유지
      return a.id - b.id;
    });

  return (
    <div className={styles.container}>
      {/* 프로필 정보 */}
      <ProfileInfo profile={mockUserProfile} />

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
              <div className={styles.levelNumber}>{mockUserProfile.level}</div>
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
                style={{ width: `${mockUserProfile.progress}%` }}
              />
            </div>

            <Typography variant="caption" className={styles.xpText}>
              {mockUserProfile.currentXP.toLocaleString()} /{" "}
              {mockUserProfile.nextLevelXP.toLocaleString()} XP ({mockUserProfile.progress}%)
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

      {/* 설정 */}
      <SectionCard title="설정" className={styles.settingsCard}>
        <div className={styles.settingsContent}>
          {/* 학습 설정 카테고리 */}
          <div className={styles.settingCategory}>
            <Typography variant="h6" className={styles.categoryTitle}>
              학습 설정
            </Typography>
            <div className={styles.categoryItems}>
              <div className={styles.settingItem}>
                <div className={styles.itemIcon}>
                  <Notifications className={`${styles.settingIcon} ${styles.notificationIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    알림 설정
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    학습 리마인더 및 알림
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <Switch
                    checked={notifications}
                    onChange={handleNotificationsToggle}
                    color="primary"
                    className={styles.switch}
                  />
                </div>
              </div>

              <button className={styles.settingItem} onClick={() => handleActionClick("goal")}>
                <div className={styles.itemIcon}>
                  <Star className={`${styles.settingIcon} ${styles.goalIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    학습 목표
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    일일 학습 목표 설정
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("data")}>
                <div className={styles.itemIcon}>
                  <Book className={`${styles.settingIcon} ${styles.dataIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    학습 데이터
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    데이터 백업 및 복원
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 계정 설정 카테고리 */}
          <div className={styles.settingCategory}>
            <Typography variant="h6" className={styles.categoryTitle}>
              계정 설정
            </Typography>
            <div className={styles.categoryItems}>
              <button className={styles.settingItem} onClick={() => handleActionClick("profile")}>
                <div className={styles.itemIcon}>
                  <Edit className={`${styles.settingIcon} ${styles.profileEditIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    프로필 수정
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    이름, 이메일 등 개인정보
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("mascot")}>
                <div className={styles.itemIcon}>
                  <Face className={`${styles.settingIcon} ${styles.mascotIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    마스코트 이미지 변경
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    프로필 마스코트 캐릭터 선택
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("password")}>
                <div className={styles.itemIcon}>
                  <Lock className={`${styles.settingIcon} ${styles.passwordIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    비밀번호 변경
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    계정 보안을 위한 비밀번호 변경
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("privacy")}>
                <div className={styles.itemIcon}>
                  <CheckCircle className={`${styles.settingIcon} ${styles.privacyIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    개인정보 보호
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    데이터 수집 및 사용 동의
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 앱 설정 카테고리 */}
          <div className={styles.settingCategory}>
            <Typography variant="h6" className={styles.categoryTitle}>
              앱 설정
            </Typography>
            <div className={styles.categoryItems}>
              <div className={styles.settingItem}>
                <div className={styles.itemIcon}>
                  <DarkMode className={`${styles.settingIcon} ${styles.darkModeIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    다크 모드
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    어두운 테마 사용
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <Switch
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                    color="primary"
                    className={styles.switch}
                  />
                </div>
              </div>

              <button className={styles.settingItem} onClick={() => handleActionClick("support")}>
                <div className={styles.itemIcon}>
                  <Support className={`${styles.settingIcon} ${styles.supportIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    고객 지원
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    문의사항 및 도움말
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button className={styles.settingItem} onClick={() => handleActionClick("info")}>
                <div className={styles.itemIcon}>
                  <Info className={`${styles.settingIcon} ${styles.infoIcon}`} />
                </div>
                <div className={styles.itemInfo}>
                  <Typography variant="body1" className={styles.itemLabel}>
                    앱 정보
                  </Typography>
                  <Typography variant="caption" className={styles.itemDescription}>
                    버전 정보 및 라이선스
                  </Typography>
                </div>
                <div className={styles.itemAction}>
                  <div className={styles.arrow}>
                    <span>→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 로그아웃 버튼 */}
      <div className={styles.logoutSection}>
        <button className={styles.logoutButton} onClick={() => handleActionClick("logout")}>
          <ExitToApp className={styles.logoutIcon} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}

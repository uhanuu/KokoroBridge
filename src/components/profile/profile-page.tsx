"use client";

import {
  Schedule,
  Book,
  Star,
  EmojiEvents,
  LocalFireDepartment,
  Notifications,
  DarkMode,
  Edit,
  Support,
  Info,
  ExitToApp,
  Lock,
  CheckCircle,
  Face,
  CardGiftcard
} from "@mui/icons-material";
import { Typography, Switch, LinearProgress } from "@mui/material";
import React, { useState, useCallback } from "react";

import SectionCard from "@/components/ui/section-card";
import StatsGrid from "@/components/ui/stats-grid";
import StatCard from "@/components/ui/stat-card";
import ProgressCard from "@/components/ui/progress-card";
import { mockUserProfile, mockLearningStats, mockAchievements } from "@/mock/profile-mock";

import styles from "./profile-page.module.css";
import ProfileInfo from "./profile-info/profile-info";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [achievementFilter, setAchievementFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const handleDarkModeToggle = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const handleNotificationsToggle = useCallback(() => {
    setNotifications(prev => !prev);
  }, []);

  const handleActionClick = useCallback((action: string) => {
    console.log(`${action} clicked`);
  }, []);

  const handleAchievementFilterChange = useCallback((filter: 'all' | 'completed' | 'incomplete') => {
    setAchievementFilter(filter);
  }, []);

  const filteredAchievements = mockAchievements.filter(achievement => {
    if (achievementFilter === 'completed') return achievement.isCompleted;
    if (achievementFilter === 'incomplete') return !achievement.isCompleted;
    return true;
  });

  return (
    <div className={styles.container}>
      {/* 프로필 정보 */}
      <ProfileInfo profile={mockUserProfile} />


      {/* 레벨 및 경험치 */}
      <SectionCard
        title={`레벨 ${mockUserProfile.level}`}
        subtitle={`다음 레벨까지 ${mockUserProfile.nextLevelXP - mockUserProfile.currentXP} XP 필요`}
        headerAction={
          <div className={styles.xpInfo}>
            <Typography variant="h6" className={styles.xpPercentage}>
              {mockUserProfile.progress}%
            </Typography>
            <Typography variant="caption" className={styles.xpText}>
              {mockUserProfile.currentXP} / {mockUserProfile.nextLevelXP} XP
            </Typography>
          </div>
        }
        className={styles.levelCard}
      >
        <div className={styles.levelContent}>
          <div className={styles.levelIconSection}>
            <div className={styles.levelIconWrapper}>
              <EmojiEvents className={styles.levelIcon} />
              <div className={styles.levelBadge}>
                <Typography variant="caption" className={styles.levelNumber}>
                  {mockUserProfile.level}
                </Typography>
              </div>
            </div>
            <div className={styles.levelRewards}>
              <Typography variant="caption" className={styles.rewardText}>
                레벨 업 시 특별 보상 획득 가능!
              </Typography>
            </div>
          </div>

          <ProgressCard
            items={[
              {
                label: "경험치 진행도",
                value: mockUserProfile.progress,
                description: `${mockUserProfile.currentXP} / ${mockUserProfile.nextLevelXP} XP`,
                color: "var(--success-500)"
              }
            ]}
            className={styles.xpProgress}
          />
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
            className={`${styles.filterButton} ${achievementFilter === 'all' ? styles.active : ''}`}
            onClick={() => handleAchievementFilterChange('all')}
          >
            전체 ({mockAchievements.length})
          </button>
          <button
            className={`${styles.filterButton} ${achievementFilter === 'completed' ? styles.active : ''}`}
            onClick={() => handleAchievementFilterChange('completed')}
          >
            달성 ({mockAchievements.filter(a => a.isCompleted).length})
          </button>
          <button
            className={`${styles.filterButton} ${achievementFilter === 'incomplete' ? styles.active : ''}`}
            onClick={() => handleAchievementFilterChange('incomplete')}
          >
            미달성 ({mockAchievements.filter(a => !a.isCompleted).length})
          </button>
        </div>

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
                {achievement.isCompleted && (
                  <div className={styles.completedBadge}>
                    <CheckCircle className={styles.completedIcon} />
                  </div>
                )}
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
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className={styles.noAchievements}>
            <Typography variant="body2" className={styles.noAchievementsText}>
              {achievementFilter === 'completed'
                ? '아직 달성한 업적이 없습니다.'
                : achievementFilter === 'incomplete'
                ? '모든 업적을 달성했습니다! 🎉'
                : '업적이 없습니다.'}
            </Typography>
          </div>
        )}

        {/* 달성률 및 보상 */}
        <div className={styles.achievementProgressContainer}>
          <div className={styles.progressHeader}>
            <Typography variant="body1" className={styles.progressTitle}>
              달성률
            </Typography>
            <Typography variant="h4" className={styles.progressPercentage}>
              {Math.round((mockAchievements.filter(a => a.isCompleted).length / mockAchievements.length) * 100)}%
            </Typography>
          </div>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{
                width: `${(mockAchievements.filter(a => a.isCompleted).length / mockAchievements.length) * 100}%`
              }}
            />
          </div>
          <div className={styles.rewardSection}>
            <Typography variant="caption" className={styles.progressDescription}>
              {mockAchievements.filter(a => a.isCompleted).length}개 / {mockAchievements.length}개 업적 달성
            </Typography>
            <button
              className={`${styles.rewardButton} ${
                mockAchievements.filter(a => a.isCompleted).length === mockAchievements.length
                  ? styles.rewardEnabled
                  : styles.rewardDisabled
              }`}
              disabled={mockAchievements.filter(a => a.isCompleted).length !== mockAchievements.length}
              onClick={() => handleActionClick('reward')}
            >
              <CardGiftcard className={styles.rewardIcon} />
              <Typography variant="caption" className={styles.rewardText}>
                보상받기
              </Typography>
            </button>
          </div>
        </div>

      </SectionCard>

      {/* 설정 */}
      <SectionCard
        title="설정"
        className={styles.settingsCard}
      >
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

              <button
                className={styles.settingItem}
                onClick={() => handleActionClick('goal')}
              >
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

              <button
                className={styles.settingItem}
                onClick={() => handleActionClick('data')}
              >
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
              <button
                className={styles.settingItem}
                onClick={() => handleActionClick('profile')}
              >
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

              <button
                className={styles.settingItem}
                onClick={() => handleActionClick('mascot')}
              >
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

              <button
                className={styles.settingItem}
                onClick={() => handleActionClick('password')}
              >
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

              <button
                className={styles.settingItem}
                onClick={() => handleActionClick('privacy')}
              >
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

              <button
                className={styles.settingItem}
                onClick={() => handleActionClick('support')}
              >
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

              <button
                className={styles.settingItem}
                onClick={() => handleActionClick('info')}
              >
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
        <button
          className={styles.logoutButton}
          onClick={() => handleActionClick('logout')}
        >
          <ExitToApp className={styles.logoutIcon} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
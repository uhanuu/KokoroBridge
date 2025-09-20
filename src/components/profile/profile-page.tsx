"use client";

import {
  Notifications,
  DarkMode,
  Edit,
  Key,
  Support,
  Info,
  ExitToApp,
  TrendingUp,
  Book,
  Star,
  Schedule,
  Lock,
  CheckCircle
} from "@mui/icons-material";
import { Typography, Switch, LinearProgress } from "@mui/material";
import React, { useState } from "react";

import Card from "@/components/ui/card";
import { mockUserProfile, mockLearningStats, mockAchievements } from "@/mock/profile-mock";
import styles from "./profile-page.module.css";
import ProfileInfo from "./profile-info/profile-info";
import SettingsMenuItem from "./settings-menu-item/settings-menu-item";
import MonthlyProgress from "../ui/bar/progress-bar/monthly-progress";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
  };

  return (
    <div className={styles.container}>
      {/* 프로필 정보 카드 */}
      <ProfileInfo profile={mockUserProfile} />

      {/* 학습 통계 - 개요 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.statsCard}
      >
          <Typography variant="h6" className={styles.cardTitle}>
            학습 통계
          </Typography>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statIconWrapper}>
                <TrendingUp className={styles.statIcon} />
              </div>
              <Typography variant="h5" className={styles.statNumber}>
                {mockLearningStats.overview.continuousDays}
              </Typography>
              <Typography variant="caption" className={styles.statLabel}>
                연속 학습
              </Typography>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIconWrapper}>
                <Schedule className={styles.statIcon} />
              </div>
              <Typography variant="h5" className={styles.statNumber}>
                {mockLearningStats.overview.totalHours}
              </Typography>
              <Typography variant="caption" className={styles.statLabel}>
                총 학습 시간
              </Typography>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIconWrapper}>
                <Book className={styles.statIcon} />
              </div>
              <Typography variant="h5" className={styles.statNumber}>
                {mockLearningStats.overview.completedLessons}
              </Typography>
              <Typography variant="caption" className={styles.statLabel}>
                완료한 레슨
              </Typography>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIconWrapper}>
                <Star className={styles.statIcon} />
              </div>
              <Typography variant="h5" className={styles.statNumber}>
                {mockLearningStats.overview.averageScore}
              </Typography>
              <Typography variant="caption" className={styles.statLabel}>
                평균 점수
              </Typography>
            </div>
          </div>
      </Card>

      {/* 학습 스킬 진행도 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.skillProgressCard}
      >
          <Typography variant="h6" className={styles.cardTitle}>
            스킬 진행도
          </Typography>
          <div className={styles.skillProgressList}>
            {mockLearningStats.skillProgress.map((skill, index) => (
              <div key={index} className={styles.skillProgressItem}>
                <div className={styles.skillHeader}>
                  <Typography variant="body2" className={styles.skillName}>
                    {skill.skill}
                  </Typography>
                  <Typography variant="caption" className={styles.skillStats}>
                    {skill.completed}/{skill.total} ({skill.progress}%)
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={skill.progress}
                  className={styles.skillProgressBar}
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: skill.color,
                    },
                  }}
                />
              </div>
            ))}
          </div>
      </Card>

      {/* 레벨 및 경험치 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.levelCard}
      >
          <div className={styles.levelHeader}>
            <div className={styles.levelInfo}>
              <Typography variant="h6" className={styles.levelTitle}>
                {mockLearningStats.levelInfo.currentLevel}
              </Typography>
              <Typography variant="caption" className={styles.levelSubtitle}>
                현재 레벨
              </Typography>
            </div>
            <div className={styles.xpInfo}>
              <Typography variant="body2" className={styles.xpText}>
                {mockLearningStats.levelInfo.currentXP} /{" "}
                {mockLearningStats.levelInfo.nextLevelXP} XP
              </Typography>
              <Typography variant="caption" className={styles.xpRemaining}>
                다음 레벨까지{" "}
                {mockLearningStats.levelInfo.nextLevelXP -
                  mockLearningStats.levelInfo.currentXP}{" "}
                XP 남음
              </Typography>
            </div>
          </div>
          <LinearProgress
            variant="determinate"
            value={mockLearningStats.levelInfo.progress}
            className={styles.levelProgressBar}
          />
      </Card>

      {/* 학습 스트릭 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.streakCard}
      >
          <Typography variant="h6" className={styles.cardTitle}>
            학습 연속성
          </Typography>
          <div className={styles.streakGrid}>
            <div className={styles.streakItem}>
              <Typography variant="h4" className={styles.streakNumber}>
                {mockLearningStats.studyStreak.current}
              </Typography>
              <Typography variant="caption" className={styles.streakLabel}>
                현재 연속일
              </Typography>
            </div>
            <div className={styles.streakItem}>
              <Typography variant="h4" className={styles.streakNumber}>
                {mockLearningStats.studyStreak.longest}
              </Typography>
              <Typography variant="caption" className={styles.streakLabel}>
                최고 기록
              </Typography>
            </div>
            <div className={styles.streakItem}>
              <Typography variant="h4" className={styles.streakNumber}>
                {mockLearningStats.studyStreak.thisMonth}
              </Typography>
              <Typography variant="caption" className={styles.streakLabel}>
                이번 달
              </Typography>
            </div>
            <div className={styles.streakItem}>
              <Typography variant="h4" className={styles.streakNumber}>
                {mockLearningStats.studyStreak.percentage}%
              </Typography>
              <Typography variant="caption" className={styles.streakLabel}>
                참여율
              </Typography>
            </div>
          </div>
      </Card>

      {/* 월별 진행 현황 */}
      <MonthlyProgress monthlyData={mockLearningStats.monthlyDetailedProgress} />

      {/* 업적 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.achievementsCard}
      >
          <Typography variant="h6" className={styles.cardTitle}>
            업적
          </Typography>
          <div className={styles.achievementProgress}>
            <Typography variant="body2" className={styles.progressText}>
              {mockAchievements.filter((a) => a.isCompleted).length}/
              {mockAchievements.length} 달성
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                (mockAchievements.filter((a) => a.isCompleted).length /
                  mockAchievements.length) *
                100
              }
              className={styles.achievementProgressBar}
            />
          </div>

          <div className={styles.achievementList}>
            {mockAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`${styles.achievementItem} ${
                  !achievement.isCompleted ? styles.locked : ""
                }`}
              >
                <div className={styles.achievementIcon}>
                  {achievement.isCompleted ? (
                    <CheckCircle className={styles.completedIcon} />
                  ) : (
                    <div className={styles.lockIcon}>
                      <Lock />
                    </div>
                  )}
                  <div className={styles.iconEmoji}>{achievement.icon}</div>
                </div>
                <div className={styles.achievementInfo}>
                  <Typography variant="body2" className={styles.achievementTitle}>
                    {achievement.title}
                  </Typography>
                  <Typography variant="caption" className={styles.achievementDescription}>
                    {achievement.description}
                  </Typography>
                  {achievement.date && (
                    <Typography variant="caption" className={styles.achievementDate}>
                      📅 {achievement.date}
                    </Typography>
                  )}
                </div>
                <div className={styles.achievementStatus}>
                  {achievement.isCompleted ? (
                    <div className={styles.completedBadge}>✓ 완료</div>
                  ) : (
                    <div className={styles.lockedBadge}>🔒 잠금</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.achievementSummary}>
            <div className={styles.summaryItem}>
              <Typography variant="h4" className={styles.summaryNumber}>
                {mockAchievements.filter((a) => a.isCompleted).length}
              </Typography>
              <Typography variant="caption" className={styles.summaryLabel}>
                완료된 업적
              </Typography>
            </div>
            <div className={styles.summaryItem}>
              <Typography variant="h4" className={styles.summaryNumber}>
                {mockAchievements.filter((a) => !a.isCompleted).length}
              </Typography>
              <Typography variant="caption" className={styles.summaryLabel}>
                남은 업적
              </Typography>
            </div>
          </div>
      </Card>

      {/* 설정 메뉴 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.settingsCard}
      >
          <Typography variant="h6" className={styles.cardTitle}>
            설정
          </Typography>

          <div className={styles.settingsGrid}>
            {/* 알림 설정 */}
            <div className={styles.toggleSettingItem}>
              <div className={styles.toggleSettingInfo}>
                <div className={styles.settingIcon}>
                  <Notifications className={styles.icon} />
                </div>
                <div className={styles.settingContent}>
                  <Typography variant="body1" className={styles.settingTitle}>
                    알림 설정
                  </Typography>
                  <Typography variant="caption" className={styles.settingSubtitle}>
                    학습 알림 및 소식 받기
                  </Typography>
                </div>
              </div>
              <Switch
                checked={notifications}
                onChange={handleNotificationsToggle}
                color="primary"
              />
            </div>

            {/* 다크 모드 */}
            <div className={styles.toggleSettingItem}>
              <div className={styles.toggleSettingInfo}>
                <div className={styles.settingIcon}>
                  <DarkMode className={styles.icon} />
                </div>
                <div className={styles.settingContent}>
                  <Typography variant="body1" className={styles.settingTitle}>
                    다크 모드
                  </Typography>
                  <Typography variant="caption" className={styles.settingSubtitle}>
                    어두운 테마 사용
                  </Typography>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                color="primary"
              />
            </div>
          </div>
      </Card>

      {/* 계정 관리 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.accountCard}
      >
          <Typography variant="h6" className={styles.cardTitle}>
            계정 관리
          </Typography>

          <div className={styles.settingsGrid}>
            <SettingsMenuItem
              icon={<Edit className={styles.icon} />}
              title="프로필 수정"
              subtitle="개인정보 및 프로필 이미지 변경"
              onClick={() => {}}
            />

            <SettingsMenuItem
              icon={<Key className={styles.icon} />}
              title="비밀번호 변경"
              subtitle="계정 보안을 위한 비밀번호 변경"
              onClick={() => {}}
            />
          </div>
      </Card>

      {/* 지원 및 정보 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.supportCard}
      >
          <Typography variant="h6" className={styles.cardTitle}>
            지원 및 정보
          </Typography>

          <div className={styles.settingsGrid}>
            <SettingsMenuItem
              icon={<Support className={styles.icon} />}
              title="고객 지원"
              subtitle="문의사항 및 도움말"
              onClick={() => {}}
            />

            <SettingsMenuItem
              icon={<Info className={styles.icon} />}
              title="앱 정보"
              subtitle="버전 정보 및 이용약관"
              onClick={() => {}}
            />

            <SettingsMenuItem
              icon={<Info className={styles.icon} />}
              title="개인정보 처리방침"
              subtitle="개인정보 보호 정책 확인"
              onClick={() => {}}
            />

            <SettingsMenuItem
              icon={<Info className={styles.icon} />}
              title="이용약관"
              subtitle="서비스 이용약관 확인"
              onClick={() => {}}
            />
          </div>
      </Card>

      {/* 로그아웃 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.logoutCard}
      >
          <SettingsMenuItem
            icon={<ExitToApp className={styles.iconLogout} />}
            title="로그아웃"
            subtitle="현재 계정에서 로그아웃"
            onClick={() => {}}
            isLogout={true}
          />
      </Card>
    </div>
  );
}
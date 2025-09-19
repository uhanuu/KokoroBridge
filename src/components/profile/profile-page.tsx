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
  Whatshot,
  Lock,
  CheckCircle
} from "@mui/icons-material";
import { Typography, Switch, LinearProgress } from "@mui/material";
import React, { useState } from "react";

import Card from "@/components/ui/card";
import styles from "./profile-page.module.css";
import ProfileInfo from "./profile-info/profile-info";
import SettingsMenuItem from "./settings-menu-item/settings-menu-item";
import MonthlyProgress from "../ui/bar/progress-bar/monthly-progress";

interface UserProfile {
  name: string;
  email: string;
  level: string;
  joinDate: string;
  streak: number;
  avatar?: string;
}

const mockUserProfile: UserProfile = {
  name: "유현우",
  email: "user@example.com",
  level: "중급",
  joinDate: "2023년 10월",
  streak: 12,
  avatar: "/profile-avatar.png"
};

// 학습 통계 데이터
const mockLearningStats = {
  overview: {
    continuousDays: 12,
    totalHours: 48,
    completedLessons: 156,
    averageScore: 87,
  },
  skillProgress: [
    { skill: "히라가나", progress: 95, total: 46, completed: 44, color: "#22c55e" },
    { skill: "가타카나", progress: 65, total: 46, completed: 30, color: "#3b82f6" },
    { skill: "기초 한자", progress: 30, total: 100, completed: 30, color: "#f59e0b" },
    { skill: "일상 회화", progress: 45, total: 50, completed: 23, color: "#8b5cf6" },
  ],
  monthlyDetailedProgress: [
    {
      year: 2023,
      month: 10,
      monthName: "10월",
      hours: 25,
      lessons: 35,
      streak: 8,
      averageScore: 78,
    },
    {
      year: 2023,
      month: 11,
      monthName: "11월",
      hours: 30,
      lessons: 42,
      streak: 12,
      averageScore: 81,
    },
    {
      year: 2023,
      month: 12,
      monthName: "12월",
      hours: 28,
      lessons: 38,
      streak: 10,
      averageScore: 79,
    },
    {
      year: 2024,
      month: 1,
      monthName: "1월",
      hours: 32,
      lessons: 45,
      streak: 15,
      averageScore: 82,
    },
    {
      year: 2024,
      month: 2,
      monthName: "2월",
      hours: 41,
      lessons: 58,
      streak: 18,
      averageScore: 85,
    },
    {
      year: 2024,
      month: 3,
      monthName: "3월",
      hours: 48,
      lessons: 67,
      streak: 22,
      averageScore: 87,
    },
    {
      year: 2024,
      month: 4,
      monthName: "4월",
      hours: 38,
      lessons: 52,
      streak: 16,
      averageScore: 84,
    },
    {
      year: 2024,
      month: 5,
      monthName: "5월",
      hours: 45,
      lessons: 63,
      streak: 20,
      averageScore: 89,
    },
    {
      year: 2024,
      month: 6,
      monthName: "6월",
      hours: 52,
      lessons: 71,
      streak: 25,
      averageScore: 91,
    },
  ],
  studyStreak: {
    current: 12,
    longest: 18,
    thisMonth: 15,
    percentage: 67,
  },
  levelInfo: {
    currentLevel: "중급",
    currentXP: 2840,
    nextLevelXP: 3500,
    progress: 81,
  },
};

const mockAchievements = [
  {
    id: 1,
    title: "첫 걸음",
    description: "첫 번째 레슨 완료",
    date: "2024년 1월 15일",
    isCompleted: true,
    icon: "🎯",
  },
  {
    id: 2,
    title: "일주일 연속",
    description: "7일 연속 학습 완료",
    date: "2024년 3월 1일",
    isCompleted: true,
    icon: "🔥",
  },
  {
    id: 3,
    title: "히라가나 마스터",
    description: "히라가나 완전 정복",
    date: "2024년 3월 10일",
    isCompleted: true,
    icon: "あ",
  },
  {
    id: 4,
    title: "가타카나 마스터",
    description: "가타카나 완전 정복",
    date: null,
    isCompleted: false,
    icon: "ア",
  },
];

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
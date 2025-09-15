"use client";

import {
  RecordVoiceOver,
  TrendingUp,
  Schedule,
  Book,
  Star,
  Lock,
  CheckCircle,
} from "@mui/icons-material";
import { Card, CardContent, Typography, LinearProgress } from "@mui/material";
import Image from "next/image";
import React from "react";

import ActionButton from "@/components/ui/action-button";

import styles from "./page.module.css";

const mockData = {
  userName: "유현우",
  todayProgress: { completed: 2, total: 4 },
  learningCards: [
    {
      id: 1,
      title: "히라가나",
      subtitle: "あいうえお",
      progress: 75,
      totalCharacters: 46,
      learnedCharacters: 34,
      color: "#22c55e",
      icon: "あ",
      description: "일본어의 기본 문자",
    },
    {
      id: 2,
      title: "가타카나",
      subtitle: "アイウエオ",
      progress: 45,
      totalCharacters: 46,
      learnedCharacters: 21,
      color: "#3b82f6",
      icon: "ア",
      description: "외래어 표기 문자",
    },
    {
      id: 3,
      title: "한자",
      subtitle: "漢字",
      progress: 30,
      totalCharacters: 100,
      learnedCharacters: 30,
      color: "#f59e0b",
      icon: "漢",
      description: "일본 한자 학습",
      isLocked: true,
    },
    {
      id: 4,
      title: "AI 회화",
      subtitle: "会話練習",
      progress: 60,
      totalSessions: 20,
      completedSessions: 12,
      color: "#8b5cf6",
      icon: RecordVoiceOver,
      description: "AI와 대화 연습",
      isLocked: true,
    },
  ],
  learningStats: {
    overview: {
      continuousDays: 12,
      totalHours: 48,
      completedLessons: 156,
      averageScore: 87,
    },
    weeklyData: [
      { day: "월", hours: 2.5, lessons: 3, accuracy: 85 },
      { day: "화", hours: 3.2, lessons: 4, accuracy: 92 },
      { day: "수", hours: 1.8, lessons: 2, accuracy: 78 },
      { day: "목", hours: 4.1, lessons: 5, accuracy: 94 },
      { day: "금", hours: 2.9, lessons: 3, accuracy: 89 },
      { day: "토", hours: 2.3, lessons: 2, accuracy: 81 },
      { day: "일", hours: 3.5, lessons: 4, accuracy: 87 },
    ],
    skillProgress: [
      { skill: "히라가나", progress: 95, total: 46, completed: 44, color: "#22c55e" },
      { skill: "가타카나", progress: 65, total: 46, completed: 30, color: "#3b82f6" },
      { skill: "기초 한자", progress: 30, total: 100, completed: 30, color: "#f59e0b" },
      { skill: "일상 회화", progress: 45, total: 50, completed: 23, color: "#8b5cf6" },
    ],
    monthlyProgress: [
      { month: "1월", hours: 32, lessons: 45, score: 82 },
      { month: "2월", hours: 41, lessons: 58, score: 85 },
      { month: "3월", hours: 48, lessons: 67, score: 87 },
    ],
    studyStreak: {
      current: 12,
      longest: 18,
      thisMonth: 15,
      percentage: 67, // 이번 달 학습 참여율
    },
    levelInfo: {
      currentLevel: "중급",
      currentXP: 2840,
      nextLevelXP: 3500,
      progress: 81, // (2840/3500) * 100
    },
  },
  achievements: [
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
  ],
  recentActivities: [
    { id: 1, title: "히라가나 あ리즈 학습", time: "2시간 전", type: "히라가나", progress: 85 },
    { id: 2, title: "AI 회화 - 일상 인사", time: "오늘 오후", type: "AI 회화", progress: 100 },
    { id: 3, title: "가타카나 ア열 연습", time: "어제", type: "가타카나", progress: 60 },
  ],
};

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* 환영 헤더 카드 */}
      <Card className={`${styles.card} ${styles.welcomeCard}`}>
        <CardContent className={styles.welcomeContent}>
          <div className={styles.welcomeText}>
            <div className={styles.greetingWithFurigana}>
              <ruby className={styles.rubyText}>
                頑張れ
                <rt className={styles.furigana}>がんば</rt>
              </ruby>
              <span className={styles.greetingRest}>、{mockData.userName}さん!</span>
            </div>
            <div className={styles.greetingSubText}>오늘도 일본어 학습을 시작해볼까요?</div>
          </div>
          <div className={styles.characterContainer}>
            <Image
              src="/home-character.png"
              width={140}
              height={140}
              alt="캐릭터"
              className={styles.characterImage}
            />
          </div>
        </CardContent>
      </Card>

      {/* 빠른 시작 */}
      <Card className={`${styles.card} ${styles.quickStartCard}`}>
        <CardContent>
          <div className={styles.cardHeader}>
            <Typography variant="h6" className={styles.cardTitle}>
              빠른 시작
            </Typography>
            <Typography variant="body2" className={styles.cardSubtitle}>
              원하는 학습 유형을 선택하세요
            </Typography>
          </div>
          <div className={styles.learningCardsGrid}>
            {mockData.learningCards.map((card) => {
              return (
                <div
                  key={card.id}
                  className={`${styles.learningItem} ${card.isLocked ? styles.locked : ""}`}
                >
                  {card.isLocked && <div className={styles.lockOverlay} />}
                  <div className={styles.learningItemHeader}>
                    <div
                      className={styles.learningItemIcon}
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      {typeof card.icon === "string" ? (
                        <span
                          className={styles.iconText}
                          style={{ color: card.color, opacity: card.isLocked ? 0.3 : 1 }}
                        >
                          {card.icon}
                        </span>
                      ) : (
                        <card.icon
                          style={{ color: card.color, opacity: card.isLocked ? 0.3 : 1 }}
                        />
                      )}
                      {card.isLocked && (
                        <div className={styles.lockIconOverlay}>
                          <Lock className={styles.lockIcon} />
                        </div>
                      )}
                    </div>
                    <div className={styles.learningItemInfo}>
                      <Typography variant="subtitle2" className={styles.learningItemTitle}>
                        {card.title}
                      </Typography>
                      <Typography variant="caption" className={styles.learningItemSubtitle}>
                        {card.subtitle}
                      </Typography>
                    </div>
                  </div>

                  <Typography variant="body2" className={styles.learningItemDescription}>
                    {card.isLocked ? "곧 출시 예정" : card.description}
                  </Typography>

                  <ActionButton
                    text={card.isLocked ? "잠금됨" : "시작하기"}
                    variant={card.isLocked ? "locked" : "primary"}
                    disabled={card.isLocked}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 최근 활동 */}
      <Card className={`${styles.card} ${styles.activityCard}`}>
        <CardContent>
          <Typography variant="h6" className={styles.cardTitle}>
            최근 활동
          </Typography>
          <div className={styles.activityList}>
            {mockData.recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityContent}>
                  <div className={styles.activityInfo}>
                    <Typography variant="body2" className={styles.activityTitle}>
                      {activity.title}
                    </Typography>
                    <div className={styles.activityTime}>
                      <span>{activity.time}</span>
                      <span className={styles.activityTypeTag}>
                        {activity.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.activityProgressSection}>
                  <div className={styles.activityProgress}>
                    <LinearProgress
                      variant="determinate"
                      value={activity.progress}
                      className={styles.activityProgressBar}
                    />
                    <Typography variant="caption" className={styles.activityPercent}>
                      {activity.progress}%
                    </Typography>
                  </div>
                  <ActionButton
                    text={activity.progress === 100 ? "완료됨" : "계속하기"}
                    variant={activity.progress === 100 ? "completed" : "primary"}
                    disabled={activity.progress === 100}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 학습 통계 - 개요 */}
      <Card className={`${styles.card} ${styles.statsCard}`}>
        <CardContent>
          <Typography variant="h6" className={styles.cardTitle}>
            학습 통계
          </Typography>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statIconWrapper}>
                <TrendingUp className={styles.statIcon} />
              </div>
              <Typography variant="h5" className={styles.statNumber}>
                {mockData.learningStats.overview.continuousDays}
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
                {mockData.learningStats.overview.totalHours}
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
                {mockData.learningStats.overview.completedLessons}
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
                {mockData.learningStats.overview.averageScore}
              </Typography>
              <Typography variant="caption" className={styles.statLabel}>
                평균 점수
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 학습 스킬 진행도 */}
      <Card className={`${styles.card} ${styles.skillProgressCard}`}>
        <CardContent>
          <Typography variant="h6" className={styles.cardTitle}>
            스킬 진행도
          </Typography>
          <div className={styles.skillProgressList}>
            {mockData.learningStats.skillProgress.map((skill, index) => (
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
        </CardContent>
      </Card>

      {/* 레벨 및 경험치 */}
      <Card className={`${styles.card} ${styles.levelCard}`}>
        <CardContent>
          <div className={styles.levelHeader}>
            <div className={styles.levelInfo}>
              <Typography variant="h6" className={styles.levelTitle}>
                {mockData.learningStats.levelInfo.currentLevel}
              </Typography>
              <Typography variant="caption" className={styles.levelSubtitle}>
                현재 레벨
              </Typography>
            </div>
            <div className={styles.xpInfo}>
              <Typography variant="body2" className={styles.xpText}>
                {mockData.learningStats.levelInfo.currentXP} /{" "}
                {mockData.learningStats.levelInfo.nextLevelXP} XP
              </Typography>
              <Typography variant="caption" className={styles.xpRemaining}>
                다음 레벨까지{" "}
                {mockData.learningStats.levelInfo.nextLevelXP -
                  mockData.learningStats.levelInfo.currentXP}{" "}
                XP 남음
              </Typography>
            </div>
          </div>
          <LinearProgress
            variant="determinate"
            value={mockData.learningStats.levelInfo.progress}
            className={styles.levelProgressBar}
          />
        </CardContent>
      </Card>

      {/* 학습 스트릭 */}
      <Card className={`${styles.card} ${styles.streakCard}`}>
        <CardContent>
          <Typography variant="h6" className={styles.cardTitle}>
            학습 연속성
          </Typography>
          <div className={styles.streakGrid}>
            <div className={styles.streakItem}>
              <Typography variant="h4" className={styles.streakNumber}>
                {mockData.learningStats.studyStreak.current}
              </Typography>
              <Typography variant="caption" className={styles.streakLabel}>
                현재 연속일
              </Typography>
            </div>
            <div className={styles.streakItem}>
              <Typography variant="h4" className={styles.streakNumber}>
                {mockData.learningStats.studyStreak.longest}
              </Typography>
              <Typography variant="caption" className={styles.streakLabel}>
                최고 기록
              </Typography>
            </div>
            <div className={styles.streakItem}>
              <Typography variant="h4" className={styles.streakNumber}>
                {mockData.learningStats.studyStreak.thisMonth}
              </Typography>
              <Typography variant="caption" className={styles.streakLabel}>
                이번 달
              </Typography>
            </div>
            <div className={styles.streakItem}>
              <Typography variant="h4" className={styles.streakNumber}>
                {mockData.learningStats.studyStreak.percentage}%
              </Typography>
              <Typography variant="caption" className={styles.streakLabel}>
                참여율
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 월별 진행 상황 */}
      <Card className={`${styles.card} ${styles.monthlyCard}`}>
        <CardContent>
          <Typography variant="h6" className={styles.cardTitle}>
            월별 진행 상황
          </Typography>
          <div className={styles.monthlyChart}>
            {mockData.learningStats.monthlyProgress.map((month, index) => (
              <div key={index} className={styles.monthlyItem}>
                <Typography variant="caption" className={styles.monthLabel}>
                  {month.month}
                </Typography>
                <div className={styles.monthlyStats}>
                  <div className={styles.monthlyStat}>
                    <Typography variant="body2" className={styles.monthlyValue}>
                      {month.hours}h
                    </Typography>
                    <Typography variant="caption" className={styles.monthlyDesc}>
                      학습시간
                    </Typography>
                  </div>
                  <div className={styles.monthlyStat}>
                    <Typography variant="body2" className={styles.monthlyValue}>
                      {month.lessons}개
                    </Typography>
                    <Typography variant="caption" className={styles.monthlyDesc}>
                      레슨
                    </Typography>
                  </div>
                  <div className={styles.monthlyStat}>
                    <Typography variant="body2" className={styles.monthlyValue}>
                      {month.score}점
                    </Typography>
                    <Typography variant="caption" className={styles.monthlyDesc}>
                      평균점수
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 업적 */}
      <Card className={`${styles.card} ${styles.achievementsCard}`}>
        <CardContent>
          <Typography variant="h6" className={styles.cardTitle}>
            업적
          </Typography>
          <div className={styles.achievementProgress}>
            <Typography variant="body2" className={styles.progressText}>
              {mockData.achievements.filter((a) => a.isCompleted).length}/
              {mockData.achievements.length} 달성
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                (mockData.achievements.filter((a) => a.isCompleted).length /
                  mockData.achievements.length) *
                100
              }
              className={styles.achievementProgressBar}
            />
          </div>

          <div className={styles.achievementList}>
            {mockData.achievements.map((achievement) => (
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
                {mockData.achievements.filter((a) => a.isCompleted).length}
              </Typography>
              <Typography variant="caption" className={styles.summaryLabel}>
                완료된 업적
              </Typography>
            </div>
            <div className={styles.summaryItem}>
              <Typography variant="h4" className={styles.summaryNumber}>
                {mockData.achievements.filter((a) => !a.isCompleted).length}
              </Typography>
              <Typography variant="caption" className={styles.summaryLabel}>
                남은 업적
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

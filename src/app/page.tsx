"use client";

import {
  RecordVoiceOver,
  PlayArrow,
  TrendingUp,
  Schedule,
  Book,
  Star,
  Lock,
  Create,
  AccessTime,
  MenuBook,
  EmojiEvents,
  CheckCircle,
} from "@mui/icons-material";
import { Card, CardContent, Typography, LinearProgress } from "@mui/material";
import Image from "next/image";
import React from "react";

import styles from "./page.module.css";

const mockData = {
  userName: "사용자",
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
    continuousDays: 12,
    totalHours: 48,
    completedLessons: 156,
    averageScore: 87,
    weeklyData: [
      { day: "월", hours: 2.5 },
      { day: "화", hours: 3.2 },
      { day: "수", hours: 1.8 },
      { day: "목", hours: 4.1 },
      { day: "금", hours: 2.9 },
      { day: "토", hours: 2.3 },
      { day: "일", hours: 3.5 },
    ],
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
            <Typography variant="h6" className={styles.greetingText}>
              頑張れ、{mockData.userName}さん
            </Typography>
            <Typography variant="body2" className={styles.greetingSubText}>
              오늘도 일본어 학습을 시작해볼까요?
            </Typography>
          </div>
          <div className={styles.characterContainer}>
            <Image
              src="/home-character.png"
              width={120}
              height={120}
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

                  {!card.isLocked && (
                    <div className={styles.learningItemProgress}>
                      <div className={styles.learningItemStats}>
                        <Typography variant="caption" className={styles.progressText}>
                          {card.learnedCharacters || card.completedSessions}/
                          {card.totalCharacters || card.totalSessions}
                        </Typography>
                        <Typography variant="caption" className={styles.progressPercent}>
                          {card.progress}%
                        </Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={card.progress}
                        className={styles.learningProgressBar}
                        style={
                          {
                            "--progress-color": card.color,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  )}

                  <button
                    className={`${styles.startLearningButton} ${
                      card.isLocked ? styles.lockedButton : ""
                    }`}
                    disabled={card.isLocked}
                  >
                    <span className={styles.buttonText}>
                      {card.isLocked ? "잠금됨" : "시작하기"}
                    </span>
                    <div className={styles.playIconCircle}>
                      {card.isLocked ? (
                        <Lock className={styles.playIcon} />
                      ) : (
                        <PlayArrow className={styles.playIcon} />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 학습 통계 */}
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
                {mockData.learningStats.continuousDays}
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
                {mockData.learningStats.totalHours}
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
                {mockData.learningStats.completedLessons}
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
                {mockData.learningStats.averageScore}
              </Typography>
              <Typography variant="caption" className={styles.statLabel}>
                평균 점수
              </Typography>
            </div>
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
                <div className={styles.activityInfo}>
                  <Typography variant="body2" className={styles.activityTitle}>
                    {activity.title}
                  </Typography>
                  <Typography variant="caption" className={styles.activityTime}>
                    {activity.time} · {activity.type}
                  </Typography>
                </div>
                <div className={styles.activityProgress}>
                  <Typography variant="caption" className={styles.activityPercent}>
                    {activity.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={activity.progress}
                    className={styles.activityProgressBar}
                  />
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

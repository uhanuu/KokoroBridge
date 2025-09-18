"use client";

import {
  RecordVoiceOver,
  Schedule,
  Lock,
  CheckCircle,
} from "@mui/icons-material";
import { Typography, LinearProgress } from "@mui/material";
import Card from "@/components/ui/card";
import Image from "next/image";
import React from "react";

import ActionButton from "@/components/ui/button/action-button";

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
      <Card
        variant="default"
        size="md"
        padding="xl"
        borderRadius="2xl"
        className={styles.welcomeCard}
      >
        <div className={styles.welcomeContent}>
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
        </div>
      </Card>

      {/* 빠른 시작 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.quickStartCard}
      >
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
      </Card>

      {/* 최근 활동 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.activityCard}
      >
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
                    <span className={styles.activityTypeTag}>{activity.type}</span>
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
      </Card>

      {/* 오늘의 목표 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.goalCard}
      >
        <div className={styles.goalHeader}>
          <Typography variant="h6" className={styles.goalSectionTitle}>
            오늘의 목표
          </Typography>
          <div className={styles.goalCounter}>
            <span className={styles.goalCounterText}>
              {mockData.todayProgress.completed}/{mockData.todayProgress.total}
            </span>
          </div>
        </div>

        <div className={styles.goalProgressSection}>
          <div className={styles.goalProgressTrack}>
            {[...Array(mockData.todayProgress.total)].map((_, index) => (
              <div
                key={index}
                className={`${styles.goalProgressNode} ${index < mockData.todayProgress.completed ? styles.completed : styles.incomplete}`}
              >
                <div className={styles.goalProgressDot}></div>
              </div>
            ))}
          </div>
          <div className={styles.goalProgressLine}></div>
        </div>

        <div className={styles.goalsList}>
          <div className={`${styles.goalItem} ${styles.completed}`}>
            <div className={styles.goalStatus}>✓</div>
            <Typography variant="body2" className={styles.goalText}>
              히라가나 20개 문자 학습
            </Typography>
          </div>
          <div className={`${styles.goalItem} ${styles.completed}`}>
            <div className={styles.goalStatus}>✓</div>
            <Typography variant="body2" className={styles.goalText}>
              AI 회화 1회 완료
            </Typography>
          </div>
          <div className={`${styles.goalItem} ${styles.pending}`}>
            <div className={styles.goalStatus}>○</div>
            <Typography variant="body2" className={styles.goalText}>
              가타카나 15개 문자 학습
            </Typography>
          </div>
          <div className={`${styles.goalItem} ${styles.pending}`}>
            <div className={styles.goalStatus}>○</div>
            <Typography variant="body2" className={styles.goalText}>
              복습 문제 10개 풀기
            </Typography>
          </div>
        </div>
      </Card>

      {/* 오늘의 추천 */}
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.recommendationCard}
      >
        <div className={styles.cardHeader}>
          <Typography variant="h6" className={styles.cardTitle}>
            오늘의 추천
          </Typography>
          <Typography variant="body2" className={styles.cardSubtitle}>
            맞춤형 학습 추천
          </Typography>
        </div>

        <div className={styles.recommendationInnerCard}>
          <div className={styles.recommendationCenterContent}>
            <div className={styles.recommendationIcon}>
              <span className={styles.iconText}>あ</span>
            </div>
            <Typography variant="h6" className={styles.recommendationTitle}>
              히라가나 복습
            </Typography>
            <Typography variant="body2" className={styles.recommendationReason}>
              지난주에 학습한 히라가나를 다시 한번 연습해보세요
            </Typography>
            <ActionButton
              text="시작"
              variant="primary"
              hideIcon
              className={styles.recommendationButton}
            />
          </div>
        </div>
      </Card>

    </div>
  );
}

"use client";

import { Announcement, NewReleases, Update, Event, Star, Schedule } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

import { NewsList } from "@/components/news";
import { NewsItem } from "@/components/news/news-list/news-list";
import ActionButton from "@/components/ui/button/action-button";

import styles from "./page.module.css";

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "히라가나 & 가타카나 학습 서비스 정식 출시!",
    content:
      "드디어 기다리던 히라가나와 가타카나 학습 서비스가 정식으로 출시되었습니다. 46개 문자를 체계적으로 학습하고, 실시간 필기 인식으로 정확한 쓰기 연습을 해보세요!",
    date: "2024년 3월 15일",
    category: "서비스 오픈",
    type: "release",
    priority: "high",
    isRead: false,
    icon: NewReleases,
    color: "#22c55e",
    image: "/news/sumbnail.png",
    features: [
      "46개 히라가나 문자 완벽 학습",
      "46개 가타카나 문자 마스터",
      "실시간 필기 인식 기능",
      "단계별 진도 관리",
      "음성 발음 가이드",
    ],
  },
  {
    id: 2,
    title: "한자 학습 서비스 4월 출시 예정",
    content:
      "일본에서 자주 사용되는 기초 한자 100개부터 시작하여 점진적으로 확장될 예정입니다. 한자의 의미, 읽기, 쓰기를 종합적으로 학습할 수 있습니다.",
    date: "2024년 3월 12일",
    category: "출시 예정",
    type: "upcoming",
    priority: "medium",
    isRead: false,
    icon: Schedule,
    color: "#f59e0b",
    image: "/news/sumbnail.png",
    features: [
      "기초 한자 100개 학습",
      "음독, 훈독 발음 학습",
      "한자 구성 요소 분석",
      "실생활 예문 제공",
    ],
  },
  {
    id: 3,
    title: "AI 회화 기능 베타 테스트 시작",
    content:
      "실제 일본어 대화 상황을 시뮬레이션할 수 있는 AI 회화 기능의 베타 테스트가 시작되었습니다. 다양한 상황별 대화를 연습해보세요!",
    date: "2024년 3월 10일",
    category: "베타 테스트",
    type: "beta",
    priority: "medium",
    isRead: true,
    icon: Announcement,
    color: "#8b5cf6",
    image: "/news/sumbnail.png",
    features: [
      "실시간 AI 대화 연습",
      "상황별 대화 시나리오",
      "발음 평가 및 피드백",
      "개인 맞춤 학습 추천",
    ],
  },
  {
    id: 4,
    title: "학습 진도 추적 시스템 업데이트",
    content:
      "더욱 상세한 학습 진도를 확인할 수 있도록 대시보드가 개선되었습니다. 일별, 주별, 월별 학습 통계를 한눈에 확인하세요!",
    date: "2024년 3월 8일",
    category: "시스템 업데이트",
    type: "update",
    priority: "low",
    isRead: true,
    icon: Update,
    color: "#3b82f6",
    image: "/news/sumbnail.png",
    features: ["상세 학습 통계 제공", "진도 달성률 시각화", "학습 패턴 분석", "목표 설정 및 관리"],
  },
  {
    id: 5,
    title: "신규 사용자 이벤트 - 7일 연속 학습 챌린지!",
    content:
      "새로 가입한 사용자를 위한 특별 이벤트입니다. 7일 연속 학습을 완료하면 특별 배지와 함께 프리미엄 기능을 1주일 무료로 체험할 수 있습니다!",
    date: "2024년 3월 5일",
    category: "이벤트",
    type: "event",
    priority: "medium",
    isRead: false,
    icon: Event,
    color: "#ef4444",
    image: "/news/sumbnail.png",
    features: [
      "7일 연속 학습 챌린지",
      "특별 배지 획득",
      "프리미엄 기능 1주일 무료",
      "추가 경험치 보너스",
    ],
  },
];

export default function NewsPage() {
  const [news, setNews] = useState(newsData);

  const unreadCount = news.filter((item) => !item.isRead).length;
  const totalCount = news.length;

  const handleMarkAsRead = (newsId: number) => {
    setNews((prevNews) =>
      prevNews.map((item) => (item.id === newsId ? { ...item, isRead: true } : item))
    );
  };

  const handleMarkAllAsRead = () => {
    setNews((prevNews) => prevNews.map((item) => ({ ...item, isRead: true })));
  };

  const handleDeleteNews = (newsId: number) => {
    setNews((prevNews) => prevNews.filter((item) => item.id !== newsId));
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          새소식
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          코코로 브릿지의 최신 소식을 확인하세요
        </Typography>
      </div>

      {/* 통계 카드 */}
      <Card className={`${styles.card} ${styles.statsCard}`}>
        <CardContent>
          <div className={styles.statsContent}>
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <Typography variant="h3" className={styles.statNumber}>
                  {unreadCount}
                </Typography>
                <Typography variant="caption" className={styles.statLabel}>
                  읽지 않은 소식
                </Typography>
              </div>
              <div className={styles.statItem}>
                <Typography variant="h3" className={styles.statNumber}>
                  {totalCount}
                </Typography>
                <Typography variant="caption" className={styles.statLabel}>
                  전체 소식
                </Typography>
              </div>
            </div>
            <div className={styles.actionSection}>
              {unreadCount > 0 && (
                <ActionButton
                  text="모두 읽기"
                  variant="primary"
                  iconType="check"
                  onClick={handleMarkAllAsRead}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 새소식 목록 */}
      <NewsList news={news} onMarkAsRead={handleMarkAsRead} onDeleteNews={handleDeleteNews} />
    </div>
  );
}

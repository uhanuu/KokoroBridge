"use client";

import { Typography } from "@mui/material";
import React, { useState } from "react";

import { NewsList } from "@/components/news";
import ActionButton from "@/components/ui/button/action-button";
import Card from "@/components/ui/card";
import { newsData } from "@/mock/news-mock";

import styles from "./page.module.css";

export default function NewsPage() {
  const [news, setNews] = useState(newsData);

  const unreadCount = news.filter((item) => !item.isRead).length;
  const readCount = news.filter((item) => item.isRead).length;
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

  const handleDeleteAllRead = () => {
    setNews((prevNews) => prevNews.filter((item) => !item.isRead));
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
      <Card
        variant="default"
        size="lg"
        padding="xl"
        borderRadius="2xl"
        className={styles.statsCard}
      >
        <div className={styles.statsContent}>
          <div className={styles.statsRow}>
            <div className={styles.statsSection}>
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
            <div className={styles.buttonGroup}>
              <ActionButton
                text="모두 읽기"
                variant="primary"
                iconType="check"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                className={styles.readAllButton}
              />
              <ActionButton
                text="읽은글 삭제"
                variant="danger"
                iconType="delete"
                onClick={handleDeleteAllRead}
                disabled={readCount === 0}
                className={styles.deleteButton}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* 새소식 목록 */}
      <NewsList news={news} onMarkAsRead={handleMarkAsRead} onDeleteNews={handleDeleteNews} />
    </div>
  );
}

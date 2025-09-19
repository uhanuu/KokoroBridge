"use client";

import {
  AccessTime,
  Delete
} from "@mui/icons-material";
import { Typography, Chip, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

import ActionButton from "@/components/ui/button/action-button";
import Card from "@/components/ui/card";

import styles from "./news-card.module.css";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  type: "release" | "upcoming" | "beta" | "update" | "event";
  priority: "high" | "medium" | "low";
  isRead: boolean;
  icon: React.ComponentType<any>;
  color: string;
  image?: string;
  features: string[];
}

interface NewsCardProps {
  news: NewsItem;
  onMarkAsRead: (newsId: number) => void;
  onDeleteNews: (newsId: number) => void;
}

const priorityLabels = {
  high: "중요",
  medium: "보통",
  low: "일반"
};

const priorityColors = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280"
};

export default function NewsCard({ news, onMarkAsRead, onDeleteNews }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    onDeleteNews(news.id);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    // 펼칠 때 자동으로 읽음 처리
    if (!isExpanded && !news.isRead) {
      onMarkAsRead(news.id);
    }
  };

  const getPriorityColor = () => {
    return priorityColors[news.priority];
  };

  return (
    <Card
      variant="default"
      size="lg"
      padding="xl"
      borderRadius="2xl"
      className={`${styles.newsCard} ${!news.isRead ? styles.unread : styles.read} ${styles.clickableCard}`}
      onClick={handleToggleExpand}
    >
        {/* 카드 헤더 */}
        <div className={styles.cardHeader}>
          <div className={styles.categorySection}>
            <Chip
              label={news.category}
              size="small"
              className={styles.categoryChip}
              style={{
                backgroundColor: `${news.color}20`,
                color: news.color,
                borderColor: news.color
              }}
            />
            <Chip
              label={priorityLabels[news.priority]}
              size="small"
              className={styles.priorityChip}
              style={{
                backgroundColor: `${getPriorityColor()}20`,
                color: getPriorityColor()
              }}
            />
          </div>
          <div className={styles.actions}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className={styles.deleteButton}
              size="small"
            >
              <Delete className={styles.deleteIcon} />
            </IconButton>
          </div>
        </div>

        {/* 제목과 아이콘 */}
        <div className={styles.titleSection}>
          <div
            className={styles.newsIcon}
            style={{ backgroundColor: `${news.color}20` }}
          >
            <news.icon style={{ color: news.color }} />
          </div>
          <div className={styles.titleContent}>
            <Typography variant="h6" className={styles.title}>
              {news.title}
            </Typography>
            <div className={styles.metaInfo}>
              <AccessTime className={styles.timeIcon} />
              <Typography variant="caption" className={styles.date}>
                {news.date}
              </Typography>
            </div>
          </div>
        </div>

        {/* 접힌 상태에서 보이는 짧은 내용 */}
        {!isExpanded && (
          <>
            <Typography variant="body2" className={styles.previewContent}>
              {news.content.length > 100 ? `${news.content.substring(0, 100)}...` : news.content}
            </Typography>
            {/* 읽지않은 카드에만 미묘한 더보기 힌트 */}
            {!news.isRead && news.content.length > 100 && (
              <div className={styles.moreHint}>
                <div className={styles.expandIndicator}>
                  <span className={styles.dots}>⋯</span>
                </div>
                <Typography variant="caption" className={styles.hoverHint}>
                  클릭하여 자세히 보기
                </Typography>
              </div>
            )}
          </>
        )}

        {/* 펼쳐진 상태에서 보이는 전체 내용 */}
        {isExpanded && (
          <>
            {/* 이미지 (있을 경우) */}
            {news.image && (
              <div className={styles.imageContainer}>
                <Image
                  src={news.image}
                  alt={news.title}
                  width={400}
                  height={200}
                  className={styles.newsImage}
                />
              </div>
            )}

            {/* 전체 내용 */}
            <Typography variant="body2" className={styles.content}>
              {news.content}
            </Typography>

            {/* 주요 기능 리스트 */}
            {news.features && news.features.length > 0 && (
              <div className={styles.featuresSection}>
                <Typography variant="subtitle2" className={styles.featuresTitle}>
                  주요 기능
                </Typography>
                <ul className={styles.featuresList}>
                  {news.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.featureBullet}>•</span>
                      <Typography variant="body2" className={styles.featureText}>
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 액션 버튼들 */}
            <div className={styles.actionSection} onClick={(e) => e.stopPropagation()}>
              {/* 참여형 버튼들 */}
              {news.type === "release" && (
                <ActionButton
                  text="체험해보기"
                  variant="primary"
                  iconType="play"
                  onClick={() => {}}
                />
              )}
              {news.type === "upcoming" && (
                <ActionButton
                  text="알림 설정"
                  variant="primary"
                  iconType="notifications"
                  onClick={() => {}}
                />
              )}
              {news.type === "beta" && (
                <ActionButton
                  text="베타 참여"
                  variant="primary"
                  iconType="science"
                  onClick={() => {}}
                />
              )}
              {news.type === "event" && (
                <ActionButton
                  text="이벤트 참여"
                  variant="primary"
                  iconType="event"
                  onClick={() => {}}
                />
              )}
              {/* update 타입은 글만 읽기이므로 버튼 비활성화 */}
              {news.type === "update" && (
                <ActionButton
                  text="확인됨"
                  variant="completed"
                  iconType="check"
                  disabled={true}
                  onClick={() => {}}
                />
              )}
            </div>
          </>
        )}
    </Card>
  );
}
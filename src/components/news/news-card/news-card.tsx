"use client";

import {
  AccessTime,
  Visibility,
  VisibilityOff,
  Delete
} from "@mui/icons-material";
import { Card, CardContent, Typography, Chip, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";

import ActionButton from "@/components/ui/button/action-button";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { useConfirm } from "@/hooks/useConfirm";

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
  const { confirmProps, hideConfirm, confirm } = useConfirm();

  const handleToggleRead = () => {
    if (!news.isRead) {
      onMarkAsRead(news.id);
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "소식 삭제",
      message: "이 소식을 삭제하시겠습니까?\n삭제된 소식은 복구할 수 없습니다.",
      type: "error",
      confirmText: "삭제하기",
      cancelText: "취소",
      mascotImage: "/home-character.png"
    });

    if (confirmed) {
      onDeleteNews(news.id);
    }
  };

  const getPriorityColor = () => {
    return priorityColors[news.priority];
  };

  return (
    <Card className={`${styles.card} ${styles.newsCard} ${!news.isRead ? styles.unread : styles.read}`}>
      <CardContent className={styles.cardContent}>
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
              onClick={handleToggleRead}
              className={styles.readButton}
              size="small"
            >
              {news.isRead ? (
                <Visibility className={styles.readIcon} />
              ) : (
                <VisibilityOff className={styles.unreadIcon} />
              )}
            </IconButton>
            <IconButton
              onClick={handleDelete}
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
              {!news.isRead && (
                <div className={styles.unreadBadge}>
                  NEW
                </div>
              )}
            </div>
          </div>
        </div>

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

        {/* 내용 */}
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

        {/* 액션 버튼 */}
        <div className={styles.actionSection}>
          {news.type === "release" && (
            <ActionButton
              text="체험해보기"
              variant="primary"
              onClick={() => {}}
            />
          )}
          {news.type === "upcoming" && (
            <ActionButton
              text="알림 설정"
              variant="primary"
              onClick={() => {}}
            />
          )}
          {news.type === "beta" && (
            <ActionButton
              text="베타 참여"
              variant="primary"
              onClick={() => {}}
            />
          )}
          {news.type === "update" && (
            <ActionButton
              text="확인하기"
              variant="primary"
              onClick={() => {}}
            />
          )}
          {news.type === "event" && (
            <ActionButton
              text="이벤트 참여"
              variant="primary"
              onClick={() => {}}
            />
          )}
        </div>
      </CardContent>

      {/* 확인 다이얼로그 */}
      <ConfirmDialog
        {...confirmProps}
        onClose={hideConfirm}
      />
    </Card>
  );
}
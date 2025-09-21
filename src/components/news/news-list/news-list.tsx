"use client";

import { Typography } from "@mui/material";
import React, { useState, useMemo } from "react";

import ConfirmDialog from "@/components/ui/confirm-dialog";
import DropdownButton from "@/components/ui/dropdown-button";
import { useConfirm } from "@/hooks/useConfirm";

import NewsCard from "../news-card/news-card";

import styles from "./news-list.module.css";

type NewsItemType = "release" | "upcoming" | "beta" | "update" | "event";

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  type: NewsItemType;
  priority: "high" | "medium" | "low";
  isRead: boolean;
  icon: React.ComponentType<any>;
  color: string;
  image?: string;
  features: string[];
}

interface NewsListProps {
  news: NewsItem[];
  onMarkAsRead: (newsId: number) => void;
  onDeleteNews: (newsId: number) => void;
}

type FilterType = "all" | "unread" | "read";
type SortType = "latest" | "oldest" | "priority";

const filterOptions = [
  { value: "all", label: "전체" },
  { value: "unread", label: "읽지 않음" },
  { value: "read", label: "읽음" }
];

const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
  { value: "priority", label: "중요도순" }
];


export default function NewsList({ news, onMarkAsRead, onDeleteNews }: NewsListProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("latest");
  const { confirmProps, hideConfirm, confirm } = useConfirm();

  const filteredAndSortedNews = useMemo(() => {
    let filtered = [...news];

    // 필터링
    if (filter === "unread") {
      filtered = filtered.filter((item) => !item.isRead);
    } else if (filter === "read") {
      filtered = filtered.filter((item) => item.isRead);
    }

    // 정렬
    filtered.sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sort === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sort === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    return filtered;
  }, [news, filter, sort]);


  const unreadCount = news.filter((item) => !item.isRead).length;

  const handleDeleteNews = async (newsId: number) => {
    const confirmed = await confirm({
      title: "소식 삭제",
      message: "삭제된 소식은 복구할 수 없습니다.\n그럼에도 삭제하시겠습니까?",
      type: "error",
      confirmText: "삭제하기",
      cancelText: "취소",
      mascotImage: "/warning-character.png",
    });

    if (confirmed) {
      onDeleteNews(newsId);
    }
  };

  return (
    <div className={styles.container}>
      {/* 헤더와 필터 */}
      <div className={styles.listHeader}>
        <div className={styles.headerInfo}>
          <Typography variant="h6" className={styles.sectionTitle}>
            소식 목록
          </Typography>
          <Typography variant="body2" className={styles.sectionSubtitle}>
            {filteredAndSortedNews.length}개의 소식
            {unreadCount > 0 && ` (읽지 않음 ${unreadCount}개)`}
          </Typography>
        </div>

        <div className={styles.filterControls}>
          <DropdownButton
            label="필터"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"></polygon>
              </svg>
            }
            options={filterOptions}
            value={filter}
            onChange={(value) => setFilter(value as FilterType)}
          />
          <DropdownButton
            label="정렬"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 16 4 4 4-4"></path>
                <path d="M7 20V4"></path>
                <path d="m21 8-4-4-4 4"></path>
                <path d="M17 4v16"></path>
              </svg>
            }
            options={sortOptions}
            value={sort}
            onChange={(value) => setSort(value as SortType)}
          />
        </div>
      </div>

      {/* 새소식 카드 목록 */}
      <div className={styles.newsList}>
        {filteredAndSortedNews.length > 0 ? (
          filteredAndSortedNews.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              news={newsItem}
              onMarkAsRead={onMarkAsRead}
              onDeleteNews={handleDeleteNews}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <Typography variant="h6" className={styles.emptyTitle}>
              표시할 소식이 없습니다
            </Typography>
            <Typography variant="body2" className={styles.emptyMessage}>
              선택한 필터 조건에 해당하는 소식이 없습니다.
            </Typography>
          </div>
        )}
      </div>

      {/* 확인 다이얼로그 */}
      <ConfirmDialog {...confirmProps} onClose={hideConfirm} />
    </div>
  );
}

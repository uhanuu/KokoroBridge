"use client";

import { FilterList, Sort } from "@mui/icons-material";
import { Typography, Chip, Menu, MenuItem } from "@mui/material";
import React, { useState, useMemo } from "react";

import ConfirmDialog from "@/components/ui/confirm-dialog";
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

const filterLabels = {
  all: "전체",
  unread: "읽지 않음",
  read: "읽음",
};

const sortLabels = {
  latest: "최신순",
  oldest: "오래된순",
  priority: "중요도순",
};

export default function NewsList({ news, onMarkAsRead, onDeleteNews }: NewsListProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("latest");
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
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

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleSortClose = () => {
    setSortAnchor(null);
  };

  const handleFilterSelect = (selectedFilter: FilterType) => {
    setFilter(selectedFilter);
    handleFilterClose();
  };

  const handleSortSelect = (selectedSort: SortType) => {
    setSort(selectedSort);
    handleSortClose();
  };

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
      {/* 필터 및 정렬 헤더 */}
      <div className={styles.controlsHeader}>
        <div className={styles.headerInfo}>
          <Typography variant="h6" className={styles.sectionTitle}>
            소식 목록
          </Typography>
          <Typography variant="body2" className={styles.sectionSubtitle}>
            {filteredAndSortedNews.length}개의 소식
            {unreadCount > 0 && ` (읽지 않음 ${unreadCount}개)`}
          </Typography>
        </div>

        <div className={styles.controlsCompact}>
          <Chip
            icon={<FilterList />}
            label={filterLabels[filter]}
            onClick={handleFilterClick}
            className={styles.filterChip}
            variant={filter !== "all" ? "filled" : "outlined"}
          />
          <Chip
            icon={<Sort />}
            label={sortLabels[sort]}
            onClick={handleSortClick}
            className={styles.sortChip}
            variant="outlined"
          />
        </div>
      </div>

      {/* 필터 메뉴 */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            className: styles.menuPaper,
          }
        }}
      >
        {Object.entries(filterLabels).map(([key, label]) => (
          <MenuItem
            key={key}
            onClick={() => handleFilterSelect(key as FilterType)}
            selected={filter === key}
            className={styles.menuItem}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>

      {/* 정렬 메뉴 */}
      <Menu
        anchorEl={sortAnchor}
        open={Boolean(sortAnchor)}
        onClose={handleSortClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            className: styles.menuPaper,
          }
        }}
      >
        {Object.entries(sortLabels).map(([key, label]) => (
          <MenuItem
            key={key}
            onClick={() => handleSortSelect(key as SortType)}
            selected={sort === key}
            className={styles.menuItem}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>

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

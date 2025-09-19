"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";

import Card from "@/components/ui/card";
import styles from "./monthly-progress.module.css";

interface MonthlyData {
  year: number;
  month: number;
  monthName: string;
  hours: number;
  lessons: number;
  streak: number;
  averageScore: number;
}

interface MonthlyProgressProps {
  monthlyData: MonthlyData[];
}

export default function MonthlyProgress({ monthlyData }: MonthlyProgressProps) {
  const [currentIndex, setCurrentIndex] = useState(Math.max(0, monthlyData.length - 3));
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(monthlyData.length - 3, currentIndex + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!isDragging || !container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    const touch = e.touches[0];
    if (!container || !touch) return;
    setIsDragging(true);
    setStartX(touch.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    const touch = e.touches[0];
    if (!isDragging || !container || !touch) return;
    const x = touch.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 180; // 작은 카드 크기에 맞춰 조정
      container.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const getAchievementLevel = (score: number) => {
    if (score >= 95) return { text: "Perfect", color: "#22c55e" };
    if (score >= 90) return { text: "Excellent", color: "#3b82f6" };
    if (score >= 80) return { text: "Great", color: "#f59e0b" };
    if (score >= 70) return { text: "Good", color: "#8b5cf6" };
    return { text: "Keep Going", color: "#6b7280" };
  };

  return (
    <Card
      variant="default"
      size="lg"
      padding="xl"
      borderRadius="2xl"
      className={styles.monthlyCard}
    >
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <Typography variant="h6" className={styles.title}>
              월별 학습 현황
            </Typography>
            <Typography variant="body2" className={styles.subtitle}>
              매월 성과를 확인하세요
            </Typography>
          </div>
          <div className={styles.navigation}>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`${styles.navButton} ${currentIndex === 0 ? styles.disabled : ""}`}
              aria-label="이전 월"
            >
              <ChevronLeft />
            </button>
            <span className={styles.monthIndicator}>
              {currentIndex + 1} / {monthlyData.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex >= monthlyData.length - 3}
              className={`${styles.navButton} ${
                currentIndex >= monthlyData.length - 3 ? styles.disabled : ""
              }`}
              aria-label="다음 월"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.monthlyContainer}>
          <div
            ref={scrollContainerRef}
            className={styles.monthlyScroll}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
            role="region"
            aria-label="월별 진행 현황"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {monthlyData.map((data, _index) => {
              const achievement = getAchievementLevel(data.averageScore);

              return (
                <div key={`${data.year}-${data.month}`} className={styles.monthlyItem}>
                  <div className={styles.monthHeader}>
                    <div className={styles.monthBadge}>
                      {data.monthName}
                    </div>
                    <Typography variant="h6" className={styles.monthTitle}>
                      {data.year}년 {data.month}월
                    </Typography>
                    <Typography variant="caption" className={styles.yearText}>
                      총 {data.hours}시간 학습
                    </Typography>
                  </div>

                  <div className={styles.quickStats}>
                    <div className={styles.quickStat}>
                      <Typography variant="h6" className={styles.quickStatNumber}>
                        {data.lessons}
                      </Typography>
                      <Typography variant="caption" className={styles.quickStatLabel}>
                        레슨 완료
                      </Typography>
                    </div>
                    <div className={styles.quickStat}>
                      <Typography variant="h6" className={styles.quickStatNumber}>
                        {data.streak}일
                      </Typography>
                      <Typography variant="caption" className={styles.quickStatLabel}>
                        연속 학습
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.achievementSection}>
                    <div className={styles.progressRing}>
                      <div
                        className={styles.progressCircle}
                        style={{
                          background: `conic-gradient(${achievement.color} ${
                            (data.averageScore / 100) * 360
                          }deg, var(--outline) 0deg)`,
                        }}
                      >
                        <div className={styles.progressInner}>
                          <Typography variant="body2" className={styles.progressText}>
                            {data.averageScore}%
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Typography variant="body2" className={styles.achievementText}>
                      평균 성취도
                    </Typography>
                    {data.averageScore >= 80 && (
                      <div
                        className={styles.achievementBadge}
                        style={{ background: `linear-gradient(135deg, ${achievement.color}, ${achievement.color}CC)` }}
                      >
                        {achievement.text}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </Card>
  );
}
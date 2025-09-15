"use client";

import { ChevronLeft, ChevronRight, TrendingUp, Book, Whatshot, Star } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(monthlyData.length - 3, currentIndex + 1));
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 280; // 카드 너비 + gap
      container.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const visibleData = monthlyData.slice(currentIndex, currentIndex + 3);

  return (
    <Card className={styles.monthlyCard}>
      <CardContent>
        <div className={styles.header}>
          <Typography variant="h6" className={styles.title}>
            월별 진행 현황
          </Typography>
          <div className={styles.navigation}>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`${styles.navButton} ${currentIndex === 0 ? styles.disabled : ""}`}
            >
              <ChevronLeft />
            </button>
            <span className={styles.monthIndicator}>
              {Math.floor(currentIndex / 3) + 1} / {Math.ceil(monthlyData.length / 3)}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex >= monthlyData.length - 3}
              className={`${styles.navButton} ${
                currentIndex >= monthlyData.length - 3 ? styles.disabled : ""
              }`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.monthlyContainer}>
          <div ref={scrollContainerRef} className={styles.monthlyScroll}>
            {monthlyData.map((data, index) => (
              <div key={`${data.year}-${data.month}`} className={styles.monthlyItem}>
                <div className={styles.monthHeader}>
                  <Typography variant="h6" className={styles.monthTitle}>
                    {data.monthName}
                  </Typography>
                  <Typography variant="caption" className={styles.yearText}>
                    {data.year}년
                  </Typography>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <TrendingUp className={styles.icon} />
                    </div>
                    <div className={styles.statContent}>
                      <Typography variant="h5" className={styles.statNumber}>
                        {data.hours}
                      </Typography>
                      <Typography variant="caption" className={styles.statLabel}>
                        학습 시간
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <Book className={styles.icon} />
                    </div>
                    <div className={styles.statContent}>
                      <Typography variant="h5" className={styles.statNumber}>
                        {data.lessons}
                      </Typography>
                      <Typography variant="caption" className={styles.statLabel}>
                        완료 레슨
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <Whatshot className={styles.icon} />
                    </div>
                    <div className={styles.statContent}>
                      <Typography variant="h5" className={styles.statNumber}>
                        {data.streak}
                      </Typography>
                      <Typography variant="caption" className={styles.statLabel}>
                        연속 학습
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <Star className={styles.icon} />
                    </div>
                    <div className={styles.statContent}>
                      <Typography variant="h5" className={styles.statNumber}>
                        {data.averageScore}
                      </Typography>
                      <Typography variant="caption" className={styles.statLabel}>
                        평균 점수
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className={styles.monthSummary}>
                  <div className={styles.progressRing}>
                    <div
                      className={styles.progressCircle}
                      style={{
                        background: `conic-gradient(#22c55e ${
                          (data.averageScore / 100) * 360
                        }deg, #374151 0deg)`,
                      }}
                    >
                      <div className={styles.progressInner}>
                        <Typography variant="body2" className={styles.progressText}>
                          {data.averageScore}%
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <Typography variant="body2" className={styles.summaryText}>
                    월 평균 성취도
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Lock, TouchApp } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect, useCallback } from "react";

import ActionButton from "@/components/ui/button/action-button";
import { studyGroups } from "@/mock/study-mock";

import styles from "./page.module.css";


export default function StudyPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartButtonClick = (category: typeof studyGroups[0]['categories'][0], e: React.MouseEvent) => {
    e.stopPropagation();
    if (category.isLocked || isDragging) return;
    router.push(category.route);
  };

  const handleCategoryClick = (categoryId: number) => {
    if (isDragging) return;
    setSelectedCategory(categoryId);
    // 0.3초 후에 선택 해제 (시각적 피드백용)
    setTimeout(() => {
      setSelectedCategory(null);
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    snapToCard();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX((e.touches[0]?.pageX || 0) - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = (e.touches[0]?.pageX || 0) - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    snapToCard();
  };

  const updateCurrentIndex = useCallback(() => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.clientWidth * 0.85;
    const currentScroll = containerRef.current.scrollLeft;
    const newIndex = Math.round(currentScroll / cardWidth);
    const clampedIndex = Math.max(0, Math.min(newIndex, studyGroups.length - 1));
    setCurrentIndex(clampedIndex);
  }, []);

  const snapToCard = () => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.clientWidth * 0.85;
    const currentScroll = containerRef.current.scrollLeft;
    const newIndex = Math.round(currentScroll / cardWidth);
    const clampedIndex = Math.max(0, Math.min(newIndex, studyGroups.length - 1));
    setCurrentIndex(clampedIndex);

    containerRef.current.scrollTo({
      left: clampedIndex * cardWidth,
      behavior: 'smooth'
    });
  };

  const goToCard = (index: number) => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.clientWidth * 0.85;
    setCurrentIndex(index);
    containerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };


  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const cardWidth = containerRef.current.clientWidth * 0.85;
        containerRef.current.scrollLeft = currentIndex * cardWidth;
      }
    };

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      // 이전 타임아웃 클리어
      clearTimeout(scrollTimeout);
      // 스크롤이 끝난 후 50ms 후에 인덱스 업데이트
      scrollTimeout = setTimeout(() => {
        updateCurrentIndex();
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(scrollTimeout);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCurrentIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>학습하기</h1>
        <div className={styles.swipeHint}>
          <TouchApp className={styles.swipeIcon} />
          <span className={styles.swipeText}>좌우로 스와이프하여 학습 영역을 탐색해보세요</span>
        </div>
        <div className={styles.groupTitleContainer}>
          <h2 className={styles.currentGroupTitle}>
            {studyGroups[currentIndex]?.title}
          </h2>
        </div>
      </div>

      <div className={styles.swipeContainer}>

        {/* 카드 컨테이너 */}
        <div
          ref={containerRef}
          className={styles.cardsContainer}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {studyGroups.map((group) => (
            <div
              key={group.id}
              className={`${styles.groupCard} ${group.isComingSoon ? styles.comingSoon : ''} ${
                group.categories.some(cat => cat.id === selectedCategory) ? styles.activeGroup : ''
              }`}
            >
              <div className={styles.cardContent}>
                <div className={styles.categoriesGrid}>
                {group.categories.map((category) => (
                  <div
                    key={category.id}
                    className={`${styles.categoryItem} ${
                      category.isLocked ? styles.locked : ""
                    } ${
                      selectedCategory === category.id ? styles.selected : ""
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.isLocked && <div className={styles.lockOverlay} />}
                    <div className={styles.categoryHeader}>
                      <div
                        className={styles.categoryIcon}
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        {typeof category.icon === "string" ? (
                          <span
                            className={styles.iconText}
                            style={{ color: category.color, opacity: category.isLocked ? 0.3 : 1 }}
                          >
                            {category.icon}
                          </span>
                        ) : (
                          <category.icon
                            style={{ color: category.color, opacity: category.isLocked ? 0.3 : 1 }}
                          />
                        )}
                        {category.isLocked && (
                          <div className={styles.lockIconOverlay}>
                            <Lock className={styles.lockIcon} />
                          </div>
                        )}
                      </div>
                      <div className={styles.categoryInfo}>
                        <h3 className={styles.categoryTitle}>{category.title}</h3>
                        <span className={styles.categorySubtitle}>{category.subtitle}</span>
                      </div>
                    </div>

                    <p className={styles.categoryDescription}>
                      {category.isLocked ? "곧 출시 예정" : category.description}
                    </p>

                    {!category.isLocked && (
                      <div className={styles.progressSection}>
                        <div className={styles.progressHeader}>
                          <span className={styles.progressLabel}>학습 진행도</span>
                          <span className={styles.progressStats}>
                            {category.completedCharacters}/{category.totalCharacters} ({category.progress}%)
                          </span>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          value={category.progress}
                          className={styles.progressBar}
                          sx={{
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: category.color,
                            },
                          }}
                        />
                      </div>
                    )}

                    <ActionButton
                      text={category.isLocked ? "잠금됨" : "시작하기"}
                      variant={category.isLocked ? "locked" : "primary"}
                      disabled={category.isLocked}
                      onClick={(e) => e && handleStartButtonClick(category, e)}
                    />
                  </div>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.indicators}>
            {studyGroups.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
                onClick={() => goToCard(index)}
                aria-label={`${index + 1}번째 학습 그룹으로 이동`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
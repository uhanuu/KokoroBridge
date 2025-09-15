"use client";

import { ArrowBack, ArrowForward, TouchApp } from "@mui/icons-material";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useCallback, useEffect } from "react";

import ActionButton from "@/components/ui/button/action-button";

import styles from "./group-selector.module.css";

interface GroupData {
  id: number;
  name: string;
  romaji: string;
  characters: string[];
  color: string;
  route: string;
}

interface GroupSelectorProps {
  groups: GroupData[];
  title: string;
  subtitle: string;
  onBack: () => void;
}

export default function GroupSelector({ groups, title, subtitle, onBack }: GroupSelectorProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < groups.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, groups.length]);

  const handleGroupClick = useCallback((group: GroupData) => {
    router.push(group.route);
  }, [router]);

  // 터치/마우스 이벤트 핸들러
  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const threshold = 50; // 스와이프 임계값

    if (deltaX > threshold && currentIndex > 0) {
      handlePrevious();
    } else if (deltaX < -threshold && currentIndex < groups.length - 1) {
      handleNext();
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  }, [isDragging, currentX, startX, currentIndex, groups.length, handlePrevious, handleNext]);

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // 키보드 네비게이션
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  }, [handlePrevious, handleNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 드래그 중일 때의 transform 값 계산
  const getTransform = () => {
    if (isDragging) {
      const deltaX = currentX - startX;
      return `translateX(${deltaX}px)`;
    }
    return "translateX(0)";
  };

  const currentGroup = groups[currentIndex];

  // 유효성 검사
  if (!currentGroup || groups.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <Typography variant="h6">유효하지 않은 그룹 데이터입니다.</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <IconButton onClick={onBack} className={styles.backButton}>
            <ArrowBack />
          </IconButton>
          <div className={styles.headerContent}>
            <Typography variant="h4" className={styles.title}>
              {title}
            </Typography>
            <Typography variant="body1" className={styles.subtitle}>
              {subtitle}
            </Typography>
          </div>
        </div>
      </div>

      {/* 스와이프 안내 */}
      <div className={styles.swipeHint}>
        <TouchApp className={styles.swipeIcon} />
        <Typography variant="body2" className={styles.swipeText}>
          좌우로 스와이프하여 그룹을 선택하세요
        </Typography>
      </div>

      {/* 그룹 카드 영역 */}
      <div className={styles.cardContainer}>
        <Card
          className={`${styles.card} ${styles.groupCard}`}
          ref={containerRef}
          style={{ transform: getTransform() }}
          onMouseDown={handleMouseDown}
          onMouseMove={isDragging ? handleMouseMove : undefined}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className={styles.groupContent}>
            <div className={styles.groupHeader}>
              <div
                className={styles.groupIcon}
                style={{ backgroundColor: `${currentGroup.color}20` }}
              >
                <span className={styles.iconText} style={{ color: currentGroup.color }}>
                  {currentGroup.characters[0]}
                </span>
              </div>
              <div className={styles.groupInfo}>
                <Typography variant="h5" className={styles.groupName}>
                  {currentGroup.name}
                </Typography>
                <Typography variant="body1" className={styles.groupRomaji}>
                  {currentGroup.romaji}
                </Typography>
              </div>
            </div>

            <div className={styles.charactersGrid}>
              {currentGroup.characters.map((char, index) => (
                <div key={index} className={styles.characterItem}>
                  <span className={styles.character}>{char}</span>
                </div>
              ))}
            </div>

            <ActionButton
              text="학습하기"
              variant="primary"
              onClick={() => handleGroupClick(currentGroup)}
              className={styles.startButton}
            />
          </CardContent>
        </Card>
      </div>

      {/* 네비게이션 컨트롤 */}
      <div className={styles.navigation}>
        <IconButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={styles.navButton}
        >
          <ArrowBack />
        </IconButton>

        {/* 인디케이터 */}
        <div className={styles.indicators}>
          {groups.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <IconButton
          onClick={handleNext}
          disabled={currentIndex === groups.length - 1}
          className={styles.navButton}
        >
          <ArrowForward />
        </IconButton>
      </div>

      {/* 그룹 리스트 (하단) */}
      <div className={styles.groupList}>
        <Typography variant="body2" className={styles.groupListTitle}>
          전체 그룹 ({currentIndex + 1}/{groups.length})
        </Typography>
        <div className={styles.groupListItems}>
          {groups.map((group, index) => (
            <button
              key={group.id}
              className={`${styles.groupListItem} ${
                index === currentIndex ? styles.activeItem : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className={styles.groupListIcon} style={{ color: group.color }}>
                {group.characters[0]}
              </span>
              <span className={styles.groupListName}>{group.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
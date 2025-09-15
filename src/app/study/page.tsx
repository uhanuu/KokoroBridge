"use client";

import { PlayArrow, School, Quiz, Headphones, Book, LocalLibrary, Translate, Psychology } from "@mui/icons-material";
import { Card, CardContent, Typography, LinearProgress, Chip, IconButton, Box, Button } from "@mui/material";
import React from "react";

import styles from "./page.module.css";

const mockData = {
  overallProgress: { completed: 45, total: 100 },
  currentLevel: "초급 2",
  studyCategories: [
    {
      id: 1,
      title: "기본 어휘",
      description: "일상생활에 필요한 기본 단어 학습",
      icon: Book,
      progress: 75,
      estimatedTime: "15분",
      isRecommended: true,
      color: "primary",
    },
    {
      id: 2,
      title: "문법 기초",
      description: "기본 문법 구조와 활용법",
      icon: Psychology,
      progress: 60,
      estimatedTime: "20분",
      isRecommended: false,
      color: "secondary",
    },
    {
      id: 3,
      title: "듣기 연습",
      description: "실제 대화를 통한 듣기 능력 향상",
      icon: Headphones,
      progress: 30,
      estimatedTime: "25분",
      isRecommended: true,
      color: "success",
    },
    {
      id: 4,
      title: "회화 표현",
      description: "상황별 실용적인 회화 표현",
      icon: Translate,
      progress: 40,
      estimatedTime: "18분",
      isRecommended: false,
      color: "warning",
    },
    {
      id: 5,
      title: "읽기 이해",
      description: "짧은 글과 문장 이해하기",
      icon: LocalLibrary,
      progress: 55,
      estimatedTime: "22분",
      isRecommended: false,
      color: "info",
    },
    {
      id: 6,
      title: "퀴즈 도전",
      description: "종합 실력 테스트 및 복습",
      icon: Quiz,
      progress: 85,
      estimatedTime: "10분",
      isRecommended: true,
      color: "error",
    },
  ],
  todayRecommendation: {
    title: "오늘의 추천 학습",
    description: "당신의 학습 패턴을 분석한 맞춤형 추천입니다",
    items: ["기본 어휘 복습", "새로운 문법 패턴", "듣기 연습"],
  },
};

export default function StudyPage() {
  const progressPercentage = (mockData.overallProgress.completed / mockData.overallProgress.total) * 100;

  const handleStartStudy = (categoryId: number) => {
    console.log(`Starting study for category ${categoryId}`);
  };

  return (
    <div className={styles.container}>
      {/* 학습 현황 개요 */}
      <Card className={`${styles.card} ${styles.overviewCard}`}>
        <CardContent>
          <Box className={styles.overviewHeader}>
            <Box>
              <Typography variant="h5" className={styles.levelText}>
                {mockData.currentLevel}
              </Typography>
              <Typography variant="body2" className={styles.progressText}>
                전체 진행률 {mockData.overallProgress.completed}%
              </Typography>
            </Box>
            <Chip
              icon={<School />}
              label="학습중"
              color="primary"
              variant="outlined"
              className={styles.statusChip}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            className={styles.overallProgressBar}
          />
        </CardContent>
      </Card>

      {/* 오늘의 추천 */}
      <Card className={`${styles.card} ${styles.recommendationCard}`}>
        <CardContent>
          <Typography variant="h6" className={styles.cardTitle}>
            {mockData.todayRecommendation.title} ✨
          </Typography>
          <Typography variant="body2" className={styles.recommendationDesc}>
            {mockData.todayRecommendation.description}
          </Typography>
          <Box className={styles.recommendationList}>
            {mockData.todayRecommendation.items.map((item, index) => (
              <Chip
                key={index}
                label={item}
                variant="outlined"
                size="small"
                className={styles.recommendationChip}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* 학습 카테고리 */}
      <div className={styles.categoriesSection}>
        <Typography variant="h6" className={styles.sectionTitle}>
          학습 카테고리
        </Typography>
        <div className={styles.categoriesGrid}>
          {mockData.studyCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className={`${styles.card} ${styles.categoryCard}`}>
                <CardContent>
                  <Box className={styles.categoryHeader}>
                    <Box className={styles.categoryInfo}>
                      <Box className={`${styles.iconWrapper} ${styles[`icon-${category.color}`]}`}>
                        <IconComponent className={styles.categoryIcon} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" className={styles.categoryTitle}>
                          {category.title}
                          {category.isRecommended && (
                            <Chip
                              label="추천"
                              size="small"
                              color="primary"
                              className={styles.recommendedBadge}
                            />
                          )}
                        </Typography>
                        <Typography variant="body2" className={styles.categoryDesc}>
                          {category.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box className={styles.categoryProgress}>
                    <Box className={styles.progressInfo}>
                      <Typography variant="caption" className={styles.progressLabel}>
                        진행률 {category.progress}%
                      </Typography>
                      <Typography variant="caption" className={styles.timeInfo}>
                        약 {category.estimatedTime}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={category.progress}
                      className={styles.categoryProgressBar}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    onClick={() => handleStartStudy(category.id)}
                    className={styles.startButton}
                    fullWidth
                  >
                    학습 시작
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

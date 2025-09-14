"use client";

import React from "react";

import styles from "./study-menu.module.css";

interface StudyOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  progress: number;
  totalItems: number;
  completedItems: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number; // 분 단위
  isLocked?: boolean;
}

interface StudyMenuProps {
  className?: string;
}

const StudyMenu: React.FC<StudyMenuProps> = ({ className }) => {
  // 임시 데이터 (나중에 props나 API로 대체)
  const studyOptions: StudyOption[] = [
    {
      id: "hiragana",
      title: "히라가나",
      subtitle: "일본어의 기본 문자",
      icon: "あ",
      progress: 75,
      totalItems: 46,
      completedItems: 34,
      difficulty: "beginner",
      estimatedTime: 15,
    },
    {
      id: "katakana",
      title: "가타카나",
      subtitle: "외래어 표기 문자",
      icon: "ア",
      progress: 60,
      totalItems: 46,
      completedItems: 28,
      difficulty: "beginner",
      estimatedTime: 15,
    },
    {
      id: "kanji",
      title: "한자",
      subtitle: "일본어 한자 학습",
      icon: "漢",
      progress: 25,
      totalItems: 100,
      completedItems: 25,
      difficulty: "intermediate",
      estimatedTime: 30,
    },
    {
      id: "conversation",
      title: "AI 대화",
      subtitle: "실전 회화 연습",
      icon: "💬",
      progress: 10,
      totalItems: 50,
      completedItems: 5,
      difficulty: "advanced",
      estimatedTime: 20,
      isLocked: true,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "#4caf50";
      case "intermediate":
        return "#ff9800";
      case "advanced":
        return "#f44336";
      default:
        return "#4caf50";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "초급";
      case "intermediate":
        return "중급";
      case "advanced":
        return "고급";
      default:
        return "초급";
    }
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h1 className={styles.title}>학습하기</h1>
        <p className={styles.subtitle}>원하는 학습 모드를 선택해주세요</p>
      </div>

      {/* 전체 진행률 */}
      <div className={styles.overallProgress}>
        <div className={styles.progressHeader}>
          <span className={styles.progressTitle}>전체 진행률</span>
          <span className={styles.progressPercentage}>42%</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "42%" }} />
        </div>
        <div className={styles.progressStats}>
          <span>92/220 완료</span>
          <span>평균 점수: 85점</span>
        </div>
      </div>

      {/* 학습 옵션 목록 */}
      <div className={styles.studyList}>
        {studyOptions.map((option) => (
          <div
            key={option.id}
            className={`${styles.studyCard} ${option.isLocked ? styles.locked : ""}`}
          >
            {/* 카드 헤더 */}
            <div className={styles.cardHeader}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{option.icon}</span>
                {option.isLocked && (
                  <div className={styles.lockOverlay}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.titleSection}>
                  <h3 className={styles.cardTitle}>{option.title}</h3>
                  <span
                    className={styles.difficulty}
                    style={{ backgroundColor: getDifficultyColor(option.difficulty) }}
                  >
                    {getDifficultyLabel(option.difficulty)}
                  </span>
                </div>
                <p className={styles.cardSubtitle}>{option.subtitle}</p>
              </div>
            </div>

            {/* 진행률 */}
            <div className={styles.cardProgress}>
              <div className={styles.progressInfo}>
                <span className={styles.progressText}>
                  {option.completedItems}/{option.totalItems} 완료
                </span>
                <span className={styles.progressPercent}>{option.progress}%</span>
              </div>
              <div className={styles.cardProgressBar}>
                <div
                  className={styles.cardProgressFill}
                  style={{
                    width: `${option.progress}%`,
                    backgroundColor: getDifficultyColor(option.difficulty),
                  }}
                />
              </div>
            </div>

            {/* 카드 푸터 */}
            <div className={styles.cardFooter}>
              <div className={styles.timeInfo}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>약 {option.estimatedTime}분</span>
              </div>

              <button
                className={`${styles.startButton} ${option.isLocked ? styles.disabled : ""}`}
                disabled={option.isLocked}
              >
                {option.isLocked ? (
                  <span>잠금됨</span>
                ) : (
                  <>
                    <span>시작하기</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polygon points="5,3 19,12 5,21" fill="currentColor" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 추천 학습 */}
      <div className={styles.recommendation}>
        <h3 className={styles.recommendationTitle}>오늘의 추천</h3>
        <div className={styles.recommendationCard}>
          <div className={styles.recommendationIcon}>🎯</div>
          <div className={styles.recommendationContent}>
            <h4>히라가나 복습</h4>
            <p>지난주에 학습한 히라가나를 다시 한번 연습해보세요</p>
          </div>
          <button className={styles.recommendationButton}>시작</button>
        </div>
      </div>
    </div>
  );
};

export default StudyMenu;

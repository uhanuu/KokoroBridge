import { studyOptions } from "@/mock/study-home-mock";
import {
  getDifficultyColor,
  getDifficultyLabel,
  getIconByLearningTitle,
} from "@/service/studyService";

import { LockIcon } from "../icons/lock-icon";
import { PlayIcon } from "../icons/play-icon";
import { TimerIcon } from "../icons/timer-icon";

import styles from "./learning-menu.module.css";

export default function LearningMenu() {
  return (
    <div className={styles.studyList}>
      {studyOptions.map((option) => (
        <div
          key={option.id}
          className={`${styles.studyCard} ${option.isLocked ? styles.locked : ""}`}
        >
          {/* 카드 헤더 */}
          <div className={styles.cardHeader}>
            <div className={styles.iconContainer}>
              <span className={styles.icon}>{getIconByLearningTitle(option.title)}</span>
              {option.isLocked && (
                <div className={styles.lockOverlay}>
                  <LockIcon size={18} />
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
              <TimerIcon />
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
                  <PlayIcon />
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

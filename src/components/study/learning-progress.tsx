import styles from "./learning-progress.module.css";

export default function LearningProgress() {
  return (
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
  );
}

import styles from "./learning-recommendation.module.css";

export default function LearningRecommendation() {
  return (
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
  );
}

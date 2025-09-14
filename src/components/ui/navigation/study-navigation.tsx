import styles from "./study-navigation.module.css";

export default function QuickStartNavigation() {
  return (
    <div className={styles.quickStartGrid}>
      <button className={styles.quickStartCard}>
        <div className={styles.quickStartIcon}>あ</div>
        <span className={styles.quickStartText}>히라가나</span>
      </button>
      <button className={styles.quickStartCard}>
        <div className={styles.quickStartIcon}>ア</div>
        <span className={styles.quickStartText}>가타카나</span>
      </button>
      <button className={styles.quickStartCard}>
        <div className={styles.quickStartIcon}>漢</div>
        <span className={styles.quickStartText}>한자</span>
      </button>
      <button className={styles.quickStartCard}>
        <div className={styles.quickStartIcon}>💬</div>
        <span className={styles.quickStartText}>AI 대화</span>
      </button>
    </div>
  );
}

import { getAllLearnTitle, getIconByLearningTitle } from "@/service/studyService";

import styles from "./study-navigation.module.css";

export default function QuickStartNavigation() {
  return (
    <div className={styles.quickStartGrid}>
      {getAllLearnTitle().map((title) => (
        <button key={title} className={styles.quickStartCard}>
          <div className={styles.quickStartIcon}>{getIconByLearningTitle(title)}</div>
          <span className={styles.quickStartText}>{title}</span>
        </button>
      ))}
    </div>
  );
}

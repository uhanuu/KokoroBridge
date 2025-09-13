import React from "react";

import styles from "@/app/page.module.css";

interface Props {
  currentIndex: number;
  total: number;
}

const ProgressBar: React.FC<Props> = ({ currentIndex, total }) => (
  <div className={styles.progressContainer}>
    <div className={styles.progressBar}>
      <div
        className={styles.progressFill}
        style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
      />
    </div>
    <span className={styles.progressText}>
      {currentIndex + 1} / {total}
    </span>
  </div>
);

export default ProgressBar;

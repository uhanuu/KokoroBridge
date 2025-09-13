import React from "react";

import styles from "@/app/page.module.css";

const Controls: React.FC = () => (
  <div className={styles.controls}>
    <button className={styles.controlButton}>지우기</button>
    <button className={`${styles.controlButton} ${styles.primaryButton}`}>확인하기</button>
  </div>
);

export default Controls;

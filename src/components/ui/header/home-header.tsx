import getTodayFormat from "@/util/date-utils";

import styles from "./home-header.module.css";

export default function HomeHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.greeting}>
        <h1 className={styles.title}>안녕하세요!</h1>
        <p className={styles.subtitle}>오늘도 일본어 학습을 시작해볼까요?</p>
      </div>
      <div className={styles.todayDate}>{getTodayFormat()}</div>
    </div>
  );
}

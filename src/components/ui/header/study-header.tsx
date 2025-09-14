import styles from "./study-header.module.css";

export default function StudyHeader() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>학습하기</h1>
      <p className={styles.subtitle}>원하는 학습 모드를 선택해주세요</p>
    </div>
  );
}

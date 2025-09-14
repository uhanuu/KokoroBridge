import styles from "./controls.module.css";

export default function Controls() {
  return (
    <div className={styles.controls}>
      <button className={styles.clear}>지우기</button>
      <button className={styles.check}>채점</button>
      <button className={styles.next}>다음</button>
    </div>
  );
}

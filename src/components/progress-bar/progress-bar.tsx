import styles from "./progress-bar.module.css";

export default function ProgressBar() {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: "40%" }} />
    </div>
  );
}

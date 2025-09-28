import styles from "./study-navigation.module.css";

export default function QuickStartNavigation() {
  const learnTitles = ["히라가나", "가타카나"];

  const getIcon = (title: string) => {
    switch (title) {
      case "히라가나": return "あ";
      case "가타카나": return "ア";
      default: return "文";
    }
  };

  return (
    <div className={styles.quickStartGrid}>
      {learnTitles.map((title) => (
        <button key={title} className={styles.quickStartCard}>
          <div className={styles.quickStartIcon}>{getIcon(title)}</div>
          <span className={styles.quickStartText}>{title}</span>
        </button>
      ))}
    </div>
  );
}

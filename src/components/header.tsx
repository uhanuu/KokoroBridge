import React from "react";

import styles from "@/app/page.module.css";

interface Props {
  currentMode: "hiragana" | "katakana";
  setCurrentMode: (mode: "hiragana" | "katakana") => void;
  showStrokeOrder: boolean;
  setShowStrokeOrder: (show: boolean) => void;
}

const Header: React.FC<Props> = ({
  currentMode,
  setCurrentMode,
  showStrokeOrder,
  setShowStrokeOrder,
}) => (
  <div className={styles.header}>
    <button className={styles.backButton}>←</button>
    <div className={styles.modeToggle}>
      <button
        className={`${styles.modeButton} ${currentMode === "hiragana" ? styles.active : ""}`}
        onClick={() => setCurrentMode("hiragana")}
      >
        히라가나
      </button>
      <button
        className={`${styles.modeButton} ${currentMode === "katakana" ? styles.active : ""}`}
        onClick={() => setCurrentMode("katakana")}
      >
        가타카나
      </button>
    </div>
    <button
      className={styles.strokeOrderButton}
      onClick={() => setShowStrokeOrder(!showStrokeOrder)}
    >
      획순
    </button>
  </div>
);

export default Header;

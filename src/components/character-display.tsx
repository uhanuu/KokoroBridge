import React from "react";

import styles from "@/app/page.module.css";

interface Props {
  currentKana: KanaData;
}

const CharacterDisplay: React.FC<Props> = ({ currentKana }) => (
  <div className={styles.characterSection}>
    <div className={styles.characterDisplay}>
      <span className={styles.character}>{currentKana.char}</span>
      <span className={styles.romaji}>{currentKana.romaji}</span>
    </div>
  </div>
);

export default CharacterDisplay;

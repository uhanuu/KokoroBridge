import React from "react";

import styles from "@/app/page.module.css";

interface Props {
  currentIndex: number;
  total: number;
  setCurrentIndex: (index: number) => void;
}

const Navigation: React.FC<Props> = ({ currentIndex, total, setCurrentIndex }) => {
  const next = () => setCurrentIndex((currentIndex + 1) % total);
  const prev = () => setCurrentIndex(currentIndex === 0 ? total - 1 : currentIndex - 1);

  return (
    <div className={styles.navigation}>
      <button className={styles.navButton} onClick={prev} disabled={currentIndex === 0}>
        이전
      </button>
      <button className={styles.navButton} onClick={next}>
        다음
      </button>
    </div>
  );
};

export default Navigation;

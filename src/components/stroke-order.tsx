import React from "react";

import styles from "@/app/page.module.css";

interface Props {
  strokes: string[];
}

const StrokeOrder: React.FC<Props> = ({ strokes }) => (
  <div className={styles.strokeOrder}>
    <h4>획순</h4>
    <div className={styles.strokeList}>
      {strokes.map((stroke, index) => (
        <div key={index} className={styles.strokeItem}>
          <span className={styles.strokeNumber}>{index + 1}</span>
          <span>{stroke}</span>
        </div>
      ))}
    </div>
  </div>
);

export default StrokeOrder;

import { Typography, LinearProgress } from "@mui/material";
import React from "react";

import styles from "./progress-card.module.css";

interface ProgressItem {
  label: string;
  value: number;
  total?: number;
  color: string;
  description?: string;
}

interface ProgressCardProps {
  items: ProgressItem[];
  className?: string;
}

export default function ProgressCard({
  items,
  className
}: ProgressCardProps) {
  return (
    <div className={`${styles.progressCard} ${className || ""}`}>
      {items.map((item, index) => (
        <div key={index} className={styles.progressItem}>
          <div className={styles.progressHeader}>
            <div className={styles.progressInfo}>
              <Typography variant="body1" className={styles.progressLabel}>
                {item.label}
              </Typography>
              {item.description && (
                <Typography variant="caption" className={styles.progressDescription}>
                  {item.description}
                </Typography>
              )}
            </div>
            <Typography variant="body2" className={styles.progressStats}>
              {item.total ? `${Math.round(item.value)}/${item.total}` : `${Math.round(item.value)}%`}
            </Typography>
          </div>
          <LinearProgress
            variant="determinate"
            value={item.total ? (item.value / item.total) * 100 : item.value}
            className={styles.progressBar}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: item.color,
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}
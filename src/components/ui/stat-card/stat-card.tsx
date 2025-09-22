import React from "react";
import { Typography } from "@mui/material";

import styles from "./stat-card.module.css";

interface StatCardProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  color = "var(--primary-500)",
  size = "medium",
  className
}: StatCardProps) {
  return (
    <div className={`${styles.statCard} ${styles[size]} ${className || ""}`}>
      {icon && (
        <div
          className={styles.iconWrapper}
          style={{ backgroundColor: `${color}20` }}
        >
          <div className={styles.icon} style={{ color }}>
            {icon}
          </div>
        </div>
      )}
      <Typography variant="h4" className={styles.value}>
        {value}
      </Typography>
      <Typography variant="caption" className={styles.label}>
        {label}
      </Typography>
    </div>
  );
}
import React from "react";

import styles from "./stats-grid.module.css";

interface StatsGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export default function StatsGrid({
  children,
  columns = 2,
  className
}: StatsGridProps) {
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  };

  return (
    <div
      className={`${styles.statsGrid} ${className || ""}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
}
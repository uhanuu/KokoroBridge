"use client";

import { ChevronRight } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

import styles from "./settings-menu-item.module.css";

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  isLogout?: boolean;
}

export default function SettingsMenuItem({
  icon,
  title,
  subtitle,
  onClick,
  isLogout = false
}: SettingsMenuItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles.settingItem} ${isLogout ? styles.logoutItem : ""}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.settingInfo}>
        <div className={`${styles.settingIcon} ${isLogout ? styles.logoutIcon : ""}`}>
          {icon}
        </div>
        <div className={styles.settingContent}>
          <Typography variant="body1" className={`${styles.settingTitle} ${isLogout ? styles.logoutTitle : ""}`}>
            {title}
          </Typography>
          <Typography variant="caption" className={styles.settingSubtitle}>
            {subtitle}
          </Typography>
        </div>
      </div>
      <div className={styles.chevron}>
        <ChevronRight className={`${styles.chevronIcon} ${isLogout ? styles.chevronLogout : ""}`} />
      </div>
    </div>
  );
}
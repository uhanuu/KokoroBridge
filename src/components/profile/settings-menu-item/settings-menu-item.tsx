"use client";

import React from "react";
import { Typography, Switch } from "@mui/material";

import styles from "./settings-menu-item.module.css";

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  hasSwitch?: boolean;
  isEnabled?: boolean;
  onToggle?: (enabled: boolean) => void;
  onClick?: () => void;
  className?: string;
}

export default function SettingsMenuItem({
  icon,
  title,
  description,
  hasSwitch = false,
  isEnabled = false,
  onToggle,
  onClick,
  className
}: SettingsMenuItemProps) {
  const handleClick = () => {
    if (hasSwitch && onToggle) {
      onToggle(!isEnabled);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.menuItem} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <div className={styles.iconWrapper}>
        {icon}
      </div>

      <div className={styles.content}>
        <Typography variant="body1" className={styles.title}>
          {title}
        </Typography>
        {description && (
          <Typography variant="caption" className={styles.description}>
            {description}
          </Typography>
        )}
      </div>

      <div className={styles.action}>
        {hasSwitch ? (
          <Switch
            checked={isEnabled}
            onChange={(e) => onToggle?.(e.target.checked)}
            color="primary"
            size="small"
          />
        ) : (
          <span className={styles.arrow}>→</span>
        )}
      </div>
    </div>
  );
}
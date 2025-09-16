"use client";

import { PlayArrow, Lock, CheckCircle, Check, Notifications, Science, Visibility, Event } from "@mui/icons-material";
import React from "react";

import styles from "./action-button.module.css";

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "locked" | "completed";
  className?: string;
  hideIcon?: boolean;
  iconType?: "play" | "check" | "notifications" | "science" | "visibility" | "event";
}

export default function ActionButton({
  text,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  hideIcon = false,
  iconType = "play",
}: ActionButtonProps) {
  const buttonClass = `
    ${styles.actionButton}
    ${variant === "locked" ? styles.lockedButton : ""}
    ${variant === "completed" ? styles.completedButton : ""}
    ${className}
  `.trim();

  const getIcon = () => {
    if (variant === "locked") return <Lock className={styles.playIcon} />;
    if (variant === "completed") return <CheckCircle className={styles.playIcon} />;

    switch (iconType) {
      case "check":
        return <Check className={styles.playIcon} />;
      case "notifications":
        return <Notifications className={styles.playIcon} />;
      case "science":
        return <Science className={styles.playIcon} />;
      case "visibility":
        return <Visibility className={styles.playIcon} />;
      case "event":
        return <Event className={styles.playIcon} />;
      case "play":
      default:
        return <PlayArrow className={styles.playIcon} />;
    }
  };

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      <span className={styles.buttonText}>{text}</span>
      {!hideIcon && (
        <div className={styles.playIconCircle}>
          {getIcon()}
        </div>
      )}
    </button>
  );
}
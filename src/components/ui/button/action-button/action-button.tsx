"use client";

import { PlayArrow, Lock, CheckCircle } from "@mui/icons-material";
import React from "react";

import styles from "./action-button.module.css";

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "locked" | "completed";
  className?: string;
  hideIcon?: boolean;
}

export default function ActionButton({
  text,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  hideIcon = false,
}: ActionButtonProps) {
  const buttonClass = `
    ${styles.actionButton}
    ${variant === "locked" ? styles.lockedButton : ""}
    ${variant === "completed" ? styles.completedButton : ""}
    ${className}
  `.trim();

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      <span className={styles.buttonText}>{text}</span>
      {!hideIcon && (
        <div className={styles.playIconCircle}>
          {variant === "locked" ? (
            <Lock className={styles.playIcon} />
          ) : variant === "completed" ? (
            <CheckCircle className={styles.playIcon} />
          ) : (
            <PlayArrow className={styles.playIcon} />
          )}
        </div>
      )}
    </button>
  );
}
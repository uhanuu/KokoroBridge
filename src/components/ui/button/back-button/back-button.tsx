"use client";

import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import styles from "./back-button.module.css";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function BackButton({
  onClick,
  className = "",
  size = "medium",
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  const buttonClass = `
    ${styles.backButton}
    ${styles[size]}
    ${className}
  `.trim();

  return (
    <IconButton onClick={handleClick} className={buttonClass}>
      <ArrowBack className={styles.icon} />
    </IconButton>
  );
}
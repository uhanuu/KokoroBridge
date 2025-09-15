"use client";

import { Warning, CheckCircle, Error, Info, Close } from "@mui/icons-material";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";

import ActionButton from "@/components/ui/button/action-button";

import styles from "./confirm-dialog.module.css";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: "warning" | "success" | "error" | "info";
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  mascotImage?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

const dialogTypeConfig = {
  warning: {
    icon: Warning,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)"
  },
  success: {
    icon: CheckCircle,
    color: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.1)"
  },
  error: {
    icon: Error,
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)"
  },
  info: {
    icon: Info,
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)"
  }
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  type = "warning",
  confirmText = "확인",
  cancelText = "취소",
  showCancel = true,
  mascotImage,
  onConfirm,
  onCancel,
  onClose
}: ConfirmDialogProps) {
  const config = dialogTypeConfig[type];
  const IconComponent = config.icon;

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.container}>
        <Card className={styles.dialog}>
          <CardContent className={styles.content}>
            {/* 닫기 버튼 */}
            <div className={styles.closeSection}>
              <IconButton
                onClick={onClose}
                className={styles.closeButton}
                size="small"
              >
                <Close />
              </IconButton>
            </div>

            {/* 아이콘 및 마스코트 섹션 */}
            <div className={styles.iconSection}>
              {mascotImage ? (
                <div className={styles.mascotContainer}>
                  <Image
                    src={mascotImage}
                    alt="마스코트"
                    width={80}
                    height={80}
                    className={styles.mascotImage}
                  />
                  <div
                    className={styles.typeIconOverlay}
                    style={{ backgroundColor: config.bgColor }}
                  >
                    <IconComponent
                      className={styles.typeIcon}
                      style={{ color: config.color }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: config.bgColor }}
                >
                  <IconComponent
                    className={styles.mainIcon}
                    style={{ color: config.color }}
                  />
                </div>
              )}
            </div>

            {/* 제목과 메시지 */}
            <div className={styles.textSection}>
              <Typography variant="h6" className={styles.title}>
                {title}
              </Typography>
              <Typography variant="body1" className={styles.message}>
                {message}
              </Typography>
            </div>

            {/* 액션 버튼들 */}
            <div className={styles.actions}>
              {showCancel && (
                <ActionButton
                  text={cancelText}
                  variant="primary"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                />
              )}
              <ActionButton
                text={confirmText}
                variant={type === "error" ? "primary" : "primary"}
                onClick={handleConfirm}
                className={`${styles.confirmButton} ${styles[`${type}Button`]}`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
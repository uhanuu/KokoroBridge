"use client";

import { Warning, CheckCircle, Error, Info, Close } from "@mui/icons-material";
import { Typography, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";

import ActionButton from "@/components/ui/button/action-button";
import Card from "@/components/ui/card";
import { dialogTypeConfig, confirmDialogDefaults } from "@/mock/confirm-dialog-mock";

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

const iconComponents = {
  Warning,
  CheckCircle,
  Error,
  Info,
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  type = confirmDialogDefaults.defaultType,
  confirmText = confirmDialogDefaults.confirmText,
  cancelText = confirmDialogDefaults.cancelText,
  showCancel = confirmDialogDefaults.showCancel,
  mascotImage,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmDialogProps) {
  const config = dialogTypeConfig[type];
  const IconComponent = iconComponents[config.icon as keyof typeof iconComponents];

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      const preventWheel = (e: WheelEvent) => {
        e.preventDefault();
      };

      const preventTouchMove = (e: TouchEvent) => {
        e.preventDefault();
      };

      document.addEventListener('wheel', preventWheel, { passive: false });
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
      document.addEventListener('scroll', preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = originalStyle;
        document.removeEventListener('wheel', preventWheel);
        document.removeEventListener('touchmove', preventTouchMove);
        document.removeEventListener('scroll', preventScroll);
      };
    }
    return () => {};
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
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
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.container}>
        <Card
          variant="default"
          size="lg"
          padding="xl"
          borderRadius="2xl"
          className={styles.dialog}
        >
            {/* 헤더 섹션 (제목 + 닫기 버튼) */}
            <div className={styles.headerSection}>
              <Typography variant="h6" className={styles.title}>
                {title}
              </Typography>
              <IconButton onClick={onClose} className={styles.closeButton} size="small">
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
                    width={120}
                    height={120}
                    className={styles.mascotImage}
                  />
                </div>
              ) : (
                <div className={styles.iconContainer} style={{ backgroundColor: config.bgColor }}>
                  <IconComponent className={styles.mainIcon} style={{ color: config.color }} />
                </div>
              )}
            </div>

            {/* 메시지 */}
            <div className={styles.messageSection}>
              {message.split('\n').map((line, index) => (
                <Typography key={index} variant="body1" className={styles.message}>
                  {line}
                </Typography>
              ))}
            </div>

            {/* 액션 버튼들 */}
            <div className={styles.actions}>
              {showCancel && (
                <ActionButton
                  text={cancelText}
                  variant="primary"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                  hideIcon={true}
                />
              )}
              <ActionButton
                text={confirmText}
                variant={type === "error" ? "primary" : "primary"}
                onClick={handleConfirm}
                className={`${styles.confirmButton} ${styles[`${type}Button`]}`}
                hideIcon={true}
              />
            </div>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";

import type { ConfirmDialogProps } from "@/components/ui/confirm-dialog";

interface ConfirmConfig {
  title: string;
  message: string;
  type?: "warning" | "success" | "error" | "info";
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  mascotImage?: string;
}

interface ConfirmState extends ConfirmConfig {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface UseConfirmReturn {
  confirmProps: Omit<ConfirmDialogProps, "onClose">;
  showConfirm: (config: ConfirmConfig) => Promise<boolean>;
  hideConfirm: () => void;
  confirm: (config: Omit<ConfirmConfig, "showCancel">) => Promise<boolean>;
  success: (config: Omit<ConfirmConfig, "type">) => Promise<boolean>;
  error: (config: Omit<ConfirmConfig, "type">) => Promise<boolean>;
  warning: (config: Omit<ConfirmConfig, "type">) => Promise<boolean>;
  info: (config: Omit<ConfirmConfig, "type">) => Promise<boolean>;
}

export function useConfirm(): UseConfirmReturn {
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    message: "",
    type: "warning",
    confirmText: "확인",
    cancelText: "취소",
    showCancel: true,
    onConfirm: () => {},
  });

  const hideConfirm = useCallback(() => {
    setConfirmState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const showConfirm = useCallback((config: ConfirmConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({
        ...config,
        type: config.type || "warning",
        confirmText: config.confirmText || "확인",
        cancelText: config.cancelText || "취소",
        showCancel: config.showCancel !== false,
        isOpen: true,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }, []);

  // 확인/취소 다이얼로그
  const confirm = useCallback((config: Omit<ConfirmConfig, "showCancel">): Promise<boolean> => {
    return showConfirm({
      ...config,
      type: config.type || "warning",
      showCancel: true,
    });
  }, [showConfirm]);

  // 성공 알림 (확인 버튼만)
  const success = useCallback((config: Omit<ConfirmConfig, "type">): Promise<boolean> => {
    return showConfirm({
      ...config,
      type: "success",
      showCancel: config.showCancel !== undefined ? config.showCancel : false,
    });
  }, [showConfirm]);

  // 에러 알림
  const error = useCallback((config: Omit<ConfirmConfig, "type">): Promise<boolean> => {
    return showConfirm({
      ...config,
      type: "error",
      showCancel: config.showCancel !== undefined ? config.showCancel : false,
    });
  }, [showConfirm]);

  // 경고 알림
  const warning = useCallback((config: Omit<ConfirmConfig, "type">): Promise<boolean> => {
    return showConfirm({
      ...config,
      type: "warning",
    });
  }, [showConfirm]);

  // 정보 알림
  const info = useCallback((config: Omit<ConfirmConfig, "type">): Promise<boolean> => {
    return showConfirm({
      ...config,
      type: "info",
      showCancel: config.showCancel !== undefined ? config.showCancel : false,
    });
  }, [showConfirm]);

  const confirmProps: Omit<ConfirmDialogProps, "onClose"> = {
    isOpen: confirmState.isOpen,
    title: confirmState.title,
    message: confirmState.message,
    type: confirmState.type,
    confirmText: confirmState.confirmText,
    cancelText: confirmState.cancelText,
    showCancel: confirmState.showCancel,
    mascotImage: confirmState.mascotImage,
    onConfirm: confirmState.onConfirm,
    onCancel: confirmState.onCancel,
  };

  return {
    confirmProps,
    showConfirm,
    hideConfirm,
    confirm,
    success,
    error,
    warning,
    info,
  };
}
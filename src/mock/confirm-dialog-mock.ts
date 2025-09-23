export const dialogTypeConfig = {
  warning: {
    icon: "Warning",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
  },
  success: {
    icon: "CheckCircle",
    color: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.1)",
  },
  error: {
    icon: "Error",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
  },
  info: {
    icon: "Info",
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
  },
} as const;

export const confirmDialogDefaults = {
  confirmText: "확인",
  cancelText: "취소",
  defaultType: "warning" as keyof typeof dialogTypeConfig,
  showCancel: true,
};
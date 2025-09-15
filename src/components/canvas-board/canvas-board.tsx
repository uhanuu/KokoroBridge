"use client";
import { useCallback, useEffect, useRef } from "react";

import styles from "./canvas-board.module.css";

export default function CanvasBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const getEventPoint = useCallback((
    e: PointerEvent | TouchEvent | MouseEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX: number, clientY: number;

    if ('touches' in e && e.touches.length > 0 && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('changedTouches' in e && e.changedTouches.length > 0 && e.changedTouches[0]) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = (e as MouseEvent | PointerEvent).clientX;
      clientY = (e as MouseEvent | PointerEvent).clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, []);

  const getLineWidth = useCallback((pressure?: number) => {
    if (!pressure || pressure === 0.5) return 3;
    return Math.max(1, Math.min(12, pressure * 8));
  }, []);

  const startDrawing = useCallback((e: PointerEvent | TouchEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    e.preventDefault();
    isDrawing.current = true;

    const point = getEventPoint(e, canvas);
    const pressure = 'pressure' in e ? e.pressure : 0.5;
    const lineWidth = getLineWidth(pressure);

    lastPoint.current = point;

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  }, [getEventPoint, getLineWidth]);

  const draw = useCallback((e: PointerEvent | TouchEvent | MouseEvent) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    e.preventDefault();

    const point = getEventPoint(e, canvas);
    const pressure = 'pressure' in e ? e.pressure : 0.5;
    const lineWidth = getLineWidth(pressure);

    if (lastPoint.current) {
      ctx.lineWidth = lineWidth;
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }

    lastPoint.current = point;
  }, [getEventPoint, getLineWidth]);

  const stopDrawing = useCallback((e: PointerEvent | TouchEvent | MouseEvent) => {
    if (!isDrawing.current) return;

    e.preventDefault();
    isDrawing.current = false;
    lastPoint.current = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    canvas.width = displayWidth * devicePixelRatio;
    canvas.height = displayHeight * devicePixelRatio;

    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 즉시 캔버스 초기화
    const initCanvas = () => {
      resizeCanvas();

      // 캔버스 준비 완료 확인
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
    };

    // DOM 완전 로드 후 또는 즉시 초기화
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCanvas);
    } else {
      initCanvas();
    }

    window.addEventListener("resize", resizeCanvas);

    // Pointer Events (최신 브라우저, 압력 감지 지원)
    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointercancel", stopDrawing);

    // Touch Events (모바일 지원)
    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing, { passive: false });
    canvas.addEventListener("touchcancel", stopDrawing, { passive: false });

    // Mouse Events (호환성)
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      document.removeEventListener('DOMContentLoaded', initCanvas);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointerdown", startDrawing);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", stopDrawing);
      canvas.removeEventListener("pointercancel", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
      canvas.removeEventListener("touchcancel", stopDrawing);
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing, resizeCanvas]);

  return (
    <div className={styles.canvasContainer}>
      <div className={styles.dottedBackground} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

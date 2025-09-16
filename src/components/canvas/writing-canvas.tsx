"use client";

import { Clear, Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef, useEffect, useState, useCallback } from "react";

import styles from "./writing-canvas.module.css";

interface WritingCanvasProps {
  character?: string;
  width?: number;
  height?: number;
  className?: string;
  onDrawingComplete?: (hasDrawing: boolean) => void;
}

function isPointerEvent(e: any): e is PointerEvent {
  return "pressure" in e;
}

export default function WritingCanvas({
  character = "",
  width = 320,
  height = 320,
  className = "",
  onDrawingComplete,
}: WritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;

    // 투명한 배경으로 초기화
    ctx.clearRect(0, 0, width, height);
  }, [width, height]);

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  const getPointerPosition = useCallback(
    (event: MouseEvent | TouchEvent): { x: number; y: number; pressure?: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      let clientX: number,
        clientY: number,
        pressure = 0.5;

      if (event instanceof TouchEvent && event.touches.length > 0) {
        const touch = event.touches[0]!;
        clientX = touch.clientX;
        clientY = touch.clientY;
        // 터치 이벤트에서 압력 정보 (WebKit에서 지원)
        if ("force" in touch && touch.force > 0) {
          pressure = Math.min(touch.force, 1);
        }
      } else if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
        // 마우스 이벤트에서 압력 정보 (일부 브라우저에서 지원)
        if (isPointerEvent(event) && event.pressure > 0) {
          pressure = event.pressure;
        }
      } else {
        return { x: 0, y: 0, pressure };
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        pressure,
      };
    },
    []
  );

  const startDrawing = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const position = getPointerPosition(event);
      setIsDrawing(true);
      setLastPosition(position);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
    },
    [getPointerPosition]
  );

  const draw = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (!isDrawing || !lastPosition) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const position = getPointerPosition(event);

      // 압력에 따른 선 굵기 조절 (2px ~ 8px)
      const baseWidth = 3;
      const pressureMultiplier = (position.pressure || 0.5) * 2;
      ctx.lineWidth = Math.max(2, Math.min(8, baseWidth * pressureMultiplier));

      ctx.lineTo(position.x, position.y);
      ctx.stroke();

      setLastPosition(position);
      setHasDrawing(true);
    },
    [isDrawing, lastPosition, getPointerPosition]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    setLastPosition(null);
    onDrawingComplete?.(hasDrawing);
  }, [hasDrawing, onDrawingComplete]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    setHasDrawing(false);
    onDrawingComplete?.(false);
  }, [width, height, onDrawingComplete]);

  const resetCanvas = useCallback(() => {
    clearCanvas();
    initializeCanvas();
  }, [clearCanvas, initializeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 마우스 이벤트
    const handleMouseDown = (e: MouseEvent) => startDrawing(e);
    const handleMouseMove = (e: MouseEvent) => draw(e);
    const handleMouseUp = () => stopDrawing();
    const handleMouseOut = () => stopDrawing();

    // 터치 이벤트
    const handleTouchStart = (e: TouchEvent) => startDrawing(e);
    const handleTouchMove = (e: TouchEvent) => draw(e);
    const handleTouchEnd = () => stopDrawing();

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseout", handleMouseOut);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseout", handleMouseOut);

      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startDrawing, draw, stopDrawing]);

  return (
    <div className={`${styles.canvasContainer} ${className}`}>
      <div className={styles.canvasWrapper} style={{ width, height }}>
        {/* 십자가 점선 배경 */}
        <svg
          className={styles.gridBackground}
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width={width / 4} height={height / 4} patternUnits="userSpaceOnUse">
              <path
                d={`M ${width / 8} 0 v ${height / 4} M 0 ${height / 8} h ${width / 4}`}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* 메인 십자가 */}
          <line
            x1={width / 2}
            y1="0"
            x2={width / 2}
            y2={height}
            stroke="#d1d5db"
            strokeWidth="2"
            strokeDasharray="8,8"
            opacity="0.7"
          />
          <line
            x1="0"
            y1={height / 2}
            x2={width}
            y2={height / 2}
            stroke="#d1d5db"
            strokeWidth="2"
            strokeDasharray="8,8"
            opacity="0.7"
          />
        </svg>

        {/* 가이드 문자 */}
        {character && (
          <div
            className={styles.guideCharacter}
            style={{
              fontSize: Math.min(width, height) * 0.6,
              width,
              height,
            }}
          >
            {character}
          </div>
        )}

        {/* 그리기 캔버스 */}
        <canvas ref={canvasRef} className={styles.drawingCanvas} style={{ width, height }} />
      </div>

      {/* 제어 버튼들 */}
      <div className={styles.controls}>
        <IconButton onClick={clearCanvas} className={styles.controlButton} title="지우기">
          <Clear />
        </IconButton>
        <IconButton onClick={resetCanvas} className={styles.controlButton} title="다시 시작">
          <Refresh />
        </IconButton>
      </div>
    </div>
  );
}

"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";

import styles from "@/app/page.module.css";

interface DrawPoint {
  x: number;
  y: number;
}

const CanvasBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<DrawPoint[]>([]);
  const [allStrokes, setAllStrokes] = useState<DrawPoint[][]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#2E7D32";
    ctx.lineWidth = 3;
  }, []);

  const getPointFromEvent = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY;

    if (clientX == null || clientY == null) return null;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const point = getPointFromEvent(e);
    if (!point) return;

    setIsDrawing(true);
    setCurrentStroke([point]);
  }, []);

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      const point = getPointFromEvent(e);
      if (!point) return;

      setCurrentStroke((prev) => {
        const newStroke = [...prev, point];

        if (newStroke.length > 1) {
          const prevPoint = newStroke[newStroke.length - 2];
          if (prevPoint) {
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
        }

        return newStroke;
      });
    },
    [isDrawing]
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setAllStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  }, [isDrawing, currentStroke]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setAllStrokes([]);
    setCurrentStroke([]);
    setIsCorrect(null);
  };

  const validateWriting = () => {
    const hasStrokes = allStrokes.length > 0;
    setIsCorrect(hasStrokes ? Math.random() > 0.3 : false);
  };

  return (
    <div className={styles.canvasSection}>
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {isCorrect !== null && (
          <div className={`${styles.result} ${isCorrect ? styles.correct : styles.incorrect}`}>
            {isCorrect ? "✔" : "✖"}
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasBoard;

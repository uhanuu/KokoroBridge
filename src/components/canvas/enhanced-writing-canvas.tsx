"use client";

import { VolumeUp, Refresh, Lightbulb } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef, useEffect, useState, useCallback } from "react";

import { MascotFeedback, useMascotFeedback } from "@/components/ui/mascot";
import { strokeOrderService } from "@/services/stroke-order.service";
import { strokeValidationService, ValidationResult } from "@/services/stroke-validation.service";
import { ttsService } from "@/services/tts.service";

import styles from "./enhanced-writing-canvas.module.css";

interface StrokePoint {
  x: number;
  y: number;
  pressure?: number;
}

interface EnhancedWritingCanvasProps {
  character: string;
  width?: number;
  height?: number;
  className?: string;
  onValidationResult?: (result: ValidationResult) => void;
  onCharacterComplete?: () => void;
  autoPlayTTS?: boolean;
  showStrokeDemo?: boolean;
}

export default function EnhancedWritingCanvas({
  character,
  width: propWidth,
  height: propHeight,
  className = "",
  onValidationResult,
  onCharacterComplete,
  autoPlayTTS = true,
  showStrokeDemo = true,
}: EnhancedWritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const demoCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<StrokePoint[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);

  const { feedback, showFeedback, hideFeedback } = useMascotFeedback();

  // 반응형 캔버스 크기 계산
  useEffect(() => {
    const updateCanvasSize = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const maxWidth = containerRect.width - 32; // 패딩 고려
      const maxHeight = window.innerHeight - 300; // 헤더, 버튼 등 공간 고려

      const newWidth = propWidth || Math.min(maxWidth, 400);
      const newHeight = propHeight || Math.min(maxHeight, 400);

      // 정사각형 유지
      const size = Math.min(newWidth, newHeight, maxWidth, maxHeight);

      setCanvasSize({ width: size, height: size });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [propWidth, propHeight]);

  // 컴포넌트 초기화
  useEffect(() => {
    if (character) {
      initializeForCharacter();
    }
  }, [character]);

  // TTS 자동 재생
  useEffect(() => {
    if (character && autoPlayTTS) {
      playCharacterSound();
    }
  }, [character, autoPlayTTS]);

  // 획순 데모 자동 재생
  useEffect(() => {
    if (character && showStrokeDemo && showDemo) {
      playStrokeDemo();
    }
  }, [character, showDemo, showStrokeDemo]);

  const initializeForCharacter = useCallback(() => {
    // 검증 서비스 초기화
    const isSupported = strokeValidationService.startValidation(character);

    if (!isSupported) {
      showFeedback('error', `'${character}' 문자의 획순 데이터를 찾을 수 없습니다.`);
      return;
    }

    // 캔버스 초기화
    initializeCanvas();

    // 첫 진입시 데모 표시
    if (showStrokeDemo) {
      setShowDemo(true);
    }
  }, [character, showStrokeDemo]);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * ratio;
    canvas.height = canvasSize.height * ratio;
    canvas.style.width = `${canvasSize.width}px`;
    canvas.style.height = `${canvasSize.height}px`;

    ctx.scale(ratio, ratio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 4;

    // 배경 초기화
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  }, [canvasSize]);

  // 캔버스 초기화 효과
  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  const getPointerPosition = useCallback(
    (event: MouseEvent | TouchEvent): { x: number; y: number; pressure?: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      let clientX: number, clientY: number, pressure = 0.5;

      if (event instanceof TouchEvent && event.touches.length > 0) {
        const touch = event.touches[0]!;
        clientX = touch.clientX;
        clientY = touch.clientY;
        if ('force' in touch && touch.force > 0) {
          pressure = Math.min(touch.force, 1);
        }
      } else if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
        if ('pressure' in event && typeof event.pressure === 'number' && event.pressure > 0) {
          pressure = event.pressure;
        }
      } else {
        return { x: 0, y: 0, pressure };
      }

      // 정규화된 좌표 반환 (0-1 범위)
      return {
        x: (clientX - rect.left) / rect.width,
        y: (clientY - rect.top) / rect.height,
        pressure,
      };
    },
    []
  );

  const startDrawing = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      const position = getPointerPosition(event);
      setIsDrawing(true);
      setCurrentStroke([position]);
      setLastPosition({ x: position.x * canvasSize.width, y: position.y * canvasSize.height });

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(position.x * canvasSize.width, position.y * canvasSize.height);
      }
    },
    [getPointerPosition, canvasSize]
  );

  const draw = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (!isDrawing || !lastPosition) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;

      const position = getPointerPosition(event);
      const canvasX = position.x * canvasSize.width;
      const canvasY = position.y * canvasSize.height;

      // 압력에 따른 선 굵기 조절
      const baseWidth = 4;
      const pressureMultiplier = (position.pressure || 0.5) * 1.5;
      ctx.lineWidth = Math.max(2, Math.min(8, baseWidth * pressureMultiplier));

      ctx.lineTo(canvasX, canvasY);
      ctx.stroke();

      setCurrentStroke(prev => [...prev, position]);
      setLastPosition({ x: canvasX, y: canvasY });
    },
    [isDrawing, lastPosition, getPointerPosition, canvasSize]
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawing || currentStroke.length === 0) return;

    setIsDrawing(false);
    setLastPosition(null);

    // 획순 검증 실행
    try {
      const result = strokeValidationService.addUserStroke(currentStroke);

      // 검증 결과에 따른 피드백
      if (result.isCorrect) {
        if (result.completedStrokes === result.totalStrokes) {
          // 모든 획순 완료
          showFeedback('celebrating', '완벽합니다! 🎉', 4000);
          onCharacterComplete?.();
        } else {
          // 현재 획순 성공
          showFeedback('success', '좋습니다! 다음 획순을 그려보세요.', 2000);
        }
      } else {
        // 획순 실패
        showFeedback('error', result.feedback.message, 3000);
        // 잠시 후 현재 획순만 지우기 (전체 캔버스 초기화 대신)
        setTimeout(() => {
          strokeValidationService.reset();
          strokeValidationService.startValidation(character);
        }, 1500);
      }

      onValidationResult?.(result);
    } catch (_error) {
      // Stroke validation error
      showFeedback('error', '획순 검증 중 오류가 발생했습니다.');
    }

    setCurrentStroke([]);
  }, [isDrawing, currentStroke, onValidationResult, onCharacterComplete, character, showFeedback]);

  // 마우스/터치 이벤트 등록
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => startDrawing(e);
    const handleMouseMove = (e: MouseEvent) => draw(e);
    const handleMouseUp = () => stopDrawing();
    const handleMouseOut = () => stopDrawing();

    const handleTouchStart = (e: TouchEvent) => startDrawing(e);
    const handleTouchMove = (e: TouchEvent) => draw(e);
    const handleTouchEnd = () => stopDrawing();

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseOut);

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseout', handleMouseOut);

      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startDrawing, draw, stopDrawing]);

  // TTS 재생
  const playCharacterSound = useCallback(async () => {
    if (isPlaying || !character) return;

    setIsPlaying(true);
    try {
      await ttsService.speak(character);
    } catch (_error) {
      // TTS Error
    } finally {
      setIsPlaying(false);
    }
  }, [character, isPlaying]);

  // 획순 데모 재생
  const playStrokeDemo = useCallback(async () => {
    const demoCanvas = demoCanvasRef.current;
    if (!demoCanvas || !character) return;

    try {
      strokeOrderService.clearCanvas(demoCanvas);
      await strokeOrderService.demonstrateStrokeOrder(character, demoCanvas, {
        strokeColor: '#10b981',
        strokeWidth: 3,
        speed: 0.8,
      });
    } catch (_error) {
      // Stroke demo error
    }
  }, [character]);

  // 캔버스 초기화
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }

    strokeValidationService.reset();
    setCurrentStroke([]);
  }, [canvasSize]);

  // 다시 시작
  const resetCanvas = useCallback(() => {
    clearCanvas();
    initializeCanvas();
    strokeValidationService.startValidation(character);
  }, [clearCanvas, initializeCanvas, character]);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {/* 캔버스 영역 */}
      <div className={styles.canvasWrapper} style={{ width: canvasSize.width, height: canvasSize.height }}>
        {/* 가이드 배경 */}
        <svg
          className={styles.gridBackground}
          width={canvasSize.width}
          height={canvasSize.height}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 십자가 가이드 라인 */}
          <line
            x1={canvasSize.width / 2}
            y1="0"
            x2={canvasSize.width / 2}
            y2={canvasSize.height}
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeDasharray="8,8"
            opacity="0.6"
          />
          <line
            x1="0"
            y1={canvasSize.height / 2}
            x2={canvasSize.width}
            y2={canvasSize.height / 2}
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeDasharray="8,8"
            opacity="0.6"
          />
        </svg>

        {/* 가이드 문자 */}
        <div
          className={styles.guideCharacter}
          style={{
            fontSize: Math.min(canvasSize.width, canvasSize.height) * 0.7,
            width: canvasSize.width,
            height: canvasSize.height,
          }}
        >
          {character}
        </div>

        {/* 데모 캔버스 (획순 시연용) */}
        {showDemo && (
          <canvas
            ref={demoCanvasRef}
            className={styles.demoCanvas}
            width={canvasSize.width}
            height={canvasSize.height}
            style={{ width: canvasSize.width, height: canvasSize.height }}
          />
        )}

        {/* 그리기 캔버스 */}
        <canvas
          ref={canvasRef}
          className={styles.drawingCanvas}
          style={{ width: canvasSize.width, height: canvasSize.height }}
        />
      </div>

      {/* 컨트롤 버튼들 */}
      <div className={styles.controls}>
        <IconButton
          onClick={playCharacterSound}
          disabled={isPlaying}
          className={styles.controlButton}
          title="발음 듣기"
          aria-label="발음 듣기"
        >
          <VolumeUp />
        </IconButton>

        <IconButton
          onClick={() => {
            setShowDemo(!showDemo);
            if (!showDemo) playStrokeDemo();
          }}
          className={styles.controlButton}
          title="획순 보기"
          aria-label="획순 보기"
        >
          <Lightbulb />
        </IconButton>

        <IconButton
          onClick={resetCanvas}
          className={styles.controlButton}
          title="다시 시작"
          aria-label="다시 시작"
        >
          <Refresh />
        </IconButton>
      </div>

      {/* 마스코트 피드백 */}
      <MascotFeedback
        type={feedback.type}
        message={feedback.message}
        visible={feedback.visible}
        onHide={hideFeedback}
        position="center"
        size="medium"
      />
    </div>
  );
}
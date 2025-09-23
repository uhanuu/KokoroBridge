"use client";

import {
  VolumeUp,
  Lightbulb,
  Refresh,
  ArrowBack,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";
import { IconButton, Typography, LinearProgress } from "@mui/material";
import React, { useRef, useEffect, useState, useCallback } from "react";

import { useMascotFeedback } from "@/components/ui/mascot/mascot-feedback";
import { CharacterData, Point, StrokeOrderEngine } from "@/services/stroke-order-engine.service";
import { TextToSpeechService } from "@/services/text-to-speech.service";
import { CanvasUtils } from "@/utils/canvas.utils";

import styles from "./premium-writing-canvas.module.css";

interface PremiumWritingCanvasProps {
  character: CharacterData;
  onComplete?: (accuracy: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onBack?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  currentIndex?: number;
  totalCount?: number;
  className?: string;
}

export default function PremiumWritingCanvas({
  character,
  onComplete,
  onNext,
  onPrevious,
  onBack,
  hasNext = false,
  hasPrevious = false,
  currentIndex = 0,
  totalCount = 1,
  className = "",
}: PremiumWritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [userStrokes, setUserStrokes] = useState<Point[][]>([]);
  const [showHint, setShowHint] = useState(false);
  const [hintProgress, setHintProgress] = useState(0);
  const [completionStatus, setCompletionStatus] = useState<{
    isComplete: boolean;
    accuracy: number;
    feedback: string;
  }>({ isComplete: false, accuracy: 0, feedback: "" });

  const strokeEngine = useRef(new StrokeOrderEngine());
  const ttsService = useRef(new TextToSpeechService());
  const { feedback, showFeedback, hideFeedback } = useMascotFeedback();

  // 캔버스 초기화 및 이벤트 리스너 등록
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    CanvasUtils.setupCanvasSize(canvas, container);
    drawCanvasBackground();

    // 직접 이벤트 리스너 등록 (passive 문제 해결)
    const startHandler = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const event = { nativeEvent: e, type: e.type } as any;
      handleStart(event);
    };

    const moveHandler = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const event = { nativeEvent: e, type: e.type } as any;
      handleMove(event);
    };

    const endHandler = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const event = { nativeEvent: e, type: e.type } as any;
      handleEnd(event);
    };

    // 마우스 이벤트
    canvas.addEventListener("mousedown", startHandler);
    canvas.addEventListener("mousemove", moveHandler);
    canvas.addEventListener("mouseup", endHandler);
    canvas.addEventListener("mouseleave", endHandler);

    // 터치 이벤트 (passive: false로 명시적 설정)
    canvas.addEventListener("touchstart", startHandler, { passive: false });
    canvas.addEventListener("touchmove", moveHandler, { passive: false });
    canvas.addEventListener("touchend", endHandler, { passive: false });

    const handleResize = () => {
      if (canvas && container) {
        CanvasUtils.setupCanvasSize(canvas, container);
        drawCanvasBackground();
        redrawUserStrokes();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // 이벤트 리스너 정리
      canvas.removeEventListener("mousedown", startHandler);
      canvas.removeEventListener("mousemove", moveHandler);
      canvas.removeEventListener("mouseup", endHandler);
      canvas.removeEventListener("mouseleave", endHandler);
      canvas.removeEventListener("touchstart", startHandler);
      canvas.removeEventListener("touchmove", moveHandler);
      canvas.removeEventListener("touchend", endHandler);
      window.removeEventListener("resize", handleResize);
    };
  }, [character]);

  // 캔버스 배경 그리기
  const drawCanvasBackground = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // console.log('Drawing canvas background for character:', character.char);
    CanvasUtils.clearCanvas(canvas);
    CanvasUtils.drawGuideLines(canvas);
    CanvasUtils.drawCharacterGuide(canvas, character.char);
    // console.log('Canvas background drawn');
  }, [character.char]);

  // 사용자 획순 다시 그리기
  const redrawUserStrokes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 캔버스 배경 다시 그리기
    CanvasUtils.clearCanvas(canvas);
    CanvasUtils.drawGuideLines(canvas);
    CanvasUtils.drawCharacterGuide(canvas, character.char);

    userStrokes.forEach((stroke, index) => {
      const strokeOrderLength = character.strokeOrder?.length || 0;
      const isCorrectStroke = index < strokeOrderLength;
      const color = isCorrectStroke ? "#2563eb" : "#dc2626";
      CanvasUtils.drawSmoothStroke(canvas, stroke, color, 3);
    });

    if (currentStroke.length > 0) {
      CanvasUtils.drawSmoothStroke(canvas, currentStroke, "#1d4ed8", 3);
    }
  }, [userStrokes, currentStroke, character.char, character.strokeOrder]);

  // 힌트 애니메이션
  useEffect(() => {
    if (!showHint) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const animateHint = () => {
      setHintProgress((prev) => {
        const nextProgress = prev + 0.02;
        if (nextProgress >= 1) {
          setTimeout(() => setShowHint(false), 500);
          return 1;
        }
        return nextProgress;
      });
    };

    const interval = setInterval(animateHint, 50);
    return () => clearInterval(interval);
  }, [showHint]);

  // 힌트 그리기
  useEffect(() => {
    if (!showHint || hintProgress === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    redrawUserStrokes();

    if (character.strokeOrder && character.strokePoints) {
      const currentStrokeIndex = Math.min(userStrokes.length, character.strokeOrder.length - 1);
      if (currentStrokeIndex >= 0 && character.strokePoints[currentStrokeIndex]) {
        const normalizedPoints = CanvasUtils.normalizeStrokePoints(
          character.strokePoints[currentStrokeIndex],
          canvas
        );
        CanvasUtils.drawStrokeHint(canvas, normalizedPoints, hintProgress, "#ff6b6b", 4);
      }
    }
  }, [showHint, hintProgress, redrawUserStrokes, userStrokes.length, character]);

  // 터치/마우스 이벤트 핸들러
  const handleStart = useCallback((event: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const point = CanvasUtils.getCanvasCoordinates(event.nativeEvent, canvas);
    setCurrentStroke([point]);
  }, []);

  const handleMove = useCallback(
    (event: any) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const point = CanvasUtils.getCanvasCoordinates(event.nativeEvent, canvas);

      setCurrentStroke((prev) => {
        const newStroke = [...prev, point];

        // 실시간으로 그리기
        requestAnimationFrame(() => {
          redrawUserStrokes();
          CanvasUtils.drawSmoothStroke(canvas, newStroke, "#1d4ed8", 3);
        });

        return newStroke;
      });
    },
    [isDrawing, redrawUserStrokes]
  );

  const handleEnd = useCallback(
    (event?: any) => {
      if (!isDrawing || currentStroke.length < 2) {
        setIsDrawing(false);
        setCurrentStroke([]);
        return;
      }

      setIsDrawing(false);

      // 획순 검증
      const strokeIndex = userStrokes.length;
      if (
        character.strokeOrder &&
        character.strokePoints &&
        strokeIndex < character.strokeOrder.length &&
        character.strokePoints[strokeIndex]
      ) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const normalizedExpectedStroke = CanvasUtils.normalizeStrokePoints(
          character.strokePoints[strokeIndex],
          canvas
        );

        const validation = strokeEngine.current.validateStroke(
          currentStroke,
          normalizedExpectedStroke,
          strokeIndex
        );

        const newUserStrokes = [...userStrokes, currentStroke];
        setUserStrokes(newUserStrokes);
        setCurrentStroke([]);

        // 피드백 표시
        if (validation.isValid) {
          showFeedback("success", `${strokeIndex + 1}번째 획순 완료!`);
        } else {
          showFeedback("error", validation.feedback);
        }

        // 전체 완성도 체크
        if (character.strokeOrder && newUserStrokes.length === character.strokeOrder.length) {
          const completion = strokeEngine.current.validateCharacterCompletion(
            newUserStrokes,
            character
          );

          setCompletionStatus(completion);

          if (completion.isComplete) {
            showFeedback("celebrating", completion.feedback);
            onComplete?.(completion.accuracy);
          }
        }
      }
    },
    [isDrawing, currentStroke, userStrokes, character, showFeedback, onComplete]
  );

  // 음성 재생
  const handleSpeak = useCallback(() => {
    ttsService.current.speak(character.char, {
      onError: (error) => {
        showFeedback("error", "음성 재생에 실패했습니다");
        console.error("TTS Error:", error);
      },
    });
  }, [character.char, showFeedback]);

  // 힌트 표시
  const handleShowHint = useCallback(() => {
    setShowHint(true);
    setHintProgress(0);
  }, []);

  // 캔버스 초기화
  const handleReset = useCallback(() => {
    setUserStrokes([]);
    setCurrentStroke([]);
    setCompletionStatus({ isComplete: false, accuracy: 0, feedback: "" });

    // 캔버스 배경 다시 그리기
    const canvas = canvasRef.current;
    if (canvas) {
      CanvasUtils.clearCanvas(canvas);
      CanvasUtils.drawGuideLines(canvas);
      CanvasUtils.drawCharacterGuide(canvas, character.char);
    }

    // 피드백 숨기기
    hideFeedback();
  }, [character.char, hideFeedback]);

  // 다음/이전 문자로 이동할 때 초기화
  useEffect(() => {
    setUserStrokes([]);
    setCurrentStroke([]);
    setCompletionStatus({ isComplete: false, accuracy: 0, feedback: "" });

    // 피드백 숨기기 - 함수 호출을 직접 실행
    hideFeedback();

    // 캔버스 배경 다시 그리기
    const canvas = canvasRef.current;
    if (canvas) {
      CanvasUtils.clearCanvas(canvas);
      CanvasUtils.drawGuideLines(canvas);
      CanvasUtils.drawCharacterGuide(canvas, character.char);
    }

    // 획순 정보가 없는 문자는 자동으로 완료 처리
    if (!character.strokeOrder || character.strokeOrder.length === 0) {
      setCompletionStatus({
        isComplete: true,
        accuracy: 1,
        feedback: "획순 정보가 없는 문자입니다",
      });
    }
  }, [character.char, character.strokeOrder]);

  const progress = character.strokeOrder?.length
    ? (userStrokes.length / character.strokeOrder.length) * 100
    : 0;

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {/* 헤더 */}
      <div className={styles.header}>
        {onBack && (
          <IconButton onClick={onBack} className={styles.backButton} title="뒤로가기">
            <ArrowBack />
          </IconButton>
        )}
        <div className={styles.characterInfo}>
          <Typography variant="h2" className={styles.romaji}>
            {character.romaji}
          </Typography>
          <Typography variant="caption" className={styles.progressText}>
            {currentIndex + 1} / {totalCount}
          </Typography>
        </div>

        <div className={styles.controls}>
          <IconButton onClick={handleSpeak} className={styles.controlButton} title="발음 듣기">
            <VolumeUp />
          </IconButton>
          <IconButton onClick={handleShowHint} className={styles.controlButton} title="획순 힌트">
            <Lightbulb />
          </IconButton>
          <IconButton onClick={handleReset} className={styles.controlButton} title="다시 시작">
            <Refresh />
          </IconButton>
        </div>
      </div>

      {/* 진행도 바 */}
      <div className={styles.progressSection}>
        <LinearProgress variant="determinate" value={progress} className={styles.progressBar} />
        <Typography variant="caption" className={styles.strokeInfo}>
          {userStrokes.length} / {character.strokeOrder?.length || 0} 획순
        </Typography>
      </div>

      {/* 캔버스 영역 */}
      <div className={styles.canvasSection}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {completionStatus.isComplete && (
          <div className={styles.completionOverlay}>
            <CheckCircle className={styles.completionIcon} />
            <Typography variant="h6">완성!</Typography>
          </div>
        )}
      </div>

      {/* 네비게이션 */}
      <div className={styles.navigation}>
        <IconButton onClick={onPrevious} disabled={!hasPrevious} className={styles.navButton}>
          <ArrowBack />
        </IconButton>

        <div className={styles.navInfo}>
          <Typography variant="body2" className={styles.characterDisplay}>
            {character.char}
          </Typography>
        </div>

        <IconButton
          onClick={onNext}
          disabled={!hasNext || (!completionStatus.isComplete && character.strokeOrder?.length > 0)}
          className={styles.navButton}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
}

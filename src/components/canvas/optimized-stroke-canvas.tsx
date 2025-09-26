"use client";

import {
  VolumeUp,
  Lightbulb,
  Refresh,
  ArrowBack,
  ArrowForward,
  PlayArrow,
  Pause,
  CheckCircle,
} from "@mui/icons-material";
import { IconButton, Typography, LinearProgress, Chip } from "@mui/material";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";

import { useMascotFeedback } from "@/components/ui/mascot/mascot-feedback";
import {
  CharacterStrokeData,
  StrokePoint,
  canvasConfig,
  audioConfig,
} from "@/mock/study-canvas-mock";
import {
  StrokeAnimationService,
  AnimationFrame,
} from "@/services/stroke-animation.service";
import { TextToSpeechService } from "@/services/text-to-speech.service";
import { CanvasUtils } from "@/utils/canvas.utils";

import styles from "./optimized-stroke-canvas.module.css";

interface OptimizedStrokeCanvasProps {
  character: CharacterStrokeData;
  onComplete?: (accuracy: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onBack?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  currentIndex?: number;
  totalCount?: number;
  autoPlay?: boolean;
  showStats?: boolean;
  className?: string;
}

// Canvas 렌더링 최적화를 위한 클래스
class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.dpr = window.devicePixelRatio || 1;
    this.setupCanvas();
  }

  private setupCanvas(): void {
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGuideLines(): void {
    const { width, height } = this.canvas;
    const centerX = width / (2 * this.dpr);
    const centerY = height / (2 * this.dpr);

    this.ctx.strokeStyle = canvasConfig.colors.guide;
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([5, 5]);

    // 십자가 가이드 라인
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, 0);
    this.ctx.lineTo(centerX, height / this.dpr);
    this.ctx.moveTo(0, centerY);
    this.ctx.lineTo(width / this.dpr, centerY);
    this.ctx.stroke();

    this.ctx.setLineDash([]);
  }

  drawCharacterGuide(character: string): void {
    const { width, height } = this.canvas;
    const fontSize = Math.min(width, height) * 0.4 / this.dpr;

    this.ctx.fillStyle = canvasConfig.colors.guide;
    this.ctx.font = `${fontSize}px "Noto Sans CJK JP", "Hiragino Sans", serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(
      character,
      width / (2 * this.dpr),
      height / (2 * this.dpr)
    );
  }

  drawStroke(points: StrokePoint[], color: string, width: number): void {
    if (points.length < 2) return;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();

    const scaledPoints = this.scalePoints(points);
    this.ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);

    if (scaledPoints.length === 2) {
      this.ctx.lineTo(scaledPoints[1].x, scaledPoints[1].y);
    } else {
      for (let i = 1; i < scaledPoints.length - 1; i++) {
        const current = scaledPoints[i];
        const next = scaledPoints[i + 1];
        const controlX = (current.x + next.x) / 2;
        const controlY = (current.y + next.y) / 2;
        this.ctx.quadraticCurveTo(current.x, current.y, controlX, controlY);
      }
      const lastPoint = scaledPoints[scaledPoints.length - 1];
      this.ctx.lineTo(lastPoint.x, lastPoint.y);
    }

    this.ctx.stroke();
  }

  drawAnimationFrame(frame: AnimationFrame, color: string): void {
    this.drawStroke(frame.points, color, canvasConfig.strokeWidth);

    // 현재 그리고 있는 지점에 점 표시
    if (frame.points.length > 0) {
      const lastPoint = frame.points[frame.points.length - 1];
      this.drawPoint(lastPoint, color, 6);
    }
  }

  drawPoint(point: StrokePoint, color: string, radius: number): void {
    const scaledPoint = this.scalePoints([point])[0];
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(scaledPoint.x, scaledPoint.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private scalePoints(points: StrokePoint[]): StrokePoint[] {
    const { width, height } = this.canvas;
    const actualWidth = width / this.dpr;
    const actualHeight = height / this.dpr;

    return points.map((point) => ({
      x: (point.x / 100) * actualWidth,
      y: (point.y / 100) * actualHeight,
    }));
  }

  resize(container: HTMLElement): void {
    const rect = container.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);

    this.canvas.width = size * this.dpr;
    this.canvas.height = size * this.dpr;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;

    this.setupCanvas();
  }
}

// 사용자 입력 처리 클래스
class InputHandler {
  private isDrawing = false;
  private currentStroke: StrokePoint[] = [];
  private renderer: CanvasRenderer;

  constructor(
    private canvas: HTMLCanvasElement,
    renderer: CanvasRenderer,
    private onStrokeComplete: (stroke: StrokePoint[]) => void
  ) {
    this.renderer = renderer;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // 마우스 이벤트
    this.canvas.addEventListener("mousedown", this.handleStart.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMove.bind(this));
    this.canvas.addEventListener("mouseup", this.handleEnd.bind(this));
    this.canvas.addEventListener("mouseleave", this.handleEnd.bind(this));

    // 터치 이벤트
    this.canvas.addEventListener("touchstart", this.handleStart.bind(this), {
      passive: false,
    });
    this.canvas.addEventListener("touchmove", this.handleMove.bind(this), {
      passive: false,
    });
    this.canvas.addEventListener("touchend", this.handleEnd.bind(this));
  }

  private handleStart(event: MouseEvent | TouchEvent): void {
    if (canvasConfig.touch.preventDefault) {
      event.preventDefault();
    }

    this.isDrawing = true;
    const point = this.getCoordinates(event);
    this.currentStroke = [point];
  }

  private handleMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDrawing) return;

    if (canvasConfig.touch.preventDefault) {
      event.preventDefault();
    }

    const point = this.getCoordinates(event);
    this.currentStroke.push(point);

    // 실시간 그리기
    this.renderer.drawStroke(
      this.currentStroke,
      canvasConfig.colors.userStroke,
      canvasConfig.strokeWidth
    );
  }

  private handleEnd(event?: MouseEvent | TouchEvent): void {
    if (!this.isDrawing || this.currentStroke.length < canvasConfig.touch.minStrokeLength) {
      this.isDrawing = false;
      this.currentStroke = [];
      return;
    }

    this.isDrawing = false;
    this.onStrokeComplete([...this.currentStroke]);
    this.currentStroke = [];
  }

  private getCoordinates(event: MouseEvent | TouchEvent): StrokePoint {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    let clientX: number, clientY: number;

    if (event instanceof TouchEvent) {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) return { x: 0, y: 0 };
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    // 0-100 범위로 정규화
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    return { x, y };
  }

  destroy(): void {
    this.canvas.removeEventListener("mousedown", this.handleStart.bind(this));
    this.canvas.removeEventListener("mousemove", this.handleMove.bind(this));
    this.canvas.removeEventListener("mouseup", this.handleEnd.bind(this));
    this.canvas.removeEventListener("mouseleave", this.handleEnd.bind(this));
    this.canvas.removeEventListener("touchstart", this.handleStart.bind(this));
    this.canvas.removeEventListener("touchmove", this.handleMove.bind(this));
    this.canvas.removeEventListener("touchend", this.handleEnd.bind(this));
  }
}

const OptimizedStrokeCanvas: React.FC<OptimizedStrokeCanvasProps> = memo(({
  character,
  onComplete,
  onNext,
  onPrevious,
  onBack,
  hasNext = false,
  hasPrevious = false,
  currentIndex = 0,
  totalCount = 1,
  autoPlay = false,
  showStats = true,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const inputHandlerRef = useRef<InputHandler | null>(null);
  const animationServiceRef = useRef<StrokeAnimationService | null>(null);
  const ttsServiceRef = useRef<TextToSpeechService | null>(null);

  // 상태 관리
  const [userStrokes, setUserStrokes] = useState<StrokePoint[][]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedStrokes, setCompletedStrokes] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const { feedback, showFeedback } = useMascotFeedback();

  // 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 렌더러 초기화
    rendererRef.current = new CanvasRenderer(canvas);
    rendererRef.current.resize(container);

    // 애니메이션 서비스 초기화
    animationServiceRef.current = new StrokeAnimationService();

    // TTS 서비스 초기화
    ttsServiceRef.current = new TextToSpeechService();

    // 입력 핸들러 초기화
    inputHandlerRef.current = new InputHandler(
      canvas,
      rendererRef.current,
      handleStrokeComplete
    );

    // 리사이즈 이벤트 리스너
    const handleResize = () => {
      if (rendererRef.current && container) {
        rendererRef.current.resize(container);
        redrawCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      inputHandlerRef.current?.destroy();
      animationServiceRef.current?.destroy();
    };
  }, []);

  // 캔버스 다시 그리기
  const redrawCanvas = useCallback(() => {
    if (!rendererRef.current) return;

    rendererRef.current.clear();
    rendererRef.current.drawGuideLines();
    rendererRef.current.drawCharacterGuide(character.char);

    // 사용자가 그린 획순들 그리기
    userStrokes.forEach((stroke, index) => {
      const color = index < character.strokeCount
        ? canvasConfig.colors.correctStroke
        : canvasConfig.colors.incorrectStroke;
      rendererRef.current!.drawStroke(stroke, color, canvasConfig.strokeWidth);
    });
  }, [character.char, character.strokeCount, userStrokes]);

  // 캐릭터 변경 시 초기화
  useEffect(() => {
    setUserStrokes([]);
    setCompletedStrokes(0);
    setAccuracy(0);
    setIsCompleted(false);
    redrawCanvas();

    // 자동 음성 재생
    if (autoPlay && ttsServiceRef.current) {
      setTimeout(() => {
        handleSpeak();
      }, audioConfig.pronunciationDelay);
    }
  }, [character.char, autoPlay, redrawCanvas]);

  // 획순 완료 처리
  const handleStrokeComplete = useCallback((stroke: StrokePoint[]) => {
    const newUserStrokes = [...userStrokes, stroke];
    setUserStrokes(newUserStrokes);

    const strokeIndex = newUserStrokes.length - 1;

    if (strokeIndex < character.strokeCount) {
      // 정확도 계산 (간단한 구현)
      const correctStroke = character.strokes[strokeIndex];
      const strokeAccuracy = calculateStrokeAccuracy(stroke, correctStroke);

      if (strokeAccuracy > 0.6) {
        setCompletedStrokes(prev => prev + 1);
        showFeedback("success", `${strokeIndex + 1}번째 획순 완료!`);
      } else {
        showFeedback("error", "다시 시도해보세요");
      }

      // 전체 완성도 체크
      if (newUserStrokes.length === character.strokeCount) {
        const totalAccuracy = newUserStrokes.reduce((acc, userStroke, idx) => {
          return acc + calculateStrokeAccuracy(userStroke, character.strokes[idx]);
        }, 0) / character.strokeCount;

        setAccuracy(Math.round(totalAccuracy * 100));
        setIsCompleted(true);
        showFeedback("celebrating", `완성! 정확도: ${Math.round(totalAccuracy * 100)}%`);
        onComplete?.(totalAccuracy);
      }
    }

    redrawCanvas();
  }, [userStrokes, character, showFeedback, onComplete, redrawCanvas]);

  // 간단한 획순 정확도 계산
  const calculateStrokeAccuracy = (userStroke: StrokePoint[], correctStroke: StrokePoint[]): number => {
    if (userStroke.length < 2 || correctStroke.length < 2) return 0;

    // 시작점과 끝점 비교
    const startDistance = Math.sqrt(
      Math.pow(userStroke[0].x - correctStroke[0].x, 2) +
      Math.pow(userStroke[0].y - correctStroke[0].y, 2)
    );

    const endDistance = Math.sqrt(
      Math.pow(userStroke[userStroke.length - 1].x - correctStroke[correctStroke.length - 1].x, 2) +
      Math.pow(userStroke[userStroke.length - 1].y - correctStroke[correctStroke.length - 1].y, 2)
    );

    const maxDistance = 20; // 허용 오차
    const startAccuracy = Math.max(0, 1 - startDistance / maxDistance);
    const endAccuracy = Math.max(0, 1 - endDistance / maxDistance);

    return (startAccuracy + endAccuracy) / 2;
  };

  // 애니메이션 시작
  const handleShowAnimation = useCallback(() => {
    if (!animationServiceRef.current || isAnimating) return;

    setIsAnimating(true);
    redrawCanvas();

    animationServiceRef.current.startAnimation(
      character,
      (frame: AnimationFrame) => {
        redrawCanvas();
        if (rendererRef.current) {
          rendererRef.current.drawAnimationFrame(frame, canvasConfig.colors.hint);
        }
      },
      () => {
        setIsAnimating(false);
        redrawCanvas();
      },
      { duration: canvasConfig.animationDuration, delay: canvasConfig.hintDelay }
    );
  }, [character, isAnimating, redrawCanvas]);

  // 음성 재생
  const handleSpeak = useCallback(() => {
    if (!ttsServiceRef.current) return;

    ttsServiceRef.current.speak(character.char, {
      onError: (error) => {
        showFeedback("error", "음성 재생에 실패했습니다");
        console.error("TTS Error:", error);
      },
    });
  }, [character.char, showFeedback]);

  // 초기화
  const handleReset = useCallback(() => {
    setUserStrokes([]);
    setCompletedStrokes(0);
    setAccuracy(0);
    setIsCompleted(false);
    animationServiceRef.current?.stopAnimation();
    setIsAnimating(false);
    redrawCanvas();
  }, [redrawCanvas]);

  // 진행도 계산
  const progress = useMemo(() => {
    return character.strokeCount > 0 ? (completedStrokes / character.strokeCount) * 100 : 0;
  }, [completedStrokes, character.strokeCount]);

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
          <IconButton
            onClick={handleShowAnimation}
            disabled={isAnimating}
            className={styles.controlButton}
            title="획순 힌트"
          >
            {isAnimating ? <Pause /> : <Lightbulb />}
          </IconButton>
          <IconButton onClick={handleReset} className={styles.controlButton} title="다시 시작">
            <Refresh />
          </IconButton>
        </div>
      </div>

      {/* 통계 정보 */}
      {showStats && (
        <div className={styles.statsSection}>
          <div className={styles.statsChips}>
            <Chip
              label={`난이도: ${character.difficulty}`}
              color={character.difficulty === 'easy' ? 'success' : character.difficulty === 'medium' ? 'warning' : 'error'}
              size="small"
            />
            <Chip
              label={`연습: ${character.practiceCount}회`}
              variant="outlined"
              size="small"
            />
            {character.accuracy > 0 && (
              <Chip
                label={`최고 정확도: ${character.accuracy}%`}
                color="primary"
                size="small"
              />
            )}
          </div>
        </div>
      )}

      {/* 진행도 바 */}
      <div className={styles.progressSection}>
        <LinearProgress variant="determinate" value={progress} className={styles.progressBar} />
        <Typography variant="caption" className={styles.strokeInfo}>
          {completedStrokes} / {character.strokeCount} 획순 ({progress.toFixed(0)}%)
        </Typography>
      </div>

      {/* 캔버스 영역 */}
      <div className={styles.canvasSection}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {isCompleted && (
          <div className={styles.completionOverlay}>
            <CheckCircle className={styles.completionIcon} />
            <Typography variant="h6" className={styles.completionText}>
              완성!
            </Typography>
            <Typography variant="body2" className={styles.accuracyText}>
              정확도: {accuracy}%
            </Typography>
          </div>
        )}
      </div>

      {/* 네비게이션 */}
      <div className={styles.navigation}>
        <IconButton
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={styles.navButton}
          title="이전 문자"
        >
          <ArrowBack />
        </IconButton>

        <div className={styles.navInfo}>
          <Typography variant="h1" className={styles.characterDisplay}>
            {character.char}
          </Typography>
          <Typography variant="caption" className={styles.characterType}>
            {character.type}
          </Typography>
        </div>

        <IconButton
          onClick={onNext}
          disabled={!hasNext || (!isCompleted && character.strokeCount > 0)}
          className={styles.navButton}
          title="다음 문자"
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
});

OptimizedStrokeCanvas.displayName = "OptimizedStrokeCanvas";

export default OptimizedStrokeCanvas;
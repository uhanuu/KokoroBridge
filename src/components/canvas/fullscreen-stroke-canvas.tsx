"use client";

// Material UI 아이콘들은 FullscreenCanvasHeader에서 사용하므로 제거
import { Typography, LinearProgress } from "@mui/material";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";

import FullscreenCanvasHeader from "@/components/ui/header/fullscreen-canvas-header";
import ScoreFeedback from "@/components/ui/feedback/score-feedback";
import {
  CharacterStrokeData,
  StrokePoint,
  canvasConfig,
} from "@/mock/study-canvas-mock";
import {
  StrokeAnimationService,
  AnimationFrame,
} from "@/services/stroke-animation.service";
import { TextToSpeechService } from "@/services/text-to-speech.service";

import styles from "./fullscreen-stroke-canvas.module.css";

interface FullscreenStrokeCanvasProps {
  character: CharacterStrokeData;
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

// Canvas 렌더링 클래스
class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Cannot get 2D context from canvas");
    }
    this.ctx = ctx;
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
    this.ctx.setLineDash([8, 8]);

    // 십자가 점선 가이드
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
    const fontSize = Math.min(width, height) * 0.5 / this.dpr;

    this.ctx.fillStyle = canvasConfig.colors.guide;
    this.ctx.globalAlpha = canvasConfig.guideOpacity;
    this.ctx.font = `${fontSize}px "Noto Sans CJK JP", "Hiragino Sans", serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(
      character,
      width / (2 * this.dpr),
      height / (2 * this.dpr)
    );

    this.ctx.globalAlpha = 1;
  }

  drawStroke(points: StrokePoint[], color: string, width: number): void {
    if (points.length < 2) return;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();

    const scaledPoints = this.scalePoints(points);
    if (scaledPoints.length < 1) return;

    const firstPoint = scaledPoints[0];
    if (!firstPoint) return;
    this.ctx.moveTo(firstPoint.x, firstPoint.y);

    if (scaledPoints.length === 2) {
      const secondPoint = scaledPoints[1];
      if (secondPoint) {
        this.ctx.lineTo(secondPoint.x, secondPoint.y);
      }
    } else {
      for (let i = 1; i < scaledPoints.length - 1; i++) {
        const current = scaledPoints[i];
        const next = scaledPoints[i + 1];
        if (current && next) {
          const controlX = (current.x + next.x) / 2;
          const controlY = (current.y + next.y) / 2;
          this.ctx.quadraticCurveTo(current.x, current.y, controlX, controlY);
        }
      }
      const lastPoint = scaledPoints[scaledPoints.length - 1];
      if (lastPoint) {
        this.ctx.lineTo(lastPoint.x, lastPoint.y);
      }
    }

    this.ctx.stroke();
  }

  drawAnimationFrame(frame: AnimationFrame, color: string): void {
    this.drawStroke(frame.points, color, canvasConfig.strokeWidth + 1);

    // 현재 그리고 있는 지점에 점 표시
    if (frame.points.length > 0) {
      const lastPoint = frame.points[frame.points.length - 1];
      if (lastPoint) {
        this.drawPoint(lastPoint, color, 8);
      }
    }
  }

  drawPoint(point: StrokePoint, color: string, radius: number): void {
    const scaledPoints = this.scalePoints([point]);
    const scaledPoint = scaledPoints[0];
    if (!scaledPoint) return;

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

// 입력 처리 클래스
class InputHandler {
  private isDrawing = false;
  private currentStroke: StrokePoint[] = [];
  private usingTouch = false;
  private isDestroyed = false;

  private boundHandleStart = this.handleStart.bind(this);
  private boundHandleMove = this.handleMove.bind(this);
  private boundHandleEnd = this.handleEnd.bind(this);

  constructor(
    private canvas: HTMLCanvasElement,
    _renderer: CanvasRenderer,
    private onStrokeComplete: (stroke: StrokePoint[]) => void,
    private onStrokeUpdate: (stroke: StrokePoint[]) => void
  ) {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.canvas.addEventListener("mousedown", this.boundHandleStart);
    this.canvas.addEventListener("mousemove", this.boundHandleMove);
    this.canvas.addEventListener("mouseup", this.boundHandleEnd);
    this.canvas.addEventListener("mouseleave", this.boundHandleEnd);

    this.canvas.addEventListener("touchstart", this.boundHandleStart, {
      passive: false,
    });
    this.canvas.addEventListener("touchmove", this.boundHandleMove, {
      passive: false,
    });
    this.canvas.addEventListener("touchend", this.boundHandleEnd);
  }

  private handleStart(event: MouseEvent | TouchEvent): void {
    if (this.isDestroyed) return;
    event.preventDefault();

    if (event instanceof TouchEvent) {
      this.usingTouch = true;
    } else if (this.usingTouch) {
      return;
    }

    this.isDrawing = true;
    const point = this.getCoordinates(event);
    this.currentStroke = [point];
  }

  private handleMove(event: MouseEvent | TouchEvent): void {
    if (this.isDestroyed || !this.isDrawing) return;
    event.preventDefault();

    if (!(event instanceof TouchEvent) && this.usingTouch) {
      return;
    }

    const point = this.getCoordinates(event);
    this.currentStroke.push(point);

    this.onStrokeUpdate([...this.currentStroke]);
  }

  private handleEnd(event?: MouseEvent | TouchEvent): void {
    if (this.isDestroyed || !this.isDrawing) {
      return;
    }

    if (event && !(event instanceof TouchEvent) && this.usingTouch) {
      return;
    }

    if (this.currentStroke.length < canvasConfig.touch.minStrokeLength) {
      this.isDrawing = false;
      this.currentStroke = [];
      if (event instanceof TouchEvent) {
        this.usingTouch = false;
      }
      return;
    }

    this.isDrawing = false;
    this.onStrokeComplete([...this.currentStroke]);
    this.currentStroke = [];

    if (event instanceof TouchEvent) {
      this.usingTouch = false;
    }
  }

  private getCoordinates(event: MouseEvent | TouchEvent): StrokePoint {
    const rect = this.canvas.getBoundingClientRect();

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

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    return { x, y };
  }

  destroy(): void {
    if (this.isDestroyed) return;

    this.isDestroyed = true;
    this.isDrawing = false;

    this.canvas.removeEventListener("mousedown", this.boundHandleStart);
    this.canvas.removeEventListener("mousemove", this.boundHandleMove);
    this.canvas.removeEventListener("mouseup", this.boundHandleEnd);
    this.canvas.removeEventListener("mouseleave", this.boundHandleEnd);
    this.canvas.removeEventListener("touchstart", this.boundHandleStart);
    this.canvas.removeEventListener("touchmove", this.boundHandleMove);
    this.canvas.removeEventListener("touchend", this.boundHandleEnd);
  }
}

const FullscreenStrokeCanvas: React.FC<FullscreenStrokeCanvasProps> = memo(({
  character,
  onComplete,
  onNext,
  onPrevious: _onPrevious,
  onBack,
  hasNext = false,
  hasPrevious: _hasPrevious = false,
  currentIndex = 0,
  totalCount = 1,
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
  const [currentDrawingStroke, setCurrentDrawingStroke] = useState<StrokePoint[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showScoreFeedback, setShowScoreFeedback] = useState(false);
  const [finalAccuracy, setFinalAccuracy] = useState(0);


  // 초기화 (한 번만 실행)
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 기존 핸들러들 정리 (중복 방지)
    if (inputHandlerRef.current) {
      inputHandlerRef.current.destroy();
    }
    if (animationServiceRef.current) {
      animationServiceRef.current.destroy();
    }
    if (ttsServiceRef.current) {
      ttsServiceRef.current.stop();
    }

    // 렌더러 초기화
    rendererRef.current = new CanvasRenderer(canvas);
    rendererRef.current.resize(container);

    // 애니메이션 서비스 초기화
    animationServiceRef.current = new StrokeAnimationService();

    // TTS 서비스 초기화
    ttsServiceRef.current = new TextToSpeechService();

    // 리사이즈 이벤트 리스너
    const handleResize = () => {
      if (rendererRef.current && container) {
        rendererRef.current.resize(container);
        // 상태를 강제 업데이트하여 리렌더링 트리거
        setUserStrokes(prev => [...prev]);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (inputHandlerRef.current) {
        inputHandlerRef.current.destroy();
      }
      if (animationServiceRef.current) {
        animationServiceRef.current.destroy();
      }
      if (ttsServiceRef.current) {
        ttsServiceRef.current.stop();
      }
    };
  }, []);


  // 캔버스 기본 그리기 (가이드라인과 문자만)
  const drawCanvasBase = useCallback(() => {
    if (!rendererRef.current) return;

    rendererRef.current.clear();
    rendererRef.current.drawGuideLines();
    rendererRef.current.drawCharacterGuide(character.char);
  }, [character.char]);

  // 캐릭터 변경 시 초기화
  useEffect(() => {
    setUserStrokes([]);
    setCurrentDrawingStroke([]);
    setShowScoreFeedback(false);
    setFinalAccuracy(0);
    drawCanvasBase();

    // 이전 음성 완전히 중지
    if (ttsServiceRef.current) {
      ttsServiceRef.current.stop();
    }

    // 일본어만 재생 (로마지 제거)
    const playAudio = async () => {
      try {
        if (ttsServiceRef.current) {
          await ttsServiceRef.current.speak(character.char, {
            onError: (_error) => {
              // TTS 에러 무시
            }
          });
        }
      } catch (_error) {
        // TTS 에러 무시
      }
    };

    const audioTimeout = setTimeout(playAudio, 200);
    return () => clearTimeout(audioTimeout);
  }, [character.char, drawCanvasBase]);

  // 완성된 획순들만 그리기 (효율성을 위해 분리)
  const redrawCompleteStrokes = useCallback(() => {
    if (!rendererRef.current) return;

    drawCanvasBase();

    // 완성된 획순들 그리기
    userStrokes.forEach((stroke) => {
      if (rendererRef.current) {
        rendererRef.current.drawStroke(stroke, canvasConfig.colors.userStroke, canvasConfig.strokeWidth);
      }
    });
  }, [userStrokes, drawCanvasBase]);

  // 완성된 획순 상태 변경 시에만 전체 다시 그리기
  useEffect(() => {
    redrawCompleteStrokes();
  }, [redrawCompleteStrokes]);

  // 현재 그리고 있는 획 실시간 업데이트 (전체 다시 그리지 않음)
  useEffect(() => {
    if (!rendererRef.current || currentDrawingStroke.length === 0) return;

    // 기존 완성된 획들과 가이드라인 먼저 그리기
    redrawCompleteStrokes();

    // 현재 그리고 있는 획만 추가로 그리기
    rendererRef.current.drawStroke(currentDrawingStroke, canvasConfig.colors.userStroke, canvasConfig.strokeWidth + 2);
  }, [currentDrawingStroke, redrawCompleteStrokes]);

  // 실시간 획순 업데이트 - 상태 기반으로 단순화
  const handleStrokeUpdate = useCallback((stroke: StrokePoint[]) => {
    setCurrentDrawingStroke(stroke);
  }, []);

  // 획순 완료 처리 - 비동기 상태 업데이트로 렌더링 충돌 방지
  const handleStrokeComplete = useCallback((stroke: StrokePoint[]) => {
    setUserStrokes(prev => {
      const newUserStrokes = [...prev, stroke];

      // 마지막 획순이 완성된 경우 비동기로 완료 처리
      if (newUserStrokes.length === character.strokeCount) {
        // 다음 렌더 사이클에서 완료 처리
        setTimeout(() => {
          const accuracy = Math.max(70, Math.min(100, 85 + Math.random() * 10));
          setFinalAccuracy(Math.round(accuracy));
          setShowScoreFeedback(true);

          // TTS 에러 처리 안전화
          try {
            if (ttsServiceRef.current) {
              const message = accuracy >= 90 ? "완벽해요!" : accuracy >= 80 ? "잘했어요!" : "성공했습니다!";
              ttsServiceRef.current.speak(message);
            }
          } catch (_error) {
            // TTS 에러 무시
          }

          // 부모 컴포넌트에 완료 알림도 비동기로 처리
          setTimeout(() => {
            onComplete?.(accuracy / 100);
          }, 0);
        }, 0);
      }

      return newUserStrokes;
    });
    setCurrentDrawingStroke([]);
  }, [character.strokeCount, onComplete]);

  // 애니메이션 시작/중지
  const handleToggleAnimation = useCallback(() => {
    if (!animationServiceRef.current || !character.strokes || character.strokes.length === 0) {
      // 애니메이션 데이터가 없는 경우 조용히 무시
      return;
    }

    if (isAnimating) {
      animationServiceRef.current.stopAnimation();
      setIsAnimating(false);
      drawCanvasBase();
    } else {
      setIsAnimating(true);

      // 각 획순을 순차적으로 애니메이션
      let currentStrokeIndex = 0;

      const animateNextStroke = () => {
        if (currentStrokeIndex >= character.strokes.length || !rendererRef.current) {
          setIsAnimating(false);
          drawCanvasBase();
          return;
        }

        const currentStroke = character.strokes[currentStrokeIndex];
        if (!currentStroke) {
          currentStrokeIndex++;
          animateNextStroke();
          return;
        }

        if (animationServiceRef.current) {
          animationServiceRef.current.animateStroke(
            currentStroke,
            (points: StrokePoint[]) => {
              drawCanvasBase();
              if (rendererRef.current) {
                // 이전 획순들 그리기
                for (let i = 0; i < currentStrokeIndex; i++) {
                  const prevStroke = character.strokes[i];
                  if (prevStroke) {
                    rendererRef.current.drawStroke(
                      prevStroke,
                      canvasConfig.colors.hint,
                      canvasConfig.strokeWidth
                    );
                  }
                }
                // 현재 애니메이션 중인 획순 그리기
                rendererRef.current.drawStroke(points, canvasConfig.colors.hint, canvasConfig.strokeWidth + 1);
              }
            },
            () => {
              currentStrokeIndex++;
              animateNextStroke(); // 지연 없이 다음 획순 실행
            },
            1500 // 각 획순당 1.5초
          );
        }
      };

      animateNextStroke();
    }
  }, [character, isAnimating, drawCanvasBase]);

  // 음성 재생 - 일본어만
  const handleSpeak = useCallback(async () => {
    try {
      if (ttsServiceRef.current) {
        // 기존 음성 중지
        ttsServiceRef.current.stop();

        await ttsServiceRef.current.speak(character.char, {
          onError: (_error) => {
            // TTS 에러 무시
          }
        });
      }
    } catch (_error) {
      // TTS 에러 무시
    }
  }, [character.char]);

  // 초기화
  const handleReset = useCallback(() => {
    setUserStrokes([]);
    setCurrentDrawingStroke([]);
    setShowScoreFeedback(false);
    setFinalAccuracy(0);
    animationServiceRef.current?.stopAnimation();
    setIsAnimating(false);
    drawCanvasBase();
  }, [drawCanvasBase]);

  // 점수 피드백 닫기
  const handleCloseFeedback = useCallback(() => {
    setShowScoreFeedback(false);
    // 다음 문자가 있으면 자동으로 이동
    if (hasNext && onNext) {
      onNext();
    }
  }, [hasNext, onNext]);

  // 진행도 계산
  const progress = useMemo(() => {
    return character.strokeCount > 0 ? (userStrokes.length / character.strokeCount) * 100 : 0;
  }, [userStrokes.length, character.strokeCount]);

  // 입력 핸들러 초기화 (핸들러 함수들이 준비된 후 실행)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !rendererRef.current) return;

    // 기존 입력 핸들러 정리
    if (inputHandlerRef.current) {
      inputHandlerRef.current.destroy();
    }

    // 새로운 입력 핸들러 생성
    inputHandlerRef.current = new InputHandler(
      canvas,
      rendererRef.current,
      handleStrokeComplete,
      handleStrokeUpdate
    );

    return () => {
      if (inputHandlerRef.current) {
        inputHandlerRef.current.destroy();
      }
    };
  }, [handleStrokeComplete, handleStrokeUpdate]);

  return (
    <div className={`${styles.container} ${className}`}>
      <FullscreenCanvasHeader
        romaji={character.romaji}
        currentIndex={currentIndex}
        totalCount={totalCount}
        isAnimating={isAnimating}
        onBack={onBack}
        onSpeak={handleSpeak}
        onToggleAnimation={handleToggleAnimation}
        onReset={handleReset}
      />

      {/* 진행도 바 */}
      <div className={styles.progressSection}>
        <LinearProgress
          variant="determinate"
          value={progress}
          className={styles.progressBar}
        />
        <Typography variant="caption" className={styles.strokeInfo}>
          {userStrokes.length} / {character.strokeCount} 획순
        </Typography>
      </div>

      {/* 캔버스 영역 */}
      <div ref={containerRef} className={styles.canvasSection}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      {/* 점수 피드백 */}
      <ScoreFeedback
        isOpen={showScoreFeedback}
        accuracy={finalAccuracy}
        character={character.char}
        onClose={handleCloseFeedback}
        autoCloseDelay={2500}
      />
    </div>
  );
});

FullscreenStrokeCanvas.displayName = "FullscreenStrokeCanvas";

export default FullscreenStrokeCanvas;
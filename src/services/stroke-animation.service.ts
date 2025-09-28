import { StrokePoint, CharacterStrokeData } from "@/mock/study-canvas-mock";

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}

export interface AnimationFrame {
  strokeIndex: number;
  progress: number;
  points: StrokePoint[];
  timestamp: number;
}

export class StrokeAnimationService {
  private animationId: number | null = null;
  private isPlaying = false;
  private currentFrame = 0;
  private startTime = 0;

  private defaultConfig: AnimationConfig = {
    duration: 2000,
    delay: 500,
    easing: 'easeOut'
  };

  /**
   * 획순 애니메이션 시작
   */
  startAnimation(
    characterData: CharacterStrokeData,
    onFrame: (frame: AnimationFrame) => void,
    onComplete: () => void,
    config?: Partial<AnimationConfig>
  ): void {
    if (this.isPlaying) {
      this.stopAnimation();
    }

    const animConfig = { ...this.defaultConfig, ...config };
    this.isPlaying = true;
    this.currentFrame = 0;
    this.startTime = performance.now();

    const animate = (timestamp: number) => {
      if (!this.isPlaying) return;

      const elapsed = timestamp - this.startTime;
      // const totalDuration = animConfig.duration + (animConfig.delay * characterData.strokeCount);

      if (elapsed < animConfig.delay) {
        // 시작 지연
        this.animationId = requestAnimationFrame(animate);
        return;
      }

      const animationProgress = Math.min((elapsed - animConfig.delay) / animConfig.duration, 1);
      const easedProgress = this.applyEasing(animationProgress, animConfig.easing);

      // 현재 그려야 할 획 계산
      const totalStrokes = characterData.strokeCount;
      const currentStrokeFloat = easedProgress * totalStrokes;
      const currentStrokeIndex = Math.floor(currentStrokeFloat);
      const strokeProgress = currentStrokeFloat - currentStrokeIndex;

      if (currentStrokeIndex < totalStrokes) {
        const currentStroke = characterData.strokes[currentStrokeIndex];
        if (!currentStroke) return;
        const pointCount = Math.floor(strokeProgress * currentStroke.length);
        const visiblePoints = currentStroke.slice(0, Math.max(1, pointCount));

        const frame: AnimationFrame = {
          strokeIndex: currentStrokeIndex,
          progress: strokeProgress,
          points: visiblePoints,
          timestamp
        };

        onFrame(frame);
      }

      if (animationProgress >= 1) {
        this.stopAnimation();
        onComplete();
      } else {
        this.animationId = requestAnimationFrame(animate);
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  /**
   * 애니메이션 중지
   */
  stopAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isPlaying = false;
  }

  /**
   * 애니메이션 일시정지
   */
  pauseAnimation(): void {
    this.isPlaying = false;
  }

  /**
   * 애니메이션 재개
   */
  resumeAnimation(): void {
    this.isPlaying = true;
  }

  /**
   * 현재 애니메이션 상태 확인
   */
  isAnimating(): boolean {
    return this.isPlaying;
  }

  /**
   * Easing 함수 적용
   */
  private applyEasing(progress: number, easing: AnimationConfig['easing']): number {
    switch (easing) {
      case 'linear':
        return progress;
      case 'easeIn':
        return progress * progress;
      case 'easeOut':
        return 1 - Math.pow(1 - progress, 2);
      case 'easeInOut':
        return progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      default:
        return progress;
    }
  }

  /**
   * 획순별 애니메이션 프레임 생성
   */
  generateFrames(
    characterData: CharacterStrokeData,
    frameRate = 60
  ): AnimationFrame[] {
    const frames: AnimationFrame[] = [];
    const frameDuration = 1000 / frameRate;
    const totalDuration = this.defaultConfig.duration;
    const totalFrames = Math.ceil(totalDuration / frameDuration);

    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
      const progress = frameIndex / totalFrames;
      const currentStrokeFloat = progress * characterData.strokeCount;
      const currentStrokeIndex = Math.floor(currentStrokeFloat);
      const strokeProgress = currentStrokeFloat - currentStrokeIndex;

      if (currentStrokeIndex < characterData.strokeCount) {
        const currentStroke = characterData.strokes[currentStrokeIndex];
        if (!currentStroke) continue;
        const pointCount = Math.floor(strokeProgress * currentStroke.length);
        const visiblePoints = currentStroke.slice(0, Math.max(1, pointCount));

        frames.push({
          strokeIndex: currentStrokeIndex,
          progress: strokeProgress,
          points: visiblePoints,
          timestamp: frameIndex * frameDuration
        });
      }
    }

    return frames;
  }

  /**
   * 부분 애니메이션 (특정 획만)
   */
  animateStroke(
    stroke: StrokePoint[],
    onFrame: (points: StrokePoint[]) => void,
    onComplete: () => void,
    duration = 1000
  ): void {
    if (this.isPlaying) {
      this.stopAnimation();
    }

    this.isPlaying = true;
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      if (!this.isPlaying) return;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = this.applyEasing(progress, 'easeOut');

      const pointCount = Math.floor(easedProgress * stroke.length);
      const visiblePoints = stroke.slice(0, Math.max(1, pointCount));

      onFrame(visiblePoints);

      if (progress >= 1) {
        this.stopAnimation();
        onComplete();
      } else {
        this.animationId = requestAnimationFrame(animate);
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  /**
   * 리소스 정리
   */
  destroy(): void {
    this.stopAnimation();
  }
}
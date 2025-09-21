export interface Point {
  x: number;
  y: number;
  timestamp?: number;
}

export interface Stroke {
  points: Point[];
  completed: boolean;
}

export interface CharacterData {
  char: string;
  romaji: string;
  completed: boolean;
  strokeOrder: string[];
  strokePoints: Point[][];
}

export interface StrokeValidationResult {
  isValid: boolean;
  accuracy: number;
  currentStroke: number;
  totalStrokes: number;
  feedback: string;
}

export class StrokeOrderEngine {
  private readonly STROKE_TOLERANCE = 30;
  private readonly MIN_STROKE_LENGTH = 10;
  private readonly DIRECTION_TOLERANCE = 45;

  /**
   * 사용자가 그린 획순과 정답 획순을 비교하여 검증
   */
  validateStroke(
    userStroke: Point[],
    correctStroke: Point[],
    strokeIndex: number
  ): StrokeValidationResult {
    if (userStroke.length < 2) {
      return {
        isValid: false,
        accuracy: 0,
        currentStroke: strokeIndex,
        totalStrokes: 1,
        feedback: "획을 더 그려주세요"
      };
    }

    const accuracy = this.calculateStrokeAccuracy(userStroke, correctStroke);
    const isValid = accuracy >= 0.6; // 60% 이상 정확도

    return {
      isValid,
      accuracy,
      currentStroke: strokeIndex,
      totalStrokes: 1,
      feedback: isValid
        ? "잘했어요!"
        : accuracy >= 0.3
          ? "조금 더 정확하게 그려보세요"
          : "다시 시도해보세요"
    };
  }

  /**
   * 획순의 정확도를 계산 (0-1 범위)
   */
  private calculateStrokeAccuracy(userStroke: Point[], correctStroke: Point[]): number {
    const positionAccuracy = this.calculatePositionAccuracy(userStroke, correctStroke);
    const directionAccuracy = this.calculateDirectionAccuracy(userStroke, correctStroke);
    const lengthAccuracy = this.calculateLengthAccuracy(userStroke, correctStroke);

    // 가중 평균 계산
    return (positionAccuracy * 0.5) + (directionAccuracy * 0.3) + (lengthAccuracy * 0.2);
  }

  /**
   * 위치 정확도 계산
   */
  private calculatePositionAccuracy(userStroke: Point[], correctStroke: Point[]): number {
    const userNormalized = this.normalizeStroke(userStroke);
    const correctNormalized = this.normalizeStroke(correctStroke);

    let totalDistance = 0;
    const pointCount = Math.min(userNormalized.length, correctNormalized.length);

    for (let i = 0; i < pointCount; i++) {
      const userPoint = userNormalized[i];
      const correctPoint = correctNormalized[i];
      const distance = this.calculateDistance(userPoint, correctPoint);
      totalDistance += Math.min(distance, this.STROKE_TOLERANCE);
    }

    const avgDistance = totalDistance / pointCount;
    return Math.max(0, 1 - (avgDistance / this.STROKE_TOLERANCE));
  }

  /**
   * 방향 정확도 계산
   */
  private calculateDirectionAccuracy(userStroke: Point[], correctStroke: Point[]): number {
    const userDirection = this.calculateStrokeDirection(userStroke);
    const correctDirection = this.calculateStrokeDirection(correctStroke);

    const angleDiff = Math.abs(userDirection - correctDirection);
    const normalizedAngleDiff = Math.min(angleDiff, 360 - angleDiff);

    return Math.max(0, 1 - (normalizedAngleDiff / this.DIRECTION_TOLERANCE));
  }

  /**
   * 길이 정확도 계산
   */
  private calculateLengthAccuracy(userStroke: Point[], correctStroke: Point[]): number {
    const userLength = this.calculateStrokeLength(userStroke);
    const correctLength = this.calculateStrokeLength(correctStroke);

    if (correctLength === 0) return 1;

    const lengthRatio = userLength / correctLength;
    return Math.max(0, 1 - Math.abs(1 - lengthRatio));
  }

  /**
   * 획순 정규화 (점의 개수를 동일하게 맞춤)
   */
  private normalizeStroke(stroke: Point[], targetPoints: number = 20): Point[] {
    if (stroke.length <= 1) return stroke;

    const totalLength = this.calculateStrokeLength(stroke);
    const segmentLength = totalLength / (targetPoints - 1);
    const normalized: Point[] = [stroke[0]];

    let currentLength = 0;
    let currentIndex = 0;

    for (let i = 1; i < targetPoints; i++) {
      const targetLength = i * segmentLength;

      while (currentIndex < stroke.length - 1 && currentLength < targetLength) {
        const segLength = this.calculateDistance(stroke[currentIndex], stroke[currentIndex + 1]);
        currentLength += segLength;
        currentIndex++;
      }

      if (currentIndex < stroke.length) {
        normalized.push(stroke[currentIndex]);
      }
    }

    return normalized;
  }

  /**
   * 획순의 주요 방향 계산 (각도)
   */
  private calculateStrokeDirection(stroke: Point[]): number {
    if (stroke.length < 2) return 0;

    const start = stroke[0];
    const end = stroke[stroke.length - 1];

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  /**
   * 획순의 총 길이 계산
   */
  private calculateStrokeLength(stroke: Point[]): number {
    let length = 0;
    for (let i = 1; i < stroke.length; i++) {
      length += this.calculateDistance(stroke[i - 1], stroke[i]);
    }
    return length;
  }

  /**
   * 두 점 사이의 거리 계산
   */
  private calculateDistance(point1: Point, point2: Point): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * 획순 힌트 애니메이션 생성
   */
  generateStrokeHint(strokePath: string, canvasSize: { width: number; height: number }): {
    path: string;
    duration: number;
    delay: number;
  } {
    // SVG path를 캔버스 크기에 맞게 스케일링
    const scaledPath = this.scalePathToCanvas(strokePath, canvasSize);

    return {
      path: scaledPath,
      duration: 2000, // 2초 동안 애니메이션
      delay: 500      // 0.5초 지연
    };
  }

  /**
   * SVG path를 캔버스 크기에 맞게 스케일링
   */
  private scalePathToCanvas(path: string, canvasSize: { width: number; height: number }): string {
    // 기본 좌표계 (100x100)에서 실제 캔버스 크기로 변환
    const scaleX = canvasSize.width / 100;
    const scaleY = canvasSize.height / 100;

    return path.replace(/(\d+\.?\d*)/g, (match, number) => {
      const num = parseFloat(number);
      // X, Y 좌표를 구분하여 스케일링 (간단한 구현)
      return (num * Math.min(scaleX, scaleY)).toFixed(1);
    });
  }

  /**
   * 전체 문자의 완성도 체크
   */
  validateCharacterCompletion(
    userStrokes: Point[][],
    correctCharacter: CharacterData
  ): {
    isComplete: boolean;
    accuracy: number;
    completedStrokes: number;
    feedback: string;
  } {
    const totalStrokes = correctCharacter.strokeOrder.length;
    let completedStrokes = 0;
    let totalAccuracy = 0;

    for (let i = 0; i < Math.min(userStrokes.length, totalStrokes); i++) {
      const validation = this.validateStroke(
        userStrokes[i],
        correctCharacter.strokePoints[i],
        i
      );

      if (validation.isValid) {
        completedStrokes++;
      }
      totalAccuracy += validation.accuracy;
    }

    const averageAccuracy = totalAccuracy / totalStrokes;
    const isComplete = completedStrokes === totalStrokes;

    let feedback = "";
    if (isComplete) {
      feedback = averageAccuracy >= 0.8 ? "완벽해요!" : "잘했어요!";
    } else {
      feedback = `${completedStrokes}/${totalStrokes} 획순 완료`;
    }

    return {
      isComplete,
      accuracy: averageAccuracy,
      completedStrokes,
      feedback
    };
  }
}
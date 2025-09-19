/**
 * 획순 검증 서비스
 * 사용자가 그린 획순이 올바른지 검증합니다.
 */

import { StrokePoint, Stroke, StrokeOrderData, strokeOrderService } from './stroke-order.service';

export interface UserStroke {
  points: StrokePoint[];
  timestamp: number;
}

export interface ValidationResult {
  isCorrect: boolean;
  score: number; // 0-100
  currentStrokeIndex: number;
  feedback: {
    message: string;
    type: 'success' | 'error' | 'warning';
    suggestions?: string[];
  };
  completedStrokes: number;
  totalStrokes: number;
}

export class StrokeValidationService {
  private static instance: StrokeValidationService;
  private currentCharacter: string = '';
  private currentStrokeData: StrokeOrderData | null = null;
  private userStrokes: UserStroke[] = [];
  private currentStrokeIndex: number = 0;
  private validationSettings = {
    positionTolerance: 0.25,      // 위치 허용 오차 (25% - 더 관대하게)
    directionTolerance: 0.5,      // 방향 허용 오차 (더 관대하게)
    sequenceTolerance: 0.6,       // 순서 허용 점수 (더 관대하게)
    minimumPoints: 3,             // 최소 점 개수
    maxStrokeDistance: 0.3,       // 최대 획순 거리 (더 관대하게)
  };

  private constructor() {}

  public static getInstance(): StrokeValidationService {
    if (!StrokeValidationService.instance) {
      StrokeValidationService.instance = new StrokeValidationService();
    }
    return StrokeValidationService.instance;
  }

  /**
   * 새로운 문자 검증 시작
   */
  public startValidation(character: string): boolean {
    this.currentCharacter = character;
    this.currentStrokeData = strokeOrderService.getStrokeOrder(character);
    this.userStrokes = [];
    this.currentStrokeIndex = 0;

    return this.currentStrokeData !== null;
  }

  /**
   * 사용자 획순 추가 및 검증
   */
  public addUserStroke(points: StrokePoint[]): ValidationResult {
    if (!this.currentStrokeData) {
      throw new Error('검증할 문자가 설정되지 않았습니다.');
    }


    // 최소 점 개수 체크
    if (points.length < this.validationSettings.minimumPoints) {
      return this.createValidationResult(false, 0, {
        message: '획순이 너무 짧습니다. 더 길게 그려주세요.',
        type: 'warning',
        suggestions: ['획순을 더 천천히, 길게 그려보세요.'],
      });
    }

    const userStroke: UserStroke = {
      points: this.normalizePoints(points),
      timestamp: Date.now(),
    };

    this.userStrokes.push(userStroke);

    // 현재 획순 검증
    const currentExpectedStroke = this.currentStrokeData.strokes[this.currentStrokeIndex];
    const validationScore = this.validateStroke(userStroke, currentExpectedStroke);

    if (validationScore >= this.validationSettings.sequenceTolerance) {
      // 획순이 올바름
      this.currentStrokeIndex++;

      // 모든 획순 완료 체크
      if (this.currentStrokeIndex >= this.currentStrokeData.strokes.length) {
        return this.createValidationResult(true, validationScore * 100, {
          message: `완벽합니다! '${this.currentCharacter}' 문자를 올바르게 작성했습니다.`,
          type: 'success',
        });
      } else {
        return this.createValidationResult(true, validationScore * 100, {
          message: `좋습니다! 다음 획순을 그려주세요. (${this.currentStrokeIndex + 1}/${this.currentStrokeData.strokes.length})`,
          type: 'success',
        });
      }
    } else {
      // 획순이 틀림
      return this.createValidationResult(false, validationScore * 100, {
        message: '획순이 올바르지 않습니다. 다시 시도해주세요.',
        type: 'error',
        suggestions: this.generateSuggestions(userStroke, currentExpectedStroke, validationScore),
      });
    }
  }

  /**
   * 점 좌표 정규화 (0-1 범위)
   */
  private normalizePoints(points: StrokePoint[]): StrokePoint[] {
    return points.map(point => ({
      x: Math.max(0, Math.min(1, point.x)),
      y: Math.max(0, Math.min(1, point.y)),
      pressure: point.pressure,
    }));
  }

  /**
   * 단일 획순 검증
   */
  private validateStroke(userStroke: UserStroke, expectedStroke: Stroke): number {
    let totalScore = 0;
    let scoreCount = 0;

    // 1. 시작점 검증 (가중치: 0.3)
    const startScore = this.validateStartPoint(userStroke, expectedStroke);
    totalScore += startScore * 0.3;
    scoreCount += 0.3;

    // 2. 종료점 검증 (가중치: 0.3)
    const endScore = this.validateEndPoint(userStroke, expectedStroke);
    totalScore += endScore * 0.3;
    scoreCount += 0.3;

    // 3. 경로 방향 검증 (가중치: 0.2)
    const directionScore = this.validateDirection(userStroke, expectedStroke);
    totalScore += directionScore * 0.2;
    scoreCount += 0.2;

    // 4. 전체 경로 유사도 검증 (가중치: 0.2)
    const pathScore = this.validatePath(userStroke, expectedStroke);
    totalScore += pathScore * 0.2;
    scoreCount += 0.2;

    return totalScore / scoreCount;
  }

  /**
   * 시작점 검증
   */
  private validateStartPoint(userStroke: UserStroke, expectedStroke: Stroke): number {
    if (userStroke.points.length === 0 || expectedStroke.points.length === 0) {
      return 0;
    }

    const userStart = userStroke.points[0];
    const expectedStart = expectedStroke.points[0];

    const distance = this.calculateDistance(userStart, expectedStart);
    const tolerance = this.validationSettings.positionTolerance;

    // 더 관대한 점수 계산 (거리 기반 지수 감소)
    return Math.max(0, Math.exp(-distance / tolerance * 2));
  }

  /**
   * 종료점 검증
   */
  private validateEndPoint(userStroke: UserStroke, expectedStroke: Stroke): number {
    if (userStroke.points.length === 0 || expectedStroke.points.length === 0) {
      return 0;
    }

    const userEnd = userStroke.points[userStroke.points.length - 1];
    const expectedEnd = expectedStroke.points[expectedStroke.points.length - 1];

    const distance = this.calculateDistance(userEnd, expectedEnd);
    const tolerance = this.validationSettings.positionTolerance;

    // 더 관대한 점수 계산 (거리 기반 지수 감소)
    return Math.max(0, Math.exp(-distance / tolerance * 2));
  }

  /**
   * 방향 검증
   */
  private validateDirection(userStroke: UserStroke, expectedStroke: Stroke): number {
    const userDirection = this.calculateOverallDirection(userStroke.points);
    const expectedDirection = this.calculateOverallDirection(expectedStroke.points);

    const angleDifference = Math.abs(userDirection - expectedDirection);
    const normalizedDifference = Math.min(angleDifference, Math.PI * 2 - angleDifference);

    const tolerance = this.validationSettings.directionTolerance * Math.PI;

    // 더 관대한 점수 계산
    return Math.max(0, Math.exp(-normalizedDifference / tolerance * 1.5));
  }

  /**
   * 경로 유사도 검증
   */
  private validatePath(userStroke: UserStroke, expectedStroke: Stroke): number {
    // DTW (Dynamic Time Warping) 알고리즘의 간단한 구현
    const userPoints = userStroke.points;
    const expectedPoints = expectedStroke.points;

    if (userPoints.length === 0 || expectedPoints.length === 0) {
      return 0;
    }

    // 간단한 점 대 점 거리 계산
    const sampledUserPoints = this.samplePoints(userPoints, 8);
    const sampledExpectedPoints = this.samplePoints(expectedPoints, 8);

    let totalDistance = 0;
    const minLength = Math.min(sampledUserPoints.length, sampledExpectedPoints.length);

    for (let i = 0; i < minLength; i++) {
      const distance = this.calculateDistance(
        sampledUserPoints[i],
        sampledExpectedPoints[i]
      );
      totalDistance += distance;
    }

    const averageDistance = totalDistance / minLength;
    const tolerance = this.validationSettings.positionTolerance;

    // 더 관대한 점수 계산
    return Math.max(0, Math.exp(-averageDistance / tolerance * 1.5));
  }

  /**
   * 점들 사이의 거리 계산
   */
  private calculateDistance(point1: StrokePoint, point2: StrokePoint): number {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * 전체 방향 계산
   */
  private calculateOverallDirection(points: StrokePoint[]): number {
    if (points.length < 2) return 0;

    const start = points[0]!;
    const end = points[points.length - 1]!;

    return Math.atan2(end.y - start.y, end.x - start.x);
  }

  /**
   * 점 샘플링
   */
  private samplePoints(points: StrokePoint[], count: number): StrokePoint[] {
    if (points.length <= count) return [...points];

    const sampled: StrokePoint[] = [];
    const step = (points.length - 1) / (count - 1);

    for (let i = 0; i < count; i++) {
      const index = Math.round(i * step);
      const point = points[index];
      if (point) {
        sampled.push(point);
      }
    }

    return sampled;
  }

  /**
   * 개선 제안 생성
   */
  private generateSuggestions(
    userStroke: UserStroke,
    expectedStroke: Stroke,
    score: number
  ): string[] {
    const suggestions: string[] = [];

    // 시작점 체크
    const startScore = this.validateStartPoint(userStroke, expectedStroke);
    if (startScore < 0.7) {
      suggestions.push('시작점이 올바르지 않습니다. 가이드를 참고해주세요.');
    }

    // 종료점 체크
    const endScore = this.validateEndPoint(userStroke, expectedStroke);
    if (endScore < 0.7) {
      suggestions.push('끝점이 올바르지 않습니다. 올바른 위치에서 끝내주세요.');
    }

    // 방향 체크
    const directionScore = this.validateDirection(userStroke, expectedStroke);
    if (directionScore < 0.7) {
      suggestions.push('그리는 방향이 올바르지 않습니다. 획순 시연을 다시 확인해주세요.');
    }

    // 일반적인 제안
    if (score < 0.3) {
      suggestions.push('획순 시연을 다시 보고 천천히 따라 그려보세요.');
    } else if (score < 0.6) {
      suggestions.push('거의 다 되었습니다! 조금 더 정확하게 그려보세요.');
    }

    return suggestions;
  }

  /**
   * 검증 결과 생성
   */
  private createValidationResult(
    isCorrect: boolean,
    score: number,
    feedback: ValidationResult['feedback']
  ): ValidationResult {
    return {
      isCorrect,
      score: Math.round(score),
      currentStrokeIndex: this.currentStrokeIndex,
      feedback,
      completedStrokes: this.currentStrokeIndex,
      totalStrokes: this.currentStrokeData?.strokes.length || 0,
    };
  }

  /**
   * 검증 초기화
   */
  public reset(): void {
    this.userStrokes = [];
    this.currentStrokeIndex = 0;
  }

  /**
   * 현재 진행 상태 반환
   */
  public getProgress(): {
    character: string;
    currentStroke: number;
    totalStrokes: number;
    isComplete: boolean;
  } {
    return {
      character: this.currentCharacter,
      currentStroke: this.currentStrokeIndex,
      totalStrokes: this.currentStrokeData?.strokes.length || 0,
      isComplete: this.currentStrokeIndex >= (this.currentStrokeData?.strokes.length || 0),
    };
  }

  /**
   * 검증 설정 업데이트
   */
  public updateSettings(settings: Partial<typeof this.validationSettings>): void {
    this.validationSettings = { ...this.validationSettings, ...settings };
  }
}

// 싱글톤 인스턴스 export
export const strokeValidationService = StrokeValidationService.getInstance();
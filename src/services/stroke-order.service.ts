/**
 * 획순 데이터 및 시연 서비스
 * 일본어 문자의 획순 정보를 관리하고 시연 애니메이션을 제공합니다.
 */

export interface StrokePoint {
  x: number;
  y: number;
  pressure?: number;
}

export interface Stroke {
  id: number;
  points: StrokePoint[];
  duration: number; // 밀리초
}

export interface StrokeOrderData {
  character: string;
  strokes: Stroke[];
  totalDuration: number;
}

export class StrokeOrderService {
  private static instance: StrokeOrderService;
  private strokeDatabase: Map<string, StrokeOrderData> = new Map();

  private constructor() {
    this.initializeStrokeData();
  }

  public static getInstance(): StrokeOrderService {
    if (!StrokeOrderService.instance) {
      StrokeOrderService.instance = new StrokeOrderService();
    }
    return StrokeOrderService.instance;
  }

  /**
   * 기본 획순 데이터 초기화
   * 실제 프로덕션에서는 외부 데이터베이스나 API에서 로드
   */
  private initializeStrokeData(): void {
    // あ (a) - 히라가나
    this.strokeDatabase.set('あ', {
      character: 'あ',
      strokes: [
        {
          id: 1,
          points: [
            { x: 0.2, y: 0.3 },
            { x: 0.25, y: 0.25 },
            { x: 0.3, y: 0.3 },
            { x: 0.35, y: 0.4 },
            { x: 0.4, y: 0.5 },
            { x: 0.5, y: 0.6 },
            { x: 0.6, y: 0.65 },
            { x: 0.7, y: 0.6 },
            { x: 0.75, y: 0.5 },
          ],
          duration: 1200,
        },
        {
          id: 2,
          points: [
            { x: 0.45, y: 0.2 },
            { x: 0.5, y: 0.35 },
            { x: 0.55, y: 0.5 },
            { x: 0.6, y: 0.65 },
            { x: 0.65, y: 0.8 },
          ],
          duration: 800,
        },
        {
          id: 3,
          points: [
            { x: 0.3, y: 0.7 },
            { x: 0.4, y: 0.75 },
            { x: 0.5, y: 0.8 },
            { x: 0.6, y: 0.82 },
            { x: 0.7, y: 0.8 },
            { x: 0.75, y: 0.75 },
          ],
          duration: 600,
        },
      ],
      totalDuration: 2600,
    });

    // い (i) - 히라가나
    this.strokeDatabase.set('い', {
      character: 'い',
      strokes: [
        {
          id: 1,
          points: [
            { x: 0.3, y: 0.2 },
            { x: 0.32, y: 0.4 },
            { x: 0.35, y: 0.6 },
            { x: 0.4, y: 0.8 },
          ],
          duration: 600,
        },
        {
          id: 2,
          points: [
            { x: 0.6, y: 0.15 },
            { x: 0.62, y: 0.35 },
            { x: 0.65, y: 0.55 },
            { x: 0.7, y: 0.75 },
            { x: 0.75, y: 0.85 },
          ],
          duration: 700,
        },
      ],
      totalDuration: 1300,
    });

    // 더 많은 문자들을 추가할 수 있습니다...
    this.addBasicHiraganaStrokes();
    this.addBasicKatakanaStrokes();
  }

  /**
   * 기본 히라가나 획순 추가
   */
  private addBasicHiraganaStrokes(): void {
    // 간단한 예시 데이터들
    const basicCharacters = ['う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'];

    basicCharacters.forEach((char, index) => {
      this.strokeDatabase.set(char, this.generateBasicStrokeData(char, 2 + (index % 3)));
    });
  }

  /**
   * 기본 가타카나 획순 추가
   */
  private addBasicKatakanaStrokes(): void {
    const katakanaChars = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'];

    katakanaChars.forEach((char, index) => {
      this.strokeDatabase.set(char, this.generateBasicStrokeData(char, 2 + (index % 4)));
    });
  }

  /**
   * 기본 획순 데이터 생성 (실제로는 정확한 데이터 필요)
   */
  private generateBasicStrokeData(character: string, strokeCount: number): StrokeOrderData {
    const strokes: Stroke[] = [];

    for (let i = 0; i < strokeCount; i++) {
      const points: StrokePoint[] = [];
      const pointCount = 3 + Math.floor(Math.random() * 5);

      for (let j = 0; j < pointCount; j++) {
        points.push({
          x: 0.2 + (j / pointCount) * 0.6 + (Math.random() - 0.5) * 0.1,
          y: 0.2 + (i / strokeCount) * 0.6 + (j / pointCount) * 0.2 + (Math.random() - 0.5) * 0.1,
          pressure: 0.3 + Math.random() * 0.4,
        });
      }

      strokes.push({
        id: i + 1,
        points,
        duration: 500 + Math.random() * 400,
      });
    }

    return {
      character,
      strokes,
      totalDuration: strokes.reduce((sum, stroke) => sum + stroke.duration, 0),
    };
  }

  /**
   * 문자의 획순 데이터 반환
   */
  public getStrokeOrder(character: string): StrokeOrderData | null {
    return this.strokeDatabase.get(character) || null;
  }

  /**
   * 문자의 획순 시연 애니메이션 실행
   */
  public async demonstrateStrokeOrder(
    character: string,
    canvas: HTMLCanvasElement,
    options?: {
      strokeColor?: string;
      strokeWidth?: number;
      speed?: number; // 1.0이 기본 속도
      showGuide?: boolean;
    }
  ): Promise<void> {
    const strokeData = this.getStrokeOrder(character);
    if (!strokeData) {
      console.warn(`'${character}' 문자의 획순 데이터를 찾을 수 없습니다.`);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context를 가져올 수 없습니다.');
    }

    const {
      strokeColor = '#10b981',
      strokeWidth = 3,
      speed = 1.0,
      showGuide = false,
    } = options || {};

    // Canvas 초기화 및 설정
    const ratio = window.devicePixelRatio || 1;
    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;

    canvas.width = displayWidth * ratio;
    canvas.height = displayHeight * ratio;
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Canvas 설정
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = 0.8;

    // 가이드 표시
    if (showGuide) {
      this.drawGuideLines(ctx, displayWidth, displayHeight);
    }

    // 각 획순을 순차적으로 그리기
    for (let i = 0; i < strokeData.strokes.length; i++) {
      const stroke = strokeData.strokes[i];
      await this.animateStroke(ctx, stroke, displayWidth, displayHeight, speed);

      // 획순 간 잠시 대기 (마지막 획순이 아닌 경우)
      if (i < strokeData.strokes.length - 1) {
        await this.delay(300 / speed);
      }
    }
  }

  /**
   * 단일 획순 애니메이션
   */
  private async animateStroke(
    ctx: CanvasRenderingContext2D,
    stroke: Stroke,
    canvasWidth: number,
    canvasHeight: number,
    speed: number
  ): Promise<void> {
    const points = stroke.points;
    const totalDuration = stroke.duration / speed;
    const startTime = Date.now();

    // 시작점으로 이동
    const startPoint = points[0];
    ctx.beginPath();
    ctx.moveTo(startPoint.x * canvasWidth, startPoint.y * canvasHeight);

    return new Promise((resolve) => {
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        // 전체 경로에서 현재 위치 계산
        const totalSegments = points.length - 1;
        const currentSegment = Math.floor(progress * totalSegments);
        const segmentProgress = (progress * totalSegments) - currentSegment;

        // 현재 세그먼트의 점들
        if (currentSegment < totalSegments) {
          const currentPoint = points[currentSegment];
          const nextPoint = points[currentSegment + 1];

          // 보간된 위치 계산
          const x = currentPoint.x + (nextPoint.x - currentPoint.x) * segmentProgress;
          const y = currentPoint.y + (nextPoint.y - currentPoint.y) * segmentProgress;

          // 라인 그리기
          ctx.lineTo(x * canvasWidth, y * canvasHeight);
          ctx.stroke();
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // 마지막 점까지 확실히 그리기
          const lastPoint = points[points.length - 1];
          ctx.lineTo(lastPoint.x * canvasWidth, lastPoint.y * canvasHeight);
          ctx.stroke();
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  /**
   * 가이드 라인 그리기
   */
  private drawGuideLines(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.save();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.globalAlpha = 0.5;

    // 십자가 가이드
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * 지연 함수
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 새로운 획순 데이터 추가
   */
  public addStrokeData(character: string, strokeData: StrokeOrderData): void {
    this.strokeDatabase.set(character, strokeData);
  }

  /**
   * 지원하는 문자 목록 반환
   */
  public getSupportedCharacters(): string[] {
    return Array.from(this.strokeDatabase.keys());
  }

  /**
   * Canvas 초기화
   */
  public clearCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const displayWidth = canvas.offsetWidth;
      const displayHeight = canvas.offsetHeight;
      ctx.clearRect(0, 0, displayWidth, displayHeight);
    }
  }
}

// 싱글톤 인스턴스 export
export const strokeOrderService = StrokeOrderService.getInstance();
import { Point } from "@/services/stroke-order-engine.service";

export class CanvasUtils {
  /**
   * 캔버스에서 터치/마우스 좌표를 정규화된 좌표로 변환
   */
  static getCanvasCoordinates(
    event: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement
  ): Point {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    let clientX: number;
    let clientY: number;

    if (event instanceof TouchEvent) {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) return { x: 0, y: 0, timestamp: Date.now() };
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    // 정확한 캔버스 좌표 계산 (device pixel ratio 고려)
    const x = (clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const y = (clientY - rect.top) * (canvas.height / rect.height) / dpr;

    return {
      x: Math.round(x),
      y: Math.round(y),
      timestamp: Date.now()
    };
  }

  /**
   * 캔버스 초기화
   */
  static clearCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * 격자 그리기
   */
  static drawGrid(
    canvas: HTMLCanvasElement,
    gridSize: number = 20,
    color: string = 'rgba(0, 0, 0, 0.1)'
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    // 세로선
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // 가로선
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  /**
   * 가이드 라인 그리기 (田자 격자)
   */
  static drawGuideLines(
    canvas: HTMLCanvasElement,
    color: string = 'rgba(100, 100, 100, 0.3)'
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    // 중앙 세로선
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // 중앙 가로선
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // 외곽선
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);
  }

  /**
   * 문자 표시 (연한 색상으로 배경에)
   */
  static drawCharacterGuide(
    canvas: HTMLCanvasElement,
    character: string,
    color: string = 'rgba(200, 200, 200, 0.3)'
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const fontSize = Math.min(width, height) * 0.6;

    ctx.fillStyle = color;
    ctx.font = `${fontSize}px "Noto Sans JP", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(character, width / 2, height / 2);
  }

  /**
   * 획순 경로 그리기
   */
  static drawStrokePath(
    canvas: HTMLCanvasElement,
    points: Point[],
    color: string = '#333',
    lineWidth: number = 3
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx || points.length < 2) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.stroke();
  }

  /**
   * 부드러운 곡선으로 획순 그리기
   */
  static drawSmoothStroke(
    canvas: HTMLCanvasElement,
    points: Point[],
    color: string = '#333',
    lineWidth: number = 3
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx || points.length < 2) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();

    if (points.length === 2) {
      // 점이 2개뿐이면 직선
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
    } else {
      // 3개 이상이면 부드러운 곡선
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 1; i++) {
        const currentPoint = points[i];
        const nextPoint = points[i + 1];
        const controlX = (currentPoint.x + nextPoint.x) / 2;
        const controlY = (currentPoint.y + nextPoint.y) / 2;

        ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, controlX, controlY);
      }

      // 마지막 점까지 연결
      const lastPoint = points[points.length - 1];
      ctx.lineTo(lastPoint.x, lastPoint.y);
    }

    ctx.stroke();
  }

  /**
   * 획순 힌트 애니메이션 그리기
   */
  static drawStrokeHint(
    canvas: HTMLCanvasElement,
    points: Point[],
    progress: number, // 0-1
    color: string = '#ff6b6b',
    lineWidth: number = 4
  ): void {
    if (progress <= 0 || points.length < 2) return;

    const totalLength = this.calculatePathLength(points);
    const targetLength = totalLength * progress;
    const hintPoints = this.getPointsUpToLength(points, targetLength);

    this.drawSmoothStroke(canvas, hintPoints, color, lineWidth);

    // 현재 진행 위치에 점 표시
    if (hintPoints.length > 0) {
      const lastPoint = hintPoints[hintPoints.length - 1];
      this.drawPoint(canvas, lastPoint, color, 6);
    }
  }

  /**
   * 점 그리기
   */
  static drawPoint(
    canvas: HTMLCanvasElement,
    point: Point,
    color: string = '#ff6b6b',
    radius: number = 4
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * 경로의 총 길이 계산
   */
  private static calculatePathLength(points: Point[]): number {
    let length = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
  }

  /**
   * 특정 길이까지의 점들 반환
   */
  private static getPointsUpToLength(points: Point[], targetLength: number): Point[] {
    if (targetLength <= 0) return [];

    const result: Point[] = [points[0]];
    let currentLength = 0;

    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      const segmentLength = Math.sqrt(dx * dx + dy * dy);

      if (currentLength + segmentLength <= targetLength) {
        result.push(points[i]);
        currentLength += segmentLength;
      } else {
        // 부분적으로 포함될 점 계산
        const remainingLength = targetLength - currentLength;
        const ratio = remainingLength / segmentLength;
        const interpolatedPoint: Point = {
          x: points[i - 1].x + dx * ratio,
          y: points[i - 1].y + dy * ratio
        };
        result.push(interpolatedPoint);
        break;
      }
    }

    return result;
  }

  /**
   * 좌표를 캔버스 크기에 맞게 정규화 (0-100 범위를 실제 캔버스 크기로 변환)
   */
  static normalizeStrokePoints(
    points: Point[],
    canvas: HTMLCanvasElement
  ): Point[] {
    const { width, height } = canvas;
    const dpr = window.devicePixelRatio || 1;
    const actualWidth = width / dpr;
    const actualHeight = height / dpr;

    return points.map(point => ({
      x: (point.x / 100) * actualWidth,
      y: (point.y / 100) * actualHeight,
      timestamp: point.timestamp || Date.now()
    }));
  }

  /**
   * 캔버스를 이미지로 변환
   */
  static canvasToDataURL(canvas: HTMLCanvasElement, type: string = 'image/png'): string {
    return canvas.toDataURL(type);
  }

  /**
   * 캔버스 크기 설정 (레티나 디스플레이 대응)
   */
  static setupCanvasSize(
    canvas: HTMLCanvasElement,
    container: HTMLElement
  ): void {
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // 정사각형으로 만들기 위해 최소값 사용
    const size = Math.min(rect.width, rect.height);

    canvas.width = size * dpr;
    canvas.height = size * dpr;

    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      // 좌표 정확성을 위한 추가 설정
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }
  }
}
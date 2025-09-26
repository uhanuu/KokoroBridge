import { TextToSpeechService } from "./text-to-speech.service";

export interface TTSQueueItem {
  text: string;
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    delay?: number;
  };
  priority: 'high' | 'normal' | 'low';
}

export interface VoiceSettings {
  language: 'ja-JP' | 'en-US';
  voiceURI?: string;
  rate: number;
  pitch: number;
  volume: number;
}

export class EnhancedTTSService {
  private ttsService: TextToSpeechService;
  private queue: TTSQueueItem[] = [];
  private isProcessing = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private defaultSettings: VoiceSettings = {
    language: 'ja-JP',
    rate: 0.8,
    pitch: 1.0,
    volume: 0.8
  };

  constructor() {
    this.ttsService = new TextToSpeechService();
  }

  /**
   * 우선순위 큐에 음성 추가
   */
  addToQueue(item: TTSQueueItem): void {
    // 우선순위에 따라 정렬하여 삽입
    const priorityOrder = { high: 0, normal: 1, low: 2 };
    let insertIndex = this.queue.length;

    for (let i = 0; i < this.queue.length; i++) {
      if (priorityOrder[item.priority] < priorityOrder[this.queue[i].priority]) {
        insertIndex = i;
        break;
      }
    }

    this.queue.splice(insertIndex, 0, item);
    this.processQueue();
  }

  /**
   * 즉시 음성 재생 (큐 무시)
   */
  async speakImmediately(text: string, options?: Partial<VoiceSettings>): Promise<void> {
    this.stopAll();

    const settings = { ...this.defaultSettings, ...options };

    return this.ttsService.speak(text, {
      rate: settings.rate,
      pitch: settings.pitch,
      volume: settings.volume,
      onEnd: () => {
        this.processQueue();
      },
      onError: (_error) => {
        // TTS Error
        this.processQueue();
      }
    });
  }

  /**
   * 문자와 로마지 순차 재생
   */
  async speakCharacterWithRomaji(
    character: string,
    romaji: string,
    delay = 800
  ): Promise<void> {
    this.stopAll();

    return new Promise((resolve, reject) => {
      this.ttsService.speak(character, {
        rate: this.defaultSettings.rate,
        pitch: this.defaultSettings.pitch,
        volume: this.defaultSettings.volume,
        onEnd: () => {
          setTimeout(() => {
            this.ttsService.speakRomaji(romaji, {
              rate: 0.9,
              pitch: 1.0,
              volume: this.defaultSettings.volume,
              onEnd: resolve,
              onError: reject
            });
          }, delay);
        },
        onError: reject
      });
    });
  }

  /**
   * 획순별 음성 가이드
   */
  async speakStrokeGuide(strokeNumber: number, totalStrokes: number): Promise<void> {
    const guideText = this.generateStrokeGuideText(strokeNumber, totalStrokes);

    this.addToQueue({
      text: guideText,
      options: { rate: 1.1, pitch: 1.2, volume: 0.7, delay: 300 },
      priority: 'normal'
    });
  }

  /**
   * 완성 축하 메시지
   */
  async speakCompletionMessage(accuracy: number): Promise<void> {
    let message: string;

    if (accuracy >= 90) {
      message = "완벽해요! 훌륭합니다!";
    } else if (accuracy >= 80) {
      message = "잘했어요!";
    } else if (accuracy >= 70) {
      message = "좋아요! 조금 더 연습해보세요.";
    } else {
      message = "다시 한번 도전해보세요!";
    }

    this.addToQueue({
      text: message,
      options: { rate: 0.9, pitch: 1.1, volume: 0.9, delay: 500 },
      priority: 'high'
    });
  }

  /**
   * 큐 처리
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const item = this.queue.shift()!;

    try {
      if (item.options?.delay) {
        await this.delay(item.options.delay);
      }

      await this.ttsService.speak(item.text, {
        rate: item.options?.rate || this.defaultSettings.rate,
        pitch: item.options?.pitch || this.defaultSettings.pitch,
        volume: item.options?.volume || this.defaultSettings.volume,
        onEnd: () => {
          this.isProcessing = false;
          this.processQueue();
        },
        onError: (_error) => {
          // TTS Queue Error
          this.isProcessing = false;
          this.processQueue();
        }
      });
    } catch (_error) {
      // TTS Queue Processing Error
      this.isProcessing = false;
      this.processQueue();
    }
  }

  /**
   * 획순 가이드 텍스트 생성
   */
  private generateStrokeGuideText(strokeNumber: number, totalStrokes: number): string {
    const ordinals = ['첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열'];
    const ordinal = ordinals[strokeNumber - 1] || `${strokeNumber}`;

    if (strokeNumber === 1) {
      return `${ordinal} 번째 획을 그어보세요.`;
    } else if (strokeNumber === totalStrokes) {
      return `마지막 획입니다. ${ordinal} 번째 획을 그어보세요.`;
    } else {
      return `${ordinal} 번째 획을 그어보세요.`;
    }
  }

  /**
   * 지연 함수
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 모든 음성 중지
   */
  stopAll(): void {
    this.ttsService.stop();
    this.queue = [];
    this.isProcessing = false;
    this.currentUtterance = null;
  }

  /**
   * 큐 비우기
   */
  clearQueue(): void {
    this.queue = [];
  }

  /**
   * 설정 업데이트
   */
  updateSettings(settings: Partial<VoiceSettings>): void {
    this.defaultSettings = { ...this.defaultSettings, ...settings };
  }

  /**
   * 현재 큐 상태 확인
   */
  getQueueStatus(): {
    queueLength: number;
    isProcessing: boolean;
    currentPriorities: string[];
  } {
    return {
      queueLength: this.queue.length,
      isProcessing: this.isProcessing,
      currentPriorities: this.queue.map(item => item.priority)
    };
  }

  /**
   * 음성 지원 확인
   */
  checkVoiceSupport(): {
    isSupported: boolean;
    hasJapaneseVoice: boolean;
    availableVoices: string[];
  } {
    return {
      isSupported: this.ttsService.isSupported(),
      hasJapaneseVoice: this.ttsService.hasJapaneseVoice(),
      availableVoices: this.ttsService.getAvailableJapaneseVoices().map(v => v.name)
    };
  }

  /**
   * 리소스 정리
   */
  destroy(): void {
    this.stopAll();
    this.ttsService = null as any;
  }
}
/**
 * Text-to-Speech 서비스
 * 일본어 문자 발음을 여성 목소리로 재생합니다.
 */
export class TTSService {
  private static instance: TTSService;
  private speechSynthesis: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.speechSynthesis = window.speechSynthesis;
      this.initializeVoices();
    }
  }

  public static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  /**
   * 음성 초기화
   */
  private async initializeVoices(): Promise<void> {
    if (!this.speechSynthesis) return;

    return new Promise((resolve) => {
      // 음성이 이미 로드된 경우
      if (this.speechSynthesis!.getVoices().length > 0) {
        this.voices = this.speechSynthesis!.getVoices();
        this.isInitialized = true;
        resolve();
        return;
      }

      // 음성 로드 이벤트 리스너
      this.speechSynthesis!.addEventListener('voiceschanged', () => {
        this.voices = this.speechSynthesis!.getVoices();
        this.isInitialized = true;
        resolve();
      }, { once: true });

      // 타임아웃 설정 (3초 후 강제 완료)
      setTimeout(() => {
        this.voices = this.speechSynthesis!.getVoices();
        this.isInitialized = true;
        resolve();
      }, 3000);
    });
  }

  /**
   * 일본어 여성 음성 선택
   */
  private getJapaneseVoice(): SpeechSynthesisVoice | null {
    if (!this.voices.length) return null;

    // 일본어 여성 음성 우선순위
    const preferredVoices = [
      'Kyoko',           // macOS 일본어 여성
      'Otoya',           // macOS 일본어 남성 (대안)
      'Google 日本語',    // Google 일본어
      'Microsoft Haruka', // Windows 일본어 여성
      'Microsoft Sayaka', // Windows 일본어 여성
    ];

    // 우선순위에 따라 음성 검색
    for (const voiceName of preferredVoices) {
      const voice = this.voices.find(v =>
        v.name.includes(voiceName) || v.name.includes('ja')
      );
      if (voice) return voice;
    }

    // 일본어 음성 검색
    const japaneseVoice = this.voices.find(voice =>
      voice.lang.includes('ja') ||
      voice.lang.includes('jp') ||
      voice.name.includes('Japan')
    );

    return japaneseVoice || null;
  }

  /**
   * 문자 발음
   */
  public async speak(text: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
  }): Promise<void> {
    if (!this.speechSynthesis || !text.trim()) {
      throw new Error('TTS를 사용할 수 없습니다.');
    }

    // 음성이 초기화되지 않은 경우 대기
    if (!this.isInitialized) {
      await this.initializeVoices();
    }

    // 현재 재생 중인 음성 중지
    this.stop();

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);

      // 일본어 음성 설정
      const voice = this.getJapaneseVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = 'ja-JP';
      }

      // 음성 설정
      utterance.rate = options?.rate ?? 0.8;     // 조금 느리게
      utterance.pitch = options?.pitch ?? 1.2;   // 조금 높게 (여성스럽게)
      utterance.volume = options?.volume ?? 1.0;

      // 이벤트 리스너
      utterance.onend = () => resolve();
      utterance.onerror = (event) => {
        console.error('TTS Error:', event.error);
        reject(new Error(`음성 재생 실패: ${event.error}`));
      };

      // 음성 재생
      try {
        this.speechSynthesis!.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 음성 재생 중지
   */
  public stop(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  /**
   * 현재 재생 중인지 확인
   */
  public isSpeaking(): boolean {
    return this.speechSynthesis?.speaking ?? false;
  }

  /**
   * 음성 일시정지
   */
  public pause(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.pause();
    }
  }

  /**
   * 음성 재개
   */
  public resume(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.resume();
    }
  }

  /**
   * 사용 가능한 일본어 음성 목록 반환
   */
  public getAvailableJapaneseVoices(): SpeechSynthesisVoice[] {
    if (!this.isInitialized) return [];

    return this.voices.filter(voice =>
      voice.lang.includes('ja') ||
      voice.lang.includes('jp') ||
      voice.name.includes('Japan') ||
      voice.name.includes('Kyoko') ||
      voice.name.includes('Otoya')
    );
  }

  /**
   * TTS 지원 여부 확인
   */
  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

// 싱글톤 인스턴스 export
export const ttsService = TTSService.getInstance();